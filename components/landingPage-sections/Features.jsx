import React from 'react'
import { GrayTitle, MockUI, PurpleTitle, SectionHeading, SectionLabel } from '../reusables'
import BentoCard from './BentoCard'
import { Bot, Briefcase, GraduationCap, Wallet } from 'lucide-react'
import { Badge } from '../ui/badge'
import { AI_TAGS, SLOTS } from '@/lib/data'

const Features = () => {
  return (
    <section className='relative z-10 py-20 max-w-5xl mx-auto px-6'>
      <div className='text-center mb-12'>
        <SectionLabel>Features</SectionLabel>
        <SectionHeading gray="Everything you need" purple="nothing you don't" />
      </div>

      <div className='grid grid-cols-12 gap-3'>

        <div className='col-span-12 md:col-span-7'>
          <BentoCard
            icon={<Bot size={20} className='text-purple-400' />}
            title={<GrayTitle>AI Question Generator</GrayTitle>}
            desc="Interviewers get a live AI co-pilot generating role-specific questions on demand — system design, behavioural, DSA — all tailored to the candidate's level."
          >
            <div className="flex flex-wrap gap-1.5 mt-4">
              {AI_TAGS.map((t) => (
                <Badge key={t.label} variant={t.active ? "purple" : "outline"}>
                  {t.label}
                </Badge>
              ))}
            </div>
          </BentoCard>
        </div>

        <div className="col-span-12 md:col-span-5">
          <BentoCard
            icon={<Wallet size={16} className="text-purple-400" />}
            title={<GrayTitle>Credit System</GrayTitle>}
            desc="Subscribe for monthly credits. Book sessions. Interviewers earn and withdraw any time."
          >
            <div className="mt-4 rounded-xl bg-[#141417] border border-violet-500/10 p-4 flex justify-between items-end">
              <div>
                <p className="text-xs text-stone-600 mb-1">Your balance</p>
                <p className="font-serif text-4xl leading-none bg-linear-to-br from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  28
                </p>
                <p className="text-xs text-stone-600 mt-1">credits remaining</p>
              </div>
              <Badge variant="secondary">+10 this month</Badge>
            </div>
          </BentoCard>
        </div>

        <div className="col-span-12 md:col-span-4">
          <BentoCard
            icon="📹"
            title="HD Video Calls"
            desc="Powered by Stream. Screen sharing, recording, and instant playback links — all built in."
          >
            <MockUI rows={3} />
          </BentoCard>
        </div>

        <div className="col-span-12 md:col-span-4">
          <BentoCard
            icon="💬"
            title="Persistent Chat"
            desc="Message your interviewer before and after the call. Share resources, prep notes, and follow-ups in one thread."
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <BentoCard
            icon="🔒"
            title="Security by Arcjet"
            desc="Bot protection, rate limiting, and abuse prevention baked into every API route."
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <BentoCard
            icon="📊"
            title={<GrayTitle>AI Feedback Reports</GrayTitle>}
            desc="Post-interview analysis by Gemini with actionable insights."
          >
            <MockUI rows={5} />
          </BentoCard>
        </div>

        <div className="col-span-12 md:col-span-6">
          <BentoCard
            icon="🗓️"
            title={<PurpleTitle>Slot-based Scheduling</PurpleTitle>}
            desc="Interviewers set availability once. Interviewees pick from open slots and confirm with one click — no back-and-forth needed."
          >
            <div className="flex flex-wrap gap-1.5 mt-4">
              {SLOTS.map((s) => (
                <span
                  key={s.label}
                  className={`text-xs px-3 py-1.5 rounded-lg border ${s.cls}`}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </BentoCard>
        </div>

        <div className="col-span-12 md:col-span-5">
          <BentoCard
            icon={<Briefcase size={18} className="text-purple-400" />}
            title={<GrayTitle>Full-time Job Prep</GrayTitle>}
            desc="Practice for SDE, Product, Data, and Design roles at top companies. Role-specific question banks, resume tips, and mock rounds tailored to full-time hiring cycles."
          >
            <div className="flex flex-wrap gap-1.5 mt-4">
              {["SDE I / II", "Product Manager", "Data Analyst", "System Design", "FAANG", "Startups"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>
        </div>

        <div className="col-span-12 md:col-span-7">
          <BentoCard
            icon={<GraduationCap size={18} className="text-purple-400" />}
            title={<PurpleTitle>Internship Track</PurpleTitle>}
            desc="Built for students and fresh grads. Practice intern-specific rounds — OA, HR, and technical — with mentors who've cracked top summer internship programs."
          >
            <div className="flex flex-wrap gap-1.5 mt-4">
              {["Summer Internship", "Off-Campus", "On-Campus", "OA Prep", "HR Round", "Resume Review"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-300/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>
        </div>

      </div>
    </section>
  )
}

export default Features