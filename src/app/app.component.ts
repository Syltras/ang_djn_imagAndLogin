import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdsService } from './prods.service';
import { computeMsgId } from '@angular/compiler';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  products: any = [];
  cart: any[] = [];

  constructor(private prod_srv: ProdsService, private auth: AuthService, private http: HttpClient) {
    this.prod_srv.getProducts().subscribe((data) => this.products = data);
  }

  add(desc: string, price: number) {
    // Create a FormData object to store the product details and image file
    const formData = new FormData();
    formData.append('desc', desc);
    formData.append('price', price.toString());
  
    // Add the selected file to the FormData
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    // Call the addProducts method in ProdsService with the FormData
    this.prod_srv.addProducts(formData).subscribe(res => console.log(res));
    this.prod_srv.getProducts().subscribe((data) => this.products = data);
  }

  del(id: number) {
    this.prod_srv.delProducts(id).subscribe((res) => console.log(res));
    this.prod_srv.getProducts().subscribe((data) => (this.products = data));
  }

  upd(desc: string, price: number, id: number) {
    // Create a FormData object to store the updated product details and image file
    const formData = new FormData();
    formData.append('desc', desc);
    formData.append('price', price.toString());
  
    // Add the selected file to the FormData
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    // Call the updProducts method in ProdsService with the FormData and product ID
    this.prod_srv.updProducts(formData, id).subscribe(res => console.log(res));
    this.prod_srv.getProducts().subscribe((data) => this.products = data);
  }
  

  Checkout() {
    this.auth.Checkout(this.cart).subscribe((res) => console.log(res));
  }

  login(user: string, pwd: string) {
    this.auth.login(user, pwd).subscribe((res) => localStorage.setItem("token", res.access));
  }

  buy(price: number, desc: string, id: number) {
    this.cart.push({ amount: 1, desc, price });
    console.log(this.cart);
  }

  selectedFile: File | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}
}
