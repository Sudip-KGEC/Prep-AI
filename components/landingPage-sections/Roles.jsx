import React from 'react'
import { SectionHeading, SectionLabel } from '../reusables'
import { ROLES } from '@/lib/data'
import { div } from 'motion/react-client'

const Roles = () => {
    return (
        <section className='relative z-20 pb-28 max-w-5xl mx-auto px-6'>
            <div className='text-center mb-16'>
                <SectionLabel>Who it&apos;s for</SectionLabel>
                <SectionHeading gray="Built for both sides" purple="of the table" />
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
                {ROLES.map((role) => {
                    return (
                        <div key={role.label} className='relative bg-[#0f0f11] border border-white/10 hover:border-purple-300/50 hover:scale-102 rounded-2xl p-12 h-full transition duration-300 overflow-hidden'>
                            <span className='inline-block text-xs font-semibold text-purple-400 tracking-widest uppercase border border-purple-400/20 bg-purple-400/10 rounded-full px-3 py-2 mb-5'>
                                {role.label}
                            </span>

                            <h3 className="font-serif text-2xl tracking-tight mb-4">
                                {role.title}
                            </h3>

                            <p className="text-sm text-stone-400 leading-relaxed mb-8">
                                {role.desc}
                            </p>

                            <ul className="space-y-3">
                                {role.perks.map((p) => (
                                    <li key={p} className="flex gap-3 text-sm text-stone-400">
                                        <span className="mt-0.5 min-w-4 w-4 h-4 rounded-full bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-xs text-purple-400">
                                            ✓
                                        </span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}

export default Roles