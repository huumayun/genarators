# মেসার্স শামীম মেশিনারিজ — React JS Website Rebuild Spec

> এই ফাইলে ওয়েবসাইটের স্ক্রিনশট থেকে প্রতিটা সেকশন, কালার, টেক্সট, বাটন, ইমেজ এবং অ্যানিমেশন সহ সম্পূর্ণ ডিটেইল লেখা আছে যাতে **React JS (Vite) ওয়েবসাইট** হিসেবে হুবহু একই ডিজাইনের সাইট বানানো যায়। (নোট: আগের ভার্সনে ভুলে React Native/Expo ধরে লেখা হয়েছিল — এখন প্লেইন React web stack অনুযায়ী আপডেট করা হয়েছে।)

---

## 1. Brand / Theme Tokens

```
Primary Yellow      : #F5A623 / #FFB627 (buttons, headings highlight, icons bg)
Background Dark      : #0E0E0E / #121212 (main bg — near-black)
Card Dark            : #1A1A1A (feature cards, testimonial cards)
Text White           : #FFFFFF
Text Gray (muted)    : #B3B3B3 / #9E9E9E (paragraph text)
Footer Yellow BG     : #F5A623 (full footer strip)
Footer Text Dark     : #1A1A1A
Border/Outline       : #FFFFFF33 (secondary button outline)
Star Rating Color    : #F5A623
Success Check Icon   : #F5A623 (circle bg) + white check
```

**Font**: Bangla-supportive font — e.g. `Hind Siliguri`, `Noto Sans Bengali`, or `Baloo Da 2` for headings (rounded, bold look matches screenshot). Use `Noto Sans Bengali` for body, a bold rounded display font for headings.

**Border radius**: pill-shaped buttons (`borderRadius: 30+`), cards `borderRadius: 12-16`.

---

## 2. Global Layout / Navigation

### Top Contact Bar (thin strip, above header)
- Left: `📞 01712-345678`
- Left (next): `📍 ঢাকা, বাংলাদেশ`
- Right: social icons — Facebook, YouTube, (Pinterest/Twitter-like icon)
- BG: pure black `#000000`, small font ~11px

### Header / Navbar (sticky, `position: sticky; top: 0`)
- Logo left: **"মেসার্স শামীম মেশিনারিজ"** (bold, white) + tagline below in small yellow/gray text: *"জেনারেটর বিক্রয় ও সেবা কেন্দ্র"*
- Nav links (center-right, `<nav>` with `react-router` `<NavLink>`): হোম (active - yellow underline/color) | আমাদের সম্পর্কে | পণ্যসমূহ | সার্ভিস সমূহ | ব্র্যান্ডসমূহ | যোগাযোগ
- Right CTA button (pill, yellow filled): **"যোগাযোগ করুন"**
- Desktop: horizontal full nav bar as in screenshot.
- Mobile (`< 768px`): nav links collapse into a hamburger icon → slide-in/fade-in mobile menu overlay (full-screen or side drawer), CTA button stays visible or moves inside the menu.
- Add subtle shadow/`backdrop-blur` on the navbar once `window.scrollY > 10` (sticky scroll effect).

---

## 3. Page: HOME

### Section 3.1 — Hero Section
- Full-width dark background image: industrial/factory blurred photo overlay (dark gradient overlay `rgba(0,0,0,0.6)`)
- Right side: large image of a **yellow CAT diesel generator (silent/soundproof canopy type)**, photographed on-location (outdoor/industrial yard, blurred trucks/tanks in background)
- Left text block:
  - H1 (white): "নতুন পুরাতন জেনারেটর"
  - H1 line 2 (yellow, bold): "কিনুন বিশ্বস্ত প্রতিষ্ঠান থেকে"
  - Paragraph (gray): "আমাদের কাছে পাচ্ছেন দেশি-বিদেশি সকল ব্র্যান্ডের নতুন ও পুরাতন জেনারেটর এবং প্রফেশনাল সার্ভিস। আপনার প্রয়োজন, আমাদের দায়িত্ব।"
  - 3 inline feature bullets with small icons:
    - ⚙️ নতুন ও পুরাতন জেনারেটর
    - 🛠️ সার্ভিস ও মেরামত
    - 🌍 দেশি-বিদেশি ব্র্যান্ড
  - 2 CTA buttons:
    - Filled yellow pill: **"জেনারেটর দেখুন"**
    - Outline (white border, transparent bg) pill: **"সার্ভিস সম্পর্কে জানুন"**

