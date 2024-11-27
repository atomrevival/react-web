import { FetchHelperResponse } from "./Fetch.types";

export class Fetch {
  static async handleResponse<T>(
    response: Response,
  ): Promise<FetchHelperResponse<T>> {
    try {
      if (!response.ok) {
        const message = `${response.status} ${response.statusText}: ${await response.text()}`;
        throw new Error(message);
      }

      const data = await response.json();

      return {
        data,
        ...response,
      } as const;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occured");
      }

      throw error;
    }
  }

  static async request<ResponseData>(url: string, options?: RequestInit) {
    return fetch(url, options).then((res) =>
      Fetch.handleResponse<ResponseData>(res),
    );
  }
}
