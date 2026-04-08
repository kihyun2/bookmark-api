require('./tracing');

const express = require('express');
const bookmarksRouter = require('./routes/bookmarks');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', version: 'v2' }));
app.use('/bookmarks', bookmarksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
