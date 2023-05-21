import axios from "axios";

//  type is either "certificate" or "additional"
 export const uploadFiles = async ({ files, orderId, type }) => {
    try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        formData.append("orderId", orderId);
        formData.append("type", type);
       

        
        const response = await axios.post(`http://localhost:3001/file`, formData, {withCredentials:true, headers: {"Content-type": "multipart/form-data"}})
        
        if (response !== 200) {
            const { message } = response.data;
            throw new Error(message);
        }
        return { success: true, message: "Success"};
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message};
    }
 }

//  type is either "certificate" or "additional", fetches additional by default
 export const getFiles = async ({ orderId, type }) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        };

        const response = await fetch(`http://localhost:3001/file?orderId=${orderId}&${type ? `type=${type}` : ''}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const files = await response.json();
        return { files, message: "Success" };
    } catch (error) {
        console.error(error);
        return { files: [], message: error.message };
    }
 }

 export const updateFile = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "multipart/form-data" },
            body: formData,
            credentials: "include",
        };

        const response = await fetch(`http://localhost:3001/file/${id}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const updatedFile = await response.json();
        return { file: updatedFile, message: "Success"};
    } catch (error) {
        console.error(error);
        return { file: null, message: error.message};
    }
 }

 export const deleteFile = async (id) => {
    try {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        };

        const response = await fetch(`http://localhost:3001/file/${id}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const deletedFile = await response.json();
        return { file: deletedFile, message: "Success" };
    } catch (error) {
        console.error(error);
        return { file: null, message: error.message };
    }
 }