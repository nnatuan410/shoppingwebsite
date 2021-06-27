import React, { Component } from 'react'
import { BrowserRouter as Router,Link, Route , Switch } from 'react-router-dom';
import App from './App'
import Product from './Product/List'
import Updates from './Member/Update'
import AddEdit from './Product/AddEdit';
import Editproduct from './Product/Editproduct';
import Delete from './Product/Delete';


export default class index extends Component {
    render() {
        return (
           <App>
               <Switch>
                    <Route path='/account/member'component={Updates}/>
                    <Route path='/account/product/list'component={Product}/>
                   <Route path='/account/product/add-edit/:id?'component={AddEdit}/>
                   <Route path='/account/product/edit/:id?'component={Editproduct}/>
                   <Route path='/account/product/delete/:id?'component={Delete}/>
               </Switch>
           </App>
        )
    }
}
