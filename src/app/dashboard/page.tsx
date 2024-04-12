import { auth, currentUser } from '@clerk/nextjs'
import React from 'react'

export default async function DashboardPage() {
  const userInfo = auth();
  const user = await currentUser();
  console.log({userInfo});
  console.log({user});
  return (
    <div>Dashboard Page</div>
  )
}
