import React, { Component } from 'react'
import Menuleft from './Menuleft'

export default class App extends Component {

    render() {
        return (
            <div className='container'>
                <Menuleft/>
                {this.props.children}
            </div>
        )
    }
}
