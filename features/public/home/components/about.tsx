'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Camera, AlertTriangle, Trash2, TrafficCone } from 'lucide-react';
import HeaderWrapper from './header-wrapper';

export default function About() {
  return (
    <HeaderWrapper>
      <section className="px-8 py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Powered by People, Built for Communities
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
          CivicFind enables citizens to report and share real-world local mishappenings like
          accidents, cleanliness issues, and public safety concerns — helping communities stay
          informed and act faster.
        </p>
      </section>

      {/* Topics */}
      <section className="px-8 pb-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <TopicCard
          icon={<Trash2 className="h-6 w-6" />}
          title="Cleanliness Issues"
          description="Highlight garbage accumulation, drainage problems, or unhygienic public spaces so the right action can be taken quickly."
          image="/images/background/cleanliness.webp"
        />
        <TopicCard
          icon={<AlertTriangle className="h-6 w-6" />}
          title="Road Accidents"
          description="Report traffic accidents in real time to alert nearby citizens and authorities, helping reduce delays and prevent further incidents."
          image="/images/background/power-issue.webp"
        />
        <TopicCard
          icon={<TrafficCone className="h-6 w-6" />}
          title="Road & Infrastructure Issues"
          description="Report potholes, broken streetlights, or unsafe roads to improve everyday commuting and public safety."
          image="/images/background/road-infrastructure.jpg"
        />

        <TopicCard
          icon={<Camera className="h-6 w-6" />}
          title="Local Incidents"
          description="Share updates about fires, water leaks, or other unexpected local events directly from the people who witness them."
          image="/images/background/social-welfare-issue.webp"
        />
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-zinc-950 px-8 py-20 text-center">
        <h2 className="text-3xl font-bold">Your Voice Can Make a Difference</h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Upload photos, share locations, and help your community respond to issues faster and more
          effectively.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg">Start Contributing</Button>
        </div>
      </section>
    </HeaderWrapper>
  );
}

function TopicCard({
  icon,
  title,
  description,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition bg-white dark:bg-zinc-950">
      <div className="relative h-56 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-primary">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
