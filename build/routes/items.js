"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const models_1 = tslib_1.__importDefault(require("models"));
const routes_1 = require("../constants/routes");
const EErrorMessages_1 = require("enums/EErrorMessages");
const router = express_1.default.Router();
exports.router = router;
router.get(routes_1.routes.allItemsInCollection, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { collectionId } = req.query;
    const itemsInCollectionListData = yield models_1.default.items.findAll({
        where: { collectionId },
        attributes: [
            'id',
            'title',
            'tags',
            'collectionId',
            'custom_int1',
            'custom_int2',
            'custom_int3',
            'custom_string1',
            'custom_string2',
            'custom_string3',
            'custom_text1',
            'custom_text2',
            'custom_text3',
            'custom_boolean1',
            'custom_boolean2',
            'custom_boolean3',
            'custom_date1',
            'custom_date2',
            'custom_date3',
        ],
    });
    const itemsInCollectionList = itemsInCollectionListData.map((item) => item.dataValues);
    res.json(itemsInCollectionList);
}));
router.post(routes_1.routes.createItem, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fields = req.body;
    if (!fields) {
        return res.status(400).json(EErrorMessages_1.EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_ITEM_IN_COLLECTION);
    }
    const newItem = yield models_1.default.items.create(Object.assign({}, fields));
    res.status(201).json(newItem);
}));
router.post(routes_1.routes.deleteItem, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const item = yield models_1.default.items.findByPk(itemId);
    if (!item) {
        return res
            .status(500)
            .json({ error: { message: EErrorMessages_1.EErrorMessages.ITEM_IN_COLLECTION_NOT_FOUND } });
    }
    yield item.destroy();
    res.status(200).json(item);
}));
router.put(routes_1.routes.updateItem, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.query;
    const updatedFields = req.body;
    const item = yield models_1.default.items.findByPk(itemId);
    if (!item) {
        return res
            .status(404)
            .json({ error: { message: EErrorMessages_1.EErrorMessages.ITEM_IN_COLLECTION_NOT_FOUND } });
    }
    yield item.update(updatedFields);
    res.status(200).json(item);
}));
//# sourceMappingURL=items.js.map