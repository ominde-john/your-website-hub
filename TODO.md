# TODO List for Fixing Supabase and OAuth Issues

## Tasks
- [x] Update deprecated meta tag in index.html
- [ ] Create .env file with Supabase environment variables
- [ ] Verify Supabase client initialization
- [ ] Configure OAuth redirect URLs in Supabase
- [ ] Test Google OAuth flow

## Details

### Meta Tag Fix
- **Status**: ✅ Fixed
- **Change**: Changed `apple-mobile-web-app-capable` to `mobile-web-app-capable` in index.html.

### Supabase Environment Variables
- **Status**: ⚠️ Required
- **Issue**: The error "supabaseUrl is required" indicates missing environment variables.
- **Solution**: Create a .env file in the root directory with:
  ```env
  VITE_SUPABASE_URL=your_supabase_url_here
  VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key_here
  ```
- **Instructions**: Get values from your Supabase project settings: https://supabase.com/dashboard/project/_/settings/api

### OAuth 404 Redirect Fix
- **Status**: ✅ Fixed (Vercel configuration)
- **Issue**: Users getting 404 when signing in with Google OAuth
- **Root Cause**: 
  1. Vercel SPA routing configuration
  2. Missing OAuth redirect URLs in Supabase
- **Solution**: 
  1. Updated `vercel.json` with proper SPA rewrites
  2. Added security headers
  3. Created `OAUTH_SETUP.md` with detailed setup instructions

### Required: Supabase OAuth Configuration
**CRITICAL**: You must configure OAuth redirect URLs in Supabase:

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add these redirect URLs:
   - Local: `http://localhost:8080/auth/callback`
   - Production: `https://your-domain.com/auth/callback`
   - Preview: `https://*.vercel.app/auth/callback`
3. Enable Google provider in Authentication → Providers
4. Add Google OAuth credentials (Client ID & Secret)

**See `OAUTH_SETUP.md` for complete setup guide.**

### Verification Steps
1. Set up environment variables (`.env` file)
2. Configure Supabase OAuth redirect URLs
3. Enable and configure Google provider in Supabase
4. Test locally: `npm run dev`
5. Deploy to Vercel
6. Test production OAuth flow

