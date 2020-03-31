import { Product } from "./Product";
import { products } from "./products";
export class Order {
  constructor(prod) {
    this.products = prod;
    this.modal = document.querySelector(".modal");
    this.backdrop = document.querySelector(".backdrop");
    this.codes = ["BlackFriday20", "Discount2020", "ExtraPrice"];
    this.codeState = false;
    this.createListeners();
  }

  createListeners() {
    document
      .querySelector(".discount__btn")
      .addEventListener("click", this.checkDiscountCode.bind(this));
    document
      .querySelector(".modal__back-btn")
      .addEventListener(
        "click",
        this.changeOrderMenuDisplay.bind(this, "inactive")
      );
    this.backdrop.addEventListener(
      "click",
      this.changeOrderMenuDisplay.bind(this, "inactive")
    );
    document
      .querySelector(".modal__order-btn")
      .addEventListener("click", this.placeOrder.bind(this));
  }

  placeOrder() {
    document.querySelector(".wrapper-conc").style.display = "none";
    document.querySelector(".order-placed__waiting").style.display = "block";
    document.querySelector(".order-placed").style.display = "flex";
    setTimeout(() => {
      document.querySelector(".order-placed__waiting").style.display = "none";
      document.querySelector(".order-placed__info").style.display = "Block";
      setTimeout(() => {
        location.reload();
      }, 1500);
    }, 1500);
  }

  changeOrderMenuDisplay(state) {
    let disp;
    let topDist;
    if (state === "active") {
      disp = "block";
      topDist = "50%";
    } else {
      disp = "none";
      topDist = "47%";
    }
    this.backdrop.style.display = disp;
    this.modal.style.display = disp;
    document.querySelector(".wrapper-conc").style.display = disp;
    window.setTimeout(() => {
      this.modal.style.top = topDist;
    }, 50);
    this.displayProducts();
  }

  displayProducts() {
    const prodsConc = document.querySelector(".products-conc");
    prodsConc.innerHTML = "";
    let newNames = this.products.orders.map(el => {
      return el.name.substring(0, el.name.length - 4);
    });
    this.products.orders.forEach((el, index) => {
      const template = `<div class="product-conc" id='${index}'>
                          <p class="product-conc__name">${newNames[index]}</p>
                          <div class="product-conc__dismount"></div>
                          <p class="product-conc__amount">${el.amount}</p>
                          <div class="product-conc__add"></div>
                          <p class="product-conc__price">${el.cost}$</p>
                       </div>`;
      prodsConc.insertAdjacentHTML("afterbegin", template);
      const amountEl = document.querySelector(".product-conc__amount");
      const costEl = document.querySelector(".product-conc__price");
      document
        .querySelector(".product-conc__dismount")
        .addEventListener(
          "click",
          this.changeAmount.bind(this, index, "-", amountEl, costEl)
        );
      document
        .querySelector(".product-conc__add")
        .addEventListener(
          "click",
          this.changeAmount.bind(this, index, "+", amountEl, costEl)
        );
    });

    this.updateTotalValue();
  }

  changeAmount(index, sign, amountEl, costEl) {
    let value;
    if (this.products.orders[index].amount === 1) {
      value = true;
    }
    this.products.getOrderData.call(
      this.products.orders[index].btnRemove,
      sign,
      this.products,
      this.products.orders[index].btnRemove,
      this.products.orders[index].btnAdd
    );
    if (this.products.orders[index]) {
      this.changeOrderAmountDisplay(
        this.products.orders[index].amount,
        this.products.orders[index].cost.toFixed(1),
        amountEl,
        costEl
      );
    }
    if (value) {
      this.displayProducts();
      value = false;
    }
  }

  changeOrderAmountDisplay(amount, cost, amountEl, costEl) {
    amountEl.innerHTML = amount;
    costEl.innerHTML = `${cost}$`;
    this.updateTotalValue();
  }

  updateTotalValue() {
    document.querySelector(
      ".modal__total-price"
    ).textContent = `Total Price: ${this.products.totalValueContainer.innerHTML}`;
  }

  checkDiscountCode() {
    if (!this.codeState) {
      let value = this.codes.filter(code => {
        return code === document.querySelector(".discount__input").value.trim();
      });
      if (value.length > 0) {
        this.updateExistingPrices();
        this.codeState = true;
      }
    }
    document.querySelector(".discount__input").value = "";
  }

  updateExistingPrices() {
    const prices = document.querySelectorAll(".product-conc__price");
    prices.forEach(price => {
      const cost = parseFloat(price.innerHTML);
      price.innerHTML = `${(cost * 0.8).toFixed(1)}$`;
    });
    this.products.orders.forEach(order => {
      order.cost *= 0.8;
      order.cost.toFixed(1);
    });
    this.products.totalValueContainer.innerHTML = `
        ${(
          parseFloat(this.products.totalValueContainer.innerHTML) * 0.8
        ).toFixed(1)}$`;
    this.updateTotalValue();
    console.log(this.products.orders);
  }
}
