import React from 'react';
import './sign-in.style.scss'
import FromInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''

        }

    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({email:'',password:''})
        const {email,password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({ email:'' ,password:''})
        }
        catch(err){
            console.log(err);
        }
    }

    handleChange = event => {
        
        const {name , value} = event.target;
        this.setState({[name]:value});

    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FromInput handleChange={this.handleChange} name='email' type='email' label='email' value={this.state.email} required />
                    <FromInput handleChange={this.handleChange}  name='password' type='password' label='password' value={this.state.password} required/>
                    <div className='buttons'>

                        <CustomButton type='submit' value='Submit form'> SIGN IN</CustomButton>
                        <CustomButton type='submit' value='Submit form'onClick={signInWithGoogle} isGoogleSignIn > SIGN IN WITH GOOGLE </CustomButton>
                    </div>
                </form>
               
            </div>
        )
    }
};

export default SignIn;

