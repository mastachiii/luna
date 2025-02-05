const { body, validationResult } = require("express-validator");

const validateSignUp = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .custom(async value => {
            const user = db.getUserByUsername({ username: value });

            if (user) throw new Error("Username is already taken");
        }),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is in an invalid format")
        .custom(async value => {
            const user = db.getUserByEmail({ email: value });

            if (email) throw new Error("Email has already been used.");
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
