import { Navigate,useLocation } from "react-router";
import { useSelector } from "react-redux";

// LoggingRoute is my privateRoute to check if user is logged in before showing the component

export function LoggingRoute({ children }) {
  const authedUser = useSelector((state) => state.authUser);

  let location = useLocation();

  if (authedUser.length < 1) {
    // Redirect them to the /login page, but save the current location

    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
