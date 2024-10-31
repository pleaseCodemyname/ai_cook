// controllers/recipeController.js
const axios = require('axios');

exports.getRecipeSuggestions = async (req, res) => {
    try {
        const ingredients = req.query.ingredients; // 재료 이름을 콤마로 구분
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
            params: {
                ingredients,
                number: 5,
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "레시피 가져오기 실패", error });
    }
};
