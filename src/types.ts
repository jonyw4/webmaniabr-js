type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export namespace Response {
  export interface Server<T> {
    data: T;
  }
  export type ServerError = {
    error: string;
  };
  export interface VerifyStatusSefaz {
    status: 'online' | 'offline';
  }

  export interface VerifyExpirationCertificadoA1 {
    expiration: number;
  }
  export interface CreateNotaFiscal {
    /**  Número único de identificação */
    uuid: string;
    status:
      | 'aprovado'
      | 'reprovado'
      | 'cancelado'
      | 'processamento'
      | 'contingencia';
    /** Número da NF-e */
    nfe: string;
    /** Número de série */
    serie: string;
    /** Número do recibo */
    recibo: string;
    /**  Número da chave de acesso */
    chave: string;
    xml: string;
    danfe: string;
    /** Log de retorno do SEFAZ */
    log: string;
  }
}

export namespace Request {
  type DadosEnderecoBase = {
    endereco: string;
    complemento?: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    /** CEP do endereço do cliente no formato `00000-000` */
    cep: string;
    telefone?: string;
    email?: string;
  };
  type DadosEnderecoPessoaFisica = DadosEnderecoBase & {
    /** Número do CPF no formato: `000.000.000-00` */
    cpf: string;
    nome_completo: string;
  };
  type DadosEnderecoPessoaJuridica = DadosEnderecoBase & {
    /** Número do CNPJ no formato: `00.000.000/0000-00` */
    cnpj: string;
    razao_social: string;
  };
  type DadosEndereco = DadosEnderecoPessoaFisica | DadosEnderecoPessoaJuridica;
  type DadosEnderecoComPais = DadosEndereco & {
    /** País de retirada dos produtos. Informar "EXTERIOR" para Exterior. */
    pais?: string;
  };
  interface CreateNotaFiscalClienteEstrangeiro {
    /** Identificação do destinatário no caso de comprador estrangeiro. Número do passaporte ou outro documento legal para identificar pessoa estrangeira. */
    id_estrangeiro?: string;
    nome_estrangeiro: string;
    /** Código do País (padrão BACEN) Ex: Estados Unidos = 2496 Visualizar tabela do BACEN */
    cod_pais: string;
    nome_pais: string;
    endereco: string;
    bairro: string;
    numero?: string;
    complemento?: string;
  }
  type CreateNotaFiscalClienteBase = DadosEnderecoBase & {
    /** Número da Inscrição Estadual. **Obrigatório caso possua Inscrição Estadual.** */
    ie: string;
    /** Inscrição Estadual do Substituto Tributário da UF de destino da mercadoria, quando houver retenção do ICMS-ST para a UF de destino. */
    substituto_tributario: string;
    /**
     * Indicador de operação com Consumidor final. Definido automaticamente pelo emissor WebmaniaBR®, podendo ser alterado manualmente conforme preferência.
     *
     * 0 - Normal
     *
     * 1 - Consumidor final
     */
    consumidor_final: 0 | 1;
    /** Indicador de contribuinte do ICMS. Definido automaticamente pelo emissor WebmaniaBR®, podendo ser alterado manualmente conforme preferência.
     *
     * 1 - Contribuinte ICMS
     *
     * 2 - Contribuinte isento de Inscrição no cadastro de Contribuintes do ICMS
     *
     * 9 - Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do
     *
     */
    contribuinte: 1 | 2 | 9;
  };
  type CreateNotaFiscalClientePessoaFisica = CreateNotaFiscalClienteBase &
    DadosEnderecoPessoaFisica;
  type CreateNotaFiscalClientePessoaJuridica = CreateNotaFiscalClienteBase &
    DadosEnderecoPessoaJuridica & {
      /** Inscrição SUFRAMA */
      suframa: string;
    };
  interface CreateNotaFiscalProdutoBase {
    /** Número do pedido de compra por produto OBS.: Tag xPed do XML */
    ID?: number;
    /** Número do item no pedido de compra
     * Informação de interesse do emissor para controle do B2B. */
    item?: number;
    /**
     * Origem do produto
     *
     * 0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8
     *
     * 1 - Estrangeira - Importação direta, exceto a indicada no código 6
     *
     * 2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7
     *
     * 3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%
     *
     * 4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes
     *
     * 5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%
     *
     * 6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural
     *
     * 7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural
     *
     * 8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%
     */
    origem: number;
    nome: string;
    /** Código do produto OBS.: Tag cProd do XML */
    codigo?: string;
    ncm: string;
    quantidade: number;
    /** Unidade de medida da quantidade de itens
     *
     * Exemplo:
     * UN - Unidade
     * KG - Kilograma */
    unidade: string;
    /**  Peso do produto Peso em quilograma (KG) Ex: 0.800 = 800 gramas*/
    peso?: string;
    /** Valor do desconto individual do produto.
     *
     * Exemplo: 0.00
     *
     * Por padrão o desconto deve ser informado na array pedido, porém havendo necessidade pode ser aplicado o desconto individual em cada produto.
     * */
    desconto?: string;
    /** Preço unitário do produto.
     *
     * 0.00 (valor integral sem descontos) */
    subtotal: string;
    /** Preço total (quantidade x preço unitário).
     *
     * 0.00 (valor integral sem descontos)
     */
    total: string;
    /** Definição automática de impostos, informe a referência da classe de imposto cadastrado no painel WebmaniaBR®: `REF0000` */
    classe_imposto?: string;
    /** Definição de impostos na API, para operações específicas como ICMS-ST ou que demande maior flexibilidade */
    impostos?: Array<any>;
    /**
     * Informações adicionais do produto.
     *
     * Utilizado principalmente para detalhamento dos serviços prestados, como informações sobre o ingresso vendido (local, data, nome do evento, etc).
     * */
    informacoes_adicionais?: string;
    /**
     * Código de benefício fiscal na UF
     *
     * Deve ser utilizado o mesmo código adotado na EFD e outras declarações, nas UF que exigem. */
    beneficio_fiscal?: string;
    /**
     * Indicador de escala relevante
     *
     * S - Produzido em Escala Relevante
     * N - Produzido em Escala NÃO Relevante
     * OBS.: Preenchimento obrigatório para produtos com NCM relacionado no Anexo XXVII do Convênio 52/2017
     * */
    ind_escala?: 'S' | 'N';
    /**
     * 00.000.000/0000-00
     * OBS.: CNPJ do Fabricante da Mercadoria, obrigatório para produto em escala NÃO relevante
     * */
    cnpj_fabricante?: string;
    /** GTIN do produto, antigo código EAN ou código de barras */
    gtin?: string;
    /** GTIN tributável do produto, antigo código EAN ou código de barras */
    gtin_tributavel?: string;
    /** Código CEST. Identificado automaticamente de acordo com o NCM. */
    cest?: string;
    /** Código NVE. *Obrigatório somente para produtos importados em que o NCM exija o NVE. Consulte o seu contador. */
    nve?: string;
    /** Número do grupo Reconhecimento e Controle das Operações com Papel Imune. *Somente para NFC-e */
    nrecopi?: string;
    /** Identificar produto como ativo permanente ou ao uso ou consumo do cliente.
     *
     * Utilizado em operações de ICMS-ST (substituição tributária) para identificar entrada de mercadoria no estabelecimento do contribuinte que não esteja vinculada à operação ou prestação subsequente. */
    ativo_permanente?: boolean;
    /** Campo exclusivo para venda de veículos usados, sendo necessário informar o valor do veículo usado da nota fiscal de compra. */
    veiculo_usado?: string;
    /** Exceção do código NCM caso esteja enquadrado na alíquota do IPI diferenciada. 000 */
    ex_ipi?: string;
    // TODO: Completar tipagem
    combustiveis?: any;
    // TODO: Completar tipagem
    medicamento?: any;
    // TODO: Completar tipagem
    armamentos?: any;
    // TODO: Completar tipagem
    veiculos_novos?: any;
    /**
     * Alíquota aproximada dos tributos federais.
     *
     * **Obrigatório caso não informado o Token IBPT**
     *
     * Formato: 0.00
     * */
    tributos_federais?: string;
    /**
     * Alíquota aproximada dos tributos estaduais.
     *
     * **Obrigatório caso não informado o Token IBPT**
     *
     * Formato: 0.00
     * */
    tributos_estaduais?: string;
    /** Informe a rastreabilidade de produtos sujeitos a regulações sanitárias, casos de recolhimento/recall, além de defensivos agrícolas, produtos veterinários, odontológicos, medicamentos, bebidas, águas envasadas, embalagens, etc. **Obrigatório o preenchimento no caso de medicamentos e produtos farmacêuticos.** */
    rastro?: {
      /** Número do Lote do produto */
      lote: string;
      /** Quantidade de produto no Lote */
      quantidade: number;
      /** Data de fabricação/produção. Formato americano: `YYYY-MM-DD` */
      data_fabricacao: string;
      /** Data de validade. Formato americano: `YYYY-MM-DD` */
      data_validade: string;
      codigo_agregacao?: number;
    };
    /** Informações da exportação */
    exportacao?: Array<{
      /**
       * Exportação Drawback
       * Número do ato concessório de Drawback
       * O número do Ato Concessório de Suspensão deve ser preenchido com 11 dígitos *(AAAANNNNNND)* e o número do Ato Concessório de Drawback Isenção deve ser preenchido com 9 dígitos *(AANNNNNND)*.
       * */
      drawback?: string;
      /**
       * Exportação Indireta. Número do Registro de Exportação */
      reg_exportacao?: string;
      /** Exportação Indireta. Chave de Acesso da NF-e recebida para exportação
       *
       * NF-e recebida com fim específico de exportação. No caso de operação com CFOP 3.503, informar a chave de acesso da NF-e que efetivou a exportação.
       * */
      nfe_exportacao?: string;
      /** Exportação Indireta. Quantidade do item realmente exportado
       *
       * A unidade de medida desta quantidade é a unidade de comercialização deste item. No caso de operação com CFOP 3.503, informar a quantidade de mercadoria devolvida.
       * */
      qtd_exportacao?: string;
    }>;
  }
  type CreateNotaFiscalProdutoNacional = CreateNotaFiscalProdutoBase & {
    origem: 0 | 3 | 4 | 5 | 8;
  };
  type CreateNotaFiscalProdutoEstrageiro = CreateNotaFiscalProdutoBase & {
    origem: 1 | 2 | 6 | 7;
    /**
     * Preço unitário do produto
     *
     * Formato: 0.00 (valor integral sem descontos)
     *
     * Para produtos de importação informar o preço subtotal Aduaneiro (valor produto + frete + seguro).
     **/
    subtotal: string;
    /**
     * Preço total
     *
     * Formato: 0.00 (valor integral sem descontos)
     *
     * Para produtos de importação informar o preço total Aduaneiro (valor total produto + frete + seguro).
     **/
    total: string;
    /** Número do Documento de Importação (DI, DSI, DIRE, ...) */
    ndoc_importacao: string;
    /** Data de Registro do documento */
    ddoc_importacao: string;
    /** Local de desembaraço */
    local_desembaraco: string;
    /** Sigla da UF onde ocorreu o Desembaraço Aduaneiro */
    uf_desembaraco: string;
    /** Data do Desembaraço Aduaneiro Formato americano: `YYYY-MM-DD` */
    data_desembaraco: string;
    /**
     * Via de transporte internacional informada na Declaração de Importação (DI). Opções:
     *
     * 1. Marítima
     * 2. Fluvial
     * 3. Lacustre
     * 4. Aérea
     * 5. Postal
     * 6. Ferroviária
     * 7. Rodoviária
     * 8. Conduto / Rede Transmissão
     * 9. Meios Próprios
     * 10. Entrada / Saída ficta
     * 11. Courier
     * 12. Handcarry
     */
    via_transporte: string;
    /**
     * Forma de importação quanto a intermediação
     *
     * 1. Importação por conta própria
     * 2. Importação por conta e ordem
     * 3. Importação por encomenda
     * */
    intermediacao:
      | '1'
      | '2'
      | '3'
      | '4'
      | '5'
      | '6'
      | '7'
      | '8'
      | '9'
      | '10'
      | '11'
      | '12';
    adicao: string;
    seq_adicao: string;
    /** Código do fabricante estrangeiro
     *
     * Número determinado pelo importador, verificar junto ao ERP/Sistema o número de cadastro do fabricante. */
    fabricante: string;
    /**
     * Valor da AFRMM - Adicional ao Frete para Renovação da Marinha Mercante
     *
     * Deve ser informada no caso da via de transporte marítima.
     */
    afrmm: string;
    /**
     * CNPJ do adquirente ou do encomendante.
     *
     * Obrigatória a informação no caso de importação por conta e ordem ou por encomenda. Informar os zeros não significativos.
     */
    cnpj_terceiro: string;
    /**
     * Sigla da UF do adquirente ou do encomendante.
     *
     * Obrigatória a informação no caso de importação por conta e ordem ou por encomenda. Não aceita o valor "EX".
     */
    uf_terceiro: string;
    /**
     * Código do Exportador.
     *
     * Número determinado pelo importador, verificar junto ao ERP/Sistema o número de cadastro do exportador.
     */
    cod_exportador: string;
    /**
     * Número de controle da FCI - Ficha de Conteúdo de Importação.
     *
     * Informação relacionada com a Resolução 13/2012 do Senado Federal. Formato: Algarismos, letras maiúsculas de "A" a "F" e o caractere hífen. Exemplo: B01F70AF-10BF-4B1F-848C-65FF57F616FE.
     */
    nfci: string;
  };

  type CreateNotaFiscalProduto =
    | CreateNotaFiscalProdutoNacional
    | CreateNotaFiscalProdutoEstrageiro;

  type FormaPagamento =
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '90'
    | '99';
  type Bandeira =
    | '01'
    | '02'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '99';

  interface CreateNotaFiscalPedidoBase {
    /**
     * Indicador de presença do comprador no estabelecimento comercial no momento da operação
     *
     * 0 - Não se aplica (por exemplo, Nota Fiscal complementar ou de ajuste)
     *
     * 1 - Operação presencial
     *
     * 2 - Operação não presencial, pela Internet
     *
     * 3 - Operação não presencial, Teleatendimento
     *
     * 4 - NFC-e em operação com entrega a domicílio
     *
     * 5 - Operação presencial, fora do estabelecimento
     *
     * 9 - Operação não presencial, outros
     */
    presenca: 0 | 1 | 2 | 3 | 4 | 5 | 9;
    /**
     * 0 - Contratação do Frete por conta do Remetente (CIF)
     *
     * 1 - Contratação do Frete por conta do Destinatário (FOB)
     *
     * 2 - Contratação do Frete por conta de Terceiros
     *
     * 3 - Transporte Próprio por conta do Remetente
     *
     * 4 - Transporte Próprio por conta do Destinatário
     *
     * 9 - Sem Ocorrência de Transporte
     */
    modalidade_frete: 0 | 1 | 2 | 3 | 4 | 9;
    desconto: string;
    /**
     * Valor total do pedido pago pelo cliente
     * Cálculo: Total produtos + Frete - Descontos
     * 0.00
     *
     * **O valor total da NF-e é calculado automaticamente, porém pode ser substituído caso informado**.
     */
    total?: string;
    /** Outras despesas acessórias Formato: 0.00 */
    despesas_acessorias?: string;
    /** Obrigatório para nota fiscal de importação: Valor despesas aduaneiras (Siscomex) Formato: 0.00 */
    despesas_aduaneiras?: string;
    informacoes_fisco?: string;
    informacoes_complementares?: string;
    /**
     * Observações de uso livre do contribuinte OBS.: Na array deve possuir os parâmetros campo e texto.
     * */
    observacoes_contribuinte?: Array<{
      campo: string;
      texto: string;
    }>;
    pagamento: Array<0 | 1> | 0 | 1;
    /**
     * Formas de pagamento:
     *
     * 01 - Dinheiro
     *
     * 02 - Cheque
     *
     * 03 - Cartão de Crédito
     *
     * 04 - Cartão de Débito
     *
     * 05 - Crédito Loja
     *
     * 10 - Vale Alimentação
     *
     * 11 - Vale Refeição
     *
     * 12 - Vale Presente
     *
     * 13 - Vale Combustível
     *
     * 14 - Duplicata Mercantil
     *
     * 15 - Boleto Bancário
     *
     * 90 - Sem pagamento
     *
     * 99 - Outros
     * */
    forma_pagamento: Array<FormaPagamento> | FormaPagamento;
    /**
     * Tipo de integração para pagamento:
     *
     * 1 - Pagamento integrado com o sistema de automação da empresa (Ex: equipamento TEF, Comércio eletrônico)
     *
     * 2 - Pagamento não integrado com o sistema de automação da empresa (Ex: equipamento POS)
     */
    tipo_integracao?: 1 | 2 | Array<1 | 2>;
    /** **Obrigatório para pagamento via Dinheiro**: Valor do pagamento 0.00 */
    valor_pagamento: string | Array<string>;
    /** *Obrigatório para pagamento via Cartão de Crédito ou Débito para Pagamento Integrado (TEF): CNPJ da Credenciadora de cartão de crédito/débito.
     *
     * Informar o CNPJ da empresa que processa os pagamentos na maquininha de cartão. Por exemplo, CNPJ da empresa Cielo, Rede, PagSeguro, Stone, etc.
     */
    cnpj_credenciadora: string | Array<string>;
    /**
     * **Obrigatório para pagamento via Cartão de Crédito ou Débito para Pagamento Integrado (TEF)**:
     * Bandeira da operadora do cartão de crédito/débito
     * 01 - Visa / Visa Electron
     *
     * 02 - Mastercard / Maestro
     *
     * 03 - American Express
     *
     * 04 - Sorocred
     *
     * 05 - Diners Club
     *
     * 06 - Elo
     *
     * 07 - Hipercard
     *
     * 08 - Aura
     *
     * 09 - Cabal
     *
     * 99 - Outros
     *
     */
    bandeira: Bandeira | Array<Bandeira>;
    /** *Obrigatório para pagamento via Cartão de Crédito ou Débito para Pagamento Integrado (TEF): Número da autorização da operadora de cartão de crédito/débito (NSU). */
    autorizacao: string | Array<string>;
  }
  type CreateNotaFiscalPedidoNacional = CreateNotaFiscalPedidoBase & {
    frete?: string;
  };
  type CreateNotaFiscalPedidoImportado = CreateNotaFiscalPedidoBase;

