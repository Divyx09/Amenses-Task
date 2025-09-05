# Frontend-Only Vercel Deployment Guide

## 🎯 **Quick Setup for Frontend Deployment**

### **Option 1: Vercel Dashboard (Recommended)**

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project Settings**:
   ```
   Root Directory: frontend
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Deploy**: Click "Deploy" and Vercel will handle the rest!

### **Option 2: Vercel CLI (Alternative)**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? [your-username]
# - Link to existing project? N
# - Project name: ameneses-frontend
# - Directory: ./
# - Want to override settings? N
```

## 🔧 **Configuration Details**

### **Root Directory: `frontend`**

This is the most important setting. When you set the root directory to `frontend`:

- Vercel will treat the `frontend` folder as the project root
- It will look for `package.json` in the `frontend` directory
- Build commands will run from the `frontend` directory
- The `build` folder will be output to `frontend/build`

### **File Structure After Root Directory Setting**:
```
From Vercel's perspective:
frontend/ (becomes root)
├── public/
│   └── index.html ✓
├── src/
├── package.json ✓
├── vercel.json ✓
└── build/ (after build)
    └── index.html ✓
```

## 📁 **Environment Variables for Frontend**

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
# For connecting to your backend API
REACT_APP_API_URL=https://your-backend-api.com

# If you deploy backend separately
REACT_APP_BACKEND_URL=https://your-backend.vercel.app
```

## 🚀 **Step-by-Step Deployment Process**

### **1. Push Your Code**
```bash
git add .
git commit -m "Configure frontend for Vercel deployment"
git push origin master
```

### **2. Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Select your GitHub repository
- **IMPORTANT**: Set Root Directory to `frontend`

### **3. Verify Build Settings**
```
Framework Preset: Create React App
Build Command: npm run build (auto-detected)
Output Directory: build (auto-detected)
Install Command: npm install (auto-detected)
Root Directory: frontend ← CRUCIAL SETTING
```

### **4. Deploy**
- Click "Deploy"
- Vercel will:
  1. Install dependencies from `frontend/package.json`
  2. Run `npm run build` in the frontend directory
  3. Serve files from `frontend/build`

## ✅ **Verification Steps**

After deployment, verify:

1. **Build Success**: Check deployment logs for successful build
2. **Routes Work**: Test navigation between pages
3. **Assets Load**: Check that CSS, JS, and images load correctly
4. **API Calls**: Ensure frontend can connect to your backend (if deployed separately)

## 🔧 **Troubleshooting**

### **If deployment fails:**

1. **Check Root Directory**: Must be set to `frontend`
2. **Verify package.json**: Should be in `frontend/package.json`
3. **Build Locally**: Run `npm run build` in frontend folder to test
4. **Check Logs**: Review deployment logs in Vercel dashboard

### **Common Issues:**

- **404 on refresh**: Solved by the `vercel.json` routes configuration
- **Assets not loading**: Check if build output directory is correct
- **API calls failing**: Update `REACT_APP_API_URL` environment variable

## 🌐 **Backend Deployment (Separate)**

Since you're deploying only the frontend, deploy the backend separately:

### **Option A: Vercel (for API)**
1. Create a new Vercel project
2. Set root directory to `backend`
3. Framework: Other
4. Deploy

### **Option B: Other Platforms**
- **Render**: Good for Node.js APIs
- **Railway**: Simple deployment
- **Heroku**: Traditional choice

### **Option C: Serverless Functions**
Move backend logic to Vercel serverless functions in `/api` directory.

## 📋 **Final Checklist**

Before deploying:

- [ ] Root directory set to `frontend`
- [ ] `vercel.json` configured in frontend folder
- [ ] Environment variables added in Vercel dashboard
- [ ] Backend deployed separately (if needed)
- [ ] Frontend API URLs updated to point to deployed backend

## 🎉 **Expected Result**

Your frontend will be deployed at: `https://your-project-name.vercel.app`

The deployment will include:
- ✅ React app with routing
- ✅ Event management interface
- ✅ Polling functionality (frontend only)
- ✅ User authentication UI
- ✅ Responsive design
- ✅ Fast loading with optimized build
