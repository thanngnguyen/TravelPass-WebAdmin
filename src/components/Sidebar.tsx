"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  WalletIcon,
  ArrowsRightLeftIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  TagIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Quản lý người dùng",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    name: "Quản lý thẻ vật lý",
    href: "/dashboard/cards",
    icon: CreditCardIcon,
  },
  {
    name: "Quản lý ví điện tử",
    href: "/dashboard/wallets",
    icon: WalletIcon,
  },
  {
    name: "Quản lý giao dịch",
    href: "/dashboard/transactions",
    icon: ArrowsRightLeftIcon,
  },
  {
    name: "Quản lý nạp tiền",
    href: "/dashboard/topups",
    icon: ArrowUpIcon,
  },
  {
    name: "Quản lý tỷ giá",
    href: "/dashboard/exchange-rates",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Quản lý kiosk",
    href: "/dashboard/kiosks",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Quản lý merchant",
    href: "/dashboard/merchants",
    icon: TagIcon,
  },
  {
    name: "Quản lý admin",
    href: "/dashboard/admins",
    icon: UserGroupIcon,
  },
];

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAdminDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setAdminDropdownOpen(false);
    // Handle logout logic
  };

  const handleProfile = () => {
    console.log("Opening profile...");
    setAdminDropdownOpen(false);
    // Handle profile page
  };

  const handleSettings = () => {
    console.log("Opening settings...");
    setAdminDropdownOpen(false);
    // Handle settings page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg rounded-lg border border-green-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="../TravelPass.png"
              alt="Logo"
              className="h-[30px] w-[50px]"
            />

            <h1 className="text-xl font-bold text-orange-300">TravelPass</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                      isActive
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm rounded-lg border border-green-700">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile menu button - Left side */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Empty space for mobile, hidden title for desktop */}
            <div className="hidden lg:block">
              {/* This space can be used for page title or breadcrumbs if needed */}
            </div>

            {/* Admin info - Right side */}
            <div
              className="flex items-center space-x-4 ml-auto relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    Super Admin
                  </p>
                  <p className="text-xs text-gray-500">admin@travelpass.com</p>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SA</span>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {adminDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleProfile}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircleIcon className="h-4 w-4 mr-3" />
                      Thông tin cá nhân
                    </button>
                    <button
                      onClick={handleSettings}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-3" />
                      Cài đặt
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
