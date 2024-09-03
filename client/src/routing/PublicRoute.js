import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    return isAuthenticated ? <Navigate to="/dash" /> : element;
};

export default PublicRoute;