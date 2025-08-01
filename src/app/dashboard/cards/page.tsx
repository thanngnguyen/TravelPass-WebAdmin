"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  CreditCardIcon,
  UserIcon,
  PlusIcon,
  LockClosedIcon,
  LockOpenIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  QrCodeIcon,
  PrinterIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { mockPhysicalCards, mockUsers } from "@/lib/mock-data";
import { formatCurrency, formatDate, getStatusColor, cn } from "@/lib/utils";
import type { PhysicalCard } from "@/types";

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

export default function CardsPage() {
  const [cards] = useState<PhysicalCard[]>(mockPhysicalCards);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showAssignUserModal, setShowAssignUserModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PhysicalCard | null>(null);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    balance: 0,
  });
  const [topUpAmount, setTopUpAmount] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [lockReason, setLockReason] = useState("");
  const [unlockReason, setUnlockReason] = useState("");

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchTerm === "" ||
      card.cardNumber.includes(searchTerm) ||
      card.id.includes(searchTerm);

    const matchesStatus = statusFilter === "" || card.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getUserName = (userId?: string) => {
    if (!userId) return "Chưa gắn";
    const user = mockUsers.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Không tìm thấy";
  };

  const handleStatusChange = (
    cardId: string,
    newStatus: "active" | "locked"
  ) => {
    console.log(`Changing card ${cardId} status to ${newStatus}`);
  };

  const handleTopUp = (card: PhysicalCard) => {
    setSelectedCard(card);
    setShowTopUpModal(true);
  };

  const handleAssignUser = (card: PhysicalCard) => {
    setSelectedCard(card);
    setShowAssignUserModal(true);
  };

  const handleEditCard = (card: PhysicalCard) => {
    setSelectedCard(card);
    setNewCard({
      cardNumber: card.cardNumber,
      balance: card.balance,
    });
    setShowEditModal(true);
  };

  const handleLockCard = (card: PhysicalCard) => {
    setSelectedCard(card);
    setShowLockModal(true);
  };

  const handleUnlockCard = (card: PhysicalCard) => {
    setSelectedCard(card);
    setShowUnlockModal(true);
  };

  const handleViewDetail = (card: PhysicalCard) => {
    setSelectedCard(card);
    setShowDetailModal(true);
  };

  const handleSaveCard = () => {
    if (!newCard.cardNumber) {
      alert("Vui lòng nhập số thẻ");
      return;
    }

    console.log("Adding new card:", newCard);
    setShowAddModal(false);
    setNewCard({
      cardNumber: "",
      balance: 0,
    });
  };

  const handleUpdateCard = () => {
    if (!newCard.cardNumber) {
      alert("Vui lòng nhập số thẻ");
      return;
    }

    console.log("Updating card:", selectedCard?.id, newCard);
    setShowEditModal(false);
    setSelectedCard(null);
  };

  const handleConfirmTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    console.log("Top up card:", selectedCard?.id, "Amount:", topUpAmount);
    setShowTopUpModal(false);
    setSelectedCard(null);
    setTopUpAmount("");
  };

  const handleConfirmAssignUser = () => {
    if (!selectedUserId) {
      alert("Vui lòng chọn người dùng");
      return;
    }

    console.log("Assign user:", selectedUserId, "to card:", selectedCard?.id);
    setShowAssignUserModal(false);
    setSelectedCard(null);
    setSelectedUserId("");
  };

  const handleConfirmLock = () => {
    if (!lockReason.trim()) {
      alert("Vui lòng nhập lý do khóa thẻ");
      return;
    }

    console.log("Locking card:", selectedCard?.id, "Reason:", lockReason);
    setShowLockModal(false);
    setSelectedCard(null);
    setLockReason("");
  };

  const handleConfirmUnlock = () => {
    if (!unlockReason.trim()) {
      alert("Vui lòng nhập lý do mở khóa thẻ");
      return;
    }

    console.log("Unlocking card:", selectedCard?.id, "Reason:", unlockReason);
    setShowUnlockModal(false);
    setSelectedCard(null);
    setUnlockReason("");
  };

  const handleBulkIssue = () => {
    setShowAddModal(true);
  };

  const handleExportCards = () => {
    console.log("Exporting cards data...");
  };

  const handleRefreshData = () => {
    console.log("Refreshing cards data...");
  };

  const handlePrintCards = () => {
    console.log("Opening print cards dialog...");
  };

  const handleQRCodeGeneration = () => {
    console.log("Generating QR codes for cards...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            💳 Quản lý thẻ vật lý
          </h1>
          <p className="text-gray-600">
            Quản lý thẻ vật lý, gắn người dùng và nạp tiền
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
            onClick={handleQRCodeGeneration}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            title="Tạo mã QR"
          >
            <QrCodeIcon className="h-4 w-4 mr-2" />
            Tạo QR
          </button>

          <button
            onClick={handlePrintCards}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            title="In thẻ"
          >
            <PrinterIcon className="h-4 w-4 mr-2" />
            In thẻ
          </button>

          <button
            onClick={handleExportCards}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            title="Xuất danh sách"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Xuất Excel
          </button>

          <button
            onClick={handleBulkIssue}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            title="Phát hành hàng loạt"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Phát hành thẻ
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <CreditCardIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng số thẻ</p>
              <p className="text-2xl font-semibold text-gray-900">
                {cards.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CreditCardIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Thẻ hoạt động</p>
              <p className="text-2xl font-semibold text-gray-900">
                {cards.filter((c) => c.status === "active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <UserIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Thẻ đã gắn user
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {cards.filter((c) => c.userId).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <CreditCardIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng số dư</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(
                  cards.reduce((sum, card) => sum + card.balance, 0)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Số thẻ, ID thẻ..."
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
              <option value="inactive">Chưa kích hoạt</option>
              <option value="locked">Bị khóa</option>
              <option value="expired">Hết hạn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách thẻ ({filteredCards.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin thẻ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số dư
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày phát hành
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sử dụng lần cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCards.map((card) => (
                <tr key={card.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CreditCardIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          **** **** **** {card.cardNumber.slice(-4)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {card.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getUserName(card.userId)}
                    </div>
                    {card.userId && (
                      <div className="text-sm text-gray-500">
                        ID: {card.userId}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(card.balance)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={card.status}
                      label={
                        card.status === "active"
                          ? "Hoạt động"
                          : card.status === "inactive"
                          ? "Chưa kích hoạt"
                          : card.status === "locked"
                          ? "Bị khóa"
                          : "Hết hạn"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(card.issuedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.lastUsed ? formatDate(card.lastUsed) : "Chưa sử dụng"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(card)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleTopUp(card)}
                        className="text-green-600 hover:text-green-900"
                        title="Nạp tiền"
                      >
                        <ArrowUpIcon className="h-4 w-4" />
                      </button>
                      {!card.userId && (
                        <button
                          onClick={() => handleAssignUser(card)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Gắn người dùng"
                        >
                          <UserIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEditCard(card)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          card.status === "active"
                            ? handleLockCard(card)
                            : handleUnlockCard(card)
                        }
                        className={
                          card.status === "active"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }
                        title={
                          card.status === "active"
                            ? "Khóa thẻ"
                            : "Kích hoạt thẻ"
                        }
                      >
                        {card.status === "active" ? (
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

        {filteredCards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy thẻ nào</p>
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Phát hành thẻ mới
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số thẻ *
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCard.cardNumber}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số dư ban đầu
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCard.balance}
                    onChange={(e) =>
                      setNewCard({
                        ...newCard,
                        balance: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
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
                  onClick={handleSaveCard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Phát hành thẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {showEditModal && selectedCard && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Chỉnh sửa thông tin thẻ
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số thẻ *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCard.cardNumber}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số dư hiện tại
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCard.balance}
                    onChange={(e) =>
                      setNewCard({
                        ...newCard,
                        balance: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>ID:</strong> {selectedCard.id}
                    </p>
                    <p>
                      <strong>Ngày phát hành:</strong>{" "}
                      {formatDate(selectedCard.issuedDate)}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      {selectedCard.status === "active"
                        ? "Hoạt động"
                        : selectedCard.status === "inactive"
                        ? "Chưa kích hoạt"
                        : selectedCard.status === "locked"
                        ? "Bị khóa"
                        : "Hết hạn"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCard(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateCard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Up Modal */}
      {showTopUpModal && selectedCard && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Nạp tiền vào thẻ
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CreditCardIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Thông tin thẻ
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Số thẻ: **** **** ****{" "}
                        {selectedCard.cardNumber.slice(-4)}
                      </p>
                      <p>
                        Số dư hiện tại: {formatCurrency(selectedCard.balance)}
                      </p>
                      <p>Chủ thẻ: {getUserName(selectedCard.userId)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số tiền nạp *
                  </label>
                  <input
                    type="number"
                    placeholder="100000"
                    min="1000"
                    max="10000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tối thiểu: 1,000 VND - Tối đa: 10,000,000 VND
                  </p>
                </div>

                {topUpAmount && parseFloat(topUpAmount) > 0 && (
                  <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-sm text-green-700">
                      <strong>Số dư sau khi nạp:</strong>{" "}
                      {formatCurrency(
                        selectedCard.balance + parseFloat(topUpAmount)
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowTopUpModal(false);
                    setSelectedCard(null);
                    setTopUpAmount("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmTopUp}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Nạp tiền
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign User Modal */}
      {showAssignUserModal && selectedCard && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Gắn người dùng cho thẻ
              </h3>

              <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CreditCardIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-purple-800">
                      Thông tin thẻ
                    </h3>
                    <div className="mt-2 text-sm text-purple-700">
                      <p>
                        Số thẻ: **** **** ****{" "}
                        {selectedCard.cardNumber.slice(-4)}
                      </p>
                      <p>ID thẻ: {selectedCard.id}</p>
                      <p>Số dư: {formatCurrency(selectedCard.balance)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chọn người dùng *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">-- Chọn người dùng --</option>
                    {mockUsers
                      .filter((user) => user.kycStatus === "approved")
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName} {user.lastName} ({user.email})
                        </option>
                      ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Chỉ hiển thị người dùng đã hoàn thành KYC
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAssignUserModal(false);
                    setSelectedCard(null);
                    setSelectedUserId("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmAssignUser}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Gắn người dùng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lock Card Modal */}
      {showLockModal && selectedCard && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Khóa thẻ
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
                      <p>Bạn đang thực hiện khóa thẻ:</p>
                      <p className="font-semibold">
                        **** **** **** {selectedCard.cardNumber.slice(-4)} (ID:{" "}
                        {selectedCard.id})
                      </p>
                      <p>Chủ thẻ: {getUserName(selectedCard.userId)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do khóa thẻ *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do khóa thẻ (thẻ bị mất, hoạt động đáng ngờ, yêu cầu từ chủ thẻ, v.v.)"
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
                    setSelectedCard(null);
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
                  Khóa thẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unlock Card Modal */}
      {showUnlockModal && selectedCard && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Mở khóa thẻ
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
                      <p>Bạn đang thực hiện mở khóa thẻ:</p>
                      <p className="font-semibold">
                        **** **** **** {selectedCard.cardNumber.slice(-4)} (ID:{" "}
                        {selectedCard.id})
                      </p>
                      <p>Chủ thẻ: {getUserName(selectedCard.userId)}</p>
                      <p>
                        Trạng thái hiện tại:{" "}
                        {selectedCard.status === "locked"
                          ? "Bị khóa"
                          : selectedCard.status === "inactive"
                          ? "Chưa kích hoạt"
                          : "Không xác định"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lý do mở khóa thẻ *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập lý do mở khóa thẻ (đã tìm lại thẻ, hoàn thành xác minh, yêu cầu hợp lệ, v.v.)"
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
                    setSelectedCard(null);
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
                  Mở khóa thẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {showDetailModal && selectedCard && (
        <div className="fixed inset-0 filter backdrop-blur-xs bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Chi tiết thẻ vật lý
                </h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedCard(null);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Information */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">TravelPass</h4>
                      <CreditCardIcon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm opacity-80">Card Number</p>
                      <p className="text-xl font-mono tracking-wider">
                        {selectedCard.cardNumber.replace(/(.{4})/g, "$1 ")}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-xs opacity-80">Card Holder</p>
                        <p className="font-medium">
                          {getUserName(selectedCard.userId)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-80">Expires</p>
                        <p className="font-medium">
                          {formatDate(selectedCard.expiryDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Thông tin cơ bản
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID Thẻ:</span>
                        <span className="font-medium">{selectedCard.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trạng thái:</span>
                        <StatusBadge
                          status={selectedCard.status}
                          label={
                            selectedCard.status === "active"
                              ? "Hoạt động"
                              : selectedCard.status === "inactive"
                              ? "Chưa kích hoạt"
                              : selectedCard.status === "locked"
                              ? "Bị khóa"
                              : "Hết hạn"
                          }
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số dư hiện tại:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(selectedCard.balance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày phát hành:</span>
                        <span className="font-medium">
                          {formatDate(selectedCard.issuedDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày hết hạn:</span>
                        <span className="font-medium">
                          {formatDate(selectedCard.expiryDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sử dụng lần cuối:</span>
                        <span className="font-medium">
                          {selectedCard.lastUsed
                            ? formatDate(selectedCard.lastUsed)
                            : "Chưa sử dụng"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Information & Actions */}
                <div className="space-y-4">
                  {selectedCard.userId && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-3">
                        Thông tin chủ thẻ
                      </h5>
                      {(() => {
                        const user = mockUsers.find(
                          (u) => u.id === selectedCard.userId
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
                  )}

                  {!selectedCard.userId && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h5 className="font-medium text-yellow-900 mb-2">
                        Thẻ chưa được gắn
                      </h5>
                      <p className="text-sm text-yellow-700 mb-3">
                        Thẻ này chưa được gắn với người dùng nào. Bạn có thể gắn
                        thẻ cho người dùng đã hoàn thành KYC.
                      </p>
                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          handleAssignUser(selectedCard);
                        }}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                      >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Gắn người dùng
                      </button>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">
                      Thao tác nhanh
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          handleTopUp(selectedCard);
                        }}
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        Nạp tiền
                      </button>

                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          handleEditCard(selectedCard);
                        }}
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Chỉnh sửa
                      </button>

                      {selectedCard.status === "active" ? (
                        <button
                          onClick={() => {
                            setShowDetailModal(false);
                            handleLockCard(selectedCard);
                          }}
                          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          <LockClosedIcon className="h-4 w-4 mr-1" />
                          Khóa thẻ
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowDetailModal(false);
                            handleUnlockCard(selectedCard);
                          }}
                          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          <LockOpenIcon className="h-4 w-4 mr-1" />
                          Mở khóa
                        </button>
                      )}

                      <button
                        onClick={() =>
                          console.log("Print card:", selectedCard.id)
                        }
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        <PrinterIcon className="h-4 w-4 mr-1" />
                        In thẻ
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
                    setSelectedCard(null);
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
    </div>
  );
}
