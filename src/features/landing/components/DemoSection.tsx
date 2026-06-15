import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Check } from 'lucide-react';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import { APP_CONFIG } from '../../../shared/config/environment';

const features = [
  'Unified dashboard',
  'Daily AI insights',
  'Smart alerts',
  'Auto bank sync',
];

const DemoSection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && !hasInteracted) {
      video.play().catch(() => {
        // Autoplay blocked; will start on first user interaction.
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

  // Display the app host without the protocol for the browser-chrome label.
  const appHost = APP_CONFIG.APP_URL.replace(/^https?:\/\//, '');

  return (
    <section ref={ref} id="demo" className="bg-surface-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            align="center"
            eyebrow="See it in action"
            title="Watch Morningful run the morning treasury review"
            description="Every account syncs into one live view, surfaces the insights that matter, and tells your finance team exactly what to do next."
            className="mb-12 lg:mb-16"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card-lg">
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-border" />
                <span className="h-3 w-3 rounded-full bg-border" />
                <span className="h-3 w-3 rounded-full bg-border" />
              </div>
              <div className="hidden items-center rounded-md bg-surface-muted px-4 py-1 font-mono text-xs text-ink-soft sm:flex">
                {appHost}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
                  Live
                </span>
              </div>
            </div>

            <div className="group relative">
              <video
                ref={videoRef}
                className="block h-auto w-full bg-surface"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/videos/MorningfulVideov2-poster.jpg"
                aria-label="Morningful dashboard demo"
              >
                <source src="/videos/MorningfulVideov2.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>

              {/* Play/Pause overlay */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
                className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink/80 text-white opacity-0 shadow-card transition-all duration-200 hover:bg-brand group-hover:opacity-100"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {features.map(label => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm font-medium text-ink"
            >
              <Check className="h-4 w-4 flex-none text-brand" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
