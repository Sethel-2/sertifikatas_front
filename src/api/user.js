export const register = async (user) => {
   try{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };
    const response = await fetch(`http://localhost:3001/user`, requestOptions)
    if(!response.ok) {
        const { message } = await response.json();
        throw new Error(message)
    }
    const createdUser = await response.json()
    return {user: createdUser, message: "Success"};
   }
   catch(error){
    console.error(error);
    return {user: null, message:error.message};
   }
   
}
export const login = async (email, password) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        };
        const response = await fetch(`http://localhost:3001/user/login`, requestOptions);
        if(!response.ok) {
            const { message } = await response.json();
            throw new Error(message)
        }
        const  user  = await response.json();
        return {user, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { user: null, message: error.message };
    }
}
export const logout = async () => {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "",
        };
        const response = await fetch(`http://localhost:3001/user/logout`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        return { success: true, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}