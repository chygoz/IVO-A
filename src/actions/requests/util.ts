export const CLIENT_URL = `/api/v1/requests`;
export const SERVER_URL = `${process.env.SERVER_API_URL}/api/v1/requests`;
export type IRequestType = "booking" | "payment" | "fund";

export type IRequestStatus = "pending" | "completed" | "failed" | "rejected";

export interface IRequest {
  type: IRequestType;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  status: IRequestStatus;
  requestId: string;
  booking: BookingRequest;
}

export type NewRequest = {
  type: "booking" | "payment" | "fund";
  action: "new" | "update";
  booking?: BookingRequest;
};

type BookingRequest = {
  venueId: string;
  schedules: { pitchId: string; date: string; time: number }[];
};
