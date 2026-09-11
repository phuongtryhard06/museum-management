const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

let USERS_LIST = [
  { id: 1, fullName: 'Phạm Đức Quang', username: 'admin', email: 'admin@baotang.gov.vn', phone: '0909090909', role: 'ADMIN', roleName: 'Quản trị viên', isLocked: false },
  { id: 2, fullName: 'Trần Thị Mai', username: 'banve01', email: 'mai.tran@baotang.gov.vn', phone: '0912345678', role: 'BANVE', roleName: 'Bán vé & Đón tiếp', isLocked: false },
  { id: 3, fullName: 'Lê Hoàng Nam', username: 'thukho01', email: 'nam.le@baotang.gov.vn', phone: '0934567890', role: 'THUKHO', roleName: 'Kiểm kê & Thủ kho', isLocked: false }
];

/**
 * GET /api/users
 * Restricted to ADMIN
 */
router.get('/', verifyToken, authorizeRoles('ADMIN'), (req, res) => {
  return res.json({ success: true, data: USERS_LIST });
});

/**
 * POST /api/users
 * Create staff account - Restricted to ADMIN
 */
router.post('/', verifyToken, authorizeRoles('ADMIN'), (req, res) => {
  const { fullName, username, email, phone, role } = req.body;

  const roleNameMap = { ADMIN: 'Quản trị viên', THUKHO: 'Kiểm kê & Thủ kho', BANVE: 'Bán vé & Đón tiếp' };

  const newUser = {
    id: USERS_LIST.length + 1,
    fullName: fullName,
    username: username,
    email: email,
    phone: phone,
    role: role || 'BANVE',
    roleName: roleNameMap[role] || 'Cán bộ',
    isLocked: false
  };

  USERS_LIST.push(newUser);
  return res.status(201).json({ success: true, message: `Đã tạo tài khoản cán bộ ${fullName} thành công!`, data: newUser });
});

/**
 * PUT /api/users/:id/lock
 * Lock or unlock staff account - Restricted to ADMIN
 */
router.put('/:id/lock', verifyToken, authorizeRoles('ADMIN'), (req, res) => {
  const id = parseInt(req.params.id);
  const u = USERS_LIST.find(item => item.id === id);

  if (!u) return res.status(404).json({ success: false, message: 'Không tìm thấy cán bộ!' });

  u.isLocked = !u.isLocked;
  return res.json({ success: true, message: u.isLocked ? `Đã khóa tài khoản cán bộ ${u.fullName}` : `Đã mở khóa tài khoản cán bộ ${u.fullName}`, data: u });
});

module.exports = router;
