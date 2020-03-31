import { products } from "./products";

export class Product {
  constructor() {
    this.prods = document.querySelector(".products");
    this.prodsAmount = 0;
    this.previousCategory = "";
    this.orders = [];
    this.totalValueContainer = document.querySelector(
      ".order-conclusion__value"
    );
    this.totalValueContainer.innerHTML = 0;
    this.orderClass = "";
  }

  displayProducts(type) {
    products.forEach(prod => {
      if (prod.category === type) {
        const amount = this.checkIfIsAdded(prod.name);
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
              <div class="product__amount">${amount ? amount + "x" : "0"}</div>
              <div class="product__value" data-value='${prod.price}'>${
          prod.price
        }$</div>
              <div class="product__image-box">
                <img src="./../assets/images/color/${
                  prod.name
                }" alt="" class="product__image" />
              </div>
            </div>`;
        this.prodsAmount++;
        this.prods.insertAdjacentHTML("afterbegin", template);
        this.addListeners();
      }
    });
  }

  checkIfIsAdded(name) {
    let amount;
    const ifExists = el => {
      if (el.name == name) {
        amount = el.amount;
      }
    };

    if (this.orders.length > 0) {
      this.orders.find(ifExists);
    }
    return amount;
  }

  changeCategory(category) {
    if (this.previousCategory === category) {
      this.previousCategory = category;
      return;
    } else {
      this.previousCategory = category;
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
      this.getOrderData.bind(removeBtn, "-", object, removeBtn, addBtn)
    );

    addBtn.addEventListener(
      "click",
      this.getOrderData.bind(addBtn, "+", object, removeBtn, addBtn)
    );
  }

  getOrderData(sign, object, remove, add) {
    const product = this.closest(".product");
    const amount = object.getProductAmount(product, sign);
    if (!amount && amount != "0") {
      return;
    }

    let singleProductValue = product.querySelector(".product__value").dataset
      .value;
    if (object.orderClass.codeState) {
      singleProductValue *= 0.8;
      singleProductValue = singleProductValue.toFixed(1);
    }
    const order = {
      name: product.dataset.name,
      cost: parseFloat(
        sign === "+" ? singleProductValue : `-${singleProductValue}`
      ),
      amount: sign === "+" ? 1 : -1,
      id: product.dataset.name,
      btnRemove: remove,
      btnAdd: add
    };
    if (amount === 0) {
      object.deleteFromOrders.call(object, order);
      object.updateOrderTotalValue(order.cost, sign);
      return;
    }
    object.createOrder.call(object, order, sign);
  }

  getProductAmount(product, sign) {
    let productAmount = parseFloat(
      product.querySelector(".product__amount").innerHTML
    );
    if (sign === "-" && productAmount == "0") {
      return;
    }
    sign === "+" ? productAmount++ : productAmount--;
    product.querySelector(".product__amount").innerHTML = productAmount + "x";
    return productAmount;
  }

  deleteFromOrders(order) {
    const getIndex = el => {
      return el.id === order.id;
    };
    const index = this.orders.findIndex(getIndex);
    this.orders.splice(index, 1);
  }

  createOrder(order, sign) {
    let ifAdded = false;
    if (this.orders.length > 0) {
      this.orders.forEach(ord => {
        if (ord.name === order.name) {
          ord.amount += order.amount;
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
    this.updateOrderTotalValue(order.cost, sign);
  }

  updateOrderTotalValue(cost, sign) {
    let totalValue = parseFloat(this.totalValueContainer.innerHTML);
    totalValue += cost;
    this.totalValueContainer.innerHTML = `${totalValue.toFixed(1)}$`;
  }

  getOrderClass(order) {
    this.orderClass = order;
  }
}
