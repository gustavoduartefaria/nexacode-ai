export type Difficulty = "Iniciante" | "Intermediário" | "Avançado";

export type LanguageId = "javascript" | "python" | "cpp";

export type ProgrammingLanguage = {
  id: LanguageId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  accent: string;
  accentSoft: string;
  fileExtension: string;
  runtimeLabel: string;
};

export type LessonVideoReference = {
  title: string;
  creator: string;
  url: string;
  coverage: string;
  note: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  duration: number;
  difficulty: Difficulty;
  theory: string;
  analogy: string;
  code: string;
  mission: string;
  objectives: string[];
  prerequisites: string[];
  engineering: {
    productionContext: string;
    failureMode: string;
    verification: string;
    performance: string;
  };
  videoReference?: LessonVideoReference;
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
};

export type CourseModule = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  language: LanguageId;
  lessons: Lesson[];
};
