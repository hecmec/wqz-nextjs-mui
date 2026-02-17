# WQZ basic requirements

## 1. Introduction

- The purpose of this document is to define the basic requirements for the WQZ project.
- The project is a web application that allows users to create and share quizzes.
- The web application sould be usable as a mobile app via WPA (web progressive app) and should be optimized for mobile use. (mobile first design, very important!!)
- The quiz container itself is a component that is finished and does not need specification.
- The focus of this document is on the overall system requirements, including user registration, quiz creation, quiz taking, and sharing functionalities.

### 1.1 Technical Context

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Material UI (MUI) v5+
- **Language**: TypeScript
- **Internationalization**: next-intl (supporting `[locale]` routing)
- **State Management**: React Context + Reducers

## 2. Functional Requirements

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
  - cannot save the quiz results (but they are invited to register and save the results)

- Registered users can:
  - access their account page
  - can acess their history page
  - can save quiz results when they finish a quiz
  - can access leaderboard

### User Registration (signup:register)

- The system must allow users to register an account.
- The user must provide a username, email, and password.

### User Login (signin/login)

- The system must allow registered users to log in to their account.
- The user must provide a username and password.

### Browse Quizzes (HomePage)

**HomePage**

All users can browse quizzes.

#### Homepage layout

- On Left side there is a Push Menu. It is open for big screens and closed by default for smaller ones.

- In anonymous mode the Menu shows: Link to Home, Link to search, link to faq, link to collections, link to parcours.
- The content panel of the home page has to parts: a top filter part and a grid part

#### Top filter part (QuizFilter)

- There are 12 top Topics like Language, Geography, LIfe, VIP, Nature Sport ... And buttons to filter for hot quizzes (recently poplar), New Quizzes (recently created), Season quizzes (quizzes that match the current season)

#### Quiz Grid (QuizGrid)

- On the HomePage, users see grid (like youtube) with 24 most popular quizzes.
- the grid is responsive, cards are between 250 and 500 px.

#### Quiz Card (QuizCard)

- Each quiz is shown as card (min-width: 250px).
  - the card has an image on the top part,
  - underneath a title with two lines,
  - then a line for tags and
  - a line for view count and question count.

- When the user clicks on a quiz cards

### Taking Quiz (QuizPlayer)

- this is page, where the user takes the quiz, sees metainforation and related quizzes.

- quiz play page baseurl/fr/play/title-of-my-quiz-shortkey
- that is baseurl/{language}/play/{slug-with-shortkey}

#### QuizPlayer layout

- the layout is similar to a youTube video page.
- Left Side:
  - Left side shows the quiz and underneath the metadata
  - For the quiz just show a placeholder, this part is already done.

- Right Side:
  - the page has a right menu with a list of cards of related quizzes,
  - those quiz cards are used to navigate

- The user must be able to answer questions and receive a score at the end.

### Quiz Creation

- The system must allow users to create quizzes.
- The user must provide a title and a list of questions and answers.
- Leave it as simple as possible

### Quiz Sharing

- The system must allow users to share quizzes with other users.
- The user must be able to send a link to the quiz.

### User Account Page

- The registered user can access her account page
- she sees her user information and her activity list

#### user information (AccountDetail)

- the user can read and update her information
- username
- email
- language

#### User Activity history (ResultPage)

- A list of last quizSessions.
- The list shows: name, datetime, points gained, bonuses won,

### Leaderboard Page

- the user can see different leaderboards (the leaders, me in the list) with three timeranges (alltime, monthly, week)
- Each entry shows the avatar, the userName, points

### Search Page

- the users can search for quizzes on this page
- the page shows a simple big search field and a search button
- quizzes are found by partial match on title, description and tags

### FAQ and other Information Pages

- There is a space for information pages like FAQ, Legal info, help, how tos...

### Collection Pages and CollectionEntryPage

- **Route**: `/[locale]/collections` (List) and `/[locale]/collections/[slug]` (Detail)
- There is a space and page where all collections are presented.
- A **Collection** is a curated list of quizzes centered around a specific topic (e.g., "Best 80s Music Quizzes").
- **Collection List Page**: Displays a grid of available collections.
- **Collection Detail Page**: Displays the collection title, description, and the list of quizzes contained within it (using QuizCards).

### Course Pages and CoursEntrypage

- **Route**: `/[locale]/courses` (List) and `/[locale]/courses/[slug]` (Detail)
- There is a space and page where all courses are presented.
- A **Course** is a structured, ordered sequence of quizzes designed for educational progression (e.g., "Learn French: Level A1").
- **Course List Page**: Displays available courses.
- **Course Detail Page**:
  - Shows progress tracking (e.g., "3/10 quizzes completed").
  - Users must typically complete quizzes in order, or achieve a minimum score to unlock the next one.

## 3. Data Model Requirements (TypeScript Interfaces)

### Quiz

```typescript
interface Quiz {
  id: string;
  title: string;
  imgSrc?: string;
  userLang: string; // e.g., "fr", "en"
  questList: QuestionType[]; // Array of questions
  options: QuizOptions;
  lastQuizSession?: QuizSession; // Specific to the current user context
  tags?: string[];
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
  _id: string;
  userId?: string; // Optional for anonymous sessions
  quizId: string;
  language: string;

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
  updatedAt: string; // ISO Date (completion time)
  isCompleted: boolean;
}
```

## 4. Non-Functional Requirements

### 4.1. Performance

The system must be able to handle a large number of users and quizzes. The system must respond quickly to user actions.

### 4.2. Security

The system must protect user data and prevent unauthorized access. The system must encrypt user passwords.

### 4.3. Usability

The system must be easy to use and navigate. The system must provide clear instructions to the user.

### 4.4. Reliability

The system must be available at all times. The system must not lose user data.

## 5. Conclusion

The basic requirements for the WQZ project have been defined. The system must allow users to register, log in, create quizzes, take quizzes, and share quizzes. The system must also be performant, secure, usable, and reliable.
