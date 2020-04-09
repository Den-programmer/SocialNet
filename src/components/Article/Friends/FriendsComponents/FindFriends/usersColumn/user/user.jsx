import React from 'react';
import classes from './user.module.css';

const User = (props) => {
    console.log(props.name);

    // let follow = () => {
    //     if(props.followed == false) {
    //         props.follow(props.id);
    //     }
    // }
    // let unfollow = () => {
    //     if(props.followed == true) {
    //         props.unfollow(props.id);
    //     }
    // }
    let following = (e) => {
        // Проблема в том, что мы передаем пропс как обьект, чтобы решить эту проблему нужно будет создать глубокие копии!
        // Когда мы пытаемся передать в пропсах имя - мы передаем массив имён, ведь имя то не одно, а чтобы оно было одно - 
        // нужно использовать currentTarget! 
        let id = props.id;
        let name = props.name;
        let nickname = props.nickname;
        let avatar =  props.avatar;

        let currentTarget = e.target;
        console.log(currentTarget);

        if (props.followed == false) {
            props.follow(id, name, nickname, avatar);
        } else {
            props.unfollow(id);
        }
    }

    return (
        <div className={classes.user}>
            <img src={props.avatar} alt="" />
            <h4>{props.nickname}</h4>
            <h6>{props.name}</h6>
            {props.followed ? <button onClick={following} >Follow</button> : <button onClick={following} >Unfollow</button>}
        </div>
    );
}

export default User;