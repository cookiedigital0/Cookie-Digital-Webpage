# 🍪 Cookie Digital

A professional web contracting studio website — clean, fast, and ready to deploy.

## Structure

```
cookie-digital/
├── index.html        # Home page
├── contact.html      # Contact / Start a Project page
├── css/
│   └── style.css     # All styles
├── js/
│   └── main.js       # Scroll effects, nav, form handling
└── README.md
```

## Setup

No build tools needed. Just open `index.html` in a browser.

## Deploying

**GitHub Pages:**
1. Push to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch → `/root`
4. Your site will be live at `https://yourusername.github.io/cookie-digital`

**Netlify (recommended):**
1. Drag & drop this folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Live in seconds — free custom domain support

**Vercel:**
1. `npm i -g vercel`
2. Run `vercel` in this folder

## Contact Form

The contact form currently shows a success screen on submit. To wire it up for real:

- **Formspree**: Add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>` tag, and remove the JS submit handler in `main.js`
- **Netlify Forms**: Add `netlify` attribute to the `<form>` tag
- **EmailJS**: Add the EmailJS SDK and connect your template

## Customization

- Replace portfolio cards in `index.html` with real screenshots
- Update email in `contact.html`
- Swap fonts in the Google Fonts link if desired
- Adjust colors via CSS variables in `css/style.css` (`:root` block)

---

Built by Cookie Digital 🍪
