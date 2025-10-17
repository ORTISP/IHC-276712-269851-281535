# React Native Mobile App

This is the React Native frontend for the mobile application.

## Prerequisites

Before running the project, make sure you have the following installed:
- Node.js (>=16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. For iOS (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android
```bash
npm run android
```

### iOS (macOS only)
```bash
npm run ios
```

### Development Server
```bash
npm start
```

## Project Structure

- `src/components/` - Reusable React components
- `src/screens/` - Screen components
- `src/navigation/` - Navigation configuration
- `src/services/` - API services and external integrations
- `src/utils/` - Utility functions and helpers

## Available Scripts

- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm start` - Start Metro bundler
- `npm test` - Run tests
- `npm run lint` - Run ESLint
