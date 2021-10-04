const api = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'; 
const local = localStorage.getItem('key');

const setItems = () => {
  localStorage.setItem('key', JSON
  .stringify(document.getElementsByClassName('cart__items')[0].innerHTML));
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  setItems();
}

const getItems = () => {
  const result = document.querySelector('ol');
  result.innerHTML = JSON.parse(localStorage.getItem('key'));
  result.addEventListener('click', cartItemClickListener);
};

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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function requestProducts(url) {
  return fetch(url)
    .then((object) => object.json())
    .then((list) => list.results.forEach(({ id, title, thumbnail }) => {
      const output = {
        sku: id,
        name: title,
        image: thumbnail,
      };
      const sectionItems = document.querySelector('.items');
      const itemElement = createProductItemElement(output);
      sectionItems.append(itemElement);
    }))
    .catch(() => console.error('Endereço não foi encontrado.'));
}

async function takeProductID(element) {
  const elementId = getSkuFromProductItem(element);
  const idApi = `https://api.mercadolibre.com/items/${elementId}`;

  return fetch(idApi)
    .then((object) => object.json())
    .then(({ id, title, price }) => {
      const output = {
        sku: id,
        name: title,
        salePrice: price,
      };
      const ol = document.querySelector('.cart__items');
      ol.append(createCartItemElement(output));
      setItems();
    });
}

function addListenersToBtns() {
  const allItems = document.querySelectorAll('.item');
  const loading = document.querySelector('.loading');
  
  allItems.forEach((item) => item.lastChild.addEventListener('click', (() => {
    takeProductID(item);
  })));
  loading.remove();
}

function load() {
  requestProducts(api)
  .then(() => addListenersToBtns())
  .then(() => {
    const clearButton = document.getElementsByClassName('empty-cart')[0];
    clearButton.addEventListener('click', () => {
      const olClear = document.querySelector('ol');
      olClear.innerText = '';
    });
  })
  .catch(() => console.error('Endereço não encontrado.'));
}

window.onload = () => { 
  if (local) {
    getItems();
  }
  load();
};