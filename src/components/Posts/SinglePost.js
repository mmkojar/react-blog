import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSinglePosts, deletePosts } from '../../actions/postActions';
import { returnSuccess } from '../../actions/successActions';
// import axios from 'axios';

class SinglePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            token: localStorage.getItem('token')
        }
    }

    static propTypes = {
        posts: PropTypes.object,
        auth: PropTypes.object,
        getSinglePosts: PropTypes.func.isRequired,
        success: PropTypes.object,
        returnSuccess: PropTypes.func
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const cat_id = this.props.match.params.cat_id;

        if (cat_id) {
            this.props.getSinglePosts(id, cat_id);
        }
        else {
            this.props.getSinglePosts(id);
        }
    }
    delete(id) {
        this.props.deletePosts(id);
    }

    render() {
        if (this.props.success.id === 'POST_DELETED') {
            return <Redirect to="/posts" />
        }
        return (
            <div className="container">
                <Link className="btn btn-dark" to="/posts">Go Back</Link>
                {
                    this.props.posts.singlePost ?
                        this.props.posts.singlePost.map((post) =>
                            <div key={post.id} className="card mt-4">
                                <div className="card-header">
                                    {post.title}<span className="mx-2"><i className="fas fa-arrow-right"></i></span>
                                    <small>{post.category_name}</small>
                                    <br />
                                    <small>{post.created_at}</small>
                                </div>
                                <div className="card-body">
                                    <div className="media">
                                        <img src={post.cover_image} className="img-fluid" alt={post.cover_image} height="100px" width="100px" />
                                        <div className="media-body align-self-center pl-4">
                                            {post.body}
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.props.auth.token ?
                                        (
                                            this.props.auth.user ? (
                                                this.props.auth.user.id === post.user_id ?
                                                    <div className="card-footer">
                                                        <Link className="btn btn-success mr-1" to={`/edit/${post.id}`}>Edit</Link>
                                                        <button className="btn btn-danger" onClick={(e) => this.delete(post.id)} >Delete</button>
                                                    </div> :
                                                    null
                                            )
                                                : null

                                        )
                                        :
                                        null
                                }
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth,
    success: state.success
})

export default connect(
    mapStateToProps,
    { getSinglePosts, deletePosts, returnSuccess }
)(withRouter(SinglePost))