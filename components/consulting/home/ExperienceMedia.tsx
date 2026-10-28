import { BrainCircuit, CircleDot, Layers3, MonitorPlay, Network, Users } from "lucide-react";
import type { Experience } from "./experience-content";

/**
 * Media slot for real recording assets. A video element is shown only when
 * footage is configured; otherwise visitors see an editorial illustration
 * without a misleading playback control.
 */
export function ExperienceMedia({ experience, locale = "en" }: { experience: Experience; locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const { id, title, videoSrc, posterSrc, captionsSrc } = experience;

  if (videoSrc) {
    return (
      <div className="mc-experience-media mc-experience-video">
        <video
          controls
          playsInline
          preload="metadata"
          disablePictureInPicture={false}
          poster={posterSrc ?? undefined}
          aria-label={fr ? `Voir la démonstration : ${title}` : `Watch ${title} demonstration`}
        >
          <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          {captionsSrc && (
            <track src={captionsSrc} kind="captions" srcLang="en" label={fr ? "Sous-titres anglais" : "English captions"} default />
          )}
          {fr ? "Votre navigateur ne prend pas en charge la vidéo HTML." : "Your browser does not support HTML video."}
        </video>
      </div>
    );
  }

  return (
    <div
      className={`mc-experience-media mc-experience-media--${id}`}
      role="img"
      aria-label={fr ? `Illustration de ${title}; une vidéo pourrait être ajoutée ultérieurement` : `Illustrative visualization of ${title}; a video may be added later`}
    >
      <div className="mc-media-interface" aria-hidden="true">
        <div className="mc-media-topbar">
          <span className="mc-media-dots"><i /><i /><i /></span>
          <span>{fr ? "MYRIA / VUE DE LA SÉANCE" : "MYRIA / SESSION VIEW"}</span>
          <MonitorPlay size={15} strokeWidth={1.4} />
        </div>
        {id === "advisory" && (
          <div className="mc-media-lab">
            <span className="mc-media-overline">{fr ? "LABORATOIRE / EXPLORATION STRUCTURÉE" : "DISCOVERY LAB / STRUCTURED INQUIRY"}</span>
            <strong>{fr ? "Que cherchons-nous à accomplir ?" : "What are we trying to achieve?"}</strong>
            <div className="mc-media-steps">
              <span>{fr ? "01 Comprendre" : "01 Understand"}</span><span>{fr ? "02 Explorer" : "02 Explore"}</span><span>{fr ? "03 Prioriser" : "03 Focus"}</span>
            </div>
            <div className="mc-media-progress"><span /></div>
          </div>
        )}
        {id === "team" && (
          <div className="mc-media-team">
            <div className="mc-media-hub"><BrainCircuit size={26} strokeWidth={1.3} /><span>{fr ? "Question commune" : "Shared question"}</span></div>
            <div className="mc-media-roles">
              <span><CircleDot size={11} /> {fr ? "Stratégie" : "Strategy"}</span>
              <span><Layers3 size={11} /> {fr ? "Opérations" : "Operations"}</span>
              <span><Network size={11} /> {fr ? "IA et données" : "AI & Data"}</span>
              <span><Users size={11} /> {fr ? "Personnes et changement" : "People & Change"}</span>
            </div>
          </div>
        )}
        {id === "workspace" && (
          <div className="mc-media-workspace">
            <div className="mc-media-meeting-top"><span><i /> {fr ? "Séance collaborative" : "Collaborative meeting"}</span><span className="mc-media-avatars"><b>H</b><b>AI</b></span></div>
            <div className="mc-media-workspace-grid">
              <div><small>OBSERVATIONS</small><span>{fr ? "Contexte d’affaires" : "Business context"}</span><span>{fr ? "Défis principaux" : "Key challenges"}</span></div>
              <div><small>{fr ? "DÉCISIONS" : "DECISIONS"}</small><span>{fr ? "Domaines prioritaires" : "Priority areas"}</span><span>{fr ? "Prochaines étapes" : "Next steps"}</span></div>
            </div>
            <div className="mc-media-workspace-bottom"><span>{fr ? "Vue commune du travail" : "Shared working picture"}</span><span>● ● ●</span></div>
          </div>
        )}
      </div>
      <span className="mc-media-caption" aria-hidden="true">{fr ? "Découvrez notre démarche" : "An inside look at the process"}</span>
    </div>
  );
}
