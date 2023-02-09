export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';

export const KAKAO_LOGIN_PATH = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
