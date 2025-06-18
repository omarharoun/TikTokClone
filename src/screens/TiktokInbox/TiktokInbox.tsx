import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/common/StatusBar";
import { BottomNavigation } from "../../components/common/BottomNavigation";
import { Button } from "../../components/ui/button";

export const TiktokInbox = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All activity");
  const [showMessages, setShowMessages] = useState(false);
  const [showPeopleSearch, setShowPeopleSearch] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All activity", "Likes", "Comments", "Mentions", "Followers"];

  const notifications = [
    {
      type: "like",
      user: "robin_blonde",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      action: "liked your video",
      time: "2h",
      thumbnail: "/background.png"
    },
    {
      type: "comment",
      user: "mike_chen",
      avatar: "/ellipse-2.png",
      action: "commented: \"Amazing dance moves! 🔥\"",
      time: "4h",
      thumbnail: "/background.png"
    },
    {
      type: "follow",
      user: "sarah_dance",
      avatar: "/ellipse-3.png",
      action: "started following you",
      time: "6h",
      thumbnail: null
    },
    {
      type: "like",
      user: "alex_music",
      avatar: "/ellipse-2.png",
      action: "liked your video",
      time: "8h",
      thumbnail: "/background.png"
    },
    {
      type: "mention",
      user: "dance_crew",
      avatar: "/ellipse-3.png",
      action: "mentioned you in a comment",
      time: "1d",
      thumbnail: "/background.png"
    }
  ];

  const messages = [
    {
      id: 1,
      user: "robin_blonde",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      lastMessage: "Hey! Loved your latest dance video 🔥",
      time: "1h",
      unread: true,
      messages: [
        { id: 1, text: "Hey Karene! How are you?", sender: "them", time: "2h" },
        { id: 2, text: "I'm good! Just posted a new video", sender: "me", time: "2h" },
        { id: 3, text: "Hey! Loved your latest dance video 🔥", sender: "them", time: "1h" },
      ]
    },
    {
      id: 2,
      user: "dance_partner",
      avatar: "/ellipse-2.png",
      lastMessage: "Let's practice tomorrow!",
      time: "3h",
      unread: false,
      messages: [
        { id: 1, text: "Ready for tomorrow's practice?", sender: "them", time: "4h" },
        { id: 2, text: "Yes! Can't wait", sender: "me", time: "3h" },
        { id: 3, text: "Let's practice tomorrow!", sender: "them", time: "3h" },
      ]
    },
    {
      id: 3,
      user: "music_producer",
      avatar: "/ellipse-3.png",
      lastMessage: "Love your latest video! 🎵",
      time: "1d",
      unread: false,
      messages: [
        { id: 1, text: "Your content is amazing!", sender: "them", time: "1d" },
        { id: 2, text: "Thank you so much! 😊", sender: "me", time: "1d" },
        { id: 3, text: "Love your latest video! 🎵", sender: "them", time: "1d" },
      ]
    }
  ];

  const suggestedPeople = [
    {
      id: 1,
      username: "charlidamelio",
      name: "Charli D'Amelio",
      avatar: "/ellipse-3.png",
      followers: "151M",
      isFollowing: false,
      isVerified: true
    },
    {
      id: 2,
      username: "robin_blonde",
      name: "Robin Smith",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      followers: "1.8M",
      isFollowing: true,
      isVerified: true
    },
    {
      id: 3,
      username: "zachking",
      name: "Zach King",
      avatar: "/ellipse-3.png",
      followers: "70M",
      isFollowing: false,
      isVerified: true
    },
    {
      id: 4,
      username: "bellapoarch",
      name: "Bella Poarch",
      avatar: "/ellipse-2.png",
      followers: "92M",
      isFollowing: false,
      isVerified: true
    },
    {
      id: 5,
      username: "spencerx",
      name: "Spencer X",
      avatar: "/ellipse-3.png",
      followers: "55M",
      isFollowing: true,
      isVerified: true
    }
  ];

  const filteredPeople = suggestedPeople.filter(person =>
    person.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return "/heart-icon.png";
      case "comment":
        return "/message-icon.png";
      case "follow":
        return "/account-stroke-icon.svg";
      case "mention":
        return "/message-stroke-icon.svg";
      default:
        return "/home-solid-icon.svg";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // Add message to chat
      setNewMessage("");
    }
  };

  const handleUserClick = (user: any) => {
    if (user.username === "robin_blonde") {
      navigate("/profile", { state: { user: "robin" } });
    }
  };

  // People Search Screen
  if (showPeopleSearch) {
    return (
      <div className="bg-transparent flex flex-row justify-center w-full">
        <div className="bg-black w-[414px] h-[896px] relative">
          <StatusBar />
          
          {/* Search Header */}
          <header className="absolute w-[414px] h-16 top-11 left-0 bg-black flex items-center px-4 border-b border-[#ffffff33]">
            <Button
              variant="ghost"
              className="p-0 h-auto bg-transparent hover:bg-transparent text-white mr-4"
              onClick={() => setShowPeopleSearch(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div className="flex-1 bg-[#161823] rounded-full px-4 py-2 flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                autoFocus
              />
            </div>
          </header>

          {/* Search Results */}
          <div className="absolute w-[414px] h-[720px] top-[107px] left-0 px-4 overflow-y-auto">
            <div className="py-4">
              {searchQuery === "" && (
                <div className="mb-6">
                  <h3 className="text-white text-lg font-semibold mb-4 px-2">Suggested for you</h3>
                </div>
              )}
              
              <div className="space-y-1">
                {filteredPeople.map((person) => (
                  <div key={person.id} className="flex items-center justify-between p-4 hover:bg-[#161823] rounded-xl">
                    <Button
                      variant="ghost"
                      className="flex items-center flex-1 bg-transparent hover:bg-transparent p-0 justify-start"
                      onClick={() => handleUserClick(person)}
                    >
                      <img
                        src={person.avatar}
                        alt={person.username}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1 text-left">
                        <div className="flex items-center">
                          <span className="text-white font-semibold text-base mr-1">
                            @{person.username}
                          </span>
                          {person.isVerified && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">{person.name}</div>
                        <div className="text-gray-500 text-xs">{person.followers} followers</div>
                      </div>
                    </Button>
                    <Button
                      className={`px-6 py-2 rounded-lg font-semibold ${
                        person.isFollowing
                          ? "bg-[#161823] border border-[#ffffff33] text-white hover:bg-[#161823]/90"
                          : "bg-[#fe2c55] text-white hover:bg-[#fe2c55]/90"
                      }`}
                    >
                      {person.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>

              {searchQuery !== "" && filteredPeople.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-lg">No users found</div>
                  <div className="text-gray-500 text-sm mt-2">Try searching for a different name</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedChat) {
    return (
      <div className="bg-transparent flex flex-row justify-center w-full">
        <div className="bg-black w-[414px] h-[896px] relative">
          <StatusBar />
          
          {/* Chat Header */}
          <header className="absolute w-[414px] h-20 top-11 left-0 bg-black flex items-center px-6 border-b border-[#ffffff33]">
            <Button
              variant="ghost"
              className="p-0 h-auto bg-transparent hover:bg-transparent text-white mr-4"
              onClick={() => setSelectedChat(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center flex-1 bg-transparent hover:bg-transparent p-0 justify-start"
              onClick={() => handleUserClick({ username: selectedChat.user })}
            >
              <img
                src={selectedChat.avatar}
                alt={selectedChat.user}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex-1 text-left">
                <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg">
                  @{selectedChat.user}
                </div>
                <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-sm">
                  Active now
                </div>
              </div>
            </Button>
          </header>

          {/* Messages */}
          <div className="absolute w-[414px] h-[700px] top-[111px] left-0 px-6 py-6 overflow-y-auto">
            <div className="space-y-6">
              {selectedChat.messages.map((message: any) => (
                <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[280px] px-5 py-3 rounded-2xl ${
                    message.sender === 'me' 
                      ? 'bg-[#fe2c55] text-white' 
                      : 'bg-[#161823] text-white'
                  }`}>
                    <div className="text-base leading-relaxed">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-[#ffffff33] p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex items-center bg-[#161823] rounded-full px-5 py-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  variant="ghost"
                  className="p-0 h-auto bg-transparent hover:bg-transparent ml-3"
                >
                  <span className="text-2xl">😊</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                className={`p-3 h-auto bg-[#fe2c55] hover:bg-[#fe2c55]/90 rounded-full ${
                  newMessage.trim() ? "opacity-100" : "opacity-50"
                }`}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showMessages) {
    return (
      <div className="bg-transparent flex flex-row justify-center w-full">
        <div className="bg-black w-[414px] h-[896px] relative">
          <StatusBar />
          
          {/* Messages Header */}
          <header className="absolute w-[414px] h-16 top-11 left-0 bg-black flex items-center justify-between px-6 border-b border-[#ffffff33]">
            <Button
              variant="ghost"
              className="p-0 h-auto bg-transparent hover:bg-transparent text-white"
              onClick={() => setShowMessages(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-xl text-center tracking-[0] leading-[normal]">
              Messages
            </div>
            <Button
              variant="ghost"
              className="p-0 h-auto bg-transparent hover:bg-transparent text-white"
              onClick={() => setShowPeopleSearch(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
          </header>

          {/* Messages List */}
          <div className="absolute w-[414px] h-[720px] top-[107px] left-0 px-4 overflow-y-auto">
            <div className="py-6">
              {messages.map((message, index) => (
                <div key={message.id}>
                  <Button
                    variant="ghost"
                    className="w-full p-6 bg-transparent hover:bg-[#161823] text-left flex items-center space-x-5 rounded-xl"
                    onClick={() => setSelectedChat(message)}
                  >
                    <div className="relative">
                      <img
                        src={message.avatar}
                        alt={message.user}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {message.unread && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#fe2c55] rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg">
                          @{message.user}
                        </span>
                        <span className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-sm">
                          {message.time}
                        </span>
                      </div>
                      <div className={`[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-base leading-relaxed ${
                        message.unread ? 'text-white' : 'text-[#ffffff66]'
                      }`}>
                        {message.lastMessage}
                      </div>
                    </div>
                  </Button>
                  {/* Separator line between messages */}
                  {index < messages.length - 1 && (
                    <div className="mx-6 border-b border-[#ffffff1a]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-black w-[414px] h-[896px] relative">
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <header className="absolute w-[414px] h-11 top-11 left-0 bg-black flex items-center justify-center">
          <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal]">
            Inbox
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="absolute w-[414px] top-[66px] left-0">
          <div className="flex px-4 overflow-x-auto scrollbar-hide border-b border-[#ffffff33]">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`px-3 py-3 mr-4 whitespace-nowrap bg-transparent hover:bg-transparent text-sm ${
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

        {/* Messages Button */}
        <div className="absolute w-[374px] top-[120px] left-5">
          <Button 
            className="w-full bg-[#161823] hover:bg-[#161823]/90 text-white rounded-lg py-4 flex items-center justify-between border border-[#ffffff33]"
            onClick={() => setShowMessages(true)}
          >
            <div className="flex items-center">
              <img className="w-7 h-7 mr-4" alt="Messages" src="/message-stroke-icon.svg" />
              <span className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-lg">
                Messages
              </span>
            </div>
            <div className="bg-[#fe2c55] text-white text-sm px-3 py-1 rounded-full font-semibold">
              3
            </div>
          </Button>
        </div>

        {/* Content Area */}
        <div className="absolute w-[414px] h-[583px] top-[180px] left-0 px-4 overflow-y-auto">
          {activeTab === "All activity" && (
            <div className="space-y-5 py-4">
              {notifications.map((notification, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full flex items-center py-4 bg-transparent hover:bg-[#161823] rounded-xl p-4"
                  onClick={() => {
                    if (notification.user === "robin_blonde") {
                      navigate("/profile", { state: { user: "robin" } });
                    }
                  }}
                >
                  <div className="relative mr-4">
                    <img
                      src={notification.avatar}
                      alt={notification.user}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-black rounded-full flex items-center justify-center">
                      <img
                        src={getNotificationIcon(notification.type)}
                        alt={notification.type}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-white text-base leading-relaxed">
                      <span className="font-semibold">@{notification.user}</span> {notification.action}
                    </div>
                    <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-sm mt-1">
                      {notification.time}
                    </div>
                  </div>
                  {notification.thumbnail && (
                    <img
                      src={notification.thumbnail}
                      alt="Video thumbnail"
                      className="w-14 h-18 rounded-lg object-cover ml-4"
                    />
                  )}
                </Button>
              ))}
            </div>
          )}

          {activeTab !== "All activity" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-white text-xl mb-2">{activeTab}</div>
                <div className="text-gray-400">No {activeTab.toLowerCase()} yet</div>
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