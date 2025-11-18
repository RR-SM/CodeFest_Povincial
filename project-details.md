## System Overview

- **Routing + Theming**: App boots through Expo Router stack that wraps the entire navigator inside `ThemeProvider`, ensuring one theme context for all tabs and hiding headers globally. Navigation is file-based: a single stack points to the `(tabs)` layout, which itself defines the five-tab bottom navigator (`budget`, `projects`, `index`, `tenders`, `settings`).
- **Dynamic light/dark palette**: `ThemeContext` selects light or dark palettes based on the system color scheme, exposes `toggleTheme`, and provides rich semantic colors (primary/secondary/surface, status colors, etc.) used by every screen for gradients, cards, charts, and badges.
- **Shared styling setup**: `globals.css` boots Tailwind layers so Expo Router screens can rely on global classes if needed, while most styling is inline for React Native components.

## Feature Breakdown

### Home Dashboard (`app/(tabs)/index.tsx`)

- Hero gradient header greets the user (“Nepal Public Transparency Portal”) and streams horizontally scrollable “quick stats” (active projects, total budget, tenders, completion rate). Each stat card is color-coded and icon-labeled to give at-a-glance context.
- Quick Actions grid exposes shortcuts into budget, projects, tenders, and settings, each showing subtitle plus a live stat. The cards route via `router.push`, so tapping any card takes the user to the relevant tab or screen instantly.
- Recent Activity feed lists project, tender, and budget updates with timestamps, status colors, and a “View All” CTA.
- Insight card shows key analytic insight (“Budget Utilization 73.2%”) along with narrative context and CTA, using gradients and elevated cards to highlight.

### Projects Explorer (`app/(tabs)/projects.tsx`)

- Data model: Ten curated infrastructure projects are declared with budgets, progress percentages, dates, departments, and hero images.
- Search UX: Floating search bar with suggestions filters projects in-memory (case-insensitive) and shows a dropdown of best matches; clearing resets results.
- Project cards: Each card layers project imagery with gradient overlays, budgets (estimated/allocated/spent), timeline, dual progress bars (physical/financial), and a “View Details” CTA. Color logic changes progress hues depending on completion percentage.
- Navigation to details: `handleProjectPress` pushes `/project-details` with the project payload so the detail view can render charts/comments for that record.

### Project Detail Workspace (`app/project-details.tsx`)

- Header + summary: Shows back navigation, budgets (estimated/allocated/spent), timeline, and dual progress bars derived from route params.
- Trend analytics: A combined physical vs. financial progress line chart visualizes month-by-month trajectories, computing the arrays inline and scaling to screen width.
- Additional context: Department info, project type, dynamic status badges (Completed vs In Progress), and descriptive copy show qualitative details.
- Community engagement: Comment composer with validation adds entries to local state and prepends them to the comment list, including timestamp formatting. Photo upload integrates `expo-image-picker`, requests permissions, and allows community members to add field photos, displayed in a responsive grid.

### Budget Intelligence Center (`app/(tabs)/budget.tsx`)

- Data sets: Aggregates department-level allocations (allocated/spent/committed, colors) and detailed project budgets, then derives totals and availability.
- Export pipeline: `exportToCsv` builds a full CSV report (overview + department table + project listing). On web it triggers download via a data URI; on native it writes to the document directory with `expo-file-system`, then offers `expo-sharing` or fallback alerts and logging if sharing fails.
- KPIs + tabs: Four stat cards summarize total budget, spent, committed, available. A segmented control switches among Overview (charts), Departments (detailed cards with utilization bars), and Projects (filterable list).
- Visual analytics: Pie chart for allocation share, line chart for monthly spending, and bar chart to compare department spending.
- Department drill-down: Each card computes spent/committed/available percentages, renders stacked bars, and shows legends to interpret the breakdown.
- Project drill-down: Provides search + department filters, status badges styled via `getStatusStyle`, progress bars, and budget vs. remaining figures per project.

### Tender Management Hub (`app/(tabs)/tenders.tsx`)

- Dataset: Thirteen tender entries cover different authorities, budgets, statuses, bidding companies, and progress metrics.
- Search + suggestions: Floating search bar with suggestions list mirrors the projects screen, and scroll detection hides/shows the bar contextually.
- Status analytics: Gradient stat cards show counts of open/awarded/planning tenders plus a “Total Contract Value” gradient card summarizing combined NPR value.
- Card content: Each tender card offers status badge, budget vs. contract vs. spent row, bidding companies chips, winning company callout (if awarded), deadline info, and CTA leading to the shared project details analytics.

### Settings & Theme Control (`app/(tabs)/settings.tsx`)

- Theme toggles: The first tile toggles `ThemeContext`’s `isDarkMode`, updating the entire palette.
- Placeholder preferences: Additional rows for notifications, language, privacy, and about show how the app would expand user customization (currently stubbed).
- App info card: Highlights portal identity and mission statement, reinforcing transparency goals.

### Assets & Constants

- Icon/image registries centralize references to PNG/SVG media under `constants/icons.ts` and `constants/images.ts`, making it easy to swap imagery without hunting through screens.

---

## App Logic Narrative (No Code)

- **Entry Flow**: When the Expo app launches, it immediately determines the user’s system color scheme and wraps the router in a theme context so every screen reads the same palette and can toggle between light/dark without remounting. Navigation hands off to a tab layout that hides headers and renders a custom icon experience with gradients when a tab is focused.
- **State Synchronization**: The theme context keeps `isDarkMode` synchronized with the system but also exposes a toggle switch from the Settings tab. Other screens consume the `theme` object to ensure cards, shadows, text, and gradients react instantly to theme changes.
- **Dashboard Logic**: The home tab functions as a summarized feed. Arrays of stats/shortcuts/activity logs drive the UI, so updating those arrays is enough to refresh the UI; the router hook wires CTAs to deeper modules.
- **Project/Tender Linking**: Projects and tenders share the same detail screen. Each list builds an in-memory dataset, filters it through search, and on selection pushes the entire record as navigation params. The detail screen parses the params, converts string percentages into numbers, and feeds them to progress bars and charts, ensuring the same analytics layout works for both actual projects and pending tenders.
- **Analytics + Visualization**: Budget and tender screens emphasize data storytelling. They compute aggregates (totals, percentages, available values) inside component scope, then hand those numbers to chart-kit components to render Pie, Line, Bar charts. Because data lives as arrays of objects, changing the dataset automatically cascades to charts, KPIs, and cards without additional glue code.
- **Export + Sharing Workflow**: Budget tab’s export logic assembles CSV text by iterating through derived totals and arrays, then branches based on platform: browsers get a data URI download, while mobile writes files to the sandbox and surfaces sharing options or fallback alerts for environments without `expo-sharing`.
- **User Interaction Feedback**: Search bars on data-heavy tabs keep trimmed lower-case queries in state and provide suggestion lists while typing. Cards use gradients, shadows, badges, and chips to communicate state (Open vs. Awarded, Completed vs. In Progress) without requiring the user to read long descriptions. Comments and photo uploads in the detail screen provide a lightweight social layer so field updates can be captured alongside official metrics.

