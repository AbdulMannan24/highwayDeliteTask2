"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = require("../db");
const types_1 = require("../types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userInfo_1 = require("../utils/userInfo");
const emailer_1 = require("../utils/emailer");
const router = express_1.default.Router();
// singUp
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body);
        const { success } = types_1.credentials.safeParse(req.body);
        if (!success) {
            res.json({ details: "Incomplete/Invalid Details" });
            return;
        }
        // checking for existing user
        let userExists = yield (0, userInfo_1.fetchUser)(req.body.email);
        if (userExists > 0) {
            res.json({ details: "User already exists" });
            return;
        }
        let email = req.body.email;
        let password = req.body.password;
        let salt = yield bcrypt_1.default.genSalt(10);
        let hashedPass = yield bcrypt_1.default.hash(password, salt);
        let sqlQuery = `INSERT INTO users (email, password) VALUES($1, $2)`;
        let createdUser = yield db_1.db.query(sqlQuery, [email, hashedPass]);
        if (createdUser.rowCount > 0) {
            let secretKey = process.env.SECRET_KEY;
            let token = jwt.sign({
                email: email
            }, secretKey);
            let link = `http://localhost:5173/verify/${email}`;
            yield (0, emailer_1.sendEmail)(email, link);
            res.json({
                message: "success",
                token: token
            });
        }
        else {
            res.json({ details: "failed to create user" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api Call Failed" });
    }
}));
// Email Verification
router.post('/verify/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.email == null) {
            res.json({ details: "Invalid Email" });
            return;
        }
        let email = req.params.email;
        let sqlQuery = `UPDATE users SET status = 1 Where email = $1`;
        let verifiedUser = yield db_1.db.query(sqlQuery, [email]);
        if (verifiedUser.rowCount > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ details: "failed to verify user" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api Call Failed" });
    }
}));
// resend verification link
router.get('/resend/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.email == null) {
            res.json({ details: "Invalid Email" });
            return;
        }
        let email = req.params.email;
        let link = `http://localhost:5173/verify/${email}`;
        yield (0, emailer_1.sendEmail)(email, link);
        res.json({ message: "success" });
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api Call Failed" });
    }
}));
// signIn 
router.post('/signIn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { success } = types_1.credentials.safeParse(req.body);
        if (!success) {
            res.json({ details: "Invalid Credentials" });
            return;
        }
        let user = yield (0, userInfo_1.getUser)(req.body.email);
        if (user.length == 0) {
            res.json({ details: "User does not exist" });
            return;
        }
        const checkPassword = yield bcrypt_1.default.compare(req.body.password, user[0].password);
        if (checkPassword) {
            if (user[0].status == 0) {
                return res.json({ details: "Please Verify your Email" });
            }
            let secretKey = process.env.SECRET_KEY;
            let token = jwt.sign({
                email: req.body.email
            }, secretKey);
            return res.json({
                message: "success",
                token: token
            });
        }
        else {
            return res.json({
                details: "Password is incorrect"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api Call Failed" });
    }
}));
exports.default = router;
