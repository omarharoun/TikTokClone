import React, { useState, useEffect } from "react";
import { StatusBar } from "../../components/common/StatusBar";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Button } from "../../components/ui/button";
import { videoHelpers, Video } from "../../lib/pocketbase";

export const TiktokDiscover = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Top");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = ["Top", "Users", "Videos", "Sounds", "LIVE", "Hashtags"];

  const trendingHashtags = [
    { tag: "#fyp", views: "1.2B" },
    { tag: "#viral", views: "890M" },
    { tag: "#dance", views: "567M" },
    { tag: "#comedy", views: "445M" },
    { tag: "#music", views: "334M" },
    { tag: "#trending", views: "223M" },
  ];

  const suggestedUsers = [
    { username: "charlidamelio", followers: "151M", avatar: "/ellipse-3.png" },
    { username: "addisonre", followers: "88M", avatar: "/ellipse-2.png" },
    { username: "zachking", followers: "70M", avatar: "/ellipse-3.png" },
  ];

  // Load videos when component mounts
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const result = await videoHelpers.getFeedVideos(1, 20);
      if (result.success && result.videos) {
        const mappedVideos = result.videos.map((video: any) => ({
          id: video.id,
          user: video.user,
          user_expand: video.expand?.user,
          title: video.title,
          description: video.description,
          video_url: video.video_url,
          thumbnail_url: video.thumbnail_url,
          duration: video.duration,
          views_count: video.views_count,
          likes_count: video.likes_count,
          comments_count: video.comments_count,
          shares_count: video.shares_count,
          music_name: video.music_name,
          music_artist: video.music_artist,
          hashtags: video.hashtags || [],
          created: video.created,
          updated: video.updated
        })) as Video[];
        setVideos(mappedVideos);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLastVideo = async () => {
    if (videos.length === 0) {
      alert("No videos to delete");
      return;
    }

    const lastVideo = videos[videos.length - 1];
    const confirmed = window.confirm(`Are you sure you want to delete "${lastVideo.title}"?`);
    
    if (confirmed) {
      try {
        const result = await videoHelpers.deleteVideo(lastVideo.id);
        if (result.success) {
          setVideos(videos.slice(0, -1));
          alert("Video deleted successfully!");
        } else {
          alert(`Failed to delete video: ${result.error}`);
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Failed to delete video");
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-black w-full min-h-screen responsive">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <header className="w-full h-12 bg-black flex items-center justify-center sticky top-0 z-10">
        <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal]">
          Discover
        </div>
      </header>

      {/* Search Bar */}
      <div className="w-full px-4 mt-2">
        <div className="w-full h-12 bg-[#161823] rounded-lg flex items-center px-3">
          <img
            className="w-5 h-5 mr-3"
            alt="Search icon"
            src="/search-icon.svg"
          />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="w-full mt-3">
        <div className="flex px-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              className={`px-4 py-3 mr-4 whitespace-nowrap bg-transparent hover:bg-transparent ${
                activeTab === tab
                  ? "text-white border-b-2 border-white"
                  : "text-[#ffffff66]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full px-4 pb-24 overflow-y-auto">
        {activeTab === "Top" && (
          <div>
            {/* Delete Last Video Button */}
            {videos.length > 0 && (
              <div className="mb-4">
                <Button 
                  onClick={deleteLastVideo}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-base font-medium"
                >
                  🗑️ Delete Last Video
                </Button>
              </div>
            )}

            {/* Trending Section */}
            <div className="mb-6">
              <h3 className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg mb-4">
                Trending Hashtags
              </h3>
              <div className="space-y-4">
                {trendingHashtags.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3">
                    <div>
                      <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-base">
                        {item.tag}
                      </div>
                      <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-sm">
                        {item.views} views
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#fe2c55] to-[#25f4ee] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">#</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div>
              <h3 className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg mb-4">
                Suggested for you
              </h3>
              <div className="space-y-4">
                {suggestedUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-base">
                          @{user.username}
                        </div>
                        <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-sm">
                          {user.followers} followers
                        </div>
                      </div>
                    </div>
                    <Button className="bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white px-6 py-3 rounded-lg text-base">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Videos" && (
          <div>
            {/* Delete Last Video Button */}
            {videos.length > 0 && (
              <div className="mb-4">
                <Button 
                  onClick={deleteLastVideo}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-base font-medium"
                >
                  🗑️ Delete Last Video
                </Button>
              </div>
            )}

            {/* Videos Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-white text-lg">Loading videos...</div>
              </div>
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {videos.map((video) => (
                  <div key={video.id} className="aspect-[3/4] bg-[#161823] rounded-lg overflow-hidden relative group">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#fe2c55] to-[#25f4ee] flex items-center justify-center">
                        <span className="text-white text-3xl">🎥</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span className="text-white text-sm font-semibold">
                        {formatNumber(video.views_count)}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        className="p-2 bg-black/50 hover:bg-black/70 rounded-full"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="text-white text-xl mb-2">No videos found</div>
                  <div className="text-gray-400">Videos will appear here when uploaded</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab !== "Top" && activeTab !== "Videos" && (
          <div className="flex items-center justify-center h-full py-12">
            <div className="text-center">
              <div className="text-white text-xl mb-2">{activeTab}</div>
              <div className="text-gray-400">Content for {activeTab} will appear here</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavigation />
    </div>
  );
};