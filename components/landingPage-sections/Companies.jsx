import { LOGOS } from '@/lib/data'
import Image from 'next/image'
import React from 'react'
import { SectionLabel } from '../reusables'

export default function Companies () {
  return (
    <section className='relative z-10 border-y border-violet-500/10 py-10 flex flex-col justify-center items-center mb-7'>
      <SectionLabel>Interviewees landed roles at</SectionLabel>
      <div className='flex flex-wrap items-center justify-center gap-10 px-6'>
        {LOGOS.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={80}
            height={80}
            className='h-6 w-auto opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300'
          />
        ))}
      </div>
    </section>
  )
}

