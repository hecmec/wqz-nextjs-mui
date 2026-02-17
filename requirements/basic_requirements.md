# WQZ basic requirements

## 1. Introduction

- The purpose of this document is to define the basic requirements for the WQZ project.
- The project is a web application that allows users to create and share quizzes.
- The quiz container itself is a component that is finished and does not need specification.

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

- There is a space and page where all collections are presented
- There is a menu item for this too
- Each collection is a list of quizzes for a given topic

### Cours Pages and CoursEntrypage

- There is a space and page where all courses are presented
- There is a menu item for this too
- Each cours is an ordered incremental list of quizzes of a given level and to a certain aim.

## 3. Quiz Model Requirements

### Quiz

id: string = "";
title: string | undefined = "";
imgSrc: string | undefined;
userLang: string = "fr";
questList: QuestionType[] = [];
options: WqzOptions = new WqzOptions();
lastQuizSession?: QuizSession;

### QuizOptions

text: {
title: string;
intro: string;
};
randomize: boolean = true;
showAnswers: boolean = true;
canGoBack: boolean = false;
showMcHints: boolean = true;
showExplain: boolean = true;
ignoreCase: boolean = true;
ignoreAccents: boolean = true;
maxWrongLetters: number = 0;
canSave: boolean = false;
showLogin: boolean = false;
quizImgPath: string;
quizAudioPath: string;

### QuizSession

\_id: string;
language: string;
bonusPoints: number;
maxPoints: number;
resultPoints: number;
numAlmostRightAnswers: number;
numRightAnswers: number;
numQuestions: number;
updated: string;

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
