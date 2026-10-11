import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, BookOpen } from 'lucide-react';

export default function FlashcardDeck({ flashcards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards.length) return null;

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      padding: '20px 0'
    }}>
      {/* 3D Flip Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '280px',
          perspective: '1000px',
          cursor: 'pointer'
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>
          {/* Front Face */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
            border: '1.5px solid var(--border-active)',
            borderRadius: '20px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: 'var(--cyan-400)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontWeight: '700'
            }}>
              <BookOpen size={14} />
              <span>CÂU HỎI / THUẬT NGỮ CỐT LÕI</span>
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', lineHeight: '1.6' }}>
              {currentCard.front}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              <RotateCw size={12} />
              <span>Bấm vào thẻ để xem đáp án / giải thích</span>
            </div>
          </div>

          {/* Back Face */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.95))',
            border: '1.5px solid var(--emerald-400)',
            borderRadius: '20px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: 'rotateY(180deg)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: 'var(--emerald-400)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontWeight: '700'
            }}>
              <span>ĐỊNH NGHĨA & NGUYÊN LÝ HOẠT ĐỘNG</span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: '500', color: '#f1f5f9', lineHeight: '1.6' }}>
              {currentCard.back}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
              Bấm lại để lật về câu hỏi
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={handlePrev}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--border-subtle)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Trước</span>
        </button>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Thẻ {currentIndex + 1} / {flashcards.length}
        </span>

        <button
          onClick={handleNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid var(--cyan-400)',
            color: 'var(--cyan-400)',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          <span>Tiếp theo</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
