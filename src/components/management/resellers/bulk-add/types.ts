export interface Reseller {
  email: string;
  dob: string;
  firstName: string;
  lastName: string;
  mode: "onboard";
  gender: string;
  phone: string;
  address: string;
  businessName: string;
  cohort: string;
}

export interface ProcessedReseller {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  phoneNumber: string;
  homeAddress: string;
  businessName: string;
}

export interface InvalidRow {
  rowNumber: number;
  reason: string;
  rowData: Record<string, any>;
}

export interface UploadStatus {
  type: "default" | "error" | "destructive" | "success";
  message: string;
}

export interface UploadStats {
  total: number;
  successful: number;
  failed: number;
  errors?: Error[];
}

export interface Error {
  email: string;
  error: string;
}
