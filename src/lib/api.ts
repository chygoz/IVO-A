// lib/api.ts

import { TimeRange, DashboardData } from "@/components/dashboard/types";

// This function simulates fetching data from an API
export async function fetchDashboardData(
  timeRange: TimeRange
): Promise<DashboardData> {
  // For now, we'll simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data that changes slightly based on the time range
  const multiplier =
    timeRange === "all"
      ? 1
      : timeRange === "12m"
      ? 0.95
      : timeRange === "30d"
      ? 0.7
      : timeRange === "7d"
      ? 0.5
      : 0.25; // 24h

  return {
    summaryCards: {
      totalSales: {
        title: "Total Sales",
        value: `₦ ${Math.round(64.3 * multiplier * 1000) / 1000}K`,
        increment: 1200,
        icon: "shopping-bag",
      },
      totalOrders: {
        title: "Total Order",
        value: `${Math.round(20.3 * multiplier * 10) / 10}K`,
        increment: 1200,
        icon: "package",
      },
      totalCustomers: {
        title: "Total Customer",
        value: `${Math.round(2.3 * multiplier * 10) / 10}K`,
        increment: 1200,
        icon: "users",
      },
      totalResellers: {
        title: "Total Reseller",
        value: `${Math.round(2.3 * multiplier * 10) / 10}K`,
        increment: 1200,
        icon: "user-plus",
      },
    },
    salesData: [
      {
        month: "Jan",
        sales: Math.round(70 * multiplier),
        reseller: Math.round(20 * multiplier),
      },
      {
        month: "Feb",
        sales: Math.round(75 * multiplier),
        reseller: Math.round(25 * multiplier),
      },
      {
        month: "Mar",
        sales: Math.round(35 * multiplier),
        reseller: Math.round(20 * multiplier),
      },
      {
        month: "Apr",
        sales: Math.round(55 * multiplier),
        reseller: Math.round(40 * multiplier),
      },
      {
        month: "May",
        sales: Math.round(40 * multiplier),
        reseller: Math.round(15 * multiplier),
      },
      {
        month: "Jun",
        sales: Math.round(30 * multiplier),
        reseller: Math.round(10 * multiplier),
      },
      {
        month: "Jul",
        sales: Math.round(25 * multiplier),
        reseller: Math.round(5 * multiplier),
      },
      {
        month: "Aug",
        sales: Math.round(50 * multiplier),
        reseller: Math.round(15 * multiplier),
      },
      {
        month: "Sep",
        sales: Math.round(80 * multiplier),
        reseller: Math.round(30 * multiplier),
      },
      {
        month: "Oct",
        sales: Math.round(50 * multiplier),
        reseller: Math.round(10 * multiplier),
      },
      {
        month: "Nov",
        sales: Math.round(40 * multiplier),
        reseller: Math.round(5 * multiplier),
      },
      {
        month: "Dec",
        sales: Math.round(45 * multiplier),
        reseller: Math.round(10 * multiplier),
      },
    ],
    categories: [
      { name: "Dresses", percentage: 45 },
      { name: "Pants", percentage: 20 },
      { name: "Blouses & Tops", percentage: 15 },
      { name: "Shirts", percentage: 13 },
      { name: "Co-ord sets", percentage: 7 },
    ],
    recentOrders: [
      {
        id: "NG93726281424",
        productName: "Lorem ipsum dolor",
        productCount: 2,
        date: "Sept 24, 2024",
        customer: {
          name: "Brooklyn Simmons",
          email: "brooklynsimmons@gmail.com",
        },
        total: 400000,
        status: "processing",
      },
      {
        id: "NG93726281425",
        productName: "Lorem ipsum dolor",
        productCount: 2,
        date: "Sept 24, 2024",
        customer: {
          name: "Brooklyn Simmons",
          email: "brooklynsimmons@gmail.com",
        },
        total: 400000,
        status: "delivered",
      },
      {
        id: "NG93726281426",
        productName: "Lorem ipsum dolor",
        productCount: 2,
        date: "Sept 24, 2024",
        customer: {
          name: "Brooklyn Simmons",
          email: "brooklynsimmons@gmail.com",
        },
        total: 400000,
        status: "cancelled",
      },
      {
        id: "NG93726281427",
        productName: "Lorem ipsum dolor",
        productCount: 2,
        date: "Sept 24, 2024",
        customer: {
          name: "Brooklyn Simmons",
          email: "brooklynsimmons@gmail.com",
        },
        total: 400000,
        status: "shipped",
      },
      {
        id: "NG93726281428",
        productName: "Lorem ipsum dolor",
        productCount: 2,
        date: "Sept 24, 2024",
        customer: {
          name: "Brooklyn Simmons",
          email: "brooklynsimmons@gmail.com",
        },
        total: 400000,
        status: "shipped",
      },
    ],
    orderStatus: {
      processing: 120,
      delivered: 320,
      cancelled: 87,
      shipped: 150,
    },
  };
}
