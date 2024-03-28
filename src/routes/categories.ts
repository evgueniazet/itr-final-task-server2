import express from 'express';
import model from 'models';
import { routes } from 'constants/routes';
import { TCategory, TCategoryModel } from 'types';
import { EErrorMessages } from 'enums';

const router = express.Router();

router.get(routes.allCategories, async (_, res) => {
    const categoriesListData: TCategoryModel[] = await model.categories.findAll({
        attributes: ['id', 'title'],
    });

    const categoriesList: TCategory[] = categoriesListData.map((item) => item.dataValues);

    res.json(categoriesList);
});

router.post(routes.createCategory, async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json(EErrorMessages.NOT_ENOUGH_DATA_TO_CREATE_CATEGORY);
    }

    const category = await model.categories.findByPk(title);

    if (category) {
        return res.status(400).json(EErrorMessages.CATEGORY_ALREADY_EXIST);
    }

    const newCategory = await model.categories.create({ title });

    res.status(201).json(newCategory);
});

export { router };
