export default function AnimatedGradientBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#26448c]">
        <div
          className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[120px] opacity-50"
          style={{ animation: 'float1 22s ease-in-out infinite' }}
        />
        <div
          className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[100px] opacity-35"
          style={{ animation: 'float2 17s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-[20%] left-[10%] w-[70vw] h-[70vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[130px] opacity-30"
          style={{ animation: 'float3 28s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <style>{`
        @keyframes float1 {
          0%   { transform: translate(0, 0) scale(1); }
          15%  { transform: translate(35%, 55%) scale(1.2); }
          35%  { transform: translate(65%, 20%) scale(1.4); }
          55%  { transform: translate(25%, 75%) scale(1.1); }
          75%  { transform: translate(55%, 40%) scale(1.35); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float2 {
          0%   { transform: translate(0, 0) scale(1); }
          20%  { transform: translate(-45%, -35%) scale(0.82); }
          42%  { transform: translate(-70%, -55%) scale(0.7); }
          65%  { transform: translate(-25%, -65%) scale(0.88); }
          82%  { transform: translate(-58%, -20%) scale(0.76); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float3 {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(55%, -45%) scale(1.15); }
          50%  { transform: translate(80%, -65%) scale(1.3); }
          72%  { transform: translate(35%, -25%) scale(0.9); }
          88%  { transform: translate(65%, -50%) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </>
  );
}
