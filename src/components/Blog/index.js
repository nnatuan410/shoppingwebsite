import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Leftsidebar from '../Layout/Left-sidebar';

export default class Blog extends Component {
    constructor(props){
        super(props);
        this.state={
            data: [],
        }
    }
    componentDidMount(){
        axios.get('http://localhost/laravel/public/api/blog')
        .then(res =>{
            console.log(res.data.blog);
            this.setState({
                data: res.data.blog.data
            })
        })
        .catch(err => console.log(err))
    }
    renderData(){
        let {data} = this.state;
        if(data.length > 0){
                return data.map((value,key)=>{
                    return (
                            <div class="single-blog-post">
								<h3>{value['title']}</h3>
								<div class="post-meta">
									<ul>
										<li><i class="fa fa-user"></i> Mac Doe</li>
										<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
										<li><i class="fa fa-calendar"></i>{value['created_at']}</li>
									</ul>
									<span>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star-half-o"></i>
									</span>
								</div>
								<a href="">
									<img src={'http://localhost/laravel/public/upload/Blog/image/'+ value['image']} alt=""/>
								</a>
								<p>{value['description']}</p>
								<Link  class="btn btn-primary" to={"/blog/detail/"+value['id']} id={value['id']} >Read More</Link>
								{console.log(value['id'])}
							</div>
                    )
                })
        }
    }
    render() {
        return (
            <section>
            <div class="container">
			<div class="row">
				<div class="col-sm-3">
					<Leftsidebar/>
				</div>
				<div class="col-sm-9">
					<div class="blog-post-area">
						<h2 class="title text-center">Latest From our Blog</h2>

						{this.renderData()}
						
						<div class="pagination-area">
							<ul class="pagination">
								<li><a href="" class="active">1</a></li>
								<li><a href="">2</a></li>
								<li><a href="">3</a></li>
								<li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		    </div>
            </section>

        )
    }
}
