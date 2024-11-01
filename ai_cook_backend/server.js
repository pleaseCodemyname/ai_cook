const express = require('express');
const cors = require('cors');
const path = require('path');
const ingredientRoutes = require('./routes/ingredient_routes'); // 경로와 파일명 확인 필요

const app = express();
const PORT = 5000;

app.use(cors());

// API 라우트가 정적 파일 라우트보다 위에 있어야 합니다.
app.use('/api/recipes', ingredientRoutes);

app.use(express.static(path.join(__dirname, '../ai_cook_frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ai_cook_frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
