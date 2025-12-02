# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm package manager

## Setup (5 minutes)

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Email (for contact form)

Edit `backend/.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

**Get Gmail App Password:**
1. Visit: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App passwords
4. Generate new password
5. Copy to `EMAIL_PASS`

### 3. Add Your Resume

Replace `backend/resume.pdf` with your actual resume.

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Website runs on http://localhost:3000

### 5. Open Browser

Visit: **http://localhost:3000**

## ✅ Verify Everything Works

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Frontend:**
   - Navigate sections with navbar
   - Test smooth scrolling
   - View animations on scroll
   - Try mobile menu

3. **Contact Form:**
   - Fill out form
   - Submit message
   - Check your email for notification

4. **Resume Download:**
   - Click "Download Resume" button
   - PDF should download

## 🎨 Customize Your Portfolio

### Update Personal Info

1. **Hero Section** (`frontend/src/components/Hero.jsx`)
   - Line 23-25: Update name and title

2. **About Section** (`frontend/src/components/About.jsx`)
   - Line 60-70: Update bio text

3. **Projects** (`frontend/src/components/Projects.jsx`)
   - Line 8-45: Update project details

4. **Footer** (`frontend/src/components/Footer.jsx`)
   - Line 8-27: Update social links

### Change Colors

Edit `frontend/tailwind.config.js`:

```js
colors: {
  neon: {
    purple: '#8A2BE2',  // Your color
    cyan: '#00E7FF',    // Your color
  }
}
```

## 📝 Common Commands

```bash
# Frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build

# Backend
npm start        # Start server
npm run dev      # Start with auto-reload (needs nodemon)
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Kill port 5000
lsof -ti:5000 | xargs kill -9
```

**Contact form not working:**
- Check backend is running
- Verify email credentials in `.env`
- Check browser console for errors

**Styling looks broken:**
- Clear browser cache
- Check TailwindCSS compiled correctly
- Rebuild: `npm run build`

## 🌐 Deploy to Production

### Frontend (Vercel)
1. `npm run build` in frontend folder
2. Deploy `/frontend/dist` to Vercel
3. Set env: `REACT_APP_API_URL=your-backend-url`

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect to hosting service
3. Set environment variables
4. Deploy

## 📚 More Info

See full README.md for:
- Complete documentation
- Detailed features
- Deployment guides
- API documentation
- Customization options

---

**Need Help?** Check the main README.md or open an issue.

**Ready to customize?** Start with the components in `frontend/src/components/`

Good luck with your portfolio! 🎉
