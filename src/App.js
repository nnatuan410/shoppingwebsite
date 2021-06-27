import React, { Component } from 'react'

import { AppContext } from './components/contexts/AppContext'
import {withRouter} from 'react-router-dom';
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'


 class App extends Component {
  constructor(props){
    super(props)
      this.state={
        qtyCart: 0,
        qtyWishlist:0
      }
      this.handleLogin = this.handleLogin.bind(this);
      this.qtyCartcontextUp=this.qtyCartcontextUp.bind(this)
      this.qtyCartcontextDown=this.qtyCartcontextDown.bind(this)
      this.qtyWishlist = this.qtyWishlist.bind(this)
    }
    handleLogin(flag){
      localStorage.setItem('checkLogin',JSON.stringify(flag))
    }
    qtyCartcontextUp(){
      let qtyCart = JSON.parse(localStorage.getItem('qty'));
      if(qtyCart){
        this.setState({
          qtyCart: qtyCart+1
        })
        localStorage.setItem('qty',JSON.stringify(qtyCart+1))
      }else{
        this.setState({
          qtyCart: this.state.qtyCart+1
        })
        localStorage.setItem('qty',JSON.stringify(this.state.qtyCart+1))
      }
    }
    qtyCartcontextDown(flag){
      let qtyCart = JSON.parse(localStorage.getItem('qty'));
      if(qtyCart){
        this.setState({
          qtyCart: qtyCart-flag
        })
        localStorage.setItem('qty',JSON.stringify(qtyCart-flag))
      }else{
        this.setState({
          qtyCart: this.state.qtyCart-flag
        })
        localStorage.setItem('qty',JSON.stringify(this.state.qtyCart-flag))
      }
    }
    qtyWishlist(flag){
      console.log(flag)
      this.setState({
        qtyWishlist: flag
      })
      localStorage.setItem('qtyWishlist',JSON.stringify(flag))
    }
    render() {
      if(JSON.parse(localStorage.getItem('qty'))===0 || JSON.parse(localStorage.getItem('qtyWishlist'))===0){
        localStorage.removeItem('qty')
        localStorage.removeItem('qtyWishlist')
      }
      return (
        <div>
          <AppContext.Provider value={{
            state: this.state,
            handleLogin: this.handleLogin,
            qtyCartcontextUp: this.qtyCartcontextUp,
            qtyCartcontextDown: this.qtyCartcontextDown,
            qtyWishlist: this.qtyWishlist
            }}>
              <Header/>
                {this.props.children}
              <Footer/>
          </AppContext.Provider>
        </div>
      )
    }
  }
  export default  withRouter(App);