# Mobile App Project

A full-stack mobile application with Node.js backend and React Native frontend.

## Project Structure

```
├── backend/          # Node.js API server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── README.md     # Backend documentation
│
├── frontend/         # React Native mobile app
│   ├── src/          # Source code
│   │   ├── components/  # Reusable components
│   │   ├── screens/     # Screen components
│   │   ├── navigation/  # Navigation setup
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   ├── App.js        # Main app component
│   ├── package.json  # Frontend dependencies
│   └── README.md     # Frontend documentation
│
└── README.md         # This file
```

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run android  # or npm run ios
```

## Technologies

- **Backend**: Node.js, Express.js
- **Frontend**: React Native
- **Development**: Hot reloading, ESLint, Prettier

## Getting Started

1. Clone the repository
2. Set up the backend following instructions in `backend/README.md`
3. Set up the frontend following instructions in `frontend/README.md`
4. Start developing!