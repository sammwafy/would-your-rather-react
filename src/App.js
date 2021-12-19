// import hooks and react elements
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router";
import { Container } from "semantic-ui-react";

// import state elements
import { LoggingRoute } from "./state/LoggingRoute";
import { getQuestions } from "./state/actionCreators/getQuestions";
import { allUsers } from "./state/actionCreators/loginDispatcher";

// import components
import { AllQuestions } from "./components/questions/home";
import { SingleQuestion } from "./components/questions/SingleQuestion";
import { Login } from "./components/Login";
import { LeaderBoard } from "./components/leaderboard/leaderboard";
import { NavMenu } from "./components/navMenu/menu";
import { NewQuestion } from "./components/questions/newquestion";
import { PageNotFound } from "./components/notFound";



function App() {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  let location = useLocation();

  // dispatch actions once !

  useEffect(() => {
    if (Object.keys(questions).length === 0) {
      dispatch(getQuestions());
    }
    if (Object.keys(users).length === 0) {
      dispatch(allUsers());
    }
  }, []);



  return (
    <div className="App">
      
      {/* // if current path is not login then hide the navMenu */}

      {!(location.pathname === "/login") && <NavMenu />}
      <Container className="container">
        <Routes>
          <Route path="/login" element={<Login />} />

      {/* wrap components with my private route to check if user is logged-in */}

          <Route
            path="/"
            element={
              <LoggingRoute>
                <AllQuestions />
              </LoggingRoute>
            }
          />

          <Route
            path="/questions/:question_id"
            element={
              <LoggingRoute>
                <SingleQuestion />
              </LoggingRoute>
            }
          />

          <Route
            path="/add"
            element={
              <LoggingRoute>
                <NewQuestion />
              </LoggingRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <LoggingRoute>
                <LeaderBoard />
              </LoggingRoute>
            }
          />
          <Route
            path="*"
            element={
              <LoggingRoute>
                <PageNotFound />
              </LoggingRoute>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
