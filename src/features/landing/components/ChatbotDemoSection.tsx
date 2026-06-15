import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Bot, MessageSquare, Zap } from 'lucide-react';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';

const VIDEO_READY = true;
const VIDEO_SRC_MP4 = '/videos/MorningfulVideovChatBotV2.mp4';
const VIDEO_POSTER = '/videos/MorningfulVideovChatBotV2-poster.jpg';

const CHAT_HIGHLIGHTS = [
  {
    icon: MessageSquare,
    title: 'Ask in plain English',
    description:
      '"What was my biggest expense this week?" or "How long is my runway?", the AI answers from your live data.',
  },
  {
    icon: Zap,
    title: 'Instant, contextual answers',
    description:
      'No dashboards to dig through. The assistant reads your bank activity and replies in seconds.',
  },
  {
    icon: Bot,
    title: 'Acts like a junior analyst',
    description:
      'Summaries, forecasts, anomaly checks, and follow-up suggestions, all on demand.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
};

const ChatbotDemoSection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !VIDEO_READY) return;

    if (isInView && !hasInteracted) {
      video.play().catch(() => {
        // Autoplay blocked; will start on first interaction.
      });
    }
  }, [isInView, hasInteracted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={ref}
      id="chatbot-demo"
      className="bg-surface-muted py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="AI finance assistant"
            title={
              <>
                Just ask. <span className="text-brand">Morningful answers.</span>
              </>
            }
            description="Skip the spreadsheets. The built-in assistant turns your live bank data into clear, actionable answers in the time it takes to type a question."
            align="left"
          />
        </motion.div>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-5 lg:gap-14">
          {/* Demo video */}
          <motion.div
            {...fadeUp}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              {/* Window header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-xs font-medium uppercase tracking-eyebrow text-ink-soft">
                    Morningful AI Assistant
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>

              {VIDEO_READY ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="block h-auto w-full bg-surface"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={VIDEO_POSTER}
                    aria-label="Morningful chatbot demo"
                  >
                    <source src={VIDEO_SRC_MP4} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>

                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink opacity-0 shadow-card transition-all duration-200 hover:bg-brand hover:text-white group-hover:opacity-100"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5" />
                    )}
                  </button>
                </div>
              ) : (
                // Pre-video placeholder: a faked conversation previewing the demo
                <div className="flex aspect-video flex-col justify-end gap-4 bg-surface p-6 lg:p-8">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-surface-muted px-4 py-2.5 text-sm font-medium text-ink">
                      What was my biggest expense this week?
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                      <Bot className="h-4 w-4" />
                    </span>
                    <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-border bg-brand/5 px-4 py-2.5 text-sm text-ink">
                      Your largest expense this week was{' '}
                      <span className="font-semibold text-brand-secondary tabular-figures">
                        $1,240 to AWS
                      </span>{' '}
                      on Tuesday, 38% above your weekly cloud spend average.
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                      <Bot className="h-4 w-4" />
                    </span>
                    <span className="text-xs text-ink-soft">
                      Morningful is typing…
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            {...fadeUp}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 lg:col-span-2"
          >
            {CHAT_HIGHLIGHTS.map(item => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card transition-colors duration-200 hover:border-brand/40"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotDemoSection;
