import React from 'react';
import { NavLink } from 'react-router-dom';

export const createFriendsNavBtn = (hint:string, link: string, nameOfBtn: string) => {
    return <button title={hint}>
                <NavLink to={link}>
                    {nameOfBtn}
                </NavLink>
           </button>
}