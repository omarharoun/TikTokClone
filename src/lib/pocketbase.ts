import PocketBase from 'pocketbase';

// Initialize PocketBase client with environment variable support
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Types for our collections
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  followers_count: number;
  following_count: number;
  likes_count: number;
  created: string;
  updated: string;
}

export interface Video {
  id: string;
  user: string;
  user_expand?: User;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  views_count: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  music_name?: string;
  music_artist?: string;
  hashtags: string[];
  created: string;
  updated: string;
}

export interface Comment {
  id: string;
  user: string;
  user_expand?: User;
  video: string;
  video_expand?: Video;
  content: string;
  likes_count: number;
  replies_count: number;
  parent_comment?: string;
  created: string;
  updated: string;
}

export interface Like {
  id: string;
  user: string;
  video?: string;
  comment?: string;
  created: string;
}

export interface Follow {
  id: string;
  follower: string;
  following: string;
  created: string;
}

export interface Message {
  id: string;
  sender: string;
  sender_expand?: User;
  receiver: string;
  receiver_expand?: User;
  content: string;
  read: boolean;
  created: string;
  updated: string;
}

export interface Notification {
  id: string;
  user: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  title: string;
  message: string;
  read: boolean;
  related_user?: string;
  related_user_expand?: User;
  related_video?: string;
  related_video_expand?: Video;
  created: string;
}

