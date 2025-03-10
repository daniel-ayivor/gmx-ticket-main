
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { UserType } from '@/utils/types/user';

/**
 * Custom hook to retrieve user authentication data from cookies.
 *
 * @returns {object} - An object containing the user's information and login status.
 * @returns {object | null} return.user - The user data object retrieved from the cookie, or `null` if not available or invalid.
 * @returns {boolean} return.isLoggedIn - The login status, `true` if the user is logged in, otherwise `false`.
 * @returns {number} return.TrackCost - A placeholder for track cost (currently hardcoded to 1).
 */
export const useAuth = () => {
  const [cookies] = useCookies(['user', 'isLoggedIn']);
  const [TrackCost] = useState<number>(1); // TrackCost is hardcoded to 1 for now

  let user: UserType | null = null;

  // Safely parse the user data from the cookie
  try {
    user = cookies?.user ? cookies.user : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error parsing user data from cookies:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    user = null; // Fallback to null if parsing fails
  }

  // Get the login status from the cookie
  const isLoggedIn = cookies.isLoggedIn === true;

  return { user, isLoggedIn, TrackCost };
};