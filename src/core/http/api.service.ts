import { API_BASE_URL } from 'react-native-dotenv';
import {
  AuthStorageService,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '../authStorage/authStorage.service';

const refreshTokenEndpoint: string = '/auth/refresh-token';

const authHeader: string = 'Authorization';

const contentJson: { [key: string]: any } = {
  'Content-Type': 'application/json',
};

export interface SecurityApiResponse {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;

  [key: string]: any;
}

export interface RequestConfigType {
  method: API_VERBS;
  headers: { [key: string]: any };
  body?: string;
}

export enum API_VERBS {
  GET = 'GET',
  POST = 'POST',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class ApiService {

  public static fetchApi(endpoint: string,
                         payload: { [key: string]: any } = null,
                         method: API_VERBS = API_VERBS.GET,
                         headers: { [key: string]: any } = {},
                         needAuth: boolean = true): Promise<any> {

    const requestHeaders: { [key: string]: any } = {
      ...contentJson,
      ...headers,
    };
    let promise: Promise<any>;

    if (needAuth) {
      promise = AuthStorageService.getToken(ACCESS_TOKEN_KEY)
        .then((token: string) => {
          return {
            ...requestHeaders,
            [authHeader]: `Bearer ${token}`,
          };
        });
    } else {
      promise = Promise.resolve(requestHeaders);
    }

    return promise
      .then((processedHeaders: any) => {
        const requestConfig: RequestConfigType = this.getRequestConfig(method, processedHeaders, payload);
        return fetch(`${API_BASE_URL}${endpoint}`, requestConfig)
          .then((response: Response) => this.onApiResponseSuccess(response, requestConfig))
          .catch(this.onApiResponseError);
      });
  }

  private static onApiResponseSuccess = (response: Response,
                                         requestConfig: RequestConfigType): Promise<any> => {

    if (response.status === 200) {
      return response.json();
    } else if (response.status === 403) {
      return ApiService.handleTokenExpiration()
        .then(ApiService.resetAuthData)
        .then(() => ApiService.retryRequest(response, requestConfig));
    } else {
      return new Promise<string>((resolve: () => void, reject: () => void) => {
        reject();
      });
    }
  };

  private static retryRequest = (responce: Response,
                                 requestConfig: RequestConfigType): Promise<any> => {

    const url: string = responce.url.replace(API_BASE_URL, '');
    const payload: any = requestConfig.body ? JSON.parse(requestConfig.body) : {};
    return ApiService.fetchApi(
      url,
      payload,
      requestConfig.method,
      {},
    );
  };

  private static resetAuthData = (data: { token: SecurityApiResponse }): Promise<[void, void, void]> => {
    return Promise.all([
      AuthStorageService.setToken(ACCESS_TOKEN_KEY, data.token.access_token),
      AuthStorageService.setToken(REFRESH_TOKEN_KEY, data.token.refresh_token),
      AuthStorageService.setExpirationDate(data.token.expires_in),
    ]);
  };

  private static handleTokenExpiration(): Promise<{ token: SecurityApiResponse }> {
    return Promise.all([
      AuthStorageService.getToken(ACCESS_TOKEN_KEY),
      AuthStorageService.getToken(REFRESH_TOKEN_KEY),
      AuthStorageService.getExpirationDate(),
    ])
      .then(([accessToken, refreshToken, expireDate]: [string, string, number]) => ({
        token: {
          access_token: accessToken,
          expires_in: expireDate,
          refresh_token: refreshToken,
        },
      }))
      .then((data: { token: SecurityApiResponse }) => {
        return ApiService.fetchApi(
          refreshTokenEndpoint,
          data,
          API_VERBS.POST,
          {},
          true,
        );
      });
  }

  private static onApiResponseError = (error: Error): Error => {
    return error;
  };

  private static getRequestConfig(method: API_VERBS,
                                  headers: { [key: string]: any },
                                  payload: { [key: string]: any }): RequestConfigType {

    return method === API_VERBS.GET ? {
      method,
      headers: headers,
    } : {
      method,
      headers: headers,
      body: JSON.stringify(payload),
    };
  }
}
