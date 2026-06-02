export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuestionCategory =
  | 'science'
  | 'history'
  | 'geography'
  | 'entertainment'
  | 'sports'
  | 'technology'
  | 'literature'
  | 'general';

export interface GameState {
  screen: 'start' | 'quiz' | 'result' | 'daily' | 'leaderboard';
  questions: Question[];
  currentIndex: number;
  score: number;
  combo: number;
  maxCombo: number;
  lives: number;
  maxLives: number;
  livesRegenTime: number;
  correctCount: number;
  totalTimeUsed: number;
  isGameOver: boolean;
  canRevive: boolean;
  hasRevived: boolean;
  doubleRewardAvailable: boolean;
  dailyChallengeCompleted: boolean;
  streakDays: number;
  totalScore: number;
  lastLifeLostTime: number;
}

export interface GameResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
  maxCombo: number;
  totalTimeUsed: number;
  isPerfect: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
  avatar?: string;
}

export interface AdCallbacks {
  onReward?: () => void;
  onClose?: () => void;
  onError?: (error: any) => void;
}

export type AdType = 'revive' | 'doubleReward' | 'treasureChest' | 'extraLife';
