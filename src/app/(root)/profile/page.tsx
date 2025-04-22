'use client'

import { getUserByClerkId } from '@/lib/db/user'
import { currentUser } from '@clerk/nextjs/server'
import { redirect, useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';

const ProfilePage = () => {
  const router = useRouter()
  const {isLoaded,user} = useUser()
  if(!user) router.push('/sign-in')
//   const dbUser = await getUserByClerkId(user.id)
// if(!dbUser) return <p>You are unauthorize to see this page login please!</p>

useEffect(()=>{
  
},[isLoaded,user])
  return (
    <div>
      {/* <p>Welcome, {dbUser.name}</p>
      <p>{dbUser.email}</p> */}
 
<CldUploadWidget uploadPreset="hellow-broker">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
    </div>
  )
}

export default ProfilePage