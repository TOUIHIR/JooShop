import React, { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsActive(true);

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return Math.min(100, current + 2);
      });
    }, 30);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const fadeOutTimer = window.setTimeout(() => {
        setIsFadingOut(true);
      }, 120);

      const finishTimer = window.setTimeout(() => {
        onComplete();
      }, 120 + 400);

      return () => {
        window.clearTimeout(fadeOutTimer);
        window.clearTimeout(finishTimer);
      };
    }

    return undefined;
  }, [progress, onComplete]);

  return (
    <div className={`splash-screen ${isFadingOut ? "splash-screen--fade-out" : ""}`}>
      <div className="splash-screen__card">
        <img
          className="splash-screen__logo"
          src="/media/jippylogocolored.svg"
          alt="JooShop logo"
        />
        <p className="splash-screen__title">JooShop</p>

        <div className="progress-bar" aria-hidden="true">
          <div
            className={`progress-bar__fill ${isActive ? "progress-bar__fill--active" : ""}`}
          />
        </div>
        <span className="progress-bar__label">{progress}%</span>
      </div>
    </div>
  );
};

export default SplashScreen;
