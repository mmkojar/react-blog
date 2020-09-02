import React, { Fragment, PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory, updatePosts } from '../../actions/postActions';
import { returnSuccess } from '../../actions/successActions';
import axios from 'axios';

class Editposts extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            category: '',
            cover_image: '',
            default_image: '',
            default_catname: '',
            token: localStorage.getItem('token')
        }

        this.handleChange = this.handleChange.bind(this);

    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        getCategory: PropTypes.func,
        updatePosts: PropTypes.func,
        success: PropTypes.object,
        returnSuccess: PropTypes.func
    }

    componentDidMount() {
        // const id = this.props.match.params.id;
        // this.props.getPostsById(id);
        // const { singlePost } = this.props.posts;
        // this.setState({
        //     id: singlePost.id,
        //     title: singlePost.title,
        //     body: singlePost.body,
        //     category: singlePost.category_name
        // });
        this.props.getCategory();
        this.getPostsById();
    }

    getPostsById() {
        axios.get('http://127.0.0.1:8000/api/post/getBlogsById/' + this.props.match.params.id, {
            headers: {
                'Authorization': "Bearer " + this.state.token
            },
        }).then(response => {
            this.setState({ title: response.data[0].title, body: response.data[0].body, default_image: response.data[0].cover_image, category: response.data[0].category_id, default_catname: response.data[0].category_name });
        }).catch(error => {
            console.log(error);
        })

    }

    handleSubmit(e) {
        e.preventDefault();

        const file = this.state.cover_image;
        const formdata = new FormData();

        formdata.append('title', this.state.title);
        formdata.append('body', this.state.body);
        formdata.append('category_id', this.state.category);
        formdata.append('cover_image', file);

        this.props.updatePosts(this.props.match.params.id, formdata)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.props.success.id === 'POST_UPDATED') {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="container">
                <h1>Edit Posts</h1>
                <form onSubmit={this.handleSubmit.bind(this)} name="editPost">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" onChange={this.handleChange} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea className="form-control" rows="5" name="body" onChange={this.handleChange} cols="50" value={this.state.body}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cover_image">Upload Image</label><br />
                        <input name="cover_image" type="file" onChange={(e) => this.setState({ cover_image: e.target.files[0] })} /><br />
                        <img src={this.state.default_image} alt="" height="100" width="100"></img>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" name="category" onChange={this.handleChange}>
                            <option value={this.state.category} defaultValue>{this.state.default_catname}</option>
                            {

                                this.props.posts.categories ?
                                    this.props.posts.categories.map((cat, index) =>
                                        <Fragment key={index}>
                                            <option value={cat.id}>{cat.category_name}</option>
                                        </Fragment>
                                    )
                                    : null
                            }

                        </select>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    success: state.success
})

export default connect(
    mapStateToProps,
    { getCategory, updatePosts, returnSuccess }
)(Editposts)