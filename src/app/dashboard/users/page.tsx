"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  LockClosedIcon,
  LockOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserPlusIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { mockUsers } from "@/lib/mock-data";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import type { User, UserFilters } from "@/types";

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

const KYCStatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "approved":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "rejected":
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    case "pending":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [filters, setFilters] = useState<UserFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "Vietnamese",
  });
  const [lockReason, setLockReason] = useState("");
  const [unlockReason, setUnlockReason] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesFilters =
      (!filters.kycStatus || user.kycStatus === filters.kycStatus) &&
      (!filters.accountStatus ||
        user.accountStatus === filters.accountStatus) &&
      (!filters.nationality || user.nationality === filters.nationality);

    return matchesSearch && matchesFilters;
  });

  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "locked"
  ) => {
    // This would be an API call in real app
    console.log(`Changing user ${userId} status to ${newStatus}`);
  };

  const handleKYCDecision = (
    userId: string,
    decision: "approved" | "rejected"
  ) => {
    // This would be an API call in real app
    console.log(`KYC decision for user ${userId}: ${decision}`);
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      nationality: user.nationality,
    });
    setShowEditModal(true);
  };

  const handleLockUser = (user: User) => {
    setSelectedUser(user);
    setShowLockModal(true);
  };

  const handleUnlockUser = (user: User) => {
    setSelectedUser(user);
    setShowUnlockModal(true);
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleSaveUser = () => {
    if (
      !newUser.email ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.phone
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    console.log("Saving user:", newUser);
    setShowAddModal(false);
    setNewUser({
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "Vietnamese",
    });
  };

  const handleUpdateUser = () => {
    if (
      !newUser.email ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.phone
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    console.log("Updating user:", selectedUser?.id, newUser);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleConfirmLock = () => {
    if (!lockReason.trim()) {
      alert("Vui lòng nhập lý do khóa tài khoản");
      return;
    }

    console.log("Locking user:", selectedUser?.id, "Reason:", lockReason);
    setShowLockModal(false);
    setSelectedUser(null);
    setLockReason("");
  };

  const handleConfirmUnlock = () => {
    if (!unlockReason.trim()) {
      alert("Vui lòng nhập lý do mở khóa tài khoản");
      return;
    }

    console.log("Unlocking user:", selectedUser?.id, "Reason:", unlockReason);
    setShowUnlockModal(false);
    setSelectedUser(null);
    setUnlockReason("");
  };

  const handleExportUsers = () => {
    console.log("Exporting users data...");
  };

  const handleRefreshData = () => {
    console.log("Refreshing users data...");
  };

  const handleSendBulkEmail = () => {
    console.log("Opening bulk email form...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            👤 Quản lý người dùng
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin người dùng và phê duyệt KYC
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
            onClick={handleSendBulkEmail}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
            title="Gửi email hàng loạt"
          >
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            Gửi email
          </button>

          <button
            onClick={handleExportUsers}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            title="Xuất danh sách"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Xuất Excel
          </button>

          <button
            onClick={handleAddUser}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            title="Thêm người dùng mới"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Thêm user
          </button>
        </div>
      </div>

      {/* Filters and Search */}
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
                placeholder="Email, tên, số điện thoại..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái KYC
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.kycStatus || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  kycStatus: e.target.value || undefined,
                })
              }
            >
              <option value="">Tất cả</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái tài khoản
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.accountStatus || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  accountStatus: e.target.value || undefined,
                })
              }
            >
              <option value="">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Bị khóa</option>
              <option value="suspended">Tạm ngừng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quốc tịch
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.nationality || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  nationality: e.target.value || undefined,
                })
              }
            >
              <option value="">Tất cả</option>
              <option value="Vietnamese">Việt Nam</option>
              <option value="American">Mỹ</option>
              <option value="Korean">Hàn Quốc</option>
              <option value="Japanese">Nhật Bản</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Danh sách người dùng ({filteredUsers.length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quốc tịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KYC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.nationality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <KYCStatusIcon status={user.kycStatus} />
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={user.accountStatus}
                      label={
                        user.accountStatus === "active"
                          ? "Hoạt động"
                          : user.accountStatus === "locked"
                          ? "Bị khóa"
                          : "Tạm ngừng"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {user.kycStatus === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleKYCDecision(user.id, "approved")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Phê duyệt KYC"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleKYCDecision(user.id, "rejected")
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Từ chối KYC"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          user.accountStatus === "active"
                            ? handleLockUser(user)
                            : handleUnlockUser(user)
                        }
                        className={
                          user.accountStatus === "active"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                        title={
                          user.accountStatus === "active"
                            ? "Khóa tài khoản"
                            : "Mở khóa tài khoản"
                        }
                      >
                        {user.accountStatus === "active" ? (
                          <LockClosedIcon className="h-4 w-4" />
                        ) : (
                          <LockOpenIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy người dùng nào</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thêm người dùng mới
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ *
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên *
                    </label>
                    <input
                      type="text"
                      placeholder="Văn A"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    placeholder="0123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quốc tịch
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newUser.nationality}
                    onChange={(e) =>
                      setNewUser({ ...newUser, nationality: e.target.value })
                    }
                  >
                    <option value="Vietnamese">Việt Nam</option>
                    <option value="American">Mỹ</option>
                    <option value="Korean">Hàn Quốc</option>
                    <option value="Japanese">Nhật Bản</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Thêm người dùng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative mx-auto p-5 w-full max-w-3xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết người dùng
              </h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedUser(null);
                }}
                className="text-red-400 hover:text-red-600"
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
              {/* Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">
                    {selectedUser.firstName.charAt(0)}
                    {selectedUser.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <p className="text-sm text-gray-500">ID: {selectedUser.id}</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center space-x-2 mb-2">
                    <KYCStatusIcon status={selectedUser.kycStatus} />
                    <StatusBadge
                      status={selectedUser.kycStatus}
                      label={
                        selectedUser.kycStatus === "approved"
                          ? "KYC Đã duyệt"
                          : selectedUser.kycStatus === "rejected"
                          ? "KYC Từ chối"
                          : "KYC Chờ duyệt"
                      }
                    />
                  </div>
                  <StatusBadge
                    status={selectedUser.accountStatus}
                    label={
                      selectedUser.accountStatus === "active"
                        ? "Tài khoản Hoạt động"
                        : selectedUser.accountStatus === "locked"
                        ? "Tài khoản Bị khóa"
                        : "Tài khoản Tạm ngừng"
                    }
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">👤</span>
                  Thông tin cá nhân
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Họ
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quốc tịch
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedUser.nationality}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      User ID
                    </label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">
                      {selectedUser.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">🔐</span>
                  Trạng thái tài khoản
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trạng thái KYC
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <KYCStatusIcon status={selectedUser.kycStatus} />
                      <StatusBadge
                        status={selectedUser.kycStatus}
                        label={
                          selectedUser.kycStatus === "approved"
                            ? "Đã duyệt"
                            : selectedUser.kycStatus === "rejected"
                            ? "Từ chối"
                            : "Chờ duyệt"
                        }
                      />
                    </div>
                    {selectedUser.kycStatus === "approved" && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Đã xác minh danh tính
                      </p>
                    )}
                    {selectedUser.kycStatus === "rejected" && (
                      <p className="text-xs text-red-600 mt-1">
                        ✗ Không đạt yêu cầu xác minh
                      </p>
                    )}
                    {selectedUser.kycStatus === "pending" && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⏳ Đang chờ xem xét
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trạng thái tài khoản
                    </label>
                    <div className="mt-1">
                      <StatusBadge
                        status={selectedUser.accountStatus}
                        label={
                          selectedUser.accountStatus === "active"
                            ? "Hoạt động"
                            : selectedUser.accountStatus === "locked"
                            ? "Bị khóa"
                            : "Tạm ngừng"
                        }
                      />
                    </div>
                    {selectedUser.accountStatus === "active" && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Có thể sử dụng đầy đủ dịch vụ
                      </p>
                    )}
                    {selectedUser.accountStatus === "locked" && (
                      <p className="text-xs text-red-600 mt-1">
                        🔒 Bị hạn chế truy cập
                      </p>
                    )}
                    {selectedUser.accountStatus === "suspended" && (
                      <p className="text-xs text-yellow-600 mt-1">
                        ⏸️ Tạm thời ngừng hoạt động
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Activity */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">📅</span>
                  Hoạt động tài khoản
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày tạo tài khoản
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedUser.createdAt)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(selectedUser.createdAt).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      ngày trước
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedUser.updatedAt)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(selectedUser.updatedAt).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      ngày trước
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">📊</span>
                  Thống kê nhanh
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-xs text-gray-600">Thẻ vật lý</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">0</p>
                    <p className="text-xs text-gray-600">Ví điện tử</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">0</p>
                    <p className="text-xs text-gray-600">Giao dịch</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">₫0</p>
                    <p className="text-xs text-gray-600">Tổng số dư</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEditUser(selectedUser);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Chỉnh sửa
              </button>
              {selectedUser.kycStatus === "pending" && (
                <>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleKYCDecision(selectedUser.id, "approved");
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Phê duyệt KYC
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleKYCDecision(selectedUser.id, "rejected");
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Từ chối KYC
                  </button>
                </>
              )}
              {selectedUser.accountStatus === "active" ? (
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleLockUser(selectedUser);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Khóa tài khoản
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleUnlockUser(selectedUser);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Mở khóa tài khoản
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Chỉnh sửa thông tin người dùng
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quốc tịch
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newUser.nationality}
                    onChange={(e) =>
                      setNewUser({ ...newUser, nationality: e.target.value })
                    }
                  >
                    <option value="Vietnamese">Việt Nam</option>
                    <option value="American">Mỹ</option>
                    <option value="Korean">Hàn Quốc</option>
                    <option value="Japanese">Nhật Bản</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>ID:</strong> {selectedUser.id}
                    </p>
                    <p>
                      <strong>Ngày tạo:</strong>{" "}
                      {formatDate(selectedUser.createdAt)}
                    </p>
                    <p>
                      <strong>Trạng thái KYC:</strong>{" "}
                      {selectedUser.kycStatus === "approved"
                        ? "Đã duyệt"
                        : selectedUser.kycStatus === "rejected"
                        ? "Từ chối"
                        : "Chờ duyệt"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateUser}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lock User Modal */}
      {showLockModal && selectedUser && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-20 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-sm bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Khóa tài khoản người dùng
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
                      <p>Bạn đang thực hiện khóa tài khoản của:</p>
                      <p className="font-semibold">
                        {selectedUser.firstName} {selectedUser.lastName} (
                        {selectedUser.email})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do khóa tài khoản *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do khóa tài khoản (vi phạm chính sách, hoạt động đáng ngờ, yêu cầu từ người dùng, v.v.)"
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
                    setSelectedUser(null);
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
                  Khóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unlock User Modal */}
      {showUnlockModal && selectedUser && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Mở khóa tài khoản người dùng
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
                      <p>Bạn đang thực hiện mở khóa tài khoản của:</p>
                      <p className="font-semibold">
                        {selectedUser.firstName} {selectedUser.lastName} (
                        {selectedUser.email})
                      </p>
                      <p className="mt-1">
                        <strong>Trạng thái hiện tại:</strong>{" "}
                        {selectedUser.accountStatus === "locked"
                          ? "Bị khóa"
                          : selectedUser.accountStatus === "suspended"
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
                    Lý do mở khóa tài khoản *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do mở khóa tài khoản (đã giải quyết vấn đề, yêu cầu hợp lệ, kết thúc thời gian trừng phạt, v.v.)"
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
                    setSelectedUser(null);
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
                  Mở khóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
