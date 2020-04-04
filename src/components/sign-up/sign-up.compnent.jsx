import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();
        
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }
    handleSubmit = async event =>{
        const {displayName,email,password,confirmPassword} = this.state;
        if(password !== confirmPassword ){
            alert("Passwords don't match");
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDocument(user,{displayName});

            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            });
        }catch(err){
            console.log("Error signing up",err);
        }
    }

    handleChange = event => {
        const {name , value} = event.target;
        this.setState({[name]:value});
    }

    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <div className='sign-up'  >
                <h2 className='title'> I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        onChange={this.handleChange} 
                        name='displayName' 
                        type='text' 
                        label='Display Name' 
                        value={displayName} required />
                    <FormInput 
                        onChange={this.handleChange} 
                        name='email' 
                        type='email' 
                        label='Email' 
                        value={email} required />
                      <FormInput 
                        onChange={this.handleChange} 
                        name='password' 
                        type='password' 
                        label='password' 
                        value={password} required />
                    <FormInput 
                        onChange={this.handleChange} 
                        name='password' 
                        type='password' 
                        label='Confirm Password' 
                        value={confirmPassword} required />

                    
                    <CustomButton type='submit' value='Submit form'> SIGN Up</CustomButton>
                
                </form>
            </div>
        )
    }


};

export default SignUp;

