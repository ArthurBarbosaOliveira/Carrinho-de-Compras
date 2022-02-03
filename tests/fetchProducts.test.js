require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // esperado o tipo function do fetchproducts
  it ('Retorne se é uma função a fecthProducts.js', () => {
    expect(typeof fetchProducts).toBe('function');
  })
});
  // use o porfavor-obrigado (async-await) por causa do argumento, e teste o fetch para saber se funciona. 
  it('Retorne se fetch foi chamado na fecthProducts.js, com argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
});
  // mesma coisa de cima, mas com o endpoint esperado, na pesquisa do expect json, o tobecalledwith é o ideal para testar o endpoint esperado 
  it('Retorne se fetch foi chamado com o endpoint na fecthProducts.js, com argumento "computador"', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(endpoint);
 });
 // testando a const para ter retorno esperado com arquivo importado computadorSearch
   it('Retorne se a função fecthProducts.js é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const funcao = await fetchProducts('computador');
    expect(funcao).toEqual(computadorSearch);
});
  // Irar compara a funcao com new Error, passado sem argumento na const 
  it('Retorne se a função fecthProducts.js sem argumento retorne um Eroo " You must provide an url ', async () => {
  const funcao = await fetchProducts();
  expect(funcao).toEqual(new Error('You must provide an url'));
});
