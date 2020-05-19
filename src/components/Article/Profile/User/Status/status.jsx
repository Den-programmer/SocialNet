import React from 'react';
import classes from './status.module.css';
import StatusReduxForm from './StatusForm/statusForm';

class Status extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    render() {
        return (
            <div className={classes.status}>
                {this.state.editMode ?
                    <div className={classes.editCurrentStatus}>
                        <StatusReduxForm onSubmit={this.deactivateEditMode}/>
                    </div>
                    :
                    <div className={classes.currentStatus}>
                        <span onClick={this.activateEditMode} title="Edit status...">{this.state.status}</span>
                    </div>
                }
            </div>
        );
    }
}

export default Status;