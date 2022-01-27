import React from "react";
import { Component } from "react/cjs/react.production.min";
import {connect} from 'react-redux';
import {actionUsername} from '../../../config/redux/action'
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";



class Login extends Component{
    state = {
        email: '',
        password: ''
    }

    // Menangkap value email dan password
    handleChangeText = (e) => {
        // console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // Submit Login
    handleLoginSubmit = async() => {
        const{email, password} = this.state;
        const {history} = this.props;
        console.log('data before send: ', email, password);
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if(res){
            console.log('Login Succes', res);

            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email:'',
                password:''
            })
            // redirect kehalaman dashboard
            history.push('/')
        }else{
            console.log('Login Failed');
        }
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                <p className="auth-title">Login Page</p>
                <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password}/>
               <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading}/>
                </div>
            </div>  
        )
    }
}


const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(Login);