import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { StatusBar } from "../../components/common/StatusBar";
import { BottomNavigation } from "../../components/common/BottomNavigation";

export const TiktokFollowing = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-black w-[414px] h-[896px] relative">
        {/* Status Bar - Clean version */}
        <div className="absolute w-[414px] h-11 top-0 left-0 z-50">
          <div className="absolute w-[60px] h-[18px] top-[13px] left-[23px] overflow-hidden">
            <div className="absolute w-[60px] -top-px left-0 [font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-white text-[15px] text-center tracking-[-0.30px] leading-[normal]">
              9:41
            </div>
          </div>
          <img
            className="absolute w-[19px] h-[11px] top-[17px] left-[324px]"
            alt="Mobile signal"
            src="/mobile-signal.svg"
          />
          <img
            className="absolute w-[17px] h-[11px] top-4 left-[349px]"
            alt="Wifi"
            src="/wifi.svg"
          />
          <div className="absolute w-6 h-2.5 top-[17px] left-[375px]">
            <div className="absolute w-[22px] h-2.5 top-0 left-0 bg-[url(/combined-shape-1.svg)] bg-[100%_100%]">
              <div className="relative w-[18px] h-1.5 top-0.5 left-0.5 bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Header Navigation */}
        <header className="absolute w-[414px] h-11 top-11 left-0 bg-transparent">
          <div className="absolute top-3 left-[132px] [font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Following
          </div>
          <Button
            variant="ghost"
            className="absolute top-2.5 left-[223px] [font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-[#ffffff99] text-lg text-center tracking-[0] leading-[normal] p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={() => navigate("/")}
          >
            For You
          </Button>
          <Separator
            className="absolute w-px h-3 top-4 left-[214px] bg-white/60"
            orientation="vertical"
          />
        </header>

        {/* Content Area - Following Feed */}
        <div className="absolute w-[414px] h-[758px] top-[88px] left-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-2xl mb-4">Following Feed</div>
            <div className="text-gray-400">Videos from people you follow will appear here</div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavigation />
      </div>
    </div>
  );
};