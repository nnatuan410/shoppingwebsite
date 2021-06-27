import axios from 'axios';
import React, { Component } from 'react'
import FormError from '../../Error/FormError';

export default class AddEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            id:props.match.params.id,
            name:'',
            price:null,
            category:null,
            brand:null,
            status:0,
            sale:0,
            avatar:[],
            company:'',
            detail:'',
            category_list:[],
            brand_list:[],
            Errorlist:{}
        }
        this.handleInputChange= this.handleInputChange.bind(this);
        this.renderCategory_list=this.renderCategory_list.bind(this);
        this.renderBrand_list=this.renderBrand_list.bind(this);
        this.handleSaleinput=this.handleSaleinput.bind(this);
        this.onSubmitAddproducts= this.onSubmitAddproducts.bind(this);
        this.ImgCheckValidate=this.ImgCheckValidate.bind(this);
        this.handleInputFile=this.handleInputFile.bind(this);
        
    }
    componentDidMount(){
    
        axios.get('http://localhost/laravel/public/api/category-brand')
        .then(res=>{
            console.log(res)
            this.setState({
                category_list: res.data.category,
                brand_list: res.data.brand
            })
            console.log(this.state.category_list)
            console.log(this.state.brand_list)
            console.log(this.state)
        })
       
    }
    
    renderCategory_list(){
        let category = this.state.category_list;
        if (category.length > 0) {
            return category.map((value)=>{
                return(    
                            <option value={value['id']}>{value['category']}</option> 
                )
            })
        }
    }
    renderBrand_list(){
        let brand = this.state.brand_list;
        if (brand.length > 0) {
            return brand.map((value)=>{
                return(    
                            <option value={value['id']}>{value['brand']}</option> 
                )
            })
        }
    }

    handleInputFile(e){
        const file = e.target.files;
        console.log(file)
        const dataImg = Array.from(file);
        console.log('dataimg')
        console.log(dataImg)
        Object.keys(dataImg).map((item,i)=>{
            let  matchArray = new Array();
            console.log(dataImg[item].name);
            let stringImg = dataImg[item].name;
            matchArray = stringImg.match(/jpg|jpeg|png/g)
            console.log(matchArray)
            if(!matchArray){
                alert("Vui lòng chọn định dạng ảnh jpg/jpeg/png")
                this.setState({
                    avatar:null,
                })
                return false;
            }
        })
       
        if(dataImg.length > 3){
            alert("Vui lòng ngọn tối đa 3 hình")
        }else{
        this.setState({
            avatar: dataImg
        });
        console.log(this.state.avatar)
        }  
        this.ImgCheckValidate();
    }
    ImgCheckValidate(){
        let  matchArray = new Array();
        let stringImg = this.state.avatar;
        console.log("stringimg")
        Object.keys(stringImg).map((item,i)=>{
            console.log(stringImg[item])
        })

    }
    handleSaleinput(){
        let status = this.state.status;
        if (status == 0) {
            return(
                <div >
                    <input className='saleinput col-sm-10' name='sale' type="text" width='150px' onChange={this.handleInputChange} value={this.state.sale}/>
                    <p className='col-sm-2'>%</p>
                </div>
            )
        }
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
           [name]: value
        });
    
    }
    onSubmitAddproducts(e){
        e.preventDefault();
        if(	JSON.parse(localStorage.getItem('Checklogin'))===1)
		{
		    let flag= true;
            let name = this.state.name;
            let price = this.state.price;
            let category = this.state.category;
            let brand = this.state.brand;
            let company = this.state.company;
            let detail = this.state.detail;
            let status = this.state.status;
            let sale = this.state.sale;
            let avatar = this.state.avatar;
            let Errorlist = this.state.Errorlist
            if(!name){
                flag = false;
                Errorlist.name = 'Name không được để trống'
            }
            if(!price){
                flag = false;
                Errorlist.price = 'price không được để trống'
            }
            if(!category){
                flag = false;
                Errorlist.category = 'category không được để trống'
            }
            if(!brand){
                flag = false;
                Errorlist.brand = 'brand không được để trống'
            }
            if(!company){
                flag = false;
                Errorlist.company = 'company không được để trống'
            }
            if(!detail){
                flag = false;
                Errorlist.detail = 'detail không được để trống'
            }
            if(!status){
                flag = false;
                Errorlist.status = 'status không được để trống'
            }
            if(!sale){
                flag = false;
                Errorlist.sale = 'sale không được để trống'
            }
            if(!avatar){
                flag = false;
                Errorlist.avatar = 'avatar không được để trống'
            }
            if(!flag){
                this.setState({
                    Errorlist: Errorlist
                })
            }else{
                const userData = JSON.parse(localStorage.getItem('userData'));
                let url = 'http://localhost/laravel/public/api/user/add-product';
                let accessToken = userData.success.token;
                console.log(accessToken)
                let config={
                    headers: {                
                        'Authorization': 'Bearer '+ accessToken,                
                        'Content-Type': 'multipart/form-data',                
                        'Accept': 'application/json'                
                        }           
                }
                    const formData = new FormData();                
                    formData.append('name', this.state.name);                
                    formData.append('price', this.state.price);                
                    formData.append('category', this.state.category);                
                    formData.append('brand', this.state.brand);                
                    formData.append('company', this.state.company);                
                    formData.append('detail', this.state.detail);          
                    formData.append('status', this.state.status);          
                    formData.append('sale', this.state.sale);
                    let avatar =  this.state.avatar;
                    Object.keys(avatar).map((item,i)=>{
                        formData.append("file[]",avatar[item]);
                    })
                    axios.post(
                        url, 
                        formData
                        , config
                    )
                    .then(res=>
                        {	
                            if(res.data.errors){
                                alert("Kiểm tra lại thông tin sản phẩm")
                            }else{
                                alert("Thêm sản phẩm thành công")
                                console.log(res.data)
                                this.props.history.push('/account/product/list');
                            }
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
					<div class="signup-form" enctype="multipart/form-data">
						<h2>Create Products !</h2>
                        <FormError Errorlist={this.state.Errorlist}/>
                        <form onSubmit={this.onSubmitAddproducts}>
                                    <input type="text" name='name' placeholder="Name" value={this.state.name} onChange={this.handleInputChange}/>
                                    <input type="number" name='price' placeholder="Price" value={this.state.price}onChange={this.handleInputChange}/>

                                    <select class="form-control" name='category' onChange={this.handleInputChange} value={this.state.category}>
                                        <option>please choose category</option>
                                        {this.renderCategory_list()}
                                    </select>

                                    <select class="form-control" name='brand' onChange={this.handleInputChange} value={this.state.brand}>
                                        <option>please choose brand</option>
                                        {this.renderBrand_list()}
                                    </select>
                                    <select class="form-control" name='status' onChange={this.handleInputChange} value={this.state.status}>
                                        <option >choose status</option>
                                        <option value={1}>New</option>
                                        <option value={0}>Sale</option>
                                    </select>
                                    {this.handleSaleinput()}
                                    <input type="file"  name='avatar' placeholder="Avatar" onChange={this.handleInputFile} multiple/>
                                    <input type="text" name='company' placeholder="Company Profile" onChange={this.handleInputChange} value={this.state.company}/>
                                    <textarea name="detail" id="" cols="30" rows="10" placeholder="Details"
                                     value={this.state.detail}onChange={this.handleInputChange}></textarea>
                                    <button type="submit" class="btn btn-default">Add</button>
                        </form>
					</div>
				</div>
        )
    }
}
