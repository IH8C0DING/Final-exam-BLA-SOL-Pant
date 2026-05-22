import { useState, useEffect, useRef } from "react";
import { useLang } from "../translations";
import MapImg from "../../assets/radar.png";

export default function MapPage({ isActive }) {
  const t = useLang();
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setZoom(1);
      setPos({ x: 0, y: 0 });
    }
  }, [isActive]);

  const clamp = (x, y, z) => {
    if (!containerRef.current) return { x, y };
    const { width, height } = containerRef.current.getBoundingClientRect();
    const maxX = (width * (z - 1)) / 2;
    const maxY = (height * (z - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const startDrag = (clientX, clientY) => {
    if (zoom <= 1) return;
    setDragging(true);
    dragRef.current = { startX: clientX - pos.x, startY: clientY - pos.y };
  };

  const moveDrag = (clientX, clientY) => {
    if (!dragRef.current) return;
    const raw = { x: clientX - dragRef.current.startX, y: clientY - dragRef.current.startY };
    setPos(clamp(raw.x, raw.y, zoom));
  };

  const endDrag = () => {
    setDragging(false);
    dragRef.current = null;
  };

  const handleZoomChange = (delta) => {
    setZoom(z => {
      const nz = Math.max(1, Math.min(4, +(z + delta).toFixed(2)));
      if (nz === 1) setPos({ x: 0, y: 0 });
      else setPos(p => clamp(p.x, p.y, nz));
      return nz;
    });
  };

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
        <div
          ref={containerRef}
          className="relative w-full max-w-[1400px] h-[45vh] md:h-[55vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black/10"
          style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default" }}
          onMouseDown={e => startDrag(e.clientX, e.clientY)}
          onMouseMove={e => moveDrag(e.clientX, e.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={endDrag}
        >
          <img
            src={MapImg}
            alt="Festival Map"
            draggable={false}
            className="w-full h-full object-cover select-none"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
              transformOrigin: "center",
              transition: dragging ? "none" : "transform 0.25s ease-out",
            }}
          />
          <div className="absolute bottom-4 left-4 flex flex-row gap-2 z-10">
            <button
              onClick={() => handleZoomChange(0.25)}
              className="w-11 h-11 bg-white/30 backdrop-blur-md border border-white/50 rounded-xl text-white font-bold text-2xl flex items-center justify-center hover:bg-white/50 transition-colors shadow-lg"
            >+</button>
            <button
              onClick={() => handleZoomChange(-0.25)}
              className="w-11 h-11 bg-white/30 backdrop-blur-md border border-white/50 rounded-xl text-white font-bold text-2xl flex items-center justify-center hover:bg-white/50 transition-colors shadow-lg"
            >−</button>
          </div>
        </div>
      </div>
    </div>
  );
}
