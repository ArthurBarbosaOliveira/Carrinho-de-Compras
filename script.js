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

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

 /* onloads com fetchproducts com argumento computador, then no results do API, foreach para encontrar elementos da const id, title, thumbnail, guardando o element usamos no creator products passando o retorno. 
 selecionando a classe, criamos um filho com retorno de items, criando assim a secção de itens no carregamento da página */
window.onload = () => {
  fetchProducts('computador').then(({ results }) => results.forEach((element) => {
    const { id, title, thumbnail } = element;
    const item = document.querySelector('.items');
    const items = createProductItemElement({ sku: id, name: title, image: thumbnail });
    item.appendChild(items);
  }));
 };
