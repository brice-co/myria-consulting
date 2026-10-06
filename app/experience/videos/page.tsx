import VideoGallerySection from "@/experience/video/VideoGallerySection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyriaChat Video Demo",
  description: "Watch how MyriaChat transforms customer interactions with its advanced AI capabilities.",
  keywords: [
    "MyriaChat video demo",
    "MyriaChat AI capabilities",
  ],
};

const VideoPage = () => {
  return (
    <div>
         
      <VideoGallerySection />
    </div>
  );
};

export default VideoPage;