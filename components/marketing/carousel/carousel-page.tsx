import Carousel from "@/components/marketing/carousel/Carousel";


// src/app/page.tsx or data provider
const LIVEBLOCKS_FEATURES = [
  {
    tag: "Annotations",
    title: "Annotations like Google Docs",
    description: "Build threads, mentions, and anchored notifications directly tied to individual components or document nodes effortlessly.",
    src: "/carousel/ai-writer.png", // public/feature-annotations.jpg
    alt: "Google Docs styling comments"
  },
  {
    tag: "Multiplayer",
    title: "Multiplayer like Figma",
    description: "Keep application data completely in sync as people and AI agents work together with embedded automatic CRDT conflict resolution.",
    src: "/carousel/ai-task.png",
    alt: "Figma multiplayer engine"
  },
  {
    tag: "Realtime",
    title: "Whiteboard like Miro",
    description: "Spin up endless infinite canvas spaces with low-latency live cursors, shape rendering tracking, and fast web infrastructure.",
    src: "/carousel/advisory.png",
    alt: "Miro whiteboard infrastructure"
  }
];


export default function CarouselPage() {
  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Next.js 16 Image Carousel</h1>
      <Carousel features={LIVEBLOCKS_FEATURES} />
    </main>
  );
}
