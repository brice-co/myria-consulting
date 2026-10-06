export type PlaybookChapter = {
  number: string;
  title: string;
  description: string;
};

export type PlaybookPreviewPart = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  themes: string[];
};

export type PlaybookContent = {
  eyebrow: string;
  title: string;
  description: string;
  previewParts: PlaybookPreviewPart[];
  chapters: PlaybookChapter[];
};
