# Would you rather app
This is a react app allowing user to answer  would you rather questions
- each question has two options to choose from
- user can create new question
- user can view the results
- Leaderboard is displayed showing top users to ask new and answer questions inside the app

## Table of contents


- [Quick Start](#quick-start)
- [Docs](#docs)
- [License](#license)

## Quick Start
### To run locally:
```
download projectfiles
npm install
npm start
```


## Docs
### App Structure
Within the download you'll find the following directories and files:
```
|-- package.json
📦src
 ┣ 📂components
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📜john.jpg
 ┃ ┃ ┃ ┣ 📜login.png
 ┃ ┃ ┃ ┣ 📜sarah.jpg
 ┃ ┃ ┃ ┗ 📜tyler.jpg
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂leaderboard
 ┃ ┃ ┗ 📜leaderboard.js
 ┃ ┣ 📂navMenu
 ┃ ┃ ┗ 📜menu.js
 ┃ ┣ 📂questions
 ┃ ┃ ┣ 📜home.js
 ┃ ┃ ┣ 📜newAnswer.js
 ┃ ┃ ┣ 📜newquestion.js
 ┃ ┃ ┣ 📜questionCard.js
 ┃ ┃ ┣ 📜questionResults.js
 ┃ ┃ ┗ 📜SingleQuestion.js
 ┃ ┣ 📜Login.js
 ┃ ┗ 📜notFound.js
 ┣ 📂state
 ┃ ┣ 📂actionCreators
 ┃ ┃ ┣ 📜answerQuestion.js
 ┃ ┃ ┣ 📜createQuestion.js
 ┃ ┃ ┣ 📜getQuestions.js
 ┃ ┃ ┗ 📜loginDispatcher.js
 ┃ ┣ 📂actionReducers
 ┃ ┃ ┣ 📜questionsReducer.js
 ┃ ┃ ┣ 📜rootReducer.js
 ┃ ┃ ┗ 📜UserReducers.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜LoggingRoute.js
 ┃ ┗ 📜store.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜_DATA.js
```

## license
This Project is based on starter file of a fake database _DATA.js by Udacity
