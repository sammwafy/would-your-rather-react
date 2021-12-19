import { Menu, Image, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../state/actionCreators/loginDispatcher";
import { useNavigate } from "react-router";
export const NavMenu = () => {
  const authedUser = useSelector((state) => state.authUser)[0];

  const [state, setState] = useState({});
  const handleItemClick = (e, { name }) => setState({ activeItem: name });
  const { activeItem } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout, clear the authUser and clear the state

  const logingout = () => {
    dispatch(logout());
    navigate("/", { replace: false, state: () => null });
  };

  // show menu to logged in user only

  return authedUser ? (
    <Menu secondary className="navMenu" icon="labeled">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to={"/"}
      >
        <Icon name="home" />
        home
      </Menu.Item>

      <Menu.Item
        name="new question"
        active={activeItem === "new question"}
        onClick={handleItemClick}
        as={Link}
        to={"/add"}
      >
        <Icon name="question circle outline" />
        new question
      </Menu.Item>

      <Menu.Item
        name="leaderboard"
        active={activeItem === "leaderboard"}
        onClick={handleItemClick}
        as={Link}
        to={"/leaderboard"}
      >
        <Icon name="star" />
        leaderboard
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="welcome">
          <div className="welcomeUser">
            <Header as="h4">Welcome</Header>
            <div>
              <Image src={authedUser.avatarURL.src} size="small" circular />

              <Header as="h3">{authedUser.name}</Header>
            </div>
          </div>
        </Menu.Item>

        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={logingout}
        >
          <Icon name="sign-out" />
          logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : null; /*  thanks but no menu for you ! */
 
};
