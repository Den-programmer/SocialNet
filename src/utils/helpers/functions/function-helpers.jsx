import React from 'react';
import { NavLink } from 'react-router-dom';

export const createFriendsNavBtn = (hint, link, nameOfBtn) => {
    return <button title={hint}>
                <NavLink to={link}>
                    {nameOfBtn}
                </NavLink>
           </button>
}