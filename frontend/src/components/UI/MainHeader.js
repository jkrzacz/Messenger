import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);

  return (
    <header className={classes.header}>
      <nav>
        {!isLoggedIn && (
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        )}

        {isLoggedIn && (
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/chat">
                Chats
              </NavLink>
            </li>

            {username && (
              <li>
                <NavLink activeClassName={classes.active} to="/user-info">
                  User: {username}
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                activeClassName={classes.active}
                onClick={() => dispatch(userActions.logout())}
                to="/login"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
