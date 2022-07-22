import React from 'react';
import { logout } from '../firebase';

export default function Header({user}) {
  return (
    <div className="header">
      <div className="header__content">
        AccountableU
        <div className="header__content__userInfo">
          Hi, {user?.displayName}
          <button className="header__content__userInfo__btn" onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  )
}
