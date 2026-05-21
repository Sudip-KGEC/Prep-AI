import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { GrayTitle, PurpleTitle } from '../reusables'
import { GravityStarsBackgroundDemo } from './demo-components-backgrounds-gravity-stars'

const Cta = () => {
  return (
    <section className="relative z-10 pb-20 max-w-5xl mx-auto px-6">
      <div className="relative border border-violet-500/20 rounded-3xl px-6 sm:px-16 py-16 bg-gradient-to-br from-violet-500/8 to-transparent text-center overflow-hidden">
        <GravityStarsBackgroundDemo />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-96 rounded-full bg-violet-700/10 blur-[80px]" />
        </div>

        <h2 className="font-serif relative text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          <GrayTitle>Your next interview</GrayTitle>
          <br />
          <PurpleTitle>starts here</PurpleTitle>
        </h2>

        <p className="relative text-stone-500 font-light text-sm mb-8">
          Join thousands of engineers already levelling up on PrepHire.
        </p>

        <div className="relative flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/onboarding">
            <Button
              variant="purple"
              size="lg"
              className="rounded-full px-8 shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] transition-all duration-300"
            >
              Get Started Free
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-violet-500/25 text-purple-200/70 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-purple-100 transition-all duration-300 bg-transparent"
            >
              Browse Interviewers →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cta