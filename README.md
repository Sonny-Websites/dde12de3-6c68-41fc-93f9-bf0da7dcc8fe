### Technical Design Specifications: UI/UX Standards

---

## 1. Color Architecture

Implement a structured color system to ensure visual consistency and WCAG 2.1 accessibility compliance.

* **Color Distribution (60/30/10 Rule):**
  * **Base (60%):** Surfaces and backgrounds. Utilize off-whites (`#F8F9FA` to `#FFFFFF`) or dark surfaces (`#121212`).
  * **Secondary (30%):** Structural elements (headers, footers, cards).
  * **Accent (10%):** Interactive elements only.

* **Contrast Ratios:**
  * Small text: Minimum **4.5:1** against background.
  * Large text (>18pt): Minimum **3:1**.

* **Greyscale Palette:** Establish a minimum of 5 shades (Lightest to Darkest) for borders, disabled states, and body copy. Avoid pure black (`#000000`) for text; utilize high-contrast charcoal (e.g., `#212121`).

---

## 2. Interactive Element Specifications (Buttons)

Buttons must maintain a clear visual hierarchy based on action priority.

### Button States

| State | Requirement |
| --- | --- |
| **Default** | Primary brand color, solid fill. |
| **Hover** | 10%–15% luminance shift (darker or lighter). |
| **Active/Pressed** | Subtle scale transform (e.g., `scale(0.98)`) or inset shadow. |
| **Disabled** | Reduced opacity (0.4–0.6) and `cursor: not-allowed`. |
| **Focused** | 2px solid outline/ring with 2px offset for keyboard navigation. |

### Technical Dimensions

* **Touch Target:** Minimum **44px** height/width.
* **Border Radius:** 
  * **Square (0px):** High-end/Formal.
  * **Soft (4px-8px):** Standard UI/SaaS.
  * **Pill (full radius):** Mobile-first/Consumer.

---

## 3. Typographic System

Standardize typography to minimize layout shifts and maximize legibility.

* **Sizing & Scaling:** Use a **1.250 (Major Third)** or **1.125 (Major Second)** modular scale for headers.
* **Base Font Size:** Default **16px** (1rem).
* **Line Height (Leading):**
  * Body text: **1.5 to 1.6** for optimal scanability.
  * Headings: **1.2** to prevent excessive vertical spacing.

* **Line Length (Measure):** Limit body containers to **45–75 characters** per line (approx. 600px–800px width).

---

## 4. Spacing and Grid Logic

Use an **8pt Grid System** (or 4pt for micro-adjustments) to define all margins, padding, and layout dimensions.

* **Vertical Rhythm:** All spacing between elements (Margin-Bottom, Padding) must be multiples of 8 (e.g., 8, 16, 24, 32, 48, 64px).
* **Container Widths:**
  * Mobile: 100% (with 16px–24px gutters).
  * Desktop: 1200px–1440px max-width.

* **Breakpoints:**
  * Small: 600px
  * Medium: 900px
  * Large: 1200px

---

## 5. Visual Effects (Elevation)

Depth should be communicated through Z-axis values, not arbitrary styling.

* **Box Shadows:** Use multi-layered shadows for realism.
  * *Example:* `box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`

* **Borders:** Use **1px** width for dividers and input fields. Use a neutral grey with 10%–20% opacity.

---

## 6. Form Guidelines

Forms must provide robust client-side validation, accessibility support, and clear feedback mechanisms.

### Form Structure & Accessibility

* **Labels & Field Binding:**
  * Every `<input>` and `<textarea>` must have an associated `<label>` with explicit `for` attribute.
  * Required fields must include `aria-required="true"` and mark with `<span aria-label="required">*</span>`.
  * Use `aria-label` for button actions (e.g., `aria-label="Toggle navigation menu"`).

* **ARIA Attributes:**
  * Link error messages to inputs with `aria-describedby="fieldError"`.
  * Use `role="alert"` and `aria-live="polite"` on response message containers.
  * Set `aria-current="page"` on active navigation links.
  * Add `role="region"` and `aria-labelledby` to major form sections.

* **Semantic HTML:**
  * Use `<form>` with explicit `method="post"`.
  * Wrap each field in a `<div class="form-group">` for consistent spacing.
  * Use `<textarea>` for multi-line text (not `<input type="text">`).
  * Include `novalidate` attribute to enable custom validation.

### Validation Rules & Error Handling

* **Validation Timing:**
  * Validate on `blur` event (when field loses focus) to minimize disruption.
  * Re-validate on `input` event to clear errors when user corrects the field.
  * Always validate before form submission.
  * Show inline error messages immediately upon validation failure.

* **Validation Logic (Applied to this template):**
  * **Name:** Minimum 2 characters.
  * **Email:** Valid email format (RFC 5322 compliant).
  * **Message:** Minimum 10 characters.

* **Error Message Display:**
  * Store error message in a dedicated `<span>` with `id="fieldError"` for each field.
  * Wire each input's `aria-describedby` to its error message container.
  * Clear error message when field becomes valid.
  * Do not prevent form submission on validation error; display errors instead.

