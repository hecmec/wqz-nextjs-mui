# WQZ basic requirements

## 1. Introduction

- The purpose of this document is to define the basic requirements for the WQZ project.
- The project is a web application that allows users to create and share quizzes.
- The web application should be usable as a mobile app via PWA (Progressive Web App) and should be optimized for mobile use (mobile-first design; very important).
- The quiz container itself is a component that is finished and does not need specification.
- The focus of this document is on the overall frontend requirements, including registration/login UI, quiz creation UI, quiz taking, browsing, and sharing.

### 1.1 Scope (Frontend only)

- This project is frontend-only.
- Requirements must be implementable without depending on any specific server implementation.
- All data access must be abstracted behind a client-side data layer so the UI can work with:
  - mock data (static JSON) for development/demo
  - a future data-provider implementation (out of scope for this document)

### 1.2 Out of scope

- Server-side implementation, data storage, hosting
- Payment systems
- Full admin tooling (unless explicitly added later)

### 1.3 Technical Context

- **Framework**: Next.js 15+ (App Router)
- **UI Library**: new shadcn/ui (old Material UI (MUI) v5+)
- **Language**: TypeScript
- **Internationalization**: next-intl (supporting `[locale]` routing)
- **State Management**: React Context + Reducers

#### 1.3.1 UI Framework

- shadcn/ui (optional, for some components if it fits better with the design)
  - Tailwind based, small

### 1.4 Key UX principles

- Mobile-first layouts and tap-friendly UI (44px+ touch targets)
- Fast perceived performance: skeletons/placeholders while loading
- Clear empty states (no quizzes, no results, no leaderboard data)
- Accessibility baseline: keyboard navigation + screen-reader labels for interactive controls

### 1.5 Definition of done (per page)

- Works on mobile, tablet, desktop (responsive)
- Works in all supported locales (at least `en`, `fr`, `de`)
- Has loading, empty, and error states
- No console errors; passes `npm run lint` and `npm run type`

## 2. Functional Requirements

### Supported routes (App Router)

All routes are under `/<locale>`.

- `/<locale>`: Home
- `/<locale>/play/<slug>`: Quiz player
- `/<locale>/search`: Search
- `/<locale>/me`: Account (profile + history)
- `/<locale>/leaderboard`: Leaderboard
- `/<locale>/collections`: Collections list
- `/<locale>/collections/<slug>`: Collection detail
- `/<locale>/courses`: Courses list
- `/<locale>/courses/<slug>`: Course detail
- `/<locale>/about`: About
- `/<locale>/faq` (or `/<locale>/info/...`): Information pages
- `/<locale>/auth/login` and `/<locale>/auth/signup`: Auth pages

Routing conventions

- `slug` must be URL-safe and stable.
- If a “shortkey” is used, prefer a deterministic suffix: `<title-slug>--<shortKey>`.
- Provide a fallback for unknown routes: localized Not Found page.

### Public vs Private

- Anonymous users can:
  - browse all public quizzes
  - can see a list of:
    - most popular quizzes of all times
    - most popular quizzes of the last 30 days (trending)
    - most recent quizzes (latest)
- Anonymous users can take public quizzes
  - take a quiz without logging in
  - see the quiz results after taking the quiz
  - cannot save results permanently (but they are invited to register and save results)

- Registered users can:
  - access their account page
  - can access their history page
  - can save quiz results when they finish a quiz
  - can access leaderboard

Acceptance criteria

- Anonymous users can complete a quiz end-to-end and see a results screen.
- When anonymous users try to save results, show a non-blocking prompt to log in/sign up.
- Registered users see a clear “result saved” success state at quiz completion.

### User Registration (signup:register)

- The system must allow users to register an account.
- The user must provide a username, email, and password.

UI requirements

- Form validation: required fields, email format, password minimum rules (define in UI copy; e.g. 8+ chars).
- Error display: inline field errors + global submit error.
- Success: redirect to Home or Account.

### User Login (signin/login)

- The system must allow registered users to log in to their account.
- The user must provide either (email or username) and password. Choose one and keep it consistent across UI copy and placeholders.

UI requirements

- Provide “Forgot password?” as a placeholder link (the flow itself may be deferred if not in MVP).

### Browse Quizzes (HomePage)

**HomePage**

All users can browse quizzes.

#### Homepage layout

- On the left side there is a navigation drawer (push menu). It is open on large screens and closed by default on small screens.

- In anonymous mode the menu shows: Home, Search, FAQ, Collections, Courses.
- The content panel of the home page has two parts: a top filter area and a grid area.

Menu requirements

- Active route is highlighted.
- Menu is keyboard accessible and can be closed on mobile.

#### Top filter part (QuizFilter)

- There are ~12 top topics (e.g., Language, Geography, Life, VIP, Nature, Sport, ...).
- Provide filter controls for:
  - Popular (all-time most popular, default)
  - Hot (recently popular)
  - New (recently created)
  - Seasonal (matching the current season)

Filter behavior

