import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Sparkles, Bell, LayoutDashboard, Bot, RefreshCw } from 'lucide-react';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';

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

  return (
    <section
      ref={ref}
      id="demo"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#00d4ff]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-sm text-[#00d4ff] font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            See it in action
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              From bank chaos to
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] bg-clip-text text-transparent">
              clear decisions in seconds
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Watch how Morningful syncs every account, surfaces AI insights, and
            tells your finance team exactly what to do next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* Glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff]/40 via-[#0099cc]/40 to-[#00d4ff]/40 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

          {/* Video frame */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0f1419] shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a2332] border-b border-white/5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="hidden sm:flex items-center px-4 py-1 bg-white/5 rounded-md text-xs text-gray-400 font-mono">
                app.morningful.ai
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>

            <video
              ref={videoRef}
              className="block w-full h-auto bg-[#0f1419]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
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
              className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#00d4ff] hover:text-[#1a2332] hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Caption strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-12 lg:mt-16"
        >
          {[
            { icon: LayoutDashboard, label: 'Unified dashboard' },
            { icon: Bot, label: 'Daily AI insights' },
            { icon: Bell, label: 'Smart alerts' },
            { icon: RefreshCw, label: 'Auto bank sync' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-gray-200 hover:border-[#00d4ff]/40 hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-4 h-4 mr-2 text-[#00d4ff]" />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
