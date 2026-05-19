'use client'


import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const INTERVIEWER_ONLY= ["/appointments"]
const INTERVIEWEE_ONLY=["/dashboard"]

const RoleRedirect = ( { role }) => {
const pathName = usePathname();
const router = useRouter()

useEffect(()=>{

    if(role === "UNASSIGNED" && pathName !== "/onboarding") router.replace("/onboarding")

    if(role === "INTERVIEWEE" && pathName.startsWith("/onboarding") ) router.replace("/explore")

    if(role === "INTERVIEWER" && pathName.startsWith("/onboarding")) router.replace("/dashboard")

   if(role === "INTERVIEWER"  && 
      INTERVIEWER_ONLY.some((path) => pathName.startsWith(path))
   ) 
   router.replace("/dashboard")


   if(role === "INTERVIEWEE"  && 
      INTERVIEWEE_ONLY.some((path) => pathName.startsWith(path))
   ) 
   router.replace("/appointments")


}, [role , pathName , router])

  return null
}

export default RoleRedirect