**Animation ideas**: 
- Hero text fade-in-up on mount (staggered: heading → paragraph → bullets → buttons)
- Generator image subtle float/parallax on scroll
- Use `framer-motion`: `<motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:index*0.15}}>`

### Section 3.2 — "শক্তিশালী জেনারেটর, নিশ্চিন্ত বিদ্যুৎ সমাধান"
- Layout: text left, image right (portable yellow **KIPOR KDE 6500E** generator on white/yellow circular platform, studio-lit product shot)
- H2: "শক্তিশালী জেনারেটর," + yellow line "নিশ্চিন্ত বিদ্যুৎ সমাধান"
- Paragraph: "আমরা দিচ্ছি উন্নত মানের নতুন ও পুরাতন জেনারেটর, প্রফেশনাল সার্ভিস ও সাশ্রয়ী মূল্যে সেরা সেবার নিশ্চয়তা। বাসা, অফিস, কারখানা, হাসপাতালসহ সব ধরনের প্রয়োজনের জন্য আমরা আছি আপনার পাশে।"
- 4 checklist items (yellow circular check icon + white text):
  1. নতুন ও পুরাতন জেনারেটর বিক্রয়
  2. সার্ভিস, মেরামত ও রক্ষণাবেক্ষণ
  3. দেশি-বিদেশি সকল ব্র্যান্ডের জেনারেটর
  4. অরিজিনাল পার্টস ও দক্ষ টেকনিশিয়ান

**Animation**: checklist items slide-in from left one by one (staggered), image scale-in.

### Section 3.3 — "আমাদের সেরা জেনারেটর সমূহ" (Product Grid Card Section)
- Full-width dark card container (`#1A1A1A` bg), centered heading:
  - H2 white: "আমাদের সেরা" + yellow: "জেনারেটর সমূহ"
  - Subtext gray: "দেশি-বিদেশি বিভিন্ন ব্র্যান্ডের নির্ভরযোগ্য জেনারেটর দেখুন এবং আপনার চাহিদা অনুযায়ী বেছে নিন সেরা সমাধান।"
- 3-column product card grid (CSS Grid `grid-template-columns: repeat(3, 1fr)` on desktop → `repeat(1, 1fr)` stacked on mobile via media query, or Tailwind `grid-cols-1 md:grid-cols-3`):

  **Card 1**
  - Image: white soundproof generator (Perkins/Cummins branded canopy)
  - Title: "পাকিস্তান জেনারেটর"
  - Desc: "শক্তিশালী পারফরম্যান্স ও জ্বালানি সাশ্রয়ী পাকিস্তান জেনারেটর আপনার জন্য।"
  - 2 buttons: filled yellow "বিস্তারিত দেখুন" + outline "যোগাযোগ করুন"

  **Card 2**
  - Image: teal/green soundproof generator (Cummins branded)
  - Title: "কামিন্স জেনারেটর"
  - Desc: "উচ্চ মানের কামিন্স জেনারেটর, দীর্ঘস্থায়ী ও নির্ভরযোগ্য বিদ্যুৎ সমাধান।"
  - Same 2 buttons

  **Card 3**
  - Image: yellow open-frame portable generator (Kipor)
  - Title: "কিপর জেনারেটর"
  - Desc: "কিপর জেনারেটরের, কম খরচে সেরা পারফরম্যান্স এবং দীর্ঘস্থায়ী সেবা।"
  - Same 2 buttons

- Bottom center button (filled yellow, full-ish width): **"সব জেনারেটর দেখুন"**

**Animation**: cards fade/scale in on scroll into view (staggered ~100ms), button press scale-down (0.96) feedback.

