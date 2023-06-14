import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from './auth-user-context';
import { ROUTES } from '../constants';

export const withAuthentication = (Component) => (props) => {
    const [authUser, setAuthUser] = useState(null);
}