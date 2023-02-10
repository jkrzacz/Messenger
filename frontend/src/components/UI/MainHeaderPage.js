import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import classes from "./MainHeaderPage.module.css";

const MainHeader = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);

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
                  Info
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
            {isAdmin && (
              <li>
                <NavLink activeClassName={classes.active} to="/admin-panel">
                  ADMIN PANEL
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
