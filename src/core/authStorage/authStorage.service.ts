import * as SecureStore from 'expo-secure-store';

export const ACCESS_TOKEN_KEY: string = 'access_token';
export const REFRESH_TOKEN_KEY: string = 'refresh_token';
export const EXPIRATION_DATE_KEY: string = 'expires_in';

export class AuthStorageService {

  public static setToken(key: string, token: string): Promise<void> {
    return SecureStore.setItemAsync(key, token);
  }

  public static getToken(key: string): Promise<string> {
    return SecureStore.getItemAsync(key);
  }

  public static setExpirationDate(date: number): Promise<void> {
    return SecureStore.setItemAsync(EXPIRATION_DATE_KEY, JSON.stringify(date));
  }

  public static getExpirationDate(): Promise<number> {
    return SecureStore.getItemAsync(EXPIRATION_DATE_KEY)
      .then((date: string) => Number(date));
  }
}
