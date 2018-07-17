
## Firebase / React / Electron Starter </h1>
An opinionated full desktop and web development suite.

![Alt text](docs/main.png?raw=true "App Page")
## Features

* ### React
    * Create-React-App
    * React-Router
    * Victory Charts

* ### Stripe (Requires companion server)
    * Subscription System
    * Manage cards on file.
* ### Electron 
    * Build for Mac & Windows using electron-build-tools.
    * IPC Messaging
    * Copy + Paste (Because it's not enabled by default 0.o)
* ### Firebase
    * Realtime Database      
    * Firebase Auth + Error Handling
* ### Sockets (Requires companion server)
    * Web Socket client support 
* ### Semantic-UI
    * Full access to the suite of react-semantic-ui components for UI work.

* ### Theming
    * Easy theme customization with semantic-ui and LESS.

## Installation 

#### Note: These instructions assume you have yarn installed if not, replace yarn with `npm`.

1. To install all dependencies run: `yarn install`

2. Run `yarn start`

A test account is made available under

    email: test@example.com
    password: example

## Configuration

To extend the starter project to fit your needs first start with a fresh firebase project to configure the authentication.

At the base minimum firebase needs to be configured with authentication to bypass the initial authentication screen.

* Edit `src/constants.js` to configure your API keys.


1. Setup firebase and replace the CONFIG object with your information. 
 
2. In the authentication tab on firebase enable Email/Password login.

3. Create an account via the app.

```
///// GENERAL /////
export const TITLE = "Company";

export const STRIPE_ENABLED = true;
export const AUTH_ENABLED = true;

///// DATABAESES /////
export const SOCKET_URL = "";

// Add your firebase configuration here. 
export const CONFIG = {
    
};

///// PUBLIC API KEYS /////

export const STRIPE_KEY = "";

export const GA_KEY = "";

```


### Theming
#### To replace the default theme:
Replace `semantic-ui.css` inside HTML with generated `semantic-ui.css` file inside public.

#### Building a custom theme:

### Using Stripe
Stripe requires a bit more set-up and the companion server to watch for subscription updates and payment changes.

### Firebase 


## Development

#### Web
To run a development server: `yarn start`

#### Electron
 To build the app for electron local run: `yarn build && yarn electron`

## Testing

`yarn test`

## Deployment

1. `yarn build`

### Hosting
Hosting is configured for base access with firebase. Run `firebase init` and select your desired project. `firebase deploy` will automatically upload the contents of the `/build` folder to your server.

If you're just deploying to web you can stop here. If you're creating an app binary continue on...

___

### Building Binaries

Assuming you've followed the first step.

2. `yarn pack`

#### MacOS .DMG

Builds .dmg and .app for distribution. Files from /build folder

3. a. `yarn dist-mac`

#### Windows .EXE

Builds .dmg and .app for distribution. Files from /build folder

3. b. `yarn dist-win`

## TODO:
* Add theming build directions.
* Add icon configuration
* Setup google analytics
* Configure + extend testing suite.
* Command-line tool? ;)
    * Auto generate icons.
* Componetize subscription system. Add payments?



