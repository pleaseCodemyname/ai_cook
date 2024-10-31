// controllers/ingredientController.js
const Ingredient = require('../models/ingredient');

// 재료 추가
exports.addIngredient = async (req, res) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).json({ message: "재료 추가 성공", ingredient });
    } catch (error) {
        res.status(500).json({ message: "재료 추가 실패", error });
    }
};

// 모든 재료 조회
exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: "재료 조회 실패", error });
    }
};

// 재료 삭제
exports.deleteIngredient = async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "재료 삭제 성공" });
    } catch (error) {
        res.status(500).json({ message: "재료 삭제 실패", error });
    }
};
