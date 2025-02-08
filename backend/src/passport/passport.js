const db = require("../model/userQueries");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsername({ username });
            if (!user) return done(null, false);
            console.log(user)

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return done(null, false);

            return done(null, user);
        } catch (err) {
            done(err);
        }
    })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUser({ id });

        done(null, user);
    } catch (err) {
        done(err);
    }
});
