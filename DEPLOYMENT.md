# Vercel Deployment Guide for Ameneses

## 🚀 Deployment Solutions

### Issue: `Could not find a required file. Name: index.html`

This error occurs when Vercel can't locate the `index.html` file during the build process. Here are the solutions:

## ✅ **Solution 1: Use the Updated Vercel Configuration** (Recommended)

The project now includes a proper `vercel.json` configuration file that should resolve the deployment issue.

### Deployment Steps:

1. **Push your changes to GitHub** (if not already done):
   ```bash
   git push origin master
   ```

2. **Import project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Vercel will automatically**:
   - Detect it's a React project
   - Use the `vercel.json` configuration
   - Build the frontend from the `/frontend` directory
   - Deploy the optimized build

## ✅ **Solution 2: Manual Configuration** (If Solution 1 doesn't work)

If you need to configure manually in Vercel dashboard:

### Build Settings:
- **Framework Preset**: `Create React App`
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: `cd frontend && npm install`

### Root Directory:
- Set root directory to: `frontend`

## ✅ **Solution 3: Alternative Vercel.json Configuration**

If the current `vercel.json` doesn't work, replace it with this simpler version:

```json
{
  "version": 2,
  "name": "ameneses",
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🔧 **Troubleshooting**

### If you still get the index.html error:

1. **Check the Build Output**:
   - Verify that `frontend/build/index.html` exists after build
   - Run `npm run build` locally to confirm

2. **Verify File Structure**:
   ```
   Ameneses/
   ├── frontend/
   │   ├── public/
   │   │   └── index.html ✓
   │   ├── build/ (after build)
   │   │   └── index.html ✓
   │   └── package.json
   ├── vercel.json
   └── package.json
   ```

3. **Clear Vercel Cache**:
   - In Vercel dashboard, go to your project
   - Settings → Functions → Clear All Cache

4. **Redeploy**:
   - Go to Deployments tab
   - Click the three dots on latest deployment
   - Click "Redeploy"

## 🎯 **Backend Deployment** (Separate)

For the backend (Node.js API), you'll need to deploy it separately:

### Option 1: Vercel (for API)
1. Create a new Vercel project for the backend
2. Set root directory to `backend`
3. Use these settings:
   - **Framework**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

### Option 2: Render/Railway/Heroku
Deploy the backend folder to any Node.js hosting service.

## 🔗 **Environment Variables**

Don't forget to set environment variables in Vercel:
- `REACT_APP_API_URL` (pointing to your backend URL)

## ✨ **Current Build Status**

✅ Build completed successfully locally
✅ No ESLint warnings
✅ Optimized production build ready
✅ Proper vercel.json configuration included

Your project is now ready for successful Vercel deployment!
