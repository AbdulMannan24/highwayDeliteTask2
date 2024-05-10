"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = void 0;
const pg_1 = require("pg");
exports.db = new pg_1.Client({
    user: 'ma24042000',
    password: process.env.POSTGRESQL_PASS,
    host: 'ep-winter-thunder-17348528.us-east-2.aws.neon.tech',
    database: 'NotesDB',
    port: 5432,
    ssl: {
        rejectUnauthorized: true
    }
});
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.db.connect();
            console.log('Connected to PostgreSQL database');
        }
        catch (error) {
            console.error('Error connecting to PostgreSQL:', error);
        }
    });
}
exports.connectDB = connectDB;
