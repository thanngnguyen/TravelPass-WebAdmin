import {
  User,
  PhysicalCard,
  DigitalWallet,
  Transaction,
  TopUp,
  ExchangeRate,
  Kiosk,
  Merchant,
  Admin,
  DashboardStats,
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "nguyen.van.a@gmail.com",
    firstName: "Nguyễn Văn",
    lastName: "A",
    phone: "+84901234567",
    nationality: "Vietnamese",
    kycStatus: "approved",
    accountStatus: "active",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-20T10:15:00Z",
  },
  {
    id: "2",
    email: "tran.thi.b@gmail.com",
    firstName: "Trần Thị",
    lastName: "B",
    phone: "+84902345678",
    nationality: "Vietnamese",
    kycStatus: "pending",
    accountStatus: "active",
    createdAt: "2024-01-16T09:45:00Z",
    updatedAt: "2024-01-16T09:45:00Z",
  },
  {
    id: "3",
    email: "john.smith@gmail.com",
    firstName: "John",
    lastName: "Smith",
    phone: "+84903456789",
    nationality: "American",
    kycStatus: "approved",
    accountStatus: "locked",
    createdAt: "2024-01-17T14:20:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
  },
];

// Mock Physical Cards
export const mockPhysicalCards: PhysicalCard[] = [
  {
    id: "1",
    cardNumber: "1234567890123456",
    userId: "1",
    status: "active",
    balance: 500000,
    expiryDate: "2027-01-15",
    issuedDate: "2024-01-15",
    lastUsed: "2024-01-30T12:00:00Z",
  },
  {
    id: "2",
    cardNumber: "1234567890123457",
    userId: "3",
    status: "locked",
    balance: 250000,
    expiryDate: "2027-01-17",
    issuedDate: "2024-01-17",
    lastUsed: "2024-01-25T15:30:00Z",
  },
  {
    id: "3",
    cardNumber: "1234567890123458",
    status: "inactive",
    balance: 0,
    expiryDate: "2027-02-01",
    issuedDate: "2024-02-01",
  },
];

// Mock Digital Wallets
export const mockDigitalWallets: DigitalWallet[] = [
  {
    id: "1",
    userId: "1",
    cardId: "1", // Liên kết với thẻ vật lý ID "1"
    balance: 750000,
    currency: "VND",
    status: "active",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-30T12:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    cardId: "2", // Liên kết với thẻ vật lý ID "2"
    balance: 300000,
    currency: "VND",
    status: "active",
    createdAt: "2024-01-16T09:45:00Z",
    updatedAt: "2024-01-29T14:20:00Z",
  },
  {
    id: "3",
    userId: "3",
    cardId: "3", // Liên kết với thẻ vật lý ID "3"
    balance: 100000,
    currency: "VND",
    status: "locked",
    createdAt: "2024-01-17T14:20:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    userId: "1",
    cardId: "1",
    type: "payment",
    amount: 50000,
    currency: "VND",
    status: "completed",
    merchantId: "1",
    description: "Thanh toán tại cửa hàng tiện lợi",
    createdAt: "2024-01-30T12:00:00Z",
    updatedAt: "2024-01-30T12:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    walletId: "1",
    type: "topup",
    amount: 200000,
    currency: "VND",
    status: "completed",
    kioskId: "1",
    description: "Nạp tiền tại kiosk",
    createdAt: "2024-01-29T14:30:00Z",
    updatedAt: "2024-01-29T14:30:00Z",
  },
  {
    id: "3",
    userId: "2",
    cardId: "2",
    type: "payment",
    amount: 25000,
    currency: "VND",
    status: "failed",
    merchantId: "2",
    description: "Thanh toán không thành công",
    failureReason: "Số dư không đủ để thực hiện giao dịch",
    createdAt: "2024-01-28T10:15:00Z",
    updatedAt: "2024-01-28T10:15:00Z",
  },
];

// Mock Top-ups
export const mockTopUps: TopUp[] = [
  {
    id: "1",
    userId: "1",
    cardId: "1",
    amount: 200000,
    currency: "VND",
    status: "completed",
    kioskId: "1",
    paymentMethod: "cash",
    createdAt: "2024-01-29T14:30:00Z",
    updatedAt: "2024-01-29T14:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    walletId: "2",
    amount: 100000,
    currency: "VND",
    status: "pending",
    paymentMethod: "bank_transfer",
    createdAt: "2024-01-30T08:00:00Z",
    updatedAt: "2024-01-30T08:00:00Z",
  },
];

// Mock Exchange Rates
export const mockExchangeRates: ExchangeRate[] = [
  {
    id: "1",
    fromCurrency: "USD",
    toCurrency: "VND",
    rate: 24500,
    effectiveDate: "2024-01-30",
    createdBy: "admin1",
    isActive: true,
    createdAt: "2024-01-30T00:00:00Z",
    updatedAt: "2024-01-30T00:00:00Z",
  },
  {
    id: "2",
    fromCurrency: "EUR",
    toCurrency: "VND",
    rate: 26800,
    effectiveDate: "2024-01-30",
    createdBy: "admin1",
    isActive: true,
    createdAt: "2024-01-30T00:00:00Z",
    updatedAt: "2024-01-30T00:00:00Z",
  },
];

