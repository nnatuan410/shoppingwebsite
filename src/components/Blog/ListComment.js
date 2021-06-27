import React, { Component } from 'react'

export default class ListComment extends Component {
    constructor(props){
        super(props);
        this.state={
            comment: props.comment,
        }
        console.log(this.state.comment)
        this.handleReply = this.handleReply.bind(this);
        this.renderSubComment = this.renderSubComment.bind(this);
    }
    handleReply(e){
        console.log('lay id cua Listcmt truyen vao Comment')
        let id = e.target.id
        //truyen id cmt vao Comment component
        this.props.getidReply(id);
    }
    renderSubComment(id,dataComment){
        console.log('kiemtra neu co cmt con thi render ra')
        console.log(dataComment)
        if (dataComment){
            return dataComment.map((value)=>{
                let idSupComment = value['id_comment'];
                if (idSupComment==id) {
                    return(
                        <li class="media second-media">
                                    <a class="pull-left" href="#">
                                    <img class="media-object" 
                                            src={'http://localhost/laravel/public/upload/user/avatar/'+ value['image_user']} 
                                            alt="hinhanh"/>
                                    </a>
                                    <div class="media-body">
                                        <ul class="sinlge-post-meta">
                                            <li><i class="fa fa-user"></i>{value['name_user']}</li>
                                            <li><i class="fa fa-clock-o"></i>{value['created_at']}</li>
                                            <li><i class="fa fa-calendar"></i>{value['created_at']}</li>
                                        </ul>
                                        <p>{value['comment']}</p>
                                        <a class="btn btn-primary" id={value['id']} onClick={this.handleReply}><i class="fa fa-reply"></i>Replay</a>
                                    </div>
                            </li>
                    )
                }
            })
        }
    }
    render() {
        const dataComment = this.state.comment;
        console.log(dataComment)
        if(dataComment){
            return dataComment.map((value)=>{
                console.log('renderListcmt')
                let id= value['id']
                let idComment = value['id_comment'];
                if(idComment==0){
                    return(
                        <section>
                            <li class="media">				
                                <a class="pull-left" href="#">
                                    <img class="media-object" 
                                            src={'http://localhost/laravel/public/upload/user/avatar/'+ value['image_user']} 
                                            alt="hinhanh"/>
                                </a>
                                <div class="media-body">
                                    <ul class="sinlge-post-meta">
                                        <li><i class="fa fa-user"></i>{value['name_user']}</li>
                                        <li><i class="fa fa-clock-o"></i>{value['created_at']}</li>
                                        <li><i class="fa fa-calendar"></i>{value['created_at']}</li>
                                    </ul>
                                    <p>{value['comment']}</p>
                                    <a class="btn btn-primary" id={value['id']} onClick={this.handleReply}><i class="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>
                            {this.renderSubComment(id,dataComment)}
                        </section>
                    )
                }
            })
        }
    }
}
