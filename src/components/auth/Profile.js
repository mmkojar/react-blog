import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { profileAction } from '../../actions/authActions';


class Profile extends Component {

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
        error: PropTypes.object.isRequired,
        profileAction: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.setState({
            name: user.name,
            email: user.email,
            phone: user.phone,
        })
    }

    // componentDidUpdate(prevProps) {

    //     const { error } = this.props;
    //     if (error !== prevProps.error) {
    //         if (error.status === 'error') {
    //             this.setState({ msg: error.msg, })
    //         }
    //         else {
    //             this.setState({ msg: null })
    //         }
    //     }
    // }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, phone, password } = this.state
        const newUser = {
            name, email, phone, password
        }
        this.props.profileAction(newUser);


    }

    render() {
        const { name, email, phone } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">User Profile</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="row">
                                        <label className="col-md-4 col-form-label text-md-right"></label>
                                        <div className="col-md-6">
                                            {/* {
                                                msg ?
                                                    <Alert variant="danger">
                                                        {msg}
                                                    </Alert> : null
                                            } */}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange.bind(this)} />
                                        </div>

                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="email" className="form-control " name="email" value={email} onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-md-4 col-form-label text-md-right">Contact No</label>

                                        <div className="col-md-6">
                                            <input type="phone" className="form-control " name="phone" value={phone} onChange={this.handleChange.bind(this)} />
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
                                                Update
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
    { profileAction }
)(Profile)