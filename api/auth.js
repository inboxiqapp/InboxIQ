// api/auth.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://inboxiq-hf2n.onrender.com/api/auth/google/callback",
      passReqToCallback: true // so we can access req in verify
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          accessToken,
          refreshToken
        };

        // TODO: Replace this with DB save (Prisma, Supabase, etc.)
        console.log("✅ Google user authenticated:", user.email);

        return done(null, user);
      } catch (err) {
        console.error("❌ Error in GoogleStrategy:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize only minimal user info into the session cookie
passport.serializeUser((user, done) => {
  done(null, { id: user.id, email: user.email });
});

// Deserialize back into req.user
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
