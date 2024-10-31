const express = require('express');
const cors = require('cors');
const path = require('path');
const ingredientRoutes = require('./routes/ingredient_routes');

const app = express();
const PORT = 5000;

// CORS 설정 추가
app.use(cors());

// 정적 파일 제공 (예: 프론트엔드 빌드된 파일 경로 설정)
app.use(express.static(path.join(__dirname, '../ai_cook_frontend/build')));

// /api 경로에 ingredientRoutes 사용
app.use('/api', ingredientRoutes);

// 기본 라우트 설정 (모든 요청을 프론트엔드의 index.html로 리디렉션)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ai_cook_frontend/build', 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
