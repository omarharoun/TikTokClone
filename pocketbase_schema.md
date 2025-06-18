# PocketBase Schema for TikTok Clone

## Collections Setup

### 1. Users Collection
```javascript
// Collection: users
{
  "id": "string (auto)",
  "username": "string (unique, required)",
  "email": "string (unique, required)",
  "name": "string (required)",
  "avatar": "file (optional)",
  "bio": "text (optional)",
  "verified": "bool (default: false)",
  "followers_count": "number (default: 0)",
  "following_count": "number (default: 0)",
  "likes_count": "number (default: 0)",
  "created": "date (auto)",
  "updated": "date (auto)"
}
```

### 2. Videos Collection
```javascript
// Collection: videos
{
  "id": "string (auto)",
  "user": "relation (users, required)",
  "title": "string (required)",
  "description": "text (optional)",
  "video_file": "file (required)",
  "video_url": "url (auto-generated)",
  "thumbnail_file": "file (optional)",
  "thumbnail_url": "url (auto-generated)",
  "duration": "number (default: 0)",
  "views_count": "number (default: 0)",
  "likes_count": "number (default: 0)",
  "comments_count": "number (default: 0)",
  "shares_count": "number (default: 0)",
  "music_name": "string (optional)",
  "music_artist": "string (optional)",
  "hashtags": "json (array of strings)",
  "created": "date (auto)",
  "updated": "date (auto)"
}
```

### 3. Comments Collection
```javascript
// Collection: comments
{
  "id": "string (auto)",
  "user": "relation (users, required)",
  "video": "relation (videos, required)",
  "content": "text (required)",
  "likes_count": "number (default: 0)",
  "replies_count": "number (default: 0)",
  "parent_comment": "relation (comments, optional)",
  "created": "date (auto)",
  "updated": "date (auto)"
}
```

### 4. Likes Collection
```javascript
// Collection: likes
{
  "id": "string (auto)",
  "user": "relation (users, required)",
  "video": "relation (videos, optional)",
  "comment": "relation (comments, optional)",
  "created": "date (auto)"
}
```

### 5. Follows Collection
```javascript
// Collection: follows
{
  "id": "string (auto)",
  "follower": "relation (users, required)",
  "following": "relation (users, required)",
  "created": "date (auto)"
}
```

### 6. Messages Collection
```javascript
// Collection: messages
{
  "id": "string (auto)",
  "sender": "relation (users, required)",
  "receiver": "relation (users, required)",
  "content": "text (required)",
  "read": "bool (default: false)",
  "created": "date (auto)",
  "updated": "date (auto)"
}
```

### 7. Notifications Collection
```javascript
// Collection: notifications
{
  "id": "string (auto)",
  "user": "relation (users, required)",
  "type": "select (like, comment, follow, mention)",
  "title": "string (required)",
  "message": "text (required)",
  "read": "bool (default: false)",
  "related_user": "relation (users, optional)",
  "related_video": "relation (videos, optional)",
  "created": "date (auto)"
}
```

## API Rules (Access Control)

### Users Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = id`
- **Update**: `@request.auth.id = id`
- **Delete**: `@request.auth.id = id`

### Videos Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = user.id`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

### Comments Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = user.id`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

### Likes Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = user.id`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

### Follows Collection
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id = follower.id`
- **Update**: `@request.auth.id = follower.id`
- **Delete**: `@request.auth.id = follower.id`

### Messages Collection
- **List/Search**: `@request.auth.id = sender.id || @request.auth.id = receiver.id`
- **View**: `@request.auth.id = sender.id || @request.auth.id = receiver.id`
- **Create**: `@request.auth.id = sender.id`
- **Update**: `@request.auth.id = sender.id || @request.auth.id = receiver.id`
- **Delete**: `@request.auth.id = sender.id`

### Notifications Collection
- **List/Search**: `@request.auth.id = user.id`
- **View**: `@request.auth.id = user.id`
- **Create**: `@request.auth.id != ""`
- **Update**: `@request.auth.id = user.id`
- **Delete**: `@request.auth.id = user.id`

## Setup Instructions

1. **Download PocketBase**: Download from https://pocketbase.io/
2. **Start PocketBase**: Run `./pocketbase serve` in terminal
3. **Admin Setup**: Go to http://127.0.0.1:8090/_/ and create admin account
4. **Create Collections**: Use the schema above to create all collections
5. **Set API Rules**: Apply the access control rules for each collection
6. **Configure CORS**: Enable CORS for your frontend domain

## Environment Variables

Create a `.env` file in your project root:
```
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

## Real-time Features

PocketBase supports real-time subscriptions. You can subscribe to:
- New messages in conversations
- New notifications
- New comments on videos
- New likes on videos/comments
- New followers

Example subscription:
```javascript
// Subscribe to new messages
pb.collection('messages').subscribe('*', function (e) {
  console.log(e.action);
  console.log(e.record);
});
```