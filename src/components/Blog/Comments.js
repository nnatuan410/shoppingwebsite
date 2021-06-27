import axios from 'axios';
import React, { Component } from 'react'
import ListComment from './ListComment';

export default class Comments extends Component {
	constructor(props){
		super(props);
		this.state={
			idBlog: props.id,
			data: props.data,
			comment:'',
			listComment:[],
			idSubcmt: null
		}
	
		this.handleComment = this.handleComment.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.getidReply =this.getidReply.bind(this);
		this.renderComment = this.renderComment.bind(this)
	}
	componentDidMount(){
        axios.get('http://localhost/laravel/public/api/blog/detail/' +this.state.idBlog)
        .then(res =>{
            this.setState({
                listComment: res.data.data.comment
            })
        })
        .catch(err => console.log(err))
    }
	handleComment(e){
		this.setState({
			comment: e.target.value
		})
	}
	getidReply(id){
		console.log('lay id dc truyen tu List gán cho idSubcmt')
		this.setState({
			idSubcmt: id
		})
		//focus vao textfield khi an reply
		this.refs.comment.focus();
	}
	renderComment(){
        let dataComment = this.state.listComment;
		console.log(dataComment)
		if(dataComment.length>0){
			return(
				<ListComment comment={dataComment} getidReply={this.getidReply}/>
			)
		}
    }
	handleSubmitComment(e){
		if(	JSON.parse(localStorage.getItem('Checklogin'))===1)
		{
		e.preventDefault();
		const userData = JSON.parse(localStorage.getItem('userData'));
		let url = 'http://localhost/laravel/public/api/blog/comment/' + this.state.idBlog;
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
		let comment = this.state.comment

		if(comment){
			const formData = new FormData();                
			formData.append('id_blog', this.state.idBlog);                
			formData.append('id_user', userData.Auth.id);                
			formData.append('id_comment', this.state.idSubcmt ? this.state.idSubcmt : 0);                
			formData.append('comment', this.state.comment);                
			formData.append('image_user', userData.Auth.avatar);                
			formData.append('name_user', userData.Auth.name);          
			console.log(formData)
			axios.post(
				url, 
				formData
				, config
			)
			.then(res=>
				{	
					if(res.data.data){
						console.log(this.state.listComment)
						let newComment = res.data.data;
						this.state.listComment.push(newComment);
						console.log(this.state.listComment)
					
						this.setState({});

						let comment = this.refs.comment;
						comment.value = "";
					}
				}
			)
		}
		}else{
			alert('Vui lòng đăng nhập để bình luận')
		}
	}
    render() {
        return (
			<div>
				<div class="response-area">
					<h2>{this.state.listComment.length} RESPONSES</h2>
						<ul class="media-list">
						{this.renderComment()}
						</ul>					
				</div>
                <div class="replay-box">
						<div class="row">
							<div class="col-sm-12">
								<h2>Leave a replay</h2>
								<div class="text-area">
									<div class="blank-arrow">
										<label>Your Name</label>
									</div>
									<span>*</span>
									<form onSubmit={this.handleSubmitComment}>
									<textarea name="message" ref='comment' rows="11" onChange={this.handleComment}></textarea>
									<button type='submit' class="btn btn-primary">post comment</button>
									</form>
								</div>
							</div>
						</div>
					</div>
			</div>
    
        )
    }
}
