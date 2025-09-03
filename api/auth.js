import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://inboxiq-hf2n.onrender.com/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          email: profile.emails[0].value,
          accessToken,
          refreshToken
        };
    
        console.log("✅ Google user authenticated:", user.email);
        return done(null, user);
      } catch (err) {
        console.error("❌ Error in GoogleStrategy:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize/deserialize user for session handling
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
