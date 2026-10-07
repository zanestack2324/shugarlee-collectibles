/* ============================================================
   SHUGARLEE COLLECTIBLES — animations + page rendering
   GSAP + ScrollTrigger + Lenis, sweet scroll choreography
   ============================================================ */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var main = document.getElementById("main");

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Lenis smooth scroll ─────────────────────────────── */
  var lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ── templates ───────────────────────────────────────── */
  /* cardHTML / fcardHTML / productPageHTML come from js/product-template.js */

  function doodleHTML(kind, cls) {
    return '<span class="doodle ' + cls + '" aria-hidden="true"><svg><use href="#d-' + kind + '"></use></svg></span>';
  }

  function heroTop(title, kicker, sub, bg) {
    var backdrop = bg
      ? '<img class="page-hero__bg" src="' + bg + '" alt="" fetchpriority="high">' +
        '<span class="page-hero__veil" aria-hidden="true"></span>'
      : "";
    return '<section class="page-hero">' + backdrop +
      doodleHTML("star", "--a") + doodleHTML("heart", "--b") +
      '<div class="page-hero__inner">' +
      '<span class="page-hero__kicker hand">' + kicker + "</span>" +
      '<h1 class="page-hero__title split" data-split>' + title + "</h1>" +
      '<p class="page-hero__sub">' + sub + "</p>" +
      "</div></section>";
  }

  function catNextHTML(next) {
    return '<a class="cat-next" href="' + next.page + '">' +
      waveHTML("#fff2df", 2) +
      '<span class="cat-next__kicker">next collection →</span>' +
      '<span class="cat-next__name">' + next.plural + "</span></a>";
  }

  /* ── split text ──────────────────────────────────────── */
  function splitInto(target, nodes) {
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { target.appendChild(document.createTextNode(" ")); return; }
          var wrap = document.createElement("span");
          wrap.className = "w";
          Array.from(w).forEach(function (ch) {
            var s = document.createElement("span");
            s.className = "ch";
            s.textContent = ch;
            wrap.appendChild(s);
          });
          target.appendChild(wrap);
        });
      } else if (node.nodeType === 1) {
        if (node.tagName === "BR") { target.appendChild(node.cloneNode()); return; }
        var same = document.createElement(node.tagName.toLowerCase());
        for (var i = 0; i < node.attributes.length; i++) {
          same.setAttribute(node.attributes[i].name, node.attributes[i].value);
        }
        splitInto(same, Array.from(node.childNodes));
        target.appendChild(same);
      }
    });
  }

  function splitText(el) {
    var nodes = Array.from(el.childNodes);
    el.textContent = "";
    splitInto(el, nodes);
    el.classList.add("split");
  }

  /* ── reveal system ───────────────────────────────────── */
  function initReveals(scope) {
    scope = scope || document;

    $$("[data-split]", scope).forEach(function (el) {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = "1";
      splitText(el);
      var chs = $$(".ch", el);
      gsap.fromTo(chs,
        { yPercent: 115, rotation: 4, opacity: 0 },
        {
          yPercent: 0, rotation: 0, opacity: 1,
          duration: 1, ease: "expo.out", stagger: 0.016,
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        });
    });

    $$(".will-animate", scope).forEach(function (el) {
      if (el.dataset.revDone) return;
      el.dataset.revDone = "1";
      gsap.fromTo(el,
        { y: 64, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true }
        });
    });
  }

  /* ── page rendering ──────────────────────────────────── */
  var page = main ? main.dataset.page : "home";

  function renderIndex() {
    var grid = $("#arrivals-grid");
    if (grid) {
      grid.innerHTML = LATEST_IDS.map(function (id) {
        var p = getProduct(id);
        return p ? cardHTML(p) : "";
      }).join("");
    }
    var track = $("#featured-track");
    if (track) {
      track.innerHTML = FEATURED_IDS.map(function (id) {
        var p = getProduct(id);
        return p ? fcardHTML(p) : "";
      }).join("");
    }
  }

  function renderCategory(cat) {
    var meta = CATEGORIES.find(function (c) { return c.id === cat; }) || CATEGORIES[0];
    var items = productsByCat(meta.id);
    var idx = CATEGORIES.indexOf(meta);
    var next = CATEGORIES[(idx + 1) % CATEGORIES.length];

    main.innerHTML =
      heroTop(meta.plural, "the collection",
        items.length + " pieces — small-batch, hand-checked & ready to collect", meta.header) +
      '<section class="sec sec--tile cat-grid">' + waveHTML("#fffbec", 2) +
      '<p class="shop-count">picked with love, boxed with care <svg class="shop-count__star" viewBox="0 0 100 100" aria-hidden="true"><use href="#d-star"></use></svg></p>' +
      '<div class="grid-products">' + items.map(cardHTML).join("") + "</div>" +
      "</section>" +
      catNextHTML(next);
  }

  function renderShop() {
    var chips = CATEGORIES.map(function (c) {
      return '<button class="chip" type="button" data-filter="' + c.id + '">' + c.plural + "</button>";
    }).join("");

    var sections = CATEGORIES.map(function (c) {
      var items = productsByCat(c.id);
      return '<div class="shop-sec" data-cat="' + c.id + '">' +
        '<div class="shop-sec__head">' +
        '<h2 class="title title--green" data-split>' + c.plural + "</h2>" +
        '<p class="shop-count">' + items.length + ' pieces <svg class="shop-count__star" viewBox="0 0 100 100" aria-hidden="true"><use href="#d-star"></use></svg></p>' +
        "</div>" +
        '<div class="grid-products">' + items.map(cardHTML).join("") + "</div>" +
        '<div class="shop-sec__foot"><a class="hbtn is-green is-sm" href="' + c.page + '">See all ' + c.plural + "</a></div>" +
        "</div>";
    }).join("");

    main.innerHTML =
      heroTop("The Shop", "the whole sugar shelf",
        PRODUCTS.length + " sweet pieces across " + CATEGORIES.length + " collections", "header 1.jpg") +
      '<div class="filters">' +
      '<button class="chip is-active" type="button" data-filter="all">All</button>' + chips +
      "</div>" +
      '<section class="sec sec--tile cat-grid">' + waveHTML("#fffbec", 2) +
      '<div class="shop-secwrap js-shop-secwrap">' + sections + "</div>" +
      "</section>";

    var secWrap = $(".js-shop-secwrap");
    var secs = $$(".shop-sec", secWrap);

    function paint(filter, animate) {
      secs.forEach(function (sec) {
        var show = filter === "all" || sec.dataset.cat === filter;
        if (show) {
          sec.style.display = "";
          if (animate) gsap.fromTo(sec, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .55, ease: "expo.out" });
        } else {
          sec.style.display = "none";
        }
      });
      ScrollTrigger.refresh();
    }

    $$(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        $$(".chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        paint(chip.dataset.filter, true);
      });
    });

    paint("all", false);
  }

  function renderProduct() {
    /* dedicated static pages (bags-01.html …) — content is pre-rendered in HTML */
    var staticId = main.dataset.product;
    if (staticId) {
      var sp = getProduct(staticId);
      if (sp) { bindProduct(sp); return; }
    }

    /* product.html?id=… — send visitors & crawlers to the dedicated page */
    var id = new URLSearchParams(location.search).get("id");
    if (id) {
      var found = getProduct(id);
      if (found) { location.replace(productUrl(found.id)); return; }
      main.innerHTML = heroTop("Not found", "oops", "that piece seems to have been collected already") +
        '<div class="filters"><a class="hbtn is-green" href="shop.html">Back to the shop</a></div>';
      return;
    }

    /* bare product.html — no product to show */
    location.replace("shop.html");
  }

  function bindProduct(p) {
    var qty = $(".js-qty", main);
    if (qty) {
      $$(".qty button", main).forEach(function (b) {
        b.addEventListener("click", function () {
          var v = parseInt(qty.textContent, 10) || 1;
          v = b.dataset.q === "inc" ? Math.min(9, v + 1) : Math.max(1, v - 1);
          qty.textContent = v;
        });
      });
    }
    var addBtn = $(".js-add", main);
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        window.SC.add(p.id, parseInt((qty && qty.textContent) || "1", 10) || 1);
      });
    }
    bindAccordions(main);
  }

  function bindAccordions(scope) {
    $$(".acc__btn", scope).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var panel = btn.nextElementSibling;
        var open = item.classList.toggle("is-open");
        if (open) {
          panel.style.height = panel.scrollHeight + "px";
          setTimeout(function () {
            if (item.classList.contains("is-open")) panel.style.height = "auto";
          }, 520);
        } else {
          panel.style.height = panel.scrollHeight + "px";
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { panel.style.height = "0px"; });
          });
        }
        ScrollTrigger.refresh();
      });
    });
  }

  /* ── checkout ────────────────────────────────────────── */
  var SHIP_FEE = 5000;
  var FREE_OVER = 200000;

  function renderCheckout() {
    var wrap = $(".js-checkout-wrap", main);
    if (!wrap) return;

    function readCart() { return (window.SC && window.SC.cart) ? window.SC.cart.read() : []; }
    function totals() {
      var c = readCart();
      var sub = c.reduce(function (s, i) {
        var p = getProduct(i.id);
        return p ? s + p.price * i.qty : s;
      }, 0);
      var ship = (!c.length || sub >= FREE_OVER) ? 0 : SHIP_FEE;
      return { c: c, sub: sub, ship: ship, total: sub + ship };
    }

    function itemRow(item) {
      var p = getProduct(item.id);
      if (!p) return "";
      return '<li class="co-item" data-id="' + p.id + '">' +
        '<a class="co-item__media" href="' + productUrl(p.id) + '" tabindex="-1" aria-hidden="true">' +
        '<img src="' + p.img + '" alt="" loading="lazy"></a>' +
        '<div class="co-item__info">' +
        '<a class="co-item__name" href="' + productUrl(p.id) + '">' + esc(p.name) + "</a>" +
        '<span class="co-item__code">' + p.code + " · " + formatNaira(p.price) + "</span>" +
        '<div class="qty qty--sm"><button type="button" data-coq="dec" aria-label="Decrease quantity">&minus;</button>' +
        "<span>" + item.qty + "</span>" +
        '<button type="button" data-coq="inc" aria-label="Increase quantity">+</button></div>' +
        "</div>" +
        '<div class="co-item__sum">' + formatNaira(p.price * item.qty) + "</div>" +
        '<button class="co-item__rm" type="button" data-corm aria-label="Remove item">&times;</button>' +
        "</li>";
    }

    function emptyHTML() {
      return '<div class="checkout__empty">' +
        '<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#d-heart"></use></svg>' +
        "<h2>Your bag is empty</h2>" +
        "<p>Pick something sweet and it will show up right here.</p>" +
        '<a class="hbtn is-green" href="shop.html">Browse the shop</a></div>';
    }

    function sumHTML(t) {
      return '<div class="co-sum__row"><span>Subtotal</span><b>' + formatNaira(t.sub) + "</b></div>" +
        '<div class="co-sum__row"><span>Delivery</span><b class="' + (t.ship ? "" : "is-free") + '">' +
        (t.ship ? formatNaira(t.ship) : "Free") + "</b></div>" +
        '<div class="co-sum__row co-sum__row--total"><span>Total</span><b>' + formatNaira(t.total) + "</b></div>" +
        '<p class="co-sum__note hand">' +
        (t.sub >= FREE_OVER ? "you unlocked free nationwide delivery!" :
          "add " + formatNaira(FREE_OVER - t.sub) + " more for free delivery") + "</p>";
    }

    wrap.innerHTML =
      '<div class="checkout__grid">' +
      '<div class="checkout__col">' +
      '<section class="co-block"><h2 class="co-block__title"><i>1</i>Your bag</h2>' +
      '<ul class="co-items js-co-items"></ul></section>' +
      '<form class="co-form js-co-form" novalidate>' +
      '<section class="co-block"><h2 class="co-block__title"><i>2</i>Who is it for</h2>' +
      '<div class="co-fields">' +
      fieldHTML("co-name", "Full name", "text", "Adaeze Okonkwo", "autocomplete=\"name\"") +
      fieldHTML("co-phone", "Phone", "tel", "0801 234 5678", "autocomplete=\"tel\"") +
      fieldHTML("co-email", "Email", "email", "you@email.com", "autocomplete=\"email\"") +
      "</div></section>" +
      '<section class="co-block"><h2 class="co-block__title"><i>3</i>Delivery</h2>' +
      '<div class="co-fields">' +
      fieldHTML("co-address", "Address", "text", "12 Sugar Street, Lekki", "autocomplete=\"street-address\"") +
      fieldHTML("co-city", "City", "text", "Lagos", "autocomplete=\"address-level2\"") +
      fieldHTML("co-state", "State", "text", "Lagos", "autocomplete=\"address-level1\"") +
      "</div></section>" +
      '<section class="co-block"><h2 class="co-block__title"><i>4</i>Payment</h2>' +
      '<div class="co-pay">' +
      '<label class="co-pay__opt"><input type="radio" name="co-pay" value="Card / bank transfer">' +
      "<span><b>Card or bank transfer</b><small>Pay now — your piece ships same day</small></span></label>" +
      '<label class="co-pay__opt"><input type="radio" name="co-pay" value="Pay on delivery">' +
      "<span><b>Pay on delivery</b><small>Cash on arrival — available nationwide</small></span></label>" +
      "</div></section>" +
      "</form>" +
      "</div>" +
      '<aside class="checkout__side co-sum">' +
      '<h2 class="co-block__title">Order summary</h2>' +
      '<div class="co-sum__rows js-co-sum"></div>' +
      '<button class="hbtn is-green co-sum__go js-place" type="submit" form="none">Place order</button>' +
      '<p class="co-sum__fine">By placing your order you agree to our terms of sale. We call to confirm every order.</p>' +
      "</aside></div>";

    var form = $(".js-co-form", main);
    form.id = "co-form";
    var placeBtn = $(".js-place", main);
    placeBtn.setAttribute("form", "co-form");

    var itemsEl = $(".js-co-items", main);
    var sumEl = $(".js-co-sum", main);
    var grid = $(".checkout__grid", main);

    function paint() {
      var t = totals();
      if (!t.c.length) {
        grid.classList.add("is-empty");
        itemsEl.innerHTML = emptyHTML();
        sumEl.innerHTML = "";
        placeBtn.disabled = true;
      } else {
        grid.classList.remove("is-empty");
        itemsEl.innerHTML = t.c.map(itemRow).join("");
        sumEl.innerHTML = sumHTML(t);
        placeBtn.disabled = false;
      }
    }

    itemsEl.addEventListener("click", function (e) {
      var q = e.target.closest("[data-coq]");
      var rm = e.target.closest("[data-corm]");
      if (!q && !rm) return;
      var row = e.target.closest(".co-item");
      if (!row) return;
      var c = readCart();
      var item = c.find(function (i) { return i.id === row.getAttribute("data-id"); });
      if (!item) return;
      if (rm) c = c.filter(function (i) { return i.id !== item.id; });
      else if (q.getAttribute("data-coq") === "inc") item.qty = Math.min(9, item.qty + 1);
      else item.qty -= 1;
      if (item.qty <= 0) c = c.filter(function (i) { return i.id !== item.id; });
      window.SC.cart.write(c);
    });

    document.addEventListener("sc:cart", paint);
    paint();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var t = totals();
      if (!t.c.length) {
        window.SC.toast("Your bag is empty — pick something sweet first", "error");
        return;
      }

      var bad = null;
      function check(id, test) {
        var input = document.getElementById(id);
        var ok = test((input.value || "").trim());
        input.classList.toggle("is-bad", !ok);
        input.setAttribute("aria-invalid", String(!ok));
        if (!ok && !bad) bad = input;
        return ok;
      }

      var ok = true;
      ok = check("co-name", function (v) { return v.length >= 2; }) && ok;
      ok = check("co-phone", function (v) { return (v.replace(/\D/g, "").length >= 7); }) && ok;
      ok = check("co-email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }) && ok;
      ok = check("co-address", function (v) { return v.length >= 5; }) && ok;
      ok = check("co-city", function (v) { return v.length >= 2; }) && ok;
      ok = check("co-state", function (v) { return v.length >= 2; }) && ok;

      var pay = form.querySelector('input[name="co-pay"]:checked');
      if (!pay) {
        ok = false;
        if (!bad) bad = form.querySelector('input[name="co-pay"]');
      }

      if (!ok) {
        window.SC.toast("A few details are missing — check the highlighted fields", "error");
        if (bad) bad.focus();
        return;
      }

      var order = "SC-" + Date.now().toString(36).toUpperCase().slice(-6);
      var name = document.getElementById("co-name").value.trim().split(" ")[0];
      var phone = document.getElementById("co-phone").value.trim();
      window.SC.cart.write([]);

      wrap.innerHTML =
        '<div class="checkout__done">' +
        '<svg class="checkout__doneIcon" viewBox="0 0 100 100" aria-hidden="true"><use href="#d-check"></use></svg>' +
        '<p class="eyebrow">order received</p>' +
        "<h2>Thank you, " + esc(name) + "!</h2>" +
        '<p class="checkout__doneText">Your order <b>' + order + "</b> is in. We will call you on <b>" +
        esc(phone) +
        "</b> shortly to confirm delivery details.</p>" +
        '<div class="checkout__doneTotal"><span>Paid via</span><b>' + esc(pay.value) + "</b>" +
        "<span>Order total</span><b>" + formatNaira(t.total) + "</b></div>" +
        '<a class="hbtn is-green" href="shop.html">Keep collecting</a>' +
        '<p class="checkout__doneHand hand">packed with love — see you soon!</p>' +
        "</div>";

      if (wrap.scrollIntoView) wrap.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function fieldHTML(id, label, type, ph, attrs) {
    return '<label class="field" for="' + id + '">' +
      '<span class="field__label">' + label + "</span>" +
      '<input class="field__input" id="' + id + '" name="' + id + '" type="' + type + '" placeholder="' + ph + '" ' +
      (attrs || "") + " autocomplete=\"on\"></label>";
  }

  /* ── page routing ────────────────────────────────────── */
  if (page === "home") renderIndex();
  else if (page === "category" && main.dataset.cat) renderCategory(main.dataset.cat);
  else if (page === "shop") renderShop();
  else if (page === "product") renderProduct();
  else if (page === "checkout") renderCheckout();

  initReveals(document);

  /* ── hero intro + scrub ──────────────────────────────── */
  var introRan = false;
  function heroIntro() {
    if (introRan) return;
    introRan = true;
    if (page !== "home" || reduced) return;
    var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(".hero__logo", { scale: .72, opacity: 0, rotation: -5 }, { scale: 1, opacity: 1, rotation: 0, duration: 1.4 }, .08)
      .fromTo(".hero__tags", { y: 26, opacity: 0 }, { y: 0, opacity: .8, duration: .9 }, .42)
      .fromTo(".hero__photo", { y: 54, scale: .55, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.2, stagger: .11 }, .3)
      .fromTo(".hero__note", { y: 34, opacity: 0, rotation: -14 }, { y: 0, opacity: 1, rotation: 0, duration: 1, stagger: .14 }, .55)
      .fromTo(".hero__doodle", { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 1.1, stagger: .09 }, .35)
      .fromTo(".hero__cta", { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: .9 }, .8);
  }
  document.addEventListener("sc:ready", heroIntro);
  setTimeout(function () { heroIntro(); }, 4200);

  if (page === "home" && !reduced) {
    var htl = gsap.timeline({
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: .5 }
    });
    htl.to(".hero__logo", { scale: 1.12, y: -46, duration: 1.4 }, 0)
      .to(".hero__tags", { opacity: 0, y: -36, duration: .6 }, 0)
      .to(".hero__photo", { yPercent: -85, opacity: 0, duration: 1.5, stagger: .07 }, 0)
      .to(".hero__note", { opacity: 0, y: -60, duration: .6, stagger: .12 }, .1)
      .to(".hero__cta", { opacity: 0, y: 34, duration: .5 }, .55)
      .to(".hero__blob.--a", { xPercent: 22, yPercent: 30, scale: 1.35, rotation: 40, duration: 1.6 }, 0)
      .to(".hero__blob.--b", { xPercent: 18, yPercent: -26, scale: 1.3, rotation: -30, duration: 1.6 }, 0)
      .to(".hero__blob.--c", { xPercent: 120, yPercent: -60, scale: .6, duration: 1.6 }, 0)
      .to(".hero__doodle", { yPercent: -90, rotation: 70, duration: 1.6, stagger: .06 }, 0);
  }

  /* floating doodle loops */
  if (!reduced) {
    gsap.utils.toArray(".doodle").forEach(function (d, i) {
      gsap.to(d, {
        y: gsap.utils.random(10, 22) * (i % 2 ? -1 : 1),
        x: gsap.utils.random(-8, 8),
        duration: gsap.utils.random(2.4, 4.2),
        delay: gsap.utils.random(0, 1.4),
        repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    });
  }

  /* ── category sticky stack ───────────────────────────── */
  $$(".cat-panel").forEach(function (panel) {
    var img = $(".cat-panel__img", panel);
    if (img && !reduced) {
      gsap.fromTo(img, { scale: 1.24, yPercent: -5 }, {
        scale: 1.04, yPercent: 5, ease: "none",
        scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true }
      });
    }
    var content = $(".cat-panel__content", panel);
    if (content) {
      gsap.fromTo(content, { y: 90, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: panel, start: "top 55%", once: true }
      });
    }
  });

  /* ── featured horizontal pin ─────────────────────────── */
  var viewport = $(".featured__viewport");
  var track = $(".featured__track");
  if (viewport && track && !reduced) {
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 40); };
    if (dist() > 10) {
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: function () { return "+=" + dist(); },
          pin: true,
          scrub: .8,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
    }
    gsap.fromTo(".fcard", { x: 110, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: .12,
      scrollTrigger: { trigger: viewport, start: "top 72%", once: true }
    });
  }

  /* ── manifesto / tagline / about / social ────────────── */
  var feeling = $(".feeling__text");
  if (feeling && !reduced) {
    gsap.fromTo(".feeling__sign", { y: 40, opacity: 0, rotation: -8 }, {
      y: 0, opacity: 1, rotation: -3, duration: 1, ease: "expo.out", delay: .4,
      scrollTrigger: { trigger: feeling, start: "top 70%", once: true }
    });
  }

  var tagLogo = $(".tagline__logo");
  if (tagLogo) {
    gsap.fromTo(tagLogo, { scale: .6, opacity: 0, rotation: -6 }, {
      scale: 1, opacity: 1, rotation: 0, duration: 1.3, ease: "back.out(1.4)",
      scrollTrigger: { trigger: tagLogo, start: "top 88%", once: true }
    });
  }

  $$("[data-count]").forEach(function (el) {
    var end = parseInt(el.dataset.count, 10) || 0;
    var obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: function () { el.textContent = Math.round(obj.v); }
    });
  });

  var social = $(".social");
  if (social && !reduced) {
    $$(".social__line", social).forEach(function (line, i) {
      gsap.fromTo(line, { xPercent: i % 2 ? 8 : -14 }, {
        xPercent: i % 2 ? -14 : 8, ease: "none",
        scrollTrigger: { trigger: social, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
    gsap.fromTo(".plate", { y: 70, opacity: 0, rotation: -10 }, {
      y: 0, opacity: 1, rotation: 0, duration: .9, ease: "back.out(1.6)", stagger: .1,
      scrollTrigger: { trigger: ".signpost", start: "top 80%", once: true }
    });
    if (!reduced) {
      gsap.to(".signpost__cap", {
        rotation: 200, ease: "none",
        scrollTrigger: { trigger: social, start: "top bottom", end: "bottom top", scrub: true }
      });
    }
  }

  /* about band entrance */
  var about = $(".about");
  if (about) {
    gsap.fromTo(".about__grid > *", { y: 70, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: .14,
      scrollTrigger: { trigger: about, start: "top 72%", once: true }
    });
  }

  /* ── magnetic buttons ────────────────────────────────── */
  if (fine && !reduced) {
    $$(".hbtn").forEach(function (btn) {
      btn.addEventListener("mouseenter", function () { gsap.set(btn, { transition: "none" }); });
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * .26,
          y: (e.clientY - r.top - r.height / 2) * .38,
          duration: .5, ease: "power3.out", overwrite: "auto"
        });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          x: 0, y: 0, duration: .7, ease: "elastic.out(1, .4)",
          onComplete: function () { gsap.set(btn, { transition: "" }); }
        });
      });
    });
  }

  /* ── smooth anchor scrolling ─────────────────────────── */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-scroll]");
    if (!a) return;
    e.preventDefault();
    var target = document.querySelector(a.getAttribute("data-scroll"));
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.7 });
    else target.scrollIntoView({ behavior: "smooth" });
  });

  /* ── refresh tuning ──────────────────────────────────── */
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  setTimeout(function () { ScrollTrigger.refresh(); }, 1200);

  window.addEventListener("resize", function () {
    clearTimeout(window.__scRes);
    window.__scRes = setTimeout(function () { ScrollTrigger.refresh(); }, 250);
  });
})();
