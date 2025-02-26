const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passportConfig = require("./passport/passport");
require("dotenv").config();

const databaseUrl = process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

// Routes
const userRoute = require("./routes/userRoutes");
const conversationRoute = require("./routes/conversationRoutes");
const passport = require("passport");

const app = express();

// Middlewares
app.set("trust proxy", 1);
app.use(
    session({
        cookie: {
            maxAge: 20 * 60 * 100000,
            sameSite: "none",
            secure: true,
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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/conversation", conversationRoute);

// Error handling
app.use((err, req, res, next) => {
    console.log(err);

    res.status(400).json({ error: err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
