import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

export const BottomNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Home", icon: "/home-solid-icon.svg", path: "/" },
    { name: "Discover", icon: "/search-icon.svg", path: "/discover" },
    { name: "Inbox", icon: "/message-stroke-icon.svg", path: "/inbox" },
    { name: "Me", icon: "/account-stroke-icon.svg", path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="absolute w-[414px] h-[83px] top-[813px] left-0">
      <div className="absolute w-[414px] h-[83px] top-0 left-0 bg-black">
        {/* Home */}
        <div className="absolute top-2 left-[37px] flex flex-col items-center">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={() => navigate("/")}
          >
            <img
              className="w-6 h-6"
              alt="Home icon"
              src="/home-solid-icon.svg"
            />
          </Button>
          <div className={`[font-family:'Proxima_Nova-${isActive("/") ? "Semibold" : "Regular"}',Helvetica] font-normal text-white text-[10px] text-center tracking-[0.15px] leading-[normal] mt-1 ${!isActive("/") ? "opacity-60" : ""}`}>
            Home
          </div>
        </div>

        {/* Discover */}
        <div className="absolute top-2 left-[115px] flex flex-col items-center">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={() => navigate("/discover")}
          >
            <img
              className="w-6 h-6"
              alt="Discover icon"
              src="/search-icon.svg"
            />
          </Button>
          <div className={`[font-family:'Proxima_Nova-${isActive("/discover") ? "Semibold" : "Regular"}',Helvetica] font-normal text-white text-[10px] text-center tracking-[0.15px] leading-[normal] mt-1 ${!isActive("/discover") ? "opacity-60" : ""}`}>
            Discover
          </div>
        </div>

        {/* Create Button */}
        <div className="absolute top-2 left-[186px] flex flex-col items-center">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={() => navigate("/camera")}
          >
            <div className="relative w-[43px] h-7">
              <div className="absolute w-9 h-7 top-0 left-[7px] bg-[#e1306c] rounded-lg" />
              <div className="absolute w-9 h-7 top-0 left-0 bg-[#25f4ee] rounded-lg" />
              <div className="absolute w-9 h-7 top-0 left-1 bg-white rounded-lg flex items-center justify-center">
                <img
                  className="w-[13px] h-[13px]"
                  alt="Plus icon"
                  src="/plus-icon.svg"
                />
              </div>
            </div>
          </Button>
        </div>

        {/* Inbox */}
        <div className="absolute top-2 left-[290px] flex flex-col items-center">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={() => navigate("/inbox")}
          >
            <img
              className="w-6 h-6"
              alt="Inbox icon"
              src="/message-stroke-icon.svg"
            />
          </Button>
          <div className={`[font-family:'Proxima_Nova-${isActive("/inbox") ? "Semibold" : "Regular"}',Helvetica] font-normal text-white text-[10px] text-center tracking-[0.15px] leading-[normal] mt-1 ${!isActive("/inbox") ? "opacity-60" : ""}`}>
            Inbox
          </div>
        </div>

        {/* Me */}
        <div className="absolute top-2 left-[372px] flex flex-col items-center">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={() => navigate("/profile")}
          >
            <img
              className="w-6 h-6"
              alt="Me icon"
              src="/account-stroke-icon.svg"
            />
          </Button>
          <div className={`[font-family:'Proxima_Nova-${isActive("/profile") ? "Semibold" : "Regular"}',Helvetica] font-normal text-white text-[10px] text-center tracking-[0.15px] leading-[normal] mt-1 ${!isActive("/profile") ? "opacity-60" : ""}`}>
            Me
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute w-[134px] h-[5px] top-[61px] left-[140px] bg-white rounded-[100px]" />
    </div>
  );
};