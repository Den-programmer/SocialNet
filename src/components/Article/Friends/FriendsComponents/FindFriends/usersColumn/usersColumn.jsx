import React from 'react';
import classes from './usersColumn.module.css';
import User from './user/user';
import * as axios from 'axios';

// const UsersColumn = (props) => {
//     let setUsers = () => {
// if (props.users.length == 0) {
//     axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
//         props.setUsers(response.data.items);
//     });
// }
//     }

// let users = props.users.map((user) => {
//     return <User id={user.id} 
//                  key={user.id} 
//                  users={props.users}
//                  followed={user.followed}
//                  nickname={user.nickname} 
//                  name={user.name} 
//                  photo={user.photos.small} 
//                  setUsers={props.setUsers}
//                  follow={props.follow} unfollow={props.unfollow}/>
// });

//     return (
//         <div className={classes.usersColumn}>
//             <div className={classes.btn_setUsers}>
//                 <button onClick={setUsers}>
//                      Get Users
//                 </button>
//             </div>
//             <div className={classes.users}>
//                 {users}
//             </div>
//         </div>
//     );
// }
class UsersColumn extends React.Component {
    constructor(props) {
        super(props);

        this.users = this.props.users.map((user) => {
            return <User id={user.id}
                key={user.id}
                followed={user.followed}
                nickname={user.nickname}
                name={user.name}
                photo={user.photos.small}
                setUsers={this.props.setUsers}
                follow={this.props.follow} unfollow={this.props.unfollow} />
        });
    }
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items);
        });
    }
    render() {
        return (
            <div className={classes.usersColumn}>
                <div className={classes.users}>
                    {this.users}
                </div>
            </div>
        );
    }
}

export default UsersColumn;