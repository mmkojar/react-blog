import React, { Component, createRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory } from '../../actions/postActions';
import { createPosts } from '../../actions/postActions';
import { returnSuccess } from '../../actions/successActions';


class Addposts extends Component {

    constructor(props) {
        super(props);
        this.titleRef = createRef();
        this.bodyRef = createRef();
        this.cover_imageRef = createRef();
        this.categoryRef = createRef();
        this.state = {
            cover_image: ''
        }
    }

    static propTypes = {
        posts: PropTypes.object.isRequired,
        success: PropTypes.object,
        returnSuccess: PropTypes.func
    }

    componentDidMount() {
        this.props.getCategory();
    }

    handleSubmit(e) {
        e.preventDefault();

        const file = this.cover_imageRef.current.files[0];
        const formdata = new FormData();

        formdata.append('title', this.titleRef.current.value)
        formdata.append('body', this.bodyRef.current.value)
        formdata.append('category_id', this.categoryRef.current.value)
        formdata.append('cover_image', file);
        this.props.createPosts(formdata);

    }

    render() {
        if (this.props.success.id === 'POST_CREATED') {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="container">
                <h1>Create Post</h1>
                <form onSubmit={this.handleSubmit.bind(this)} name="addPost">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" ref={this.titleRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea className="form-control" rows="5" name="body" cols="50" ref={this.bodyRef}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cover_image">Upload Image</label><br />
                        <input name="cover_image" type="file" ref={this.cover_imageRef} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" name="category" ref={this.categoryRef}>
                            <option value="" defaultValue>Select...</option>
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
                    <button className="btn btn-primary" type="submit">Submit</button>
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
    { getCategory, createPosts, returnSuccess }
)(Addposts)