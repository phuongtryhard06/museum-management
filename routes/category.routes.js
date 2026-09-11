const express = require('express');
const router = express.Router();

const CATEGORIES = {
  indoorRooms: [
    { code: 'P-01', name: 'Phòng 1: Nhóm ngôn ngữ Việt - Mường', ethnicCount: 4, ethnicList: 'Việt, Mường, Thổ, Chứt' },
    { code: 'P-02', name: 'Phòng 2: Nhóm ngôn ngữ Tày - Thái', ethnicCount: 8, ethnicList: 'Tày, Thái, Nùng, Giáy, Lào, Lự, Sán Chay, Bố Y' },
    { code: 'P-03', name: 'Phòng 3: Nhóm H\'mông - Dao, Ka Đai & Tạng Miến', ethnicCount: 13, ethnicList: 'H\'mông, Dao, Pà Thẻn, La Chí, La Ha, Cờ Lao, Pu Péo, Lô Lô, Phù Lá, Hà Nhì, La Hủ, Cống, Si La' },
    { code: 'P-04', name: 'Phòng 4: Nhóm ngôn ngữ Môn - Khơ mer', ethnicCount: 21, ethnicList: 'Ba Na, Brâu, Bru - Vân Kiều, Chơ Ro, Co, Cơ Ho, Cơ Tu, Gié Triêng, H\'rê, Kháng, Khơ mer, Khơ Mú, Mạ, Mảng, Mnông, Ơ Đu, Rơ Măm, Tà Ôi, Xơ Đăng, Xtiêng' },
    { code: 'P-05', name: 'Phòng 5: Nhóm ngôn ngữ Nam Đảo & Nhóm Hán', ethnicCount: 8, ethnicList: 'Chăm, Gia Rai, Ê Đê, Raglai, Chu Ru, Hoa, Ngái, Sán Dìu' }
  ],
  outdoorRegions: [
    { code: 'VR-01', name: 'Vùng núi cao phía Bắc', desc: 'Không gian văn hóa vùng núi cao với cảnh quan sinh thái đặc trưng' },
    { code: 'VR-02', name: 'Vùng Thung lũng', desc: 'Kiến trúc nhà sàn và văn hóa nông nghiệp lúa nước thung lũng' },
    { code: 'VR-03', name: 'Vùng Trung du - Bắc Bộ', desc: 'Không gian văn hóa xóm làng, nhà ở truyền thống vùng Trung du' },
    { code: 'VR-04', name: 'Vùng miền Trung - Ven biển', desc: 'Không gian văn hóa cư dân ven biển và dải đất miền Trung' },
    { code: 'VR-05', name: 'Vùng Trường Sơn - Tây Nguyên', desc: 'Nhà Rông, nhà Dài và không gian văn hóa cồng chiêng đại ngàn' },
    { code: 'VR-06', name: 'Vùng Đồng Bằng Nam Bộ', desc: 'Không gian sông nước, nhà ở và sinh hoạt cư dân Nam Bộ' }
  ],
  ticketPrices: [
    { code: 'LV-01', name: 'Vé Tham Quan Bảo Tàng', price: 30000, note: 'Vé tham quan phổ thông' },
    { code: 'LV-02', name: 'Vé Trẻ Em (Dưới 5 Tuổi)', price: 0, note: 'Miễn phí 100% cho trẻ em dưới 5 tuổi' }
  ]
};

router.get('/indoor-rooms', (req, res) => {
  return res.json({ success: true, data: CATEGORIES.indoorRooms });
});

router.get('/outdoor-regions', (req, res) => {
  return res.json({ success: true, data: CATEGORIES.outdoorRegions });
});

router.get('/ticket-prices', (req, res) => {
  return res.json({ success: true, data: CATEGORIES.ticketPrices });
});

module.exports = router;
