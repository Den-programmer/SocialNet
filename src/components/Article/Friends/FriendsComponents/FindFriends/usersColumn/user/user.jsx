import React from 'react';
import classes from './user.module.css';

const User = (props) => {
    // console.log(props.name);

    let following = (e) => {
        // Проблема в том, что мы передаем пропс как обьект, чтобы решить эту проблему нужно будет создать глубокие копии!
        // Когда мы пытаемся передать в пропсах имя - мы передаем массив имён, ведь имя то не одно, а чтобы оно было одно - 
        // нужно использовать currentTarget! 

        // Метод event.target возращает коллекцию элемента button!
        let currentElement = e.target.parentNode; 
        let id = Number(currentElement.getAttribute("id"));
        // ID is ready!

        if (props.followed == false) {
            props.follow(id);
        } else {
            props.unfollow(id);
        }
    }

    return (
        <div id={props.id} className={classes.user}>
            <img src={props.avatar} alt="" />
            <h4>{props.nickname}</h4>
            <h6>{props.name}</h6>
            {props.followed ? <button onClick={following} >Follow</button> : <button onClick={following} >Unfollow</button>}
        </div>
    );
}

export default User;