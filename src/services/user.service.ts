import http from "./http"

export const login =  (data: any) => {
    return http.post('login', data);
}