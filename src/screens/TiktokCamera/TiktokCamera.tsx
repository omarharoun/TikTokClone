import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/common/StatusBar";

export const TiktokCamera = (): JSX.Element => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState("1x");
  const [selectedTimer, setSelectedTimer] = useState("Off");

  const speeds = ["0.3x", "0.5x", "1x", "2x", "3x"];
  const timers = ["Off", "3s", "10s"];
  const filters = ["Normal", "Portrait", "Food", "Vibe", "G6"];

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-black w-[414px] h-[896px] relative">
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <header className="absolute w-[414px] h-11 top-11 left-0 bg-black/50 flex items-center justify-between px-4 z-10">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent text-white"
            onClick={() => navigate("/")}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </Button>
          <div className="flex-1" />
        </header>

        {/* Camera Viewfinder */}
        <div className="absolute w-[414px] h-[896px] top-0 left-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-32 h-32 border-2 border-white/30 rounded-full flex items-center justify-center mb-4">
                <div className="w-24 h-24 border border-white/50 rounded-full flex items-center justify-center">
                  <img className="w-12 h-12" alt="Camera" src="/plus-icon.svg" />
                </div>
              </div>
              <div className="text-sm text-white/70">Tap to record</div>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="absolute right-4 top-[150px] flex flex-col items-center gap-8 z-10">
          {/* Flip Camera */}
          <Button
            variant="ghost"
            className="w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>

          {/* Speed Controls */}
          <div className="flex flex-col items-center">
            <div className="text-white text-xs mb-2 font-medium">Speed</div>
            <div className="flex flex-col gap-1">
              {speeds.map((speed) => (
                <Button
                  key={speed}
                  variant="ghost"
                  className={`w-10 h-7 text-xs rounded-full transition-all ${
                    selectedSpeed === speed
                      ? "bg-white text-black font-semibold"
                      : "bg-black/40 text-white hover:bg-black/60"
                  }`}
                  onClick={() => setSelectedSpeed(speed)}
                >
                  {speed}
                </Button>
              ))}
            </div>
          </div>

          {/* Beauty Filter */}
          <Button
            variant="ghost"
            className="w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-lg">✨</span>
          </Button>

          {/* Color Filters */}
          <Button
            variant="ghost"
            className="w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-lg">🎨</span>
          </Button>

          {/* Timer Controls */}
          <div className="flex flex-col items-center">
            <div className="text-white text-xs mb-2 font-medium">Timer</div>
            <div className="flex flex-col gap-1">
              {timers.map((timer) => (
                <Button
                  key={timer}
                  variant="ghost"
                  className={`w-10 h-7 text-xs rounded-full transition-all ${
                    selectedTimer === timer
                      ? "bg-white text-black font-semibold"
                      : "bg-black/40 text-white hover:bg-black/60"
                  }`}
                  onClick={() => setSelectedTimer(timer)}
                >
                  {timer}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center px-4 z-10">
          <div className="flex items-center justify-between w-full max-w-sm">
            {/* Effects */}
            <Button
              variant="ghost"
              className="text-white bg-transparent hover:bg-transparent flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center mb-1">
                <span className="text-xl">✨</span>
              </div>
              <div className="text-xs">Effects</div>
            </Button>

            {/* Record Button */}
            <Button
              variant="ghost"
              className="p-0 h-auto bg-transparent hover:bg-transparent"
              onClick={() => setIsRecording(!isRecording)}
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                  isRecording ? "bg-red-500 border-red-500" : "bg-transparent"
                }`}>
                  <div className={`w-12 h-12 rounded-full transition-all ${
                    isRecording ? "bg-white" : "bg-red-500"
                  }`} />
                </div>
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-pulse" />
                )}
              </div>
            </Button>

            {/* Upload */}
            <Button
              variant="ghost"
              className="text-white bg-transparent hover:bg-transparent flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center mb-1">
                <img className="w-6 h-6" alt="Upload" src="/plus-icon.svg" />
              </div>
              <div className="text-xs">Upload</div>
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="absolute bottom-32 left-0 right-0 z-10">
          <div className="flex justify-center gap-2 px-4 overflow-x-auto">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                className="px-4 py-2 bg-black/30 hover:bg-black/50 text-white text-xs rounded-full whitespace-nowrap"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Recording Timer */}
        {isRecording && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              00:05
            </div>
          </div>
        )}
      </div>
    </div>
  );
};