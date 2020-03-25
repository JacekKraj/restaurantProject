import { products } from "./products";

export class Product {
  constructor() {
    this.prods = document.querySelector(".products");
    this.prodsAmount = 0;
    this.previousCategory = "";
    this.orders = [];
  }

  displayProducts(type) {
    products.forEach(prod => {
      if (prod.category === type) {
        const template = `<div class="product" data-name="${prod.name}">
              <div class="product__remove-btn">
                <img
                  src="./assets/images/buttons/discount.png"
                  alt="remove button image"
                  class="product__remove-btn__image"
                />
              </div>
              <div class="product__add-btn">
                <img
                  src="./assets/images/buttons/plus.png"
                  alt="add button image"
                  class="product__add-btn__image"
                />
              </div>
              <div class="product__amount">0x</div>
              <div class="product__value" data-value='${prod.price}'>${prod.price}$</div>
              <div class="product__image-box">
                <img src="./../assets/images/color/${prod.name}" alt="" class="product__image" />
              </div>
            </div>`;
        this.prodsAmount++;
        this.prods.insertAdjacentHTML("afterbegin", template);
        this.addListeners();
      }
    });
  }

  changeCategory(category) {
    if (this.previousCategory === category || this.previousCategory === "") {
      this.previousCategory = category;
      return;
    } else {
      this.previousCategory = category;
      console.log("changed");
      for (let i = 0; i < this.prodsAmount; i++) {
        this.prods.removeChild(document.querySelector(".product"));
      }
      this.prodsAmount = 0;
      this.displayProducts(category);
    }
  }

  addListeners() {
    const removeBtn = document.querySelector(".product__remove-btn");
    const addBtn = document.querySelector(".product__add-btn");
    const object = this;
    removeBtn.addEventListener(
      "click",
      this.getOrderData.bind(removeBtn, "-", object)
    );

    addBtn.addEventListener(
      "click",
      this.getOrderData.bind(addBtn, "+", object)
    );
  }

  getOrderData(sign, object) {
    const product = this.closest(".product");
    const singleProductValue = product.querySelector(".product__value").dataset
      .value;
    const order = {
      name: product.dataset.name,
      cost: parseInt(
        sign === "+" ? singleProductValue : `-${singleProductValue}`
      )
    };
    object.createOrder.call(object, order);
  }

  createOrder(order) {
    let ifAdded = false;
    if (this.orders.length > 0) {
      this.orders.forEach(ord => {
        if (ord.name === order.name) {
          ord.cost += order.cost;
          ifAdded = true;
        }
      });
      if (!ifAdded) {
        this.orders.push(order);
      } else {
        ifAdded = false;
      }
    } else {
      this.orders.push(order);
    }
  }
}
