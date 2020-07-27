class AxiosTestError extends Error {
  config: any;
  code: any;
  request: any;
  response: any;
  isAxiosError: boolean;
  constructor({
    message = 'Axios Test Error',
    config = '',
    code = '',
    request = '',
    response = ''
  }: {
    message?: any;
    config?: any;
    code?: any;
    request?: any;
    response?: any;
    isAxiosError?: boolean;
  }) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class WebmaniaBRFetchServerError extends Error {
  /**
   * Creates an instance of WebmaniaBRFetchServerError.
   *
   * @param status Status Code passed from the server
   */
  constructor(status: number) {
    super(`Server error status ${status} `);
    this.name = 'WebmaniaBRFetchServerError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class WebmaniaBRFetchClientError extends Error {
  /**
   * Creates an instance of WebmaniaBRFetchClientError.
   */
  constructor() {
    super('Client error');
    this.name = 'WebmaniaBRFetchClientError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class WebmaniaBRFetchOtherError extends Error {
  /**
   * Creates an instance of WebmaniaBRFetchOtherError.
   */
  constructor() {
    super('Other Error');
    this.name = 'WebmaniaBRFetchOtherError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export {
  AxiosTestError,
  WebmaniaBRFetchServerError,
  WebmaniaBRFetchClientError,
  WebmaniaBRFetchOtherError
};
