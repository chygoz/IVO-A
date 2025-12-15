import { User } from "../users/types";

export interface StoreFront {
  _id: string;
  name: string;
  logo: "";
  businessType: "reseller-internal";
  businessKey: string;
  cohort?: number;
  owner: User;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  storefront: {
    _id: string;
    businessId: string;
    domain: {
      sslCertificate: {
        status: "pending" | "";
      };
      subdomain: string;
      isCustomDomainVerified: boolean;
      _id: string;
    };
    theme: {
      primaryColor: string;
      secondaryColor: string;
      _id: string;
    };
    seo: {
      title: string;
      description: string;
      keywords: [];
      _id: string;
    };
    settings: {
      isEnabled: boolean;
      showPrices: boolean;
      allowGuestCheckout: boolean;
      requireLogin: boolean;
      showStock: boolean;
      currency: "USD" | "NGN";
      language: "en";
      timezone: "UTC";
      _id: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ResellersResponse {
  data: {
    results: StoreFront[];
    metadata: {
      total: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}
