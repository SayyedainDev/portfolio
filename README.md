# 🌑 Sayyedain Saqlain - Portfolio Website

A modern, dark-themed portfolio website with neon accents, built with React and Node.js. Features smooth animations, glassmorphism design, and a professional aesthetic perfect for showcasing software engineering projects.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0080?style=for-the-badge)

## 🎨 Design Theme

- **Background**: Deep navy/black (#0B0F19, #070B13)
- **Accents**: Neon purple (#8A2BE2) + Cyan (#00E7FF)
- **Style**: Glassmorphism, glow effects, smooth animations
- **Inspiration**: Vercel, Linear, Apple Dark Mode, Cyberpunk aesthetic

## ✨ Features

- 🎯 **Sticky Navigation** with smooth scroll and active section highlighting
- 🌟 **Hero Section** with animated gradient backgrounds and floating profile
- 👤 **About Section** with professional bio and tech stack showcase
- 💼 **Skills Section** with categorized tech chips and hover effects
- 🚀 **Projects Section** with glassmorphism cards and project details
- 📧 **Contact Form** with email integration via Nodemailer
- 📄 **Resume Download** with backend API integration
- 🌐 **Social Links** to GitHub, LinkedIn, Twitter, Email
- 📱 **Fully Responsive** design for all screen sizes
- ⚡ **Smooth Animations** with Framer Motion

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS 3.3.6** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── SectionTitle.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── styles/
│   │   │   └── theme.js
│   │   ├── utils/
│   │   │   └── scroll.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/
│   ├── controllers/
│   │   ├── contactController.js
│   │   └── resumeController.js
│   ├── routes/
│   │   ├── contact.js
│   │   └── resume.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   ├── resume.pdf
│   └── .env.example
│
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Gmail account (for contact form email)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd portfolio
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (optional)
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on **http://localhost:3000**

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your email credentials
# Required: EMAIL_USER and EMAIL_PASS
nano .env
```

**Important**: Configure your email settings in `.env`:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Gmail Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### 4. Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate a new app password
5. Copy the 16-character password to `EMAIL_PASS` in `.env`

### 5. Start Backend Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on **http://localhost:5000**

### 6. Add Your Resume

Replace `/backend/resume.pdf` with your actual resume PDF file.

## 🎯 Usage

### Development Mode

Run both frontend and backend simultaneously:

**Terminal 1 (Frontend):**
```bash
cd frontend
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```

Visit **http://localhost:3000** in your browser.

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Output will be in /frontend/dist
```

**Backend:**
```bash
cd backend
NODE_ENV=production npm start
```

## 📧 Contact Form Testing

1. Fill out the contact form on the website
2. Submit the form
3. Check your email (EMAIL_USER) for the contact submission
4. The email will include sender's name, email, and message

## 🎨 Customization

### Update Personal Information

Edit the following files:

1. **Hero Section** (`/frontend/src/components/Hero.jsx`)
   - Update name, title, tagline

2. **About Section** (`/frontend/src/components/About.jsx`)
   - Update bio, technologies, highlights

3. **Projects** (`/frontend/src/components/Projects.jsx`)
   - Update project details, tech stacks, links

4. **Footer** (`/frontend/src/components/Footer.jsx`)
   - Update social media links

### Modify Colors

Edit `/frontend/tailwind.config.js`:

```js
colors: {
  neon: {
    purple: '#8A2BE2',  // Change to your preferred color
    cyan: '#00E7FF',    // Change to your preferred color
    // Add more colors
  }
}
```

### Change Fonts

Edit `/frontend/src/index.css` and add Google Fonts or update the font family.

## 🌐 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `/frontend/dist` folder
3. Update environment variable: `REACT_APP_API_URL` to your backend URL

### Backend (Heroku/Railway/Render)

1. Push backend code to Git
2. Set environment variables on hosting platform
3. Deploy and get the backend URL
4. Update frontend `REACT_APP_API_URL`

### Environment Variables for Production

**Frontend:**
- `REACT_APP_API_URL`: Your backend API URL

**Backend:**
- `PORT`: Server port
- `NODE_ENV`: production
- `FRONTEND_URL`: Your frontend URL
- `EMAIL_SERVICE`: gmail
- `EMAIL_USER`: Your email
- `EMAIL_PASS`: Your app password

## 🐛 Troubleshooting

### Contact Form Not Working

- Check if backend is running (`http://localhost:5000/api/health`)
- Verify email credentials in `.env`
- Check browser console for errors
- Ensure CORS is properly configured

### Resume Download Not Working

- Verify `resume.pdf` exists in `/backend` directory
- Check file permissions
- Test endpoint: `http://localhost:5000/api/resume`

### Styling Issues

- Clear browser cache
- Rebuild Tailwind: `npm run build` in frontend
- Check for TailwindCSS configuration errors

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## 📝 API Endpoints

### Backend Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Send contact form email |
| GET | `/api/resume` | Download resume PDF |

### Contact Form Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect!"
}
```

## 🎬 Features in Detail

### Animations
- Fade-in effects on scroll
- Smooth section transitions
- Floating hero elements
- Glow effects on hover
- Slide-up animations
- Scale transforms

### Glassmorphism
- Transparent card backgrounds
- Backdrop blur effects
- Subtle borders
- Layered depth

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Hamburger menu for mobile
- Adaptive grid layouts

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👨‍💻 Author

**Sayyedain Saqlain**
- Portfolio: [Your Website]
- GitHub: [@sayyedain](https://github.com/sayyedain)
- LinkedIn: [Sayyedain Saqlain](https://linkedin.com/in/sayyedain)
- Email: sayyedain@example.com

## 🙏 Acknowledgments

- Design inspired by Vercel, Linear, and modern dark mode interfaces
- Icons from Lucide React
- Animations powered by Framer Motion
- Built with React and TailwindCSS

---

**⭐ If you found this useful, please give it a star!**

## 🔄 Updates

- **v1.0.0** - Initial release with full features
  - Dark neon theme
  - Smooth animations
  - Contact form with Nodemailer
  - Resume download
  - Responsive design
  - Production-ready

---

Made with 💜 and ⚡ by Sayyedain
