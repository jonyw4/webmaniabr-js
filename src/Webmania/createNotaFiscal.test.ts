import axios from 'axios';
import WebmaniaBR from './index';

jest.mock('axios');
// @ts-ignore
axios.request.mockResolvedValue();

describe('WebmaniaBR.verifyExpirationCertificado()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call verifyExpirationCertificado with success', async () => {
    axios.request
      // @ts-ignore
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            uuid: '111',
            status: 'contingencia',
            nfe: '111',
            serie: '111',
            recibo: '111',
            chave: '111',
            xml: '111',
            danfe: '111',
            log: '111'
          }
        })
      );

    const wmbr = new WebmaniaBR('ck', 'cs', 'at', 'ats');
    const response = await wmbr.createNotaFiscal({
      modelo: '2',
      operacao: 1,
      natureza_operacao: 'Teste',
      finalidade: 1,
      ambiente: 2,
      produtos: [],
      pedido: {
        presenca: 2,
        modalidade_frete: 3,
        desconto: '0.00',
        pagamento: 0,
        forma_pagamento: '99',
        valor_pagamento: '0.00',
        cnpj_credenciadora: '11.111.11111/1111-11',
        bandeira: '01',
        autorizacao: 'yeah'
      },
      cliente: {}
    });
    expect(response).toEqual({
      uuid: '111',
      status: 'contingencia',
      nfe: '111',
      serie: '111',
      recibo: '111',
      chave: '111',
      xml: '111',
      danfe: '111',
      log: '111'
    });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      baseURL: 'https://webmaniabr.com/api/1',
      url: '/nfe/emissao',
      method: 'POST',
      data: {
        modelo: '2',
        operacao: 1,
        natureza_operacao: 'Teste',
        finalidade: 1,
        ambiente: 2,
        produtos: [],
        pedido: {
          presenca: 2,
          modalidade_frete: 3,
          desconto: '0.00',
          pagamento: 0,
          forma_pagamento: '99',
          valor_pagamento: '0.00',
          cnpj_credenciadora: '11.111.11111/1111-11',
          bandeira: '01',
          autorizacao: 'yeah'
        },
        cliente: {}
      },
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
