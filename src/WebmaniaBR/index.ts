import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import {
  WebmaniaBRFetchOtherError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchServerError
} from '../errors';
import { Response, Request } from '../types';

export default class WebmaniaBR {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  timeout: number;

  constructor(
    consumerKey: string,
    consumerSecret: string,
    accessToken: string,
    accessTokenSecret: string,
    timeout = 10000
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.timeout = timeout;
  }

  /**
   * 📨 Fetch in the WebmaniaBR API
   */
  public async fetch<T = any>(
    url: string,
    method: Method = 'GET',
    params: AxiosRequestConfig['params'] = {},
    data: AxiosRequestConfig['data'] = {}
  ): Promise<T> {
    return axios
      .request<any, Response.Server<T>>({
        baseURL: 'https://webmaniabr.com/api/1/nfe/',
        method,
        url,
        timeout: this.timeout,
        headers: {
          'X-Consumer-Key': this.consumerKey,
          'X-Consumer-Secret': this.consumerSecret,
          'X-Access-Token': this.accessToken,
          'X-Access-Token-Secret': this.accessTokenSecret,
          'Content-Type': 'application/json'
        },
        params,
        data
      })
      .then((response) => response.data)
      .catch((error: AxiosError<Response.ServerError>) => {
        if (error.response) {
          throw new WebmaniaBRFetchServerError(
            error.message,
            error.config,
            error.code,
            error.request,
            error.response
          );
        } else if (error.request) {
          throw new WebmaniaBRFetchClientError(
            error.message,
            error.config,
            error.code,
            error.request
          );
        } else {
          throw new WebmaniaBRFetchOtherError(error.message, error.config);
        }
      });
  }

  /** Para verificar se o Sefaz está Online ou Offline */
  public verifyStatusSefaz() {
    return this.fetch<Response.VerifyStatusSefaz>('/sefaz', 'GET', {}, {});
  }

  /** Para verificar os dias que falta para expirar o Certificado A1 */
  public verifyExpirationCertificado() {
    return this.fetch<Response.VerifyExpirationCertificadoA1>(
      '/certificado',
      'GET',
      {},
      {}
    );
  }
  /** Cria uma nota fiscal */
  public createNotaFiscal(data: Request.CreateNotaFiscal) {
    return this.fetch<Response.CreateNotaFiscal>('/emissao', 'POST', {}, data);
  }
}
