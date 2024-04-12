import dbConnect from "../lib/dbConnect";
import User from "../models/User";

async function getUsers() {
  await dbConnect();
  const users = await User.find({});
  return users;
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      {users.map((user: any) => (
        <div key={user._id}>
          <h2>{user.username}</h2>
          <p>{user.userId}</p>
        </div>
      ))}
    </div>
  );
}