- Filter state is reflected in the URL (query params) so it is shareable and back/forward works.
- Filters are either combinable or explicitly mutually exclusive (choose one).
  - e.g. "Popular" and "Language" are combinable.
  - Popular, Hot, New, Seasonal are mutually exclusive.
  - When a filter is active, it should be visually distinct (e.g., highlighted).

#### Quiz Grid (QuizGrid)

- On the HomePage, users see a responsive grid (like YouTube) with 24 quizzes for the active sorting/filter.
- The grid is responsive; cards target width between 250 and 500px.

Loading/empty/error

- Loading: show skeleton cards.
- Empty: show a message and a “Clear filters” button.
- Error: show an error banner + retry.

#### Quiz Card (QuizCard)

- Each quiz is shown as card (min-width: 250px).
  - the card has an image on the top part,
  - underneath a title with two lines,
  - then a line for tags and
  - a line for view count and question count.

Interaction

- Clicking a quiz card navigates to the quiz player route.
- Long titles are truncated; full title is available via tooltip/aria-label.

### Taking Quiz (QuizPlayer)

- This is the page where the user takes the quiz, sees metadata and related quizzes.

- Route: `/<locale>/play/<slug>` (slug may include a shortKey suffix)

#### QuizPlayer layout

- The layout is similar to a YouTube video page.
- Left Side:
  - Left side shows the quiz and underneath the metadata
  - For the quiz just show a placeholder, this part is already done.

- Right Side:
  - the page has a right menu with a list of cards of related quizzes,
  - those quiz cards are used to navigate

- The user must be able to answer questions and receive a score at the end.

Quiz player UI requirements

- Sticky “Start/Restart” and “Next” controls on mobile.
- On completion: show score summary and CTA buttons:
  - Play again
  - Share
  - Save result (if logged in) / Sign up to save (if anonymous)

Acceptance criteria

- Completing a quiz always leads to a result screen/state.
- Related quizzes list is visible on desktop and accessible via a drawer/collapse on mobile.

### Quiz Creation

- The system must allow users to create quizzes.
- The user must provide a title and a list of questions and answers.
- Leave it as simple as possible

UI scope (minimal)

- Create quiz page with:
  - Title input
  - Optional description
  - Tag input (chips)
  - Add/remove questions
  - Per question: prompt + answers (pick one mode for MVP: multiple-choice OR text)
- Validation and draft saving in local UI state.

Acceptance criteria

- A user can create a quiz in the UI without page errors.
- The quiz can be previewed in the QuizPlayer using the same quiz container.

### Quiz Sharing

- The system must allow users to share quizzes with other users.
- The user must be able to send a link to the quiz.

UI requirements

- Provide a share button that:
  - copies the canonical URL to clipboard
  - optionally triggers the Web Share feature (`navigator.share`) when supported

### User Account Page

- The registered user can access her account page
- she sees her user information and her activity list

#### user information (AccountDetail)

- the user can read and update her information
- username
- email
- language

UI requirements

- Changes show confirmation feedback (snackbar/toast).
- Forms have validation and cancel/reset.

#### User Activity history (ResultPage)

- A list of last quizSessions.
- The list shows: name, datetime, points gained, bonuses won,

UI requirements

- List supports pagination or “load more”.
- Each entry links back to the quiz.

### Leaderboard Page

- the user can see different leaderboards (the leaders, me in the list) with three timeranges (alltime, monthly, week)
- Each entry shows the avatar, the userName, points

UI requirements

- Tabs or segmented control for time ranges.
- “Me” entry is highlighted when present.
- Empty and loading states must be handled.

### Search Page

- the users can search for quizzes on this page
- the page shows a simple big search field and a search button
- quizzes are found by partial match on title, description and tags

UI requirements

- Explicit search button is required (debounced search optional).
- Result list uses the same QuizCard component.
- Search query is reflected in URL query params.

### FAQ and other Information Pages

- There is a space for information pages like FAQ, Legal info, help, how tos...

### Collection Pages and CollectionEntryPage

- **Route**: `/[locale]/collections` (List) and `/[locale]/collections/[slug]` (Detail)
- There is a space and page where all collections are presented.
- A **Collection** is a curated list of quizzes centered around a specific topic (e.g., "Best 80s Music Quizzes").
- **Collection List Page**: Displays a grid of available collections.
- **Collection Detail Page**: Displays the collection title, description, and the list of quizzes contained within it (using QuizCards).

UI requirements

- Collection cards show title + short description + number of quizzes.
- Collection detail supports sharing the collection link.

### Course Pages and CoursEntrypage

- **Route**: `/[locale]/courses` (List) and `/[locale]/courses/[slug]` (Detail)
- There is a space and page where all courses are presented.
- A **Course** is a structured, ordered sequence of quizzes designed for educational progression (e.g., "Learn French: Level A1").
- **Course List Page**: Displays available courses.
- **Course Detail Page**:
  - Shows progress tracking (e.g., "3/10 quizzes completed").
  - Users must typically complete quizzes in order, or achieve a minimum score to unlock the next one.

UI requirements

