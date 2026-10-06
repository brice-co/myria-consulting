"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Code2,
  Play,
  X,
  Sparkles,
  Clock,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const videoGallery = [
  {
    title: "AI Planner Agent",
    description: "See how an AI agent can autonomously plan and execute complex tasks with tool integrations",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1725985758385-d5462d6e7f50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8",
    duration: "1:44",
    youtubeId: "J8tQcQvkIC4",
  },
  {
    title: "Customer Support Flow",
    description: "Watch real-time issue resolution with tool integrations",
    thumbnail:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop",
    duration: "1:21",
    youtubeId: "u3VnQ2OlTz0",
  },
  {
    title: "Kanban Marketing Product Launch",
    description: "A collaborative, real-time project management dashboard that combines a visual Kanban workflow with a synchronized calendar view",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1684179641331-e89c6320b6a9?q=80&w=484&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "1:50",
    youtubeId: "QhXKPn6roKc",
  },
  
];

export default function VideoGallerySection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#05050a] px-6 py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            See It In Action
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            Voice Agent{" "}
            <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/55">
            Explore real AI voice agent demos across emergency response,
            support, marketing, multimodal workflows, and multi-agent systems.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videoGallery.map((video, index) => (
            <motion.button
              key={video.title}
              type="button"
              onClick={() => setActiveVideo(index)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.07]">
                <div className="relative overflow-hidden rounded-[1.4rem]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="aspect-video w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur-xl">
                    <Video className="h-3.5 w-3.5 text-cyan-300" />
                    Demo
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/80 backdrop-blur-xl">
                    <Clock className="h-3.5 w-3.5 text-cyan-300" />
                    {video.duration}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl shadow-cyan-500/30 backdrop-blur-xl transition duration-500 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-cyan-500">
                      <Play className="ml-1 h-7 w-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-200">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    {video.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <Link
            href="/experience/interactive-workspace"
            className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 font-medium text-white shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
          >
            <Code2 className="h-5 w-5 text-cyan-300" />
            Explore Interactive Workspace
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#05050a] shadow-2xl shadow-cyan-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-xl transition hover:bg-white/10"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoGallery[activeVideo].youtubeId}?autoplay=1&rel=0`}
                  title={videoGallery[activeVideo].title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}