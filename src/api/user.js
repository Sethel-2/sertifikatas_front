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
            credentials: 'include',
            
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
export const getClients = async (search, page, from, to, showAll) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      const response = await fetch(`http://localhost:3001/user?search=${search? search : ""}&page=${page}&from=${from}&to=${to}&showAll=${showAll || ''}`, requestOptions);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const { clients, nextPageExists } = await response.json();
      return { clients, message: "Success", success: true, nextPageExists };
    } catch (error) {
      console.error(error);
      return { clients: [], message: error.message, success: false, nextPageExists: false };
    }
  };
  
  export const updateUser = async (id, user) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      };
      const response = await fetch(
        `http://localhost:3001/user/${id}`,
        requestOptions
      );
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const updatedUser = await response.json();
      return { user: updatedUser, message: "Success" };
    } catch (error) {
      console.error(error);
      return { user: null, message: error.message };
    }
  };
  
  export const remindPassword = async (email) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      };
      const response = await fetch(
        `http://localhost:3001/user/remind-password`,
        requestOptions
      );
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      return { success: true, message: message };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  export const resetPassword = async (password, token) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      };
      const response = await fetch(
        `http://localhost:3001/user/reset-password`,
        requestOptions
      );
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      return { success: true, message: message };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }