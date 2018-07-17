import React, { Component } from 'react';

import { Label, Tab } from 'semantic-ui-react'
import { Button, Checkbox, Icon, Table, Grid, Dropdown, Menu, Segment, Sidebar, Header, Form, Input, Statistic, Modal, Accordion, Loader, Card, Image, List} from 'semantic-ui-react'

import firebase from 'firebase';


//////////// SOCKET.IO //////////
/*
import io from 'socket.io-client';

*/

import ProfileDropdown from '../../Profiles.js';

import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    let that = this;

    console.log(props);

    this.state = {
      loaded: false,
      visible: true,
      user: {},
      userLoaded: false
    }

    
    this.logs = [];

    this.database = firebase.database();

  }

  componentDidMount () {
    let that = this;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        that.setState({
          userID: uid
        })

        that.userRef = firebase.database().ref(`users/${uid}`);

        that.userRef.on('value', function (data) {

          that.setState({
            userLoaded: true,
            user: data.val()
          })
          console.log(that.state);
        });

      } else {
        // User is signed out.

        console.log("Account doesn't exist: signing in anon");
        that.props.history.push({
          pathname: '/login',
          state: {
            nav: true
          }
        });
      }
    });
  }

  toggleVisibility () {
    this.setState({ visible: !this.state.visible });
    console.log(this.state.visible);
  }
  
  render() {

    this.options = [];

    this.activePlan = '';

    this.visible = this.state.visible;

    return (
      <div className="App">

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          width="thin"
          direction='left'
          visible={this.visible}
          icon='labeled'
          vertical
          inverted
          className="draggable"> 

        <Menu.Item>
        <h3> Sidebar </h3>
        </Menu.Item>

        <List selection verticalAlign='middle' inverted divided>
          <List.Item>
            <Image avatar src='https://source.unsplash.com/random' />
            <List.Content float="right">
              <List.Header>Helen</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <Image avatar src='https://source.unsplash.com/random' />
            <List.Content float="right">
              <List.Header>James</List.Header>
            </List.Content>
          </List.Item>
        </List>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic className="fitted-window" textAlign='left'>
            <Menu fixed='top' borderless>
              <Menu.Item>
                <h3> Dashboard </h3>
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                  <ProfileDropdown user={this.state.user} router={this.props.history}/ >
                </Menu.Item>
              </Menu.Menu>
            </Menu>
            <Header> </Header>

            <Card.Group itemsPerRow={3}>
              <Card>
                <Image src='https://source.unsplash.com/random' />
                <Card.Content>
                  <Card.Header>
                    Matthew
                  </Card.Header>
                  <Card.Meta>
                  <span className='date'>
                    Joined in 2015
                  </span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                      22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Card.Group>

            <Menu fixed='bottom' borderless>
              <Menu.Item>
                Fixed Bottom Content
              </Menu.Item>
            </Menu>

          </Segment>
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    </div>
  );
  }
}

export default Home;
