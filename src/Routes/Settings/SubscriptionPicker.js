
// MyStoreCheckout.js
import React from 'react';
import { Button, Card, Image, List, Icon } from 'semantic-ui-react'

import firebase from 'firebase';

class SubscriptionPicker extends React.Component {
    constructor(props) {
        super(props);

        this.userRef = firebase.database().ref(`users/${this.props.user.uid}`);
        
    }

    selectPlan(plan) {
        console.log(plan);
        if(!this.props.user.hasCard) {
            console.log("handle no card before registering")
        } else {
            //Push new subscription to server
            if(this.props.user.activePlan.plan === plan) {
                console.log("plan is already the same");
            } else {
                this.userRef.child('choose-plan').remove();
                this.userRef.child('choose-plan').set(plan);
            }

            
        }

        //Check if user has card on file before setting.
    }


  render() {
    return (
        <Card.Group itemsPerRow={3}>
        <Card>
          <Card.Content>
            <Card.Header>
              Basic
            </Card.Header>
            <Card.Meta>

            </Card.Meta>
            <Card.Description>
            <List>
    <List.Item as='a'>
      <Icon name='help' />
      <List.Content>
        <List.Header>Floated Icon</List.Header>
        <List.Description>
          This text will always have a left margin to make sure it sits alongside your icon
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item as='a'>
      <Icon name='right triangle' />
      <List.Content>
        <List.Header>Icon Alignment</List.Header>
        <List.Description>
          Floated icons are by default top aligned. To have an icon top aligned try this example.
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
            <Button onClick={(e) => this.selectPlan('basic')} basic color='green' { ...( this.props.user.activePlan.plan === 'basic' && { disabled: true } ) }>
              { this.props.user.activePlan.plan === 'basic'
                ? "Current Plan"
                : "Select Plan"
            }</Button>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>
              Med
            </Card.Header>
            <Card.Meta>
                
            </Card.Meta>
            <Card.Description>
            <List>
    <List.Item as='a'>
      <Icon name='help' />
      <List.Content>
        <List.Header>Floated Icon</List.Header>
        <List.Description>
          This text will always have a left margin to make sure it sits alongside your icon
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item as='a'>
      <Icon name='right triangle' />
      <List.Content>
        <List.Header>Icon Alignment</List.Header>
        <List.Description>
          Floated icons are by default top aligned. To have an icon top aligned try this example.
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>Select Plan</Button>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>
              Pro
            </Card.Header>
            <Card.Meta>
                
            </Card.Meta>
            <Card.Description>
            <List>
    <List.Item as='a'>
      <Icon name='help' />
      <List.Content>
        <List.Header>Floated Icon</List.Header>
        <List.Description>
          This text will always have a left margin to make sure it sits alongside your icon
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item as='a'>
      <Icon name='right triangle' />
      <List.Content>
        <List.Header>Icon Alignment</List.Header>
        <List.Description>
          Floated icons are by default top aligned. To have an icon top aligned try this example.
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button onClick={(e) => this.selectPlan('pro')} basic color='green' { ...( this.props.user.activePlan.plan === 'pro' && { disabled: true } ) }>
              { this.props.user.activePlan.plan === 'pro'
                ? "Current Plan"
                : "Select Plan"
            }</Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
        
        
    );
  }
}

export default SubscriptionPicker;

