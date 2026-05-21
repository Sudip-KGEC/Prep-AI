import { LOGOS } from '@/lib/data'
import Image from 'next/image'
import React from 'react'

const Companies = () => {
  return (
    <section className='relative z-10 border-y border-violet-500/10 py-10'>
      <p className='text-center text-[11px] font-medium text-stone-600 tracking-[0.22em] uppercase mb-7'>
        Interviewees landed roles at
      </p>
      <div className='flex flex-wrap items-center justify-center gap-10 px-6'>
        {LOGOS.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={50}
            height={50}
            className='h-5 w-auto opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300'
          />
        ))}
      </div>
    </section>
  )
}

export default Companies