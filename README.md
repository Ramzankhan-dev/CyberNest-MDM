# CyberNest MDM (Mobile Device Management)

## Overview
CyberNest MDM is a complete Mobile Device Management solution for managing Android devices in an organization.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** Neon (PostgreSQL)
- **Mobile Agent:** Android (Java)

## Features
- Device enrollment and management
- Real-time device monitoring
- Policy enforcement
- Remote commands execution

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your Neon DB credentials in .env
npm start