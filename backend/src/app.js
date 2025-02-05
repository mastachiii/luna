const express = require("express");

// Routes
const userRoute = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);

app.get("/", (req, res) => res.send("Hello Express"));

// Error handling
app.use((err, req, res, next) => {
    console.log(err);

    res.json({ error: err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
