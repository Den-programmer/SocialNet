import React from 'react';
import classes from './status.module.css';

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
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
        console.log(this.state.status);
    }

    render() {
        return (
            <div className={classes.status}>
                {this.state.editMode ?
                    <div className={classes.editCurrentStatus}>
                        <input onChange={this.onStatusChange} value={this.state.status} autoFocus={true} title="Edit status..." placeholder="Edit status..." />
                        <button onClick={this.deactivateEditMode}>Save Changes!</button>
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