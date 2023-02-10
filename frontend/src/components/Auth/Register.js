import { useState } from "react";
import classes from "./Register.module.css";
import DataService from "../API/DataService";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registrationHandler = (event) => {
    event.preventDefault();

    DataService.register(username, password)
      .then((res) => {
        alert("Registered user: " + res.data.name);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className={classes.auth}>
        <section>
          <form onSubmit={registrationHandler}>
            <div className={classes.control}>
              <label htmlFor="username">Username</label>
              <input
                type="username"
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
            <button className={classes.button}>Create User</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Auth;
