const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// 전체 조회
router.get('/', async (req, res) => {
  const bookmarks = await prisma.bookmark.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(bookmarks);
});

// 추가
router.post('/', async (req, res) => {
  const { url, title } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'url은 필수입니다' });
  }
  const bookmark = await prisma.bookmark.create({
    data: { url, title },
  });
  res.status(201).json(bookmark);
});

// 삭제
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.bookmark.delete({ where: { id } });
  res.status(204).send();
});

module.exports = router;
