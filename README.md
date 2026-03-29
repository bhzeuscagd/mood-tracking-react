# Frontend Mentor - Mood tracking app solution

This is a solution to the [Mood tracking app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mood-tracking-app-E2XeKhDF0B). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

---

## Overview

### The challenge

Users should be able to:

- Log their mood, feelings, reflections, and sleep each day
- See today's mood, feelings, reflection, and sleep, once logged
- See a relevant mood quote based on today's mood
- See a graph showing the most recent eleven records to identify mood and sleep trends
- See their average mood and sleep from the past five check-ins and compare with the previous five
- Update their name or avatar through settings
- View the optimal layout depending on their device's screen size
- See hover and focus states for all interactive elements
- **Bonus**: Save details to a database (full-stack app with Supabase + PostgreSQL)
- **Bonus**: Create an account and log in (Supabase Auth with email confirmation)

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/bhzeuscagd/mood-tracking-react)
- Live Site URL: [moon-tracking-react.vercel.app](https://moon-tracking-react.vercel.app)

---

## My process

### Built with

- **Astro 5** — Static site generator with island architecture
- **React 19** — UI components with hooks
- **TypeScript** — Full type safety across components
- **TailwindCSS v4** — Utility-first styling
- **Supabase** — PostgreSQL database + authentication
- **Row Level Security (RLS)** — Per-user data isolation at the database level
- Mobile-first responsive workflow

### What I learned

One of the biggest takeaways was structuring a proper authentication flow with email confirmation. Supabase makes it straightforward, but wiring up the state machine in React — moving between `login`, `register`, `verify_email`, `onboarding`, and `home` — required careful thinking about what to show at each step.

I also learned to use custom window events to sync state between sibling components without lifting state all the way to a common parent:

```js
// Emit from Settings
window.dispatchEvent(new Event("profileUpdated"));

// Listen in HomeHero
window.addEventListener("profileUpdated", loadName);
return () => window.removeEventListener("profileUpdated", loadName);
```

On the database side, I set up proper RLS policies so each user can only access their own rows — no matter what query is sent from the frontend.

### Continued development

- Add bar interactivity on the mood/sleep trend chart (click a bar to see full detail for that day)
- Integrate a third-party image hosting service (e.g. Cloudinary) to replace the base64 localStorage avatar
- Add animations to the onboarding and dashboard transitions
- Explore optimistic UI updates to avoid the `window.location.reload()` after logging a mood

### Useful resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth) — Essential for understanding the email confirmation flow and session handling.
- [Astro + React Integration](https://docs.astro.build/en/guides/integrations-guide/react/) — Helped clarify how to pass `client:load` directives and handle hydration properly.

### AI Collaboration

I used **Antigravity (powered by Google DeepMind)** as a pair programming assistant throughout most of this project.

- **What I used it for:** Architecting the Supabase schema with RLS policies, wiring up the authentication state machine, debugging React re-render issues, writing the responsive chart layout, and doing a final code audit against Vercel and Supabase best practices.
- **What worked well:** Having the AI audit the code against established performance guidelines (singleton Supabase client, hoisting static maps outside components, cleaning up event listeners) was genuinely useful and caught things I would have missed.
- **What didn't:** Early on there was some back-and-forth on environment variable naming (`VITE_` vs `PUBLIC_`) because of the Astro/Vite setup. Required a few iterations to get right.

---

## Author

- Frontend Mentor - [@bhzeuscagd](https://www.frontendmentor.io/profile/bhzeuscagd)
- GitHub - [@bhzeuscagd](https://github.com/bhzeuscagd)
