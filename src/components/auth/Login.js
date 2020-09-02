import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loginAction } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class login extends Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            // msg: null,
        }
    }

    static propTypes = {
        auth: PropTypes.object,
        error: PropTypes.object.isRequired,
        loginAction: PropTypes.func.isRequired
    }

    // componentDidUpdate(prevProps) {

    //     const { error } = this.props;
    //     if (error !== prevProps.error) {
    //         if (error.id === 'LOGIN_FAIL') {
    //             this.setState({ msg: error.msg })
    //         }
    //         else {
    //             this.setState({ msg: null })
    //         }
    //     }
    // }

    onSubmit(e) {
        e.preventDefault();
        this.props.loginAction(this.state.email, this.state.password);

    }

    render() {
        if (this.props.auth.token) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this)}>
                                    <div className="row">
                                        <label className="col-md-4 col-form-label text-md-right"></label>
                                        <div className="col-md-6">
                                            {/* {
                                                this.state.msg ?
                                                    <Alert variant="danger">
                                                        {this.state.msg}
                                                    </Alert> : null
                                            } */}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="email" className="form-control " name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                        <div className="col-md-6">
                                            <input type="password" className="form-control " name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error

})

export default connect(
    mapStateToProps,
    { loginAction }
)(login)
// export default withRouter(login);