# Backend API

This is the backend API for the mobile application built with Node.js and Express.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   PORT=3000
   NODE_ENV=development
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
