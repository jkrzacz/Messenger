import { useDispatch } from "react-redux";
import { useState } from "react";
import { userActions } from "../../store/user-slice";
import classes from "./Login.module.css";
import axios from "axios";
import FacebookLogin from "@greatsumini/react-facebook-login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginHandler = (event) => {
    event.preventDefault();

    const form = new FormData();

    form.append("username", email);
    form.append("password", password);

    axios
      .post("http://localhost:8080/login", form, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(userActions.login(res.data));
      })
      .catch((err) => console.log(err));
  };

  const fbHandleLoginSuccess = (event) => {
    console.log(event);
  };

  const fbHandleProfileSuccess = (event) => {
    console.log(event);
  };

  return (
    <main className={classes.login}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
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
