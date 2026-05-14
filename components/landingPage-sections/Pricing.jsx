import React from 'react'
import { SectionHeading, SectionLabel } from '../reusables'
import PricingSection from './PricingSection'

const Pricing = () => {
  return (
    <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading
            gray="Simple, transparent"
            purple="credit-based plans"
          />
          <p className="text-stone-400 mt-3 text-sm">
            Each credit = one session. Unused credits roll over.
          </p>
        </div>

        <PricingSection />
      </section>
  )
}

export default Pricing