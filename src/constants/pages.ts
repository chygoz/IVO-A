export const PRODUCT_ROUTE = "/dashboard/products";
export const actions = [
  {
    name: "Product Management",
    title: "Product",
    slug: "product",
    creation: {
      title: "Add Product",
      href: "/dashboard/products/new",
      success: "Successfully created product",
    },
    baseUrl: "/dashboard/products",
    empty: "No Products yet.",
  },
  {
    name: "Blank Management",
    title: "Blank",
    slug: "blank",
    creation: {
      title: "Add Blank",
      href: "/dashboard/resellers/blanks/new",
      success: "Successfully created blank",
    },
    baseUrl: "/dashboard/resellers/blanks",
    empty: "No Blanks yet.",
  },
];
