import axios from 'axios';
import React, { Component } from 'react'
import FormError from '../../Error/FormError';

export default class Editproduct extends Component {
    constructor(props){
        super(props);
        this.state={
            id_user:'',
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
            image:[],
            avatarCheckBox:[],
            Errorlist:{}
        }
        this.handleInputChange= this.handleInputChange.bind(this);
        this.renderCategory_list=this.renderCategory_list.bind(this);
        this.renderBrand_list=this.renderBrand_list.bind(this);
        this.handleSaleinput=this.handleSaleinput.bind(this);
        this.onSubmitAddproducts= this.onSubmitAddproducts.bind(this);
        this.handleInputFile=this.handleInputFile.bind(this);
        this.handleImg= this.handleImg.bind(this)
        
    }
    componentDidMount(){
        axios.get('http://localhost/laravel/public/api/category-brand')
        .then(res=>{
            this.setState({
                category_list: res.data.category,
                brand_list: res.data.brand
            })      
        })
        this.renderDatalist();
    }
    renderDatalist(){
        if (this.state.id) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            let url = 'http://localhost/laravel/public/api/user/product/' +this.state.id;
            let accessToken = userData.success.token;
            let config={
                headers: {                
                    'Authorization': 'Bearer '+ accessToken,                
                    'Content-Type': 'application/x-www-form-urlencoded',                
                    'Accept': 'application/json'
                    }
            }
            axios.get(url, config)
            .then(res =>{
                let dataProducts = res.data.data;
                this.setState({
                    name: dataProducts.name,
                    price:dataProducts.price,
                    category:dataProducts.id_category,
                    brand:dataProducts.id_brand,
                    status:dataProducts.status,
                    sale:dataProducts.sale,
                    image:dataProducts.image,
                    company:dataProducts.company_profile,
                    detail:dataProducts.detail,
                    id_user:dataProducts.id_user
                })
            })
            .catch(err => console.log(err))
            }
    }
    renderImg(){
        let imgList = this.state.image;
        if (imgList.length > 0) {
            return imgList.map((value)=>{
               return(
                   <div className="imgList">
                       <img src={'http://localhost/laravel/public/upload/user/product/'+this.state.id_user+'/'+value} alt="hinhanh" width="80"/>
                       <input type="checkbox" name={value} onChange={this.handleImg} />
                   </div>
               )
            })
        }
    }
    handleImg(e){
        if(e.target.checked == true){
            if(this.state.avatarCheckBox.indexOf(e.target.name) !== -1){
                console.log(this.state.avatarCheckBox)
            }else{
                this.state.avatarCheckBox.push(e.target.name)
                console.log(this.state.avatarCheckBox)
            }
        }else{
            let index = this.state.avatarCheckBox.indexOf(e.target.name);
            if(index > -1){
                this.state.avatarCheckBox.splice(index,1)
            }
            console.log(this.state.avatarCheckBox)
        }
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
        const dataImg = Array.from(file);
        if(dataImg.length > 3){
            alert("Vui lòng ngọn tối đa 3 hình")
        }else{
            this.setState({
                avatar: dataImg
            });   
        }
    
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
                let url = 'http://localhost/laravel/public/api/user/edit-product/'+ this.state.id;
                let accessToken = userData.success.token;
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
                    let avatarCheckBox = this.state.avatarCheckBox;
                    Object.keys(avatarCheckBox).map((item,i)=>{
                        formData.append("avatarCheckBox[]",avatar[item]);
                    })
                    let countAvatar = avatar.length;
                    let countImgcheck = avatarCheckBox.length;
                    let countImg = this.state.image.length - countImgcheck;
                    let SumcountofImg = countAvatar + countImg;
                    if(SumcountofImg > 3){
                        alert("Kiểm tra lại số lượng hình ảnh. Chỉ nhập tối đa 3 hình")
                    }else{
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
                                    alert("Sửa sản phẩm thành công")
                                    console.log(res.data)
                                }
                            }
                        )
                        .catch(err=>console.log(err))
                    }
            }
		}else{
			alert('Vui lòng đăng nhập')
		}
    }
    render() {
        return (
            <div>
                 <div class='col-sm-9'>
					<div class="signup-form" enctype="multipart/form-data">
						<h2>Edit Products !</h2>
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
                                    {this.state.avatar.length>0? <p>Chọn hình cần xóa:</p>:null}
                                    {this.renderImg()}
                                    <input type="text" name='company' placeholder="Company Profile" onChange={this.handleInputChange} value={this.state.company}/>
                                    <textarea name="detail" id="" cols="30" rows="10" placeholder="Details"
                                     value={this.state.detail}onChange={this.handleInputChange}></textarea>
                                    <button type="submit" class="btn btn-default">Update</button>
                        </form>
					</div>
            </div>
        </div>
        )
    }
}
