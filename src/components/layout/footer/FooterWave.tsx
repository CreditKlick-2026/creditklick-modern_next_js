import React from "react";

export const FooterWave: React.FC = () => {
  return (
    <div className="ck-footer-wave-mask">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ck-footer-wave-svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-10,-6 L1450,-6 L1450,0 C1280,0 1220,80 1060,80 C900,80 840,30 680,30 C520,30 460,100 320,100 C180,100 120,0 0,0 L-10,0 Z"
          className="fill-white"
        />
      </svg>
    </div>
  );
};
