const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findUserByToken } = require("../db/users");

const authenticateUser = async ({ username, password }) => {
  const SQL = `--sql
    SELECT id, password, admin
    FROM users
    WHERE username = $1
  `;
  const response = await db.query(SQL, [username]);
  if (
    !response.rows.length ||
    !(await bcrypt.compare(password, response.rows[0].password))
  ) {
    const error = new Error("Unauthorized: Invalid credentials.");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: response.rows[0].id }, process.env.JWT_SECRET);
  console.log("Generated Token:", token);
  return { token };
};

// const isLoggedIn = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "");
//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized: You must be logged in.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Unauthorized: Admin only." });
  }
  next();
};

module.exports = { authenticateUser, isLoggedIn, isAdmin };
