
function addToBasket(id, name, image) {
  let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

  const existingItem = basketItems.find(item => item.id === id);

  if (existingItem) {
      existingItem.count++;
  } else {
      basketItems.push({ id, name, image, count: 1 });
  }

  localStorage.setItem('basketItems', JSON.stringify(basketItems));

  updateBasketIconCount();
}

function updateBasketIconCount() {
  let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
  let totalCount = basketItems.reduce((total, item) => total + item.count, 0);
  document.querySelector('.shop__icon__sup').textContent = totalCount;
}

function initBasketCount() {
  let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
  let totalCount = basketItems.reduce((total, item) => total + item.count, 0);
  document.querySelector('.shop__icon__sup').textContent = totalCount;
}

document.querySelectorAll('.add__btn').forEach(button => {
  button.addEventListener('click', function(event) {
      let card = event.target.closest('.card');
      let id = card.getAttribute('data-id');
      let name = card.querySelector('.card-title').textContent;
      let image = card.querySelector('.card-img-top').src;
      addToBasket(id, name, image);
  });
});

initBasketCount();

function displayBasketItems() {
  let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
  let tbody = document.querySelector('tbody');

  tbody.innerHTML = '';

  if (basketItems.length === 0) {
      document.querySelector('.text-danger').classList.remove('d-none');
      return;
  } else {
      document.querySelector('.text-danger').classList.add('d-none');
  }

  basketItems.forEach(item => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
          <td><img src="${item.image}" alt="Product Image" style="width: 50px; height: 50px;"></td>
          <td>${item.name}</td>
          <td>${item.count}</td>
      `;
      tbody.appendChild(tr);
  });
}

displayBasketItems();



