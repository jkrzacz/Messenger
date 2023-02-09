import { useDispatch } from "react-redux";
import { useState } from "react";
import { userActions } from "../../store/user-slice";
import classes from "./Login.module.css";
import axios from "axios";
import FacebookLogin from "@greatsumini/react-facebook-login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fbToken, setFbToken] = useState("");
  const [fbName, setFbName] = useState("");

  const dispatch = useDispatch();
  const loginHandler = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/login", null, {
        headers: {
          accept: "application/json",
        },
        params: {
          username,
          password,
        },
      })
      .then((res) => {
        dispatch(userActions.login(res.data));
      });
  };

  const fbHandleLoginSuccess = (event) => {
    setFbToken(event.accessToken);
  };

  const fbHandleProfileSuccess = (event) => {
    setFbName(event.name);
  };

  if (fbName && fbToken) {
    axios
      .post("http://localhost:8080/login", null, {
        headers: {
          accept: "application/json",
        },
        params: {
          username: fbName,
          fb_token: fbToken,
        },
      })
      .then((res) => {
        dispatch(userActions.login(res.data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className={classes.login}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes["login-buttons"]}>
            <button>Login</button>
            <FacebookLogin
              appId="1381945592618615"
              onSuccess={fbHandleLoginSuccess}
              onFail={(error) => {
                alert("Login Failed!", error);
              }}
              onProfileSuccess={fbHandleProfileSuccess}
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
