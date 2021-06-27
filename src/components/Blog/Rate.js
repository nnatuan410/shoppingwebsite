import axios from 'axios';
import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

export default class Rate extends Component {
	constructor(props){
		super(props);
		this.state = {
			rating:0,
			blog_id:props.id,
			NumberofRates:null
		}
		this.changeRating=this.changeRating.bind(this);
	}
	componentDidMount(){
		axios.get('http://localhost/laravel/public/api/blog/rate/' +this.state.blog_id)
        .then(res =>{
			console.log('rate')
			console.log(res.data.data)
			let Rating=res.data.data;
			console.log(Rating.length)
			let sum = Rating.reduce((a,v) =>  a = a + v.rate , 0 );
			let NumberofRates = Rating.length;
			let aggregateRating = sum / NumberofRates;
		
			this.setState({
				rating: aggregateRating,
				NumberofRates: NumberofRates
			})
        })
        .catch(err => console.log(err))
	}
	changeRating( newRating, name ) {
		if(JSON.parse(localStorage.getItem('Checklogin'))===1){
			this.setState({
				rating: newRating
			});
			const userData = JSON.parse(localStorage.getItem('userData'));
			let url = 'http://localhost/laravel/public/api/blog/rate/' + this.state.blog_id;
			let accessToken = userData.success.token;
			let config={
				headers: {                
					'Authorization': 'Bearer '+ accessToken,                
					'Content-Type': 'application/x-www-form-urlencoded',                
					'Accept': 'application/json'                
					}           
			}
				const formRate=new FormData();
				formRate.append('user_id',userData.Auth.id);
				formRate.append('blog_id',this.state.blog_id);
				formRate.append('rate',newRating);

				axios.post(url,formRate,config)
				.then(res=>{
					console.log(res)
					alert('Bạn đã đánh giá '+ newRating +" sao cho bài viết này")
				})
				.catch(err=>console.log(err))
		
			
		}else{
			alert('Vui lòng đăng nhập để đánh giá')
		}
	  }
    render() {
        return (
                <div class="rating-area">
						<ul class="ratings">
							<li class="rate-this">Rate this item:</li>
							<li>
								<StarRatings 
									changeRating={this.changeRating}
									rating={this.state.rating}
									starRatedColor="orange"
									numberOfStars={5}
									name='rating'
								/>
							</li>
							<li class="color">({this.state.NumberofRates} vote)</li>
						</ul>
						<ul class="tag">
							<li>TAG:</li>
							<li><a class="color" href="">Pink <span>/</span></a></li>
							<li><a class="color" href="">T-Shirt <span>/</span></a></li>
							<li><a class="color" href="">Girls</a></li>
						</ul>
					</div>
    
        )
    }
}
