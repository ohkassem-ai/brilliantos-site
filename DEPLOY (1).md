# Deploy BrilliantOS

This is the production website for BrilliantOS — a static site (HTML + React via Babel, no build step). It will run on any static host.

## Recommended: Netlify Drop (5 minutes, free)

1. Download the project as a zip from this chat (the **Download project** card below this README).
2. Unzip it on your computer.
3. Open <https://app.netlify.com/drop> in your browser.
4. Drag the **unzipped folder** onto the drop zone.
5. You'll get a temporary URL like `brilliantos-xyz.netlify.app` in ~10 seconds — open it and verify the site works.
6. Click **"Domain settings"** → **"Add custom domain"** → enter `brilliantdevcorp.com`.
7. Netlify will show 2 DNS records to add at your domain registrar (where you bought the domain). Add them. DNS usually propagates in 5–60 minutes.
8. Once propagated, `brilliantdevcorp.com` will load this new site. SSL/HTTPS is automatic.

### Where is your domain currently pointed?

You said you host on **bolt.new**. To "replace" the existing content at `brilliantdevcorp.com`, you need to change where the domain points:

- **If the domain DNS is managed at your registrar** (GoDaddy, Namecheap, etc.) and bolt.new only has the site files — you just update the A / CNAME records to point at Netlify's servers (Netlify will tell you exactly what records to add). Old bolt.new site stops serving at that domain; new site takes over.
- **If the domain DNS is managed at bolt.new** — you may need to either (a) transfer DNS back to your registrar, or (b) change the records inside bolt.new's DNS panel.

If you're unsure, share where you bought `brilliantdevcorp.com` and I'll write the exact DNS steps.

## Files in this project

| File | What it is |
|---|---|
| `index.html` | Landing page (hero, automate grid, before/after, ROI calc, case studies, pricing teaser, final CTA) |
| `use-cases.html` | Long-form use case detail page |
| `pricing.html` | Pricing page with comparison table + FAQ |
| `book.html` | **Discovery call form** — submits to Web3Forms, email forwarded to `omar@brilliantdevcorp.com` |
| `erp-demo.html` | The interactive ERP product preview embedded in the landing |
| `erp-demo-mobile.html` | Mobile version of the demo |
| `style.css` | Global styles, design tokens |
| `components.jsx`, `sections-*.jsx` | React component sources (loaded inline via Babel) |
| `tweaks-panel.jsx` | The in-page Tweaks panel (toggled from the editor toolbar; hidden in production) |
| `favicon.svg`, `robots.txt`, `sitemap.xml` | Standard site assets |

The site is fully static — no server, no build step, no environment variables. Just upload the folder.

## Form delivery

The discovery call form at `book.html` submits to **Web3Forms** with access key `6ab0d420-3fd5-4a40-8a24-255db37121da`, which forwards email to `omar@brilliantdevcorp.com`. To verify, fill out the form on your live site and confirm you receive the email. To change the destination, log in to Web3Forms with that key.

If you ever want to swap form providers (Formspree, Web3Forms, Netlify Forms, custom backend), the integration lives at the top of the inline `<script type="text/babel">` block inside `book.html` — search for `W3F_KEY` or `api.web3forms.com/submit`.

## Updating after deploy

To make changes:
1. Edit the files in this project (or download / re-upload to Netlify).
2. In Netlify, drag the updated folder onto your site's **Deploys** tab → it replaces the live version in seconds. Or hook up GitHub for git-push deploys.

## Things to do after going live

- [ ] Submit a test entry through `book.html` and confirm it arrives in `omar@brilliantdevcorp.com`.
- [ ] Add Google Analytics or Plausible (one `<script>` tag in `<head>` of each HTML file).
- [ ] Test on mobile — every page is responsive but spot-check on a real device.
- [ ] Consider a `social-share.png` (1200×630) for richer link previews — replace the bare OG meta tags with one referencing the image.
- [ ] If you want a real backend / database / login later, this can be migrated to Vercel + Next.js without changing the design.

## Need help?

Open this project in chat and ask. The full design system is documented in `style.css` (CSS custom properties + `data-palette` / `data-theme` selectors for the Tweaks panel).
