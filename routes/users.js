const router = require("express").Router();
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const { JWT_KEY } = process.env;

const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_KEY);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid JWT" });
  }
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await knex("users").insert({ name, email, password: hashedPassword });
    res.status(201).send("Registered successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed registration.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await knex("users").where({ email }).first();
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign({ name: user.name, email: user.email }, JWT_KEY);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.get("/current", authorize, async (req, res) => {
  try {
    res.status(200).json({ message: `Welcome back, ${req.user.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
