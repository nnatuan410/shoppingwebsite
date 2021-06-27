import React, { Component } from 'react'
import { AppContext } from '../contexts/AppContext';
import LogoIMG from './images/home/logo.png'
import {withRouter,Link} from 'react-router-dom';

class Header extends Component {
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state={
            name:'',
            login: 0,
        }
    }
    handleLogout(){
        localStorage.clear();
    }
    renderLogin(){
        let isloggedin = JSON.parse(localStorage.getItem('checkLogin'));
        if(isloggedin){
            return (
                <li><Link to="/login" onClick={this.handleLogout}><i class="fa fa-lock"></i> Logout</Link></li>
            )
        }
        return (
            <li><Link to="/login"><i class="fa fa-lock"></i> Login</Link></li>
        )
    }
    renderAccount(){
        let isloggedin = JSON.parse(localStorage.getItem('checkLogin'));
        if(isloggedin){
            return (
                <li><Link to='/account/member'><i class="fa fa-user"></i>Account</Link></li>
            )
        }
                return (
                null
                )
    }
    renderWishlist(){
        let qtyWishlist = JSON.parse(localStorage.getItem('qtyWishlist'))
        if(qtyWishlist){
            return(
                <span>({qtyWishlist})</span>
            )
        }
    }
    rednerCountCart(){
        let qtyCart = JSON.parse(localStorage.getItem('qty'));
        console.log(qtyCart)
        if(qtyCart > 0){
            return(
                <span>({qtyCart})</span>
            )
        }
    }
    render() {
        return (
            <> 
            <header id="header">
            <div class="header_top">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="contactinfo">
                                <ul class="nav nav-pills">
                                    <li><a href=""><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
                                    <li><a href=""><i class="fa fa-envelope"></i> info@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="social-icons pull-right">
                                <ul class="nav navbar-nav">
                                    <li><a href=""><i class="fa fa-facebook"></i></a></li>
                                    <li><a href=""><i class="fa fa-twitter"></i></a></li>
                                    <li><a href=""><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                                    <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <div class="header-middle">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 clearfix">
                            <div class="logo pull-left">
                                <a href="index.html"><img src={LogoIMG} alt="logo" /></a>
                            </div>
                            <div class="btn-group pull-right clearfix">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                    
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="">Canada</a></li>
                                        <li><a href="">UK</a></li>
                                    </ul>
                                </div>
                                
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="">Canadian Dollar</a></li>
                                        <li><a href="">Pound</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 clearfix">
                            <div class="shop-menu clearfix pull-right">
                                <ul class="nav navbar-nav">
                                    {this.renderAccount()} 
                                    <li>
                                        <Link to='/wishlist'><i class="fa fa-star"></i> 
                                        Wishlist {this.renderWishlist()}
                                        </Link>
                                    </li>
                                    <li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>
                                    <li>
                                        <Link to='/cart'><i class="fa fa-shopping-cart"></i> 
                                        Cart {this.rednerCountCart()}
                                        </Link>
                                    </li>
                                    {this.renderLogin()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                            </div>
                            <div class="mainmenu pull-left">
                                <ul class="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to='/'>Home</Link></li>
                                    <li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
                                        <ul role="menu" class="sub-menu">
                                            <li><Link to='/product/list'>Products</Link></li>
                                            <li><Link to="/product/details/:id">Product Details</Link></li> 
                                            <li><a href="checkout.html">Checkout</a></li> 
                                            <li><a href="cart.html">Cart</a></li> 
                                            <li><a href="login.html">Login</a></li> 
                                        </ul>
                                    </li> 
                                    <li class="dropdown"><a href="#" class="active">Blog<i class="fa fa-angle-down"></i></a>
                                        <ul role="menu" class="sub-menu">
                                            <li><a href="blog/list" class="active">Blog List</a></li>
                                            <li><a href="blog-single.html">Blog Single</a></li>
                                        </ul>
                                    </li> 
                                    <li><a href="404.html">404</a></li>
                                    <li><a href="contact-us.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="search_box pull-right">
                                <input type="text" placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </header>
            </>
        )
    }
}
export default withRouter(Header);