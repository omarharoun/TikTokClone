import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/common/StatusBar";
import { BottomNavigation } from "../../components/common/BottomNavigation";

export const TiktokProfile = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");

  // Determine which profile to show based on URL params or state
  const isRobinProfile = location.state?.user === "robin";
  const isOwnProfile = location.pathname === "/profile" && !isRobinProfile;

  const profileData = isRobinProfile ? {
    username: "robin_blonde",
    displayName: "Robin Smith",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    bio: "🎬 Content creator & storyteller\n🌟 Living life one adventure at a time\n📍 Los Angeles, CA",
    email: "robin@email.com",
    following: "245",
    followers: "1.8M",
    likes: "8.9M"
  } : {
    username: "karene",
    displayName: "Karene Wilson",
    avatar: "/ellipse-3.png",
    bio: "✨ Creating magic moments through dance\n🎵 Music lover | Dance enthusiast | Dreamer\n📍 New York, NY",
    email: "karene@email.com",
    following: "180",
    followers: "3.2M",
    likes: "12.1M"
  };

  const profileStats = [
    { label: "Following", count: profileData.following },
    { label: "Followers", count: profileData.followers },
    { label: "Likes", count: profileData.likes },
  ];

  const videoThumbnails = isRobinProfile ? [
    { id: 1, thumbnail: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "890K", duration: "0:22" },
    { id: 2, thumbnail: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "567K", duration: "0:18" },
    { id: 3, thumbnail: "https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "445K", duration: "0:30" },
    { id: 4, thumbnail: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "334K", duration: "0:12" },
    { id: 5, thumbnail: "https://images.pexels.com/photos/1405964/pexels-photo-1405964.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "223K", duration: "0:25" },
    { id: 6, thumbnail: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "189K", duration: "0:16" },
  ] : [
    { id: 1, thumbnail: "/background.png", views: "1.2M", duration: "0:15" },
    { id: 2, thumbnail: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "890K", duration: "0:22" },
    { id: 3, thumbnail: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "567K", duration: "0:18" },
    { id: 4, thumbnail: "https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "445K", duration: "0:30" },
    { id: 5, thumbnail: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "334K", duration: "0:12" },
    { id: 6, thumbnail: "https://images.pexels.com/photos/1405964/pexels-photo-1405964.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "223K", duration: "0:25" },
  ];

  const likedVideos = [
    { id: 1, thumbnail: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "2.1M", duration: "0:20" },
    { id: 2, thumbnail: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "1.8M", duration: "0:15" },
    { id: 3, thumbnail: "https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", views: "1.5M", duration: "0:28" },
  ];

  const handleFollowClick = () => {
    setIsAnimating(true);
    setIsFollowing(!isFollowing);
    
    // Show love animation when following
    if (!isFollowing) {
      setShowLoveAnimation(true);
      setTimeout(() => setShowLoveAnimation(false), 1500);
    }
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleBackClick = () => {
    if (isRobinProfile) {
      // Go back to own profile when viewing Robin's profile
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-black w-[414px] h-[896px] relative">
        {/* Status Bar */}
        <StatusBar />

        {/* Love Animation Overlay */}
        {showLoveAnimation && (
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="relative">
              {/* Multiple hearts with different animations */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${Math.random() * 100 - 50}px`,
                    top: `${Math.random() * 100 - 50}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.5s'
                  }}
                >
                  <span className="text-red-500 text-2xl">❤️</span>
                </div>
              ))}
              {/* Central heart */}
              <div className="animate-bounce">
                <span className="text-red-500 text-6xl">❤️</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="absolute w-[414px] h-11 top-11 left-0 bg-black flex items-center justify-between px-4">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent"
            onClick={handleBackClick}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal]">
            {profileData.username}
          </div>
          {!isOwnProfile && (
            <Button
              variant="ghost"
              className="p-0 h-auto bg-transparent hover:bg-transparent"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </Button>
          )}
          {isOwnProfile && <div className="w-6"></div>}
        </header>

        {/* Scrollable Content */}
        <div className="absolute w-[414px] h-[758px] top-[88px] left-0 overflow-y-auto">
          <div className="px-4 pb-20">
            {/* Profile Avatar */}
            <div className="flex justify-center mt-8">
              <div className="relative">
                <Avatar className="w-28 h-28 border-2 border-[#fe2c55]">
                  <AvatarImage
                    src={profileData.avatar}
                    alt="Profile"
                    className="object-cover"
                  />
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#fe2c55] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Username and Verification */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center">
                <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[normal] mr-2">
                  @{profileData.username}
                </div>
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff99] text-base mt-1">
                {profileData.displayName}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              {profileStats.map((stat, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="text-center bg-transparent hover:bg-transparent p-2"
                >
                  <div>
                    <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal]">
                      {stat.count}
                    </div>
                    <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff99] text-sm tracking-[0] leading-[normal]">
                      {stat.label}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Bio */}
            <div className="text-center mt-6 px-4">
              {profileData.bio.split('\n').map((line, index) => (
                <div key={index} className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-relaxed">
                  {line}
                </div>
              ))}
              <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#fe2c55] text-base tracking-[0] leading-relaxed mt-2">
                📧 {profileData.email}
              </div>
            </div>

            {/* Action Buttons - Only show for other users */}
            {!isOwnProfile && (
              <div className="flex gap-3 mt-8 px-2">
                <Button 
                  className={`flex-1 rounded-xl py-4 transition-all duration-300 transform ${
                    isFollowing 
                      ? "bg-[#161823] hover:bg-[#161823]/90 text-white border border-[#ffffff33]" 
                      : "bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white"
                  } ${isAnimating ? 'scale-95' : 'scale-100'}`}
                  onClick={handleFollowClick}
                >
                  <span className={`transition-all duration-200 font-semibold ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                    {isFollowing ? "Following" : "Follow"}
                  </span>
                </Button>
                <Button className="flex-1 bg-[#161823] hover:bg-[#161823]/90 text-white rounded-xl py-4 border border-[#ffffff33] font-semibold">
                  Message
                </Button>
                <Button className="bg-[#161823] hover:bg-[#161823]/90 text-white rounded-xl px-4 py-4 border border-[#ffffff33]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </Button>
              </div>
            )}

            {/* Tab Navigation */}
            <div className={`flex ${isOwnProfile ? 'mt-10' : 'mt-10'} border-b border-[#ffffff33]`}>
              <Button
                variant="ghost"
                className={`flex-1 pb-4 bg-transparent hover:bg-transparent flex items-center justify-center ${
                  activeTab === "videos" ? "text-white border-b-2 border-white" : "text-[#ffffff66]"
                }`}
                onClick={() => setActiveTab("videos")}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
                  <path d="M7 7h4v4H7V7zm6 0h4v4h-4V7zM7 13h4v4H7v-4zm6 0h4v4h-4v-4z"/>
                </svg>
                <span className="font-semibold">Videos</span>
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 pb-4 bg-transparent hover:bg-transparent flex items-center justify-center ${
                  activeTab === "liked" ? "text-white border-b-2 border-white" : "text-[#ffffff66]"
                }`}
                onClick={() => setActiveTab("liked")}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-semibold">Liked</span>
              </Button>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-1 mt-6">
              {(activeTab === "videos" ? videoThumbnails : likedVideos).map((video, index) => (
                <div key={video.id} className="aspect-[3/4] bg-[#161823] rounded-lg overflow-hidden relative group">
                  <img
                    src={video.thumbnail}
                    alt={`Video ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute bottom-2 left-2 flex items-center">
                    <svg className="w-3 h-3 mr-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span className="text-white text-xs font-semibold">
                      {video.views}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="text-white text-xs font-semibold bg-black/50 px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      className="p-1 bg-black/50 hover:bg-black/70 rounded-full"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State for Liked Videos */}
            {activeTab === "liked" && likedVideos.length === 0 && (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div className="text-gray-400 text-lg">No liked videos yet</div>
                <div className="text-gray-500 text-sm mt-2">Videos you like will appear here</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Bar - Only show for own profile */}
        {isOwnProfile && <BottomNavigation />}
      </div>
    </div>
  );
};