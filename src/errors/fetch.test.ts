import {
  WebmaniaBRFetchOtherError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchServerError
} from '.';

describe('WebmaniaBRFetchErrors', () => {
  it('should throw Error of type WebmaniaBRFetchOtherError', () => {
    const t = () => {
      throw new WebmaniaBRFetchOtherError('Erro', {});
    };
    expect(t).toThrow(WebmaniaBRFetchOtherError);
  });

  it('should throw Error of type WebmaniaBRFetchClientError', () => {
    const t = () => {
      throw new WebmaniaBRFetchClientError('Client error', {}, '400', {});
    };
    expect(t).toThrow(WebmaniaBRFetchClientError);
  });

  it('should throw Error of type WebmaniaBRFetchServerError', () => {
    const t = () => {
      throw new WebmaniaBRFetchServerError(
        'Client error',
        {},
        '400',
        {},
        {
          data: {},
          status: 500,
          statusText: 'Server Error',
          headers: {},
          config: {}
        }
      );
    };
    expect(t).toThrow(WebmaniaBRFetchServerError);
  });
});
