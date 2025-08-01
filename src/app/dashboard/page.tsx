"use client";

import {
  UsersIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { mockDashboardStats } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard() {
  const stats = mockDashboardStats;

  const handleRefreshData = () => {
    console.log("Refreshing dashboard data...");
    // Simulate data refresh
  };

  const handleExportReport = () => {
    console.log("Exporting dashboard report...");
    // Simulate report export
  };

  const handleQuickSettings = () => {
    console.log("Opening dashboard settings...");
  };

  const handleNotifications = () => {
    console.log("Opening notifications...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            📋 Dashboard Tổng Quan
          </h1>
          <p className="text-gray-600">Xem tổng quan về hệ thống TravelPass</p>
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
            onClick={handleExportReport}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            title="Xuất báo cáo"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </button>

          <button
            onClick={handleNotifications}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title="Thông báo"
          >
            <BellIcon className="h-4 w-4" />
          </button>

          <button
            onClick={handleQuickSettings}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title="Cài đặt dashboard"
          >
            <Cog6ToothIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng số người dùng"
          value={stats.totalUsers.toLocaleString()}
          icon={UsersIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Số thẻ đang hoạt động"
          value={stats.activeCards.toLocaleString()}
          icon={CreditCardIcon}
          color="bg-green-500"
        />
        <StatCard
          title="Giao dịch hôm nay"
          value={stats.todayTransactions.toLocaleString()}
          icon={ArrowsRightLeftIcon}
          color="bg-yellow-500"
        />
        <StatCard
          title="Tổng giá trị giao dịch"
          value={formatCurrency(stats.totalTransactionAmount)}
          icon={CurrencyDollarIcon}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top-up Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top-up theo ngày (7 ngày qua)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.topUpsByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => formatDate(value)}
              />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                labelFormatter={(value) => formatDate(value)}
                formatter={(value: number) => [
                  formatCurrency(value),
                  "Số tiền",
                ]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions by Location */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Giao dịch theo địa điểm
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.transactionsByLocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({
                  name,
                  percent,
                }: {
                  name: string;
                  percent?: number;
                }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.transactionsByLocation.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Hoạt động gần đây
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Người dùng mới đăng ký
                  </p>
                  <p className="text-xs text-gray-500">
                    nguyen.van.c@gmail.com - 5 phút trước
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Giao dịch thanh toán
                  </p>
                  <p className="text-xs text-gray-500">
                    Thẻ ***3456 - {formatCurrency(75000)} - 12 phút trước
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Nạp tiền tại kiosk
                  </p>
                  <p className="text-xs text-gray-500">
                    Kiosk Bến Thành - {formatCurrency(200000)} - 18 phút trước
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Kiosk offline
                  </p>
                  <p className="text-xs text-gray-500">
                    Kiosk Quận 7 - Cần kiểm tra - 25 phút trước
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
