"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ArrowPathIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  mockTransactions,
  mockUsers,
  mockMerchants,
  mockKiosks,
} from "@/lib/mock-data";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
  cn,
} from "@/lib/utils";
import type { Transaction, TransactionFilters } from "@/types";

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

const TransactionTypeBadge = ({ type }: { type: string }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-red-100 text-red-800";
      case "topup":
        return "bg-green-100 text-green-800";
      case "refund":
        return "bg-blue-100 text-blue-800";
      case "transfer":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "payment":
        return "Thanh toán";
      case "topup":
        return "Nạp tiền";
      case "refund":
        return "Hoàn tiền";
      case "transfer":
        return "Chuyển tiền";
      default:
        return type;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getTypeColor(type)
      )}
    >
      {getTypeLabel(type)}
    </span>
  );
};

export default function TransactionsPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [refundReason, setRefundReason] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchTerm === "" ||
      transaction.id.includes(searchTerm) ||
      transaction.userId.includes(searchTerm) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.type || transaction.type === filters.type) &&
      (!filters.status || transaction.status === filters.status) &&
      (!filters.startDate ||
        new Date(transaction.createdAt) >= new Date(filters.startDate)) &&
      (!filters.endDate ||
        new Date(transaction.createdAt) <= new Date(filters.endDate)) &&
      (!filters.minAmount || transaction.amount >= filters.minAmount) &&
      (!filters.maxAmount || transaction.amount <= filters.maxAmount);

    return matchesSearch && matchesFilters;
  });

  const getUserName = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Không tìm thấy";
  };

  const getMerchantName = (merchantId?: string) => {
    if (!merchantId) return "";
    const merchant = mockMerchants.find((m) => m.id === merchantId);
    return merchant ? merchant.name : "Không tìm thấy";
  };

  const getKioskName = (kioskId?: string) => {
    if (!kioskId) return "";
    const kiosk = mockKiosks.find((k) => k.id === kioskId);
    return kiosk ? kiosk.name : "Không tìm thấy";
  };

  const handleExport = () => {
    console.log("Exporting transactions...");
  };

  const handleRefund = (transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setShowRefundModal(true);
    }
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleConfirmRefund = () => {
    if (selectedTransaction && refundReason.trim()) {
      console.log(
        `Refunding transaction ${selectedTransaction.id} with reason: ${refundReason}`
      );
      // Here you would typically make an API call to process the refund
      setShowRefundModal(false);
      setSelectedTransaction(null);
      setRefundReason("");
    }
  };

  const handleExportReport = () => {
    console.log("Exporting transaction report...");
  };

  const handleRefreshData = () => {
    console.log("Refreshing transaction data...");
  };

  const handleViewAnalytics = () => {
    console.log("Opening transaction analytics...");
  };

  const handleFraudAlert = () => {
    console.log("Checking for fraudulent transactions...");
  };

  const handleReconciliation = () => {
    console.log("Starting transaction reconciliation...");
  };

  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const completedTransactions = filteredTransactions.filter(
    (t) => t.status === "completed"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            💸 Quản lý giao dịch
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý tất cả giao dịch trong hệ thống
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
            onClick={handleFraudAlert}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            title="Kiểm tra gian lận"
          >
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            Kiểm tra gian lận
          </button>

          <button
            onClick={handleReconciliation}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
            title="Đối soát"
          >
            <ClockIcon className="h-4 w-4 mr-2" />
            Đối soát
          </button>

          <button
            onClick={handleViewAnalytics}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
            title="Xem phân tích"
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Phân tích
          </button>

          <button
            onClick={handleExportReport}
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
          <div className="text-sm font-medium text-gray-500">
            Tổng giao dịch
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {filteredTransactions.length}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Hoàn thành</div>
          <div className="text-2xl font-semibold text-green-600">
            {completedTransactions}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Tổng giá trị</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(totalAmount)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">
            Tỷ lệ thành công
          </div>
          <div className="text-2xl font-semibold text-blue-600">
            {filteredTransactions.length > 0
              ? (
                  (completedTransactions / filteredTransactions.length) *
                  100
                ).toFixed(1)
              : 0}
            %
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ID giao dịch, user ID, mô tả..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại giao dịch
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.type || ""}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value || undefined })
              }
            >
              <option value="">Tất cả</option>
              <option value="payment">Thanh toán</option>
              <option value="topup">Nạp tiền</option>
              <option value="refund">Hoàn tiền</option>
              <option value="transfer">Chuyển tiền</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status || ""}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value || undefined })
              }
            >
              <option value="">Tất cả</option>
              <option value="completed">Hoàn thành</option>
              <option value="pending">Đang xử lý</option>
              <option value="failed">Thất bại</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Từ ngày
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.startDate || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    startDate: e.target.value || undefined,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đến ngày
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.endDate || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    endDate: e.target.value || undefined,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số tiền tối thiểu
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.minAmount || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minAmount: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số tiền tối đa
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.maxAmount || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxAmount: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách giao dịch ({filteredTransactions.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID & Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại & Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm giao dịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        #{transaction.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDateTime(transaction.createdAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {getUserName(transaction.userId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {transaction.userId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="mb-1">
                      <TransactionTypeBadge type={transaction.type} />
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </div>
                    {transaction.originalAmount && transaction.exchangeRate && (
                      <div className="text-xs text-gray-500">
                        Gốc: {formatCurrency(transaction.originalAmount)}
                        (Tỷ giá: {transaction.exchangeRate})
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.merchantId &&
                        getMerchantName(transaction.merchantId)}
                      {transaction.kioskId && getKioskName(transaction.kioskId)}
                      {!transaction.merchantId && !transaction.kioskId && "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={transaction.status}
                      label={
                        transaction.status === "completed"
                          ? "Hoàn thành"
                          : transaction.status === "pending"
                          ? "Đang xử lý"
                          : transaction.status === "failed"
                          ? "Thất bại"
                          : "Đã hủy"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {transaction.status === "failed" &&
                        transaction.type === "payment" && (
                          <button
                            onClick={() => handleRefund(transaction.id)}
                            className="text-orange-600 hover:text-orange-900"
                            title="Hoàn tiền"
                          >
                            <ArrowPathIcon className="h-4 w-4" />
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy giao dịch nào</p>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết giao dịch #{selectedTransaction.id}
              </h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedTransaction(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Đóng</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID Giao dịch
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    #{selectedTransaction.id}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thời gian
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDateTime(selectedTransaction.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loại giao dịch
                  </label>
                  <div className="mt-1">
                    <TransactionTypeBadge type={selectedTransaction.type} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <div className="mt-1">
                    <StatusBadge
                      status={selectedTransaction.status}
                      label={
                        selectedTransaction.status === "completed"
                          ? "Hoàn thành"
                          : selectedTransaction.status === "pending"
                          ? "Đang xử lý"
                          : selectedTransaction.status === "failed"
                          ? "Thất bại"
                          : "Đã hủy"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Amount Info */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số tiền
                    </label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  {selectedTransaction.originalAmount &&
                    selectedTransaction.exchangeRate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Số tiền gốc
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {formatCurrency(selectedTransaction.originalAmount)}
                          <span className="text-gray-500 ml-2">
                            (Tỷ giá: {selectedTransaction.exchangeRate})
                          </span>
                        </p>
                      </div>
                    )}
                </div>
              </div>

              {/* User Info */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Người dùng
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {getUserName(selectedTransaction.userId)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {selectedTransaction.userId}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Điểm giao dịch
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTransaction.merchantId &&
                        getMerchantName(selectedTransaction.merchantId)}
                      {selectedTransaction.kioskId &&
                        getKioskName(selectedTransaction.kioskId)}
                      {!selectedTransaction.merchantId &&
                        !selectedTransaction.kioskId &&
                        "Trực tuyến"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedTransaction.description}
                </p>
              </div>

              {/* Failure Reason */}
              {selectedTransaction.status === "failed" &&
                selectedTransaction.failureReason && (
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Lý do thất bại
                    </label>
                    <p className="mt-1 text-sm text-red-600">
                      {selectedTransaction.failureReason}
                    </p>
                  </div>
                )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedTransaction(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Đóng
              </button>
              {selectedTransaction.status === "failed" &&
                selectedTransaction.type === "payment" && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleRefund(selectedTransaction.id);
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    Hoàn tiền
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedTransaction && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Xác nhận hoàn tiền
              </h3>
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedTransaction(null);
                  setRefundReason("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Đóng</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Bạn đang thực hiện hoàn tiền cho giao dịch:
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <p className="font-semibold">#{selectedTransaction.id}</p>
                <p className="text-sm text-gray-600">
                  Người dùng: {getUserName(selectedTransaction.userId)}
                </p>
                <p className="text-sm text-gray-600">
                  Số tiền: {formatCurrency(selectedTransaction.amount)}
                </p>
                <p className="text-sm text-gray-600">
                  Thời gian: {formatDateTime(selectedTransaction.createdAt)}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do hoàn tiền *
              </label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Nhập lý do hoàn tiền..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  setSelectedTransaction(null);
                  setRefundReason("");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmRefund}
                disabled={!refundReason.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Xác nhận hoàn tiền
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
