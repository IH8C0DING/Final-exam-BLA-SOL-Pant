import { Recycle, Trophy, TrendingUp } from "lucide-react";
import CurrentBalanceHeader from "../components/CurrentBalanceHeader";
import CupFill from "../components/CupFill";
import { useLang } from "../translations";

export default function HomePage({ points = 750, cups = 54, totalEarned = 1350, cupFillPoints = points }) {
  const t = useLang();
  const fullCupPoints = 10000;
  const pointsPerScan = 3000;
  const fillPercentage = Math.min(100, (cupFillPoints / fullCupPoints) * 100);
  const scanSteps = Math.floor(cupFillPoints / pointsPerScan);
  const cupScale = 1 + Math.min(0.08, scanSteps * 0.02);
  return (
    <div className="h-full w-full px-8 xl:px-16 pt-30 md:pt-32 pb-32 flex flex-col gap-5 text-white box-border overflow-hidden">
      <CurrentBalanceHeader points={points} />

      <div className="flex-1 flex flex-row gap-3 md:gap-5 min-h-0 mt-0 md:mt-1">
        <div className="w-[48%] md:w-1/2 flex flex-col gap-3 md:gap-5 min-h-0">
          <div className="flex-1 p-3 md:p-5 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-0">
            <div
              className="relative z-10 mx-auto aspect-[4/5]"
              style={{ height: "min(100%, 52vh)", maxWidth: "60%" }}
            >
              <CupFill fillPercentage={fillPercentage} scale={cupScale} />
            </div>
          </div>
        </div>

        <div className="w-[52%] md:w-1/2 flex flex-col gap-3 md:gap-5 min-h-0">
          <div className="flex gap-3 md:gap-4 w-full">
            <div className="relative flex flex-row justify-between items-center px-4 md:px-6 py-2 md:py-3 rounded-[1rem] md:rounded-[2rem] bg-gradient-to-br from-[#96d4e5]/20 to-transparent border border-white/10 backdrop-blur-xl shadow-lg flex-1">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Recycle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="font-['Tilt_Warp',sans-serif] text-lg md:text-2xl text-[#fd7727]">{cups}</div>
                  <p className="font-['Geist',sans-serif] text-[8px] md:text-[9px] uppercase tracking-widest text-white/60">{t.cupsRecycled}</p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-row justify-between items-center px-4 md:px-6 py-2 md:py-3 rounded-[1rem] md:rounded-[2rem] bg-gradient-to-bl from-[#26448c]/20 to-transparent border border-white/10 backdrop-blur-xl shadow-lg flex-1">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="font-['Tilt_Warp',sans-serif] text-lg md:text-2xl text-[#fd7727]">{totalEarned}</div>
                  <p className="font-['Geist',sans-serif] text-[8px] md:text-[9px] uppercase tracking-widest text-white/60">{t.totalEarned}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col p-2 md:p-3 overflow-hidden relative cursor-default min-h-0">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

            <div className="relative z-10 mt-3 md:mt-5 mb-4 md:mb-8 flex items-center justify-between pl-3 md:pl-5">
              <div>
                <h2 className="font-['Tilt_Warp',sans-serif] text-xl md:text-2xl lg:text-3xl mb-1">{t.yourImpact}</h2>
                <p className="font-['Geist',sans-serif] text-[10px] md:text-sm font-light text-white/70">{t.recyclingHero}</p>
              </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 self-start w-full">
                <div className="h-70 md:h-80 bg-white/5 rounded-[1.5rem] p-4 border border-white/10 flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 md:mb-4 flex-shrink-0">
                    <Recycle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="font-['Tilt_Warp',sans-serif] text-2xl md:text-4xl text-[#fd7727] mb-1">{cups > 0 ? <span>0.5 <span className="text-base md:text-xl font-sans">kg</span></span> : "0"}</div>
                  <div className="font-['Geist',sans-serif] text-[9px] md:text-xs text-white/60 uppercase tracking-widest mt-1">{t.plasticRepurposed}</div>
                </div>

                <div className="h-70 md:h-80 bg-white/5 rounded-[1.5rem] p-4 border border-white/10 flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 md:mb-4 flex-shrink-0">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="font-['Tilt_Warp',sans-serif] text-2xl md:text-4xl text-[#fd7727] mb-1">{cups > 0 ? "Top 5%" : "0"}</div>
                  <div className="font-['Geist',sans-serif] text-[9px] md:text-xs text-white/60 uppercase tracking-widest mt-1">{t.ofAllRecyclers}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
