import React, { useState } from "react";
import { StatusBar } from "../../components/common/StatusBar";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Button } from "../../components/ui/button";

export const TiktokDiscover = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Top");

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

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-black w-[414px] h-[896px] relative">
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <header className="absolute w-[414px] h-11 top-11 left-0 bg-black flex items-center justify-center">
          <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal]">
            Discover
          </div>
        </header>

        {/* Search Bar */}
        <div className="absolute w-[374px] h-10 top-[76px] left-5 bg-[#161823] rounded-lg flex items-center px-3">
          <img
            className="w-4 h-4 mr-2"
            alt="Search icon"
            src="/search-icon.svg"
          />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
          />
        </div>

        {/* Tab Navigation */}
        <div className="absolute w-[414px] top-[130px] left-0">
          <div className="flex px-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`px-4 py-2 mr-4 whitespace-nowrap bg-transparent hover:bg-transparent ${
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
        <div className="absolute w-[414px] h-[583px] top-[180px] left-0 px-4 overflow-y-auto">
          {activeTab === "Top" && (
            <div>
              {/* Trending Section */}
              <div className="mb-6">
                <h3 className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg mb-4">
                  Trending Hashtags
                </h3>
                <div className="space-y-3">
                  {trendingHashtags.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-base">
                          {item.tag}
                        </div>
                        <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-sm">
                          {item.views} views
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-[#fe2c55] to-[#25f4ee] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">#</span>
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
                <div className="space-y-3">
                  {suggestedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-12 h-12 rounded-full object-cover mr-3"
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
                      <Button className="bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white px-6 py-2 rounded-lg">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== "Top" && (
            <div className="flex items-center justify-center h-full">
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
    </div>
  );
};