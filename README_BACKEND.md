# TikTok Clone - PocketBase Backend Setup

## 🚀 Quick Start

### 1. Install PocketBase
Download PocketBase from [https://pocketbase.io/](https://pocketbase.io/)

### 2. Start PocketBase Server
```bash
# Make executable (Linux/Mac)
chmod +x pocketbase

# Start server
./pocketbase serve --http=127.0.0.1:8090
```

### 3. Setup Admin Account
1. Go to http://127.0.0.1:8090/_/
2. Create your admin account
3. You'll be redirected to the admin dashboard

### 4. Create Collections

#### Users Collection
1. Go to Collections → Create Collection
2. Name: `users`
3. Type: `Auth`
4. Add fields:
   - `username` (Text, Unique, Required)
   - `name` (Text, Required)
   - `avatar` (File, Optional)
   - `bio` (Editor, Optional)
   - `verified` (Bool, Default: false)
   - `followers_count` (Number, Default: 0)
   - `following_count` (Number, Default: 0)
   - `likes_count` (Number, Default: 0)

#### Videos Collection
1. Create Collection → Name: `videos`
2. Add fields:
   - `user` (Relation to users, Required)
   - `title` (Text, Required)
   - `description` (Editor, Optional)
   - `video_file` (File, Required)
   - `thumbnail_file` (File, Optional)
   - `duration` (Number, Default: 0)
   - `views_count` (Number, Default: 0)
   - `likes_count` (Number, Default: 0)
   - `comments_count` (Number, Default: 0)
   - `shares_count` (Number, Default: 0)
   - `music_name` (Text, Optional)
   - `music_artist` (Text, Optional)
   - `hashtags` (JSON, Optional)

#### Comments Collection
1. Create Collection → Name: `comments`
2. Add fields:
   - `user` (Relation to users, Required)
   - `video` (Relation to videos, Required)
   - `content` (Editor, Required)
   - `likes_count` (Number, Default: 0)
   - `replies_count` (Number, Default: 0)
   - `parent_comment` (Relation to comments, Optional)

#### Likes Collection
1. Create Collection → Name: `likes`
2. Add fields:
   - `user` (Relation to users, Required)
   - `video` (Relation to videos, Optional)
   - `comment` (Relation to comments, Optional)

#### Follows Collection
1. Create Collection → Name: `follows`
2. Add fields:
   - `follower` (Relation to users, Required)
   - `following` (Relation to users, Required)

#### Messages Collection
1. Create Collection → Name: `messages`
2. Add fields:
   - `sender` (Relation to users, Required)
   - `receiver` (Relation to users, Required)
   - `content` (Editor, Required)
   - `read` (Bool, Default: false)

#### Notifications Collection
1. Create Collection → Name: `notifications`
2. Add fields:
   - `user` (Relation to users, Required)
   - `type` (Select: like, comment, follow, mention)
   - `title` (Text, Required)
   - `message` (Editor, Required)
   - `read` (Bool, Default: false)
   - `related_user` (Relation to users, Optional)
   - `related_video` (Relation to videos, Optional)

### 5. Set API Rules

For each collection, go to the API Rules tab and set:

#### Users Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = id`
- **Update**: `@request.auth.id = id`
- **Delete**: `@request.auth.id = id`

#### Videos Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = user.id`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

#### Comments Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = user.id`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

#### Likes Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = user.id`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

#### Follows Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = follower.id`
- **Update**: `@request.auth.id = follower.id`
- **Delete**: `@request.auth.id = follower.id`

#### Messages Collection
- **List/Search**: `@request.auth.id = sender.id || @request.auth.id = receiver.id`
- **View**: `@request.auth.id = sender.id || @request.auth.id = receiver.id`
- **Create**: `@request.auth.id = sender.id`
- **Update**: `@request.auth.id = sender.id || @request.auth.id = receiver.id`
- **Delete**: `@request.auth.id = sender.id`

#### Notifications Collection
- **List/Search**: `@request.auth.id = user.id`
- **View**: `@request.auth.id = user.id`
- **Create**: `@request.auth.id != ""`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

### 6. Configure Settings

1. Go to Settings → Application
2. Enable CORS for your frontend domain
3. Set file upload limits as needed

## 🔧 Development

### Start Development Server
```bash
npm run dev
```

### Start PocketBase (in separate terminal)
```bash
npm run pocketbase
```

## 📱 Features Implemented

### ✅ Authentication
- User registration and login
- Protected routes
- Session management

### ✅ Video Management
- Video upload and storage
- Video feed (For You page)
- Following feed
- User video galleries

### ✅ Social Features
- Like/unlike videos and comments
- Follow/unfollow users
- Comments and replies
- Real-time messaging
- Notifications

### ✅ User Profiles
- Profile customization
- Avatar upload
- Bio and user info
- Video galleries

### ✅ Search & Discovery
- User search
- Video discovery
- Hashtag support

## 🔄 Real-time Features

PocketBase supports real-time subscriptions for:
- New messages
- New notifications
- New comments
- New likes
- New followers

## 🛠 API Helpers

The app includes comprehensive API helpers in `src/lib/pocketbase.ts`:

- `authHelpers` - Authentication functions
- `videoHelpers` - Video management
- `commentHelpers` - Comments and replies
- `userHelpers` - User profiles and social features
- `messageHelpers` - Direct messaging
- `notificationHelpers` - Notifications

## 🔐 Security

- All API endpoints are protected with authentication
- Row-level security ensures users can only access their own data
- File uploads are validated and secured
- CORS is properly configured

## 📊 Database Schema

See `pocketbase_schema.md` for complete database schema and setup instructions.

## 🚀 Production Deployment

For production:
1. Deploy PocketBase to your server
2. Update `VITE_POCKETBASE_URL` in environment variables
3. Configure proper CORS settings
4. Set up SSL certificates
5. Configure file storage (S3, etc.)

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure CORS is enabled in PocketBase settings
2. **Authentication Issues**: Check API rules are set correctly
3. **File Upload Issues**: Verify file size limits and permissions
4. **Connection Issues**: Ensure PocketBase server is running on correct port

### Debug Mode:
Enable debug mode in PocketBase for detailed logs:
```bash
./pocketbase serve --debug
```