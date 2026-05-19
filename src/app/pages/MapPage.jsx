import { useLang } from "../translations";
import MapImg from "../../assets/radar.png";

export default function MapPage() {
  const t = useLang();
  return (
    <div className="h-full w-full px-8 pt-20 pb-24 md:pb-28 flex flex-col gap-6 text-white box-border max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex-none px-4">
        <h2 className="font-['Tilt_Warp',sans-serif] text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2 drop-shadow-md">
          {t.radar}
        </h2>
        <p className="font-['Geist',sans-serif] font-light text-sm text-white/60 max-w-[350px]">
          {t.radarSubtitle}
        </p>
      </div>

      <div className="flex-1 min-h-0 relative w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        <img src={MapImg} alt="Festival Map" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
