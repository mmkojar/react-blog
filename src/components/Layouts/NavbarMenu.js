import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { logoutAction } from '../../actions/authActions';

export class NavbarMenu extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired,
        logoutAction: PropTypes.func
    }

    render() {

        const { token, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <h5 className="text-white mt-2 mr-2">{user ? `Welcome ${user.name}` : ''}</h5>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Settings
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/dashboard">Dashboard </Link>
                            <Link className="dropdown-item" to="/profile">User Profile </Link>
                            <button className="dropdown-item btn btn-info text-dark" onClick={this.props.logoutAction}> Logout</button>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login" >Login </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register" >Register </Link>
                </li>
            </ul>
        );

        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg static-top navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/#">Blog App</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/posts">Posts </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/category">Category </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact Us </Link>
                                </li>
                            </ul>
                            {token ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});


export default connect(mapStateToProps, { logoutAction })(NavbarMenu)