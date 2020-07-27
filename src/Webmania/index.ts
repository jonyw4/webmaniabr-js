import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import {
  WebmaniaBRFetchOtherError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchServerError
} from '../errors';
import { ServerResponse, ServerErrorResponse } from '../types';

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
      .request<any, ServerResponse<T>>({
        baseURL: 'https://webmaniabr.com/api/1',
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
      .catch((error: AxiosError<ServerErrorResponse>) => {
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
}
