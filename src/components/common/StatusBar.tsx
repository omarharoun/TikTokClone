import React from "react";

export const StatusBar = (): JSX.Element => {
  return (
    <div className="absolute w-[414px] h-11 top-0 left-0 z-50">
      <div className="absolute w-6 h-2.5 top-[17px] left-[375px]">
        <div className="absolute w-[22px] h-2.5 top-0 left-0 bg-[url(/combined-shape-1.svg)] bg-[100%_100%]">
          <div className="relative w-[18px] h-1.5 top-0.5 left-0.5 bg-white rounded-[1px]" />
        </div>
        <img
          className="absolute w-0.5 h-1 top-1 left-[23px]"
          alt="Combined shape"
          src="/combined-shape.svg"
        />
      </div>
      <img
        className="absolute w-[17px] h-[11px] top-4 left-[349px]"
        alt="Wifi"
        src="/wifi.svg"
      />
      <img
        className="absolute w-[19px] h-[11px] top-[17px] left-[324px]"
        alt="Mobile signal"
        src="/mobile-signal.svg"
      />
      <div className="absolute w-[60px] h-[18px] top-[13px] left-[23px] overflow-hidden">
        <div className="absolute w-[60px] -top-px left-0 [font-family:'SF_Pro_Text-Semibold',Helvetica] font-normal text-white text-[15px] text-center tracking-[-0.30px] leading-[normal]">
          9:41
        </div>
      </div>
    </div>
  );
};