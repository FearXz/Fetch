window.onload = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((serverResponseJson) => {
      if (serverResponseJson.ok) {
        return serverResponseJson.json();
      }
    })
    .then((serverResponseConvertedInUsableData) => {
      let cartArray = [];
      console.log(serverResponseConvertedInUsableData);
      refreshLibrary(serverResponseConvertedInUsableData, cartArray);
    });
};
let refreshLibrary = function (arrayOfBook, cartArray) {
  showBookInLibrary(arrayOfBook);
  addEventDeleteBtn(arrayOfBook, cartArray);
  addEventCartBtn(arrayOfBook, cartArray);
};

let showBookInLibrary = (arrayOfBook) => {
  let bookContainer = document.getElementById("bookContainer");
  bookContainer.innerHTML = "";
  arrayOfBook.forEach((bookObj) => {
    bookContainer.innerHTML += `
    <div class="col-3 cardContainer">
    <div class="card">
      <img src="${bookObj.img}" class="card-img-top" alt="${bookObj.title}" />
      <div class="card-body">
        <h5 class="card-title">${bookObj.title}</h5>
        <div class="d-flex justify-content-between">
          <p class="card-text">Category: ${bookObj.category}</p>
          <p class="card-text">Price: ${bookObj.price}</p>
        </div>
        <div class="d-flex justify-content-between">
        <button class="btn btn-primary addToCartBtn">Add to cart</button>
        <button class="btn btn-danger deleteBtn">Delete</button>
      </div>
    </div>
    </div>
    `;
  });
};
let showBookInCart = () => {
  let cartContainer = document.getElementById("cart");
  let arrayCart = JSON.parse(localStorage.getItem("LibraryCart"));
  cartContainer.innerHTML = "";
  let total = 0;
  arrayCart.forEach((book) => {
    total += book.price;
    cartContainer.innerHTML += `
      <div class="col-12">
       title: ${book.title} price: ${parseFloat(book.price.toFixed(2))}
      </div>
        `;
  });
  cartContainer.innerHTML += `total = ${parseFloat(total.toFixed(2))}`;
};

let addEventDeleteBtn = function (arrayOfBook, cartArray) {
  let deleteButtonNode = document.querySelectorAll(".deleteBtn");
  deleteButtonNode.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.currentTarget.closest(".cardContainer").remove();
      console.log(arrayOfBook.splice(index, 1));
      console.log(arrayOfBook);
      refreshLibrary(arrayOfBook, cartArray);
    });
  });
};

let addEventCartBtn = function (arrayOfBook, cartArray) {
  let addToCartButtonNode = document.querySelectorAll(".addToCartBtn");
  addToCartButtonNode.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      cartArray.push(arrayOfBook[index]);
      console.log(cartArray);
      localStorage.setItem("LibraryCart", JSON.stringify(cartArray));
      showBookInCart();
    });
  });
};
