{
    "code": "const express = require('express');\nconst bcrypt = require('bcrypt');\nconst jwt = require('jsonwebtoken');\nconst User = require('./models/User'); // Assuming User model exists\n\nconst app = express();\napp.use(express.json());\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';\n\n// Register new user\napp.post('/register', async (req, res) => {\n  try {\n    const { username, password } = req.body;\n    const hashedPassword = await bcrypt.hash(password, 10);\n    const user = new User({ username, password: hashedPassword });\n    await user.save();\n    res.status(201).send('User created');\n  } catch (error) {\n    res.status(500).send(error.message);\n  }\n});\n\n// User login\napp.post('/login', async (req, res) => {\n  try {\n    const { username, password } = req.body;\n    const user = await User.findOne({ username });\n    if (!user || !(await bcrypt.compare(password, user.password))) {\n      return res.status(401).send('Invalid credentials');\n    }\n    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });\n    res.json({ token });\n  } catch (error) {\n    res.status(500).send(error.message);\n  }\n});\n\nmodule.exports = app;",
    "summary": "Implemented user authentication for the REST API using Express.js. The code includes two endpoints: '/register' for user registration, which hashes the password before saving it to the database, and '/login' for user login, which checks the credentials and returns a JWT token upon successful authentication. The bcrypt library is used for password hashing, and the jsonwebtoken library is used for generating JWT tokens.",
    "checklist": [
        "Create '/register' endpoint for new user registration",
        "Hash user password before saving to the database",
        "Create '/login' endpoint for user authentication",
        "Validate user credentials and return JWT token upon successful login",
        "Use bcrypt for password hashing",
        "Use jsonwebtoken for generating JWT tokens"
    ]
}