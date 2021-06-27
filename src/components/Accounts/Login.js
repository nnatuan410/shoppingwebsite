import axios from 'axios';
import React, { Component } from 'react'
import { AppContext } from '../contexts/AppContext';
import FormError from '../Error/FormError';
import Register from './Register';
export default class Login extends Component {
    static contextType = AppContext;
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            level:0,
            Errorlist:{},
        }
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
           [name]: value
        })
    }
    handleSubmitLogin(e){
        e.preventDefault();
        let flag = true;
        let email = this.state.email;
        let password = this.state.password;
        let Errorlist = this.state.Errorlist;
        if(!email){
            flag = false;
            Errorlist.email = 'Vui lòng nhập Email'
        }
        if(!password){
            flag = false;
            Errorlist.password = 'Vui lòng nhập Password'
        }
        if(!flag){
            this.setState({
                Errorlist: Errorlist
            })
        }else{
            const user ={
                email: this.state.email,
                password: this.state.password,
                level: this.state.level
            }
            axios.post('http://localhost/laravel/public/api/login',user)
            .then(res=>{
                console.log(res)
                if(res.data.Auth){
                     let userData = JSON.stringify(res.data)
                     localStorage.setItem('userData',userData)
                     localStorage.setItem('pw',this.state.password)
                    //  localStorage.setItem('Checklogin',1)
                     //alert(res.data.response);
                     this.context.handleLogin(true);
                     
                     this.props.history.push('/');
                     
                     
                }else{
                   this.setState({
                        Errorlist: res.data.errors
                   })
                }
            })
            .catch(err=> {
                console.log(err)
            })
        }
    }
    render() {
        return (
                <section id="form">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-4 col-sm-offset-1">
                            <div class="login-form">
                                <h2>Login to your account</h2>
                                <form onSubmit={this.handleSubmitLogin}>
                                    <input type="email" name='email' placeholder="Email Address" onChange={this.handleInputChange}/>
                                    <input type="password" name='password' placeholder="Password" onChange={this.handleInputChange}/>
                                    <span>
                                        <input type="checkbox" class="checkbox"/> 
                                        Keep me signed in
                                    </span>
                                    <button type="submit" class="btn btn-default" >Login</button>
                                </form>
                                <FormError Errorlist={this.state.Errorlist}/>
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <h2 class="or">OR</h2>
                        </div>
                        <div class="col-sm-4">
                            <div class="signup-form">
                                <h2>New User Signup!</h2>
                                <Register/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
