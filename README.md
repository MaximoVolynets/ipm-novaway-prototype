# NovaWay — Campus Companion (Stage 4 Prototype)

This repository contains the functional prototype for **NovaWay**, a campus companion app developed for the IPM (Interação Pessoa-Máquina) course.

This prototype was built to satisfy the **Stage 4: Functional Prototype** requirements:
* **High fidelity in look & feel:** The app behaves like a real system, with a responsive, mobile-first design.
* **Medium fidelity in breath:** All three core scenarios from Stage 3 are fully implemented and interactive.
* **Low fidelity in depth:** The app runs entirely on the frontend with mock data, requiring no backend.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State:** React Hooks (`useState`, `usePathname`)
* **Local Persistence:** `localStorage` (for bookmarks and sign-ups)

## How to Run This Project

These are the "Startup Instructions" for the project.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Project Status & Features Implemented

This prototype is functionally complete for all core scenarios.

### Core Scenarios (Fully Implemented)

#### 1. Scenario: Find a Classroom
* **Page:** `/search`
* **Features:**
    * A real-time search bar filters rooms by name, building, or department.
    * Results are dynamically grouped by department, matching the Stage 3 paper prototype.
    * Clicking a room leads to a dedicated room detail page (`/search/[id]`).
    * The detail page shows room info and navigation buttons.

#### 2. Scenario: Check Study Spaces
* **Page:** `/study`
* **Features:**
    * Lists all available study spaces from the mock data.
    * Shows a visual "crowd level" indicator (Quiet, Moderate, Crowded) with a color-coded bar.
    * The "Get Directions" button correctly links to the room's main detail page (`/search/[id]`), connecting Scenario 1 and 2.

#### 3. Scenario: View Campus Events
* **Page:** `/events`
* **Features:**
    * Displays a complete list of all mock events.
    * Includes a fully functional filter bar at the top to sort events by type (Academic, Social, etc.).
    * Clicking an event leads to a dedicated event detail page (`/events/[id]`).

### High-Fidelity Features

* **Event Sign-Up & Bookmarking:**
    * Users can **Sign Up** for an event via a pop-up modal, matching the prototype flow.
    * Users can **Save** an event (bookmark it) independently.
    * **Smart Logic:** When a user signs up for an event, it is *also* automatically saved to their bookmarks. If they "Cancel Sign-Up," it automatically removes *both* the sign-up and the bookmark.
    * **Persistence:** Both sign-ups and bookmarks are saved to `localStorage`, so they persist even after closing the browser tab.
    * **Saved Page:** The `/bookmarks` page correctly displays all saved events.

* **Smart Navigation:**
    * **Header:** The top header is context-aware. On main pages (`/`, `/events`, etc.), it shows the "NovaWay" title. On sub-pages (`/events/e1`), it shows a "Back" button.
    * **Bottom Nav:** The bottom navigation bar correctly highlights the active page.

* **Data Structure:**
    * All mock data is centralized in `lib/data.ts`.
    * All data types are defined in `lib/types.ts`.
    * The bookmark/sign-up logic is encapsulated in custom hooks in `lib/hooks/`.

---

## What's Missing (Tasks TO DO)

The functional "skeleton" is complete. The main task remaining is to implement the "map" visuals as prototyped, which is a perfect hand-off task.

### 1. Implement Static Map Visuals (High Priority)

The functionality for the map page is complete, but it needs the visual assets.

* **File to Edit:** `app/search/[id]/page.tsx`
* **What to do:**
    1.  The `navStarted` state is already built. You just need to create the map images. 
    2.  Two options I thought: Or use maps images (screenshots) or integrate some maps api (isn't hard but a bit time consuming (would be the best option))

### 2. Create the "Briefing" Report Page

For the final hand-in, the assignment requires a "Briefing" page to give to evaluators.

* **What to do:**
    1.  Create a new page (e.g., at `/briefing`).
    2.  Copy the "Briefing" text from the Stage 3 PDF document onto this page.
    3.  This page can be linked from the "Saved" page (or another appropriate place) if you want it accessible in the app, or it can just exist for the evaluators.