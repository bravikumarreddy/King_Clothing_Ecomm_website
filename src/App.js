import React from 'react';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {Route,Switch} from 'react-router-dom';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import './pages/homepage/homepage.component';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state ={
      currentUser:null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapShot => {
          this.setState({
            currentUser:{
              id: snapShot.uid,
              ...snapShot.data()
            }
          });
        });
      }
        
      this.setState({ currentUser:userAuth })
      
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  



  render(){
    return(
      <div>
        <Header currentUser={this.state.currentUser} ></Header>
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route exact path='/shop' component={ShopPage}></Route>
          <Route exact path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
    </div>
    )
  }
    
}

export default App; 
