"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data: any) => setUsers(data));
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEPATH}/api/users`);
    const users = await res.json();
    return users;
  };

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
