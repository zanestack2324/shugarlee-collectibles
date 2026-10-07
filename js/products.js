/* SHUGARLEE COLLECTIBLES — product catalog
   Prices in Nigerian Naira (₦). Edit names/prices/notes freely below.
   img paths point at the original photo folders. */

const PRODUCTS = [
  /* ── BAGS (8) ─────────────────────────────── */
  { id: "bags-01", code: "SC-BAG-01", cat: "bags", name: "Sugar Rush Tote", price: 145000, note: "Free nationwide delivery", badge: "new",
    desc: "A much-loved carry piece from the Bags collection, finished by hand in small batches. Part of the Shugarlee drop — once it is gone, it is gone.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.27.jpeg" },
  { id: "bags-02", code: "SC-BAG-02", cat: "bags", name: "Bonbon Mini", price: 98000, note: "Pay on delivery available", badge: "",
    desc: "The compact member of the Bags family — small-batch, hand-checked, and packed with the same Shugarlee charm.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.28 (1).jpeg" },
  { id: "bags-03", code: "SC-BAG-03", cat: "bags", name: "Cocoa Ribbon Bag", price: 132000, note: "Free nationwide delivery", badge: "",
    desc: "A collectible favourite from the Bags collection, made in limited runs and finished by hand. Once it is gone, it is gone.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.28 (2).jpeg" },
  { id: "bags-04", code: "SC-BAG-04", cat: "bags", name: "Lolli Shoulder Bag", price: 118000, note: "Limited stock — only 3 left", badge: "hot",
    desc: "A sweet-shouldered classic from the Bags collection, hand-checked in small batches. Part of the Shugarlee collectible drop.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.28.jpeg" },
  { id: "bags-05", code: "SC-BAG-05", cat: "bags", name: "Velvet Dash Bag", price: 165000, note: "Free nationwide delivery", badge: "",
    desc: "Rich, polished and made to be collected — a small-batch piece from the Bags collection, finished by hand.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.29 (1).jpeg" },
  { id: "bags-06", code: "SC-BAG-06", cat: "bags", name: "Caramel Curve Bag", price: 128000, note: "Ships within 24 hours", badge: "",
    desc: "A curved collectible silhouette from the Bags collection, made in limited runs and hand-checked before it ships.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.29 (2).jpeg" },
  { id: "bags-07", code: "SC-BAG-07", cat: "bags", name: "Sweet Sixteen Bag", price: 175000, note: "Gift box included", badge: "new",
    desc: "The celebration piece of the Bags collection — small-batch, hand-finished and boxed for gifting. A true Shugarlee collectible.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.29 (3).jpeg" },
  { id: "bags-08", code: "SC-BAG-08", cat: "bags", name: "Gloss Pop Bag", price: 152000, note: "Free nationwide delivery", badge: "",
    desc: "High-shine energy from the Bags collection, made in small batches and finished by hand. Collect it before the drop ends.", img: "BAGS/WhatsApp Image 2026-09-30 at 05.39.29.jpeg" },

  /* ── JEWELRY (10) ─────────────────────────── */
  { id: "jewelry-01", code: "SC-JEW-01", cat: "jewelry", name: "Golden Hour Charm", price: 62000, note: "Free nationwide delivery", badge: "new",
    desc: "A warm little treasure from the Jewelry collection, hand-checked in small runs. A Shugarlee collectible made to be layered.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.18 (1).jpeg" },
  { id: "jewelry-02", code: "SC-JEW-02", cat: "jewelry", name: "Sugarplum Drops", price: 48000, note: "Gift wrap included", badge: "",
    desc: "Delicate and collectible — a small-batch piece from the Jewelry collection, finished by hand and ready to gift.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.18.jpeg" },
  { id: "jewelry-03", code: "SC-JEW-03", cat: "jewelry", name: "Gilded Bloom", price: 75000, note: "Free nationwide delivery", badge: "",
    desc: "A blooming signature from the Jewelry collection, made in limited quantities and hand-checked before dispatch.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.19.jpeg" },
  { id: "jewelry-04", code: "SC-JEW-04", cat: "jewelry", name: "Midnight Glint", price: 68000, note: "Limited stock — only 4 left", badge: "hot",
    desc: "After-dark sparkle from the Jewelry collection — small-batch, hand-finished, and gone before you know it.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.20.jpeg" },
  { id: "jewelry-05", code: "SC-JEW-05", cat: "jewelry", name: "Dolly Sparkle", price: 54000, note: "Pay on delivery available", badge: "",
    desc: "A playful collectible from the Jewelry collection, made in small runs and finished by hand. Part of the Shugarlee drop.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.21.jpeg" },
  { id: "jewelry-06", code: "SC-JEW-06", cat: "jewelry", name: "Caramel Halo", price: 72000, note: "Free nationwide delivery", badge: "",
    desc: "A glowing ring of colour from the Jewelry collection, hand-checked in small batches and made to be collected.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.23.jpeg" },
  { id: "jewelry-07", code: "SC-JEW-07", cat: "jewelry", name: "Ribbon Charm", price: 58000, note: "Ships within 24 hours", badge: "",
    desc: "Tied with love — a small-batch charm from the Jewelry collection, finished by hand and ready to wear.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.25.jpeg" },
  { id: "jewelry-08", code: "SC-JEW-08", cat: "jewelry", name: "Candy Droplet Set", price: 84000, note: "2-piece set price", badge: "new",
    desc: "A two-piece treat from the Jewelry collection, boxed together and made in limited runs. A proper Shugarlee collectible set.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.26.jpeg" },
  { id: "jewelry-09", code: "SC-JEW-09", cat: "jewelry", name: "Halo Petite", price: 66000, note: "Free nationwide delivery", badge: "",
    desc: "Small in size, big on charm — a hand-finished piece from the Jewelry collection, made in small batches.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.27 (1).jpeg" },
  { id: "jewelry-10", code: "SC-JEW-10", cat: "jewelry", name: "Sugar Bloom Pendant", price: 92000, note: "Gift box included", badge: "hot",
    desc: "The centrepiece of the Jewelry collection — small-batch, hand-checked, and boxed for gifting. Once it is gone, it is gone.", img: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.27 (2).jpeg" },

  /* ── SHOES (6) ────────────────────────────── */
  { id: "shoes-01", code: "SC-SHO-01", cat: "shoes", name: "Cherry Strut", price: 165000, note: "Free nationwide delivery", badge: "new",
    desc: "Made for strutting — a small-batch statement from the Shoes collection, hand-checked before it ships.", img: "SHOES/WhatsApp Image 2026-09-30 at 05.39.30 (1).jpeg" },
  { id: "shoes-02", code: "SC-SHO-02", cat: "shoes", name: "Sugar Step", price: 148000, note: "Pay on delivery available", badge: "",
    desc: "Your next everyday favourite from the Shoes collection, finished by hand in limited runs. A Shugarlee collectible.", img: "SHOES/WhatsApp Image 2026-09-30 at 05.39.30.jpeg" },
  { id: "shoes-03", code: "SC-SHO-03", cat: "shoes", name: "Glossy Gallop", price: 185000, note: "Limited stock — only 2 left", badge: "hot",
    desc: "Fast-moving and full of shine — a rare piece from the Shoes collection, made small-batch and hand-finished.", img: "SHOES/WhatsApp Image 2026-09-30 at 05.39.31 (1).jpeg" },
  { id: "shoes-04", code: "SC-SHO-04", cat: "shoes", name: "Velvet Walk", price: 158000, note: "Free nationwide delivery", badge: "",
    desc: "A smooth, collected step from the Shoes collection — hand-checked in small batches and made to last.", img: "SHOES/WhatsApp Image 2026-09-30 at 05.39.31 (2).jpeg" },
  { id: "shoes-05", code: "SC-SHO-05", cat: "shoes", name: "Caramel Stomp", price: 172000, note: "Ships within 24 hours", badge: "",
    desc: "Confidence by the pair — a bold small-batch release from the Shoes collection, finished by hand.", img: "SHOES/WhatsApp Image 2026-09-30 at 05.39.31.jpeg" },
  { id: "shoes-06", code: "SC-SHO-06", cat: "shoes", name: "Moonlit Strut", price: 195000, note: "Gift box included", badge: "new",
    desc: "The night-out collectible of the Shoes collection — limited, hand-checked, and boxed for gifting.", img: "SHOES/WhatsApp Image 2026-09-30 at 05.39.32 (1).jpeg" },

  /* ── WIGS (10) ────────────────────────────── */
  { id: "wigs-01", code: "SC-WIG-01", cat: "wigs", name: "Caramel Cloud", price: 320000, note: "Free nationwide delivery", badge: "new",
    desc: "A dreamy, much-loved unit from the Wigs collection — small-batch, hand-finished and ready to slay.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.01 (1).jpeg" },
  { id: "wigs-02", code: "SC-WIG-02", cat: "wigs", name: "Sugar Silk", price: 285000, note: "Free nationwide delivery", badge: "",
    desc: "Silky, polished and collectible — a hand-checked unit from the Wigs collection, made in limited runs.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.01.jpeg" },
  { id: "wigs-03", code: "SC-WIG-03", cat: "wigs", name: "Honey Drip", price: 420000, note: "Limited stock — only 2 left", badge: "hot",
    desc: "The showstopper of the Wigs collection — small-batch, hand-finished, and gone before you know it.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.02 (1).jpeg" },
  { id: "wigs-04", code: "SC-WIG-04", cat: "wigs", name: "Velvet Mane", price: 365000, note: "Free nationwide delivery", badge: "",
    desc: "Lush and luxurious — a premium unit from the Wigs collection, hand-checked in small batches.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.02.jpeg" },
  { id: "wigs-05", code: "SC-WIG-05", cat: "wigs", name: "Glossy Tress", price: 398000, note: "Gift box included", badge: "",
    desc: "High-gloss glamour from the Wigs collection — made in limited runs, finished by hand and gift-boxed.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.08.jpeg" },
  { id: "wigs-06", code: "SC-WIG-06", cat: "wigs", name: "Sugar Cinder", price: 275000, note: "Pay on delivery available", badge: "",
    desc: "A sweet take on a classic silhouette — a small-batch favourite from the Wigs collection, hand-checked.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.09.jpeg" },
  { id: "wigs-07", code: "SC-WIG-07", cat: "wigs", name: "Honey Bloom", price: 340000, note: "Free nationwide delivery", badge: "new",
    desc: "Fresh from the drop — a blooming beauty from the Wigs collection, made small-batch and finished by hand.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.10.jpeg" },
  { id: "wigs-08", code: "SC-WIG-08", cat: "wigs", name: "Cocoa Glow", price: 455000, note: "Free nationwide delivery", badge: "hot",
    desc: "Rich, warm and radiant — a premium collectible from the Wigs collection, hand-checked before dispatch.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.14.jpeg" },
  { id: "wigs-09", code: "SC-WIG-09", cat: "wigs", name: "Blush Silk", price: 310000, note: "Ships within 24 hours", badge: "",
    desc: "Soft, smooth and gift-ready — a small-batch unit from the Wigs collection, finished by hand.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.15.jpeg" },
  { id: "wigs-10", code: "SC-WIG-10", cat: "wigs", name: "Sugar Royale", price: 520000, note: "Premium fibre — gift boxed", badge: "new",
    desc: "The crown jewel of the Wigs collection — limited, hand-finished and boxed in style. A true Shugarlee collectible.", img: "WIGS/WhatsApp Image 2026-09-30 at 05.39.16.jpeg" }
];

const CATEGORIES = [
  { id: "bags",    label: "Bag",    plural: "Bags",    page: "bags.html",    hero: "BAGS/WhatsApp Image 2026-09-30 at 05.39.29 (1).jpeg", header: "header 1.jpg" },
  { id: "jewelry", label: "Jewelry", plural: "Jewelry", page: "jewelry.html", hero: "JEWELRY/WhatsApp Image 2026-09-30 at 05.39.18 (1).jpeg", header: "header 3.jpg" },
  { id: "shoes",   label: "Shoe",   plural: "Shoes",   page: "shoes.html",   hero: "SHOES/WhatsApp Image 2026-09-30 at 05.39.31 (1).jpeg", header: "header 1.jpg" },
  { id: "wigs",    label: "Wig",    plural: "Wigs",    page: "wigs.html",    hero: "WIGS/WhatsApp Image 2026-09-30 at 05.39.02 (1).jpeg", header: "header 3.jpg" }
];

const LATEST_IDS = ["bags-01", "jewelry-01", "shoes-01", "wigs-01", "bags-04", "jewelry-08", "shoes-03", "wigs-03"];
const FEATURED_IDS = ["wigs-08", "bags-05", "jewelry-10"];

function getProduct(id) { return PRODUCTS.find(function (p) { return p.id === id; }); }
function productsByCat(cat) { return PRODUCTS.filter(function (p) { return p.cat === cat; }); }
function catLabel(cat) { var c = CATEGORIES.find(function (x) { return x.id === cat; }); return c ? c.plural : cat; }
function catPage(cat) { var c = CATEGORIES.find(function (x) { return x.id === cat; }); return c ? c.page : "shop.html"; }
function productUrl(id) { return id + ".html"; }
function formatNaira(n) { return "\u20A6" + Number(n).toLocaleString("en-NG"); }
