/* Generates a dedicated static page for every product (bags-01.html …).
   Usage:  node tools/generate-pages.mjs
   Optional:  SITE_URL=https://your-domain.com node tools/generate-pages.mjs
   (SITE_URL adds canonical/absolute og tags; re-run after deploy.) */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = process.env.SITE_URL ? process.env.SITE_URL.replace(/\/+$/, "") : "";

/* ── load catalog + shared templates (one eval so the
   template's free variables resolve against products.js) ────────── */
const src =
  readFileSync(join(ROOT, "js", "products.js"), "utf8") + "\n" +
  readFileSync(join(ROOT, "js", "product-template.js"), "utf8") + "\n" +
  ";({ PRODUCTS: PRODUCTS, CATEGORIES: CATEGORIES, productUrl: productUrl })";
const { PRODUCTS, CATEGORIES, productUrl } = (0, eval)(src);

/* waveHTML stub (chrome.js equivalent for the generator) */
const WAVE_P1 = "M0,72 C160,112 320,26 480,52 C640,78 800,114 960,76 C1120,38 1280,62 1440,44 L1440,160 L0,160 Z";
const WAVE_P2 = "M0,52 C180,96 340,20 520,64 C700,108 860,24 1040,58 C1220,92 1340,40 1440,66 L1440,160 L0,160 Z";
globalThis.waveHTML = (color, variant) =>
  '<div class="wave"><svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">' +
  '<path d="' + (variant === 2 ? WAVE_P2 : WAVE_P1) + '" fill="' + color + '"></path></svg></div>';

const esc = globalThis.esc;
const productPageHTML = globalThis.productPageHTML;

if (!PRODUCTS || !productPageHTML) {
  console.error("generator failed to load products.js / product-template.js");
  process.exit(1);
}

const naira = (n) => "\u20A6" + Number(n).toLocaleString("en-NG");
const j = (s) => JSON.stringify(s).replace(/</g, "\\u003c");

function productPage(p) {
  const meta = CATEGORIES.find((c) => c.id === p.cat) || CATEGORIES[0];
  const path = productUrlPath(p.id);
  const desc =
    p.desc +
    " Order the " + p.name + " online in Nigeria — " + naira(p.price) +
    ", nationwide delivery in 2–5 working days from Shugarlee Collectibles.";
  const imgAbs = SITE ? SITE + "/" + encodeURI(p.img) : encodeURI(p.img);
  const urlAbs = SITE ? SITE + "/" + path : "";

  const jsonld =
    '{"@context":"https://schema.org","@type":"Product",' +
    '"name":' + j(p.name) + ',' +
    '"image":' + j(imgAbs) + ',' +
    '"description":' + j(desc) + ',' +
    '"sku":' + j(p.code) + ',' +
    '"brand":{"@type":"Brand","name":"Shugarlee Collectibles"},' +
    '"offers":{"@type":"Offer","price":' + p.price + ',"priceCurrency":"NGN",' +
    '"availability":"https://schema.org/InStock"' +
    (urlAbs ? ',"url":' + j(urlAbs) : "") +
    "}}";

  const crumbs =
    '{"@context":"https://schema.org","@type":"BreadcrumbList",' +
    '"itemListElement":[' +
    '{"@type":"ListItem","position":1,"name":"Home","item":' + j(SITE ? SITE + "/index.html" : "index.html") + "}," +
    '{"@type":"ListItem","position":2,"name":' + j(meta.plural) + ',"item":' + j(SITE ? SITE + "/" + meta.page : meta.page) + "}," +
    '{"@type":"ListItem","position":3,"name":' + j(p.name) + (urlAbs ? ',"item":' + j(urlAbs) : "") + "}]}";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.name)} — ${meta.plural} | Shugarlee Collectibles</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="#fff2df">
${SITE ? `  <link rel="canonical" href="${urlAbs}">\n` : ""}  <meta property="og:type" content="product">
  <meta property="og:title" content="${esc(p.name)} — ${meta.plural} | Shugarlee Collectibles">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${imgAbs}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/png" href="Glossy Shugarlee Script Logo.png">
  <link rel="stylesheet" href="css/style.css">
  <script>document.documentElement.className = "js";</script>
  <script type="application/ld+json">${jsonld}</script>
  <script type="application/ld+json">${crumbs}</script>
</head>
<body>

<main id="main" data-page="product" data-product="${p.id}">
${productPageHTML(p).replace(/^/gm, "  ")}
</main>

<script src="js/vendor/gsap.min.js"></script>
<script src="js/vendor/ScrollTrigger.min.js"></script>
<script src="js/vendor/lenis.min.js"></script>
<script src="js/products.js"></script>
<script src="js/chrome.js"></script>
<script src="js/product-template.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;
}

function productUrlPath(id) {
  return id + ".html";
}

let n = 0;
for (const p of PRODUCTS) {
  writeFileSync(join(ROOT, productUrlPath(p.id)), productPage(p), "utf8");
  n++;
}
console.log("generated " + n + " product pages" + (SITE ? " (site: " + SITE + ")" : " (no SITE_URL — canonical skipped)"));
