# Irfan Javeed Gaffar — Portfolio

Static single-page site. No build step.

## Structure
```
index.html
assets/css/styles.css
assets/js/main.js
assets/img/irfan-javeed-gaffar.png   portrait
assets/img/favicon.svg               IJG monogram
assets/docs/Irfan-Javeed-Gaffar-CV.pdf   ← add the CV here (exact filename)
.nojekyll
```

## Deploy to GitHub Pages
1. Push this folder to a repository.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site is served at `https://<user>.github.io/<repo>/`.

## Open items for the owner
- **CV PDF**: place the CV at `assets/docs/Irfan-Javeed-Gaffar-CV.pdf` — every "Download CV" link points there.
- **LinkedIn**: replace `[Add LinkedIn profile URL]` and its `href="#contact"` in the Contact section.
- **Phone**: `0554 7787736` is copied from the CV but has one digit more than a standard UAE mobile number. Confirm, then update the text and `tel:` link (ideally in `+971…` format).
- **Outcomes**: replace the three bracketed placeholders in section 05, or delete the whole `#outcomes` section.
- **2015–2023 gap**: the CV doesn't cover this period; add a role or a line explaining it.
- **Infosys / Accenture job titles**: the CV gives none, so the heading shows "Infosys · Accenture".
- **Open Graph image**: for link previews, change `og:image` to the absolute URL of the portrait once the site is live.
