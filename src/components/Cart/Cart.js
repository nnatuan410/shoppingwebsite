import axios from 'axios';
import React, { Component } from 'react'
import { AppContext } from '../contexts/AppContext';
export default class Cart extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state={
            Product_list:null,
            data:[],
            qty:1
        }
        this.renderCart=this.renderCart.bind(this);
        this.deleletCart=this.deleletCart.bind(this);
        this.handlequantity_up=this.handlequantity_up.bind(this);
        this.handlequantity_down = this.handlequantity_down.bind(this)
    }
   componentDidMount(){
    let Product_list = localStorage.getItem('Product_list');
    let getData = JSON.parse(Product_list);
    if(getData){
        axios.post("http://localhost/laravel/public/api/product/cart",getData)
        .then(res=>{
            console.log(res)
            this.setState({
                data: res.data.data,
                Product_list: getData
            })
        })
        .catch(err=>console.log(err))
    }
   }
   deleletCart(e){
        let id = e.target.id;
        let data = this.state.data;
        let key = data[id].id;
        let qty = data[id].qty;
        let Product_list = this.state.Product_list;
        delete Product_list[key]
        delete data[id];
        this.setState({
            data: data,
            Product_list: Product_list
        })
        this.context.qtyCartcontextDown(qty)
        localStorage.setItem('Product_list', JSON.stringify(Product_list) )
   }
   handlequantity_up(e){
        let Product_list = this.state.Product_list;
        let id = e.target.id;
        let data = this.state.data;
        Product_list[data[id].id] +=1;
        data[id].qty += 1;
        this.setState({
            data: data,
            Product_list: Product_list
        })
        this.context.qtyCartcontextUp()
        localStorage.setItem('Product_list', JSON.stringify(Product_list))
   }
   handlequantity_down(e){
        let Product_list = this.state.Product_list;
        let id = e.target.id;
        let data = this.state.data;
        if(data[id].qty === 1){
            data[id].qty = 1
            this.setState({
                data: data
            })
        }else{
            Product_list[data[id].id] -=1;
            data[id].qty -= 1;
            this.setState({
                data: data,
                Product_list: Product_list
            })
            this.context.qtyCartcontextDown(1)
            localStorage.setItem('Product_list', JSON.stringify(Product_list) )
        }
    }
    renderCart(){
        let data = this.state.data;
        if(data.length > 0){
            return data.map((value, key)=>{
                let qty = value.qty;
                let id_user = value.id_user;
                let imgProduct= value.image;
                let imglist = new Array();
                imglist =  imgProduct;
                let replace1 = imglist.replace(']','');
                let replace2 = replace1.replace('[','');
                let imgdata = JSON.parse("["+replace2+"]");
                return(
                    <tr>
                        <td class="cart_product">
                            <a href=""><img src={'http://localhost/laravel/public/upload/user/product/'+id_user+'/'+imgdata[0]} width="150" alt=""/></a>
                        </td>
                        <td class="cart_description">
                            <h4><a href="">{value['name']}</a></h4>
                            <p>Web ID: 1089772</p>
                        </td>
                        <td class="cart_price">
                            <p>${value['price']}</p>
                        </td>
                        <td class="cart_quantity">
                            <div class="cart_quantity_button">
                                <a class="cart_quantity_up"  
                                onClick={this.handlequantity_up} id={key}
                                > + </a>
                                <input class="cart_quantity_input" type="text" name="qty"
                                value={qty} autocomplete="off" size="2" />
                                <a class="cart_quantity_down" 
                                onClick={this.handlequantity_down} id={key}
                                > - </a>
                            </div>
                        </td>
                        <td class="cart_total">
                            <p class="cart_total_price">${ value['price'] * qty }</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" ><i class="fa fa-times" id={key}
                            onClick={this.deleletCart} ></i></a>
                        </td>
                    </tr>
                )
            })
        }
    }
    render() {
        return (
            <>
                <section id="cart_items">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li class="active">Shopping Cart</li>
                            </ol>
                        </div>
                        <div class="table-responsive cart_info">
                            <table class="table table-condensed">
                                <thead>
                                    <tr class="cart_menu">
                                        <td class="image">Item</td>
                                        <td class="description"></td>
                                        <td class="price">Price</td>
                                        <td class="quantity">Quantity</td>
                                        <td class="total">Total</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCart()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section id="do_action">
                    <div class="container">
                        <div class="heading">
                            <h3>What would you like to do next?</h3>
                            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="chose_area">
                                    <ul class="user_option">
                                        <li>
                                            <input type="checkbox"/>
                                            <label>Use Coupon Code</label>
                                        </li>
                                        <li>
                                            <input type="checkbox"/>
                                            <label>Use Gift Voucher</label>
                                        </li>
                                        <li>
                                            <input type="checkbox"/>
                                            <label>Estimate Shipping & Taxes</label>
                                        </li>
                                    </ul>
                                    <ul class="user_info">
                                        <li class="single_field">
                                            <label>Country:</label>
                                            <select>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                            
                                        </li>
                                        <li class="single_field">
                                            <label>Region / State:</label>
                                            <select>
                                                <option>Select</option>
                                                <option>Dhaka</option>
                                                <option>London</option>
                                                <option>Dillih</option>
                                                <option>Lahore</option>
                                                <option>Alaska</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        
                                        </li>
                                        <li class="single_field zip-field">
                                            <label>Zip Code:</label>
                                            <input type="text"/>
                                        </li>
                                    </ul>
                                    <a class="btn btn-default update" href="">Get Quotes</a>
                                    <a class="btn btn-default check_out" href="">Continue</a>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="total_area">
                                    <ul>
                                        <li>Cart Sub Total <span>$59</span></li>
                                        <li>Eco Tax <span>$2</span></li>
                                        <li>Shipping Cost <span>Free</span></li>
                                        <li>Total <span>$61</span></li>
                                    </ul>
                                        <a class="btn btn-default update" href="">Update</a>
                                        <a class="btn btn-default check_out" href="">Check Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
