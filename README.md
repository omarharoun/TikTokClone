# TikTik - Social Video Platform

A React-based TikTok clone with mobile-first design and video management capabilities.

## Features

### 🎥 Video Management
- **Delete Last Video**: Added functionality to delete the most recent video from the Discover tab
- **Video Grid**: Display videos in a responsive grid layout
- **Video Details**: Show video metadata including views, duration, and engagement metrics

### 📱 Mobile Optimization
- **Responsive Design**: Fully responsive layout that works on all screen sizes
- **Touch Interactions**: Optimized touch targets and swipe gestures
- **Mobile Viewport**: Proper viewport settings to prevent zooming and ensure optimal display
- **Touch-Friendly**: All buttons and interactive elements meet mobile accessibility standards

### 🔧 Technical Improvements
- **PocketBase Integration**: Full backend integration for video management
- **TypeScript**: Type-safe development with proper interfaces
- **Tailwind CSS**: Utility-first styling with mobile-first approach
- **React Router**: Client-side routing for smooth navigation

## Mobile Features

- **Prevent Zoom**: Input fields set to 16px to prevent iOS zoom
- **Touch Targets**: All interactive elements are at least 44px for easy tapping
- **Smooth Scrolling**: Enhanced scrolling experience on mobile devices
- **Responsive Grid**: Video grid adapts to different screen sizes
- **Mobile Navigation**: Bottom navigation optimized for thumb navigation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Start PocketBase backend:
   ```bash
   npm run pocketbase
   ```

## Usage

### Deleting Videos
1. Navigate to the Discover tab
2. Click the "🗑️ Delete Last Video" button
3. Confirm the deletion in the popup dialog

### Mobile Navigation
- Swipe up/down on the home screen to navigate between videos
- Use the bottom navigation bar for main sections
- Tap and hold for additional options

## Mobile Browser Support

The application is optimized for:
- iOS Safari
- Chrome Mobile
- Firefox Mobile
- Samsung Internet
- All modern mobile browsers

## Development

Built with:
- React 18
- TypeScript
- Tailwind CSS
- PocketBase
- Vite
- React Router DOM