- Show progress bar and a clear “Continue” CTA.
- Locked items have a disabled state + tooltip/explanation.

### Global UI states

- Global error boundary that shows a friendly message and a link back to Home.
- 404 page: localized title + navigation options.
- Loading indicators follow a consistent design system (MUI skeletons/spinners).

## 3. Data Model Requirements (TypeScript Interfaces)

Notes

- These interfaces represent frontend state and UI contracts.
- They must be usable with mock data.
- Avoid mixing server-only fields into frontend types.

### Quiz

```typescript
interface Quiz {
  id: string;
  title: string;
  slug: string; // URL slug (may include shortKey suffix)
  /**
   * Compact identifier shown in UI to keep URLs short, four alphanumeric keys, e.g. "Ux7yTP"
   * for ex. substr(base64(lang+id), 0, 6)
   */
  shortKey?: string;
  imgSrc?: string;
  userLang: string; // quiz content language, e.g. "fr", "en"
  description?: string;
  questList: QuestionType[]; // Array of questions
  options: QuizOptions;
  lastQuizSession?: QuizSession; // Specific to the current user context
  tags?: string[];
  viewCount?: number;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  authorId?: string; // Reference to User
}
```

### QuizOptions

```typescript
interface QuizOptions {
  text: {
    title: string;
    intro: string;
  };
  randomize: boolean; // default: true
  showAnswers: boolean; // default: true
  canGoBack: boolean; // default: false
  showMcHints: boolean; // default: true
  showExplain: boolean; // default: true
  ignoreCase: boolean; // default: true
  ignoreAccents: boolean; // default: true
  maxWrongLetters: number; // default: 0
  canSave: boolean; // default: false
  showLogin: boolean; // default: false
  quizImgPath?: string;
  quizAudioPath?: string;
}
```

### QuizSession

```typescript
interface QuizSession {
  id: string;
  userId?: string; // Optional for anonymous sessions
  quizId: string;
  locale: string; // UI locale at the time of playing

  // Scoring
  bonusPoints: number;
  maxPoints: number;
  resultPoints: number; // Actual score achieved

  // Stats
  numAlmostRightAnswers: number;
  numRightAnswers: number;
  numQuestions: number;

  // Metadata
  startedAt: string; // ISO Date
  completedAt?: string; // ISO Date
  isCompleted: boolean;
}
```

### User (frontend)

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  preferredLocale: string; // e.g. "fr"
  avatarUrl?: string;
  createdAt: string;
}
```

### Collection

```typescript
interface Collection {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imgSrc?: string;
  quizIds: string[];
}
```

### Course

```typescript
interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imgSrc?: string;
  quizIds: string[]; // ordered
  minScoreToUnlockNext?: number; // 0..100
}
```

## 4. Non-Functional Requirements

### 4.1. Performance

The UI must feel fast on mobile devices.

- Use responsive images (Next Image) and avoid layout shift.
- Avoid blocking navigation; show skeletons for lists.
- Target budgets (guidelines):
  - LCP < 2.5s (mobile)
  - INP < 200ms
  - CLS < 0.1

- LCP: Largest Contentful Paint (LCP) is a Core Web Vitals metric that measures the render time of the largest image or text block visible within the viewport, indicating perceived load speed.

- INP: Interaction to Next Paint (INP) is a Core Web Vitals metric that assesses overall responsiveness by measuring the latency of all user interactions throughout the page lifecycle, focusing on the slowest interaction.

- CLS: Cumulative Layout Shift (CLS) is a Core Web Vitals metric that quantifies the sum of all unexpected layout shifts that occur during the lifespan of the page, reflecting visual stability.

### 4.2. Frontend security requirements

- Do not store secrets in the client.
- Do not log credentials to console.
- Forms must use proper input types and autocomplete hints.
- Protect private routes in the UI (redirect to login when unauthenticated).

### 4.3. Usability

The system must be easy to use and navigate. The system must provide clear instructions to the user.

### 4.4. Reliability

Frontend reliability requirements

- App must not crash on missing/partial data; show fallbacks.
- Global error boundary must catch render errors and present a recovery path.

### 4.5. PWA requirements

- App is installable (manifest, icons, proper meta).
- Offline behavior for MVP: at minimum, show a friendly offline page/state.
- Service worker caching strategy should not break navigation.

### 4.6. Internationalization requirements

- Default locale is French (`fr`), but the app must support at least English (`en`) and German (`de`).
- Locale is determined by the URL (`/[locale]/...`) and can be switched by the user.
- The default locale (when visiting `/`) is the browser language if supported, otherwise `fr`.
- All user-facing strings must go through next-intl.
- Dates/numbers are formatted per locale.

### 4.7. Testing requirements

- Component tests for the shared UI components (buttons, links, icons, alerts).
- Smoke tests for key flows (home → play → results; login form validation).

## 5. Conclusion

The basic frontend requirements for the WQZ project have been defined. The UI must allow users to register, log in, browse quizzes, take quizzes, create quizzes (minimal), share quizzes, and manage their account. The app must be mobile-first, localized, accessible, and resilient.
