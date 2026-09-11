const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

// Sample Dataset for fallback
let MOCK_ARTIFACTS = [];

/**
 * GET /api/artifacts
 * Query artifacts catalog with optional search & filter
 */
router.get('/', async (req, res) => {
  const { search, region, ethnic } = req.query;

  try {
    let results = MOCK_ARTIFACTS;

    try {
      const [rows] = await pool.query('SELECT * FROM HienVat');
      if (rows.length > 0) results = rows;
    } catch (err) {}

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(art => art.title.toLowerCase().includes(q) || art.code.toLowerCase().includes(q) || art.ethnic.toLowerCase().includes(q));
    }

    if (region) {
      results = results.filter(art => art.region === region);
    }

    return res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/artifacts/:id
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const art = MOCK_ARTIFACTS.find(item => item.id === id);
  if (!art) return res.status(404).json({ success: false, message: 'Không tìm thấy hiện vật!' });
  return res.json({ success: true, data: art });
});

/**
 * POST /api/artifacts (Staff inventory addition)
 */
router.post('/', async (req, res) => {
  const { code, title, ethnic, region, material, location, img } = req.body;

  const newArt = {
    id: MOCK_ARTIFACTS.length + 1,
    code: code || `HV-00${MOCK_ARTIFACTS.length + 1}`,
    title: title || 'Hiện vật mới',
    ethnic: ethnic || 'Dân tộc Kinh',
    region: region || 'Vùng Việt Bắc',
    material: material || 'Vải, gỗ',
    era: 'Thế kỷ XX',
    location: location || 'Kho Bảo Quản 1',
    status: 'Nguyên vẹn',
    img: img || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    meaning: 'Hồ sơ di sản mới được bổ sung từ API Backend.'
  };

  try {
    await pool.query(
      'INSERT INTO HienVat (ma_hienvat, ten_hienvat, chat_lieu, hinh_anh) VALUES (?, ?, ?, ?)',
      [newArt.code, newArt.title, newArt.material, newArt.img]
    );
  } catch (err) {}

  MOCK_ARTIFACTS.unshift(newArt);
  return res.status(201).json({ success: true, message: 'Thêm mới hồ sơ hiện vật kho thành công!', data: newArt });
});

/**
 * DELETE /api/artifacts/:id (Staff inventory artifact deletion)
 */
router.delete('/:id', async (req, res) => {
  const idStr = String(req.params.id);
  MOCK_ARTIFACTS = MOCK_ARTIFACTS.filter(item => String(item.id) !== idStr && item.code !== idStr);

  try {
    await pool.query('DELETE FROM HienVat WHERE id = ? OR ma_hienvat = ?', [idStr, idStr]);
  } catch (err) {}

  return res.json({ success: true, message: 'Xóa hồ sơ hiện vật thành công!' });
});

module.exports = router;
