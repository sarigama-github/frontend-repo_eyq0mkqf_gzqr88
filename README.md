Virtual Zoo (Frontend Only)

A single-page Virtual Zoo built with React 18, React Router, Context + Reducer state, and Tailwind CSS. Focused on accessibility, responsiveness, and developer ergonomics. Uses mock data and localStorage for favorites and tour ordering.

Tech choices
- UI: Tailwind CSS utilities (no component libraries)
- Framework: React 18 with functional components + hooks
- Routing: React Router v6
- State: Context + useReducer
- Data: data/animals.json with images/audio in public/assets/
- Persistence: localStorage (favorites + tour order)
- Testing: Jest + React Testing Library (sample tests included)
- Lint/Format: ESLint + Prettier (recommended, not enforced in this minimal scaffold)

Run locally
1) npm install
2) npm run dev
3) Open the printed local URL

Routes
- / — Home with search, filters, sorting, and exhibit grid
- /habitat/:habitat — List animals by habitat (Savanna, Rainforest, Arctic, Desert, Aquarium, Aviary)
- /animal/:id — Detail page with images, range map, description, facts, and audio play
- /favorites — Favorites/My Tour with drag-and-drop reordering and JSON export
- /admin — Demo-only page to add/edit local entries (does not persist to files)

Accessibility & i18n readiness
- Semantic HTML, labels, alt text, aria-pressed for toggles, status announcements
- Keyboard-friendly controls with visible focus
- Strings are easy to extract for i18n if desired (English by default)

Mock data
- Edit data/animals.json (10 animals provided).
- Place corresponding images and audio in public/assets/.
- Filenames in the JSON should match assets (see public/assets/placeholder.txt for examples).

Developer notes
- Favorites and tour order persist via localStorage keys: "favorites" and "tourOrder".
- To change filters/sort options, see HomePage.
- The Admin page manages an in-memory copy only, intended for demos.

Testing
- Run tests: npm test (requires jest + @testing-library/react; if not preinstalled, add them and run again)
- Included tests: src/__tests__/search.test.jsx (search behavior and favorite toggle)
- End-to-end (E2E) suggestion (Cypress):
  cypress/e2e/virtual-zoo.cy.js (outline)
  - Visits /
  - Types "lion" into search, expects 1 card
  - Clicks the card, verifies detail shows scientific name
  - Clicks "Add to favorites", reloads, verifies persistence
  - Navigates to /favorites, drags first to second, exports JSON

Architecture overview
- App composes Header, routed pages, and Footer inside a ZooProvider (Context + Reducer).
- HomePage renders filters, sort, and card grid. Derived list comes from a selector.
- AnimalDetail shows full profile with high-res image, range map, fun facts, and audio clip.
- FavoritesPage implements simple drag-and-drop (native HTML5) and export.
- HabitatPage filters by habitat param.
- AdminPage provides a minimal demo form to add/edit entries in-memory.

Performance & UX niceties
- Code-splitting via React.lazy + Suspense for each route.
- Images use loading="lazy" and picture/srcSet pattern on detail.
- Subtle hover/focus states and accessible color usage for status badges.

Environment
- This project is frontend-only and does not call a backend.

License
- For educational/demo use. Replace images/audio with your own assets.
