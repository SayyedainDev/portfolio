# 🎨 Customization Guide

Complete guide to customize every aspect of your portfolio.

## Table of Contents
- [Personal Information](#personal-information)
- [Colors & Theme](#colors--theme)
- [Content Sections](#content-sections)
- [Projects](#projects)
- [Skills](#skills)
- [Social Links](#social-links)
- [Animations](#animations)
- [Layout](#layout)

---

## Personal Information

### Update Name & Title

**File:** `frontend/src/components/Hero.jsx`

```jsx
// Line 23-31
<h1 className="text-5xl md:text-7xl font-bold mb-4">
  <span className="gradient-text glow-effect">
    Your Name Here  {/* Change this */}
  </span>
</h1>

<h2 className="text-2xl md:text-3xl font-semibold text-white">
  Your Title  {/* Change this */}
</h2>
<h3 className="text-xl md:text-2xl text-gray-300">
  Your Subtitle  {/* Change this */}
</h3>
```

### Update Tagline

```jsx
// Line 38-42
<p className="text-gray-400 text-lg leading-relaxed max-w-xl">
  Your custom tagline or description here.
  Make it compelling and showcase your expertise.
</p>
```

---

## Colors & Theme

### Primary Colors

**File:** `frontend/tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      dark: {
        900: '#070B13',  // Darkest background
        800: '#0B0F19',  // Secondary dark
        700: '#111827',  // Cards
        600: '#1F2937',  // Borders
      },
      neon: {
        purple: '#8A2BE2',  // Primary accent
        cyan: '#00E7FF',    // Secondary accent
        pink: '#FF006E',    // Tertiary accent
        green: '#39FF14',   // Success color
      }
    }
  }
}
```

### Gradient Colors

**File:** `frontend/src/styles/theme.js`

```js
gradients: {
  primary: 'linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%)',
  secondary: 'linear-gradient(135deg, #YOUR_COLOR3 0%, #YOUR_COLOR4 100%)',
}
```

### Background Patterns

Add to any section in component files:

```jsx
<div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-cyan/5" />
```

---

## Content Sections

### About Section

**File:** `frontend/src/components/About.jsx`

#### Update Bio
```jsx
// Line 60-70
<p className="text-gray-300 leading-relaxed">
  Your bio paragraph 1.
  Tell your story and what drives you.
</p>
<p className="text-gray-300 leading-relaxed">
  Your bio paragraph 2.
  Highlight your expertise and passion.
</p>
```

#### Update Technologies List
```jsx
// Line 10-22
const technologies = [
  'Your Tech 1',
  'Your Tech 2',
  'Your Tech 3',
  // Add more...
];
```

#### Update Highlights
```jsx
// Line 24-55
const highlights = [
  {
    icon: <Code2 size={32} />,
    title: 'Your Specialty 1',
    description: 'Description of your specialty'
  },
  // Add more highlights...
];
```

---

## Projects

**File:** `frontend/src/components/Projects.jsx`

### Update Project Details

```jsx
// Line 8-45
const projects = [
  {
    title: 'Your Project Name',
    icon: '🚀',  // Emoji or leave as first letter
    description: 'Detailed description of your project. What problem does it solve?',
    techStack: ['Tech1', 'Tech2', 'Tech3'],
    github: 'https://github.com/yourusername/project',
    demo: 'https://your-demo-url.com'  // or null if no demo
  },
  // Add more projects...
];
```

### Add More Projects

Simply add more objects to the array:

```jsx
{
  title: 'New Project',
  icon: '💡',
  description: 'Description here',
  techStack: ['React', 'Node.js'],
  github: 'https://github.com/...',
  demo: null
}
```

### Remove Projects

Delete project objects or filter them:

```jsx
const projects = [
  // ... keep only the projects you want
];
```

---

## Skills

**File:** `frontend/src/components/Skills.jsx`

### Update Skill Categories

```jsx
// Line 8-50
const skillCategories = [
  {
    title: 'Your Category',
    icon: <Server size={28} />,  // Choose from lucide-react
    color: 'neon-purple',  // Color from your theme
    skills: [
      'Skill 1',
      'Skill 2',
      'Skill 3',
    ]
  },
  // Add more categories...
];
```

### Add Additional Skills Cloud

```jsx
// Line 85-100
{[
  'Extra Skill 1',
  'Extra Skill 2',
  'Extra Skill 3',
  // Add your additional skills
].map((skill, index) => (
  // ... renders skill chips
))}
```

### Change Skill Icons

Import from `lucide-react`:

```jsx
import { Server, Smartphone, Code, Database, Cloud, Terminal } from 'lucide-react';
```

---

## Social Links

### Footer Social Links

**File:** `frontend/src/components/Footer.jsx`

```jsx
// Line 8-27
const socialLinks = [
  {
    icon: <Github size={20} />,
    href: 'https://github.com/yourusername',
    label: 'GitHub'
  },
  {
    icon: <Linkedin size={20} />,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn'
  },
  // Add more social links...
];
```

### Contact Section Social Links

**File:** `frontend/src/components/Contact.jsx`

Update the same array structure (Line 13-34)

### Add New Social Platform

```jsx
import { Twitter, Instagram, Youtube } from 'lucide-react';

{
  icon: <Youtube size={24} />,
  href: 'https://youtube.com/@yourchannel',
  label: 'YouTube',
  color: 'hover:text-red-500'
}
```

---

## Animations

### Adjust Animation Speed

**File:** `frontend/tailwind.config.js`

```js
animation: {
  'glow': 'glow 2s ease-in-out infinite alternate',  // Change 2s
  'float': 'float 6s ease-in-out infinite',         // Change 6s
}
```

### Change Animation Delays

In component files:

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}  // Adjust delay
>
```

### Disable Animations

Remove or comment out `motion` components:

```jsx
// Before
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// After
<div>
```

### Add Custom Animations

Add to `tailwind.config.js`:

```js
keyframes: {
  yourAnimation: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  }
}
```

---

## Layout

### Change Section Order

**File:** `frontend/src/pages/Home.jsx`

Reorder components:

```jsx
<Navbar />
<Hero />
<Skills />      {/* Moved up */}
<About />       {/* Moved down */}
<Projects />
<Contact />
<Footer />
```

### Remove Sections

Comment out or delete:

```jsx
{/* <Skills /> */}  // Section hidden
```

### Add New Section

1. Create component: `frontend/src/components/YourSection.jsx`
2. Import and add to Home.jsx:

```jsx
import YourSection from '../components/YourSection';

// In return:
<YourSection />
```

### Adjust Section Spacing

In component files:

```jsx
<section className="section-container py-32">  {/* Increased padding */}
```

Or globally in `frontend/src/index.css`:

```css
.section-container {
  @apply min-h-screen py-32 px-6;  /* Change py-20 to py-32 */}
```

---

## Advanced Customization

### Add Google Fonts

1. **In `frontend/index.html`:**
```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
```

2. **In `frontend/src/index.css`:**
```css
body {
  font-family: 'Inter', sans-serif;
}
```

### Change Card Styles

**File:** `frontend/src/index.css`

```css
.glass-card {
  @apply bg-white/5 backdrop-blur-md border border-white/10 rounded-xl;
  /* Customize: */
  @apply bg-white/10 backdrop-blur-lg border-2 border-neon-cyan/20 rounded-2xl;
}
```

### Modify Navbar Behavior

**File:** `frontend/src/components/Navbar.jsx`

```jsx
// Line 23-25
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 100);  // Change threshold
  };
});
```

### Add Particles or Three.js Background

Install libraries:
```bash
npm install @tsparticles/react
```

Add to Hero component for advanced effects.

---

## Email Configuration

### Change Email Template

**File:** `backend/controllers/contactController.js`

Customize HTML email (Line 40-70):

```js
html: `
  <div style="your custom styles">
    <h1>Your Custom Email Header</h1>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Message: ${message}</p>
  </div>
`
```

### Add Email Validation

Add more validation rules:

```js
if (message.length < 10) {
  return res.status(400).json({
    error: 'Message must be at least 10 characters'
  });
}
```

---

## Performance Tips

### Optimize Images

1. Compress images before adding
2. Use WebP format when possible
3. Add lazy loading:

```jsx
<img loading="lazy" src="..." alt="..." />
```

### Code Splitting

Use React lazy loading:

```jsx
import { lazy, Suspense } from 'react';

const Projects = lazy(() => import('./components/Projects'));

<Suspense fallback={<div>Loading...</div>}>
  <Projects />
</Suspense>
```

### Reduce Bundle Size

Remove unused dependencies:

```bash
npm uninstall unused-package
```

---

## Testing Your Changes

### Local Testing

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm start
```

### Build Testing

```bash
cd frontend
npm run build
npm run preview
```

### Browser Testing

- Chrome DevTools
- Mobile view (Cmd+Shift+M)
- Network tab for performance
- Console for errors

---

## Backup Your Changes

```bash
git add .
git commit -m "Customized portfolio"
git push
```

---

## Need Help?

- Check component comments for hints
- Review the main README.md
- Test changes incrementally
- Keep backups before major changes

Happy customizing! 🎨
