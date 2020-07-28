import WebmaniaBR from '../../src';

const TIMEOUT = 10000;
test(
  'call createNotaFiscal and check response',
  async () => {
    const wmbr = new WebmaniaBR(
      String(process.env.API_CONSUMER_KEY),
      String(process.env.API_CONSUMER_SECRET),
      String(process.env.API_ACCESS_TOKEN),
      String(process.env.API_ACCESS_TOKEN_SECRET),
      TIMEOUT
    );
    const response = await wmbr.createNotaFiscal({
      modelo: '2',
      operacao: 1,
      natureza_operacao: 'Teste',
      finalidade: 1,
      ambiente: 2,
      produtos: [
        {
          nome: 'Produto Teste',
          origem: 0,
          ncm: '5001.00.00',
          quantidade: 1,
          unidade: 'un',
          subtotal: '10.00',
          total: '20.00'
        }
      ],
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
    console.log(response);
    expect(response).toBeTruthy();
  },
  TIMEOUT
);
