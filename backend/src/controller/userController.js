const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../model/userQueries");

const validateSignUp = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .custom(async value => {
            const user = await db.getUserByUsername({ username: value });

            if (user) throw new Error("Username is already taken");
        }),
    body("email")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Email is in an invalid format")
        .custom(async value => {
            const user = await db.getUserByEmail({ email: value });

            if (user) throw new Error("Email has already been used.");
        }),
    body("displayName").trim().notEmpty().withMessage("Display name is required"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isAlphanumeric()
        .isLength({ min: 10 })
        .withMessage("Password must contain atleast 10 characters and must have atleast one number or letter"),
    body("passwordConfirm")
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Password does not match"),
];

const validateLogIn = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
];

class User {
    signUp = [
        validateSignUp,
        async (req, res, next) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) return res.send({ errors: errors.array() });

                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) next(err);

                    req.body.password = hash;

                    const user = await db.createUser(req.body);

                    return res.status(200).json({ user });
                });
            } catch (err) {
                next(err);
            }
        },
    ];

    validateLoginForm = [
        validateLogIn,
        async (req, res, next) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

                next();
            } catch (err) {
                next(err);
            }
        },
    ];

    logIn(req, res, next) {
        console.log(req.user);

        return res.status(200).json({ message: "Authorized" });
    }

    async addUser(req, res, next) {
        try {
            await db.addUser({ id: req.user.id, receiverId: +req.params.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new User();
