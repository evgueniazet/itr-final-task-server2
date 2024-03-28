"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const models_1 = tslib_1.__importDefault(require("models"));
const routes_1 = require("../constants/routes");
const router = express_1.default.Router();
exports.router = router;
router.get(routes_1.routes.allCategories, (_, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const categoriesListData = yield models_1.default.categories.findAll({
        attributes: ['id', 'title'],
    });
    const categoriesList = categoriesListData.map((item) => item.dataValues);
    res.json(categoriesList);
}));
//# sourceMappingURL=categories.js.map