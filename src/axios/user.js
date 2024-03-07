import { axiosInstanceWithAuth } from "./index";

export const getAllUsersAPI = async () => {
    try {
        const response = await axiosInstanceWithAuth.get(`/users/all`);
        return { success: true, data: { response } }
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getUserByIdAPI = async (userId) => {
    try {
        const response = await axiosInstanceWithAuth.get(`/users/one/${userId}`);
        return { success: true, data: { response } }
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createUserAPI = async (name, email, phonenumber, role = "user", tenantId = null, password) => {
    try {
        const response = await axiosInstanceWithAuth.post(`/users/one/create`, {
            name, email, phonenumber, role, tenantId, password
        });
        return { success: true, data: { response } }
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editUserByIdAPI = async ( userId, name, email, phonenumber, twoFactorAuthType, role = 'user' ) => {
    try {
        const response = await axiosInstanceWithAuth.put(`/users/one/${userId}/edit`, {
            name, email, phonenumber, twoFactorAuthType, role
        });
        return { success: true, data: { response } }
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteUserByIdAPI = async (userId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`/users/one/${userId}/delete`);
        return { success: true, data: { response } }
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}