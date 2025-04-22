import { getApprovedProperties, getUnapprovedProperties } from '@/lib/db/approval'
import { getUserByClerkId } from '@/lib/db/user'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const MyProperties = async() => {
    const user = await currentUser()
    if(!user) return redirect('/sign-in')

    const dbUser = await getUserByClerkId(user.id)

   if(!dbUser) return <p>Unauthorized! cant access!</p>

   const approveProperties = await getApprovedProperties(dbUser.id)
   const unApproveProperties = await getUnapprovedProperties(dbUser.id)
   console.log(unApproveProperties)

  return (
    <div>
        <p>All your Properties</p>
        <p>Approved</p>
        <div className="">{approveProperties.map((item,i)=>(
            <p key={i}>{item.title}</p>
        ))}</div>
        <p>Unapproved</p>
        <div className="">{unApproveProperties.map((item,i)=>(
            <div className="">
            <p key={i}>{item.title}</p>
            <div className="">
{item.media.map((data,i)=>(
    <img key={i} src={data.url}/>
))}
            </div>
            </div>
        ))}</div>
    </div>
  )
}

export default MyProperties