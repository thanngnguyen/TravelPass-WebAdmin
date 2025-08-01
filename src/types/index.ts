// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  nationality: string;
  kycStatus: "pending" | "approved" | "rejected";
  accountStatus: "active" | "locked" | "suspended";
  createdAt: string;
  updatedAt: string;
}

// Card related types
export interface PhysicalCard {
  id: string;
  cardNumber: string;
  userId?: string;
  status: "active" | "inactive" | "locked" | "expired";
  balance: number;
  expiryDate: string;
  issuedDate: string;
  lastUsed?: string;
}

// Wallet related types
export interface DigitalWallet {
  id: string;
  userId: string;
  cardId?: string; // ID của thẻ vật lý liên kết
  balance: number;
  currency: string;
  status: "active" | "locked" | "suspended";
  createdAt: string;
  updatedAt: string;
}

// Transaction related types
export interface Transaction {
  id: string;
  userId: string;
  cardId?: string;
  walletId?: string;
  type: "payment" | "topup" | "refund" | "transfer";
  amount: number;
  originalAmount?: number;
  currency: string;
  exchangeRate?: number;
  status: "completed" | "pending" | "failed" | "cancelled";
  merchantId?: string;
  kioskId?: string;
  description: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Top-up related types
export interface TopUp {
  id: string;
  userId: string;
  cardId?: string;
  walletId?: string;
  amount: number;
  originalAmount?: number;
  currency: string;
  exchangeRate?: number;
  status: "completed" | "pending" | "failed" | "cancelled";
  kioskId?: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// Exchange rate related types
export interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  effectiveDate: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Kiosk related types
export interface Kiosk {
  id: string;
  name: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: "active" | "maintenance" | "offline";
  lastMaintenance?: string;
  adminId?: string;
  createdAt: string;
  updatedAt: string;
}

// Merchant related types
export interface Merchant {
  id: string;
  name: string;
  businessType: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  commissionRate: number;
  status: "active" | "inactive" | "suspended";
  devices: POSDevice[];
  createdAt: string;
  updatedAt: string;
}

export interface POSDevice {
  id: string;
  deviceId: string;
  merchantId: string;
  status: "active" | "inactive" | "maintenance";
  lastUsed?: string;
  createdAt: string;
}

// Admin related types
export interface Admin {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "operator";
  permissions: AdminPermissions;
  status: "active" | "inactive" | "locked";
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPermissions {
  dashboard: boolean;
  users: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    kyc: boolean;
  };
  cards: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    topup: boolean;
  };
  wallets: {
    view: boolean;
    edit: boolean;
    lock: boolean;
  };
  transactions: {
    view: boolean;
    export: boolean;
    refund: boolean;
  };
  topups: {
    view: boolean;
    process: boolean;
    cancel: boolean;
  };
  exchangeRates: {
    view: boolean;
    create: boolean;
    edit: boolean;
  };
  kiosks: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  merchants: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  admins: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

// Dashboard stats types
export interface DashboardStats {
  totalUsers: number;
  activeCards: number;
  todayTransactions: number;
  totalTransactionAmount: number;
  topUpsByDay: { date: string; amount: number }[];
  transactionsByLocation: { location: string; count: number }[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter types
export interface UserFilters {
  email?: string;
  name?: string;
  phone?: string;
  nationality?: string;
  kycStatus?: string;
  accountStatus?: string;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  userId?: string;
  kioskId?: string;
  status?: string;
  type?: string;
  minAmount?: number;
  maxAmount?: number;
}
