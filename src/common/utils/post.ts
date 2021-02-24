import axios from 'axios';

export default async function (url: string, data: unknown): Promise<unknown> {
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
