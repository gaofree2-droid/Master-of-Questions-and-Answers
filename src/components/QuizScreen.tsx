import { useState, useEffect, useCallback } from 'react';
import { useGame, QUESTION_TIME } from '../context/GameContext';
import { useTelegram } from '../hooks/useTelegram';
import { categoryNames } from '../data/questions';

export function QuizScreen() {
  const { state, answerQuestion, goToNext, timeUp, setScreen } = useGame();
  const { hapticImpact, hapticNotification } = useTelegram();

  const currentQuestion = state.questions[state.currentIndex];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(QUESTION_TIME);
    setPointsEarned(0);
    setIsTransitioning(false);
  }, [state.currentIndex]);

  useEffect(() => {
    if (showResult || isTransitioning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.currentIndex, showResult, isTransitioning]);

  const handleTimeUp = useCallback(() => {
    timeUp();
    setShowResult(true);
    hapticNotification('warning');

    setTimeout(() => {
      handleNext();
    }, 1500);
  }, []);

  const handleAnswer = (index: number) => {
    if (showResult || selectedAnswer !== null || isTransitioning) return;

    setSelectedAnswer(index);
    setShowResult(true);

    const result = answerQuestion(index);
    if (result.correct) {
      setPointsEarned(result.points);
      hapticNotification('success');
    } else {
      hapticNotification('error');
    }

    setTimeout(() => {
      handleNext();
    }, 1800);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    goToNext();
  };

  if (!currentQuestion) return null;

  const progress = ((state.currentIndex) / state.questions.length) * 100;
  const timerProgress = (timeLeft / QUESTION_TIME) * 100;
  const isTimeLow = timeLeft <= 5;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setScreen('start')}
          className="text-white/60 text-sm flex items-center gap-1"
        >
          ← 退出
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">
            {state.currentIndex + 1}/{state.questions.length}
          </span>
          {state.combo > 1 && (
            <span className="text-sm font-bold text-orange-400 animate-combo-pop">
              🔥 x{state.combo}
            </span>
          )}
        </div>
        <div className="text-sm font-bold text-purple-300">
          {state.score}分
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timer */}
      <div className="flex justify-center mb-6">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={isTimeLow ? '#ff6b6b' : '#6c5ce7'}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${timerProgress * 1.76} 176`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${
            isTimeLow ? 'text-red-400 animate-pulse-fast' : 'text-white'
          }`}>
            {timeLeft}
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex justify-center mb-3">
        <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/60">
          {categoryNames[currentQuestion.category] || currentQuestion.category}
        </span>
      </div>

      {/* Question */}
      <div className="glass-card p-5 mb-6 animate-slide-up">
        <h2 className="text-lg font-bold leading-relaxed text-center">
          {currentQuestion.text}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {currentQuestion.options.map((option, index) => {
          let optionClass = 'option-btn';
          if (showResult && selectedAnswer !== null) {
            if (index === currentQuestion.correctIndex) {
              optionClass += ' option-correct';
            } else if (index === selectedAnswer) {
              optionClass += ' option-wrong';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult || selectedAnswer !== null}
              className={optionClass}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === currentQuestion.correctIndex && (
                  <span className="text-green-400 text-xl">✓</span>
                )}
                {showResult && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                  <span className="text-red-400 text-xl">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Points Earned Popup */}
      {showResult && pointsEarned > 0 && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-bounce-in text-4xl font-bold text-yellow-400 text-glow">
            +{pointsEarned}
          </div>
        </div>
      )}

      {/* Combo Display */}
      {showResult && state.combo > 2 && pointsEarned > 0 && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-40">
          <div className="animate-combo-pop text-lg font-bold text-orange-400">
            🔥 {state.combo} COMBO!
          </div>
        </div>
      )}
    </div>
  );
}
