import { useState } from "react";
import classes from "./Register.module.css";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrationHandler = (event) => {
    event.preventDefault();

    const data = JSON.stringify({ email, password });

    axios
      .post("http://localhost:8080/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Zarejestrowano użytkownika " + res.data.email);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className={classes.auth}>
        <section>
          <form onSubmit={registrationHandler}>
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
            <button className={classes.button}>Create User</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Auth;
