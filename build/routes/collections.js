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
router.get(routes_1.routes.allCollections, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const collectionsListData = yield models_1.default.collections.findAll({
        where: { userId },
        attributes: [
            'id',
            'title',
            'userId',
            'description',
            'image',
            'category',
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
    const collectionsList = collectionsListData.map((item) => item.dataValues);
    res.json(collectionsList);
}));
router.post(routes_1.routes.createCollection, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const fields = req.body;
    if (!fields) {
        return res.status(400).json(EErrorMessages_1.EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_COLLECTION);
    }
    const newCollection = yield models_1.default.collections.create(Object.assign({}, fields));
    res.status(201).json(newCollection);
}));
router.post(routes_1.routes.deleteCollection, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { collectionId } = req.body;
    const collection = yield models_1.default.collections.findByPk(collectionId);
    if (!collection) {
        return res.status(500).json({ error: { message: EErrorMessages_1.EErrorMessages.COLLECTION_NOT_FOUND } });
    }
    yield collection.destroy();
    res.status(200).json(collection);
}));
router.put(routes_1.routes.updateCollection, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { collectionId } = req.query;
    const updatedFields = req.body;
    const collection = yield models_1.default.collections.findByPk(collectionId);
    if (!collection) {
        return res.status(404).json({ error: { message: EErrorMessages_1.EErrorMessages.COLLECTION_NOT_FOUND } });
    }
    yield collection.update(updatedFields);
    res.status(200).json(collection);
}));
router.get(routes_1.routes.getCollectionById, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { collectionId } = req.query;
    const collection = yield models_1.default.collections.findByPk(collectionId);
    if (!collection) {
        return res.status(404).json({ error: { message: EErrorMessages_1.EErrorMessages.COLLECTION_NOT_FOUND } });
    }
    res.json(collection);
}));
//# sourceMappingURL=collections.js.map