"use server";

export const fetchExternal = async (url: string): Promise<any> => {
    try {
        const response: Response = await fetch(url);
        return response.json();
    } catch (ex: any) {
        console.error(ex.message);
    }
};