// Mock Kiosks
export const mockKiosks: Kiosk[] = [
  {
    id: "1",
    name: "Kiosk Bến Thành",
    location: {
      address: "Chợ Bến Thành, Quận 1, TP.HCM",
      latitude: 10.772,
      longitude: 106.698,
    },
    status: "active",
    lastMaintenance: "2024-01-25T10:00:00Z",
    adminId: "admin2",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "2",
    name: "Kiosk Sân Bay Tân Sơn Nhất",
    location: {
      address: "Sân bay Tân Sơn Nhất, TP.HCM",
      latitude: 10.8187,
      longitude: 106.652,
    },
    status: "maintenance",
    lastMaintenance: "2024-01-30T08:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-30T08:00:00Z",
  },
];

// Mock Merchants
export const mockMerchants: Merchant[] = [
  {
    id: "1",
    name: "Cửa hàng tiện lợi ABC",
    businessType: "Convenience Store",
    contactEmail: "abc@store.com",
    contactPhone: "+84901111111",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    commissionRate: 2.5,
    status: "active",
    devices: [
      {
        id: "1",
        deviceId: "POS001",
        merchantId: "1",
        status: "active",
        lastUsed: "2024-01-30T12:00:00Z",
        createdAt: "2024-01-15T00:00:00Z",
      },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-30T12:00:00Z",
  },
  {
    id: "2",
    name: "Nhà hàng XYZ",
    businessType: "Restaurant",
    contactEmail: "xyz@restaurant.com",
    contactPhone: "+84902222222",
    address: "456 Lê Lợi, Quận 1, TP.HCM",
    commissionRate: 3.0,
    status: "active",
    devices: [
      {
        id: "2",
        deviceId: "POS002",
        merchantId: "2",
        status: "active",
        lastUsed: "2024-01-29T18:30:00Z",
        createdAt: "2024-01-16T00:00:00Z",
      },
    ],
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-29T18:30:00Z",
  },
];

// Mock Admins
export const mockAdmins: Admin[] = [
  {
    id: "admin1",
    username: "superadmin",
    email: "admin@travelpass.com",
    firstName: "Super",
    lastName: "Admin",
    role: "super_admin",
    permissions: {
      dashboard: true,
      users: { view: true, create: true, edit: true, delete: true, kyc: true },
      cards: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        topup: true,
      },
      wallets: { view: true, edit: true, lock: true },
      transactions: { view: true, export: true, refund: true },
      topups: { view: true, process: true, cancel: true },
      exchangeRates: { view: true, create: true, edit: true },
      kiosks: { view: true, create: true, edit: true, delete: true },
      merchants: { view: true, create: true, edit: true, delete: true },
      admins: { view: true, create: true, edit: true, delete: true },
    },
    status: "active",
    lastLogin: "2024-01-30T08:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-30T08:00:00Z",
  },
  {
    id: "admin2",
    username: "operator1",
    email: "operator1@travelpass.com",
    firstName: "Operator",
    lastName: "One",
    role: "operator",
    permissions: {
      dashboard: true,
      users: {
        view: true,
        create: false,
        edit: true,
        delete: false,
        kyc: true,
      },
      cards: {
        view: true,
        create: false,
        edit: true,
        delete: false,
        topup: true,
      },
      wallets: { view: true, edit: false, lock: false },
      transactions: { view: true, export: false, refund: false },
      topups: { view: true, process: true, cancel: false },
      exchangeRates: { view: true, create: false, edit: false },
      kiosks: { view: true, create: false, edit: true, delete: false },
      merchants: { view: true, create: false, edit: false, delete: false },
      admins: { view: false, create: false, edit: false, delete: false },
    },
    status: "active",
    lastLogin: "2024-01-29T14:30:00Z",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-29T14:30:00Z",
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 15420,
  activeCards: 12850,
  todayTransactions: 1247,
  totalTransactionAmount: 2850000000,
  topUpsByDay: [
    { date: "2024-01-24", amount: 45000000 },
    { date: "2024-01-25", amount: 52000000 },
    { date: "2024-01-26", amount: 48000000 },
    { date: "2024-01-27", amount: 58000000 },
    { date: "2024-01-28", amount: 65000000 },
    { date: "2024-01-29", amount: 72000000 },
    { date: "2024-01-30", amount: 68000000 },
  ],
  transactionsByLocation: [
    { location: "Quận 1", count: 485 },
    { location: "Quận 3", count: 342 },
    { location: "Quận 7", count: 298 },
    { location: "Quận Bình Thạnh", count: 215 },
    { location: "Quận Tân Bình", count: 187 },
  ],
};

// Export all mock data
export const mockData = {
  users: mockUsers,
  physicalCards: mockPhysicalCards,
  digitalWallets: mockDigitalWallets,
  transactions: mockTransactions,
  topUps: mockTopUps,
  exchangeRates: mockExchangeRates,
  kiosks: mockKiosks,
  merchants: mockMerchants,
  admins: mockAdmins,
  dashboardStats: mockDashboardStats,
};
