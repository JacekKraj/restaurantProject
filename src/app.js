import { Product } from "./Product";

class Page {
  constructor() {
    this.entryPage = document.querySelector(".entry-page");
    this.entryPage.addEventListener("click", this.displayMainPage.bind(this));
  }

  displayMainPage() {
    this.entryPage.style.display = "none";
    document.querySelector(".main-page").style.display = "block";
    const prod = new Product();
    prod.displayProducts("drinks");
    const categoryContainers = document.querySelectorAll(
      ".products-category__container"
    );
    categoryContainers.forEach(cat => {
      cat.addEventListener(
        "click",
        prod.changeCategory.bind(prod, cat.dataset.category)
      );
    });
  }
}

new Page();
