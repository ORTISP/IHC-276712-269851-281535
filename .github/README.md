# GitHub Actions CI/CD

This repository includes GitHub Actions workflows for continuous integration and deployment.

## Workflows

### 1. Backend CI (`backend-ci.yml`)
**Triggers:** Push/PR to main/develop branches affecting backend files

**Checks:**
- ✅ Node.js compilation check
- ✅ ESLint code quality
- ✅ Prettier formatting check
- ✅ Server health check

**Node.js Versions:** 18.x, 20.x

### 2. Frontend CI (`frontend-ci.yml`)
**Triggers:** Push/PR to main/develop branches affecting frontend files

**Checks:**
- ✅ React Native bundle compilation
- ✅ ESLint code quality
- ✅ Prettier formatting check
- ✅ TypeScript check (if configured)

**Node.js Versions:** 18.x, 20.x

### 3. Full CI (`ci.yml`)
**Triggers:** All push/PR to main/develop branches

**Features:**
- ✅ Runs both backend and frontend checks in parallel
- ✅ Integration tests (backend health check)
- ✅ Matrix testing across Node.js versions

## Local Development

### Format Code
```bash
# Backend
cd backend
npm run format:fix

# Frontend  
cd frontend
npm run format:fix
```

### Lint Code
```bash
# Backend
cd backend
npm run lint:fix

# Frontend
cd frontend
npm run lint:fix
```

### Check Compilation
```bash
# Backend
cd backend
node --check server.js

# Frontend
cd frontend
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output /tmp/bundle.js
```

## Status Badges

Add these badges to your README.md:

```markdown
![Backend CI](https://github.com/yourusername/yourrepo/workflows/Backend%20CI/badge.svg)
![Frontend CI](https://github.com/yourusername/yourrepo/workflows/Frontend%20CI/badge.svg)
![Full CI](https://github.com/yourusername/yourrepo/workflows/Full%20CI/badge.svg)
```

## Configuration Files

- `.prettierrc` - Code formatting rules
- `.eslintrc.js` - Linting rules (backend)
- `.prettierignore` - Files to ignore for formatting
- `package.json` - Scripts for linting and formatting
