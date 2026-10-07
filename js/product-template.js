/* SHUGARLEE COLLECTIBLES — shared product/card templates.
   Used by js/main.js (browser) and tools/generate-pages.mjs (static pages).
   Requires products.js globals (PRODUCTS/CATEGORIES/productsByCat/formatNaira)
   and waveHTML (chrome.js in the browser, stubbed by the generator). */

(function (root) {
  "use strict";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function cardHTML(p) {
    var badge = "";
    if (p.badge === "new") badge = '<span class="pcard__badge">New</span>';
    if (p.badge === "hot") badge = '<span class="pcard__badge is-hot">Hot</span>';
    return '<article class="pcard will-animate" data-id="' + p.id + '">' +
      '<div class="pcard__thumb">' + badge +
      '<a href="' + productUrl(p.id) + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + p.img + '" alt="" loading="lazy"></a>' +
      '<button class="pcard__quick js-quick-add" type="button" data-id="' + p.id + '">Add to bag</button>' +
      "</div>" +
      '<a class="pcard__meta" href="' + productUrl(p.id) + '">' +
      '<span class="pcard__code">' + p.code + "</span>" +
      '<h3 class="pcard__name">' + esc(p.name) + "</h3>" +
      '<div class="pcard__price">' + formatNaira(p.price) + "</div>" +
      '<div class="pcard__note">' + esc(p.note) + "</div>" +
      "</a></article>";
  }

  function fcardHTML(p) {
    return '<div class="fcard">' +
      '<div class="fcard__media"><div class="fcard__blob"></div>' +
      '<img class="fcard__photo" src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
      '<div class="fcard__meta">' +
      '<span class="fcard__code">' + p.code + "</span>" +
      '<h3 class="fcard__name">' + esc(p.name) + "</h3>" +
      '<div class="fcard__price">' + formatNaira(p.price) + "</div>" +
      '<div class="fcard__note">' + esc(p.note) + "</div>" +
      '<a class="hbtn is-green is-sm" href="' + productUrl(p.id) + '">Shop now</a>' +
      "</div></div>";
  }

  function accItem(title, body) {
    return '<div class="acc__item"><button class="acc__btn" type="button">' + title + "<i>+</i></button>" +
      '<div class="acc__panel"><p>' + body + "</p></div></div>";
  }

  function catNextMarkup(next) {
    return '<a class="cat-next" href="' + next.page + '">' +
      waveHTML("#fff2df", 2) +
      '<span class="cat-next__kicker">next collection &rarr;</span>' +
      '<span class="cat-next__name">' + next.plural + "</span></a>";
  }

  function productPageHTML(p) {
    var meta = CATEGORIES.find(function (c) { return c.id === p.cat; }) || CATEGORIES[0];
    var rel = productsByCat(p.cat).filter(function (x) { return x.id !== p.id; }).slice(0, 4);
    var idx = CATEGORIES.indexOf(meta);
    var next = CATEGORIES[(idx + 1) % CATEGORIES.length];
    var badge = "";
    if (p.badge === "new") badge = '<span class="pcard__badge">New</span>';
    if (p.badge === "hot") badge = '<span class="pcard__badge is-hot">Hot</span>';

    return '<section class="ppage">' +
      '<nav class="ppage__crumbs" aria-label="Breadcrumb">' +
      '<a href="index.html">Home</a><span>/</span>' +
      '<a href="' + meta.page + '">' + meta.plural + "</a><span>/</span>" +
      "<span>" + esc(p.name) + "</span></nav>" +
      '<div class="ppage__grid">' +
      '<div class="ppage__media will-animate">' + badge +
      '<img src="' + p.img + '" alt="' + esc(p.name) + " — Shugarlee Collectibles " + meta.plural + '">' +
      '<span class="ppage__note hand">hand-checked!</span></div>' +
      '<div class="ppage__info will-animate">' +
      '<span class="ppage__code">' + p.code + " &middot; " + meta.plural + "</span>" +
      '<h1 class="ppage__title">' + esc(p.name) + "</h1>" +
      '<div class="ppage__price">' + formatNaira(p.price) + "</div>" +
      '<div class="ppage__pricenote"><svg viewBox="0 0 100 60" aria-hidden="true"><use href="#d-squiggle"></use></svg>' + esc(p.note) + "</div>" +
      '<p class="ppage__desc">' + esc(p.desc) + "</p>" +
      '<div class="ppage__buy">' +
      '<div class="qty"><button type="button" data-q="dec" aria-label="Decrease quantity">&minus;</button>' +
      '<span class="js-qty">1</span>' +
      '<button type="button" data-q="inc" aria-label="Increase quantity">+</button></div>' +
      '<button class="hbtn is-green js-add" type="button" data-id="' + p.id + '">Add to bag</button>' +
      "</div>" +
      '<div class="acc">' +
      accItem("The piece", esc(p.desc) + " Part of the Shugarlee Collectibles drop — collected in small runs, so each one keeps its collectible spark.") +
      accItem("Delivery &amp; returns", "Nationwide delivery in 2–5 working days. Free over \u20A6200,000. Changed your mind? Returns accepted within 7 days, unworn and boxed.") +
      accItem("Payment", "Card, bank transfer or USSD — plus pay-on-delivery in Lagos. Instalments available on request, just ask.") +
      "</div></div></div></section>" +
      '<section class="related">' + waveHTML("#fffbec") +
      '<h2 class="related__title title title--green" data-split>More from ' + meta.plural + "</h2>" +
      '<div class="grid-products">' + rel.map(cardHTML).join("") + "</div>" +
      "</section>" +
      catNextMarkup(next);
  }

  root.esc = esc;
  root.cardHTML = cardHTML;
  root.fcardHTML = fcardHTML;
  root.productAccItem = accItem;
  root.productPageHTML = productPageHTML;
})(typeof window !== "undefined" ? window : globalThis);
