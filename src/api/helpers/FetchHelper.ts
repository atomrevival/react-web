import { Fetch } from "./Fetch";

export class FetchHelper extends Fetch {
  static get<ResponseData>(url: string, options?: RequestInit) {
    return FetchHelper.request<ResponseData>(url, options);
  }

  static post<ResponseData = Record<any, any>, Request = ResponseData>(
    url: string,
    body: Request,
    options?: RequestInit,
  ) {
    return FetchHelper.request<ResponseData>(url, {
      ...options,
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  static put<ResponseData = Record<any, any>, Request = ResponseData>(
    url: string,
    body: Request,
    options?: RequestInit,
  ) {
    return FetchHelper.request<ResponseData>(url, {
      ...options,
      body: JSON.stringify(body),
      method: "PUT",
    });
  }

  static patch<ResponseData = Record<any, any>, Request = ResponseData>(
    url: string,
    body: Request,
    options?: RequestInit,
  ) {
    return FetchHelper.request<ResponseData>(url, {
      ...options,
      body: JSON.stringify(body),
      method: "PATCH",
    });
  }

  static delete<ResponseData>(url: string, options?: RequestInit) {
    return FetchHelper.request<ResponseData>(url, {
      ...options,
      method: "DELETE",
    });
  }
}
