export default function CupFill({ fillPercentage, scale = 1, highlightFilledMarkers = false }) {
  return (
    <>
      <style>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave { animation: wave 4s linear infinite; }
      `}</style>
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          clipPath: 'polygon(10% 0, 90% 0, 80% 100%, 20% 100%)',
          WebkitClipPath: 'polygon(10% 0, 90% 0, 80% 100%, 20% 100%)',
          transform: `translateZ(0) scale(${scale})`,
          transition: 'transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
        {[25, 50, 75].map((percent) => (
          <div
            key={percent}
            className="absolute left-0 w-full h-[1px] border-t-2 border-dotted border-white/40 z-20 flex justify-center items-center transition-all duration-300"
            style={{ bottom: `${percent}%` }}
          >
            <span className={`px-2 py-0.5 rounded-full font-['Geist',sans-serif] text-[10px] font-bold shadow-sm absolute transform translate-y-[2px] transition-colors duration-500 ${
              highlightFilledMarkers && fillPercentage >= percent
                ? 'bg-white text-[#fd7727]'
                : 'bg-black/40 backdrop-blur-md text-white'
            }`}>
              {percent}%
            </span>
          </div>
        ))}
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out"
          style={{ height: `${fillPercentage}%` }}
        >
          <div className="absolute -top-6 left-0 w-[200%] h-12 flex items-end">
            <svg className="w-full h-full animate-wave drop-shadow-lg mix-blend-overlay" viewBox="0 0 800 50" preserveAspectRatio="none">
              <path d="M0,25 C100,50 200,0 400,25 C600,50 700,0 800,25 L800,50 L0,50 Z" fill="#1f356c" opacity="0.55"/>
              <path d="M0,25 C150,0 250,50 400,25 C550,0 650,50 800,25 L800,50 L0,50 Z" fill="#4f76b7" opacity="0.75"/>
              <path d="M0,25 C200,10 300,40 400,25 C500,10 600,40 800,25 L800,50 L0,50 Z" fill="#fd7727" opacity="0.72"/>
              <path d="M0,25 C120,20 260,32 400,25 C540,18 680,30 800,25 L800,50 L0,50 Z" fill="#ffb27d" opacity="0.52"/>
            </svg>
          </div>
          <div className="absolute top-4 bottom-0 left-0 w-full bg-[linear-gradient(to_top,#1f356c_0%,#26448c_24%,#4f76b7_48%,#fd7727_78%,#ffb27d_100%)]" />
        </div>
        <div className="absolute top-0 right-4 bottom-0 w-8 bg-gradient-to-b from-white/40 to-transparent blur-[2px] transform -skew-x-[8deg] z-30 pointer-events-none mix-blend-overlay" />
      </div>
      <div
        className="absolute inset-0 border-x-[2px] border-white/30 z-40 pointer-events-none"
        style={{
          clipPath: 'polygon(10% 0, 90% 0, 80% 100%, 20% 100%)',
          WebkitClipPath: 'polygon(10% 0, 90% 0, 80% 100%, 20% 100%)'
        }}
      />
    </>
  );
}
