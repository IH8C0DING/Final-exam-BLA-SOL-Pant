import { Trophy } from "lucide-react";
import CupFill from "../components/CupFill";
import { useLang } from "../translations";

export default function ScanPage({ points, cupFillPoints = points }) {
  const t = useLang();
  const fullCupPoints = 10000;
  const pointsPerScan = 3000;
  const fillPercentage = Math.min(100, (cupFillPoints / fullCupPoints) * 100);
  const scanSteps = Math.floor(cupFillPoints / pointsPerScan);
  const cupScale = 1 + Math.min(0.08, scanSteps * 0.02);

  return (
    <div className="h-full w-full px-8 xl:px-16 pt-20 md:pt-24 pb-36 flex flex-col gap-1 text-white box-border max-w-[1600px] mx-auto items-center relative">
      <div className="relative z-30 text-center flex-none mt-2 md:mt-3 mb-5 md:mb-7">
        <h2 className="font-['Tilt_Warp',sans-serif] text-4xl md:text-5xl text-white mb-2">
          {t.scanYourCups}
        </h2>
        <p className="font-['Geist',sans-serif] text-sm md:text-base text-white/60">
          {t.scanSubtitle}
        </p>
      </div>

      <div className="flex-1 min-h-0 w-full max-w-md relative z-10 flex items-center justify-center pt-0 md:pt-0 -mt-3 md:-mt-4">
        <div className="absolute inset-0 bg-[#26448c] rounded-full filter blur-[100px] opacity-20 animate-pulse pointer-events-none" />
        <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[0.76] z-10 mx-auto">
          <CupFill fillPercentage={fillPercentage} scale={cupScale} />

          <div className="absolute -right-20 md:-right-24 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
            <div className="bg-[#26448c] border border-white/20 p-3 md:p-4 rounded-3xl shadow-2xl flex flex-col items-center">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#fd7727] mb-1" />
              <span className="font-['Tilt_Warp',sans-serif] text-xl md:text-2xl text-white">{points}</span>
              <span className="font-['Geist',sans-serif] text-[10px] md:text-xs text-white/50 uppercase tracking-wider">{t.pts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
