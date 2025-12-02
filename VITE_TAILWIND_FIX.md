# 🔧 Vite + React + Tailwind CSS Configuration Fix

## Problem
Error: "It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin"

## Solution

### ✅ Option 1: ES Modules (Recommended for Vite)

**postcss.config.js** (rename from .cjs):
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.js**:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### ✅ Option 2: CommonJS (If ES modules don't work)

**postcss.config.cjs**:
```javascript
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
```

**tailwind.config.cjs**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Required Files

### 1. src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-white text-gray-900;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
  }
}
```

### 2. src/main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 3. src/App.jsx
```jsx
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Vite + React + Tailwind
        </h1>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600 text-lg">
            Click the button to test Tailwind CSS
          </p>
          
          <button
            onClick={() => setCount(count + 1)}
            className="btn-primary w-full py-3 text-lg font-semibold"
          >
            Count: {count}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-blue-800 font-semibold">Vite</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <p className="text-purple-800 font-semibold">React</p>
          </div>
          <div className="bg-cyan-100 p-4 rounded-lg text-center">
            <p className="text-cyan-800 font-semibold">Tailwind</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center pt-4">
          ✅ If you see colors and styling, Tailwind is working!
        </p>
      </div>
    </div>
  );
}

export default App;
```

### 4. index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + Tailwind</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Quick Fix Steps

1. **Check package.json has type: "module"**:
```json
{
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

2. **Use .js extensions (not .cjs) for configs**
   - Rename `postcss.config.cjs` → `postcss.config.js`
   - Rename `tailwind.config.cjs` → `tailwind.config.js`

3. **Use ES module syntax**:
   - `export default { ... }` instead of `module.exports = { ... }`

4. **Restart dev server**:
```bash
npm run dev
```

## Troubleshooting

### Error: "Cannot use import statement outside a module"
- Add `"type": "module"` to package.json
- Use .js extensions for config files
- Use `export default` syntax

### Error: "tailwindcss directly as a PostCSS plugin"
- Change `postcss.config.js` to use object syntax:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Tailwind classes not working
- Verify `src/index.css` has `@tailwind` directives
- Verify `main.jsx` imports `./index.css`
- Check `tailwind.config.js` content paths include your files
- Restart dev server

### Still having issues?
Try the CommonJS approach (Option 2) and use `.cjs` extensions.

## Verification Test

Run `npm run dev` and visit http://localhost:5173

You should see:
- ✅ Gradient background
- ✅ Styled card with shadow
- ✅ Colored boxes with padding
- ✅ Button with hover effects

If everything looks styled, **Tailwind is working correctly!**
