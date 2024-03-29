import WebmaniaBR from '../../src';

const TIMEOUT = 10000;
test(
  'call verifyStatusSefaz and check response',
  async () => {
    const wmbr = new WebmaniaBR(
      String(process.env.API_CONSUMER_KEY),
      String(process.env.API_CONSUMER_SECRET),
      String(process.env.API_ACCESS_TOKEN),
      String(process.env.API_ACCESS_TOKEN_SECRET),
      TIMEOUT
    );
    const response = await wmbr.verifyStatusSefaz();
    console.log(response);
    expect(response).toBeTruthy();
  },
  TIMEOUT
);
