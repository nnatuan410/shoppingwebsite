import React, { Component } from 'react'

const pStyle={
    color: 'red'
}
export default class FormError extends Component {
    constructor(props){
        super(props);
    }
    renderFormError(){
        let FormError = this.props.Errorlist;
        if(Object.keys(FormError).length > 0) {
            return Object.keys(FormError).map((value,i)=>{
               
                return(
                    <p style={pStyle} key={i}>{FormError[value]}</p>
                )
                
            })
        } 
    }
    render() {
        return (
            <div>
                {this.renderFormError()}
            </div>
        )
    }
}
