# Sentinel AI - Backend API Server

This is the Node.js Express REST API server powering Sentinel AI Emergency Protection System.

## 🚀 Features
- **Trip Operations**: CRUD operations for trip monitoring and location checkpoints.
- **AI Risk Analysis Engine**: Evaluates traveler risk levels and generates emergency reports using Google Gemini 3.6 Flash.
- **Simulation Suite**: Tests low battery, fall detection, loss of satellite signal, and overdue grace period alerts.
- **Portal Endpoints**: Dedicated routes for Embassy and Police Control Room dashboards.
- **AI Travel Assistant**: Structured AI recommendations for international tourists in India.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Environment Setup
Copy `.env.example` to `.env`:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=https://aygjujyyswmiukguoakn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Local Development
```bash
npm run dev
```

### Production Build & Run
```bash
npm run build
npm start
```

## 🌐 Deployment on Render
1. Create a new **Web Service** on Render connected to your repository.
2. Set Root Directory to `backend`.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add environment variables (`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
6. Deploy!
