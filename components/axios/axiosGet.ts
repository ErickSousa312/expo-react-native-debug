import axios, { AxiosResponse } from 'axios';

export async function AxiosGet(
  rota: string,
  options?: { query?: string; mes?: string; ano?: string },
): Promise<AxiosResponse> {
  return new Promise(async (resolver, reject) => {
    try {
      const data: AxiosResponse<any> = await axios.get(
        `http://192.168.100.133:3000/api/v1/${rota}?nameTipo=${options?.query}&mes=${options?.mes}&ano=${options?.ano}`,
      );
      data;
      resolver(data);
    } catch (err) {
      reject({ error: err });
    }
  });
}
