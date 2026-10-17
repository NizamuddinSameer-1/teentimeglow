import React, { useState } from 'react';

export interface QuizOption {
  text: string;
  outcomeKey: string;
}

export interface QuizQuestion {
  id: number;
  indicator: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOutcome {
  key: string;
  badge: string;
  title: string;
  description: string;
  editLinkText?: string;
}

export interface QuizPlayerProps {
  headerPill?: string;
  heading?: string;
  description?: string;
  trustPills?: string[];
  questions?: QuizQuestion[];
  outcomes?: Record<string, QuizOutcome>;
}

export const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    indicator: 'Morning Ritual',
    question: 'What is your dream Saturday morning ritual?',
    options: [
      { text: '🍵 Iced matcha latte & slow aesthetic journaling', outcomeKey: 'clean_girl' },
      { text: '🧥 Oversized hoodie & thrift store hunting', outcomeKey: 'downtown' },
      { text: '🌅 Golden hour rooftop photography with friends', outcomeKey: 'sunset_muse' },
      { text: '🎧 Cozy bed, fairy lights & nostalgic vinyl records', outcomeKey: 'cozy_vanilla' }
    ]
  },
  {
    id: 2,
    indicator: 'Signature Piece',
    question: 'Pick your ultimate go-to wardrobe essential:',
    options: [
      { text: '✨ Glazed lip oil, gold hoops & clean linen', outcomeKey: 'clean_girl' },
      { text: '👟 Chunky vintage sneakers & boxy denim', outcomeKey: 'downtown' },
      { text: '🧥 Flowing sunset trench coat & tinted sunglasses', outcomeKey: 'sunset_muse' },
      { text: '🧶 Soft chunky knit cardigan & wired earphones', outcomeKey: 'cozy_vanilla' }
    ]
  },
  {
    id: 3,
    indicator: 'Soundtrack',
    question: 'What soundtrack best matches your soul right now?',
    options: [
      { text: '🎶 Indie bedroom pop & coastal acoustic melodies', outcomeKey: 'sunset_muse' },
      { text: '☕ Warm study lo-fi beats & soft rainy piano', outcomeKey: 'cozy_vanilla' },
      { text: '🎸 70s vintage rock & high-energy golden hour anthems', outcomeKey: 'downtown' },
      { text: '✨ Dreamy atmospheric R&B and night-drive synth', outcomeKey: 'clean_girl' }
    ]
  }
];

export const defaultOutcomes: Record<string, QuizOutcome> = {
  sunset_muse: {
    key: 'sunset_muse',
    badge: 'Aura: Sunset Muse ✨',
    title: 'The Golden Hour Tastemaker',
    description: 'You thrive on warm golden hour sunsets, effortless layered style, and romanticizing everyday teenage moments. You inspire confidence in everyone around you.',
    editLinkText: 'View Your Recommended Edit →'
  },
  clean_girl: {
    key: 'clean_girl',
    badge: 'Aura: Clean Girl Dew ✨',
    title: 'The Glass Skin Minimalist',
    description: 'Effortless gold hoops, dewy skin tint, slicked-back buns, and iced matcha. You bring organized elegance and fresh energy to every space.',
    editLinkText: 'Explore Skincare Routine →'
  },
  cozy_vanilla: {
    key: 'cozy_vanilla',
    badge: 'Aura: Vanilla Warmth 🍦',
    title: 'The Cozy Room Romantic',
    description: 'Chunky knit blankets, vanilla chai lattes, fairy lights, and reading romance novels until 2 AM. Your warmth makes everyone feel immediately at home.',
    editLinkText: 'View Cozy Decor Guide →'
  },
  downtown: {
    key: 'downtown',
    badge: 'Aura: Downtown Indie 🎸',
    title: 'The Vintage Vinyl Collector',
    description: 'Oversized leather jackets, film cameras, thrift store vinyl crates, and headphone playlists. You move to your own rhythm with authentic street confidence.',
    editLinkText: 'Explore Fashion Lookbook →'
  }
};

export default function QuizPlayer({
  headerPill = '✨ Interactive Experience',
  heading = 'Discover Your Glow Vibe',
  description = 'Answer 3 intuitive questions to find your personal aesthetic aura, wardrobe match, and signature playlist vibe.',
  trustPills = ['✦ 100% Free', '✦ Instant Badge', '✦ 14k+ Teens Quizzed'],
  questions = defaultQuestions,
  outcomes = defaultOutcomes
}: QuizPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizOutcome | null>(null);

  const totalQuestions = questions.length;
  const progressPercent = Math.min(100, Math.round(((currentStep) / totalQuestions) * 100));

  const handleSelectOption = (outcomeKey: string) => {
    const updatedAnswers = [...answers, outcomeKey];
    setAnswers(updatedAnswers);

    if (currentStep + 1 < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate outcome by most frequent key
      const counts: Record<string, number> = {};
      updatedAnswers.forEach(k => { counts[k] = (counts[k] || 0) + 1; });
      const topKey = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'sunset_muse');
      const calculatedResult = outcomes[topKey] || outcomes.sunset_muse;
      setResult(calculatedResult);
      setCurrentStep(totalQuestions);

      // Trigger confetti if available
      if (typeof window !== 'undefined' && (window as any).confetti) {
        (window as any).confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const currentQ = questions[currentStep];

  return (
    <div className="quiz-section-wrap">
      <div className="morph-liquid-blob quiz-morph-blob"></div>
      <div className="quiz-inner-grid">
        {/* Left Column */}
        <div className="quiz-intro-col">
          <span className="quiz-pill-header">{headerPill}</span>
          <h2 className="quiz-heading">{heading}</h2>
          <p className="quiz-desc">{description}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {trustPills.map((pill, i) => (
              <div key={i} style={{ fontSize: '0.85rem', color: '#FFDE59', fontWeight: 700 }}>
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quiz Card Island */}
        <div className="quiz-card-container">
          {/* Animated Progress Bar */}
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${result ? 100 : progressPercent}%`, transition: 'width 0.4s ease' }}
            />
          </div>

          {!result && currentQ && (
            <div className="quiz-step-view">
              <div className="quiz-step-indicator">
                <span>Question {currentStep + 1} of {totalQuestions}</span>
                <span>{currentQ.indicator}</span>
              </div>
              <h3 className="quiz-question-title">{currentQ.question}</h3>
              <div className="quiz-options-list">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quiz-option-btn"
                    onClick={() => handleSelectOption(opt.outcomeKey)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="quiz-result-view" style={{ display: 'block' }}>
              <span className="quiz-result-badge">{result.badge}</span>
              <h3 className="quiz-result-title">{result.title}</h3>
              <p className="quiz-result-desc">{result.description}</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-retake-quiz magnetic-btn"
                  onClick={handleRestart}
                >
                  Take Again ↻
                </button>
                <a
                  href="#edits"
                  className="btn-black-pill magnetic-btn"
                  style={{ padding: '10px 20px', fontSize: '0.85rem', textDecoration: 'none' }}
                >
                  {result.editLinkText || 'View Recommended Edit →'}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
