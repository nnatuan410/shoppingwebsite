import axios from 'axios';
import React, { Component } from 'react'

export default class Delete extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.id
        }
        this.handleDelete=this.handleDelete.bind(this)
    }
    refreshPage() {
        window.location.reload();
    }    
    handleDelete(){
        console.log(this.state.id)
        if (this.state.id) {
                console.log("id la "+this.state.id)
                const userData = JSON.parse(localStorage.getItem('userData'));
                let url = 'http://localhost/laravel/public/api/user/delete-product/' +this.state.id;
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
            
                axios.get(url, config)
                .then(res =>{
                    alert("đã xóa sản phẩm")
                    console.log(res.data.data);
                    this.refreshPage();
                })
                .catch(err => console.log(err))
                }
    }
    render() {
        return(
            <div>
                  <i class="far fa-trash-alt" onClick={this.handleDelete}/>
            </div>
        )
       
    }
}