  type CreateNotaFiscalTransporte = Partial<DadosEndereco> & {
    /** Quantidade de volumes transportados */
    volume?: string;
    /** Espécie dos volumes transportados */
    especie?: string;
    /** Peso bruto dos volumes transportados. Peso em quilograma (KG) Ex: 50.210 = 50,210KG */
    peso_bruto?: string;
    /** Peso líquido dos volumes transportados. Peso em quilograma (KG) Ex: 50.210 = 50,210KG */
    peso_liquido?: string;
    /** Marca dos volumes transportados */
    marca?: string;
    /** Numeração dos volumes transportados */
    numeracao?: string;
    /** Número dos Lacres dos volumes transportados */
    lacres?: string;
    endereco?: string;
    /** A UF deve ser informada se informado uma IE. Informar "EX" para Exterior. */
    uf?: string;
    cidade?: string;
    /** CEP Formato: 00000-000 */
    cep?: string;
    /** Placa do Veículo. Informar em um dos seguintes formatos: XXX9999, XXX999, XX9999 ou XXXX999. */
    placa?: string;
    /** Sigla UF do estado onde o veículo foi emplacado. Informar "EX" para Exterior. */
    uf_veiculo?: string;
    /** Registro Nacional de Transportador de Carga (ANTT) */
    rntc?: string;
    /** Valor do seguro 0.00 */
    seguro?: string;
    /** TODO: Add tipagem */
    reboque?: any;
    entrega?: DadosEnderecoComPais;
    retirada?: DadosEnderecoComPais;
  };

