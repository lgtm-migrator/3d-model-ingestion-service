import axios from 'axios';

export class Utils {
  public static async post<T>(url: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
      }).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
