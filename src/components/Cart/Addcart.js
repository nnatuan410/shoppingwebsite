import axios from 'axios'
import React, { Component } from 'react';
import { AppContext } from '../contexts/AppContext';
import {withRouter} from 'react-router-dom';


const Product_list={};
class Addcart extends Component {
    static contextType = AppContext;
    constructor(props){
        super(props)
        this.state={
            id: props.id,
            qty: 1,
        }
        this.handleData=this.handleData.bind(this)
    }
    handleData(){
        let id = this.state.id;
        let qty = this.state.qty++;
        Product_list[id]=qty
        this.context.qtyCartcontextUp();
        localStorage.setItem('Product_list' , JSON.stringify(Product_list))
        axios.post("http://localhost/laravel/public/api/product/cart",Product_list)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>console.log(err))
    }
    render() {
        return (
            <>
                 <a onClick={this.handleData} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
            </>
        )
    }
}
export default  withRouter(Addcart);