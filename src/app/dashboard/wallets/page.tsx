"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  WalletIcon,
  EyeIcon,
  LockClosedIcon,
  LockOpenIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  ChartBarIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  mockDigitalWallets,
  mockUsers,
  mockPhysicalCards,
} from "@/lib/mock-data";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
  cn,
} from "@/lib/utils";
import type { DigitalWallet } from "@/types";

const StatusBadge = ({ status, label }: { status: string; label: string }) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusColor(status)
    )}
  >
    {label}
  </span>
);

export default function WalletsPage() {
  const [wallets] = useState<DigitalWallet[]>(mockDigitalWallets);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<DigitalWallet | null>(
    null
  );
  const [lockReason, setLockReason] = useState("");
  const [unlockReason, setUnlockReason] = useState("");

  const filteredWallets = wallets.filter((wallet) => {
    const user = mockUsers.find((u) => u.id === wallet.userId);
    const userFullName = user ? `${user.firstName} ${user.lastName}` : "";

    const matchesSearch =
      searchTerm === "" ||
      wallet.id.includes(searchTerm) ||
      wallet.userId.includes(searchTerm) ||
      userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user && user.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "" || wallet.status === statusFilter;
    const matchesCurrency =
      currencyFilter === "" || wallet.currency === currencyFilter;

    return matchesSearch && matchesStatus && matchesCurrency;
  });

  const getUserInfo = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    return user
      ? {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }
      : {
          name: "Không tìm thấy",
          email: "",
        };
  };

  const getCardInfo = (cardId?: string) => {
    if (!cardId) return null;
    const card = mockPhysicalCards.find((c) => c.id === cardId);
    return card || null;
  };

  const handleStatusChange = (
    walletId: string,
    newStatus: "active" | "locked"
  ) => {
    console.log(`Changing wallet ${walletId} status to ${newStatus}`);
  };

  const handleViewDetail = (wallet: DigitalWallet) => {
    setSelectedWallet(wallet);
    setShowDetailModal(true);
  };

  const handleViewTransactions = (wallet: DigitalWallet) => {
    setSelectedWallet(wallet);
    setShowTransactionModal(true);
  };

  const handleLockWallet = (wallet: DigitalWallet) => {
    setSelectedWallet(wallet);
    setShowLockModal(true);
  };

  const handleUnlockWallet = (wallet: DigitalWallet) => {
    setSelectedWallet(wallet);
    setShowUnlockModal(true);
  };

  const handleConfirmLock = () => {
    if (!lockReason.trim()) {
      alert("Vui lòng nhập lý do khóa ví");
      return;
    }

    console.log("Locking wallet:", selectedWallet?.id, "Reason:", lockReason);
    setShowLockModal(false);
    setSelectedWallet(null);
    setLockReason("");
  };

  const handleConfirmUnlock = () => {
    if (!unlockReason.trim()) {
      alert("Vui lòng nhập lý do mở khóa ví");
      return;
    }

    console.log(
      "Unlocking wallet:",
      selectedWallet?.id,
      "Reason:",
      unlockReason
    );
    setShowUnlockModal(false);
    setSelectedWallet(null);
    setUnlockReason("");
  };

  const handleExportWallets = () => {
    console.log("Exporting wallets data...");
  };

  const handleRefreshData = () => {
    console.log("Refreshing wallets data...");
  };

  const handleViewAnalytics = () => {
    console.log("Opening wallet analytics...");
  };

  const handleBulkOperations = () => {
    console.log("Opening bulk operations...");
  };

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const activeWallets = wallets.filter((w) => w.status === "active").length;
  const lockedWallets = wallets.filter((w) => w.status === "locked").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            👜 Quản lý ví điện tử
          </h1>
          <p className="text-gray-600">
            Quản lý ví điện tử, số dư và lịch sử giao dịch
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefreshData}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title="Làm mới dữ liệu"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Làm mới
          </button>

          <button
            onClick={handleBulkOperations}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
            title="Thao tác hàng loạt"
          >
            <BanknotesIcon className="h-4 w-4 mr-2" />
            Thao tác hàng loạt
          </button>

          <button
            onClick={handleViewAnalytics}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            title="Xem phân tích"
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Phân tích
          </button>

          <button
            onClick={handleExportWallets}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            title="Xuất báo cáo"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <WalletIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng số ví</p>
              <p className="text-2xl font-semibold text-gray-900">
                {wallets.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <WalletIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ví hoạt động</p>
              <p className="text-2xl font-semibold text-green-600">
                {activeWallets}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <LockClosedIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ví bị khóa</p>
              <p className="text-2xl font-semibold text-red-600">
                {lockedWallets}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <WalletIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng số dư</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(totalBalance)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ID ví, tên người dùng, email..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Bị khóa</option>
              <option value="suspended">Tạm ngừng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại tiền
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="VND">VND</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Balance Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Phân bố số dư ví
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Ví có số dư &gt; 500K</p>
            <p className="text-2xl font-bold text-green-600">
              {wallets.filter((w) => w.balance > 500000).length}
            </p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Ví có số dư 100K - 500K</p>
            <p className="text-2xl font-bold text-yellow-600">
              {
                wallets.filter(
                  (w) => w.balance >= 100000 && w.balance <= 500000
                ).length
              }
            </p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Ví có số dư &lt; 100K</p>
            <p className="text-2xl font-bold text-red-600">
              {wallets.filter((w) => w.balance < 100000).length}
            </p>
          </div>
        </div>
      </div>

      {/* Wallets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách ví điện tử ({filteredWallets.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin ví
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số dư
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cập nhật cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWallets.map((wallet) => {
                const userInfo = getUserInfo(wallet.userId);

                return (
                  <tr key={wallet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <WalletIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {(() => {
                              const card = getCardInfo(wallet.cardId);
                              return card
                                ? `**** **** **** ${card.cardNumber.slice(-4)}`
                                : `Ví #${wallet.id}`;
                            })()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {(() => {
                              const card = getCardInfo(wallet.cardId);
                              return card
                                ? `ID Thẻ: ${card.id}`
                                : `Tạo: ${formatDateTime(wallet.createdAt)}`;
                            })()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {userInfo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {userInfo.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {formatCurrency(wallet.balance, wallet.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {wallet.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={wallet.status}
                        label={
                          wallet.status === "active"
                            ? "Hoạt động"
                            : wallet.status === "locked"
                            ? "Bị khóa"
                            : "Tạm ngừng"
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(wallet.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetail(wallet)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Xem chi tiết"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleViewTransactions(wallet)}
                          className="text-green-600 hover:text-green-900"
                          title="Xem giao dịch"
                        >
                          <ArrowsRightLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            wallet.status === "active"
                              ? handleLockWallet(wallet)
                              : handleUnlockWallet(wallet)
                          }
                          className={
                            wallet.status === "active"
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }
                          title={
                            wallet.status === "active"
                              ? "Khóa ví"
                              : "Mở khóa ví"
                          }
                        >
                          {wallet.status === "active" ? (
                            <LockClosedIcon className="h-4 w-4" />
                          ) : (
                            <LockOpenIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredWallets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy ví điện tử nào</p>
          </div>
        )}
      </div>

      {/* Wallet Detail Modal */}
      {showDetailModal && selectedWallet && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {(() => {
                    const card = getCardInfo(selectedWallet.cardId);
                    return card
                      ? `Chi tiết ví - Thẻ **** ${card.cardNumber.slice(-4)}`
                      : `Chi tiết ví điện tử - #${selectedWallet.id}`;
                  })()}
                </h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedWallet(null);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wallet Information */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">
                        TravelPass Wallet
                      </h4>
                      <WalletIcon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm opacity-80">
                        {getCardInfo(selectedWallet.cardId)
                          ? "Card Number"
                          : "Wallet ID"}
                      </p>
                      <p className="text-xl font-mono tracking-wider">
                        {(() => {
                          const card = getCardInfo(selectedWallet.cardId);
                          return card
                            ? card.cardNumber.replace(/(.{4})/g, "$1 ")
                            : `#${selectedWallet.id}`;
                        })()}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-xs opacity-80">Balance</p>
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            selectedWallet.balance,
                            selectedWallet.currency
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-80">Currency</p>
                        <p className="font-medium">{selectedWallet.currency}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Thông tin ví
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID Ví:</span>
                        <span className="font-medium">{selectedWallet.id}</span>
                      </div>
                      {selectedWallet.cardId && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số thẻ:</span>
                            <span className="font-medium">
                              {(() => {
                                const card = getCardInfo(selectedWallet.cardId);
                                return card
                                  ? `**** **** **** ${card.cardNumber.slice(
                                      -4
                                    )}`
                                  : "Không tìm thấy";
                              })()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">ID Thẻ:</span>
                            <span className="font-medium">
                              {selectedWallet.cardId}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trạng thái:</span>
                        <StatusBadge
                          status={selectedWallet.status}
                          label={
                            selectedWallet.status === "active"
                              ? "Hoạt động"
                              : selectedWallet.status === "locked"
                              ? "Bị khóa"
                              : "Tạm ngừng"
                          }
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số dư:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(
                            selectedWallet.balance,
                            selectedWallet.currency
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loại tiền:</span>
                        <span className="font-medium">
                          {selectedWallet.currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày tạo:</span>
                        <span className="font-medium">
                          {formatDateTime(selectedWallet.createdAt)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cập nhật cuối:</span>
                        <span className="font-medium">
                          {formatDateTime(selectedWallet.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Information & Actions */}
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-3">
                      Thông tin chủ ví
                    </h5>
                    {(() => {
                      const user = mockUsers.find(
                        (u) => u.id === selectedWallet.userId
                      );
                      return user ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Họ tên:</span>
                            <span className="font-medium">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Email:</span>
                            <span className="font-medium">{user.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Điện thoại:</span>
                            <span className="font-medium">{user.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Quốc tịch:</span>
                            <span className="font-medium">
                              {user.nationality}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">
                              Trạng thái KYC:
                            </span>
                            <StatusBadge
                              status={user.kycStatus}
                              label={
                                user.kycStatus === "approved"
                                  ? "Đã duyệt"
                                  : user.kycStatus === "rejected"
                                  ? "Từ chối"
                                  : "Chờ duyệt"
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-blue-700">
                          Không tìm thấy thông tin người dùng
                        </p>
                      );
                    })()}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Thao tác nhanh
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          handleViewTransactions(selectedWallet);
                        }}
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        <ArrowsRightLeftIcon className="h-4 w-4 mr-1" />
                        Giao dịch
                      </button>

                      {selectedWallet.status === "active" ? (
                        <button
                          onClick={() => {
                            setShowDetailModal(false);
                            handleLockWallet(selectedWallet);
                          }}
                          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          <LockClosedIcon className="h-4 w-4 mr-1" />
                          Khóa ví
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowDetailModal(false);
                            handleUnlockWallet(selectedWallet);
                          }}
                          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          <LockOpenIcon className="h-4 w-4 mr-1" />
                          Mở khóa
                        </button>
                      )}

                      <button
                        onClick={() =>
                          console.log("Export wallet data:", selectedWallet.id)
                        }
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                        Xuất dữ liệu
                      </button>

                      <button
                        onClick={() =>
                          console.log("View analytics:", selectedWallet.id)
                        }
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        <ChartBarIcon className="h-4 w-4 mr-1" />
                        Phân tích
                      </button>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-3">
                      Thống kê giao dịch
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">0</p>
                        <p className="text-purple-700">Giao dịch hôm nay</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">0</p>
                        <p className="text-purple-700">Tổng giao dịch</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedWallet(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Modal */}
      {showTransactionModal && selectedWallet && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {(() => {
                    const card = getCardInfo(selectedWallet.cardId);
                    return card
                      ? `Lịch sử giao dịch - Thẻ **** ${card.cardNumber.slice(
                          -4
                        )}`
                      : `Lịch sử giao dịch - Ví #${selectedWallet.id}`;
                  })()}
                </h3>
                <button
                  onClick={() => {
                    setShowTransactionModal(false);
                    setSelectedWallet(null);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <WalletIcon className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">
                        Thông tin ví
                      </h4>
                      <p className="text-sm text-blue-700">
                        Số dư hiện tại:{" "}
                        {formatCurrency(
                          selectedWallet.balance,
                          selectedWallet.currency
                        )}{" "}
                        | Chủ ví: {getUserInfo(selectedWallet.userId).name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900">
                    Danh sách giao dịch
                  </h4>
                </div>
                <div className="p-4">
                  <div className="text-center py-8 text-gray-500">
                    <ArrowsRightLeftIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Chưa có giao dịch nào</p>
                    <p className="text-sm">
                      Lịch sử giao dịch sẽ hiển thị ở đây khi có hoạt động
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowTransactionModal(false);
                    setSelectedWallet(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lock Wallet Modal */}
      {showLockModal && selectedWallet && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Khóa ví điện tử
              </h3>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Cảnh báo
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Bạn đang thực hiện khóa ví:</p>
                      <p className="font-semibold">
                        {(() => {
                          const card = getCardInfo(selectedWallet.cardId);
                          return card
                            ? `Thẻ **** **** **** ${card.cardNumber.slice(-4)}`
                            : `Ví #${selectedWallet.id}`;
                        })()}
                      </p>
                      <p>Chủ ví: {getUserInfo(selectedWallet.userId).name}</p>
                      <p>
                        Số dư:{" "}
                        {formatCurrency(
                          selectedWallet.balance,
                          selectedWallet.currency
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do khóa ví *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do khóa ví (hoạt động đáng ngờ, vi phạm chính sách, yêu cầu từ người dùng, v.v.)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    value={lockReason}
                    onChange={(e) => setLockReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowLockModal(false);
                    setSelectedWallet(null);
                    setLockReason("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmLock}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Khóa ví
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unlock Wallet Modal */}
      {showUnlockModal && selectedWallet && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Mở khóa ví điện tử
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <LockOpenIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Thông tin
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Bạn đang thực hiện mở khóa ví:</p>
                      <p className="font-semibold">
                        {(() => {
                          const card = getCardInfo(selectedWallet.cardId);
                          return card
                            ? `Thẻ **** **** **** ${card.cardNumber.slice(-4)}`
                            : `Ví #${selectedWallet.id}`;
                        })()}
                      </p>
                      <p>Chủ ví: {getUserInfo(selectedWallet.userId).name}</p>
                      <p>
                        Số dư:{" "}
                        {formatCurrency(
                          selectedWallet.balance,
                          selectedWallet.currency
                        )}
                      </p>
                      <p>
                        Trạng thái hiện tại:{" "}
                        {selectedWallet.status === "locked"
                          ? "Bị khóa"
                          : selectedWallet.status === "suspended"
                          ? "Tạm ngừng"
                          : "Không xác định"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do mở khóa ví *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do mở khóa ví (đã giải quyết vấn đề, hoàn thành xác minh, yêu cầu hợp lệ, v.v.)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={unlockReason}
                    onChange={(e) => setUnlockReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowUnlockModal(false);
                    setSelectedWallet(null);
                    setUnlockReason("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmUnlock}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Mở khóa ví
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
