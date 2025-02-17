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

                if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), err: true });

                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) next(err);

                    req.body.password = hash;

                    const user = await db.createUser(req.body);

                    return res.status(201).json({ user });
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
        return res.status(200).json({ user: req.user });
    }

    // ONLY USE REQ.BODY WHEN TESTING,
    async addUser(req, res, next) {
        try {
            const receiverId = await db.getUserId({ username: req.body.receiverUsername });

            await db.addUser({ id: req.user.id, receiverId });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async acceptUser(req, res, next) {
        try {
            await db.acceptUser({ id: req.user.id, senderId: +req.params.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async rejectUser(req, res, next) {
        try {
            await db.rejectUser({ id: req.user.id, senderId: +req.params.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async cancelRequest(req, res, next) {
        try {
            await db.cancelFriendRequest({ id: req.user.id, receiverId: +req.params.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async removeFriend(req, res, next) {
        try {
            await db.removeFriend({ id: req.user.id, friendId: +req.params.id });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async getUserData(req, res, next) {
        try {
            const user = await db.getUser({ id: req.user.id });

            return res.status(200).json({ user });
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            await db.updateUser({ id: req.user.id, displayName: req.body.displayName, profilePicture: req.publicUrl });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async changeUserStatus(req, res, next) {
        try {
            await db.modifyUserStatus({ id: req.user.id, isOnline: req.body.status });

            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    async getAvailableUsers(req, res, next) {
        try {
            const users = await db.getAvailableUsers({ id: req.user.id });

            return res.status(200).json({ users });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new User();
