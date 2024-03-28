"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (token, lifetime, cert) => {
    return (0, jsonwebtoken_1.sign)(Object.assign(Object.assign({}, token), { exp: Math.floor(Date.now() / 1000) + lifetime * 60 }), cert, { algorithm: 'RS256' });
};
exports.createToken = createToken;
//# sourceMappingURL=createToken.js.map