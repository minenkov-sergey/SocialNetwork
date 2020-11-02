
import React from 'react';


class ProfileStatus extends React.Component {

debugger
state = {
    editMode: true,
    status: this.props.status
}

activateEditMode = () => {
    this.setState ({
        editMode: false
    })
}
deActivateEditMode = () => {
    this.setState ({
        editMode: true
    })
    this.props.updateStatus(this.state.status )
}
onStatusChanged = (e) => {
    this.setState( {
        status: e.currentTarget.value
    } )
}
componentDidUpdate(prevProps, prevState) {
    if (this.props.status !== prevProps.status)
    this.setState({
        status: this.props.status
    })
}
debugger
    render() {

        return (
            <div> {this.state.editMode?
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '--No Status--'}</span>
                </div>
                :
                <div>
                    <input onChange= {this.onStatusChanged} onBlur={this.deActivateEditMode} autoFocus={true} value = {this.state.status} /> 
                </div>
            }</div>
        )
    }
}

export default ProfileStatus