### Section 3.4 — "প্রফেশনাল সার্ভিস আপনার জেনারেটরের জন্য" (Service Banner)
- Full-bleed background image: technician in yellow hard hat repairing a generator engine (close-up, workshop lighting)
- Dark gradient overlay left→transparent right so text is readable
- H2 white: "প্রফেশনাল সার্ভিস" + yellow: "আপনার জেনারেটরের জন্য"
- Paragraph gray: "আমাদের দক্ষ টেকনিশিয়ান টিম দিচ্ছে জেনারেটরের নিয়মিত সার্ভিস, মেরামত ও রক্ষণাবেক্ষণ সেবা। নিশ্চিত করুন আপনার জেনারেটরের দীর্ঘস্থায়ী পারফরম্যান্স।"
- CTA button (yellow filled): **"সার্ভিস বুক করুন"**

### Section 3.5 — "কেন আমাদের বেছে নেবেন?" (Why Choose Us — 4 icon cards)
- H2: "কেন আমাদের" + yellow "বেছে নেবেন?"
- Subtext: "আমরা মানসম্মত পণ্য ও সেবার মাধ্যমে গ্রাহকের আস্থা ও সন্তুষ্টি অর্জনে প্রতিশ্রুতিবদ্ধ।"
- 4 cards in a row (yellow bg `#F5A623`, dark circular icon bg), each: circular dark icon + bold dark title + small dark/gray subtitle
  1. 🛡️ **বিশ্বস্ত প্রতিষ্ঠান** — "দীর্ঘদিনের অভিজ্ঞতা ও গ্রাহকদের সাথে বিশ্বস্ত সম্পর্ক গড়ে তুলেছি।"
  2. 🏅 **সেরা মানের পণ্য** — "জেনারেটরের গুণগত মান নিশ্চিত করি।"
  3. 🔧 **দক্ষ টেকনিশিয়ান** — "অভিজ্ঞ ও প্রশিক্ষিত টিম সেরা সেবা দিয়ে থাকে।"
  4. 💰 **সাশ্রয়ী মূল্য** — "সর্বোত্তম মানের পণ্য ও সেবা সঠিক দামে দিচ্ছি।"
- Bottom center outline button: **"আরও জানুন"**

### Section 3.6 — "আমাদের প্রাহকরা যা বলছেন" (Testimonials)
- H2: "আমাদের প্রাহকরা" + yellow "যা বলছেন"
- Subtext: "গ্রাহকদের সন্তুষ্টিই আমাদের সবচেয়ে বড় অর্জন।"
- 2 testimonial cards (dark bg `#1A1A1A`), each:
  - ⭐⭐⭐⭐⭐ (5 yellow stars)
  - Quote text (gray/white, italic-ish)
  - Bottom row: circular avatar photo + name (bold white) + location (small gray)

  **Testimonial 1**: "খুব ভালো সার্ভিস পেয়েছি। জেনারেটর সময়মতো ডিলিভারি এবং সার্ভিসিং খুব প্রফেশনাল। নিশ্চিন্তে রেকমেন্ড করছি।" — রকিবুল ইসলাম, ব্যবসায়ী, ঢাকা

  **Testimonial 2**: "নতুন জেনারেটর কিনেছি, মান ও পারফরম্যান্স অসাধারণ। মেসার্স শামীম মেশিনারিজের সেবা সত্যিই প্রশংসনীয়।" — সাজেদা আক্তার, ব্যবসায়ী, নারায়ণগঞ্জ

- Bottom center outline button: **"আরও রিভিউ দেখুন"**

### Section 3.7 — Stats Bar (4 counters, inline icons)
- 🏭 **৬০০+** সন্তুষ্ট গ্রাহক
- 🤝 **১০০+** সফল সার্ভিস
- 🌍 **৬০+** ব্র্যান্ডের সমূহ
- 🕐 **২৪/৭** সাপোর্ট

**Animation**: animated count-up number (0 → target) when section enters viewport (`react-native-animated-numbers` or manual `Animated.Value`).

### Section 3.8 — Newsletter / Subscribe Bar
- Full-width yellow-outlined dark card
- Left: H3 white "নিয়মিত আপডেট পেতে" + yellow "আমাদের সাথে থাকুন" + small gray subtext "নতুন পণ্য, অফার ও সার্ভিসের আপডেট পেতে নিউজলেটার সাবস্ক্রাইব করুন।"
- Right: email input field (rounded, dark bg, placeholder "আপনার ইমেইল দিন") + yellow "সাবস্ক্রাইব" button

