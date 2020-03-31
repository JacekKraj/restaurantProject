import { Product } from "./Product";
import { Order } from "./Order";
import { products } from "./products";
class Page {
  constructor() {
    this.entryPage = document.querySelector(".entry-page");
    this.entryPage.addEventListener("click", this.displayMainPage.bind(this));
  }

  displayMainPage() {
    this.entryPage.style.display = "none";
    document.querySelector(".main-page").style.display = "block";
    const Prod = new Product();
    Prod.displayProducts("drinks");
    const categoryContainers = document.querySelectorAll(
      ".products-category__container"
    );
    categoryContainers.forEach(cat => {
      cat.addEventListener(
        "click",
        Prod.changeCategory.bind(Prod, cat.dataset.category)
      );
    });
    const Ord = new Order(Prod);
    document
      .querySelector(".order-conclusion__button")
      .addEventListener(
        "click",
        Ord.changeOrderMenuDisplay.bind(Ord, "active")
      );
    Prod.getOrderClass(Ord);
  }
}

new Page();
