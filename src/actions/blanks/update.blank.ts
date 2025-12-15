import { fetchAPI } from "../config";
import { BLANK_BASE_URL } from "./config";
import { IBlank } from "./types";

export const updateBlank = async (id: string, data: Partial<IBlank>): Promise<{ data: IBlank }> => {
    const res = await fetchAPI({
        url: `${BLANK_BASE_URL}/${id}`,
        method: "PUT",
        body: data,
    });

    if (res?.error) {
        throw new Error(res.details);
    }

    return res;
};