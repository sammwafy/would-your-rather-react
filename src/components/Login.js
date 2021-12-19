import { Dropdown } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Header,
  Image,
  Form,
  Button,
  Segment,
  Message,
  Icon
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { dispatchAuthUser } from "../state/actionCreators/loginDispatcher";
import loginIMG from "./assets/images/login.png";

export const Login = () => {
  // location and navigate for purpose of router naviagtion
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // error message state
  const [showMessage, setShowMessage] = useState(false);

  // get authedUser (to be used to redirect once dispatch work)
  const authedUser = useSelector((state) => state.authUser);

  // create selected user state
  const [SelectedUser, setSelectedUser] = useState(0);

  // get all users from redux
  const users = useSelector((state) => state.allUsers);


  // create user list dropdown
  let options = [];

  if (Object.keys(users).length > 0) {
    options = Object.values(users).map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: user.avatarURL,
    }));
  }




  // handle the login form *** selected dropdown value and set the state of selected user
  const loginHandler = (data) => {
    setSelectedUser(data.value);
  };

  // dispatch the Auth User
  const setAuthUser = (SelectedUser) => {
    if (SelectedUser && SelectedUser !== null && SelectedUser !== "") {
      dispatch(dispatchAuthUser(SelectedUser));
    }
    else{
      setShowMessage(true)
    }
  };

  // wait for authedUser to be updated in the store
  // then redirect to home page or to a previous page if loction.state.from is set


  useEffect(() => {
    if (authedUser.length > 0) {
  
      if (location.state !== null) {
        if (location.state.from) {
          navigate(location.state.from);
        }
      } else if (location.state === null) {
        navigate("/");
      }
    }
  }, [authedUser]);




  return (
    <div style={{ display: "flex", padding: "40px 0px", height: "100vh" }}>
      <Container className="container" style={{ alignSelf: "center" }}>
        <Form onSubmit={() => setAuthUser(SelectedUser)}>
          <Segment raised>
            <Header as="h1">Login</Header>
            <Image
              src={loginIMG}
              size="small"
              style={{ margin: "40px auto" }}
            />
            <Dropdown
              className="loginSelector"
              placeholder="Select Friend"
              fluid
              selection
              options={options}
              onChange={(e, data) => loginHandler(data)}
            />

            <Button
              type="submit"
              size="medium"
              positive
              style={{ width: "140px" }}
            >
              login
            </Button>
            {showMessage && (
        <Message negative style={{ width: "600px", margin: "12px auto" }}>
          <Icon name="exclamation" />
          you have to choose a user
        </Message>
      )}
          </Segment>
        </Form>
      </Container>
    </div>
  );
};
