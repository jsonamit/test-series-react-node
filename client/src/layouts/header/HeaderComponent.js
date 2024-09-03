import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/reducers//user/userAction';
import { useSelector, useDispatch } from 'react-redux';

function Header() {

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const user = useSelector(state => state.user);

    const logout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        navigation('/login');
    }

    return (
        <>
            <div className='row header m-0'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <div className='d-flex justify-content-between align-items-center h-100'>
                        <div>
                            <h4 className='text-white'>Welcome &nbsp;<b>{user.name}</b></h4>
                        </div>
                        <div>
                            <b><span className='pointer text-white' onClick={logout}>Log out</span></b>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div>
        </>
    )
}

export default Header