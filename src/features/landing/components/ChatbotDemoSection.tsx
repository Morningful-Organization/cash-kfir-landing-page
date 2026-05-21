import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Bot, MessageSquare, Zap } from 'lucide-react';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';

const VIDEO_READY = true;
const VIDEO_SRC = '/videos/MorningfulVideovChatBotV2.mp4';

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
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Ambient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[40%] h-[60%] bg-[#00d4ff]/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[#0099cc]/8 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00d4ff]/10 to-[#0099cc]/10 border border-[#00d4ff]/20 rounded-full text-sm font-semibold text-[#0099cc] mb-6">
            <Bot className="w-4 h-4 mr-2" />
            Meet your AI finance assistant
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1a2332] mb-6 leading-tight">
            Just ask.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
              Morningful answers.
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Skip the spreadsheets. Our built-in AI chatbot turns your live bank
            data into clear, actionable answers, in the time it takes to type a
            question.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Video / placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 relative group"
          >
            {/* Glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff]/40 via-[#0099cc]/40 to-[#00d4ff]/40 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-[#0f1419] shadow-2xl">
              {/* Chat window chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a2332] border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex items-center text-xs text-gray-300 font-medium">
                  <Bot className="w-3.5 h-3.5 mr-1.5 text-[#00d4ff]" />
                  Morningful AI Assistant
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>

              {VIDEO_READY ? (
                <>
                  <video
                    ref={videoRef}
                    className="block w-full h-auto bg-[#0f1419]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Morningful chatbot demo"
                  >
                    <source src={VIDEO_SRC} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>

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
                </>
              ) : (
                // Pre-video placeholder: a fake conversation that previews what the demo will show
                <div className="aspect-video bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] p-6 lg:p-8 flex flex-col justify-end space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-[#0f1419] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm font-medium shadow-lg">
                      What was my biggest expense this week?
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="max-w-[75%] bg-white/10 backdrop-blur text-white rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm border border-white/10">
                      Your largest expense this week was{' '}
                      <span className="text-[#00d4ff] font-semibold">
                        $1,240 to AWS
                      </span>{' '}
                      on Tuesday, 38% above your weekly cloud spend average.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-bounce" />
                        <span
                          className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-bounce"
                          style={{ animationDelay: '0.15s' }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-bounce"
                          style={{ animationDelay: '0.3s' }}
                        />
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 pt-2">
                      Morningful is typing…
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400/20 border border-yellow-400/40 rounded-full text-xs text-yellow-300 font-semibold">
                    Demo video coming soon
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {CHAT_HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                className="flex items-start p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#00d4ff]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0099cc] p-3 mr-4 shadow-md">
                  <item.icon className="w-full h-full text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a2332] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotDemoSection;
