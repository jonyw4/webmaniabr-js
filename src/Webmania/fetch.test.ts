import axios from 'axios';
import WebmaniaBR from './index';
import {
  AxiosTestError,
  WebmaniaBRFetchServerError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchOtherError
} from '../errors';

jest.mock('axios');
// @ts-ignore
axios.request.mockResolvedValue();

describe('WebmaniaBR.fetch()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch a GET request successfully from ME API', async () => {
    // @ts-ignore
    axios.request.mockImplementationOnce(() =>
      Promise.resolve({
        data: { access_token: 'token123' }
      })
    );

    const wmbr = new WebmaniaBR('ck', 'cs', 'at', 'ats', 10000);
    const response = await wmbr.fetch('/test', 'GET', {}, {});

    expect(response).toEqual({ access_token: 'token123' });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://sandbox.melhorenvio.com.br',
      url: '/test',
      method: 'GET',
      data: {},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      params: {},
      timeout: 5000
    });
  });

  it('should fetch an WebmaniaBROtherError from ME API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(new AxiosTestError({}));
    const wmbr = new WebmaniaBR('ck', 'cs', 'at', 'ats', 10000);
    const fetch = wmbr.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(WebmaniaBRFetchOtherError);
  });

  it('should fetch an WebmaniaBRFetchClientError from ME API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(new AxiosTestError({ request: {} }));
    const wmbr = new WebmaniaBR('ck', 'cs', 'at', 'ats', 10000);
    const fetch = wmbr.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(WebmaniaBRFetchClientError);
  });

  it('should fetch an WebmaniaBRFetchServerError from ME API', async () => {
    // @ts-ignore
    axios.request.mockRejectedValue(
      new AxiosTestError({ response: { status: '404' } })
    );
    const wmbr = new WebmaniaBR('ck', 'cs', 'at', 'ats', 10000);
    const fetch = wmbr.fetch('/test', 'GET');
    await expect(fetch).rejects.toThrow(WebmaniaBRFetchServerError);
  });
});
