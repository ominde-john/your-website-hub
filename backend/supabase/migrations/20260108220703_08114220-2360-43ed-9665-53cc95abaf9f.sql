-- Drop existing restrictive policies on email_verification_codes
DROP POLICY IF EXISTS "Anyone can insert verification codes" ON public.email_verification_codes;
DROP POLICY IF EXISTS "Anyone can read verification codes" ON public.email_verification_codes;
DROP POLICY IF EXISTS "Anyone can update verification codes" ON public.email_verification_codes;

-- Recreate as PERMISSIVE policies (the default, explicitly stated)
CREATE POLICY "Anyone can insert verification codes"
ON public.email_verification_codes
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can read verification codes"
ON public.email_verification_codes
AS PERMISSIVE
FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can update verification codes"
ON public.email_verification_codes
AS PERMISSIVE
FOR UPDATE
TO public
USING (true);

-- Also add a policy for login by username lookup (profiles table)
DROP POLICY IF EXISTS "Allow public username lookup" ON public.profiles;
CREATE POLICY "Allow public username lookup"
ON public.profiles
AS PERMISSIVE
FOR SELECT
TO public
USING (true);