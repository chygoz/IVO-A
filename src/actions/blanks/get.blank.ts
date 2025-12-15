import { fetchAPI } from "../config";
import { BLANK_BASE_URL } from "./config";
import { BlankResponse } from "./types";

export const getBlank = async (slug: string): Promise<BlankResponse | null> => {
    const res = await fetchAPI({
        url: `${BLANK_BASE_URL}/slug/${slug}`,
    });
    if (res?.error) {
        return null
    }

    return res;
};
