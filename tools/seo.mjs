/* Generates sitemap.xml (and rewrites canonical/og:url on shell pages)
   against the live domain.

   Usage:  SITE_URL=https://your-domain.com node tools/seo.mjs

   Run after every deploy once the production URL is known. */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE = (process.env.SITE_URL || "").replace(/\/+$/, "");
if (!SITE || !/^https?:\/\//.test(SITE)) {
  console.error("SITE_URL=https://your-domain.com is required");
  process.exit(1);
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const nairaDate = new Date().toISOString().slice(0, 10);

/* ── collect URLs ───────────────────────────────────────────────── */
const urls = [];

const shells = [
  ["index.html", "1.0"],
  ["shop.html", "0.9"],
  ["bags.html", "0.8"],
  ["jewelry.html", "0.8"],
  ["shoes.html", "0.8"],
  ["wigs.html", "0.8"],
  ["ceo.html", "0.6"]
];
for (const [f, pri] of shells) {
  if (existsSync(join(ROOT, f))) urls.push({ loc: SITE + "/" + f, priority: pri });
}

const products = readdirSync(ROOT).filter((f) => /^(bags|jewelry|shoes|wigs)-\d+\.html$/.test(f));
for (const f of products) urls.push({ loc: SITE + "/" + f, priority: "0.7" });

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) =>
    "  <url><loc>" + u.loc.replace(/&/g, "&amp;") + "</loc>" +
    "<lastmod>" + nairaDate + "</lastmod>" +
    "<changefreq>" + (u.priority === "1.0" ? "daily" : "weekly") + "</changefreq>" +
    "<priority>" + u.priority + "</priority></url>"
  ).join("\n") +
  "\n</urlset>\n";

writeFileSync(join(ROOT, "sitemap.xml"), xml, "utf8");

/* ── robots.txt sitemap line → absolute ─────────────────────────── */
const rp = join(ROOT, "robots.txt");
if (existsSync(rp)) {
  let r = readFileSync(rp, "utf8");
  r = r.replace(/^Sitemap:.*$/m, "Sitemap: " + SITE + "/sitemap.xml");
  writeFileSync(rp, r, "utf8");
}

/* ── canonical + og:url on shell pages ──────────────────────────── */
let patched = 0;
for (const [f] of shells) {
  const p = join(ROOT, f);
  if (!existsSync(p)) continue;
  let h = readFileSync(p, "utf8");
  const canon = '  <link rel="canonical" href="' + SITE + "/" + f + '">';
  if (/<link rel="canonical"[^>]*>/.test(h)) {
    h = h.replace(/<link rel="canonical"[^>]*>/, canon.trim());
  } else {
    h = h.replace(/(\n\s*<meta name="theme-color")/, "\n" + canon + "$1");
  }
  if (/<meta property="og:url"[^>]*>/.test(h)) {
    h = h.replace(/<meta property="og:url"[^>]*>/, '<meta property="og:url" content="' + SITE + "/" + f + '">');
  } else {
    h = h.replace(/(\n\s*<meta property="og:title")/, '\n  <meta property="og:url" content="' + SITE + "/" + f + '">$1');
  }
  writeFileSync(p, h, "utf8");
  patched++;
}

console.log("sitemap.xml: " + urls.length + " urls (" + products.length + " product pages)");
console.log("canonical/og:url patched on " + patched + " shell pages");
console.log("site: " + SITE);
