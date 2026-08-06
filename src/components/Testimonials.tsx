"use client";
import React, { useState, useRef } from 'react';

const testimonials = [
  { name: 'Saumya', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', video: '/files/testimo/testvideo.mp4' },
  { name: 'Tamannah', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop', video: '/files/testimo/testvideo.mp4' },
  { name: 'Nisha', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop', video: '/files/testimo/testvideo.mp4' },
  { name: 'Vishal', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', video: '/files/testimo/testvideo.mp4' },
  { name: 'Archita', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop', video: '/files/testimo/testvideo.mp4' },
  { name: 'Bhumi', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop', video: '/files/testimo/testvideo.mp4' },
];

export default function Testimonials() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlay = (index: number, videoSrc: string) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setModalVideo(videoSrc);
    } else {
      if (playingId === index) {
        // Pause and close
        if (videoRefs.current[index]) {
          videoRefs.current[index]?.pause();
        }
        setPlayingId(null);
      } else {
        // Pause previous
        if (playingId !== null && videoRefs.current[playingId]) {
          videoRefs.current[playingId]?.pause();
        }
        setPlayingId(index);
        if (videoRefs.current[index]) {
          videoRefs.current[index]!.currentTime = 0;
          videoRefs.current[index]?.play();
        }
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .testimonial-card {
            flex: 1;
            min-width: 0;
            transition: flex 0.4s ease;
        }
        .testimonial-card.playing {
            flex: 2.5;
        }
        @media (max-width: 768px) {
            .testimonial-card {
                flex: none;
                width: 75vw;
                transition: width 0.4s ease;
            }
            .testimonial-card.playing {
                width: 88vw !important;
            }
        }
      `}} />
      <section id="testimonials" className="mb-28 animate-reveal delay-300 max-w-[1200px] mx-auto px-4 md:px-0">
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3 justify-center md:justify-start">
            <h2 className="text-[24px] md:text-4xl lg:text-[40px] font-semibold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
              Hear it From Our Learners
            </h2>
            <span className="bg-brand-orange text-white text-[11px] md:text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded shadow-sm w-max mx-auto md:mx-0">Testimonials</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[15px]">SkillSha Alumni Stories, You can&apos;t afford to miss.</p>
        </div>

        <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar gap-3 md:gap-4 h-[400px] md:h-[450px] lg:h-[500px] w-full pb-4 md:pb-0">
          {testimonials.map((t, index) => {
            const isPlaying = playingId === index;
            return (
              <div 
                key={index}
                onClick={() => handlePlay(index, t.video)}
                className={`snap-center flex-shrink-0 relative rounded-[20px] overflow-hidden cursor-pointer border border-zinc-200 dark:border-white/10 group shadow-sm bg-zinc-100 dark:bg-white/[0.02] dark:backdrop-blur-xl transition-all duration-400 ease-in-out testimonial-card ${isPlaying ? 'playing' : ''}`}
              >
                <div className="absolute inset-0 w-full h-full z-10">
                  <video 
                    ref={el => {
                      if (el) {
                        videoRefs.current[index] = el;
                      }
                    }}
                    className="w-full h-full object-cover" 
                    src={t.video} 
                    playsInline 
                    muted 
                    preload="auto" 
                    loop 
                    style={{ visibility: isPlaying ? 'visible' : 'hidden' }}
                  ></video>
                </div>
                
                <div className={`absolute inset-0 w-full h-full z-20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <img src={t.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={t.name} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 group-hover:to-black/80 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-300">
                    <svg className="w-4 h-4 text-zinc-800 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-brand-orange text-white text-sm md:text-sm font-bold py-1.5 px-6 rounded-full shadow-[0_4px_14px_rgba(13,148,136,0.3)] transform group-hover:-translate-y-1 transition-transform duration-300">
                      {t.name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mobile Video Modal */}
      {modalVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center">
          <button 
            onClick={() => setModalVideo(null)} 
            className="absolute top-4 right-4 bg-white/15 border-none rounded-full w-11 h-11 flex items-center justify-center cursor-pointer text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <video 
            autoPlay 
            playsInline 
            controls 
            className="w-full max-h-[90vh] object-contain" 
            src={modalVideo}
          ></video>
        </div>
      )}
    </>
  );
}
