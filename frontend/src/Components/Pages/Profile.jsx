import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, []);

  if (!user) return <p>Not logged in</p>;

  return (
    <div>
      <h1>User Profile</h1>

      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Address: {user.address}</p>
    </div>
  );
}

export default Profile;
