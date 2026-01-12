# TODO List for Fixing Supabase and Meta Tag Issues

## Tasks
- [x] Update deprecated meta tag in index.html
- [ ] Create .env file with Supabase environment variables
- [ ] Verify Supabase client initialization

## Details
- **Meta Tag Fix**: Changed `apple-mobile-web-app-capable` to `mobile-web-app-capable` in index.html.
- **Supabase URL Error**: The error "supabaseUrl is required" indicates missing environment variables. Create a .env file in the root directory with:
  ```
  VITE_SUPABASE_URL=your_supabase_url_here
  VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key_here
  ```
  Replace with actual values from your Supabase project settings.
- **Verification**: After creating .env, restart the development server and check for errors.
