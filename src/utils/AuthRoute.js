import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
})

const AuthRoute = ({component: Component, authenticated, landing, ...others}) => {
    if(landing){
        return <Route
        {...others}
        render={props => authenticated ? <Redirect to="/home"/> : <Component {...props} /> }
        />
    }

    return <Route
    {...others}
    render={props => authenticated ? <Component {...props} /> : <Redirect to="/"/>}
    />
}

export default connect(
    mapStateToProps,
)(AuthRoute);
