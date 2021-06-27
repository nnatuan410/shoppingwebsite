import React, { Component } from 'react'
import { BrowserRouter as Router,Link, Route , Switch } from 'react-router-dom';
export default class Menuleft extends Component {
    render() {
        return (
            <div class='account-panel col-sm-3'>
                <div class="panel-group category-products" id="accordian">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                        <Link to='/account/member'>
                                <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                                Account
                        </Link>
                        </h4>
                    </div>      
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <Link to='/account/product/list'>
                                <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                                Products
                            </Link>
                        </h4>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
