"use client"

import { Property } from "@prisma/client"
// import { Property, PropertyType } from "@/utils/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Item = {
//   id: string
//   name: number
//   verified: boolean
//   email: string
// }

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
  },
]
