# Supabase Database Setup Guide

This guide walks you through setting up a fresh Supabase database for the Teksoft website registration system.

## Prerequisites

- A Supabase account ([Sign up here](https://supabase.com))
- A Resend account for sending emails ([Sign up here](https://resend.com))

## Step 1: Create a New Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in the project details:
   - **Organization**: Select or create one
   - **Project name**: e.g., "teksoft-website"
   - **Database password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for it to initialize

## Step 2: Get Your Project Credentials

1. Once your project is ready, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Project API keys** → **anon public** key
   - **Project Reference ID** (visible in the URL or Settings → General)

## Step 3: Update Environment Variables

Update your `.env` file with the new credentials:

```env
VITE_SUPABASE_PROJECT_ID="your-project-reference-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-public-key"
VITE_SUPABASE_URL="https://your-project-reference-id.supabase.co"
```

## Step 4: Apply Database Migration

### Option A: Via Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New query"
3. Copy the entire contents of `migrations/20260108000001_initial_setup.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the migration

### Option B: Via Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (replace with your project ID)
supabase link --project-ref your-project-id

# Apply migrations
supabase db push
```

## Step 5: Deploy Edge Functions

The registration system uses Edge Functions to send emails. Deploy them:

### Set Up Resend API Key

1. Get your Resend API key from [Resend Dashboard](https://resend.com/api-keys)
2. In Supabase Dashboard, go to **Settings** → **Edge Functions**
3. Add a new secret:
   - Name: `RESEND_API_KEY`
   - Value: Your Resend API key

### Deploy Functions

```bash
# Deploy all functions
supabase functions deploy send-confirmation-email
supabase functions deploy send-password-reset-email
supabase functions deploy send-welcome-email
```

Or via Supabase Dashboard:
1. Go to **Edge Functions**
2. For each function in the `functions/` directory, create a new function with the same name
3. Copy the code from `index.ts` into the function editor

## Step 6: Configure Authentication

1. Go to **Authentication** → **Providers**
2. **Email**: Enable email confirmations if desired
3. **Google OAuth** (optional):
   - Enable Google provider
   - Set up OAuth credentials in [Google Cloud Console](https://console.cloud.google.com)
   - Add redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

### Important Auth Settings

Go to **Authentication** → **URL Configuration**:
- **Site URL**: Your production domain (e.g., `https://teksoftllc.jonzjohn.com`)
- **Redirect URLs**: Add your allowed redirect URLs

## Step 7: Update Config File

Update `supabase/config.toml` with your new project ID:

```toml
project_id = "your-new-project-id"
```

## Step 8: Verify Setup

1. Start your local development server:
   ```bash
   npm run dev
   ```
2. Navigate to the registration page
3. Try creating a new account
4. Check that verification email is sent
5. Complete verification and ensure profile is created

## Database Schema

The migration creates the following:

### Tables

1. **email_verification_codes**: Stores 6-digit codes for email verification
   - `email`: User's email address
   - `code`: 6-digit verification code
   - `expires_at`: Code expiration time (10 minutes)
   - `used`: Whether code has been used

2. **profiles**: User profile data
   - `user_id`: Reference to auth.users
   - `first_name`, `last_name`, `username`, `email`
   - `phone_number`, `avatar_url` (optional)
   - `created_at`, `updated_at`

### Storage Buckets

- **avatars**: Public bucket for user profile pictures

### Triggers

- **on_auth_user_created**: Automatically creates profile when user signs up
- **update_profiles_updated_at**: Updates timestamp on profile changes

## Troubleshooting

### Registration fails with "table does not exist"
- Ensure migration was run successfully
- Check SQL Editor for any errors during migration

### Verification emails not being sent
- Verify RESEND_API_KEY is set in Edge Function secrets
- Check Edge Function logs for errors
- Ensure email domain is verified in Resend

### Google OAuth not working
- Verify OAuth credentials are correct
- Check redirect URLs match exactly
- Ensure Google provider is enabled in Supabase

## Support

For issues with Supabase, see their [documentation](https://supabase.com/docs).
