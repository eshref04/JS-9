const allAddBtn = document.querySelectorAll(".add__btn");


for (let i = 0; i < allAddBtn.length; i++) {
  allAddBtn[i].addEventListener("click", function (e) {
    e.preventDefault();

   
    let Id = this.getAttribute("data-id");

    
    let cardBody = this.parentElement;
    let Name = cardBody.querySelector(".card-title").textContent;
    let Image = cardBody.parentElement.querySelector("img").getAttribute("src");

    
    if (!localStorage.getItem("basket")) {
      localStorage.setItem("basket", "[]");
    }

    let basket = JSON.parse(localStorage.getItem("basket"));

    
    let existingProduct = null;
    for (let j = 0; j < basket.length; j++) {
      if (basket[j].id === Id) {
        existingProduct = basket[j];
        break;
      }
    }

    
    if (!existingProduct) {
      basket.push({
        id: Id,
        count: 1,
        name: Name,
        image: Image,
      });
    } else {
      
      existingProduct.count++;
    }

    localStorage.setItem("basket", JSON.stringify(basket));

    
    updateBasketCount();
  });
}


function updateBasketCount() {
  let basketCountElement = document.querySelector(".shop__icon__sup");
  let basket = JSON.parse(localStorage.getItem("basket"));


  let totalCount = 0;
  for (let k = 0; k < basket.length; k++) {
    totalCount += basket[k].count;
  }

  
  basketCountElement.textContent = totalCount;
}


updateBasketCount();

const table = document.querySelector(".table");
let basket = JSON.parse(localStorage.getItem("basket"));

if (basket.length !== 0) {
  for (let i = 0; i < basket.length; i++) {
    let product = basket[i];
    let tr = document.createElement("tr");

    let tdImg = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", product.image);
    img.setAttribute("width", "150px");
    tdImg.appendChild(img);

    let tdName = document.createElement("td");
    tdName.innerText = product.name;

    let tdCount = document.createElement("td");
    tdCount.innerText = product.count;

    tr.appendChild(tdImg);
    tr.appendChild(tdName);
    tr.appendChild(tdCount);

    table.lastElementChild.appendChild(tr);
  }
} else {
  table.previousElementSibling.classList.remove("d-none");
}

