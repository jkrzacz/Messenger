const User = (props) => {
  return (
    <li>
      <div>
        {props.name} [{props.id}]
      </div>
    </li>
  );
};

export default User;
