
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import firebase from 'firebase';

import logo from '../../logo.svg';


class LoginForm extends Component {

    constructor (props) {
          super(props)

          this.state = {email: '', pass: '', errorMessage: ''}

          let that = this;
          
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);


        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            console.log(user);
            that.props.history.push({pathname: '/', state: { nav: true }});
            // ...
          } else {
            // User is signed out.
            // ...
          }
        });
    }

    forgotPassword() {
      
    }

    handleLogin(event) {
      let that = this;
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error);
        that.setState({errorMessage: error.message});
        // ...
      });
      

    }

    handleChange (event) {
      console.log(event);
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      console.log(event);
  
      this.setState({
        [name]: value
      });

      console.log(this.state, this.props);
    }
    
    render(){
        return (
          <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
        align-content: center;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
      <center>
      <Image src={logo} className="App-logo" />
      </center>
        <Header as='h2' color='teal' textAlign='center'>
          
          {' '}Log-in to your account
        </Header>
        { this.state.errorMessage && 
        <Message negative>
        <Message.Header>We hit a snag logging you in:</Message.Header>
        <p> {this.state.errorMessage } </p>
        </Message>
        }
        <Form size='large' onSubmit={this.handleLogin}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name="email"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="pass"
              onChange={this.handleChange}
            />

            <Button type="submit" color='teal' fluid size='large'>Login</Button>
            <br />
            <p> <a href="#"> Forgot your password? </a> </p>
          </Segment>

        </Form>
        <Segment>
          New to us? <Link to="/register">Sign Up</Link>
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
        );
    }
}

export default LoginForm
