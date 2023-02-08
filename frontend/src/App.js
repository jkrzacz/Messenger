import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "./components/UI/MainHeader";
import ChatPage from "./components/Chat/ChatPage";
import UserDetails from "./components/Chat/UserDetails";
import ChatDetails from "./components/Chat/ChatDetails";
import { useEffect } from "react";
import axios from "axios";
import { userActions } from "./store/user-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch(userActions.setUserInfo(res.data));
        }
      });
  }, [token, isLoggedIn, dispatch]);

  return (
    <>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <Redirect to="/chat" />}
          </Route>
          <Route path="/login">
            {!isLoggedIn && <Login />}
            {isLoggedIn && <Redirect to="/chat" />}
          </Route>
          <Route path="/register">
            {!isLoggedIn && <Register />}
            {isLoggedIn && <Redirect to="/chat" />}
          </Route>
          <Route path="/chat" exact>
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <ChatPage />}
          </Route>
          <Route path="/user-info">
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <UserDetails />}
          </Route>
          <Route path="/chat/:id">
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <ChatDetails />}
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
