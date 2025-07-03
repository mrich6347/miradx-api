# MiraDX Risk Assessment API 🚀

Hey MiraDX Team! 👋

Welcome to the MiraDX Risk Assessment API

## Already Hosted for You!

**Don't want to run it locally?** No problem! I've already deployed this API for you on **Railway** with a **PostgreSQL database** powered by **Supabase**.


📚 **Live Docs**: https://miradx-api-production.up.railway.app/api/docs

Just visit the live docs link above to start testing the API immediately!

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Create a `.env` file in your project root and add these Supabase configurations:

```env
SUPABASE_URL=https://cpewjjedadspgfeolvce.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZXdqamVkYWRzcGdmZW9sdmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NjQzMTMsImV4cCI6MjA2NzE0MDMxM30.OZBmrfbpNBBEGURdAj2siokLfmg-fGioBBWis2jAYYY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZXdqamVkYWRzcGdmZW9sdmNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTU2NDMxMywiZXhwIjoyMDY3MTQwMzEzfQ.B6jdknEybg81FBwmEnwohvJlVCnKf-zsatiKv_-pib0
```

> **⚠️ Disclaimer**: I know this is horrible practice putting these keys up here, but I'm going to risk it. These are dev/demo credentials for the team to get started quickly.

### 3. Start the API
```bash
# Development mode with hot reload
npm run start:dev

# Or regular start
npm run start
```

Your API will be running at `http://localhost:3000` 🎉

## 📚 API Documentation

Once your server is running, check out the **interactive Swagger documentation**:

**👉 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

Here you can:
- 🔍 Explore all available endpoints
- 🧪 Test API calls directly in the browser
- 📖 See request/response examples
- 🎯 Understand the data models

## 🧪 Running Tests

### End-to-End Tests
I have created a end to end test file to cover the scenarios I thought were most important for this specific application.

```bash
npm run test:e2e
```


## 🎯 API Endpoints

All endpoints are prefixed with `/api`:

- **GET** `/api/health` - Check if the server is running
- **GET** `/api/commuters` - Get all commuters with optional filtering
- **GET** `/api/micromort-actions` - Get all available risk actions
- **POST** `/api/risk-assessments` - Calculate risk for a commuter's daily activities
