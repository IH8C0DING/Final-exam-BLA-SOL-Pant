import { useLang } from "../translations";
import MapImg from "../../assets/radar.png";

export default function MapPage() {
  const t = useLang();
  return (
    <div className="h-full w-full px-8 xl:px-16 pt-30 md:pt-34 pb-28 flex flex-col gap-6 text-white box-border overflow-hidden">
      <div className="flex-none px-4 mt-8">
        <h2 className="font-['Tilt_Warp',sans-serif] text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2 drop-shadow-md">
          {t.radar}
        </h2>
        <p className="font-['Geist',sans-serif] font-light text-sm text-white/60 max-w-[350px]">
          {t.radarSubtitle}
        </p>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center w-full">
        <div className="relative w-full max-w-[1400px] h-[45vh] md:h-[55vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black/10">
          <img src={MapImg} alt="Festival Map" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 flex flex-row gap-2 z-10">
            <button className="w-11 h-11 bg-white/30 backdrop-blur-md border border-white/50 rounded-xl text-white font-bold text-2xl flex items-center justify-center hover:bg-white/50 transition-colors shadow-lg">+</button>
            <button className="w-11 h-11 bg-white/30 backdrop-blur-md border border-white/50 rounded-xl text-white font-bold text-2xl flex items-center justify-center hover:bg-white/50 transition-colors shadow-lg">−</button>
          </div>
        </div>
      </div>
    </div>
  );
}
