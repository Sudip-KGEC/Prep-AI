import { SignUp } from '@clerk/nextjs'
import React from 'react'

export const metadata = {
  title: "sign-up"
};

export default  function page() {
  return (
    <SignUp/>
  )
}

