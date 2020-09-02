import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        success: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { success, error, alert } = this.props;
        if (error !== prevProps.error) {
            if (error.status === 'error') {
                alert.error(error.msg);
            }
        }
        if (success && success.status === 'success') {
            alert.success(success.msg)
        }
    }

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    error: state.error,
    success: state.success
});

export default connect(mapStateToProps)(withAlert()(Alerts))