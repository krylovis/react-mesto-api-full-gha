const BASE_URL = 'https://api.krylovis.students.nomoredomains.xyz';

const headers = {
  'Content-Type': 'application/json'
};

const defaultOptions = (password, email) => {
  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ password, email }),
  }
};

const request = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, options).then(getResponse)
};

const getResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({ password, email }) => {
  return request('signup', defaultOptions(password, email))
};

export const authorize = ({ password, email }) => {
  return request('signin', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
};

export const tokenVerification = () => {
  return request('users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
};

export const logout = () => {
  return request('logout', {
    method: 'POST',
    credentials: 'include',
  })
};