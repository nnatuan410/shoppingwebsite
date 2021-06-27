import axios from 'axios';
import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import Delete from './Delete';
export default class List extends Component {
    constructor(props){
        super(props);
        this.state={
            id:null,
            user_id:'',
            data:[]
        }
    }
    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
		let url = 'http://localhost/laravel/public/api/user/my-product';
		console.log(url)
		let accessToken = userData.success.token;
		console.log(accessToken)
		let config={
			headers: {                
				'Authorization': 'Bearer '+ accessToken,                
				'Content-Type': 'application/x-www-form-urlencoded',                
				'Accept': 'application/json'
				}
		}
			axios.get(
				url, config
			)
			.then(res=>
				{	
                   console.log(res.data.data)
                    this.setState({
                        data: res.data.data,
                        user_id: userData.Auth.id
                    })
				}
			)
            .catch(err=>console.log(err))
    }
    rederDataProduct(){
        let {data} = this.state;
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((key)=>{
                let dataproduct = data[key];           
                let img = JSON.parse(dataproduct['image']);
                return(
                    <tr>
                        <th scope="row" >{dataproduct['id']}</th>
                        <td>{dataproduct['name']}</td>
                        <td><img src={'http://localhost/laravel/public/upload/user/product/' + this.state.user_id + '/' + img[0]  } alt="hinhanh" width='150' height='150' /></td>
                        <td>{dataproduct['price']}</td>
                        <td>
                            <Link to={"/account/product/edit/"+dataproduct['id']} id={dataproduct['id']}>
                            <i class="far fa-sticky-note"></i>
                            </Link>
                        </td>
                        <td>
                            <Delete id={dataproduct.id}/>
                        </td>
                    </tr>
                )
            })
        }
    }
    render() {
        return (   
            <div className='container col-sm-9'>
                <table className="table table-dark ">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.rederDataProduct()}
                    </tbody>
                </table>
                <Link to="/account/product/add-edit/:id?">
                <button type="button" className="btn btn-primary">Add Product</button>
                </Link>
            </div>
        )
    }
}
