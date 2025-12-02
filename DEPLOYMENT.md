# 🌐 Deployment Guide

Complete guide for deploying your portfolio to production.

## Table of Contents
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Alternative: Railway](#alternative-railway)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier works)

### Steps

1. **Push Code to GitHub**
   ```bash
   cd /path/to/portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL = https://your-backend-url.com/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live! 🎉

### Custom Domain (Optional)
- Go to Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

---

## Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (free tier available)

### Steps

1. **Prepare Backend for Production**

   Create `backend/.env.production`:
   ```env
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-vercel-app.vercel.app
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

2. **Create Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** portfolio-backend
     - **Region:** Choose closest to your users
     - **Root Directory:** `backend`
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Set Environment Variables**
   - In Render dashboard, go to Environment
   - Add all variables from `.env.production`:
     - `NODE_ENV`: production
     - `PORT`: 5000
     - `FRONTEND_URL`: (your Vercel URL)
     - `EMAIL_SERVICE`: gmail
     - `EMAIL_USER`: (your email)
     - `EMAIL_PASS`: (your app password)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL

5. **Update Frontend Environment Variable**
   - Go back to Vercel
   - Update `REACT_APP_API_URL` with your Render backend URL
   - Redeploy frontend

---

## Alternative: Railway

Railway is another excellent option for backend deployment.

### Steps

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` as root directory

3. **Configure**
   - Railway auto-detects Node.js
   - Set environment variables in Settings
   - Add all variables from `.env`

4. **Deploy**
   - Railway automatically deploys
   - Get your backend URL from Settings

---

## Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Security Notes
- **Never commit .env files to GitHub**
- Use different passwords for production
- Enable 2FA on email account
- Use environment variables on hosting platforms

---

## Post-Deployment

### 1. Test Everything

**Backend Health:**
```bash
curl https://your-backend.onrender.com/api/health
```

**Frontend:**
- Visit your Vercel URL
- Test all sections
- Verify animations work
- Test mobile responsiveness

**Contact Form:**
- Submit a test message
- Check if email arrives
- Verify error handling

**Resume Download:**
- Click download button
- Verify PDF downloads correctly

### 2. Set Up Monitoring

**Render:**
- Enable "Health Check Path": `/api/health`
- Set up email alerts for downtime

**Vercel:**
- Check Analytics dashboard
- Monitor performance metrics

### 3. Performance Optimization

**Frontend:**
- Enable Vercel Analytics
- Check Lighthouse scores
- Optimize images if needed

**Backend:**
- Monitor response times
- Check for memory leaks
- Review error logs

### 4. Custom Domain (Optional)

**Buy Domain:**
- Namecheap, GoDaddy, or Google Domains

**Configure DNS:**
- Point domain to Vercel
- Point subdomain (api.yourdomain.com) to Render
- Update environment variables

---

## Deployment Checklist

- [ ] Frontend built successfully
- [ ] Backend running without errors
- [ ] Environment variables configured
- [ ] CORS settings updated for production URLs
- [ ] Contact form tested and working
- [ ] Resume file uploaded and downloadable
- [ ] All social links updated
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (automatic on Vercel/Render)
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] Analytics set up (optional)

---

## Troubleshooting

### CORS Errors
Update `backend/server.js`:
```js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app',
    'https://yourdomain.com'
  ],
  credentials: true
}));
```

### Contact Form 500 Errors
- Verify email credentials are correct
- Check Gmail allows "Less secure app access"
- Use App Password instead of regular password
- Check Render logs for detailed errors

### Resume Download 404
- Ensure `resume.pdf` is in `backend/` directory
- Check file is committed to Git
- Verify file permissions

### Frontend Shows Old Content
- Clear Vercel cache
- Force redeploy
- Clear browser cache
- Check if build succeeded

---

## Cost Breakdown

### Free Tier (Recommended for Personal Portfolio)

**Vercel:**
- ✅ Free forever for personal projects
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Unlimited bandwidth

**Render:**
- ✅ Free tier available
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 750 hours/month free
- ✅ Automatic SSL

**Railway:**
- ✅ $5/month free credit
- ⚠️ Paid plans from $5/month
- ✅ No sleep mode
- ✅ Better performance

### Recommended Setup
- **Frontend:** Vercel (Free)
- **Backend:** Render Free or Railway ($5)
- **Domain:** Optional ($10-15/year)

---

## Support

**Need Help?**
- Check hosting platform documentation
- Review error logs in dashboards
- Test locally first
- Open an issue on GitHub

**Useful Links:**
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)

---

Good luck with your deployment! 🚀
