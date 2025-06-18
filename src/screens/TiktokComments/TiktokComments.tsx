import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/common/StatusBar";

export const TiktokComments = (): JSX.Element => {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");

  const comments = [
    {
      id: 1,
      user: "jessica_wilson",
      avatar: "/ellipse-3.png",
      comment: "This is amazing! 🔥🔥🔥",
      time: "2h",
      likes: 234,
      replies: 12,
      isLiked: false
    },
    {
      id: 2,
      user: "mike_chen",
      avatar: "/ellipse-2.png",
      comment: "Your dance moves are incredible! Can you teach me? 💃",
      time: "4h",
      likes: 89,
      replies: 5,
      isLiked: true
    },
    {
      id: 3,
      user: "sarah_dance",
      avatar: "/ellipse-3.png",
      comment: "Obsessed with this song! What's the name?",
      time: "6h",
      likes: 156,
      replies: 8,
      isLiked: false
    },
    {
      id: 4,
      user: "alex_music",
      avatar: "/ellipse-2.png",
      comment: "The beat drop hits different 🎵✨",
      time: "8h",
      likes: 67,
      replies: 3,
      isLiked: false
    },
    {
      id: 5,
      user: "dance_crew",
      avatar: "/ellipse-3.png",
      comment: "We need to collab! DM us 🤝",
      time: "1d",
      likes: 445,
      replies: 23,
      isLiked: true
    }
  ];

  const handleSendComment = () => {
    if (newComment.trim()) {
      // Handle sending comment
      setNewComment("");
    }
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-black w-[414px] h-[896px] relative">
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <header className="absolute w-[414px] h-11 top-11 left-0 bg-black flex items-center justify-between px-4 border-b border-[#ffffff33]">
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent text-white"
            onClick={() => navigate("/")}
          >
            <img className="w-6 h-6" alt="Back" src="/account-stroke-icon.svg" />
          </Button>
          <div className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal]">
            {comments.length} comments
          </div>
          <Button
            variant="ghost"
            className="p-0 h-auto bg-transparent hover:bg-transparent text-white"
          >
            <img className="w-6 h-6" alt="Share" src="/share-icon.png" />
          </Button>
        </header>

        {/* Comments List */}
        <div className="absolute w-[414px] h-[750px] top-[88px] left-0 px-4 overflow-y-auto">
          <div className="space-y-4 pb-20">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-white text-sm">
                      @{comment.user}
                    </span>
                    <span className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-xs">
                      {comment.time}
                    </span>
                  </div>
                  <div className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-white text-sm mb-2 leading-relaxed">
                    {comment.comment}
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      className="p-0 h-auto bg-transparent hover:bg-transparent flex items-center space-x-1"
                    >
                      <img
                        src="/heart-icon.png"
                        alt="Like"
                        className={`w-4 h-4 ${comment.isLiked ? "opacity-100" : "opacity-60"}`}
                      />
                      <span className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-xs">
                        {comment.likes}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto bg-transparent hover:bg-transparent"
                    >
                      <span className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-xs">
                        Reply
                      </span>
                    </Button>
                    {comment.replies > 0 && (
                      <Button
                        variant="ghost"
                        className="p-0 h-auto bg-transparent hover:bg-transparent"
                      >
                        <span className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[#ffffff66] text-xs">
                          View {comment.replies} replies
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-[#ffffff33] p-4">
          <div className="flex items-center space-x-3">
            <img
              src="/ellipse-3.png"
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 flex items-center bg-[#161823] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Add comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
              />
              <Button
                variant="ghost"
                className="p-0 h-auto bg-transparent hover:bg-transparent ml-2"
              >
                <img className="w-5 h-5" alt="Emoji" src="/heart-icon.png" />
              </Button>
            </div>
            <Button
              variant="ghost"
              className={`p-0 h-auto bg-transparent hover:bg-transparent ${
                newComment.trim() ? "opacity-100" : "opacity-50"
              }`}
              onClick={handleSendComment}
              disabled={!newComment.trim()}
            >
              <span className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-[#fe2c55] text-sm">
                Post
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};