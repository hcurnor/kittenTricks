import { API_BASE_URL } from 'react-native-dotenv';
import { AuthStorageService } from '../authStorage/authStorage.service';
import { errorComparator } from 'tslint/lib/verify/lintError';
import { string } from 'prop-types';

const authHeader: string = 'Authorization';

const contentJson: { [key: string]: any } = {
  'Content-Type': 'application/json',
};

export enum API_VERBS {
  GET = 'GET',
  POST = 'POST',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class ApiService {

  public static fetchApi(endpoint: string,
                         payload: any = null,
                         method: API_VERBS = API_VERBS.GET,
                         headers: any = {},
                         needAuth: boolean = true): Promise<any> {

    const requestHeaders: any = {
      ...contentJson,
      ...headers,
    };
    let promise: Promise<any>;

    if (needAuth) {
      promise = AuthStorageService.getToken()
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
        const requestConfig = this.getRequestConfig(method, processedHeaders, payload);
        return fetch(`${API_BASE_URL}${endpoint}`, requestConfig)
          .then(this.onApiResponseSuccess)
          .catch(this.onApiResponseError);
      });
  }

  private static onApiResponseSuccess = (response: Response): Promise<any> => {
    if (response.status === 200) {
      return response.json();
    } else {
      return new Promise<string>((resolve: () => void, reject: () => void) => {
        reject();
      });
    }
  };

  private static onApiResponseError = (error: Error): Error => {
    return error;
  };

  private static getRequestConfig(method: API_VERBS,
                                  headers: any,
                                  payload: any): any {

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