* **Honeypot Field:**
  * Include hidden spam-detection field: `<input type="text" name="_hp" style="display:none" tabindex="-1">`
  * If `_hp` field contains any value on submission, treat as spam and reject silently.

### Form Submission & Loading States

* **Submit Button Behavior:**
  * Disable button immediately on click to prevent duplicate submissions.
  * Set `aria-busy="true"` on button during submission.
  * Change button text to "Sending..." (or equivalent) while request is pending.
  * Prevent further interactions until response is received.
  * Re-enable button if submission fails; keep disabled if successful.

* **Request Handling:**
  * Use `POST` method with `action="/__forms/contact"` or equivalent endpoint.
  * Submit form data via JavaScript (not native form submission) for better control.
  * Include timeout protection (e.g., 30-second limit) for stalled requests.
  * Handle network errors gracefully with user-facing error messages.

### Response & User Feedback

* **Success Response:**
  * Redirect to success page (e.g., `thank-you.html`) after successful submission.
  * Alternatively, display success message container with `role="alert"` and `aria-live="polite"`.
  * Message must confirm action and provide next steps or contact information.
  * Optional: Auto-redirect after 3–5 seconds if staying on current page.

* **Error Response:**
  * Display error message in container with `role="alert"` and `aria-live="polite"`.
  * Message must explain what went wrong (e.g., "Server error. Please try again.").
  * Allow user to re-submit the form without page reload.
  * Log error details to console for debugging purposes.

* **Response Container:**
  * Use dedicated `<div id="responseMessage" role="alert"></div>` for all responses.
  * Ensure element is visible and not hidden by CSS or JavaScript.
  * Clear previous messages before displaying new ones.

## 🎨 Design Features

- **Modern Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Typography**: Poppins font family for modern look
- **Color Palette**:
  - Primary: #667eea (Soft purple)
  - Secondary: #764ba2 (Deep purple)
  - Text: #2c3e50 (Dark slate)
  - Light: #f8f9fa (Off-white)
  - Dark: #2c3e50 to #34495e (Variants)
  
- **Dark Mode Support**: Automatic dark mode colors based on system preference
- **Hover Effects**: Elevation, color shift, and scale transformations
- **Spacing**: Consistent 1rem base spacing unit
- **Border Radius**: 5-10px for modern rounded corners

## 📱 Responsive Breakpoints

- **Desktop**: Full multi-column layouts
- **Tablet** (≤768px): 2-column grids, hamburger menu activates
- **Mobile** (≤480px): Single-column layouts, optimized font sizes

## 🔧 File Structure (Astro)

```
astro-template/
├── src/
│   ├── pages/           # Routes: index.astro → /, about.astro → /about/, thank-you.astro → /thank-you/
│   ├── layouts/
│   │   └── BaseLayout.astro   # Shared HTML shell, meta tags, global CSS import
│   ├── components/
│   │   ├── Header.astro       # Nav (uses base path for links)
│   │   └── Footer.astro
│   └── styles/
│       └── global.css         # All site CSS
├── public/
│   └── site.js               # Client script (year, hamburger, form validation/submit)
├── astro.config.mjs          # output: 'static', base from BASE_PATH env
├── package.json
└── README.md
```

---

## 📦 Astro: Making edits to the template

This template is built with **Astro** (static output). Use these conventions when changing content, styles, or behavior.

### Commands

| Command | Purpose |
|--------|--------|
| `npm run dev` | Start dev server (default `http://localhost:4321`). Base path is `/` locally. |
| `npm run build` | Build static site into `dist/`. |
| `npm run preview` | Serve `dist/` locally to test production build. |

### Base path (important for GitHub Pages)

- **Locally:** No base path; links are `/`, `/about/`, etc.
- **On GitHub Pages:** The site is served at `https://<user>.github.io/<repo-name>/`, so all links and assets must use that prefix.
- **How it’s set:** The deploy workflow sets `BASE_PATH=/<repo-name>/` when building. `astro.config.mjs` reads `process.env.BASE_PATH` and configures `base`. Do not hardcode the repo name; keep using `base` from the config so the same template works in any repo.
- **In components:** Use `import.meta.env.BASE_URL` (or build links from it) for internal links so they stay correct in every deployment. Header and Footer already do this.

### Where to edit what

| Goal | Location |
|------|----------|
| **Home / About / Thank-you content** | `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/thank-you.astro` |
| **Shared layout (meta, scripts, CSS)** | `src/layouts/BaseLayout.astro` |
| **Nav and footer** | `src/components/Header.astro`, `src/components/Footer.astro` |
| **Global styles** | `src/styles/global.css` |
| **Client-side behavior (menu, form, year)** | `public/site.js` (loaded as `/site.js`) |

### Adding a new page

1. Add `src/pages/my-page.astro`.
2. Use `BaseLayout` and pass `title` (and optional `description`).
3. Use `Header` and `Footer`; set `current` on `Header` if this page should show as active in the nav.
4. The route will be `/my-page/` (Astro uses file-based routing).

