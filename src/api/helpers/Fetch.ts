export class Fetch {
  static async handleResponse(response: Response) {
    try {
      if (!response.ok) {
        const message = `${response.status} ${response.statusText}: ${await response.text()}`;
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occured');
      }

      throw error;
    }
  }

  static async request<ResponseData>(url: string, options?: RequestInit) {
    return fetch(url, options).then(Fetch.handleResponse) as ResponseData;
  }
}
