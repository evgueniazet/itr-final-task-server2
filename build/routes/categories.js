"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const models_1 = tslib_1.__importDefault(require("models"));
const routes_1 = require("constants/routes");
const enums_1 = require("enums");
const router = express_1.default.Router();
exports.router = router;
router.get(routes_1.routes.allCategories, (_, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const categoriesListData = yield models_1.default.categories.findAll({
        attributes: ['id', 'title'],
    });
    const categoriesList = categoriesListData.map((item) => item.dataValues);
    res.json(categoriesList);
}));
router.post(routes_1.routes.createCategory, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json(enums_1.EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_CATEGORY);
    }
    const category = yield models_1.default.categories.findByPk(title);
    if (category) {
        return res.status(400).json(enums_1.EErrorMessages.CATEGORY_ALREADY_EXIST);
    }
    const newCategory = yield models_1.default.categories.create({ title });
    res.status(201).json(newCategory);
}));
//# sourceMappingURL=categories.js.map