  interface CreateNotaFiscalBase {
    /**
     * Número do pedido de compra
     *
     * OBS: Tag xPed do XML da Nota Fiscal. A ID também pode ser informada de forma individual por produto
     */
    ID?: number;
    /**
     * Tipo de Operação da Nota Fiscal.
     *
     * 1 - Saída
     *
     * 0 - Entrada
     * */
    operacao: 0 | 1;
    natureza_operacao: string;

    /**
     * Finalidade de emissão da Nota Fiscal. Nota Fiscal de Ajuste e Complementar possuem endpoints de emissão separados.
     *
     * 1 - NF-e normal
     *
     * 4 - Devolução/Retorno
     */
    finalidade: 1 | 4;

    /**
     * Identificação do Ambiente do Sefaz
     *
     * 1 - Produção
     *
     * 2 - Homologação
     */
    ambiente: 1 | 2;
    /** URL de notificação para todas as atualizações de status da Nota Fiscal */
    url_notificacao?: string;
    /** Informações de todos os produtos adquiridos */
    produtos: Array<CreateNotaFiscalProduto>;
    /** Informações do transporte */
    transporte?: CreateNotaFiscalTransporte;
    /** Fatura referente a Nota Fiscal */
    fatura: {
      /** Número da Fatura */
      numero: string;
      /** Valor Original da Fatura */
      valor: string;
      /** Valor do desconto */
      desconto: string;
      /** Valor Líquido da Fatura */
      valor_liquido: string;
    };
    /** Parcelas referentes a Nota Fiscal */
    parcelas?: Array<{
      /** Data de vencimentoFormato americano: `YYYY-MM-DD` */
      vencimento: string;
      /** Valor da parcela */
      valor: string;
    }>;
    exportacao?: {
      uf_embarque: string;
      /** Descrição do Local de Embarque ou de transposição de fronteira */
      local_embarque: string;
      /** Descrição do local de despacho (Informação do Recinto Alfandegado) */
      local_despacho?: string;
    };
    /** Informar data e hora da emissão. Formato americano: `YYYY-MM-DD HH:MM:SS` */
    data_emissao?: string;
    /** Informar data e hora de Entrada ou Saída diferente da data de emissão. Formato americano: `YYYY-MM-DD HH:MM:SS` */
    data_entrada_saida?: string;
    /** Informar data da prestação do serviço nas operações com ISSQN. Formato americano: `YYYY-MM-DD` */
    data_servico?: string;
    /** Chave de acesso da NF-e emitida anteriormente. Pode ser informado mais de uma NF-e referenciada através de uma array. */
    nfe_referenciada?: string | Array<string>;
    /** Chave de acesso do CT-e referenciada. Pode ser informado mais de uma CT-e referenciada através de uma array */
    cte_referenciada?: string | Array<string>;
    /** Informações da NF de Produtor Rural referenciada. */
    nf_rural_referenciada?: Array<{
      /** Estado do produtor rural: XX */
      uf: string;
      /** Informar data da emissão da NF do produtor. Formato americano: YYYY-MM-DD */
      data: string;
      cpf: string;
      cnpj: string;
      /** Número da Inscrição Estadual */
      ie?: string;
      /**
       * Modelo do Documento Fiscal
       *
       * 04 = NF de Produtor
       *
       * 01 = NF
       * */
      modelo: '04' | '01';
      serie: number;
      numero: number;
    }>;
    //TODO: Fazer tipagem
    impostos?: any;
    /** Retorna os totais da Nota Fiscal antes da emissão */
    calculo_impostos?: boolean;
    /** Retorna a URL do Danfe antes da emissão da Nota Fiscal */
    previa_danfe?: boolean;
    /**
     * Envio assíncrono da Nota Fiscal com rápido tempo de resposta.
     *
     * Destinado para grandes volumes de emissão, onde o processo é realizado em background com retorno na URL de notificação.
     * */
    assincrono?: boolean;
  }
  type CreateNotaFiscalDefault = CreateNotaFiscalBase & {
    /** Modelo da Nota Fiscal */
    modelo: '1';
    /** Informações do pedido */
    pedido:
      | Optional<
          CreateNotaFiscalPedidoNacional,
          'valor_pagamento' | 'cnpj_credenciadora' | 'bandeira' | 'autorizacao'
        >
      | CreateNotaFiscalPedidoImportado;
    cliente:
      | CreateNotaFiscalClientePessoaFisica
      | CreateNotaFiscalClientePessoaJuridica
      | CreateNotaFiscalClienteEstrangeiro;
  };
  type CreateNotaFiscalConsumidor = Omit<
    CreateNotaFiscalBase,
    | 'fatura'
    | 'parcelas'
    | 'exportacao'
    | 'data_emissao'
    | 'data_entrada_saida'
    | 'data_servico'
    | 'nfe_referenciada'
    | 'cte_referenciada'
    | 'nf_rural_referenciada'
    | 'previa_danfe'
    | 'assincrono'
  > & {
    /** Modelo da Nota Fiscal */
    modelo: '2';
    /** Informações do pedido */
    pedido: CreateNotaFiscalPedidoNacional | CreateNotaFiscalPedidoImportado;
    cliente: Partial<
      Omit<
        | CreateNotaFiscalClientePessoaFisica
        | Omit<CreateNotaFiscalClientePessoaJuridica, 'suframa'>,
        'substituto_tributario' | 'consumidor_final' | 'contribuinte'
      >
    >;
  };

  export type CreateNotaFiscal =
    | CreateNotaFiscalDefault
    | CreateNotaFiscalConsumidor;
}