// Auth helpers
export const authHelpers = {
  // Login user
  async login(email: string, password: string) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return { success: true, user: authData.record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Register user
  async register(data: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
  }) {
    try {
      const record = await pb.collection('users').create(data);
      // Auto login after registration
      await pb.collection('users').authWithPassword(data.email, data.password);
      return { success: true, user: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Logout user
  logout() {
    pb.authStore.clear();
  },

  // Get current user
  getCurrentUser() {
    return pb.authStore.model as User | null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return pb.authStore.isValid;
  }
};

// Video helpers
export const videoHelpers = {
  // Get videos for feed (For You page)
  async getFeedVideos(page = 1, limit = 10) {
    try {
      const records = await pb.collection('videos').getList(page, limit, {
        sort: '-created',
        expand: 'user'
      });
      return { success: true, videos: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Get videos from followed users
  async getFollowingVideos(page = 1, limit = 10) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      // Get users that current user follows
      const follows = await pb.collection('follows').getFullList({
        filter: `follower = "${currentUser.id}"`,
        fields: 'following'
      });

      const followingIds = follows.map(f => f.following);
      
      if (followingIds.length === 0) {
        return { success: true, videos: [], totalPages: 0 };
      }

      const records = await pb.collection('videos').getList(page, limit, {
        filter: followingIds.map(id => `user = "${id}"`).join(' || '),
        sort: '-created',
        expand: 'user'
      });

      return { success: true, videos: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Get user's videos
  async getUserVideos(userId: string, page = 1, limit = 12) {
    try {
      const records = await pb.collection('videos').getList(page, limit, {
        filter: `user = "${userId}"`,
        sort: '-created',
        expand: 'user'
      });
      return { success: true, videos: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Upload video
  async uploadVideo(data: {
    title: string;
    description: string;
    video: File;
    thumbnail?: File;
    music_name?: string;
    music_artist?: string;
    hashtags?: string[];
  }) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const formData = new FormData();
      formData.append('user', currentUser.id);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('video_file', data.video);
      if (data.thumbnail) formData.append('thumbnail_file', data.thumbnail);
      if (data.music_name) formData.append('music_name', data.music_name);
      if (data.music_artist) formData.append('music_artist', data.music_artist);
      if (data.hashtags) formData.append('hashtags', JSON.stringify(data.hashtags));

      const record = await pb.collection('videos').create(formData);
      return { success: true, video: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Like/Unlike video
  async toggleLike(videoId: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      // Check if already liked
      const existingLike = await pb.collection('likes').getFirstListItem(
        `user = "${currentUser.id}" && video = "${videoId}"`
      ).catch(() => null);

      if (existingLike) {
        // Unlike
        await pb.collection('likes').delete(existingLike.id);
        return { success: true, liked: false };
      } else {
        // Like
        await pb.collection('likes').create({
          user: currentUser.id,
          video: videoId
        });
        return { success: true, liked: true };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Check if video is liked by current user
  async isVideoLiked(videoId: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) return false;

      const like = await pb.collection('likes').getFirstListItem(
        `user = "${currentUser.id}" && video = "${videoId}"`
      ).catch(() => null);

      return !!like;
    } catch (error) {
      return false;
    }
  },

  // Delete video
  async deleteVideo(videoId: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      // Check if user owns the video
      const video = await pb.collection('videos').getOne(videoId);
      if (video.user !== currentUser.id) {
        throw new Error('You can only delete your own videos');
      }

      // Delete the video
      await pb.collection('videos').delete(videoId);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

// Comment helpers
export const commentHelpers = {
  // Get video comments
  async getVideoComments(videoId: string, page = 1, limit = 20) {
    try {
      const records = await pb.collection('comments').getList(page, limit, {
        filter: `video = "${videoId}" && parent_comment = ""`,
        sort: '-created',
        expand: 'user'
      });
      return { success: true, comments: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Add comment
  async addComment(videoId: string, content: string, parentCommentId?: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const record = await pb.collection('comments').create({
        user: currentUser.id,
        video: videoId,
        content,
        parent_comment: parentCommentId || ''
      });

      return { success: true, comment: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Like/Unlike comment
  async toggleCommentLike(commentId: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const existingLike = await pb.collection('likes').getFirstListItem(
        `user = "${currentUser.id}" && comment = "${commentId}"`
      ).catch(() => null);

      if (existingLike) {
        await pb.collection('likes').delete(existingLike.id);
        return { success: true, liked: false };
      } else {
        await pb.collection('likes').create({
          user: currentUser.id,
          comment: commentId
        });
        return { success: true, liked: true };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

// User helpers
export const userHelpers = {
  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const user = await pb.collection('users').getOne(userId);
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  async updateProfile(data: {
    name?: string;
    bio?: string;
    avatar?: File;
  }) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const formData = new FormData();
      if (data.name) formData.append('name', data.name);
      if (data.bio) formData.append('bio', data.bio);
      if (data.avatar) formData.append('avatar', data.avatar);

      const record = await pb.collection('users').update(currentUser.id, formData);
      return { success: true, user: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Follow/Unfollow user
  async toggleFollow(userId: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const existingFollow = await pb.collection('follows').getFirstListItem(
        `follower = "${currentUser.id}" && following = "${userId}"`
      ).catch(() => null);

      if (existingFollow) {
        // Unfollow
        await pb.collection('follows').delete(existingFollow.id);
        return { success: true, following: false };
      } else {
        // Follow
        await pb.collection('follows').create({
          follower: currentUser.id,
          following: userId
        });
        return { success: true, following: true };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Check if following user
  async isFollowing(userId: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) return false;

      const follow = await pb.collection('follows').getFirstListItem(
        `follower = "${currentUser.id}" && following = "${userId}"`
      ).catch(() => null);

      return !!follow;
    } catch (error) {
      return false;
    }
  },

  // Search users
  async searchUsers(query: string, page = 1, limit = 20) {
    try {
      const records = await pb.collection('users').getList(page, limit, {
        filter: `username ~ "${query}" || name ~ "${query}"`,
        sort: '-followers_count'
      });
      return { success: true, users: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

// Message helpers
export const messageHelpers = {
  // Get conversations
  async getConversations() {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const records = await pb.collection('messages').getList(1, 50, {
        filter: `sender = "${currentUser.id}" || receiver = "${currentUser.id}"`,
        sort: '-created',
        expand: 'sender,receiver'
      });

      // Group by conversation
      const conversations = new Map();
      records.items.forEach(message => {
        const otherUserId = message.sender === currentUser.id ? message.receiver : message.sender;
        if (!conversations.has(otherUserId)) {
          conversations.set(otherUserId, {
            user: message.sender === currentUser.id ? message.expand?.receiver : message.expand?.sender,
            lastMessage: message,
            unreadCount: 0
          });
        }
      });

      return { success: true, conversations: Array.from(conversations.values()) };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Get messages with specific user
  async getMessages(userId: string, page = 1, limit = 50) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const records = await pb.collection('messages').getList(page, limit, {
        filter: `(sender = "${currentUser.id}" && receiver = "${userId}") || (sender = "${userId}" && receiver = "${currentUser.id}")`,
        sort: 'created',
        expand: 'sender,receiver'
      });

      return { success: true, messages: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Send message
  async sendMessage(receiverId: string, content: string) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const record = await pb.collection('messages').create({
        sender: currentUser.id,
        receiver: receiverId,
        content,
        read: false
      });

      return { success: true, message: record };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

// Notification helpers
export const notificationHelpers = {
  // Get notifications
  async getNotifications(page = 1, limit = 20) {
    try {
      const currentUser = authHelpers.getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const records = await pb.collection('notifications').getList(page, limit, {
        filter: `user = "${currentUser.id}"`,
        sort: '-created',
        expand: 'related_user,related_video'
      });

      return { success: true, notifications: records.items, totalPages: records.totalPages };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    try {
      await pb.collection('notifications').update(notificationId, { read: true });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

export default pb;