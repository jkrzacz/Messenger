import { useSelector } from "react-redux";

const UserDetails = () => {
  const { id, username } = useSelector((state) => state.user);

  return (
    <main>
      {username && <div>{username}</div>}
      {id && <div>{id}</div>}
    </main>
  );
};

export default UserDetails;
