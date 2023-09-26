"use strict";

let basket = [];

if (localStorage.getItem("basket") != null) {
  basket = JSON.parse(localStorage.getItem("basket"));
  document.querySelector("#cart .alert-warning").classList.add("d-none");
  document.querySelector(".total-price").classList.remove("d-none");
} else {
  document.querySelector(".basket .count").classList.add("d-none");
  document.querySelector("#cart .table").classList.add("d-none");
  document.querySelector("#cart .alert-warning").classList.remove("d-none");
  document.querySelector(".total-price").classList.add("d-none");
}

if (basket.length == 0) {
  document.querySelector("#cart .table").classList.add("d-none");
  document.querySelector("#cart .alert-warning").classList.remove("d-none");
  document.querySelector(".basket .count").classList.add("d-none");
  document.querySelector(".total-price").classList.add("d-none");
}

function basketCount() {
  let basketCount = 0;
  for (const item of basket) {
    basketCount += item.count;
  }
  return basketCount;
}

document.querySelector(".basket .count span").innerText = basketCount();

showBasketDatas(basket);

function showBasketDatas(products) {
  let tableBody = document.querySelector(".table tbody");
  for (const item of products) {
    tableBody.innerHTML += `<tr>
        <td><img src="${item.image}" alt=""></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td><i data-id="${item.id}" class="fa-solid fa-minus"></i>
        <span>${item.count}</span>
        <i data-id="${item.id}" class="fa-solid fa-plus"></i></td>
        <td>${item.price} ₼</td>
        <td>${item.price * item.count} ₼</td>
        <td>
            <button data-id="${
              item.id
            }" class="btn btn-danger delete-btn">Delete</button>
        </td>
        </tr>`;
  }
}

deleteBasketItem();

function deleteBasketItem() {
  let deleteBtns = document.querySelectorAll(".table button");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      let productId = parseInt(this.getAttribute("data-id"));
      let existProduct = basket.find((m) => m.id == productId);
      basket = basket.filter((m) => m.id != existProduct.id);
      localStorage.setItem("basket", JSON.stringify(basket));
      document.querySelector(".basket .count span").innerText = basketCount();
      this.parentNode.parentNode.remove();
      if (basket.length == 0) {
        document.querySelector("#cart .table").classList.add("d-none");
        document
          .querySelector("#cart .alert-warning")
          .classList.remove("d-none");
        document.querySelector(".basket .count").classList.add("d-none");
        document.querySelector(".total-price").classList.add("d-none");
      }

      getTotalPrice(basket);
    });
  });
}

getTotalPrice(basket);

function getTotalPrice(products) {
  let total = 0;
  for (const product of products) {
    total += product.price * product.count;
  }

  document.querySelector(".total-price span").innerText = total + " ₼";
}

let decreaseCounts = document.querySelectorAll("table i:nth-of-type(1)");
let increaseCounts = document.querySelectorAll("table i:nth-of-type(2)");

increaseCounts.forEach((increaseCount) => {
  increaseCount.addEventListener("click", function () {
    let productId = parseInt(this.getAttribute("data-id"));
    let existProduct = basket.find((m) => m.id == productId);
    existProduct.count++;
    this.previousElementSibling.innerText = existProduct.count;
    this.parentNode.nextElementSibling.nextElementSibling.innerText =
      existProduct.price * existProduct.count + " ₼";
    localStorage.setItem("basket", JSON.stringify(basket));
    document.querySelector(".basket .count span").innerText = basketCount();
    getTotalPrice(basket);
  });
});

decreaseCounts.forEach((decreaseCount) => {
  decreaseCount.addEventListener("click", function () {
    let productId = parseInt(this.getAttribute("data-id"));
    let existProduct = basket.find((m) => m.id == productId);

    if (existProduct.count == 1) {
      basket = basket.filter((m) => m.id != existProduct.id);
      localStorage.setItem("basket", JSON.stringify(basket));
      document.querySelector(".basket .count span").innerText = basketCount();
      this.parentNode.parentNode.remove();
    } else {
      existProduct.count--;
      this.nextElementSibling.innerText = existProduct.count;
      this.parentNode.nextElementSibling.nextElementSibling.innerText =
        existProduct.price * existProduct.count + " ₼";
      localStorage.setItem("basket", JSON.stringify(basket));
      document.querySelector(".basket .count span").innerText = basketCount();
    }

    if (basket.length == 0) {
      document.querySelector("#cart .table").classList.add("d-none");
      document.querySelector("#cart .alert-warning").classList.remove("d-none");
      document.querySelector(".basket .count").classList.add("d-none");
      document.querySelector(".total-price").classList.add("d-none");
    }
    getTotalPrice(basket);
  });
});
