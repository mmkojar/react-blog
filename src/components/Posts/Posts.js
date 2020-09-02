import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {


    static propTypes = {
        posts: PropTypes.array,
        getPosts: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div className="container">
                <h3>Latest Posts</h3>
                {
                    this.props.posts ?
                        this.props.posts.map((post) =>
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
                                <div className="card-footer">
                                    <Link className="btn btn-primary" to={`/posts/${post.id}`}>Read More</Link>
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
})

export default connect(
    mapStateToProps,
    { getPosts }
)(Posts)