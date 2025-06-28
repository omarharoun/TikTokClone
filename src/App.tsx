import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TiktokHome } from "./screens/TiktokHome";
import { TiktokProfile } from "./screens/TiktokProfile";
import { TiktokDiscover } from "./screens/TiktokDiscover";
import { TiktokInbox } from "./screens/TiktokInbox";
import { TiktokCamera } from "./screens/TiktokCamera";
import { TiktokComments } from "./screens/TiktokComments";
import { TiktokFollowing } from "./screens/TiktokFollowing";

export const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-black w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<TiktokHome />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/following" element={<TiktokFollowing />} />
        <Route path="/discover" element={<TiktokDiscover />} />
        <Route path="/camera" element={<TiktokCamera />} />
        <Route path="/inbox" element={<TiktokInbox />} />
        <Route path="/profile" element={<TiktokProfile />} />
        <Route path="/comments" element={<TiktokComments />} />
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};