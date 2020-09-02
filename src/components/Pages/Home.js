import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


class Home extends React.Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    render() {
        return (
            <div className="container" >
                <div className="jumbotron text-center">
                    <h1>Welcome to React</h1>
                    <p>This is React Blog App</p>
                    {
                        !this.props.isAuthenticated ?
                            <div className="buttons">
                                <Link className="btn btn-primary mr-1" to="/login">Login </Link>
                                <Link className="btn btn-success" to="/register">Register </Link>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
    mapStateToProps,
    null
)(Home)