# Android Mobile App Project

A full-stack Android application with Node.js backend and React Native frontend.

## Project Structure

```
├── backend/          # Node.js API server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── README.md     # Backend documentation
│
├── frontend/         # React Native Android app
│   ├── src/          # Source code
│   │   ├── components/  # Reusable components
│   │   ├── screens/     # Screen components
│   │   ├── navigation/  # Navigation setup
│   │   ├── services/   # API services
│   │   └── utils/       # Utility functions
│   ├── android/      # Android-specific files
│   ├── App.js        # Main app component
│   ├── package.json  # Frontend dependencies
│   └── README.md     # Frontend documentation
│
├── docker-compose.yml # Database setup
└── README.md         # This file
```

## Quick Start

### Database Setup
```bash
docker-compose up -d
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Android App Setup
```bash
cd frontend
npm install
npm run android
```

## Technologies

- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React Native (Android only)
- **Database**: PostgreSQL with Docker
- **Development**: Hot reloading, ESLint, Prettier

## Getting Started

1. Clone the repository
2. Start the database: `docker-compose up -d`
3. Set up the backend following instructions in `backend/README.md`
4. Set up the Android app following instructions in `frontend/README.md`
5. Start developing!

## Android Development

This project is focused on Android development only. Make sure you have:
- Android Studio installed
- Android SDK configured
- Java 17+ installed
- An Android emulator or physical device connected