const express = require("express");
const session = require("express-session");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passportConfig = require("./passport/passport");
require("dotenv").config();

const databaseUrl = process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

// Routes
const userRoute = require("./routes/userRoutes");
const conversationRoute = require("./routes/conversationRoutes");
const passport = require("passport");
const { isAuthenticated } = require("./helpers/authMiddleware");

const app = express();

// Middlewares
app.use(
    session({
        cookie: {
            maxAge: 20 * 60 * 100000,
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        store: new PrismaSessionStore(
            new PrismaClient({
                datasources: {
                    db: {
                        url: databaseUrl,
                    },
                },
            }),
            {
                dbRecordIdFunction: false,
                dbRecordIdIsSessionId: true,
            }
        ),
    })
);
app.use(passport.authenticate("session"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/conversation", conversationRoute);

app.get("/", isAuthenticated, (req, res, next) => console.log(req.user));

// Error handling
app.use((err, req, res, next) => {
    console.log(err);

    res.json({ error: err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
