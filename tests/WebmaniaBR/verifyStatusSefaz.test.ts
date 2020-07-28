import WebmaniaBR from '../../src';

test('call verifyStatusSefaz and check response', async () => {
  const wmbr = new WebmaniaBR(
    String(process.env.API_CONSUMER_KEY),
    String(process.env.API_CONSUMER_SECRET),
    String(process.env.API_ACCESS_TOKEN),
    String(process.env.API_ACCESS_TOKEN_SECRET)
  );
  const response = await wmbr.verifyStatusSefaz();
  console.log(response);
  expect(response).toBeTruthy();
}, 20000);
