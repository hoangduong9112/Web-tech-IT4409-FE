import { auth } from './firebase';

// Get current signed-in user

export const getUser = () => auth.currentUser;
