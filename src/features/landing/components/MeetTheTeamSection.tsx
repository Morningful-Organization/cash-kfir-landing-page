import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';

const team = [
  {
    name: 'Nir Goldberg',
    role: 'CEO & Co-founder',
    photo: '/images/team/nir.jpg',
    linkedin: 'https://il.linkedin.com/in/nir-goldberg-49521315',
  },
  {
    name: 'Sylvan Grunwald',
    role: 'CTO',
    photo: '/images/team/sylvan.jpg',
    linkedin: 'https://www.linkedin.com/in/sylvan-grunwald-24a57b3/',
  },
  {
    name: 'Binny Lewis',
    role: 'CFO',
    photo: '/images/team/binny.jpg',
    linkedin: 'https://www.linkedin.com/in/binnylewis/',
  },
];

const MeetTheTeamSection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const { trackNavigation } = useAnalytics();

  return (
    <section
      ref={ref}
      id="meet-the-team"
      className="bg-surface-muted py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            align="center"
            eyebrow="Meet the team"
            title="The people behind Morningful"
            description="A finance and engineering team building the treasury platform we always wanted to use."
          />
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-lg"
            >
              <div className="aspect-[4/5] overflow-hidden bg-surface-muted">
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.role} at Morningful`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-ink-soft">{member.role}</p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackNavigation(`Team LinkedIn - ${member.name}`)}
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border text-ink-soft transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;
