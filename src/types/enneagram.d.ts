/** 프론트엔드/API 응답용 - assessment-144q 기반 변환 결과 */
interface Question {
  seq: number;
  type: number;
  question: string;
}

/** assessment-144q.json 항목 (전문가용 144문항) */
interface AssessmentQuestion {
  id: number;
  type_num: number;
  content: string;
  category?: string;
  weight: number;
  is_reverse: boolean;
  metadata?: Record<string, unknown>;
}

interface Answer {
  seq: number;
  type: number;
  answer: number;
}

/** primary-types.json 항목 */
interface PrimaryType {
  type_num: number;
  title: string;
  tagline: string;
  summary: string;
  core_traits: { desire: string; fear: string; motivation: string };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    growth_tip: string;
  };
  symbolism?: {
    planet_key: string;
    birthstone_key: string;
    birthflower_key: string;
    tarot_key: string;
    lucky_items: string[];
  };
  aesthetics?: {
    color_group_key: string;
    palette: string[];
  };
  description_detail?: string;
}

/** wing-analysis.json 항목 */
interface WingAnalysisItem {
  wing_id: string;
  core_type: number;
  wing_type: number;
  subtype_title: string;
  summary: string;
  analysis_details: {
    behavioral_traits: string[];
    social_style: string;
    stress_trigger: string;
    depth_description?: string;
  };
}