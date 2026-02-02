# OAuth Setup Guide for Google Sign-In

## Problem
Users getting "404 Not Found" error when signing in/up with Google OAuth.

## Root Causes
1. Missing redirect URL configuration in Supabase
2. Incorrect Vercel deployment configuration
3. Missing environment variables

## Solutions

### 1. Configure Supabase OAuth Redirect URLs

You MUST add your callback URL to Supabase's allowed redirect URLs:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add the following URLs to **Redirect URLs**:
   - For local development: `http://localhost:8080/auth/callback`
   - For production: `https://your-domain.com/auth/callback` (replace with your actual Vercel domain)
   - For preview deployments: `https://*.vercel.app/auth/callback`

### 2. Configure Google OAuth in Supabase

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Save the configuration

### 3. Verify Environment Variables

Make sure your `.env` file (or Vercel environment variables) includes:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 4. Vercel Configuration

The `vercel.json` file has been updated to properly handle SPA routing. This ensures that:
- All routes (including `/auth/callback`) are rewritten to `/index.html`
- React Router can handle client-side routing
- Service worker caching is properly configured

## Testing

After making these changes:

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:8080
   - Click "Sign in with Google"
   - Verify redirect to Google
   - Verify redirect back to `/auth/callback`
   - Verify redirect to `/dashboard`

2. **Production Testing:**
   - Deploy to Vercel
   - Test the same flow on your production domain

## Troubleshooting

### Still getting 404?

1. **Check Supabase Logs:**
   - Go to Supabase Dashboard → Authentication → Logs
   - Look for failed OAuth attempts
   - Check for "redirect_uri" errors

2. **Check Browser Console:**
   - Open Developer Tools → Console
   - Look for authentication errors
   - Check Network tab for failed requests

3. **Verify Redirect URL:**
   - The redirect URL in code: `${window.location.origin}/auth/callback`
   - Must match EXACTLY what's configured in Supabase
   - Check for trailing slashes, http vs https, etc.

4. **Clear Browser Cache:**
   - OAuth tokens and redirects can be cached
   - Try in incognito/private mode

### Common Issues

- **CORS Errors:** Make sure your domain is added to Supabase Site URL
- **Invalid Redirect URI:** Double-check Supabase redirect URL configuration
- **Session Not Found:** Check that Supabase client is properly initialized
- **404 on Vercel:** Ensure `vercel.json` is properly deployed (check build logs)

## Additional Resources

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Vercel SPA Configuration](https://vercel.com/docs/concepts/projects/project-configuration)
- [React Router Deployment](https://reactrouter.com/en/main/start/concepts#client-side-routing)
