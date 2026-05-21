import { useState } from "react";
import { Crown } from "lucide-react";
import CurrentBalanceHeader from "../components/CurrentBalanceHeader";
import { useLang } from "../translations";
import VipImg     from "../../assets/vip.png";
import BeerImg    from "../../assets/beer.png";
import SodaImg    from "../../assets/soda.png";
import WaterImg   from "../../assets/water.png";
import FoodImg    from "../../assets/food.png";
import ShirtImg   from "../../assets/shirt.png";
import HatImg     from "../../assets/hat.png";
import KeychainImg from "../../assets/keychain.png";
import PlushImg   from "../../assets/plush.png";
import BagImg     from "../../assets/bag.png";
import ArtistImg  from "../../assets/artist.png";
import TourImg    from "../../assets/tour.png";
import TicketImg  from "../../assets/ticket.png";

const ALL_REWARDS = [
  { id: 1,  name: "Beer Voucher",      points: 500,   type: "drinks",     tier: "repeatable", img: BeerImg },
  { id: 2,  name: "Soft Drink",        points: 300,   type: "drinks",     tier: "repeatable", img: SodaImg },
  { id: 17, name: "Water",             points: 200,   type: "drinks",     tier: "repeatable", img: WaterImg },
  { id: 4,  name: "Food Voucher",      points: 750,   type: "food",       tier: "repeatable", img: FoodImg },
  { id: 3,  name: "Festival T-Shirt",  points: 1000,  type: "merch",      tier: "repeatable", img: ShirtImg },
  { id: 36, name: "Hat",               points: 650,   type: "merch",      tier: "repeatable", img: HatImg },
  { id: 37, name: "Keychain",          points: 200,   type: "merch",      tier: "repeatable", img: KeychainImg },
  { id: 5,  name: "Plushy",            points: 1200,  type: "merch",      tier: "repeatable", img: PlushImg },
  { id: 11, name: "Tote Bag",          points: 800,   type: "merch",      tier: "repeatable", img: BagImg },
  { id: 7,  name: "VIP Viewing Spot",  points: 5000,  type: "experience", tier: "one-time",   img: VipImg },
  { id: 8,  name: "Meet the Artist",   points: 10000, type: "experience", tier: "one-time",   img: ArtistImg },
  { id: 12, name: "Backstage Tour",    points: 15000, type: "experience", tier: "one-time",   img: TourImg },
  { id: 9,  name: "Ticket -50%",       points: 8000,  type: "ticket",     tier: "one-time",   img: TicketImg },
];

const CATEGORIES = {
  "repeatable": ["drinks", "food", "merch"],
  "one-time":   ["experience", "ticket"],
};

