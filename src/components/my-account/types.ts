// types/account-settings.ts
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  avatarUrl?: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  enabled: boolean;
}

export interface AccountDeleteRequest {
  confirm: boolean;
}
