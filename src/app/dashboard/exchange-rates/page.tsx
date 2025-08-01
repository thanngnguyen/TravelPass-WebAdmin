"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { mockExchangeRates, mockAdmins } from "@/lib/mock-data";
import { formatDate, formatDateTime, getStatusColor, cn } from "@/lib/utils";
import type { ExchangeRate } from "@/types";

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

const CurrencyFlag = ({ currency }: { currency: string }) => {
  const flags: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    JPY: "🇯🇵",
    KRW: "🇰🇷",
    CNY: "🇨🇳",
    VND: "🇻🇳",
  };

  return <span className="text-lg mr-2">{flags[currency] || "💱"}</span>;
};

export default function ExchangeRatesPage() {
  const [exchangeRates] = useState<ExchangeRate[]>(mockExchangeRates);
  const [searchTerm, setSearchTerm] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newRate, setNewRate] = useState({
    fromCurrency: "",
    toCurrency: "VND",
    rate: "",
    effectiveDate: new Date().toISOString().split("T")[0],
  });

  const filteredRates = exchangeRates.filter((rate) => {
    const matchesSearch =
      searchTerm === "" ||
      rate.fromCurrency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.toCurrency.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCurrency =
      currencyFilter === "" ||
      rate.fromCurrency === currencyFilter ||
      rate.toCurrency === currencyFilter;

    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "active" && rate.isActive) ||
      (statusFilter === "inactive" && !rate.isActive);

    return matchesSearch && matchesCurrency && matchesStatus;
  });

  const getAdminName = (adminId: string) => {
    const admin = mockAdmins.find((a) => a.id === adminId);
    return admin ? `${admin.firstName} ${admin.lastName}` : "Không tìm thấy";
  };

  const handleToggleStatus = (rateId: string) => {
    console.log(`Toggle status for rate ${rateId}`);
  };

  const handleAddRate = () => {
    if (!newRate.fromCurrency || !newRate.rate) return;

    console.log("Add new exchange rate:", newRate);
    setShowAddForm(false);
    setNewRate({
      fromCurrency: "",
      toCurrency: "VND",
      rate: "",
      effectiveDate: new Date().toISOString().split("T")[0],
    });
  };

  const handleEditRate = (rateId: string) => {
    console.log(`Edit rate ${rateId}`);
  };

  const activeRates = exchangeRates.filter((r) => r.isActive).length;
  const inactiveRates = exchangeRates.filter((r) => !r.isActive).length;
  const todayRates = exchangeRates.filter(
    (r) => formatDate(r.effectiveDate) === formatDate(new Date().toISOString())
  ).length;

  // Mock historical data for trend
  const getTrend = (currentRate: number) => {
    const previousRate = currentRate * (0.95 + Math.random() * 0.1); // Mock previous rate
    return currentRate > previousRate ? "up" : "down";
  };

  const currencies = ["USD", "EUR", "JPY", "KRW", "CNY"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            💱 Quản lý tỷ giá hối đoái
          </h1>
          <p className="text-gray-600">
            Cập nhật và theo dõi tỷ giá các loại tiền tệ
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm tỷ giá
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng tỷ giá</p>
              <p className="text-2xl font-semibold text-gray-900">
                {exchangeRates.length}
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
              <p className="text-sm font-medium text-gray-500">Đang hiệu lực</p>
              <p className="text-2xl font-semibold text-green-600">
                {activeRates}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100">
              <XCircleIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Không hiệu lực
              </p>
              <p className="text-2xl font-semibold text-gray-600">
                {inactiveRates}
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
              <p className="text-sm font-medium text-gray-500">
                Cập nhật hôm nay
              </p>
              <p className="text-2xl font-semibold text-purple-600">
                {todayRates}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Rate Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thêm tỷ giá mới
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Từ tiền tệ
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRate.fromCurrency}
                    onChange={(e) =>
                      setNewRate({ ...newRate, fromCurrency: e.target.value })
                    }
                  >
                    <option value="">Chọn tiền tệ</option>
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sang tiền tệ
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRate.toCurrency}
                    onChange={(e) =>
                      setNewRate({ ...newRate, toCurrency: e.target.value })
                    }
                  >
                    <option value="VND">VND</option>
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỷ giá
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Nhập tỷ giá"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRate.rate}
                    onChange={(e) =>
                      setNewRate({ ...newRate, rate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày hiệu lực
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRate.effectiveDate}
                    onChange={(e) =>
                      setNewRate({ ...newRate, effectiveDate: e.target.value })
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
                  onClick={handleAddRate}
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
                placeholder="Tìm theo mã tiền tệ..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiền tệ
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
            >
              <option value="">Tất cả</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
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
              <option value="active">Hiệu lực</option>
              <option value="inactive">Không hiệu lực</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exchange Rates Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách tỷ giá ({filteredRates.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cặp tiền tệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tỷ giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xu hướng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày hiệu lực
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người cập nhật
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cập nhật lúc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRates.map((rate) => {
                const trend = getTrend(rate.rate);

                return (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                          <CurrencyFlag currency={rate.fromCurrency} />
                          <span className="text-sm font-medium text-gray-900">
                            {rate.fromCurrency}
                          </span>
                          <span className="text-gray-400">→</span>
                          <CurrencyFlag currency={rate.toCurrency} />
                          <span className="text-sm font-medium text-gray-900">
                            {rate.toCurrency}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {rate.rate.toLocaleString("vi-VN")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {trend === "up" ? (
                          <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={cn(
                            "text-sm font-medium",
                            trend === "up" ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {trend === "up" ? "+" : "-"}
                          {(Math.random() * 2).toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(rate.effectiveDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={rate.isActive ? "active" : "inactive"}
                        label={rate.isActive ? "Hiệu lực" : "Không hiệu lực"}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getAdminName(rate.createdBy)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(rate.updatedAt)}
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
                          onClick={() => handleEditRate(rate.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Chỉnh sửa"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(rate.id)}
                          className={
                            rate.isActive
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }
                          title={rate.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                        >
                          {rate.isActive ? (
                            <XCircleIcon className="h-4 w-4" />
                          ) : (
                            <CheckCircleIcon className="h-4 w-4" />
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

        {filteredRates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy tỷ giá nào</p>
          </div>
        )}
      </div>

      {/* Quick Rate Updates */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tỷ giá nhanh (tham khảo)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currencies.map((currency) => {
            const currentRate = exchangeRates.find(
              (r) => r.fromCurrency === currency && r.toCurrency === "VND"
            );
            const rate = currentRate?.rate || Math.random() * 30000 + 20000;

            return (
              <div
                key={currency}
                className="border border-gray-200 rounded-lg p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <CurrencyFlag currency={currency} />
                  <span className="font-medium">{currency}/VND</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {rate.toLocaleString("vi-VN")}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Cập nhật: {formatDate(new Date().toISOString())}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            * Tỷ giá tham khảo, vui lòng cập nhật tỷ giá chính thức thông qua hệ
            thống
          </p>
        </div>
      </div>
    </div>
  );
}
