import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { contactAction } from '../../actions/postActions';
// import { Alert } from 'react-bootstrap';

class Contact extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            msg: null,
        }
    }

    // componentDidUpdate(prevProps) {

    //     const { error } = this.props;
    //     if (error !== prevProps.error) {
    //         if (error.id === 'CONTACT') {
    //             this.setState({ msg: error.msg, })
    //         }
    //         else {
    //             this.setState({ msg: null })
    //         }
    //     }
    // }

    static propTypes = {
        posts: PropTypes.array,
        error: PropTypes.object.isRequired,
        contactAction: PropTypes.func.isRequired
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, phone, message } = this.state
        const newUser = {
            name, email, phone, message
        }
        if (this.props.contactAction(newUser)) {
            this.props.history.push('/');
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Contact Us</div>
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
                                            <input type="text" className="form-control" name="name" onChange={this.handleChange.bind(this)} />
                                        </div>

                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="email" className="form-control" name="email" onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-md-4 col-form-label text-md-right">Contact No</label>

                                        <div className="col-md-6">
                                            <input type="phone" className="form-control" name="phone" onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Messgae</label>

                                        <div className="col-md-6">
                                            <textarea className="form-control" name="message" onChange={this.handleChange.bind(this)} ></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
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
    posts: state.posts.contact,
    error: state.error

})

export default connect(
    mapStateToProps,
    { contactAction }
)(withRouter(Contact))