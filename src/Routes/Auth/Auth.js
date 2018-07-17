import React, { Component } from 'react';
import LoginForm from './Login';

class Auth extends Component {

    constructor (props) {
        super(props)
        
    }
    
    render(){
        return (
        <div>
            <LoginForm />
        </div>
        );
    }
}

export default Auth