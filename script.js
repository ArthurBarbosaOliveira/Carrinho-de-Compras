function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));  

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
/* testando 6 */
const elementCart = document.querySelector('.cart__items');
const button = document.querySelector('.empty-cart');
button.addEventListener('click', () => {
  elementCart.innerHTML = '';
});

function cartItemClickListener(event) {
  event.target.remove('.cart_items');
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;  
}

 /* requisito 2 pegando dados da api fetchitem para usar no botão e adicionar ao carrinho */ 
 /* ajuda de colegas e revisão do course conseguir entender melhor o localStorage */
const carrinhoProdutos = async (e) => {
  const item = e.target.parentNode;
  const items = getSkuFromProductItem(item);
  const { id, title, price } = await fetchItem(items);
  const classe = document.querySelector('.cart__items');
  const carrinho = createCartItemElement({ sku: id, name: title, salePrice: price });
  classe.appendChild(carrinho);
  elementCart.appendChild(carrinho);
  saveCartItems(elementCart.innerHTML);
};
/* retornando o elemento do carrinho para o Storage */
const retonarElementCart = async () => {
  elementCart.innerHTML = await getSavedCartItems();
  elementCart.addEventListener('click', cartItemClickListener);
};

const pesquisaProdutos = async (mercadorias) => {
  const array = await fetchProducts(mercadorias);
  array.results.forEach((element) => {
    const { id, title, thumbnail } = element;
    const item = document.querySelector('.items');
    const items = createProductItemElement({ sku: id, name: title, image: thumbnail });
    item.appendChild(items);
  });
};
 /* onloads com fetchproducts com argumento computador, then no results do API, foreach para encontrar elementos da const id, title, thumbnail, guardando o element usamos no creator products passando o retorno. 
 selecionando a classe, criamos um filho com retorno de items, criando assim a secção de itens no carregamento da página *
 vamos colocar essa fetchprodutcs numa const pesquisaProdutos fora do onload e chamar no onload como método assincrono asyns/wait para melhorar a manipulação de dados 
 tive essa lógica vendo a mentoria - pegando a classe item add e percorrendo com foreach e colocando evento de click no carrinhoProdutos */
 window.onload = async () => {
  await pesquisaProdutos('computador');
  const botaoCarrinho = document.querySelectorAll('.item__add');
  botaoCarrinho.forEach((element) => element.addEventListener('click', carrinhoProdutos));
  retonarElementCart();
 };
