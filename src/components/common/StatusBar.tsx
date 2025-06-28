import React from "react";

export const StatusBar = (): JSX.Element => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-12 z-50 mobile-safe-area">
      <div className="w-full h-full relative flex items-center justify-between px-4">
        {/* Time */}
        <div className="flex items-center">
          <div className="[font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-white text-[15px] tracking-[-0.30px] leading-[normal]">
            9:41
          </div>
        </div>

        {/* Status Icons */}
        <div className="flex items-center space-x-1">
          {/* Mobile Signal */}
          <img
            className="w-5 h-3"
            alt="Mobile signal"
            src="/mobile-signal.svg"
          />
          
          {/* WiFi */}
          <img
            className="w-4 h-3"
            alt="Wifi"
            src="/wifi.svg"
          />
          
          {/* Battery */}
          <div className="relative w-6 h-3">
            <div className="absolute w-6 h-3 bg-[url(/combined-shape-1.svg)] bg-[100%_100%]">
              <div className="relative w-5 h-2 top-0.5 left-0.5 bg-white rounded-[1px]" />
            </div>
            <img
              className="absolute w-0.5 h-1 top-1 left-6"
              alt="Combined shape"
              src="/combined-shape.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};