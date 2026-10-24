import { BrainCircuit, CircleDot, Layers3, MonitorPlay, Network, Users } from "lucide-react";
import type { Experience } from "./experience-content";

/**
 * Media slot for real recording assets. A video element is shown only when
 * footage is configured; otherwise visitors see an editorial illustration
 * without a misleading playback control.
 */
export function ExperienceMedia({ experience }: { experience: Experience }) {
  const { id, title, videoSrc, posterSrc } = experience;

  if (videoSrc) {
    return (
      <div className="mc-experience-media mc-experience-video">
        <video
          controls
          playsInline
          preload="metadata"
          poster={posterSrc ?? undefined}
          aria-label={`Watch ${title} demonstration`}
        >
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          Your browser does not support HTML video.
        </video>
      </div>
    );
  }

  return (
    <div
      className={`mc-experience-media mc-experience-media--${id}`}
      role="img"
      aria-label={`Illustrative visualization of ${title}; a video may be added later`}
    >
      <div className="mc-media-interface" aria-hidden="true">
        <div className="mc-media-topbar">
          <span className="mc-media-dots"><i /><i /><i /></span>
          <span>MYRIA / SESSION VIEW</span>
          <MonitorPlay size={15} strokeWidth={1.4} />
        </div>
        {id === "advisory" && (
          <div className="mc-media-lab">
            <span className="mc-media-overline">DISCOVERY LAB / STRUCTURED INQUIRY</span>
            <strong>What are we trying to achieve?</strong>
            <div className="mc-media-steps">
              <span>01 Understand</span><span>02 Explore</span><span>03 Focus</span>
            </div>
            <div className="mc-media-progress"><span /></div>
          </div>
        )}
        {id === "team" && (
          <div className="mc-media-team">
            <div className="mc-media-hub"><BrainCircuit size={26} strokeWidth={1.3} /><span>Shared question</span></div>
            <div className="mc-media-roles">
              <span><CircleDot size={11} /> Strategy</span>
              <span><Layers3 size={11} /> Operations</span>
              <span><Network size={11} /> AI & Data</span>
              <span><Users size={11} /> People & Change</span>
            </div>
          </div>
        )}
        {id === "workspace" && (
          <div className="mc-media-workspace">
            <div className="mc-media-meeting-top"><span><i /> Collaborative meeting</span><span className="mc-media-avatars"><b>H</b><b>AI</b></span></div>
            <div className="mc-media-workspace-grid">
              <div><small>OBSERVATIONS</small><span>Business context</span><span>Key challenges</span></div>
              <div><small>DECISIONS</small><span>Priority areas</span><span>Next steps</span></div>
            </div>
            <div className="mc-media-workspace-bottom"><span>Shared working picture</span><span>● ● ●</span></div>
          </div>
        )}
      </div>
      <span className="mc-media-caption" aria-hidden="true">An inside look at the process</span>
    </div>
  );
}
