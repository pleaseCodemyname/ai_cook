import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  // 재료 및 레시피 상태
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // AI 추천 레시피 가져오기
  const getRecipes = async () => {
    console.log("getRecipes 호출됨");
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes?ingredients=${encodeURIComponent(ingredients)}`
      );
      console.log("서버 응답:", response.data);
      setRecipes(response.data.recipes);
    } catch (err) {
      console.error("에러 발생:", err);
      setError("레시피를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  

  // 재료 입력 핸들러
  const handleIngredientsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Chef</h1>
        <p>당신의 냉장고에 있는 재료로 최고의 레시피를 추천해드립니다!</p>
      </header>

      <main>
        <div className="input-section">
          <input
            type="text"
            value={ingredients}
            onChange={handleIngredientsChange}
            placeholder="재료를 입력하세요 (예: tomato, cheese)"
          />
          <button onClick={getRecipes} disabled={loading}>
            레시피 추천 받기
          </button>
        </div>

        {loading && <p>레시피를 불러오는 중입니다...</p>}
        {error && <p className="error">{error}</p>}

        <div className="recipes-section">
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="recipe">
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.instructions}</p>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                  레시피 자세히 보기
                </a>
              </div>
            ))
          ) : (
            !loading && <p>추천할 레시피가 없습니다.</p>
          )}
        </div>
      </main>

      <footer>
        <p>AI Chef © 2024. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default App;
