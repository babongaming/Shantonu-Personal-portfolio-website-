<<<<<<< HEAD
# Shantonu Deb Babon – Personal Portfolio Website

Premium, dark, cinematic one-page portfolio for **Senior Video Editor – Shantonu Deb Babon**, designed to be fast, minimal in setup, and easy to deploy on **Vercel**.

## Structure

- **`index.html`** – Main single-page website with all sections:
  - Hero with 16:9 showreel placeholder and **Hire Me on Fiverr** CTA
  - Software expertise (Premiere Pro, After Effects, DaVinci Resolve, Photoshop, CapCut & Filmora)
  - Experience timeline (DotPoint Digital, Senior Video Editor, 2022–Present)
  - Portfolio gallery (Google Drive + YouTube AdSense style projects, all framed in 16:9)
  - Education & background (Theatre and Media Studies – Habibullah Bahar University College)
  - Professional membership (Member of Comilla Online Professionals Association)
  - Contact & CTA block (email, location, international projects CTA, LinkedIn, Fiverr)
- **`styles.css`** – Custom dark, cinematic visual design (no framework).
- **`script.js`** – Small enhancements (smooth scroll, subtle scroll-in animation, dynamic year).
- **`package.json`** – Optional helper for running a local static server (not required by Vercel).

## How to Run Locally

You can simply open `index.html` directly in your browser, or use any static server.

Example with **VS Code Live Server** or any simple HTTP server:

1. Open the project folder (`AI Web`) in your editor.
2. Use a plugin like “Live Server” or run a static server of your choice pointing to this folder.
3. Open the served URL in your browser.

## Deploying to Vercel

1. Create a new Git repository (optional but recommended).
2. Push this folder to GitHub/GitLab/Bitbucket **or** use “Import Project” in Vercel and select this local folder.
3. In Vercel:
   - **Project Type**: “Other” / “Static Site”.
   - **Build Command**: leave empty (no build needed).
   - **Output Directory**: `/` (root).
4. Deploy – Vercel will serve `index.html` as the entry page.

## Replacing Placeholders With Your Real Links

- **Showreel (Hero)**  
  In `index.html`, inside the `showreel-frame` container, replace the placeholder block with:
  - A YouTube/Vimeo `<iframe>` embed, **or**
  - A `<video>` tag pointing to your hosted `.mp4` showreel.

- **Portfolio Links**  
  In the Portfolio cards, update the `href="#"` links to:
  - Your **Google Drive** project folders / preview links.
  - Your **YouTube / AdSense** playlists or individual videos.

- **Social Profiles**
  - Replace the placeholder LinkedIn and Fiverr URLs with your exact profile URLs.

After those edits, redeploy to Vercel to publish the updated portfolio.

=======
# Shantonu-Personal-portfolio-website-
>>>>>>> 03bc18e8a912b8164a7ff5c47b435f346a3e2bbc
