import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.renderProductGrid();
  }

  renderProductGrid() {
    this.elem = createElement(`
    <div class="products-grid">
  <div class="products-grid__inner">
    <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
  </div>
</div>
    `);
    this.createProductCard(this.products);
  }

  createProductCard(products) {
    const productsGridInner = this.elem.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = '';

    products.forEach((element) => {
      productsGridInner.append(new ProductCard(element).elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const products = this.products.filter((product) => {
      if (this.filters.noNuts && product.nuts) return false;

      if (this.filters.vegeterianOnly && !product.vegeterian) return false;

      if (this.filters.maxSpiciness < product.spiciness) return false;

      if (this.filters.category && product.category != this.filters.category) return false;

      return true;
    });

    this.createProductCard(products);
  }
}
