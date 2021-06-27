import axios from 'axios';
import React, { Component } from 'react'
import FormError from '../../Error/FormError';

export default class Update extends Component {
    constructor(props){
        super(props);
        this.state={
            user_id:'',
            name:'',
            email:'',
            phone:'',
            address:'',
            country:'',
            avatar:null,
            Errorlist:{}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.ImgCheckValidate= this.ImgCheckValidate.bind(this);
        this.handleInputFile= this.handleInputFile.bind(this);
        this.handleSubmitUpdate=this.handleSubmitUpdate.bind(this)
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
           [name]: value
        })
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
    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        const password = JSON.parse(localStorage.getItem('pw'));
        this.setState({
            user_id: userData.Auth.id,
            name: userData.Auth.name,
            email: userData.Auth.email,
            password: password,
            phone: userData.Auth.phone,
            address: userData.Auth.address,
            country: userData.Auth.country,
            avatar: userData.Auth.avatar
        })
    }
    handleSubmitUpdate(e){
        e.preventDefault();
        if(	JSON.parse(localStorage.getItem('checkLogin'))==true)
		{
            let flag = true;
            let name = this.state.name;
            let email = this.state.email;
            let phone = this.state.phone;
            let address = this.state.address;
            let country = this.state.country;
            let avatar = this.state.avatar;
            let Errorlist = this.state.Errorlist;
            if(!name){
                flag= false;
                Errorlist.name = 'Name không được để trống';
            }
            if(!email){
                flag= false;
                Errorlist.email = 'Email không được để trống';
            }
            if(!phone){
                flag= false;
                Errorlist.phone = 'Phone không được để trống';
            }
            if(!address){
                flag= false;
                Errorlist.address = 'Address không được để trống';
            }
            if(!country){
                flag= false;
                Errorlist.country = 'Country không được để trống';
            }
            if(!avatar){
                flag= false;
                Errorlist.avatar = 'Avatar không được để trống';
            }
            if(!flag){
                this.setState({
                    Errorlist: Errorlist
                })
            }else{
                const userData = JSON.parse(localStorage.getItem('userData'));
                let url = 'http://localhost/laravel/public/api/user/update/' + this.state.user_id;
                let accessToken = userData.success.token;
                let config={
                    headers: {                
                        'Authorization': 'Bearer '+ accessToken,                
                        'Content-Type': 'application/x-www-form-urlencoded',                
                        'Accept': 'application/json'                
                        }           
                }
                    const formData = new FormData();                
                    formData.append('name', this.state.name);                
                    formData.append('email', this.state.email);                
                    formData.append('password', this.state.password);                
                    formData.append('phone', this.state.phone);                
                    formData.append('address', this.state.address);                
                    formData.append('country', this.state.country);          
                    formData.append('avatar', this.state.avatar);          
                    console.log(formData)
                    axios.post(
                        url, 
                        formData
                        , config
                    )
                    .then(res=>
                        {	
                            alert('Update thành công')
                            window.location.reload();
                        }
                    )
                    .catch(err=>console.log(err))
            }
		}else{
			alert('Vui lòng đăng nhập')
		}
    }
    render() {
        return (
                <div class='col-sm-9'>
					<div class="signup-form">
						<h2>Update User !</h2>
                        <FormError Errorlist={this.state.Errorlist}/>
                        <form onSubmit={this.handleSubmitUpdate} >
                                    <input type="text" name='name' placeholder="Name"value={this.state.name} onChange={this.handleInputChange} />
                                    <input readOnly type="email" name='email' placeholder="Email Address"value={this.state.email} onChange={this.handleInputChange} />
                                    <input readOnly type="password" name='password' placeholder="Password" value={this.state.password}/>
                                    <input type="number" name='phone' placeholder="Phone" value={this.state.phone} onChange={this.handleInputChange}/>
                                    <input type="text" name='address' placeholder="Address" value={this.state.address} onChange={this.handleInputChange}/>
                                    <input type="text" name='country' placeholder="Country" value={this.state.country} onChange={this.handleInputChange}/>
                                    <input type="number" name='level' value={0} style={{display:'none'}} value={0}/>

                                   
                                   
                                    <label htmlFor="avatar">Upload Avatar :
                                    <input type="file" name='avatar' placeholder="Avatar" onChange={this.handleInputFile}/>
                                    {
                                        this.state.avatar?
                                        <img src={'http://localhost/laravel/public/upload/user/avatar/'+this.state.avatar} width='100'/>:
                                        null
                                    }
                                   
                                    </label>
                                    <button type="submit" class="btn btn-default">Update</button>
                        </form>
					</div>
				</div>
                                
        )
    }
}