### Section 3.9 — Footer (Yellow full-width block, dark text)
- Column 1: Logo/name "মেসার্স শামীম মেশিনারিজ" + tagline "জেনারেটর বিক্রয় ও সেবা কেন্দ্র" + short description + social icons (FB, YouTube, Pinterest)
- Column 2 "দ্রুত লিংক": হোম, আমাদের সম্পর্কে, পণ্যসমূহ, সার্ভিস সমূহ, যোগাযোগ
- Column 3 "পণ্যসমূহ": পাকিস্তান জেনারেটর, কামিন্স জেনারেটর, কিপর জেনারেটর, অন্যান্য ব্র্যান্ড
- Column 4 "সার্ভিস সমূহ": সার্ভিস ও মেরামত, রক্ষণাবেক্ষণ, স্পেয়ার পার্টস, ইনস্টলেশন
- Column 5 "যোগাযোগ": 📞 01712-345678, ✉️ info@shomimmachinery.com, 📍 ঢাকা, বাংলাদেশ
- Bottom bar: "© 2024 মেসার্স শামীম মেশিনারিজ। সর্বস্বত্ব সংরক্ষিত।" | গোপনীয়তা নীতি | শর্তাবলী

---

## 4. Other Pages (inferred from nav — build with same theme)

| Page | Key sections to include |
|---|---|
| **আমাদের সম্পর্কে (About)** | কোম্পানি হিস্ট্রি, মিশন/ভিশন, টিম ফটো, অভিজ্ঞতার বছর, সার্টিফিকেট |
| **পণ্যসমূহ (Products)** | ফিল্টার (ব্র্যান্ড/ক্যাপাসিটি/দাম), ফুল প্রোডাক্ট গ্রিড, প্রতিটার ডিটেইল পেজ (স্পেসিফিকেশন টেবিল, ইমেজ গ্যালারি, "যোগাযোগ করুন" CTA) |
| **সার্ভিস সমূহ (Services)** | সার্ভিস লিস্ট কার্ড: ইনস্টলেশন, মেরামত, AMC/রক্ষণাবেক্ষণ, স্পেয়ার পার্টস — প্রতিটার আইকন+বর্ণনা+বুকিং বাটন |
| **ব্র্যান্ডসমূহ (Brands)** | ব্র্যান্ড লোগো গ্রিড (CAT, Cummins, Perkins, Kipor ইত্যাদি), ট্যাপ করলে সেই ব্র্যান্ডের প্রোডাক্ট ফিল্টার হবে |
| **যোগাযোগ (Contact)** | ফর্ম (নাম, ফোন, ইমেইল, মেসেজ), Google Maps embed (`<iframe>` বা `@react-google-maps/api`), অফিস ঠিকানা কার্ড, ফোন/হোয়াটসঅ্যাপ ডিরেক্ট লিংক (`tel:` / `https://wa.me/...`) বাটন |

---

## 5. React JS Tech Stack Suggestion

```
Framework       : React + Vite (fast dev/build) — or Next.js if SEO/SSR দরকার হয়
Routing         : react-router-dom (Home, About, Products, ProductDetail, Services, ServiceDetail, Brands, Contact)
Styling         : Tailwind CSS (utility classes match this dark+yellow theme well) + a theme config for colors
Fonts           : Google Fonts → "Noto Sans Bengali" (body) + "Hind Siliguri" / "Baloo Da 2" (headings), loaded via <link> or @font-face
Animations      : Framer Motion (motion.div, whileInView, staggerChildren) — best fit for React web
Icons           : lucide-react / react-icons (Feather/Ionicons set)
Images          : native <img loading="lazy"> or vite-imagetools for optimization; use WebP where possible
Scroll animate  : Framer Motion's `whileInView` + `viewport={{ once: true }}` per section (no extra IntersectionObserver code needed)
Carousel        : swiper (react) — for product cards / testimonials on mobile widths
Forms           : react-hook-form + basic validation, submit via EmailJS / your own API / Firebase Functions
State/Data      : React Context or simple props; Firebase Firestore for products/services/brands/testimonials (matches your existing stack)
Counter anim    : framer-motion `useMotionValue` + `animate()` OR a small custom hook with `requestAnimationFrame`
Deployment      : Vercel / Netlify / Firebase Hosting
```

