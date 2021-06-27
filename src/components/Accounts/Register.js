import axios from 'axios';
import React, { Component } from 'react';
import FormError from '../Error/FormError';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            phone:'',
            address:'',
            country:'',
            level:0,
            avatar:null,
            file:null,
            Errorlist:{}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleInputFile = this.handleInputFile.bind(this);
        this.ImgCheckValidate = this.ImgCheckValidate.bind(this)
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
           [name]: value
        });
    }
    ImgCheckValidate(){
        let sizeImg = this.state.file.size;
        let sizeCheck = sizeImg > 1024*1024;
        let  matchArray = new Array();
        let stringImg = this.state.file.type;
        matchArray = stringImg.match(/jpg|jpeg|png/g)
        if(!matchArray || sizeCheck){
            alert("Vui lòng chọn định dạng ảnh jpg/jpeg/png và có kích thước nhỏ hơn 1mb(1024*1024) !")
            this.setState({
                avatar:null,
                file:null
            })
            return false;
        }
    }
    handleInputFile(e){
            const file = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = (e) =>{
                this.setState({
                    avatar: e.target.result,
                    file: file[0]
                });
                this.ImgCheckValidate();
            }
    }

    handleSubmitRegister(e){
        e.preventDefault();   
        let flag = true;
        let name= this.state.email;
        let password= this.state.password;
        let phone= this.state.phone;
        let address= this.state.address;
        let country= this.state.country;
        let avatar= this.state.avatar;
        let Errorlist = this.state.Errorlist;
        if(!name){
            flag=false;
            Errorlist.name ='Vui lòng nhập tên';
        }
        if(!password){
            flag=false;
            Errorlist.password ='Vui lòng nhập password';
        }
        if(!phone){
            flag=false;
            Errorlist.phone ='Vui lòng nhập phone';
        }
        if(!address){
            flag=false;
            Errorlist.address ='Vui lòng nhập address';
        }
        if(!country){
            flag=false;
            Errorlist.country ='Vui lòng nhập country';
        }
        if(!avatar){
            flag=false;
            Errorlist.avatar ='Vui lòng nhập avatar';
        }
        if(!flag){
            this.setState({
                Errorlist: Errorlist
            })
        }else{
            const user ={
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                address: this.state.address,
                country: this.state.country,
                level: this.state.level,
                avatar: this.state.avatar
            };
            console.log(user)  
            axios.post('http://localhost/laravel/public/api/register', user)
            .then(res=>{
                if(res.data.data){
                    alert('Đăng Kí Thành Công !')
                }else{
                    this.setState({
                        Errorlist: res.data.errors
                    })
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }
    render() {
        return (                
                <>
                    <FormError Errorlist={this.state.Errorlist}/>
                    <form onSubmit={this.handleSubmitRegister}>
                        <input type="text" name='name' placeholder="Name" value={this.state.name} onChange={this.handleInputChange}/>
                        <input type="email" name='email' placeholder="Email Address" value={this.state.email} onChange={this.handleInputChange}/>
                        <input type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                        <input type="number" name='phone' placeholder="Phone" value={this.state.phone} onChange={this.handleInputChange}/>
                        <input type="text" name='address' placeholder="Address" value={this.state.address} onChange={this.handleInputChange}/>
                        <input type="text" name='country' placeholder="Country" value={this.state.country} onChange=    {this.handleInputChange}/>
                        <input type="number" name='level' value={0} style={{display:'none'}} value={0}/>
                        <label htmlFor="avatar">Upload Avatar :
                            <input type="file" name='avatar' placeholder="Avatar" onChange={this.handleInputFile}/>
                        </label>
                        <button type="submit" class="btn btn-default">Signup</button>
                    </form>
                </> 
        )
    }
}
