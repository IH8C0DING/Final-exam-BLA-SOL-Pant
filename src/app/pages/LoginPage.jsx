import { QrCode } from "lucide-react";
import { useLang } from "../translations";

export default function LoginPage({ onLogin }) {
  const t = useLang();
  const handleInteraction = (e) => {
    e.stopPropagation();
    if (onLogin) onLogin();
  };

  return (
    <div
      className="absolute inset-0 z-[9999] bg-[#26448c] flex flex-col items-center justify-center cursor-pointer text-white overflow-hidden touch-none"
      onClick={handleInteraction}
      onPointerDown={handleInteraction}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#26448c]">
        <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[90px] opacity-65 animate-pulse" />
        <div className="absolute -bottom-[20%] right-[10%] w-[70vw] h-[70vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6 w-full">
        <h1 className="font-['Tilt_Warp',sans-serif] text-4xl md:text-6xl tracking-tight text-white mb-4 whitespace-nowrap">
          BLÅ SOL Pant
        </h1>
        <p className="font-['Geist',sans-serif] text-xl md:text-2xl text-white/60 mb-16 md:mb-24">
          {t.loginTagline}
        </p>

        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[6px] bg-gradient-to-br from-[#96d4e5] via-white/60 to-[#26448c]/40 animate-pulse mb-10 shadow-[0_0_40px_rgba(150,212,229,0.25)]">
          <div className="w-full h-full rounded-full bg-[#516ab8] flex items-center justify-center">
            <QrCode className="w-12 h-12 md:w-16 md:h-16 text-white/90" />
          </div>
        </div>

        <h2 className="font-['Tilt_Warp',sans-serif] text-3xl md:text-5xl text-white mb-6">
          {t.scanWristband}
        </h2>
      </div>
    </div>
  );
}
