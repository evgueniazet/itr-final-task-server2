"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const models_1 = tslib_1.__importDefault(require("models"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const config_1 = tslib_1.__importDefault(require("config/config"));
const routes_1 = require("constants/routes");
const enums_1 = require("enums");
const utils_1 = require("utils");
const jwtSecretCert = fs_1.default.readFileSync(config_1.default.JWT_CERT_PATH, 'utf8');
const router = express_1.default.Router();
exports.router = router;
router.get(routes_1.routes.allUsers, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const usersListData = yield models_1.default.users.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'role', 'isBlocked'],
    });
    const usersList = usersListData.map((item) => item.dataValues);
    res.json(usersList);
}));
router.get(routes_1.routes.user, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const user = yield models_1.default.users.findByPk(userId);
    if (!user) {
        return res.status(500).json({ error: { message: enums_1.EErrorMessages.USER_NOT_FOUND } });
    }
    res.status(200).json(user);
}));
router.post(routes_1.routes.updateUserRole, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { userId, newRole } = req.body;
    const user = yield models_1.default.users.findByPk(userId);
    if (!user) {
        return res.status(500).json({ error: { message: enums_1.EErrorMessages.USER_NOT_FOUND } });
    }
    yield user.update({ role: newRole });
    res.status(200).json(user);
}));
router.post(routes_1.routes.updateUserBlockStatus, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { userId, isBlocked } = req.body;
    const user = yield models_1.default.users.findByPk(userId);
    if (!user) {
        return res.status(500).json({ error: { message: enums_1.EErrorMessages.USER_NOT_FOUND } });
    }
    yield user.update({ isBlocked });
    res.status(200).json(user);
}));
router.post(routes_1.routes.deleteUser, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield models_1.default.users.findByPk(userId);
    if (!user) {
        return res.status(500).json({ error: { message: enums_1.EErrorMessages.USER_NOT_FOUND } });
    }
    yield user.destroy();
    res.status(200).json(user);
}));
router.post(routes_1.routes.register, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, surname } = req.body;
    const user = yield models_1.default.users.findOne({ where: { email } });
    if (user) {
        res.status(401).json({
            errors: { message: enums_1.EErrorMessages.UNAUTHORIZED_USER_EXIST },
        });
    }
    else {
        yield models_1.default.users.create({
            email,
            password,
            name,
            surname,
            role: enums_1.ERoles.USER,
            isBlocked: 0,
        });
        const user = yield models_1.default.users.findOne({ where: { email } });
        const token = (0, utils_1.createToken)({ email }, config_1.default.TOKEN_LIFETIME, jwtSecretCert);
        res.json({ token, user });
    }
}));
router.post(routes_1.routes.login, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.default.users.findOne({ where: { email } });
    if (!user) {
        res.status(401).json({
            errors: { message: enums_1.EErrorMessages.UNAUTHORIZED_USER_NOTFOUND },
        });
    }
    else {
        if (password === user.password) {
            const token = (0, utils_1.createToken)({ email: user.email }, config_1.default.TOKEN_LIFETIME, jwtSecretCert);
            res.json(token);
        }
        else {
            res.status(401).json({
                errors: { message: enums_1.EErrorMessages.UNAUTHORIZED_WRONG_CREDENTIALS },
            });
        }
    }
}));
//# sourceMappingURL=users.js.map