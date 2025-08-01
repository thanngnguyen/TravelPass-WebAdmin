"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { mockKiosks, mockAdmins } from "@/lib/mock-data";
import { formatDateTime, getStatusColor, cn } from "@/lib/utils";
import type { Kiosk } from "@/types";

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
    case "active":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "maintenance":
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
    case "offline":
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    default:
      return <XCircleIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function KiosksPage() {
  const [kiosks] = useState<Kiosk[]>(mockKiosks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedKiosk, setSelectedKiosk] = useState<Kiosk | null>(null);
  const [maintenanceNote, setMaintenanceNote] = useState("");

  // Edit form states
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    adminId: "",
    status: "active" as "active" | "maintenance" | "offline",
  });

  const filteredKiosks = kiosks.filter((kiosk) => {
    const matchesSearch =
      searchTerm === "" ||
      kiosk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kiosk.location.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "" || kiosk.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getAdminName = (adminId?: string) => {
    if (!adminId) return "Chưa gán";
    const admin = mockAdmins.find((a) => a.id === adminId);
    return admin ? `${admin.firstName} ${admin.lastName}` : "Không tìm thấy";
  };

  const handleStatusChange = (
    kioskId: string,
    newStatus: "active" | "maintenance" | "offline"
  ) => {
    console.log(`Changing kiosk ${kioskId} status to ${newStatus}`);
  };

  const handleMaintenance = (kioskId: string) => {
    const kiosk = kiosks.find((k) => k.id === kioskId);
    if (kiosk) {
      setSelectedKiosk(kiosk);
      setShowMaintenanceModal(true);
    }
  };

  const handleViewDetails = (kiosk: Kiosk) => {
    setSelectedKiosk(kiosk);
    setShowDetailModal(true);
  };

  const handleEdit = (kiosk: Kiosk) => {
    setSelectedKiosk(kiosk);
    setEditForm({
      name: kiosk.name,
      address: kiosk.location.address,
      adminId: kiosk.adminId || "",
      status: kiosk.status,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedKiosk && editForm.name.trim() && editForm.address.trim()) {
      console.log(`Updating kiosk ${selectedKiosk.id}:`, editForm);
      // Here you would typically make an API call to update the kiosk
      setShowEditModal(false);
      setSelectedKiosk(null);
      setEditForm({ name: "", address: "", adminId: "", status: "active" });
    }
  };

  const handleConfirmMaintenance = () => {
    if (selectedKiosk && maintenanceNote.trim()) {
      console.log(
        `Recording maintenance for kiosk ${selectedKiosk.id}: ${maintenanceNote}`
      );
      // Here you would typically make an API call to record maintenance
      setShowMaintenanceModal(false);
      setSelectedKiosk(null);
      setMaintenanceNote("");
    }
  };

  const handleViewMap = (kiosk: Kiosk) => {
    // Open Google Maps
    const url = `https://www.google.com/maps?q=${kiosk.location.latitude},${kiosk.location.longitude}`;
    window.open(url, "_blank");
  };

  const handleAddKiosk = () => {
    console.log("Opening add kiosk form...");
  };

  const handleBulkMaintenance = () => {
    console.log("Opening bulk maintenance scheduler...");
  };

  const handleExportKiosks = () => {
    console.log("Exporting kiosks data...");
  };

  const handleRefreshData = () => {
    console.log("Refreshing kiosks data...");
  };

  const handleViewAllOnMap = () => {
    console.log("Opening map view with all kiosks...");
  };

  const handleMaintenanceSchedule = () => {
    console.log("Opening maintenance schedule...");
  };

  const activeKiosks = kiosks.filter((k) => k.status === "active").length;
  const maintenanceKiosks = kiosks.filter(
    (k) => k.status === "maintenance"
  ).length;
  const offlineKiosks = kiosks.filter((k) => k.status === "offline").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🏪 Quản lý kiosk</h1>
          <p className="text-gray-600">
            Quản lý các kiosk nạp tiền và theo dõi trạng thái hoạt động
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
            onClick={handleViewAllOnMap}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            title="Xem trên bản đồ"
          >
            <GlobeAltIcon className="h-4 w-4 mr-2" />
            Xem bản đồ
          </button>

          <button
            onClick={handleMaintenanceSchedule}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
            title="Lịch bảo trì"
          >
            <CalendarDaysIcon className="h-4 w-4 mr-2" />
            Lịch bảo trì
          </button>

          <button
            onClick={handleExportKiosks}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            title="Xuất danh sách"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Xuất Excel
          </button>

          <button
            onClick={handleAddKiosk}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            title="Thêm kiosk mới"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Thêm kiosk
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <MapPinIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng số kiosk</p>
              <p className="text-2xl font-semibold text-gray-900">
                {kiosks.length}
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
                {activeKiosks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <WrenchScrewdriverIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bảo trì</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {maintenanceKiosks}
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
              <p className="text-sm font-medium text-gray-500">Offline</p>
              <p className="text-2xl font-semibold text-red-600">
                {offlineKiosks}
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
                placeholder="Tên kiosk, địa chỉ..."
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
              <option value="maintenance">Bảo trì</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kiosks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách kiosk ({filteredKiosks.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin kiosk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin phụ trách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bảo trì cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredKiosks.map((kiosk) => (
                <tr key={kiosk.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPinIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {kiosk.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {kiosk.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {kiosk.location.address}
                    </div>
                    <div className="text-sm text-gray-500">
                      {kiosk.location.latitude.toFixed(4)},{" "}
                      {kiosk.location.longitude.toFixed(4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <StatusIcon status={kiosk.status} />
                      <StatusBadge
                        status={kiosk.status}
                        label={
                          kiosk.status === "active"
                            ? "Hoạt động"
                            : kiosk.status === "maintenance"
                            ? "Bảo trì"
                            : "Offline"
                        }
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getAdminName(kiosk.adminId)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {kiosk.lastMaintenance
                      ? formatDateTime(kiosk.lastMaintenance)
                      : "Chưa có"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(kiosk)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(kiosk)}
                        className="text-green-600 hover:text-green-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleViewMap(kiosk)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Xem trên bản đồ"
                      >
                        <MapPinIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMaintenance(kiosk.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Ghi nhận bảo trì"
                      >
                        <WrenchScrewdriverIcon className="h-4 w-4" />
                      </button>

                      {/* Status change dropdown - simplified for demo */}
                      <select
                        className="text-xs border border-gray-300 rounded"
                        value={kiosk.status}
                        onChange={(e) =>
                          handleStatusChange(kiosk.id, e.target.value as any)
                        }
                      >
                        <option value="active">Hoạt động</option>
                        <option value="maintenance">Bảo trì</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredKiosks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy kiosk nào</p>
          </div>
        )}
      </div>

      {/* Map Section - Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Bản đồ kiosk
        </h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Bản đồ sẽ hiển thị vị trí các kiosk</p>
            <p className="text-sm text-gray-400">
              Tích hợp Google Maps hoặc OpenStreetMap
            </p>
          </div>
        </div>
      </div>

      {/* Kiosk Detail Modal */}
      {showDetailModal && selectedKiosk && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết kiosk: {selectedKiosk.name}
              </h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedKiosk(null);
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
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID Kiosk
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedKiosk.id}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên kiosk
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedKiosk.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <StatusIcon status={selectedKiosk.status} />
                    <StatusBadge
                      status={selectedKiosk.status}
                      label={
                        selectedKiosk.status === "active"
                          ? "Hoạt động"
                          : selectedKiosk.status === "maintenance"
                          ? "Bảo trì"
                          : "Offline"
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Admin phụ trách
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {getAdminName(selectedKiosk.adminId)}
                  </p>
                </div>
              </div>

              {/* Location Info */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedKiosk.location.address}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Vĩ độ
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedKiosk.location.latitude}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kinh độ
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedKiosk.location.longitude}
                    </p>
                  </div>
                </div>
              </div>

              {/* Maintenance Info */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bảo trì cuối
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedKiosk.lastMaintenance
                        ? formatDateTime(selectedKiosk.lastMaintenance)
                        : "Chưa có"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày tạo
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDateTime(selectedKiosk.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedKiosk(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedKiosk);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => handleViewMap(selectedKiosk)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Xem trên bản đồ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Kiosk Modal */}
      {showEditModal && selectedKiosk && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Chỉnh sửa kiosk: {selectedKiosk.name}
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedKiosk(null);
                  setEditForm({
                    name: "",
                    address: "",
                    adminId: "",
                    status: "active",
                  });
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên kiosk *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên kiosk..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ *
                </label>
                <textarea
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Nhập địa chỉ kiosk..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin phụ trách
                </label>
                <select
                  value={editForm.adminId}
                  onChange={(e) =>
                    setEditForm({ ...editForm, adminId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn admin...</option>
                  {mockAdmins.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.firstName} {admin.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedKiosk(null);
                  setEditForm({
                    name: "",
                    address: "",
                    adminId: "",
                    status: "active",
                  });
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!editForm.name.trim() || !editForm.address.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {showMaintenanceModal && selectedKiosk && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Ghi nhận bảo trì
              </h3>
              <button
                onClick={() => {
                  setShowMaintenanceModal(false);
                  setSelectedKiosk(null);
                  setMaintenanceNote("");
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
                Bạn đang ghi nhận bảo trì cho kiosk:
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <p className="font-semibold">{selectedKiosk.name}</p>
                <p className="text-sm text-gray-600">ID: {selectedKiosk.id}</p>
                <p className="text-sm text-gray-600">
                  Địa chỉ: {selectedKiosk.location.address}
                </p>
                <div className="mt-1 flex items-center space-x-2">
                  <StatusIcon status={selectedKiosk.status} />
                  <StatusBadge
                    status={selectedKiosk.status}
                    label={
                      selectedKiosk.status === "active"
                        ? "Hoạt động"
                        : selectedKiosk.status === "maintenance"
                        ? "Bảo trì"
                        : "Offline"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú bảo trì *
              </label>
              <textarea
                value={maintenanceNote}
                onChange={(e) => setMaintenanceNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Mô tả công việc bảo trì đã thực hiện..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowMaintenanceModal(false);
                  setSelectedKiosk(null);
                  setMaintenanceNote("");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmMaintenance}
                disabled={!maintenanceNote.trim()}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Xác nhận bảo trì
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
