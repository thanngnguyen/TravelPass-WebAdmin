"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  MapPinIcon,
  PhoneIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { mockMerchants, mockAdmins } from "@/lib/mock-data";
import { formatDate, formatDateTime, getStatusColor, cn } from "@/lib/utils";
import type { Merchant } from "@/types";

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

const BusinessTypeIcon = ({ businessType }: { businessType: string }) => {
  const icons: Record<string, React.ReactElement> = {
    restaurant: <BuildingStorefrontIcon className="h-4 w-4" />,
    retail: <CreditCardIcon className="h-4 w-4" />,
    transport: <DevicePhoneMobileIcon className="h-4 w-4" />,
    entertainment: <ChartBarIcon className="h-4 w-4" />,
    service: <BanknotesIcon className="h-4 w-4" />,
  };

  return icons[businessType] || <BuildingStorefrontIcon className="h-4 w-4" />;
};

export default function MerchantsPage() {
  const [merchants] = useState<Merchant[]>(mockMerchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [businessTypeFilter, setBusinessTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newMerchant, setNewMerchant] = useState({
    name: "",
    businessType: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    commissionRate: "",
  });

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      searchTerm === "" ||
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.contactPhone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBusinessType =
      businessTypeFilter === "" || merchant.businessType === businessTypeFilter;

    const matchesStatus =
      statusFilter === "" || merchant.status === statusFilter;

    return matchesSearch && matchesBusinessType && matchesStatus;
  });

  const getAdminName = (adminId: string) => {
    const admin = mockAdmins.find((a) => a.id === adminId);
    return admin ? `${admin.firstName} ${admin.lastName}` : "Không tìm thấy";
  };

  const handleToggleStatus = (merchantId: string) => {
    console.log(`Toggle status for merchant ${merchantId}`);
  };

  const handleAddMerchant = () => {
    if (
      !newMerchant.name ||
      !newMerchant.businessType ||
      !newMerchant.contactEmail
    )
      return;

    console.log("Add new merchant:", newMerchant);
    setShowAddForm(false);
    setNewMerchant({
      name: "",
      businessType: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      commissionRate: "",
    });
  };

  const handleEditMerchant = (merchantId: string) => {
    console.log(`Edit merchant ${merchantId}`);
  };

  const activeMerchants = merchants.filter((m) => m.status === "active").length;
  const inactiveMerchants = merchants.filter(
    (m) => m.status === "inactive"
  ).length;
  const suspendedMerchants = merchants.filter(
    (m) => m.status === "suspended"
  ).length;
  const totalPosDevices = merchants.reduce(
    (sum, m) => sum + m.devices.length,
    0
  );

  const businessTypes = [
    { value: "restaurant", label: "Nhà hàng" },
    { value: "retail", label: "Bán lẻ" },
    { value: "transport", label: "Vận tải" },
    { value: "entertainment", label: "Giải trí" },
    { value: "service", label: "Dịch vụ" },
  ];

  const getBusinessTypeLabel = (businessType: string) => {
    const type = businessTypes.find((t) => t.value === businessType);
    return type ? type.label : businessType;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            🏪 Quản lý đối tác thương mại
          </h1>
          <p className="text-gray-600">
            Quản lý các đối tác chấp nhận thanh toán TravelPass
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm đối tác
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <BuildingStorefrontIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng đối tác</p>
              <p className="text-2xl font-semibold text-gray-900">
                {merchants.length}
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
                {activeMerchants}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <XCircleIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tạm dừng</p>
              <p className="text-2xl font-semibold text-yellow-600">
                {suspendedMerchants}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <DevicePhoneMobileIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Thiết bị POS</p>
              <p className="text-2xl font-semibold text-purple-600">
                {totalPosDevices}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Merchant Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thêm đối tác mới
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên đối tác *
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên đối tác"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMerchant.name}
                    onChange={(e) =>
                      setNewMerchant({ ...newMerchant, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại hình kinh doanh *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMerchant.businessType}
                    onChange={(e) =>
                      setNewMerchant({
                        ...newMerchant,
                        businessType: e.target.value,
                      })
                    }
                  >
                    <option value="">Chọn loại hình</option>
                    {businessTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email liên hệ *
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMerchant.contactEmail}
                    onChange={(e) =>
                      setNewMerchant({
                        ...newMerchant,
                        contactEmail: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="0123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMerchant.contactPhone}
                    onChange={(e) =>
                      setNewMerchant({
                        ...newMerchant,
                        contactPhone: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <textarea
                    placeholder="Nhập địa chỉ"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={newMerchant.address}
                    onChange={(e) =>
                      setNewMerchant({
                        ...newMerchant,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỷ lệ hoa hồng (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="2.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMerchant.commissionRate}
                    onChange={(e) =>
                      setNewMerchant({
                        ...newMerchant,
                        commissionRate: e.target.value,
                      })
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
                  onClick={handleAddMerchant}
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
                placeholder="Tìm theo tên, email, số điện thoại..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại hình kinh doanh
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={businessTypeFilter}
              onChange={(e) => setBusinessTypeFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              {businessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
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
              <option value="suspended">Tạm dừng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Merchants Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách đối tác ({filteredMerchants.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin đối tác
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại hình
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hoa hồng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thiết bị POS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {merchant.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        {merchant.address.split(",")[0]}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-1 rounded bg-gray-100 mr-2">
                        <BusinessTypeIcon
                          businessType={merchant.businessType}
                        />
                      </div>
                      <span className="text-sm text-gray-900">
                        {getBusinessTypeLabel(merchant.businessType)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {merchant.contactEmail}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <PhoneIcon className="h-3 w-3 mr-1" />
                      {merchant.contactPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {merchant.commissionRate}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {merchant.devices.length} thiết bị
                    </div>
                    <div className="text-xs text-gray-500">
                      {
                        merchant.devices.filter((d) => d.status === "active")
                          .length
                      }{" "}
                      hoạt động
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={merchant.status}
                      label={
                        merchant.status === "active"
                          ? "Hoạt động"
                          : merchant.status === "inactive"
                          ? "Không hoạt động"
                          : "Tạm dừng"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(merchant.createdAt)}
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
                        onClick={() => handleEditMerchant(merchant.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(merchant.id)}
                        className={
                          merchant.status === "active"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                        title={
                          merchant.status === "active"
                            ? "Tạm dừng"
                            : "Kích hoạt"
                        }
                      >
                        {merchant.status === "active" ? (
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

        {filteredMerchants.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy đối tác nào</p>
          </div>
        )}
      </div>

      {/* Business Type Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thống kê theo loại hình kinh doanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {businessTypes.map((businessType) => {
            const count = merchants.filter(
              (m) => m.businessType === businessType.value
            ).length;
            const activeCount = merchants.filter(
              (m) =>
                m.businessType === businessType.value && m.status === "active"
            ).length;

            return (
              <div
                key={businessType.value}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded bg-blue-100 mr-2">
                      <BusinessTypeIcon businessType={businessType.value} />
                    </div>
                    <span className="text-sm font-medium">
                      {businessType.label}
                    </span>
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
    </div>
  );
}
