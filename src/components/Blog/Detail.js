import React, { Component } from 'react'
import axios from 'axios';
import Rate from './Rate';
import Comments from './Comments';
import ListComment from './ListComment';
import Leftsidebar from '../Layout/Left-sidebar';
import Imgsocial from '../Layout/images/blog/socials.png';
export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            data:[],
            comment:[]
        }
    }
    componentDidMount(){
        console.log("id la "+this.state.id)
        axios.get('http://localhost/laravel/public/api/blog/detail/' +this.state.id)
        .then(res =>{
            console.log(res.data);
            console.log(res.data.data.comment);
            this.setState({
                data: res.data.data ,
                comment: res.data.data.comment
            })
        })
        .catch(err => console.log(err))
    }
    renderData(){
        let {data} = this.state;
        console.log(data.title)
        return(
                            <div class="single-blog-post">
                                <h3>{data.title}</h3>
                                <div class="post-meta">
                                    <ul>
                                        <li><i class="fa fa-user"></i> Mac Doe</li>
                                        <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i class="fa fa-calendar"></i>{data.created_at}</li>
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
                                    <img src={"http://localhost/laravel/public/upload/Blog/image/"+data.image} alt=""/>
                                </a>
                                <p>
                                    {data.content}
                                </p> <br />
                                <div class="pager-area">
                                    <ul class="pager pull-right">
                                        <li><a href="#">Pre</a></li>
                                        <li><a href="#">Next</a></li>
                                    </ul>
                                </div>
                        </div>
        )
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
							</div>
							<Rate data={this.state.data} id={this.state.id}/>
							<div class="socials-share">
								<a href=""><img src={Imgsocial} alt="hinhanh"/></a>
							</div>
                            <Comments data={this.state.data} id={this.state.id}/>
						</div>	
					</div>
				</div>
            </section>
        )
    }
}
