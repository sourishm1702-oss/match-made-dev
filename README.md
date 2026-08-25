# TeamLink Pro

You are a Principal Product Designer and Full-Stack Engineer building a production-ready web application prototype called "ProjectMatch" — a Team Formation Platform for students and developers to find collaborators for hackathons, coursework, and side projects.

Build this as a fully functional, visually polished React + Tailwind application with mock data, working state (no backend required — use local component state / mock JSON), and smooth interactivity throughout.

=== PRODUCT OVERVIEW ===

ProjectMatch helps users:

1. Create a profile showcasing their skills, role, availability, and interests

2. Browse a feed of projects looking for teammates

3. Browse candidate profiles looking for teams

4. Get an "AI Match Score" showing compatibility based on skill/interest overlap

5. Request to join a project team, or invite a candidate to theirs, via a modal with pre-filled AI-generated match reasoning

=== VISUAL DESIGN SYSTEM ===

- Dark mode ONLY (no light mode toggle needed for this prototype)

- Aesthetic: modern, sleek, glassmorphic (frosted-glass cards with backdrop-blur, subtle 1px borders in low-opacity white, soft inner glow on hover)

- Background: deep charcoal/near-black (#0A0A0F or similar) with a subtle radial gradient glow (violet/cyan) behind hero sections

- High-contrast accent colors: electric violet (#8B5CF6) as primary, cyan (#22D3EE) as secondary, use both sparingly for CTAs, active states, and match-score badges

- Font: Inter, throughout — use font weight variation (400 body, 600 headings, 700 for scores/numbers) rather than multiple font families

- Cards: rounded-2xl, glassmorphic (bg-white/5, backdrop-blur-xl, border border-white/10), subtle hover lift (translate-y + shadow glow in accent color)

- Buttons: primary buttons use a violet-to-cyan gradient fill with glow shadow on hover; secondary buttons are outlined glass style

- Skill tags: small rounded-full pill badges, subtle background tint per category (e.g. Frontend = cyan tint, Backend = violet tint, Design = pink tint, Data = amber tint)

- Micro-interactions: smooth transitions (200-300ms ease), skeleton-less instant mock data load, subtle scale/opacity animations on modal open

=== NAVIGATION & LAYOUT ===

Build these views with a persistent top navigation bar (glassmorphic, sticky, blurred backdrop):

1. **Landing / Header**

   - Logo "ProjectMatch" (wordmark, gradient text treatment)

   - Nav links: Dashboard, Project Feed, Talent Feed, Profile

   - Right side: "Post a Project" primary CTA button + user avatar (mock logged-in user)

   - Hero section (only visible pre-login state, or as a top banner on Dashboard): bold headline like "Find Your Perfect Project Team, Powered by AI Matching", subheadline, two CTAs: "Browse Projects" and "Complete Your Profile"

2. **Dashboard View** (default landing view after "login")

   - Summary cards row: "Your Active Applications", "Projects You Posted", "AI-Recommended Matches", "Profile Completeness %"

   - "Recommended For You" horizontal scroll section: 3-4 project cards or candidate cards with high AI match scores, sorted descending

   - Recent activity feed (mock): "Priya requested to join your project 'EcoTrack'", "You were matched 91% with 'AI Study Buddy App'"

3. **Project Feed View**

   - Grid of Project Listing Cards (see component spec below)

   - Left sidebar (or top bar on mobile): Smart Filters panel

   - Sort dropdown: "Best Match", "Newest", "Most Roles Open"

   - "Post a Project" button opens a project creation modal (title, description, required roles multi-select, missing skill tags input, team size, commitment level, deadline)

4. **Talent Feed View** (candidate browsing)

   - Grid of Candidate Profile Cards

   - Same Smart Filters panel adapted for candidates (skills, domain role, availability, experience level)

5. **Profile View**

   - Two modes: "View Profile" (public-facing card layout) and "Edit Profile" (form)

   - Edit Profile form sections:

     a. Basic info: name, avatar (initials-based generated avatar), tagline, bio

     b. Domain Role selector: single/multi-select chips — Frontend, Backend, Full-Stack, Design (UI/UX), Data Science/ML, DevOps, Product/PM

     c. Skill Tags: searchable multi-select tag input (e.g., React, Python, Figma, TensorFlow, Node.js, PostgreSQL) with ability to add custom tags

     d. Availability Status: toggle/badge — "Actively Looking", "Open to Offers", "Not Available" (color-coded: green/amber/gray)

     e. Experience Level: Beginner / Intermediate / Advanced / Expert (segmented control)

     f. Project Interests: tag input — e.g., "Web Apps", "Mobile", "AI/ML", "Hackathons", "Open Source", "Startups"

     g. Weekly Commitment: slider or dropdown (e.g., "1-5 hrs/week" to "20+ hrs/week")

   - Save button with success toast confirmation

=== CORE INTERACTIVE COMPONENTS ===

**A. Project Listing Card**

   - Project title, short description (2-line clamp), poster's name + avatar

   - Required Roles: chips showing roles needed (e.g., "UI Designer", "Backend Dev") — filled chips = filled role, outlined/dashed chips = still open

   - Missing Skill Tags: highlighted distinctly (e.g., "Needs: Figma, Node.js") in accent color to show gaps

   - Team size indicator (e.g., "3/5 members")

   - Commitment level badge (e.g., "10-15 hrs/wk")

   - AI Match Score badge (top-right corner, circular or pill, gradient-filled, e.g., "94% Match" with a small sparkle/AI icon) — only shown when viewing as a candidate browsing projects

   - "Request to Join" primary button + "View Details" secondary link

**B. Candidate Profile Card**

   - Avatar, name, tagline, domain role badge

   - Top 4-5 skill tags (with "+N more" overflow)

   - Availability status badge (color-coded dot + label)

   - Experience level indicator

   - AI Match Score badge (same visual treatment as project cards) — shown when a project owner is browsing candidates, contextualized to their open project

   - "Invite to Project" primary button + "View Profile" secondary link

**C. AI Matchmaking Score Badge (reusable component)**

   - Circular progress ring or gradient pill showing percentage (e.g., 94%)

   - Color gradient shifts by score tier: 90-100% = vibrant violet-cyan glow, 70-89% = cyan, 50-69% = amber, below 50% = muted gray

   - Small "AI" sparkle icon

   - On hover/click, shows a tooltip/popover breaking down the match: "Skill Overlap: 90%, Interest Alignment: 85%, Availability Fit: 100%"

**D. Smart Filters & Search Panel**

   - Search bar (search by name/project title/keyword)

   - Filter by Skills (multi-select tag checklist with search-within)

   - Filter by Domain Role (checklist: Frontend, Backend, Design, Data, etc.)

   - Filter by Commitment Level (range or preset buttons: Light, Moderate, Heavy)

   - Filter by Availability Status (for candidates) or Team Size / Roles Open (for projects)

   - "Clear Filters" and active filter count badge

   - Filters should actually work against the mock data (live filter/search, no page reload)

**E. "Request to Join Team" / "Invite to Project" Modal**

   - Glassmorphic modal, centered, backdrop blur on background

   - Header: project or candidate name + avatar

   - AI Match Reasoning section (pre-filled, editable): bulleted breakdown like:

     • "✓ Strong skill overlap in React & TypeScript"

     • "✓ Both interested in AI/ML applications"

     • "✓ Availability aligns (10-15 hrs/week)"

     • "⚠ No design experience — consider pairing with a UI specialist"

   - Optional personal message textarea (pre-filled with an AI-suggested opener, editable)

   - "Send Request" primary button (gradient), "Cancel" secondary

   - On send: show success toast/confirmation animation, modal closes, add to "Recent Activity" on dashboard

=== MOCK DATA (must be pre-populated so the demo looks alive immediately) ===

Include at least 8 candidate profiles and 6 project listings, for example:

Candidates:

1. Alex Chen — Frontend Dev (React, TypeScript, Tailwind), Advanced, Actively Looking, interested in "Web Apps, Hackathons", 10-15 hrs/wk, looking for a UI Designer and Backend Dev

2. Priya Sharma — UI/UX Designer (Figma, Framer, Design Systems), Intermediate, Actively Looking, interested in "Mobile, Startups"

3. Marcus Johnson — Backend Dev (Node.js, PostgreSQL, AWS), Expert, Open to Offers, interested in "AI/ML, Open Source"

4. Sana Iqbal — Data Scientist (Python, TensorFlow, Pandas), Advanced, Actively Looking, interested in "AI/ML, Web Apps"

5. Diego Ramirez — Full-Stack Dev (React, Django, Docker), Intermediate, Actively Looking

6. Emily Zhang — Product/PM (Roadmapping, User Research, Figma), Advanced, Open to Offers

7. Jordan Lee — DevOps (Kubernetes, CI/CD, Terraform), Expert, Not Available

8. Riya Kapoor — Frontend Dev (Vue.js, CSS, Accessibility), Beginner, Actively Looking, interested in "Hackathons"

Projects:

1. "EcoTrack" — sustainability tracking app; needs UI Designer + Data Scientist; posted by Marcus Johnson; 3/5 members; 10-15 hrs/wk

2. "AI Study Buddy" — AI-powered study companion; needs Frontend Dev + Backend Dev; posted by Sana Iqbal; 2/4 members; 15-20 hrs/wk

3. "CampusConnect" — student networking app; needs Backend Dev + PM; posted by Riya Kapoor; 1/4 members; 5-10 hrs/wk

4. "DevMatch Hackathon Bot" — Slack bot for hackathon team formation (meta!); needs Data Scientist; posted by Alex Chen; 3/4 members; 10-15 hrs/wk

5. "Recipe AI" — AI recipe generator from fridge photos; needs everything, brand new project; posted by Diego Ramirez; 1/5 members; 20+ hrs/wk

6. "OpenSource Portfolio Builder" — tool for devs to auto-generate portfolios from GitHub; needs Frontend Dev + Designer; posted by Emily Zhang; 2/4 members; 5-10 hrs/wk

Generate realistic AI Match Scores (e.g., between 45%-97%) for each candidate-project pairing shown on cards, with plausible breakdowns (Skill Overlap %, Interest Alignment %, Availability Fit %) that roughly justify the overall score.

Also pre-populate the Dashboard's "Recent Activity" feed with 3-4 realistic mock events, and set the mock logged-in user as "Alex Chen" so Profile view and "Your Active Applications" have contextual data.

=== TECHNICAL REQUIREMENTS ===

- Fully responsive (mobile, tablet, desktop) — collapse filters into a slide-out drawer on mobile, stack cards in single column

- All interactions must work with local state: filters, search, modal open/close, form editing, toast notifications

- Use skeleton/empty states gracefully where relevant (e.g., "No candidates match your filters")

- Smooth page/view transitions

- Accessible: proper contrast ratios despite dark theme, keyboard-navigable modals, alt text on avatars

Build the complete, cohesive prototype now with all views, components, mock data, and interactivity wired together as described above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://match-made-dev.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cc2867aa-1b0a-46a2-b654-d56373486c71).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
