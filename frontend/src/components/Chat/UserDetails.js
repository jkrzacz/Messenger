import { useSelector } from "react-redux";

import classes from "./UserDetails.module.css";

const UserDetails = () => {
  const { id, username } = useSelector((state) => state.user);

  return (
    <main>
      <form className={classes["info-form"]}>
        <div>
          <label>Username</label>
          <input type="text" id="username" disabled value={username} />
        </div>
        <div>
          <label>ID</label>
          <input type="text" id="id" disabled value={id} />
        </div>
      </form>
    </main>
  );
};

export default UserDetails;
