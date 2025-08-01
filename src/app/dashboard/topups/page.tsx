"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  mockTopUps,
  mockUsers,
  mockKiosks,
  mockPhysicalCards,
  mockDigitalWallets,
} from "@/lib/mock-data";
import {
  formatCurrency,
  formatDateTime,
  getStatusColor,
  cn,
} from "@/lib/utils";
import type { TopUp } from "@/types";

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

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "failed":
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    case "pending":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    case "cancelled":
      return <ExclamationTriangleIcon className="h-5 w-5 text-gray-500" />;
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function TopUpsPage() {
  const [topUps] = useState<TopUp[]>(mockTopUps);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");

  const filteredTopUps = topUps.filter((topUp) => {
    const user = mockUsers.find((u) => u.id === topUp.userId);
    const userFullName = user ? `${user.firstName} ${user.lastName}` : "";

    const matchesSearch =
      searchTerm === "" ||
      topUp.id.includes(searchTerm) ||
      topUp.userId.includes(searchTerm) ||
      userFullName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || topUp.status === statusFilter;
    const matchesPaymentMethod =
      paymentMethodFilter === "" || topUp.paymentMethod === paymentMethodFilter;

    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const getUserName = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Không tìm thấy";
  };

  const getKioskName = (kioskId?: string) => {
    if (!kioskId) return "Online";
    const kiosk = mockKiosks.find((k) => k.id === kioskId);
    return kiosk ? kiosk.name : "Không tìm thấy";
  };

  const getTargetInfo = (topUp: TopUp) => {
    if (topUp.cardId) {
      const card = mockPhysicalCards.find((c) => c.id === topUp.cardId);
      return card
        ? `Thẻ **** ${card.cardNumber.slice(-4)}`
        : "Thẻ không tìm thấy";
    }
    if (topUp.walletId) {
      const wallet = mockDigitalWallets.find((w) => w.id === topUp.walletId);
      return wallet ? `Ví #${wallet.id}` : "Ví không tìm thấy";
    }
    return "Không xác định";
  };

  const handleStatusUpdate = (
    topUpId: string,
    newStatus: "completed" | "failed" | "cancelled"
  ) => {
    console.log(`Update top-up ${topUpId} status to ${newStatus}`);
  };

  const handleExport = () => {
    console.log("Export top-ups data");
  };

  const totalAmount = filteredTopUps.reduce((sum, t) => sum + t.amount, 0);
  const completedTopUps = filteredTopUps.filter(
    (t) => t.status === "completed"
  ).length;
  const pendingTopUps = filteredTopUps.filter(
    (t) => t.status === "pending"
  ).length;
  const failedTopUps = filteredTopUps.filter(
    (t) => t.status === "failed"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          🔁 Quản lý nạp tiền
        </h1>
        <p className="text-gray-600">
          Theo dõi và xử lý các lệnh nạp tiền vào thẻ và ví
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <ArrowUpIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng lệnh nạp</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredTopUps.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hoàn thành</p>
              <p className="text-2xl font-semibold text-green-600">
                {completedTopUps}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đang xử lý</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {pendingTopUps}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <ArrowUpIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng giá trị</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ID lệnh nạp, người dùng..."
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
              <option value="completed">Hoàn thành</option>
              <option value="pending">Đang xử lý</option>
              <option value="failed">Thất bại</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phương thức thanh toán
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="cash">Tiền mặt</option>
              <option value="bank_transfer">Chuyển khoản</option>
              <option value="credit_card">Thẻ tín dụng</option>
              <option value="e_wallet">Ví điện tử</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Top-ups Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách lệnh nạp tiền ({filteredTopUps.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lệnh nạp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đích nạp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa điểm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTopUps.map((topUp) => (
                <tr key={topUp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <ArrowUpIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          #{topUp.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDateTime(topUp.createdAt)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getUserName(topUp.userId)}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {topUp.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getTargetInfo(topUp)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(topUp.amount, topUp.currency)}
                    </div>
                    {topUp.originalAmount && topUp.exchangeRate && (
                      <div className="text-xs text-gray-500">
                        Gốc: {formatCurrency(topUp.originalAmount)}
                        (Tỷ giá: {topUp.exchangeRate})
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {topUp.paymentMethod === "cash"
                        ? "Tiền mặt"
                        : topUp.paymentMethod === "bank_transfer"
                        ? "Chuyển khoản"
                        : topUp.paymentMethod === "credit_card"
                        ? "Thẻ tín dụng"
                        : "Ví điện tử"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <StatusIcon status={topUp.status} />
                      <StatusBadge
                        status={topUp.status}
                        label={
                          topUp.status === "completed"
                            ? "Hoàn thành"
                            : topUp.status === "failed"
                            ? "Thất bại"
                            : topUp.status === "pending"
                            ? "Đang xử lý"
                            : "Đã hủy"
                        }
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getKioskName(topUp.kioskId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(topUp.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {topUp.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(topUp.id, "completed")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Xác nhận hoàn thành"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(topUp.id, "failed")
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Đánh dấu thất bại"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(topUp.id, "cancelled")
                            }
                            className="text-gray-600 hover:text-gray-900"
                            title="Hủy lệnh"
                          >
                            <ExclamationTriangleIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        className="text-purple-600 hover:text-purple-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTopUps.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy lệnh nạp tiền nào</p>
          </div>
        )}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top-up Methods Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phân bố theo phương thức thanh toán
          </h3>
          <div className="space-y-3">
            {["cash", "bank_transfer", "credit_card", "e_wallet"].map(
              (method) => {
                const count = topUps.filter(
                  (t) => t.paymentMethod === method
                ).length;
                const percentage = topUps.length
                  ? (count / topUps.length) * 100
                  : 0;
                const methodName =
                  method === "cash"
                    ? "Tiền mặt"
                    : method === "bank_transfer"
                    ? "Chuyển khoản"
                    : method === "credit_card"
                    ? "Thẻ tín dụng"
                    : "Ví điện tử";

                return (
                  <div
                    key={method}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{methodName}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tỷ lệ thành công
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {topUps.length
                ? Math.round((completedTopUps / topUps.length) * 100)
                : 0}
              %
            </div>
            <p className="text-gray-600 mb-4">Tỷ lệ nạp tiền thành công</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-600">
                  {completedTopUps}
                </div>
                <div className="text-xs text-gray-500">Thành công</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-yellow-600">
                  {pendingTopUps}
                </div>
                <div className="text-xs text-gray-500">Đang xử lý</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-red-600">
                  {failedTopUps}
                </div>
                <div className="text-xs text-gray-500">Thất bại</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
