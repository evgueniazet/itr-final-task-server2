import express from 'express';
import model from 'models';
import { routes } from '../constants/routes';
import { TCollection, TCollectionItem } from '../types';
import { EErrorMessages } from 'enums/EErrorMessages';

const router = express.Router();

router.get(routes.allCollections, async (req, res) => {
    const { userId } = req.query;

    const collectionsListData: TCollectionItem[] = await model.collections.findAll({
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

    const collectionsList: TCollection[] = collectionsListData.map((item) => item.dataValues);

    res.json(collectionsList);
});

router.post(routes.createCollection, async (req, res) => {
    const fields = req.body;

    if (!fields) {
        return res.status(400).json(EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_COLLECTION);
    }

    const newCollection: TCollectionItem = await model.collections.create({
        ...fields,
    });

    res.status(201).json(newCollection);
});

router.post(routes.deleteCollection, async (req, res) => {
    const { collectionId } = req.body;

    const collection = await model.collections.findByPk(collectionId);

    if (!collection) {
        return res.status(500).json({ error: { message: EErrorMessages.COLLECTION_NOT_FOUND } });
    }

    await collection.destroy();

    res.status(200).json(collection);
});

router.put(routes.updateCollection, async (req, res) => {
    const { collectionId } = req.query;
    const updatedFields = req.body;

    const collection = await model.collections.findByPk(collectionId);

    if (!collection) {
        return res.status(404).json({ error: { message: EErrorMessages.COLLECTION_NOT_FOUND } });
    }

    await collection.update(updatedFields);

    res.status(200).json(collection);
});

router.get(routes.getCollectionById, async (req, res) => {
    const { collectionId } = req.query;

    const collection = await model.collections.findByPk(collectionId);

    if (!collection) {
        return res.status(404).json({ error: { message: EErrorMessages.COLLECTION_NOT_FOUND } });
    }

    res.json(collection);
});

export { router };
