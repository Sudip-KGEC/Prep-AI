import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { GrayTitle, PurpleTitle } from '../reusables'
import { StarsBackgroundDemo } from './demo-components-backgrounds-stars'
import { GravityStarsBackgroundDemo } from './demo-components-backgrounds-gravity-stars'

const Cta = () => {
  return (
     <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="relative border border-purple-400/40 rounded-3xl px-3 sm:px-16 py-20 bg-linear-to-br from-purple-400/10 text-center overflow-hidden">
          <GravityStarsBackgroundDemo/>

          <h2 className="font-serif relative text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            <GrayTitle>Your next interview</GrayTitle>
            <br />
            <PurpleTitle>starts here</PurpleTitle>
          </h2>

          <p className="relative text-stone-400 font-light text-sm mb-11">
            Join thousands of engineers already levelling up on Prept.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/onboarding" className="relative">
              <Button variant="purple" size="lg">
                Get started
              </Button>
            </Link>

            <Link href="/explore" className="relative">
              <Button variant="outline" size="lg">
                Browse Interviewers →
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default Cta