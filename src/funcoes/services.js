export const TOKEN_KEY = "@app-token";
export const USER_ID = "@user_id"
export const USER_EMAIL = "@user_email"

export const isAutentication = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const getUser = () => localStorage.getItem(USER_EMAIL)

export const login = (token) => { localStorage.setItem(TOKEN_KEY, token) }

export const setUser = (user) => { localStorage.setItem(USER_EMAIL, user) }

export const logout = () => { localStorage.removeItem(TOKEN_KEY) }

export const removeUser = () => { localStorage.removeItem(USER_EMAIL) }
