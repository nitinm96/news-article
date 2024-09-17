const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateTokenHandler = require("../middleware/validateTokenHandler");

//Create a new router to handle /users routes
const router = express.Router();

/**
 * @openapi
 * /api/users/register:
 *  post:
 *    tags:
 *      - Users
 *    summary: "Register a new user"
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      '201':
 *        description: "User registered successfully"
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/CreateUserResponse'
 *      '400':
 *        description: "Client error, please fill in all fields"
 *      '409':
 *        description: "Username already exists"
 *      '500':
 *        description: "Failed to register user"
 */
router.post("/register", registerUser); //register new user

/**
 * @openapi
 * /api/users/login:
 *  post:
 *    tags:
 *      - Users
 *    summary: "Login in a existing user"
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      '200':
 *        description: "User logged in successfully and token provided"
 *      '400':
 *        description: "Client error, please fill in all fields"
 *      '401':
 *        description: "Incorrect username or account does not exist or incorrect password"
 *      '500':
 *        description: "Failed to login user"
 */
router.post("/login", loginUser); //login a register user

/**
 * @openapi
 * /api/users/current:
 *  get:
 *    tags:
 *      - Users
 *    summary: "Get current user information"
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: "Current user information fetched successfully"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  example: "66e7411ed1c9ddd9a7d8a0bd"
 *                username:
 *                  type: string
 *                  example: "testuser"
 *      '404':
 *        description: "User not found"
 *      '500':
 *        description: "Failed to fetch user information"
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//get current user information
router.get("/current", validateTokenHandler, currentUser);

module.exports = router;
