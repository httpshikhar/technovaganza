import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/auth');
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="background-video"
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-scenery-with-a-staircase-leading-to-the-sky-42974-large.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 w-full max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white animate-fade-in-down [text-shadow:_0_4px_16px_theme(colors.primary/50%)]">
          Technovaganza 2025
        </h1>
        <p className="mt-4 text-lg md:text-xl font-normal text-slate-300 dark:text-slate-400 max-w-2xl">
          SRMS CET&R
        </p>
        <p className="mt-2 text-md md:text-lg font-light text-slate-300 dark:text-slate-400">
          Annual Technical Festival
        </p>
        
        {/* Enter Button */}
        <div className="mt-12">
          <button 
            onClick={handleEnter}
            className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-lg bg-primary px-8 text-lg font-bold text-white transition-all duration-300 ease-in-out glow-shadow-hover focus:outline-none focus:ring-4 focus:ring-primary/50 hover:scale-105"
          >
            <span className="z-10">Enter Technovaganza 2025</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;