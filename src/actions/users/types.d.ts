export interface User {
  _id: string;
  firstName: string;
  middleName: string;
  emailVerified: boolean;
  lastName: string;
  username: string;
  gender: string;
  business: {
    _id: string;
    name: string;
    cohort?: number;
  };
  status: "active" | "inactive";
  mode: "onboard" | "signup";
  email: string;
  phone: string;
  dob: string;
  userType: "reseller" | "staff" | "customer";
  avatar: string;
  createdAt: Date;
}

export interface ResellersResponse {
  data: {
    results: User[];
    metadata: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface CreateResellerDTO {
  email: string;
  dob: string; //"12/2000";
  firstName: string;
  lastName: string;
  mode?: "onboard";
  gender: "male" | "female";
  phone: string;
  address: string;
  businessName: string;
  cohort: number;
}
export interface CreateStaffDTO {
  email: string;
  role: string;
  password: string;
  requirePasswordChange: "yes" | "no";
  firstName: string;
  lastName: string;
  phone: string;
}
