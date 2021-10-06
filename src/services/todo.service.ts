import http from "./http"

export const addTodo =  (data: any) => {
    return http.post('todo', data);
}
export const getTodo = () => {
    return http.get('todo');
}

export const completeTodo = (id: any) => {
    return http.put('todo/complete/'+ id);
}

export const deleteTodo = (id: any) => {
    return http.delete('todo/'+ id);
}