import React, {Component} from 'react';
import { withRouter} from 'react-router-dom'
import {Mutation} from 'react-apollo'

import {SIGNIN_USER} from '../../queries'
import Error from './Error'

const initialState = {
    username: "",
    password: "",
    passwordConfirmation: "",
}

class Signin extends Component {

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

    handleSubmit = (event, SigninUser) => {
        event.preventDefault();
        SigninUser().then(async({data})=>{
            console.log(data)
            localStorage.setItem('token',data.signinUser.token)
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/')
        })
    }
    validateForm = () => {
        const {username, password} = this.state;

        const isInvalid = !username || !password

        return isInvalid
    }

    render(){
        const {username, password} = this.state;
        
    return(
        <div className="App">
        <h2 className="App">Sign in</h2>
        <Mutation mutation={SIGNIN_USER} variables={{username, password}}>
        {(SigninUser, {data, loading, error})=>{
            return (<form action="" className="form" onSubmit={(event)=>{this.handleSubmit(event, SigninUser)}}>
            <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={username}/>
            <input type="text" name="password" placeholder="password" onChange={this.handleChange} value={password}/>
            <button type="submit" className="button-primary" disabled={loading || this.validateForm()}>Submit</button>
            {error && <Error error={error}/>}
            </form>)
        }}
        </Mutation>
        </div>
    )
    }
}

export default withRouter(Signin)