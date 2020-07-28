import axios from 'axios';
import WebmaniaBR from './index';

jest.mock('axios');
// @ts-ignore
axios.request.mockResolvedValue();

describe('WebmaniaBR.verifyStatusSefaz()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call verifyStatusSefaz with success', async () => {
    axios.request
      // @ts-ignore
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            status: 'online'
          }
        })
      );

    const wmbr = new WebmaniaBR('ck', 'cs', 'at', 'ats');
    const response = await wmbr.verifyStatusSefaz();
    expect(response).toEqual({ status: 'online' });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://webmaniabr.com/api/1/nfe/',
      url: '/sefaz',
      method: 'GET',
      data: {},
      headers: {
        'X-Access-Token': 'at',
        'X-Access-Token-Secret': 'ats',
        'X-Consumer-Key': 'ck',
        'X-Consumer-Secret': 'cs',
        'Content-Type': 'application/json'
      },
      params: {},
      timeout: 10000
    });
  });
});
