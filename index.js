const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
app.use(session({ secret: "key" }));

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "818315995789-tpnbp71olf5thh59a4hkh08iri31bck4.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8090/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      return cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
app.get("/", (req, res)=>{ 
   res.send("Welcome to the Google Developer Community");
});

passport.serializeUser((user,done)=>{
  return done(null, user );
})
passport.deserializeUser((user,done)=>{
  return done(null, user );
});

app.listen(8090, () => {
  console.log("listening on port 8090");
});