export default function RewardsPage({ points = 750, onClaim }) {
  const t = useLang();
  const [activeTab, setActiveTab] = useState("repeatable");
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [claimedIds, setClaimedIds] = useState([]);
  const [temporaryClaimedIds, setTemporaryClaimedIds] = useState([]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setActiveCategory(CATEGORIES[tab][0]);
  };

  const handleClaim = (reward) => {
    if (!reward.available || reward.claimed || temporaryClaimedIds.includes(reward.id)) return;
    if (reward.tier === "one-time") {
      setClaimedIds(prev => [...prev, reward.id]);
    } else {
      setTemporaryClaimedIds(prev => [...prev, reward.id]);
      window.setTimeout(() => {
        setTemporaryClaimedIds(prev => prev.filter(id => id !== reward.id));
      }, 3000);
    }
    if (onClaim) onClaim(reward.points, reward.id, reward.name);
  };

  const filtered = ALL_REWARDS
    .filter(r => r.tier === activeTab && r.type === activeCategory)
    .map(r => ({ ...r, available: points >= r.points, claimed: claimedIds.includes(r.id) }));

  return (
    <div className="h-full w-full flex flex-col text-white pt-24 pb-28 px-8 xl:px-16 gap-3 max-w-[1600px] mx-auto overflow-hidden">
      <CurrentBalanceHeader points={points} />

      <div className="flex-none flex p-1.5 mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-inner w-max">
        <button
          onClick={() => switchTab("repeatable")}
          className={`py-2 px-6 md:py-3 md:px-8 rounded-full font-['Geist',sans-serif] text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
            activeTab === "repeatable"
              ? "bg-[#fd7727] text-white shadow-[0_0_20px_rgba(253,119,39,0.6)] scale-105"
              : "text-white/50"
          }`}
        >
          {t.repeatable}
        </button>
        <button
          onClick={() => switchTab("one-time")}
          className={`py-2 px-6 md:py-3 md:px-8 rounded-full font-['Geist',sans-serif] text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex gap-2 items-center ${
            activeTab === "one-time"
              ? "bg-[#fd7727] text-white shadow-[0_0_20px_rgba(253,119,39,0.6)] scale-105"
              : "text-white/50"
          }`}
        >
          <Crown className={`w-3.5 h-3.5 ${activeTab === "one-time" ? "text-white" : "text-white/50"}`} />
          {t.oneTimeOnly}
        </button>
      </div>

      <div className="flex-none flex gap-2 overflow-x-auto hide-scrollbar">
        {CATEGORIES[activeTab].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-none py-1.5 px-4 md:px-5 rounded-full font-['Geist',sans-serif] text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-all duration-300 capitalize ${
              activeCategory === cat
                ? "bg-[#fd7727] text-white shadow-[0_0_20px_rgba(253,119,39,0.5)]"
                : "bg-white/5 text-white/50 border border-white/10"
            }`}
          >
            {t.categories[cat] || cat}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex flex-row gap-3 items-stretch justify-start">
        {filtered.map(reward => {
          const tempClaimed = temporaryClaimedIds.includes(reward.id);
          const isDimmed = !reward.available || reward.claimed;
          return (
            <div key={reward.id} className="flex-1 min-w-0 max-w-[calc(20%_-_0.6rem)] h-full">
              <div className={`w-full h-full bg-[#26448c]/90 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] border p-4 md:p-5 flex flex-col shadow-2xl relative overflow-hidden ${
                reward.available && !reward.claimed ? "border-[#96d4e5]/40" : "border-white/10"
              }`}>

                <div className="flex-1 min-h-0 rounded-xl md:rounded-2xl flex items-center justify-center bg-black/60 border border-white/10 mb-4">
                  {reward.img ? (
                    <img src={reward.img} alt={t.rewardNames[reward.name] || reward.name} className={`w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg ${isDimmed ? "opacity-30" : "opacity-100"}`} />
                  ) : (
                    <reward.icon className={`w-12 h-12 md:w-16 md:h-16 ${isDimmed ? "text-white/30" : reward.iconColor} drop-shadow-lg`} />
                  )}
                </div>

                <div className="shrink-0 flex flex-col gap-1 mb-3 md:mb-4">
                  <div className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[8px] md:text-[10px] uppercase tracking-widest text-white/60 w-fit">
                    {reward.type}
                  </div>
                  <h3 className="font-['Tilt_Warp',sans-serif] text-lg md:text-xl leading-tight text-white">
                    {t.rewardNames[reward.name] || reward.name}
                  </h3>
                  <div className="font-['Tilt_Warp',sans-serif] text-base md:text-lg text-white/90">
                    {reward.points} <span className="text-[10px] md:text-xs font-['Geist',sans-serif] text-[#fd7727]">pts</span>
                  </div>
                </div>

                <button
                  onClick={() => handleClaim(reward)}
                  disabled={!reward.available || reward.claimed}
                  className={`shrink-0 w-full py-2.5 md:py-3 rounded-full font-['Geist',sans-serif] text-[9px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 flex justify-center items-center ${
                    reward.claimed
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed"
                      : tempClaimed
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : reward.available
                          ? "bg-[#fd7727] text-white shadow-[0_0_20px_rgba(253,119,39,0.55)]"
                          : "bg-white/5 text-white/50 border-2 border-dashed border-white/20 cursor-not-allowed"
                  }`}
                >
                  {reward.claimed || tempClaimed ? t.claimed : reward.available ? t.claimReward : t.notEnough}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
