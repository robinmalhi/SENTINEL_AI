# Sentinel AI - Frontend Client

This is the React + Vite frontend application for Sentinel AI Emergency Protection System.

## 🚀 Features
- **Traveler Dashboard**: Real-time satellite telemetry, GPS checkpoints, and PIN check-in.
- **Family & Embassy Portals**: Live tracking, automated risk reports, and emergency alerts.
- **Police Rescue HQ**: High-priority alert queue and direct emergency dispatch view.
- **Sentinel Guard AI Assistant**: Real-time travel advisories powered by Google Gemini 3.6.
- **Supabase Integration**: Synchronizes emergency alerts directly with Supabase database.

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
VITE_SUPABASE_URL=https://aygjujyyswmiukguoakn.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3000
```

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## 🌐 Deployment on Vercel
1. Import the repository into Vercel.
2. Set the Root Directory to `frontend`.
3. Framework Preset: **Vite**.
4. Configure environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`).
5. Click **Deploy**.
