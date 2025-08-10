# Saurabh Singh — AI Portfolio (GitHub Pages)

A modern, single-page portfolio built with semantic HTML, modern CSS, and lightweight JavaScript. Fully responsive, fast, and easy to deploy on GitHub Pages.

## Live Demo
- Enable GitHub Pages (instructions below), then share the site URL.

## Project Structure

```
.
├─ index.html                   # Main site (single-page)
├─ css/
│  └─ modern-style.css          # Modern responsive styles
├─ js/
│  └─ modern-script.js          # Navigation, animations, modal logic
├─ img/
│  └─ profile-professional.jpeg # Headshot
├─ projects/
│  └─ transfer-learning.html    # Detailed report: Transfer Learning on CIFAR-10
├─ resources/
│  └─ resume.pdf                # Latest resume
├─ .nojekyll                    # Disable Jekyll processing (ensures static assets serve)
└─ README.md                    # This file
```

Removed legacy/unnecessary files for a slim repo (Bootstrap/jQuery, old images, fonts, lightbox, flexslider, etc.).

## Features
- AI-focused content (LLMs, RAG, data engineering, enterprise AI)
- Professional Experience with Red Hat (sanitized for confidentiality)
- Awards section (Dataverse Business Impact Award — Best Engineering Innovation in Dataverse — AI, Q2 2025)
- Featured Projects with metrics, and Additional Projects
- Accessible, mobile-first, performant

## Customize
- Profile image: replace `img/profile-professional.jpeg`
- Resume: replace `resources/resume.pdf`
- Content: edit sections in `index.html` (About, Experience, Awards, Skills, Projects)
- Styles: adjust theme tokens in `css/modern-style.css`

## Local Preview
Double-click `index.html` to open in your browser, or serve locally with any static server.

## Deploy to GitHub Pages
1) Push this repository to GitHub
- If you haven’t set a remote yet:
  - Create a repo on GitHub (e.g., `Portfolio-1`)
  - Set remote and push:

```bash
# From project root
git init # if needed
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git add -A && git commit -m "Initial commit"
git push -u origin main
```

2) Enable GitHub Pages
- On GitHub: Settings → Pages → Build and deployment
- Source: Deploy from branch
- Branch: `main` and folder `/ (root)`
- Save. Wait for the Pages site to build (usually under a minute)

3) Share your site URL
- Project site: `https://<your-username>.github.io/<your-repo>/`
- User site (optional): if you want `https://<your-username>.github.io/`, create a repo named `<your-username>.github.io` and push the same files there.

## Notes
- `.nojekyll` prevents GitHub Pages from ignoring folders starting with underscores.
- No build step or dependencies required; it’s pure static files.
- For custom domain, add `CNAME` in repo root with your domain.

## License
You may use this structure and styles for your personal portfolio.
