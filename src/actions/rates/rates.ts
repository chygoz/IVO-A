"use server";
import { fetchAPI } from "../config";

export interface Rates {
    minimum: number;
    maximum: number;
    success?: boolean;
    message?: string;
}

const SERVER_URL = process.env.SERVER_API_URL;

export const GetRates = async (): Promise<Rates> => {
    const res = await fetchAPI({ url: `/api/v1/blanks/rates` });
    if (res.error) {
        return {
            success: false,
            message: res.details || "Failed to get rates",
            minimum: 0,
            maximum: 0
        }
    }
    return { ...res.data, success: true };
}

export const updateRates = async ({ minimum, maximum }: Rates): Promise<Rates> => {
    const res = await fetchAPI({
        url: `/api/v1/blanks/rates`,
        method: "PUT",
        body: { minimum, maximum }
    });
    if (res.error) {
        return {
            success: false,
            message: res.details || "Failed to update rates",
            minimum: 0,
            maximum: 0
        }
    }
    return { ...res.data, success: true, message: "Rates updated successfully" };
}
