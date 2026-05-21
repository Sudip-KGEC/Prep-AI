import React from 'react'
import { StarsBackgroundDemo } from './demo-components-backgrounds-stars'
import { GrayTitle, PurpleTitle } from '../reusables'
import Link from 'next/link'
import { Button } from '../ui/button'
import { AVATARS } from '@/lib/data'
import Image from 'next/image'
import { CodeDemo } from './demo-components-animate-code'

const Hero = () => {
    return (
        <section className="relative min-h-screen pt-32 sm:pt-36 pb-16 px-4 sm:px-8 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
            <StarsBackgroundDemo />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[700px] rounded-full bg-violet-700/10 blur-[120px]" />
            </div>
            <div className="pointer-events-none absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-purple-600/6 blur-[80px]" />

            <div className="col-span-full lg:col-span-3 flex flex-col items-center justify-center text-center z-10">

                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-4 py-1.5 mb-5 backdrop-blur-sm">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-violet-300/80">
                        AI Mock Interviews · Jobs · Internships
                    </span>
                </div>

                <h1 className="font-serif relative text-4xl sm:text-5xl lg:text-[3.75rem] tracking-tight leading-[1.1] max-w-2xl">
                    <GrayTitle>Practice interviews.</GrayTitle>
                    <br />
                    <PurpleTitle>Land your dream role.</PurpleTitle>
                </h1>

                <p className="relative text-sm sm:text-base text-stone-400/80 max-w-lg mt-4 leading-[1.8] font-light">
                    Sharpen your skills with AI-powered mock interviews tailored for full-time jobs and internships. Get real feedback, role-specific questions, and expert guidance — from SDE roles to summer internships.
                </p>

                <div className="relative flex flex-wrap items-center justify-center gap-2 mt-6">
                    <Link href="/onboarding">
                        <Button
                            size="lg"
                            variant="purple"
                            className="rounded-full px-7 shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] transition-all duration-300 text-sm font-medium"
                        >
                            Start Practicing Free
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-7 border-violet-500/25 text-purple-200/70 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-purple-100 transition-all duration-300 text-sm font-light bg-transparent"
                        >
                            Browse Interviewers →
                        </Button>
                    </Link>
                </div>

                <div className="relative flex flex-wrap items-center justify-center gap-1.5 mt-4">
                    {["SDE Interviews", "System Design", "HR Rounds", "Internships", "FAANG Prep"].map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] tracking-wide text-violet-300/50 border border-violet-500/15 rounded-full px-3 py-1 bg-violet-500/[0.04]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="relative flex items-center justify-center gap-3 mt-6">
                    <div className="flex">
                        {AVATARS.map((ava, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full border-2 border-[#09090f] overflow-hidden ring-1 ring-violet-500/20 ${i > 0 ? "-ml-2" : ""}`}
                            >
                                <Image src={ava.src} alt="user avatar" width={32} height={32} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-stone-500">
                        <strong className="text-stone-300 font-medium">1,400+ candidates</strong>{" "}
                        landed jobs & internships via PrepHire
                    </p>
                </div>

                <div className="relative mt-6 flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-xl font-semibold text-white/90">500+</p>
                        <p className="text-[11px] text-stone-500 tracking-wide mt-0.5">Expert Interviewers</p>
                    </div>
                    <div className="h-7 w-px bg-violet-500/15" />
                    <div className="text-center">
                        <p className="text-xl font-semibold text-white/90">Jobs & Intern</p>
                        <p className="text-[11px] text-stone-500 tracking-wide mt-0.5">Both Tracks Covered</p>
                    </div>
                    <div className="h-7 w-px bg-violet-500/15" />
                    <div className="text-center">
                        <p className="text-xl font-semibold text-white/90">98%</p>
                        <p className="text-[11px] text-stone-500 tracking-wide mt-0.5">Satisfaction Rate</p>
                    </div>
                </div>
            </div>

            <div className="col-span-full lg:col-span-2 flex items-center justify-center lg:justify-start mt-10 lg:mt-0 z-10">
                <div className="relative">
                    <div className="absolute -inset-4 rounded-2xl bg-violet-600/8 blur-xl" />
                    <div className="relative rounded-xl border border-violet-500/15 bg-[#0d0d14]/80 backdrop-blur-sm shadow-[0_0_40px_rgba(100,60,240,0.1)] overflow-hidden">
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-violet-500/10 bg-violet-500/[0.03]">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                            <span className="ml-3 text-[11px] text-stone-600 tracking-wide">mock-interview.ts</span>
                        </div>
                        <div className="p-2">
                            <CodeDemo duration={30000} delay={500} writing={true} cursor={true} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero