
'use server'

import { fetchAPI } from "../config";

export async function resetReseller(email: string) {
    const response = await fetchAPI({
        url: "/api/v1/resellers/reset",
        method: "POST",
        body: { email },
    });

    return response;
}
