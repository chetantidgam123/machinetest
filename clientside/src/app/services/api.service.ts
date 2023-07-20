import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  navigate(arg0: string[]) {
    // throw new Error('Method not implemented.');
  }
  apiUrl: any = "http://localhost:3066/";
  constructor(
    private http: HttpClient
  ) {
    
  }

  // Login / Access Apis


  getProductsData() {
    return this.http.get(this.apiUrl + "products");
  }
  getProducById(id:any) {
    return this.http.get(this.apiUrl + "product/"+id);
  }
  getcart() {
    return this.http.get(this.apiUrl + "getcart");
  }
  addToCart(data:any) {
    return this.http.post(this.apiUrl + "addtocart",data);
  }
  updatecart(data:any,id:any) {
    return this.http.put(this.apiUrl + "updatecart/"+id,data);
  }
  removecart(id:any) {
    return this.http.delete(this.apiUrl + "removecart/"+id);
  }

 
}
