import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { StatusBar } from "../../components/common/StatusBar";
import { BottomNavigation } from "../../components/common/BottomNavigation";

export const TiktokHome = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);

  const videos = [
    {
      id: 1,
      user: "karene",
      avatar: "/ellipse-3.png",
      background: "/background.png",
      description: "#avicii #wflove",
      music: "Avicii - Waiting For Love (ft.",
      likes: "4445",
      comments: "64",
      date: "1-28"
    },
    {
      id: 2,
      user: "robin_blonde",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      background: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=414&h=896&fit=crop",
      description: "#dance #viral #fyp #blonde",
      music: "Dua Lipa - Levitating",
      likes: "8.2K",
      comments: "156",
      date: "2-15"
    },
    {
      id: 3,
      user: "karene",
      avatar: "/ellipse-3.png",
      background: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=414&h=896&fit=crop",
      description: "#music #vibes #sunset",
      music: "The Weeknd - Blinding Lights",
      likes: "12.5K",
      comments: "89",
      date: "3-02"
    }
  ];

  const currentVideo = videos[currentVideoIndex];

  // Handle like button click with animation
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    
    // Show love animation when liking
    if (!isLiked) {
      setShowLoveAnimation(true);
      setTimeout(() => setShowLoveAnimation(false), 1500);
    }
  };

  // Interaction buttons data
  const interactionButtons = [
    { 
      icon: "/heart-icon.png", 
      count: currentVideo.likes, 
      label: "", 
      action: handleLikeClick,
      isLiked: isLiked
    },
    { icon: "/message-icon.png", count: currentVideo.comments, label: "", action: () => navigate("/comments") },
    { icon: "/share-icon.png", count: "", label: "Share" },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    
    // Add visual feedback during swipe
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${-diff * 0.5}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    
    // Reset transform
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateY(0px)';
    }
    
    // Swipe threshold
    if (Math.abs(diff) > 100) {
      if (diff > 0 && currentVideoIndex < videos.length - 1) {
        // Swipe up - next video
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else if (diff < 0 && currentVideoIndex > 0) {
        // Swipe down - previous video
        setCurrentVideoIndex(currentVideoIndex - 1);
      }
    }
    
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    const diff = startY - currentY;
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${-diff * 0.5}px)`;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const endY = e.clientY;
    const diff = startY - endY;
    
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateY(0px)';
    }
    
    if (Math.abs(diff) > 100) {
      if (diff > 0 && currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else if (diff < 0 && currentVideoIndex > 0) {
        setCurrentVideoIndex(currentVideoIndex - 1);
      }
    }
    
    setIsDragging(false);
  };

  const handleUserClick = () => {
    if (currentVideo.user === "robin_blonde") {
      navigate("/profile", { state: { user: "robin" } });
    } else {
      navigate("/profile");
    }
  };

  // Reset like state when video changes
  useEffect(() => {
    setIsLiked(false);
  }, [currentVideoIndex]);

  return (
    <div className="bg-black w-full min-h-screen responsive">
      <div 
        ref={containerRef}
        className="bg-cover bg-center w-full min-h-screen relative transition-transform duration-200 ease-out responsive"
        style={{ backgroundImage: `url(${currentVideo.background})` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Love Animation Overlay - Big White Heart */}
        {showLoveAnimation && (
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="animate-bounce">
              <span className="text-white text-8xl drop-shadow-2xl filter brightness-110">❤️</span>
            </div>
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
          {interactionButtons.map((button, index) => (
            <div key={index} className="flex flex-col items-center opacity-90">
              <Button
                variant="ghost"
                className="p-0 h-auto bg-transparent hover:bg-transparent transition-transform duration-200 hover:scale-110 min-w-[48px] min-h-[48px]"
                onClick={button.action}
              >
                {index === 0 ? (
                  // Heart button - filled when liked, outline when not
                  <svg 
                    className={`w-12 h-12 transition-all duration-300 ${
                      button.isLiked ? 'text-red-500' : 'text-white'
                    }`} 
                    fill={button.isLiked ? "currentColor" : "none"}
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={button.isLiked ? 0 : 2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                ) : (
                  <img
                    className="w-12 h-12"
                    alt={`${button.label || "Interaction"} icon`}
                    src={button.icon}
                  />
                )}
              </Button>
              <div className={`[text-shadow:1px_1px_0px_#0000004c] [font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-[14px] text-center tracking-[0] leading-[normal] shadow-text-drop mt-2 transition-colors duration-300 ${
                index === 0 && button.isLiked ? 'text-red-500' : 'text-white'
              }`}>
                {button.count || button.label}
              </div>
            </div>
          ))}
        </div>

        {/* Video Info Section */}
        <Card className="absolute bottom-24 left-4 right-4 bg-transparent border-none shadow-none">
          <CardContent className="p-0">
            <div className="w-full">
              <Button
                variant="ghost"
                className="w-full text-left p-0 h-auto bg-transparent hover:bg-transparent [font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[18px] tracking-[0] leading-[normal]"
                onClick={handleUserClick}
              >
                <span className="text-white">@{currentVideo.user}</span>
                <span className="text-[#ffffff99]"> · </span>
                <span className="text-[#ffffff99] text-[16px]">{currentVideo.date}</span>
              </Button>
              <div className="w-full mt-3 [font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[20px]">
                {currentVideo.description}
              </div>
            </div>

            <div className="w-full h-6 mt-4 flex items-center">
              <img
                className="w-4 h-4 mr-3"
                alt="Music icon"
                src="/music-icon.svg"
              />
              <div className="flex-1 [background:linear-gradient(270deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.9)_5%,rgba(255,255,255,0.9)_96%,rgba(255,255,255,0)_100%,rgba(255,255,255,0)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[20px]">
                {currentVideo.music}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Swipe Instruction */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
          Swipe up for next video
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavigation />
      </div>
    </div>
  );
};