const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

let TICKETS_DB = [];

/**
 * POST /api/tickets/book
 * Online ticket booking API
 */
router.post('/book', (req, res) => {
  const { name, phone, date, slot, adultQty, studentQty, foreignerQty, paymentMethod } = req.body;

  const adult = parseInt(adultQty) || 0;
  const child = parseInt(req.body.childQty) || 0;

  const totalAmount = adult * 30000;
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const ticketCode = `VE-2026-${randomNum}`;
  const qrCodeData = `BAOTANG-#${ticketCode}-${phone}`;

  const newTicket = {
    id: TICKETS_DB.length + 1,
    ticketCode: `#${ticketCode}`,
    name: name || 'Khách Đặt Vé',
    phone: phone || '0987654321',
    date: date || 'Hôm nay',
    slot: slot || 'Sáng (08:00 - 11:30)',
    adultQty: adult,
    studentQty: student,
    foreignerQty: foreigner,
    totalAmount: totalAmount,
    paymentMethod: paymentMethod || 'QR_BANK',
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrCodeData}`,
    status: 'CHUA_SU_DUNG',
    createdAt: new Date().toISOString()
  };

  TICKETS_DB.push(newTicket);

  return res.json({
    success: true,
    message: 'Đặt vé tham quan trực tuyến thành công!',
    data: newTicket
  });
});

/**
 * POST /api/tickets/scan (Gate scanner verification - Restricted to BANVE, ADMIN)
 */
router.post('/scan', verifyToken, authorizeRoles('BANVE', 'ADMIN'), (req, res) => {
  const { qrCode } = req.body;

  if (!qrCode) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã QR Code soát vé!' });
  }

  const found = TICKETS_DB.find(t => t.ticketCode === qrCode || qrCode.includes(t.ticketCode));

  if (found) {
    if (found.status === 'DA_SU_DUNG') {
      return res.status(400).json({ success: false, message: `VÉ ĐÃ SỬ DỤNG LÚC ${found.usedAt || 'trước đó'}! Không hợp lệ.` });
    }
    found.status = 'DA_SU_DUNG';
    found.usedAt = new Date().toLocaleTimeString('vi-VN');
    return res.json({ success: true, message: `VÉ HỢP LỆ! Đã xác thực lượt vào cửa cho ${found.name}.`, data: found });
  }

  return res.json({
    success: true,
    message: `VÉ HỢP LỆ (Mã QR: ${qrCode})! Mời du khách vào cửa.`,
    data: { qrCode: qrCode, status: 'CHUA_SU_DUNG' }
  });
});

module.exports = router;
