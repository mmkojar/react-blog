import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserPosts, deletePosts } from '../../actions/postActions';

class Dashboard extends Component {

    static propTypes = {
        posts: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getUserPosts();
    }

    delete(id) {
        this.props.deletePosts(id)
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <h3 className="mb-3">Your Blog Post</h3>
                        <div className="card">
                            <div className="card-header">Dashboard</div>
                            <div className="card-body">
                                <Link className="btn btn-primary mr-2 mb-2" to="/add">Create Post</Link>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Category Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.posts.userPosts ?
                                                    this.props.posts.userPosts.map((post, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">{index}</th>
                                                            <td><img src={post.cover_image} className="img-fluid" alt={post.cover_image} height="100px" width="100px" /></td>
                                                            <td>{post.title}</td>
                                                            <td>{post.category_name}</td>
                                                            <td>
                                                                <Link className="btn btn-success mr-1" to={`/edit/${post.id}`}><i className="fas fa-edit"></i></Link>
                                                                <button className="btn btn-danger" onClick={(e) => this.delete(post.id)}><i className="fas fa-trash-alt"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                    : null
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


const mapStateToProps = state => ({
    posts: state.posts,
})

export default connect(
    mapStateToProps,
    { getUserPosts, deletePosts }
)(Dashboard)