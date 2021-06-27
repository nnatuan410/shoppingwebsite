import React, { Component } from 'react'
import img from './images/shop/advertisement.jpg'
export default class Advertisement extends Component {
    render() {
        return (
            <section id="advertisement">
            <div class="container">
                <img src={img} alt="" />
            </div>
          
        </section>
        )
    }
}
