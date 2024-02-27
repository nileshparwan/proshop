import Cookies from 'universal-cookie';

const cookies = new Cookies();

const setCookies = (name, value, option = {}) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    return cookies.set(name, value, { path: '/', maxAge: expires, secure: true, ...option });
}

const getCookies = (name, option = {}) => {
    return cookies.get(name, { path: '/', secure: true, ...option });
}

const removeCookies = (name, option = {}) => {
    return cookies.remove(name, { path: '/', secure: true, ...option });
}

export { setCookies, getCookies, removeCookies };