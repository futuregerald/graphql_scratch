import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Mutation} from 'react-apollo'

import {SIGNUP_USER} from '../../queries'
import Error from './Error'

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
}

class Signup extends Component {

    state = { ...initialState}

    clearState = () => {
        this.setState({...initialState})
    }

    handleChange = (event)=> {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(async ({data})=>{
            console.log(data)
            localStorage.setItem('token',data.signupUser.token)
            await this.props.refretch();
            this.clearState();
            this.props.history.push('/')
        })
    }
    validateForm = () => {
        const {username, email, password, passwordConfirmation} = this.state;

        const isInvalid = !username || !email || !password || password !== passwordConfirmation;

        return isInvalid
    }

    render(){
        const {username, email, password, passwordConfirmation} = this.state;
        
    return(
        <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
        {(signupUser, {data, loading, error})=>{
            return (<form action="" className="form" onSubmit={(event)=>{this.handleSubmit(event, signupUser)}}>
            <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={username}/>
            <input type="text" name="email" placeholder="email address" onChange={this.handleChange} value={email}/>
            <input type="text" name="password" placeholder="password" onChange={this.handleChange} value={password}/>
            <input type="text" name="passwordConfirmation" placeholder="password" onChange={this.handleChange} value={passwordConfirmation}/>
            <button type="submit" className="button-primary" disabled={loading || this.validateForm()}>Submit</button>
            {error && <Error error={error}/>}
            </form>)
        }}
        </Mutation>
        </div>
    )
    }
}

export default withRouter(Signup)