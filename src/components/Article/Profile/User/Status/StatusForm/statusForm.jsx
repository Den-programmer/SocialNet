import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../../../../../common/Forms/forms';
import { maxLengthCreator } from '../../../../../../utils/validators/validators';
import { compose } from 'redux';
import { connect } from 'react-redux';

const maxLengthStatus = maxLengthCreator(100);

const StatusForm = (props) => {
    console.log(props.status)
    return (
        <form onSubmit={props.handleSubmit}>
            <Field value={props.status} name="status" autoFocus={true} title="Edit status..." placeholder="Edit status..." component={Input} validate={maxLengthStatus}/>
            <button>Save Changes!</button>
        </form>
    );
}

let mapStateToProps = (state) => {
    return {
        status: state.profilePage.profile.status
    }
}

export default compose(
    reduxForm({ form: 'status', enableReinitialize: true }),
    connect(mapStateToProps),
)(StatusForm);