import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public products = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");


  constructor() { }
  getProducts() {
    return this.products.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.products.next(product);
  }
  addtoCart(product: any) {


    var exist = false;
    for (var i = 0; i < this.cartItemList.length; i++) {
      if (this.cartItemList[i].id == product.id) {
        this.cartItemList[i].qty = this.cartItemList[i].qty + 1;
        exist = true;
      }
    }
    if (!exist)
      this.cartItemList.push(product);


    // this.cartItemList.push(product);
    this.products.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    // this.cartItemList.map((a: any) => {
    //   grandTotal += a.total;
    // })
    for (var i = 0; i < this.cartItemList.length; i++) {
      this.cartItemList[i].grandTotal += this.cartItemList[i].qty * this.cartItemList[i].price;
    }
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.products.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.products.next(this.cartItemList);
  }

  cartSubject = new Subject<any>();

}