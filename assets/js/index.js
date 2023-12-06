window.onload = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((serverResponseJson) => {
      if (serverResponseJson.ok) {
        return serverResponseJson.json();
      }
    })
    .then((serverResponseConvertedInUsableData) => {
      refreshLibrary(serverResponseConvertedInUsableData, cartArray);
    });
};
let cartArray = [];
let counter = 0;

let refreshLibrary = function (arrayOfBook) {
  let bookContainer = document.getElementById("bookContainer");
  clearElement(bookContainer);

  arrayOfBook.forEach((bookObj, index) => {
    let cardContainer = createCard(bookObj, index, arrayOfBook);
    bookContainer.appendChild(cardContainer);
  });
};

let createCard = function (bookObj, index, arrayOfBook) {
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-3", "cardContainer");

  let card = document.createElement("div");
  card.classList.add("card", "h-100");

  let image = document.createElement("img");
  image.src = bookObj.img;
  image.classList.add("card-img-top");
  image.alt = bookObj.title;

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = bookObj.title;

  let categoryPriceDiv = document.createElement("div");
  categoryPriceDiv.classList.add("d-flex", "justify-content-between");

  let category = document.createElement("p");
  category.classList.add("card-text");
  category.textContent = `Category: ${bookObj.category}`;

  let price = document.createElement("p");
  price.classList.add("card-text");
  price.textContent = `Price: ${bookObj.price}`;

  categoryPriceDiv.appendChild(category);
  categoryPriceDiv.appendChild(price);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("d-flex", "justify-content-between");

  let addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("btn", "btn-primary", "addToCartBtn");
  addToCartBtn.textContent = "Add to cart";

  // Aggiungi l'event listener al bottone "Add to Cart"
  addToCartBtn.addEventListener("click", (event) => {
    cartArray.push(arrayOfBook[index]);
    console.log(cartArray);
    localStorage.setItem("LibraryCart", JSON.stringify(cartArray));
    counter += 1;
    let span = document.getElementById("counter");
    span.innerText = counter;
    refreshCart();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger", "deleteBtn");
  deleteBtn.textContent = "Delete";

  // Aggiungi l'event listener al bottone "Delete"
  deleteBtn.addEventListener("click", (event) => {
    event.currentTarget.closest(".cardContainer").remove();
    console.log(arrayOfBook.splice(index, 1));
    console.log(arrayOfBook);
    refreshLibrary(arrayOfBook, cartArray);
  });

  buttonsDiv.appendChild(addToCartBtn);
  buttonsDiv.appendChild(deleteBtn);

  cardBody.appendChild(title);
  cardBody.appendChild(categoryPriceDiv);
  cardBody.appendChild(buttonsDiv);

  card.appendChild(image);
  card.appendChild(cardBody);

  cardContainer.appendChild(card);

  return cardContainer;
};

let refreshCart = () => {
  let dropDownMenu = document.querySelector(".dropdown-menu");
  let arrayCart = JSON.parse(localStorage.getItem("LibraryCart"));
  clearElement(dropDownMenu);
  let total = 0;

  arrayCart.forEach((bookInCart, index) => {
    total += bookInCart.price;
    let itemLi = createCartElement(bookInCart, index);
    dropDownMenu.appendChild(itemLi);
  });

  let totalDiv = document.createElement("div");
  totalDiv.textContent = `total = ${parseFloat(total.toFixed(2))}`;
  dropDownMenu.appendChild(totalDiv);
};

let createCartElement = function (bookInCart, index) {
  let li = document.createElement("li");

  let a = document.createElement("a");

  a.href = "#";
  a.classList.add("dropdown-item");

  let rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "justify-content-start");

  let imageColDiv = document.createElement("div");
  imageColDiv.classList.add("col-auto");

  let imageElement = document.createElement("img");
  imageElement.src = bookInCart.img;
  imageElement.height = "200px";
  imageElement.classList.add("img-fluid");

  imageColDiv.appendChild(imageElement);

  let infoColDiv = document.createElement("div");
  infoColDiv.classList.add("col-auto");

  let titleParagraph = document.createElement("p");
  titleParagraph.textContent = bookInCart.title;

  let priceParagraph = document.createElement("p");
  priceParagraph.textContent = parseFloat(bookInCart.price.toFixed(2));

  infoColDiv.appendChild(titleParagraph);
  infoColDiv.appendChild(priceParagraph);

  let deleteColDiv = document.createElement("div");
  deleteColDiv.classList.add("col-auto");

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", (event) => {
    event.currentTarget.closest(".row").remove();
    console.log(cartArray.splice(index, 1));
    localStorage.setItem("LibraryCart", JSON.stringify(cartArray));
    counter -= 1;
    let span = document.getElementById("counter");
    span.innerText = counter;
    refreshCart();
    console.log(cartArray);
  });

  deleteColDiv.appendChild(deleteButton);

  rowDiv.appendChild(imageColDiv);
  rowDiv.appendChild(infoColDiv);
  rowDiv.appendChild(deleteColDiv);
  a.appendChild(rowDiv);
  li.appendChild(a);

  return li;
};

let clearElement = function (element) {
  element.innerHTML = "";
};
