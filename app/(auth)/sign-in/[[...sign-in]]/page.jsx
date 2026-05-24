import { SignIn } from '@clerk/nextjs'
import React from 'react'

export const metadata = {
  title: "sign-in"
};

export default function page  () {
  return (
     <SignIn/>
  )
}
