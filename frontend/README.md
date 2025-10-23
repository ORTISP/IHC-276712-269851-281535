# Frontend - Android React Native App

This is a React Native Android application with navigation between Welcome and Login screens.

## Features

- **Welcome Screen** - Clean welcome screen with "Get Started" and "Login" buttons
- **Login Screen** - Professional login form with email/password fields
- **Navigation** - Smooth navigation between screens using React Navigation
- **Android Only** - Optimized for Android development

## Getting Started

### Prerequisites

- Android Studio installed
- Android SDK configured
- Java 17+ installed
- An Android emulator or physical device connected

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Metro Server

```bash
npm start
```

### Step 3: Run the Android App

In a new terminal:

```bash
npm run android
```

## Project Structure

```
src/
├── screens/
│   ├── WelcomeScreen.js    # Welcome screen with navigation
│   └── LoginScreen.js      # Login form screen
└── navigation/
    └── AppNavigator.js     # Navigation setup
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run Android app
- `npm run clean` - Clean Android build
- `npm run build` - Build Android APK
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Development

The app uses React Navigation for screen navigation. To add new screens:

1. Create a new screen component in `src/screens/`
2. Add it to the navigator in `src/navigation/AppNavigator.js`
3. Navigate to it using `navigation.navigate('ScreenName')`

## Troubleshooting

- Make sure Android emulator is running or device is connected
- Check that Android SDK is properly configured
- Run `npm run clean` if you encounter build issues