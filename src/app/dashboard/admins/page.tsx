"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  KeyIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { mockAdmins } from "@/lib/mock-data";
import { formatDate, formatDateTime, getStatusColor, cn } from "@/lib/utils";
import type { Admin, AdminPermissions } from "@/types";

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

const RoleBadge = ({ role }: { role: string }) => {
  const getRoleStyle = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "operator":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "admin":
        return "Admin";
      case "operator":
        return "Vận hành";
      default:
        return role;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getRoleStyle(role)
      )}
    >
      {getRoleLabel(role)}
    </span>
  );
};

const RoleIcon = ({ role }: { role: string }) => {
  switch (role) {
    case "super_admin":
      return <ShieldCheckIcon className="h-4 w-4" />;
    case "admin":
      return <UserGroupIcon className="h-4 w-4" />;
    case "operator":
      return <UserIcon className="h-4 w-4" />;
    default:
      return <UserIcon className="h-4 w-4" />;
  }
};

export default function AdminsPage() {
  const [admins] = useState<Admin[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "operator" as "super_admin" | "admin" | "operator",
    password: "",
  });

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      searchTerm === "" ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${admin.firstName} ${admin.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "" || admin.role === roleFilter;

    const matchesStatus = statusFilter === "" || admin.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (adminId: string) => {
    console.log(`Toggle status for admin ${adminId}`);
  };

  const handleAddAdmin = () => {
    if (
      !newAdmin.username ||
      !newAdmin.email ||
      !newAdmin.firstName ||
      !newAdmin.lastName ||
      !newAdmin.password
    )
      return;

    console.log("Add new admin:", newAdmin);
    setShowAddForm(false);
    setNewAdmin({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "operator",
      password: "",
    });
  };

  const handleEditAdmin = (adminId: string) => {
    console.log(`Edit admin ${adminId}`);
  };

  const handleResetPassword = (adminId: string) => {
    console.log(`Reset password for admin ${adminId}`);
  };

  const activeAdmins = admins.filter((a) => a.status === "active").length;
  const inactiveAdmins = admins.filter((a) => a.status === "inactive").length;
  const lockedAdmins = admins.filter((a) => a.status === "locked").length;
  const recentLogins = admins.filter((a) => {
    if (!a.lastLogin) return false;
    const lastLogin = new Date(a.lastLogin);
    const now = new Date();
    const diffHours = (now.getTime() - lastLogin.getTime()) / (1000 * 3600);
    return diffHours <= 24;
  }).length;

  const roles = [
    { value: "super_admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "operator", label: "Vận hành" },
  ];

  const defaultPermissions: AdminPermissions = {
    dashboard: false,
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      kyc: false,
    },
    cards: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      topup: false,
    },
    wallets: { view: false, edit: false, lock: false },
    transactions: { view: false, export: false, refund: false },
    topups: { view: false, process: false, cancel: false },
    exchangeRates: { view: false, create: false, edit: false },
    kiosks: { view: false, create: false, edit: false, delete: false },
    merchants: { view: false, create: false, edit: false, delete: false },
    admins: { view: false, create: false, edit: false, delete: false },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            👥 Quản lý người dùng admin
          </h1>
          <p className="text-gray-600">
            Quản lý tài khoản và quyền hạn của admin hệ thống
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm admin
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng admin</p>
              <p className="text-2xl font-semibold text-gray-900">
                {admins.length}
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
              <p className="text-sm font-medium text-gray-500">
                Đang hoạt động
              </p>
              <p className="text-2xl font-semibold text-green-600">
                {activeAdmins}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bị khóa</p>
              <p className="text-2xl font-semibold text-red-600">
                {lockedAdmins}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Truy cập 24h</p>
              <p className="text-2xl font-semibold text-purple-600">
                {recentLogins}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thêm admin mới
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên đăng nhập *
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newAdmin.username}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
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
                      placeholder="Họ"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newAdmin.firstName}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên *
                    </label>
                    <input
                      type="text"
                      placeholder="Tên"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newAdmin.lastName}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newAdmin.role}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, role: e.target.value as any })
                    }
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu *
                  </label>
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddAdmin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                placeholder="Tìm theo tên, email, username..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vai trò
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
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
              <option value="inactive">Không hoạt động</option>
              <option value="locked">Bị khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách admin ({filteredAdmins.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lần đăng nhập cuối
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
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{admin.username} • {admin.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-1 rounded bg-gray-100 mr-2">
                        <RoleIcon role={admin.role} />
                      </div>
                      <RoleBadge role={admin.role} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={admin.status}
                      label={
                        admin.status === "active"
                          ? "Hoạt động"
                          : admin.status === "inactive"
                          ? "Không hoạt động"
                          : "Bị khóa"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastLogin
                      ? formatDateTime(admin.lastLogin)
                      : "Chưa đăng nhập"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(admin.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditAdmin(admin.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleResetPassword(admin.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Đặt lại mật khẩu"
                      >
                        <KeyIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(admin.id)}
                        className={
                          admin.status === "active"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                        title={
                          admin.status === "active"
                            ? "Khóa tài khoản"
                            : "Kích hoạt"
                        }
                      >
                        {admin.status === "active" ? (
                          <XCircleIcon className="h-4 w-4" />
                        ) : (
                          <CheckCircleIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdmins.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy admin nào</p>
          </div>
        )}
      </div>

      {/* Role Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thống kê theo vai trò
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => {
            const count = admins.filter((a) => a.role === role.value).length;
            const activeCount = admins.filter(
              (a) => a.role === role.value && a.status === "active"
            ).length;

            return (
              <div
                key={role.value}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded bg-blue-100 mr-2">
                      <RoleIcon role={role.value} />
                    </div>
                    <span className="text-sm font-medium">{role.label}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-green-600">
                  {activeCount} hoạt động
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thao tác nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Phân quyền hàng loạt</span>
          </button>

          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <KeyIcon className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium">Đặt lại mật khẩu</span>
          </button>

          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <ClockIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium">Lịch sử truy cập</span>
          </button>

          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <UserGroupIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium">Xuất báo cáo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
