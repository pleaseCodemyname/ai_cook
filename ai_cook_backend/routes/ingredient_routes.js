const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

// 레시피 추천 API
router.get('/api/recipes', (req, res) => {
  const ingredients = req.query.ingredients;

  if (!ingredients) {
    return res.status(400).json({ error: '재료를 입력해 주세요.' });
  }

  // Python 스크립트를 호출해 레시피 생성
  const scriptPath = path.join(__dirname, 'ai_recipe.py');
  const pythonProcess = spawn('python3', [scriptPath, ingredients]);

  let dataToSend = '';

  pythonProcess.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });

  pythonProcess.on('close', (code) => {
    try {
      const recipe = JSON.parse(dataToSend);
      res.json({ recipes: [recipe] });
    } catch (err) {
      console.error(`JSON 파싱 에러: ${err}`);
      res.status(500).json({ error: '레시피 생성 중 오류가 발생했습니다.' });
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
    res.status(500).json({ error: '레시피 생성 중 오류가 발생했습니다.' });
  });
});

module.exports = router;
