import {
  DashboardIcon,
  StaffIcon,
  ResellerIcon,
  CustomerIcon,
  ProductIcon,
  OrderIcon,
  AnalyticIcon,
  WalletIcon,
} from "@/components/icons";

export const navigation = [
  {
    name: "",
    children: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon,
        actors: ["all"]
      },
      {
        name: "Customer mgt.",
        href: "/dashboard/management/customers",
        icon: CustomerIcon,
        actors: ["admin", "owner"],
      },
      {
        name: "Reseller mgt.",
        href: "/dashboard/management/resellers",
        icon: ResellerIcon,
        actors: ["admin", "owner"],
      },
      {
        name: "Staff mgt.",
        href: "/dashboard/management/staff",
        icon: StaffIcon,
        actors: ["admin", "owner"],
      },
    ],
    // Administration Management
  },
  {
    name: "IVÓ Overview",
    children: [
      {
        name: "Product Mgt.",
        href: "/dashboard/products",
        icon: ProductIcon,
        actors: ["product", "admin", "owner"],
      },
      {
        name: "Order Mgt.",
        href: "/dashboard/orders",
        icon: OrderIcon,
        actors: ["order", "admin", "owner"],
      },
      {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: AnalyticIcon,
        actors: ["product", "order", "admin", "owner"],
      },
    ],
    // Product + Order Management
  },
  {
    name: "Reseller Overview",
    children: [
      {
        name: "Requests",
        href: "/dashboard/resellers/requests",
        icon: DashboardIcon,
        actors: ["product", "admin", "owner"],
      },
      {
        name: "Blanks Mgt.",
        href: "/dashboard/resellers/blanks",
        icon: DashboardIcon,
        actors: ["product", "admin", "owner"],
      },
      {
        name: "MarkUp Rates",
        href: "/dashboard/resellers/rates",
        icon: DashboardIcon,
        actors: ["product", "admin", "owner"],
      },
      {
        name: "Store Directory",
        href: "/dashboard/resellers/store-directory",
        icon: DashboardIcon,
        actors: ["product", "admin", "owner"],
      },
      {
        name: "Reset Account",
        href: "/dashboard/resellers/reset",
        icon: DashboardIcon,
        actors: ["admin", "owner"],
      },
    ],
    // Product Management for Reseller data
  },
  {
    name: "Accounts",
    children: [
      {
        name: "Wallets",
        href: "/dashboard/accounts/wallet",
        icon: WalletIcon,
        actors: ["financial", "admin", "owner"],
      },
      {
        name: "Transactions",
        href: "/dashboard/transactions",
        icon: DashboardIcon,
        actors: ["financial", "admin", "owner"],
      },
    ],
    // Financial Management
  },
];
