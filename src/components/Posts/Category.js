import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { getCategory, createCategory, deleteCategory } from '../../actions/postActions';

class Category extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category_name: '',
            show: false,
        }
    }

    static propTypes = {
        posts: PropTypes.object,
        auth: PropTypes.object,
        error: PropTypes.object,
    }

    // componentDidUpdate(prevProps) {

    //     const { error } = this.props;
    //     if (error !== prevProps.error) {
    //         if (error.status === 'success') {
    //             this.setState({ msg: error.msg, })
    //         }
    //         else {
    //             this.setState({ msg: null })
    //         }
    //     }
    // }

    componentDidMount() {
        this.props.getCategory();
    }

    handleSubmit(e) {
        e.preventDefault();
        const category = {
            category_name: this.state.category_name
        };
        this.handleClose();
        this.props.createCategory(category);
    }

    delete(id) {
        this.props.deleteCategory(id)
    }

    handleClose() {
        this.setState({
            show: false,
        })
    }

    handleShow() {
        this.setState({
            show: true,
        })
    }

    render() {
        const { categories } = this.props.posts
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="mb-0">Categories</h3>

                        {
                            this.props.auth.isAuthenticated ?
                                <Button className="mt-4" variant="primary" onClick={this.handleShow.bind(this)}>
                                    Create Category
                                </Button>
                                : null
                        }

                        {/* {
                            this.state.msg ?
                                <Alert variant="success">
                                    {this.state.msg}
                                </Alert> : null
                        } */}
                        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.handleSubmit.bind(this)} >
                                    <div className="form-group">
                                        <label htmlFor="category_name">Category Name</label>
                                        <input type="text" className="form-control" name="category_name" onChange={(e) => this.setState({ category_name: e.target.value })} required />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Add</button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                    Close
                                        </Button>
                            </Modal.Footer>
                        </Modal>
                        <ul className="list-group mt-4">
                            {
                                categories ?
                                    categories.map((cat) =>
                                        <Fragment key={cat.id}>
                                            <li className="list-group-item">
                                                <Link to={`/posts/category/${cat.id}`}>{cat.category_name}</Link>
                                                {
                                                    this.props.auth.token ?
                                                        (
                                                            this.props.auth.user ?
                                                                (
                                                                    this.props.auth.user.id === cat.user_id ?
                                                                        <button className="btn btn-danger float-right" onClick={(e) => this.delete(cat.id)}><i className="fas fa-times"></i></button>
                                                                        : null
                                                                ) : null

                                                        )
                                                        : null
                                                }
                                            </li>
                                        </Fragment>
                                    )
                                    : null
                            }
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { getCategory, createCategory, deleteCategory }
)(Category)