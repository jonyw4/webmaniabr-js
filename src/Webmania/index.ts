import axios, { Method, AxiosRequestConfig } from 'axios';
import {
  WebmaniaBRFetchOtherError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchServerError
} from '../errors';
import { ServerResponse } from '../types';

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

  public async fetch<T = any>(
    url: string,
    method: Method = 'GET',
    params: AxiosRequestConfig['params'] = {},
    data: AxiosRequestConfig['data'] = {}
  ) {
    try {
      const response = await axios.request<any, ServerResponse<T>>({
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
      });
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new WebmaniaBRFetchServerError(error.response.status);
      } else if (error.request) {
        throw new WebmaniaBRFetchClientError();
      } else {
        throw new WebmaniaBRFetchOtherError();
      }
    }
  }
}
