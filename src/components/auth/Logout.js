import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/authActions';

class Logout extends Component {


    componentDidMount() {
        this.logout();
    }

    static propTypes = {
        logoutAction: PropTypes.func.isRequired
    }

    logout() {
        this.props.logoutAction();
    }

    render() {
        if (this.props.logoutAction) {
            return <Redirect to="/"></Redirect>
        }

    }
}

// export default Logout;
export default connect(
    null,
    { logoutAction }
)(Logout)