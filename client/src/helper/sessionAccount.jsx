import Cookies from 'js-cookie';

export const setSession = (cookieName, cookieData, hoursToExpire) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + hoursToExpire * 60 * 60 * 1000);
  Cookies.set(cookieName, cookieData, { expires: expirationDate });
};

export const closeSession = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('user');
    Cookies.remove('loggedToken');
    Cookies.remove('role');
};

export const isLoggedIn = () => {
    return Cookies.get('isLoggedIn');
};

export const getUser = () => {
    return Cookies.get('user');
};