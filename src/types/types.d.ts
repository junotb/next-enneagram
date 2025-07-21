interface Question {
  seq: number;
  type: number;
  question: string;
}

interface Answer {
  seq: number;
  type: number;
  answer: number;
}

interface Enneagram {
  type: number;
  title: EnneagramTitle;
  core_fear: string;
  core_desire: string;
  summary: string;
  description: string;
  wings: EnneagramWing[];
}

interface EnneagramTitle {
  korean: string;
  english: string;
}

interface EnneagramWing {
  type: number;
  title: EnneagramTitle;
  description: string;
}