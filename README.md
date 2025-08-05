# TravelPass Admin Dashboard

Mục tiêu: Tạo ra một hệ thống thẻ thông minh và ứng dụng di động không tiếp xúc, hỗ trợ thanh toán giao thông công cộng, dịch vụ du lịch, và bán lẻ, với trọng tâm là khách du lịch quốc tế.

Tên gọi: TravelPass – tượng trưng cho sự dễ dàng và linh hoạt khi khám phá một điểm đến.

Công nghệ: Kết hợp RFID/NFC (FeliCa hoặc MIFARE), tích hợp với ví di động (Apple Pay, Google Pay, WeChat Pay), và mã QR cho các thiết bị không hỗ trợ NFC.

Đối tượng: Khách du lịch quốc tế, khách nội địa, và cư dân địa phương.

Phạm vi: Giao thông công cộng, điểm tham quan du lịch, nhà hàng, cửa hàng bán lẻ, khách sạn, và các dịch vụ liên quan đến du lịch.

## 🚀 Tính năng chính

### 📋 Dashboard Tổng quan

- Tổng số người dùng, thẻ hoạt động
- Số lượng giao dịch hôm nay
- Tổng số tiền đã giao dịch
- Biểu đồ top-up theo ngày
- Thống kê giao dịch theo địa điểm/kiosk

### 👤 Quản lý người dùng

- Danh sách và tìm kiếm người dùng
- Duyệt/từ chối hồ sơ KYC
- Khóa/mở tài khoản người dùng
- Xem lịch sử giao dịch và thẻ/ví

### 💳 Quản lý thẻ vật lý

- Danh sách thẻ và trạng thái
- Gắn thẻ cho người dùng
- Cập nhật trạng thái (kích hoạt, khóa, hết hạn)
- Nạp tiền vào thẻ (top-up)
- Xem lịch sử sử dụng

### 👜 Quản lý ví điện tử

- Danh sách ví và số dư
- Khóa/mở ví
- Xem lịch sử giao dịch

### 💸 Quản lý giao dịch

- Lọc theo thời gian, người dùng, kiosk, trạng thái
- Chi tiết giao dịch (số tiền gốc, quy đổi, tỷ giá)
- Thống kê doanh thu, phí giao dịch
- Xuất báo cáo (CSV, PDF)

### 🔁 Quản lý nạp tiền (Top-up)

- Danh sách lệnh nạp và trạng thái
- Kiểm tra giao dịch nghi vấn
- Cập nhật trạng thái thủ công
- Thống kê theo kiosk, người dùng

### 💱 Quản lý tỷ giá hối đoái

- Danh sách tỷ giá theo ngày
- Cập nhật thủ công
- Kiểm tra tỷ giá hiệu lực

### 🏪 Quản lý kiosk

- Danh sách kiosk và vị trí
- Kiểm tra trạng thái hoạt động
- Ghi nhận bảo trì
- Xem trên Google Maps

### 🏷️ Quản lý merchant

- Danh sách merchant đối tác
- Gán tỉ lệ hoa hồng
- Theo dõi giao dịch
- Quản lý thiết bị POS

### 🔐 Quản lý Admin users

- Tạo tài khoản admin
- Phân quyền theo module
- Khóa/kích hoạt tài khoản
- Xem nhật ký đăng nhập

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Charts**: Recharts
- **Icons**: Lucide React
- **Utils**: Date-fns, Clsx, Tailwind Merge

## 🏗️ Cấu trúc dự án

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx           # Dashboard chính
│   │   ├── users/             # Quản lý người dùng
│   │   ├── cards/             # Quản lý thẻ vật lý
│   │   ├── wallets/           # Quản lý ví điện tử
│   │   ├── transactions/      # Quản lý giao dịch
│   │   ├── topups/           # Quản lý nạp tiền
│   │   ├── exchange-rates/   # Quản lý tỷ giá
│   │   ├── kiosks/           # Quản lý kiosk
│   │   ├── merchants/        # Quản lý merchant
│   │   └── admins/           # Quản lý admin
├── components/
│   └── Sidebar.tsx           # Navigation sidebar
├── lib/
│   ├── utils.ts              # Utility functions
│   └── mock-data.ts          # Mock data for demo
└── types/
    └── index.ts              # TypeScript type definitions
```

## 🚀 Cài đặt và chạy

1. **Clone repository**:

```bash
git clone <repository-url>
cd travel-pass
```

2. **Cài đặt dependencies**:

```bash
npm install
```

3. **Chạy development server**:

```bash
npm run dev
```

4. **Mở trình duyệt**: http://localhost:3000

## 📱 Responsive Design

Giao diện được thiết kế responsive, hoạt động tốt trên:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Customization

### Thêm module mới

1. Tạo folder trong `src/app/dashboard/`
2. Tạo `page.tsx` cho trang chính
3. Thêm route vào `navigationItems` trong `Sidebar.tsx`
4. Định nghĩa types trong `src/types/index.ts`
5. Thêm mock data trong `src/lib/mock-data.ts`

### Styling

- Sử dụng Tailwind CSS classes
- Colors: Blue (primary), Green (success), Red (danger), Yellow (warning)
- Components sử dụng Headless UI cho accessibility

### Icons

- Heroicons cho UI icons
- Lucide React cho additional icons

## 🔐 Security Notes

Đây là demo version sử dụng mock data. Trong production:

- Implement proper authentication & authorization
- Use secure API endpoints
- Validate all user inputs
- Implement audit logs
- Use HTTPS
- Protect sensitive data

## 📊 Data Management

Current implementation sử dụng mock data. Để tích hợp API thực:

1. Thay thế mock data calls bằng API calls
2. Implement loading states
3. Add error handling
4. Use state management (Redux, Zustand)
5. Implement caching strategy

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.
