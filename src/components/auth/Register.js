import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { registerAction } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class register extends PureComponent {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            cpassword: '',
            // msg: null,
        }
    }

    static propTypes = {
        auth: PropTypes.object,
        registerAction: PropTypes.func.isRequired
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, phone, password } = this.state
        const newUser = {
            name, email, phone, password
        }

        this.props.registerAction(newUser);
    }

    render() {
        if (this.props.auth.token) {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
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
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control " name="name" onChange={this.handleChange.bind(this)} />
                                        </div>

                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="email" className="form-control " name="email" onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-md-4 col-form-label text-md-right">Contact No</label>

                                        <div className="col-md-6">
                                            <input type="phone" className="form-control " name="phone" onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input type="password" className="form-control " name="password" onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                        <div className="col-md-6">
                                            <input type="password" className="form-control" name="cpassword" onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Register
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
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { registerAction }
)(register)
// export default withRouter(register);