import { products } from "./products";

export class Product {
  constructor() {
    this.prods = document.querySelector(".products");
    this.prodsAmount = 0;
    this.previousCategory = "";
  }

  displayProducts(type) {
    products.forEach(prod => {
      if (prod.category === type) {
        const template = `<div class="product">
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
              <div class="product__value">${prod.price}$</div>
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
    document
      .querySelector(".product__remove-btn")
      .addEventListener("click", this.removeProduct);
    document
      .querySelector(".product__add-btn")
      .addEventListener("click", this.addProduct);
  }

  removeProduct() {}

  addProduct() {}
}
