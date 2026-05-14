import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
    return (
        <nav className='fixed top-0 inset-x-0 z-50 flex items-center justify-between px-2 md:px-10 py-3 border-b border-white/7 backdrop-blur-xl'>
          {/* LOGO */}
            <Link href={"/"}>
               <Image  src='/logo.png' alt="Prep-AI-Logo" width={140} height={140} className='h-10 w-30 object-cover' />
            </Link>


            {/* Redirection logic */}

          {/* Sign In */}
          <div className='flex items-center gap-3'>
                <Show when="signed-out">

                    {/* Links  */}


                  {/* Credits */}

                <SignInButton >
                    <Button variant="ghost">
                        Sign In
                    </Button>
                </SignInButton>
              <SignUpButton  >
                <Button variant='purple' size='sm'>Get Started →</Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>
    )
}

export default Header