import { apiRequest } from "../api/client";

export const loginUser = (email, password) => {
    return apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),

    });

};



export const registerUser = async (data) => {
    return apiRequest("/users/register", {
        method: "POST",
        body: JSON.stringify(data),

    });


}


export const getProfile = () => {
    return apiRequest("/users/profile", {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.get.Item("user")).token}`,
        },
    });
}




