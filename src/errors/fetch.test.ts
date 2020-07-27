import {
  WebmaniaBRFetchOtherError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchServerError
} from '.';

describe('WebmaniaBRFetchErrors', () => {
  it('should throw Error of type WebmaniaBRFetchOtherError', () => {
    const t = () => {
      throw new WebmaniaBRFetchOtherError();
    };
    expect(t).toThrow(WebmaniaBRFetchOtherError);
  });

  it('should throw Error of type WebmaniaBRFetchClientError', () => {
    const t = () => {
      throw new WebmaniaBRFetchClientError();
    };
    expect(t).toThrow(WebmaniaBRFetchClientError);
  });

  it('should throw Error of type WebmaniaBRFetchServerError', () => {
    const t = () => {
      throw new WebmaniaBRFetchServerError(404);
    };
    expect(t).toThrow(WebmaniaBRFetchServerError);
  });
});
