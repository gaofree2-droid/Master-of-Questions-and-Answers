import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import type { GameState, GameResult, Question } from '../types';
import { selectGameQuestions, selectDailyChallenge } from '../data/questions';

const MAX_LIVES = 5;
const LIFE_REGEN_MS = 10 * 60 * 1000;
const QUESTION_TIME = 15;
const BASE_POINTS = 100;
const TIME_BONUS_MAX = 50;
const COMBO_MULTIPLIER = 0.25;

type GameAction =
  | { type: 'START_GAME'; category?: string }
  | { type: 'START_DAILY' }
  | { type: 'ANSWER_CORRECT'; timeUsed: number }
  | { type: 'ANSWER_WRONG' }
  | { type: 'TIME_UP' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'REVIVE' }
  | { type: 'DOUBLE_REWARD' }
  | { type: 'USE_LIFE' }
  | { type: 'RESTORE_LIFE'; amount: number }
  | { type: 'SET_SCREEN'; screen: GameState['screen'] }
  | { type: 'UPDATE_LIVES_REGEN' }
  | { type: 'GAME_OVER' };

function createInitialState(): GameState {
  return {
    screen: 'start',
    questions: [],
    currentIndex: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: MAX_LIVES,
    maxLives: MAX_LIVES,
    livesRegenTime: 0,
    correctCount: 0,
    totalTimeUsed: 0,
    isGameOver: false,
    canRevive: true,
    hasRevived: false,
    doubleRewardAvailable: true,
    dailyChallengeCompleted: false,
    streakDays: 0,
    totalScore: 0,
    lastLifeLostTime: 0,
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const questions = selectGameQuestions(10, action.category);
      return {
        ...state,
        screen: 'quiz',
        questions,
        currentIndex: 0,
        score: 0,
        combo: 0,
        maxCombo: 0,
        correctCount: 0,
        totalTimeUsed: 0,
        isGameOver: false,
        canRevive: true,
        hasRevived: false,
        doubleRewardAvailable: true,
      };
    }

    case 'START_DAILY': {
      const questions = selectDailyChallenge();
      return {
        ...state,
        screen: 'quiz',
        questions,
        currentIndex: 0,
        score: 0,
        combo: 0,
        maxCombo: 0,
        correctCount: 0,
        totalTimeUsed: 0,
        isGameOver: false,
        canRevive: true,
        hasRevived: false,
        doubleRewardAvailable: true,
      };
    }

    case 'ANSWER_CORRECT': {
      const timeBonus = Math.max(0, Math.floor((QUESTION_TIME - action.timeUsed) / QUESTION_TIME * TIME_BONUS_MAX));
      const newCombo = state.combo + 1;
      const comboMultiplier = 1 + (newCombo - 1) * COMBO_MULTIPLIER;
      const points = Math.floor((BASE_POINTS + timeBonus) * comboMultiplier);
      const newMaxCombo = Math.max(state.maxCombo, newCombo);

      return {
        ...state,
        score: state.score + points,
        combo: newCombo,
        maxCombo: newMaxCombo,
        correctCount: state.correctCount + 1,
        totalTimeUsed: state.totalTimeUsed + action.timeUsed,
      };
    }

    case 'ANSWER_WRONG':
    case 'TIME_UP': {
      return {
        ...state,
        combo: 0,
        totalTimeUsed: state.totalTimeUsed + (action.type === 'TIME_UP' ? QUESTION_TIME : 0),
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          screen: 'result',
          isGameOver: true,
          totalScore: state.totalScore + state.score,
        };
      }
      return {
        ...state,
        currentIndex: nextIndex,
      };
    }

    case 'REVIVE': {
      return {
        ...state,
        lives: 1,
        canRevive: false,
        hasRevived: true,
      };
    }

    case 'DOUBLE_REWARD': {
      return {
        ...state,
        score: state.score * 2,
        doubleRewardAvailable: false,
      };
    }

    case 'USE_LIFE': {
      const newLives = state.lives - 1;
      return {
        ...state,
        lives: newLives,
        lastLifeLostTime: Date.now(),
        livesRegenTime: newLives < MAX_LIVES ? Date.now() + LIFE_REGEN_MS : 0,
      };
    }

    case 'RESTORE_LIFE': {
      const restored = Math.min(state.lives + action.amount, MAX_LIVES);
      return {
        ...state,
        lives: restored,
        livesRegenTime: restored < MAX_LIVES ? Date.now() + LIFE_REGEN_MS : 0,
      };
    }

    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'UPDATE_LIVES_REGEN': {
      if (state.lives >= MAX_LIVES) {
        return { ...state, livesRegenTime: 0 };
      }
      if (state.livesRegenTime > 0 && Date.now() >= state.livesRegenTime) {
        const restored = Math.min(state.lives + 1, MAX_LIVES);
        return {
          ...state,
          lives: restored,
          livesRegenTime: restored < MAX_LIVES ? Date.now() + LIFE_REGEN_MS : 0,
        };
      }
      return state;
    }

    case 'GAME_OVER':
      return {
        ...state,
        isGameOver: true,
        screen: 'result',
        totalScore: state.totalScore + state.score,
      };

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: (category?: string) => void;
  startDaily: () => void;
  answerQuestion: (selectedIndex: number) => { correct: boolean; points: number };
  goToNext: () => void;
  timeUp: () => void;
  revive: () => void;
  doubleReward: () => void;
  setScreen: (screen: GameState['screen']) => void;
  getQuestionTimeLimit: () => number;
  getCurrentQuestion: () => Question | null;
  getGameResult: () => GameResult;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);
  const questionStartTime = useRef(Date.now());

  const startGame = useCallback((category?: string) => {
    dispatch({ type: 'START_GAME', category });
    questionStartTime.current = Date.now();
  }, []);

  const startDaily = useCallback(() => {
    dispatch({ type: 'START_DAILY' });
    questionStartTime.current = Date.now();
  }, []);

  const answerQuestion = useCallback((selectedIndex: number) => {
    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion) return { correct: false, points: 0 };

    const timeUsed = Math.min(
      (Date.now() - questionStartTime.current) / 1000,
      QUESTION_TIME
    );
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      const timeBonus = Math.max(0, Math.floor((QUESTION_TIME - timeUsed) / QUESTION_TIME * TIME_BONUS_MAX));
      const newCombo = state.combo + 1;
      const comboMultiplier = 1 + (newCombo - 1) * COMBO_MULTIPLIER;
      const points = Math.floor((BASE_POINTS + timeBonus) * comboMultiplier);
      dispatch({ type: 'ANSWER_CORRECT', timeUsed });
      return { correct: true, points };
    } else {
      dispatch({ type: 'ANSWER_WRONG' });
      return { correct: false, points: 0 };
    }
  }, [state.questions, state.currentIndex, state.combo]);

  const goToNext = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
    questionStartTime.current = Date.now();
  }, []);

  const timeUp = useCallback(() => {
    dispatch({ type: 'TIME_UP' });
  }, []);

  const revive = useCallback(() => {
    dispatch({ type: 'REVIVE' });
    questionStartTime.current = Date.now();
  }, []);

  const doubleReward = useCallback(() => {
    dispatch({ type: 'DOUBLE_REWARD' });
  }, []);

  const setScreen = useCallback((screen: GameState['screen']) => {
    dispatch({ type: 'SET_SCREEN', screen });
  }, []);

  const getQuestionTimeLimit = useCallback(() => QUESTION_TIME, []);

  const getCurrentQuestion = useCallback(() => {
    if (state.questions.length === 0 || state.currentIndex >= state.questions.length) {
      return null;
    }
    return state.questions[state.currentIndex];
  }, [state.questions, state.currentIndex]);

  const getGameResult = useCallback((): GameResult => {
    return {
      score: state.score,
      correctCount: state.correctCount,
      totalQuestions: state.questions.length,
      maxCombo: state.maxCombo,
      totalTimeUsed: state.totalTimeUsed,
      isPerfect: state.correctCount === state.questions.length,
    };
  }, [state.score, state.correctCount, state.questions.length, state.maxCombo, state.totalTimeUsed]);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        startGame,
        startDaily,
        answerQuestion,
        goToNext,
        timeUp,
        revive,
        doubleReward,
        setScreen,
        getQuestionTimeLimit,
        getCurrentQuestion,
        getGameResult,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export { QUESTION_TIME };
