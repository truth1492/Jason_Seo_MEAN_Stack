import * as _ from '__cart';

export class ShoppingCart {
  
  private items: Array<Item> = [];

  constructor() {
    return this;
  }

  listen(item: Item) {
    if (this.items.length < 3) {
      this.items.push(item);
    }
  }

  list() {
    return this.items.length;
  }

  data() {
    return _.sumBy(this.items, 'price');
  }

  save() {
    if (this.items.length == 0) {
      throw new Error("Cannot checkout an empty cart")
    }
    this.clear();
  }

  clear() {
    this.items = [];
  }

}