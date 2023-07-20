import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api:ApiService,private swal:SwalService) { }
productData:any =[]
cartData:any =[]
totalamount:number = 0
  ngOnInit(): void {
    this.getProductsData()
    this.getcart()
  }

  getProductsData(){
    this.api.getProductsData().subscribe((res:any)=>{
      this.productData = res
    },(err)=>{
      console.log(err)
    })
  }
  product:any={}
  getProducById(data:any){
    this.api.getProducById(data._id).subscribe((res:any)=>{
      this.product.title = res.data.title
      this.product.qty = res.data.qty
      this.product.price = res.data.price
      this.product.category = res.data.category
      this.product.description = res.data.description
      this.product.image = res.data.image
      console.log(this.product);
    },(err)=>{
      console.log(err)
    })
  }
  getcart(){
    this.api.getcart().subscribe((res:any)=>{
      this.cartData = res
      this.calculateFinalAmout()
    },(err)=>{
      console.log(err)
    })
  }
  addtoCart(data:any){
    let jbody:any = {
      ...data,
      qty:1
    }
    this.api.addToCart(jbody).subscribe((res:any)=>{
      if(res.code==200){
        this.swal.toast_success(res.message)
        this.getcart()
      }else{
        this.swal.toast_error(res.message)
      }
    },err=>{
      this.swal.toast_error(err.error.message)
    })
  }
  updatecart(data:any,type:any){
    if(type=='remove' && data.qty==1){
      this.removecart(data._id)
      return
    }
    let jbody:any = {
      ...data,
      qty:type=='add'?Number(data.qty)+1:data.qty-1
    }
    this.api.updatecart(jbody,data._id).subscribe((res:any)=>{
      if(res.code==200){
        this.getcart()
      }
    })
  }
  removecart(id:any){
    this.api.removecart(id).subscribe((res:any)=>{
      if(res.code==200){
        this.swal.toast_success(res.message)
        this.getcart()
      }
    })
  }

  calculateFinalAmout(){
    if(this.cartData.length>0){
      this.totalamount = this.cartData.reduce((acc:any,ele:any)=>{
        return acc+Number(ele.price*ele.qty)
      },0)
     
      
    }
  }

}
