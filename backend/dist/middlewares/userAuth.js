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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
function userAuth(req, res, next) {
    try {
        let authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                details: 'Invalid Bearer token'
            });
        }
        let token = authHeader.split(' ')[1];
        let secretKey = process.env.SECRET_KEY;
        let decoded = jwt.verify(token, secretKey);
        if (decoded) {
            req.userId = decoded.email;
            next();
        }
        else {
            res.json({ details: 'Invalid Bearer token' });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Invalid Token" });
    }
}
exports.userAuth = userAuth;
