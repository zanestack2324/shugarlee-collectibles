/* ============================================================
   SHUGARLEE COLLECTIBLES — shared site chrome
   Builds header, menu, cart, footer, modal, cursor, transitions
   on every page from one source of truth.
   ============================================================ */

(function () {
  "use strict";

  /* ── helpers ─────────────────────────────────────────── */
  var LOGO = "Glossy Shugarlee Script Logo.png";
  var CART_KEY = "sc_cart_v1";
  var NL_KEY = "sc_nl_seen";
  var TRANS_KEY = "sc_trans";

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  function waveHTML(color, variant) {
    var p1 = "M0,72 C160,112 320,26 480,52 C640,78 800,114 960,76 C1120,38 1280,62 1440,44 L1440,160 L0,160 Z";
    var p2 = "M0,52 C180,96 340,20 520,64 C700,108 860,24 1040,58 C1220,92 1340,40 1440,66 L1440,160 L0,160 Z";
    var d = variant === 2 ? p2 : p1;
    return '<div class="wave"><svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + d + '" fill="' + color + '"></path></svg></div>';
  }
  window.waveHTML = waveHTML;

  /* ── doodle sprite ───────────────────────────────────── */
  var sprite =
    '<svg class="sr-only" aria-hidden="true" focusable="false"><defs>' +
    '<symbol id="d-star" viewBox="0 0 100 100"><path d="M50 6 L58.5 35.5 L90 36 L64.5 56 L74 88 L50 69 L26 88 L35.5 56 L10 36 L41.5 35.5 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></symbol>' +
    '<symbol id="d-spark" viewBox="0 0 100 100"><path d="M50 4 C54 30 70 46 96 50 C70 54 54 70 50 96 C46 70 30 54 4 50 C30 46 46 30 50 4 Z" fill="currentColor"/></symbol>' +
    '<symbol id="d-heart" viewBox="0 0 100 100"><path d="M50 88 C20 67 7 49 8 32 C9 17 21 7 34 8 C42 9 48 14 50 21 C53 13 59 8 67 8 C80 8 92 18 92 33 C92 50 79 67 50 88 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="d-arrow" viewBox="0 0 100 100"><path d="M8 78 C26 40 55 22 90 30 M90 30 L68 18 M90 30 L72 48" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="d-squiggle" viewBox="0 0 100 60"><path d="M4 32 C14 8 24 54 34 32 C44 10 54 54 64 32 C74 10 84 52 96 30" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></symbol>' +
    '<symbol id="d-underline" viewBox="0 0 100 40"><path d="M4 16 C30 6 70 8 96 14 M8 28 C34 22 66 24 92 30" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></symbol>' +
    '<symbol id="d-bag" viewBox="0 0 100 100"><path d="M24 34 h52 l6 52 h-64 z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M36 40 c0 -18 28 -18 28 0" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></symbol>' +
    '<symbol id="d-check" viewBox="0 0 100 100"><path d="M14 54 L40 78 L86 22" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="d-close" viewBox="0 0 100 100"><path d="M22 22 L78 78 M78 22 L22 78" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></symbol>' +
    '</defs></svg>';

  /* ── marquee content ─────────────────────────────────── */
  function marqueeGroup() {
    var items = [
      "Free nationwide delivery over " + "\u20A6" + "200,000",
      "New drop live now",
      "Small-batch collectibles",
      "Pay on delivery available",
      "Once it is gone, it is gone"
    ];
    var star = '<svg class="mq-star" aria-hidden="true"><use href="#d-spark"></use></svg>';
    var inner = items.map(function (t) { return "<span>" + t + "</span>" + star; }).join("");
    return '<div class="mq__group">' + inner + "</div>";
  }

  /* ── page chrome templates ───────────────────────────── */
  function bannerHTML() {
    return '<div class="banner is-fixed" role="region" aria-label="Announcements">' +
      '<div class="mq">' + marqueeGroup() + marqueeGroup() + "</div></div>";
  }

  function headerHTML() {
    return '<header class="hdr"><nav class="hdr__nav" aria-label="Main">' +
      '<a class="hdr__logo" href="index.html" aria-label="Shugarlee Collectibles — home">' +
      '<img src="' + LOGO + '" alt="Shugarlee Collectibles" loading="eager" width="420" height="140"></a>' +
      '<ul class="hdr__links">' +
      '<li><a href="shop.html" data-nav="shop">Shop</a></li>' +
      '<li><a href="bags.html" data-nav="bags">Bags</a></li>' +
      '<li><a href="jewelry.html" data-nav="jewelry">Jewelry</a></li>' +
      '<li><a href="shoes.html" data-nav="shoes">Shoes</a></li>' +
      '<li><a href="wigs.html" data-nav="wigs">Wigs</a></li>' +
      "</ul>" +
      '<div class="hdr__right">' +
      '<button class="hdr__cta js-menu-open" aria-expanded="false" aria-controls="menu">Menu</button>' +
      '<button class="hdr__cta js-cart-open" aria-expanded="false" aria-controls="cart">Cart <span class="cart-count" aria-live="polite">0</span></button>' +
      "</div></nav></header>";
  }

  function menuHTML() {
    var links = [
      ["index.html", "Home"], ["shop.html", "Shop all"], ["bags.html", "Bags"],
      ["jewelry.html", "Jewelry"], ["shoes.html", "Shoes"], ["wigs.html", "Wigs"],
      ["ceo.html", "Meet the CEO"]
    ];
    var rows = links.map(function (l) {
      return '<a href="' + l[0] + '"><span class="bg"></span><span class="text">' + l[1] + "</span></a>";
    }).join("");
    return '<div class="menu" id="menu" aria-hidden="true">' +
      '<div class="menu__overlay js-menu-close"></div>' +
      '<div class="menu__panel" role="dialog" aria-label="Site menu" data-lenis-prevent>' +
      '<button class="menu__close js-menu-close" aria-label="Close menu"><svg width="42%" height="42%"><use href="#d-close"></use></svg></button>' +
      '<div class="menu__deco" aria-hidden="true">' +
      '<span class="doodle"><svg><use href="#d-star"></use></svg></span>' +
      '<span class="doodle"><svg><use href="#d-heart"></use></svg></span>' +
      '<span class="doodle"><svg><use href="#d-spark"></use></svg></span>' +
      '<span class="doodle"><svg><use href="#d-squiggle"></use></svg></span>' +
      "</div>" +
      '<nav class="menu__links">' + rows + "</nav>" +
      '<p class="menu__foot">everything sweet, everything collectible</p>' +
      "</div></div>";
  }

  function cartHTML() {
    return '<aside class="cart" id="cart" aria-hidden="true" aria-label="Shopping bag" data-lenis-prevent>' +
      '<div class="cart__head"><h2 class="cart__title">Your bag<span>the sweet stash</span></h2>' +
      '<button class="cart__close js-cart-close" aria-label="Close bag"><svg width="44%" height="44%"><use href="#d-close"></use></svg></button></div>' +
      '<div class="cart__items"></div>' +
      '<div class="cart__foot">' +
      '<div class="cart__total"><span>Total</span><strong class="js-cart-total">' + "\u20A6" + '0</strong></div>' +
      '<p class="cart__ship js-cart-ship">free nationwide delivery over ' + "\u20A6" + '200,000</p>' +
      '<button class="hbtn is-amber js-checkout">Checkout</button>' +
      "</div></aside>";
  }

  var TIKTOK = "https://www.tiktok.com/@shugarlee_";
  var WHATSAPP = "https://wa.me/2348158011909";

  function footerHTML() {
    var nav = [["About us", "index.html#about", ""], ["Meet the CEO", "ceo.html", ""], ["Terms of sale", "#", "1"], ["Returns", "#", "1"], ["Privacy", "#", "1"], ["FAQ", "#", "1"]]
      .map(function (t) {
        return t[2]
          ? '<a href="#" data-soon="1">' + t[0] + "</a>"
          : '<a href="' + t[1] + '">' + t[0] + "</a>";
      }).join("");
    var socials = ["TikTok", "Instagram", "X / Twitter", "YouTube"]
      .map(function (n) { return '<a href="' + TIKTOK + '" target="_blank" rel="noopener">' + n + "</a>"; }).join("");
    return '<footer class="footer">' +
      '<img class="footer__bg" src="footer.jpg" alt="" loading="lazy" decoding="async">' +
      '<span class="footer__veil" aria-hidden="true"></span>' +
      '<div class="wave" data-fill="amber"></div>' +
      '<svg class="footer__deco" viewBox="0 0 700 220" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M60 40 l12 34 h36 l-29 22 l11 36 l-30 -22 l-30 22 l11 -36 l-29 -22 h36 z"/>' +
      '<path d="M350 30 c-46 -34 -84 -8 -80 22 c3 24 40 52 80 78 c40 -26 77 -54 80 -78 c4 -30 -34 -56 -80 -22 z"/>' +
      '<path d="M620 52 l10 28 h30 l-24 18 l9 30 l-25 -18 l-25 18 l9 -30 l-24 -18 h30 z"/>' +
      '<path d="M150 160 c22 -26 44 26 66 0 c22 -26 44 26 66 0"/>' +
      '<path d="M470 150 c18 -22 38 22 56 0 c18 -22 38 22 56 0"/>' +
      '<path d="M260 60 c0 -18 44 -18 44 0 c0 22 -22 40 -22 40 s-22 -18 -22 -40 z"/>' +
      "</svg>" +
      '<div class="footer__content">' +
      '<h2 class="footer__title">Join the newsletter and treat yourself</h2>' +
      '<form class="nlform js-nlform" novalidate><label class="sr-only" for="f-email">Email address</label>' +
      '<input id="f-email" type="email" name="email" placeholder="your@email.com" autocomplete="email" required>' +
      '<button class="hbtn" type="submit">Join now</button></form>' +
      '<nav class="footer__nav" aria-label="Legal">' + nav + "</nav>" +
      '<nav class="footer__social" aria-label="Social media">' + socials + "</nav>" +
      '<p class="footer__contact">Queen Vivian (CEO) · <a href="' + WHATSAPP + '" target="_blank" rel="noopener">WhatsApp 08158011909</a></p>' +
      '<img class="footer__logo" src="' + LOGO + '" alt="Shugarlee Collectibles" loading="lazy">' +
      '<p class="footer__copy">© 2026 Shugarlee Collectibles — all treats reserved.</p>' +
      "</div></footer>";
  }

  function modalHTML() {
    return '<div class="nlmodal" id="nlmodal" aria-hidden="true">' +
      '<div class="nlmodal__overlay js-nl-close"></div>' +
      '<div class="nlmodal__card" role="dialog" aria-label="Newsletter" data-lenis-prevent>' +
      '<button class="nlmodal__close js-nl-close" aria-label="Close"><svg width="40%" height="40%"><use href="#d-close"></use></svg></button>' +
      '<svg class="nlmodal__doodle --l" viewBox="0 0 100 100" aria-hidden="true"><use href="#d-star"></use></svg>' +
      '<svg class="nlmodal__doodle --r" viewBox="0 0 100 100" aria-hidden="true"><use href="#d-heart"></use></svg>' +
      '<img class="nlmodal__logo" src="' + LOGO + '" alt="">' +
      '<h2 class="nlmodal__title">Want first dibs?</h2>' +
      '<p class="nlmodal__text">Join the newsletter for early access, sweet discounts and LOTS of surprises.</p>' +
      '<form class="nlform js-nlform" novalidate><label class="sr-only" for="m-email">Email address</label>' +
      '<input id="m-email" type="email" name="email" placeholder="your@email.com" autocomplete="email" required>' +
      '<button class="hbtn" type="submit">Join now</button></form>' +
      '<p class="nlmodal__quote hand">From Shugarlee Collectibles, with love</p>' +
      "</div></div>";
  }

  function loaderHTML() {
    return '<div class="loader" aria-hidden="true"><div class="loader__inner">' +
      '<img class="loader__logo" src="' + LOGO + '" alt="">' +
      '<div class="loader__bar"><i></i></div>' +
      '<p class="loader__note">unpacking something sweet…</p>' +
      "</div></div>";
  }

  function transHTML() {
    return '<div class="ptrans" aria-hidden="true"><div class="ptrans__panel"></div>' +
      '<svg class="ptrans__edge" viewBox="0 0 120 1000" preserveAspectRatio="none">' +
      '<path d="M120 0 H52 C14 120 84 240 52 360 C20 480 84 600 52 720 C20 840 84 924 52 1000 H120 Z" fill="currentColor"/></svg></div>';
  }

document.body.insertAdjacentHTML("afterbegin",
    sprite + loaderHTML() + bannerHTML() + headerHTML());
  document.body.insertAdjacentHTML("beforeend",
    menuHTML() + cartHTML() + modalHTML() + footerHTML() + transHTML() +
    '<div class="toasts" role="status" aria-live="polite"></div>' +
    '<a class="skip" href="#main">Skip to content</a>');

  /* footer wave fill */
  var fw = $(".footer .wave");
  if (fw) fw.innerHTML = '<svg viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0,72 C160,112 320,26 480,52 C640,78 800,114 960,76 C1120,38 1280,62 1440,44 L1440,160 L0,160 Z" fill="#ffbf00"></path></svg>';

  /* mark current nav item */
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$("[data-nav]").forEach(function (a) {
    if (a.getAttribute("data-nav") + ".html" === here) a.classList.add("is-current");
  });

  /* ── toast system ────────────────────────────────────── */
  function toast(msg, type) {
    var box = $(".toasts");
    var t = el('<div class="toast toast--' + (type || "info") + '"><svg><use href="#d-check"></use></svg><span></span></div>');
    t.querySelector("span").textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("is-in"); });
    setTimeout(function () {
      t.classList.remove("is-in");
      t.classList.add("is-out");
      setTimeout(function () { t.remove(); }, 500);
    }, 3200);
  }
  window.SC = { toast: toast };

  /* ── overlays: menu / cart / modal ───────────────────── */
  var menu = $("#menu"), cart = $("#cart"), modal = $("#nlmodal");
  var body = document.body;

  function lock(on) { body.classList.toggle("no-scroll", on); }

  function openMenu(on) {
    menu.classList.toggle("is-open", on);
    menu.setAttribute("aria-hidden", String(!on));
    $(".js-menu-open").setAttribute("aria-expanded", String(on));
    if (on) { closeCart(); lock(true); } else { lock(false); }
  }
  function closeMenu() { openMenu(false); }

  function openCart(on) {
    cart.classList.toggle("is-open", on);
    cart.setAttribute("aria-hidden", String(!on));
    $(".js-cart-open").setAttribute("aria-expanded", String(on));
    if (on) { closeMenu(); lock(true); } else { lock(false); }
  }
  function closeCart() { openCart(false); }

  $(".js-menu-open").addEventListener("click", function () { openMenu(!menu.classList.contains("is-open")); });
  $$(".js-menu-close").forEach(function (b) { b.addEventListener("click", closeMenu); });
  $(".js-cart-open").addEventListener("click", function () { openCart(!cart.classList.contains("is-open")); });
  $$(".js-cart-close").forEach(function (b) { b.addEventListener("click", closeCart); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMenu(); closeCart(); closeModal(); }
  });

  function openModal(on) {
    modal.classList.toggle("is-open", on);
    modal.setAttribute("aria-hidden", String(!on));
    if (on) lock(true); else lock(false);
  }
  function closeModal() {
    if (modal.classList.contains("is-open")) {
      openModal(false);
      try { localStorage.setItem(NL_KEY, "1"); } catch (e) {}
    }
  }
  $$(".js-nl-close").forEach(function (b) { b.addEventListener("click", closeModal); });

  var seen = null;
  try { seen = localStorage.getItem(NL_KEY); } catch (e) {}
  if (!seen) setTimeout(function () { if (!menu.classList.contains("is-open")) openModal(true); }, 5200);

  /* ── newsletter forms ────────────────────────────────── */
  $$(".js-nlform").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = f.querySelector("input");
      var v = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        toast("That email looks a little sticky — try again", "error");
        input.focus();
        return;
      }
      input.value = "";
      closeModal();
      toast("You are on the list — welcome to the sugar club", "success");
    });
  });

  /* placeholder links */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[data-soon], a[href="#"]');
    if (!a) return;
    e.preventDefault();
    if (a.dataset.social) {
      toast("Our " + a.dataset.social + " drops soon — follow for the reveal", "info");
    } else {
      toast("That page is still being baked", "info");
    }
  });

  /* ── header scroll state ─────────────────────────────── */
  var hdr = $(".hdr");
  function onScroll() { hdr.classList.toggle("is-scrolled", window.scrollY > 30); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── cart ────────────────────────────────────────────── */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeCart(c) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    renderCart();
    document.dispatchEvent(new CustomEvent("sc:cart"));
  }
  window.SC.cart = { read: readCart, write: writeCart };

  function renderCart() {
    var c = readCart();
    var count = c.reduce(function (s, i) { return s + i.qty; }, 0);
    var total = c.reduce(function (s, i) {
      var p = getProduct(i.id);
      return p ? s + p.price * i.qty : s;
    }, 0);

    var badge = $(".cart-count");
    badge.textContent = count;
    badge.classList.toggle("is-on", count > 0);
    $(".js-cart-total").textContent = "\u20A6" + total.toLocaleString("en-NG");
    $(".js-cart-ship").textContent = total >= 200000
      ? "you unlocked free nationwide delivery!"
      : "free nationwide delivery over \u20A6200,000";

    var box = $(".cart__items");
    if (!c.length) {
      box.innerHTML = '<div class="cart__empty"><svg viewBox="0 0 100 100"><use href="#d-heart"></use></svg>' +
        "<p>your bag is emptier<br>than it should be…</p>" +
        '<button class="hbtn is-green is-sm js-cart-shop">Go treat yourself</button></div>';
      var go = $(".js-cart-shop", box);
      if (go) go.addEventListener("click", function () { closeCart(); location.href = "shop.html"; });
      return;
    }

    box.innerHTML = c.map(function (item) {
      var p = getProduct(item.id);
      if (!p) return "";
      return '<div class="cart__row" data-id="' + p.id + '">' +
        '<img class="cart__thumb" src="' + p.img + '" alt="" loading="lazy">' +
        '<div class="cart__info"><a class="cart__name" href="' + productUrl(p.id) + '">' + p.name + "</a>" +
        '<div class="cart__price">' + formatNaira(p.price) + "</div>" +
        '<div class="cart__qty"><button type="button" data-act="dec" aria-label="Decrease quantity">−</button>' +
        "<span>" + item.qty + "</span>" +
        '<button type="button" data-act="inc" aria-label="Increase quantity">+</button></div></div>' +
        '<button class="cart__rm" type="button" data-act="rm">remove</button>' +
        "</div>";
    }).join("");
  }

  $(".cart__items").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var row = btn.closest(".cart__row");
    var id = row.getAttribute("data-id");
    var c = readCart();
    var item = c.find(function (i) { return i.id === id; });
    if (!item) return;
    var act = btn.getAttribute("data-act");
    if (act === "inc") item.qty++;
    if (act === "dec") item.qty--;
    if (act === "rm" || item.qty <= 0) c = c.filter(function (i) { return i.id !== id; });
    writeCart(c);
  });

  function addToCart(id, qty) {
    var p = getProduct(id);
    if (!p) return;
    var c = readCart();
    var item = c.find(function (i) { return i.id === id; });
    if (item) item.qty += qty || 1;
    else c.push({ id: id, qty: qty || 1 });
    writeCart(c);
    var badge = $(".cart-count");
    badge.classList.remove("is-bump");
    void badge.offsetWidth;
    badge.classList.add("is-bump");
    toast("“" + p.name + "” added to your bag", "success");
  }
  window.SC.add = addToCart;

  $(".js-checkout").addEventListener("click", function () {
    var c = readCart();
    if (!c.length) { toast("Your bag is empty — pick something sweet first", "error"); return; }
    location.href = "checkout.html";
  });

  /* quick-add (event delegation across pages) */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".js-quick-add");
    if (q) {
      e.preventDefault();
      e.stopPropagation();
      addToCart(q.getAttribute("data-id"), 1);
    }
  });

  renderCart();

  /* ── page transitions ────────────────────────────────── */
  var trans = $(".ptrans");
  var navigated = false;

  function playIn(cb) {
    trans.style.transform = "translateX(-103%)";
    requestAnimationFrame(function () {
      trans.style.transition = "transform .65s cubic-bezier(.19,1,.22,1)";
      trans.style.transform = "translateX(0)";
      setTimeout(cb, 660);
    });
  }
  function playOut() {
    trans.style.transform = "translateX(0)";
    requestAnimationFrame(function () {
      trans.style.transition = "transform .7s cubic-bezier(.19,1,.22,1)";
      trans.style.transform = "translateX(103%)";
      setTimeout(function () {
        trans.style.transition = "none";
        trans.style.transform = "translateX(-103%)";
      }, 740);
    });
  }

  var visited = false;
  try { visited = sessionStorage.getItem(TRANS_KEY) === "1"; sessionStorage.removeItem(TRANS_KEY); } catch (e) {}
  if (visited) {
    var ld = document.querySelector(".loader");
    if (ld) ld.remove();
    trans.style.transform = "translateX(0)";
    requestAnimationFrame(function () { requestAnimationFrame(playOut); });
  }

  document.addEventListener("click", function (e) {
    if (navigated) return;
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || a.target === "_blank" || a.hasAttribute("download")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (/^(https?:|mailto:|tel:)/i.test(href)) return;
    var url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    if (url.href === location.href) return;
    e.preventDefault();
    navigated = true;
    try { sessionStorage.setItem(TRANS_KEY, "1"); } catch (err) {}
    closeMenu(); closeCart(); closeModal();
    playIn(function () { location.href = url.href; });
  });

  /* ── loader ──────────────────────────────────────────── */
  var loader = $(".loader");
  var readyFired = false;
  function dismissLoader() {
    if (!readyFired) {
      readyFired = true;
      document.dispatchEvent(new CustomEvent("sc:ready"));
    }
    if (!loader || loader.dataset.done) return;
    loader.dataset.done = "1";
    loader.classList.add("is-done");
    setTimeout(function () { loader.remove(); }, 1000);
  }
  window.addEventListener("load", function () { setTimeout(dismissLoader, 450); });
  setTimeout(dismissLoader, 3200);

  })();
