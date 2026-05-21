import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { checkUser } from '@/lib/checkUser'
import { CalendarDays, Users } from 'lucide-react'
import CreditsButton from './CreditsButton'
import RoleRedirect from './RoleRedirect'

const Header = async () => {

  const user = await checkUser();

  return (
    <nav className='fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-10 py-2 border-b border-purple-500/10 bg-[#09090f]/10 backdrop-blur-xl'>

      <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="PrepHire Logo"
          width={160}
          height={44}
          loading="eager"
          priority
          className="h-16 w-40 object-contain drop-shadow-[0_0_8px_rgba(130,80,255,0.3)]"
        />
      </Link>

      {user && <RoleRedirect role={user.role} />}

      <div className='flex items-center gap-2'>
        <Show when="signed-out">
          <SignInButton>
            <Button
              variant="ghost"
              className="text-purple-200/60 hover:text-purple-100 hover:bg-purple-500/10 transition-colors"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-full transition-all duration-200 shadow-[0_0_16px_rgba(139,92,246,0.3)] hover:shadow-[0_0_22px_rgba(139,92,246,0.5)]"
            >
              Get Started →
            </Button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          {user?.role === "INTERVIEWER" && (
            <Button
              variant="ghost"
              asChild
              className="text-purple-200/60 hover:text-purple-100 hover:bg-purple-500/10"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}

          {user?.role === "INTERVIEWEE" && (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-purple-200/60 hover:text-purple-100 hover:bg-purple-500/10 gap-1.5"
              >
                <Link href="/explore">
                  <Users size={15} />
                  <span className="hidden md:inline">Explore</span>
                </Link>
              </Button>
              <Button
                asChild
                className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-4 gap-1.5 shadow-[0_0_14px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-all duration-200"
              >
                <Link href="/appointments">
                  <CalendarDays size={15} />
                  <span className="hidden md:inline">My Appointments</span>
                </Link>
              </Button>
            </>
          )}

          <CreditsButton
            role={user?.role === "INTERVIEWER" ? "INTERVIEWER" : "INTERVIEWEE"}
            credits={
              (user?.role === "INTERVIEWER"
                ? user?.creditBalance
                : user?.credits) ?? 0
            }
          />
          <UserButton />
        </Show>
      </div>
    </nav>
  )
}

export default Header