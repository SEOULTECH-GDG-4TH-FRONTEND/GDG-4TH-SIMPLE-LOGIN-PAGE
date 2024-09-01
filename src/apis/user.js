import axios from "axios";

export const signup = (username, password1, password2, email) => {
    return axios
        .post("/api/user/signup", {
            username,
            password1,
            password2,
            email,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const login = (email, password) => {
    return axios
        .post("/api/user/login", {
            email,
            password,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const logout = () => {
    return axios
        .post("/api/user/logout", {
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const loginTest = () => {
    return axios
        .post("/api/user/test")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};