### Folder structure suggestion
```
src/
  main.jsx
  App.jsx                → Router setup
  pages/
    Home.jsx
    About.jsx
    Products.jsx
    ProductDetail.jsx
    Services.jsx
    ServiceDetail.jsx
    Brands.jsx
    Contact.jsx
  components/
    Navbar.jsx
    MobileMenu.jsx
    Hero.jsx
    SectionHeading.jsx
    ProductCard.jsx
    FeatureCard.jsx
    ServiceBanner.jsx
    WhyChooseUs.jsx
    TestimonialCard.jsx
    StatsBar.jsx
    Newsletter.jsx
    Footer.jsx
    Button.jsx            (Primary / Outline variants)
  data/
    products.js
    services.js
    brands.js
    testimonials.js
  assets/
    images/
    icons/
  styles/
    index.css             (Tailwind base + custom vars)
  theme/
    colors.js
    fonts.js
```

---

## 6. Animation Checklist (Framer Motion, per section — entrance on scroll)

- Hero: staggered fade+slide-up on mount using `staggerChildren` in a parent `motion.div` (heading → paragraph → bullets → buttons), delay 0.1–0.15s increments
- Feature checklist: slide-in from left (`initial={{x:-30,opacity:0}}`), staggered per item, triggered with `whileInView`
- Product cards: fade + scale-in (`initial={{opacity:0,scale:0.95}}`) staggered by index, `viewport={{ once:true, amount:0.3 }}`
- Service banner: background image `fade-in`, text block `slide-in-left`
- Why-choose-us cards: `zoom-in` (`initial={{scale:0.8,opacity:0}}`) staggered
- Testimonials: card `fade-up`; stars pop in one-by-one (`scale` bounce, 0.05s stagger)
- Stats bar: number count-up animated with `framer-motion`'s `animate()` on a `useMotionValue`, triggered once when the bar scrolls into view
- Buttons: hover → slight scale-up (`whileHover={{scale:1.05}}`), click → `whileTap={{scale:0.96}}`
- Sticky navbar: box-shadow/backdrop-blur fades in once `window.scrollY > 10` (`useEffect` + scroll listener, or a small `useScrollPosition` hook)
- Page transitions (optional, if using react-router): wrap routes with `<AnimatePresence>` for fade/slide between pages

---

## 7. Image Assets Needed (replace with your own licensed/purchased stock or product photos)

1. Hero — yellow CAT soundproof canister generator, industrial background
2. Portable yellow KIPOR generator on white/yellow round base — studio shot
3. White soundproof generator (Perkins/Cummins badge)
4. Teal/green soundproof generator (Cummins badge)
5. Yellow open-frame portable generator (Kipor badge)
6. Technician in yellow hard hat repairing generator engine (service banner)
7. 2x customer avatar photos (testimonials)
8. Company logo (yellow "S" mark type logo suggested, matches brand)

> কপিরাইট এড়াতে নিজের প্রোডাক্টের রিয়েল ফটো তুলে ব্যবহার করা সবচেয়ে ভালো, অথবা লাইসেন্সড স্টক ফটো (Freepik/Unsplash — commercial ব্যবহারের লাইসেন্স চেক করে) ব্যবহার করবেন।

---

## 8. Content/Copy Reference (সব বাংলা টেক্সট, কপি-পেস্ট রেডি)

সব বাংলা কপি উপরে প্রতিটা সেকশনের ভিতরে দেওয়া আছে — সরাসরি কপি করে `constants/content.ts` বা Firestore এ সেভ করে ব্যবহার করতে পারবেন যাতে future এ content admin panel থেকে edit করা যায়।

---

## 9. Next Steps

1. প্রথমে theme tokens (`colors.ts`, `typography.ts`) সেটআপ করুন
2. `Button`, `SectionHeading`, `Card` — এই reusable components আগে বানান
3. Home page section-by-section বানান (উপরের অর্ডার অনুযায়ী)
4. Reanimated দিয়ে entrance animations যোগ করুন
5. বাকি pages (About/Products/Services/Brands/Contact) বানান
6. Firebase Firestore collections: `products`, `services`, `brands`, `testimonials` — dynamic content এর জন্য
