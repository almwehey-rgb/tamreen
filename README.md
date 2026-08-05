# tamreen

## Supabase setup

1. Copy `.env.example` to `.env` and fill in your Supabase project's URL and anon key (Project Settings → API in the Supabase dashboard).
2. Install dependencies: `npm install`
3. Run: `npm run dev`

The client is configured in `src/supabaseClient.ts` and exported as `supabase` for use throughout the app.