### Forms and the server

- The contact form posts to **`/__forms/contact`**. That path is handled by the Pluzi proxy server (see below), which forwards to n8n and then redirects to the thank-you page.
- Keep the form `action="/__forms/contact"` and let the client script submit via `fetch` and redirect on success. Do not change the path to include the base; the server sees the request on the same host and path.
- **Content-Type must be `application/x-www-form-urlencoded`:** The proxy server only parses URL-encoded and JSON bodies. When submitting via `fetch`, always convert `FormData` to `URLSearchParams` (e.g. `new URLSearchParams(new FormData(form))`) and set `Content-Type: application/x-www-form-urlencoded`. Do **not** pass a raw `FormData` object as the fetch body — that sends `multipart/form-data`, which the server cannot parse, and all fields will be silently lost.

---

## 🌐 How the server works (Pluzi proxy)

When the site is served behind the **Pluzi proxy** (e.g. `sub.yourdomain.com`), the following applies.

### Request flow

1. **User** requests `https://<sub>.<BASE_DOMAIN>/...` (e.g. `https://acme.example.com/about/`).
2. **Proxy** identifies the site by subdomain (`sub`), then fetches from **GitHub Pages** at `https://<GH_USER>.github.io/<sub>/...`.
3. The response is rewritten so that links and assets point back through the same subdomain (so the next request again goes to the proxy, not directly to GitHub).

### Rewriting rules

- **HTML:** The proxy rewrites `href`, `src`, `action`, and `srcset` that are root-relative (e.g. `/about/`) by adding a prefix `/<sub>/` so they become `/<sub>/about/`. That way, when the user clicks or loads an asset, the request goes to `sub.BASE_DOMAIN` and the proxy can fetch from `GH_USER.github.io/sub/...`.
- **Exception for Astro:** If the HTML (or CSS) already contains paths starting with `/<sub>/` (e.g. Astro’s base path), the proxy **does not** add the prefix again, so you don’t get `/<sub>/<sub>/...`. The server code uses a dynamic regex so that paths already beginning with the current sub are left as-is.
- **CSS:** `url(/...)` is rewritten to `url(/<sub>/...)` in the same way, again skipping when the path already starts with `/<sub>/`.
- **Redirects:** If GitHub returns a `Location` header, the proxy rewrites it so the user is sent to `https://<sub>.<BASE_DOMAIN>/...` instead of `github.io`.

### Forms

- **POST `/__forms/:formId`** is not proxied to GitHub. The proxy handles it: it sends the payload to **n8n** (via `N8N_WEBHOOK_URL`), then redirects the user to the thank-you page (or returns JSON if the client asked for JSON). The honeypot field `_hp` is checked; if set, the request is treated as spam.

### Banner

- The proxy injects a **Pluzi** banner into every HTML response (before `</body>`). “Pluzi” links to **https://pluzi.site**. Do not remove or change this if you are using the Pluzi hosting; it is part of the server behavior, not the Astro source.

### Env vars (server)

- `GH_USER` – GitHub username whose Pages are being proxied (e.g. `https://<GH_USER>.github.io`).
- `BASE_DOMAIN` – Domain used for subdomains (e.g. `example.com` → `sub.example.com`).
- `N8N_WEBHOOK_URL` – n8n webhook URL for form submissions.

---

## 🚀 Key JavaScript Functions

### Form Management
- `isValidEmail()` - Email validation using regex
- Form validation with real-time error display
- Newsletter subscription with success feedback

### Mobile Navigation
- Hamburger menu toggle
- Auto-close on link click
- Smooth transitions

### Dynamic Year
- Auto-updates copyright year

### Animations
- Intersection Observer for scroll animations
- Smooth page transitions

## 🎯 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox support
- Intersection Observer API

## 📝 Customization

### Colors
Edit the gradient and palette in `src/styles/global.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Content
- Update "My Site" with your brand name in `src/components/Header.astro`, `src/components/Footer.astro`, and page content in `src/pages/`.
- Replace feature icons and testimonials in `src/pages/index.astro`.
- Navigation links are in `src/components/Header.astro` (and Footer); they use the base path automatically.

### Form endpoint
The contact form uses `action="/__forms/contact"` and is submitted via `public/site.js`. Keep the action as `/__forms/contact` so the Pluzi proxy can receive submissions and forward them to n8n. Do not add the repo base path to the form action.

## ✅ Implementation Checklist

- [x] Features section with 4 cards
- [x] Testimonials section with social proof
- [x] Multiple CTAs throughout
- [x] Image support with lazy loading
- [x] Form validation and error handling
- [x] Smooth animations and transitions
- [x] Mobile hamburger menu
- [x] Accessibility features (ARIA, semantic HTML)
- [x] SEO meta tags and structured data
- [x] Performance optimizations
- [x] Enhanced footer with links and newsletter
- [x] Dynamic copyright year

---

Built with modern web standards and best practices. Ready for production use!
