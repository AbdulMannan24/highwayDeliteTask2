"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteBody = exports.credentials = void 0;
const zod_1 = __importDefault(require("zod"));
exports.credentials = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.noteBody = zod_1.default.object({
    title: zod_1.default.string().min(1),
    content: zod_1.default.string().min(1)
});