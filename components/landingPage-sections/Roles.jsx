import React from 'react'
import { SectionHeading, SectionLabel } from '../reusables'
import { ROLES } from '@/lib/data'

const Roles = () => {
    return (
        <section className='relative z-20 pb-28 max-w-5xl mx-auto px-6'>
            <div className='text-center mb-16'>
                <SectionLabel>Who it&apos;s for</SectionLabel>
                <SectionHeading gray="Built for both sides" purple="of the table" />
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
                {ROLES.map((role) => (
                    <div key={role.label} className='relative bg-[#0f0f11] border border-white/10 hover:border-purple-300/50 hover:scale-[1.02] rounded-2xl p-10 h-full transition duration-300 overflow-hidden'>
                        <span className='inline-block text-xs font-semibold text-purple-400 tracking-widest uppercase border border-purple-400/20 bg-purple-400/10 rounded-full px-3 py-2 mb-5'>
                            {role.label}
                        </span>

                        <h3 className="font-serif text-2xl tracking-tight mb-3">
                            {role.title}
                        </h3>

                        <p className="text-sm text-stone-400 leading-relaxed mb-6">
                            {role.desc}
                        </p>

                        <ul className="space-y-2.5 mb-8">
                            {role.perks.map((p) => (
                                <li key={p} className="flex gap-3 text-sm text-stone-400">
                                    <span className="mt-0.5 min-w-4 w-4 h-4 rounded-full bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-xs text-purple-400">
                                        ✓
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>

                        {role.label.toLowerCase().includes('interviewee') && (
                            <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.04] p-4">
                                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-violet-400/60 mb-3">
                                    Job & Internship Resources
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Browse Job Openings", "Internship Listings", "Resume Review", "Referral Network", "Off-Campus Drives", "Career Roadmaps"].map((item) => (
                                        <span key={item} className="text-xs px-2.5 py-1 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] text-violet-300/55">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {role.label.toLowerCase().includes('interviewer') && (
                            <div className="rounded-xl border border-violet-500/15 bg-violet-500/[0.04] p-4">
                                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-violet-400/60 mb-3">
                                    Post Opportunities
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Post Job Vacancies", "Refer Candidates", "Internship Openings", "Team Hiring", "Campus Recruitment", "Freelance Roles"].map((item) => (
                                        <span key={item} className="text-xs px-2.5 py-1 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] text-violet-300/55">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Roles