export const getOrders = async (search) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        };
        const response = await fetch(`http://localhost:3001/order?search=${search? search:""}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const orders = await response.json();
        return { orders, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { orders: [], message: error.message };
    }
}

export const getOrder = async (id) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        };
        const response = await fetch(`http://localhost:3001/order/${id}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const order = await response.json();
        return { order, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { order: null, message: error.message };
    }
}

export const createOrder = async (order) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
            credentials: 'include',
        };
        const response = await fetch(`http://localhost:3001/order`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const createdOrder = await response.json();
        return { order: createdOrder, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { order: null, message: error.message };
    }
}

export const updateOrder = async (id, order) => {
    try {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
            credentials: 'include',
        };
        const response = await fetch(`http://localhost:3001/order/${id}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const updatedOrder = await response.json();
        return { order: updatedOrder, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { order: null, message: error.message };
    }
}

export const deleteOrder = async (id) => {
    try {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        };
        const response = await fetch(`http://localhost:3001/order/${id}`, requestOptions);
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        const deletedOrder = await response.json();
        return { order: deletedOrder, message: 'Success' };
    } catch (error) {
        console.error(error);
        return { order: null, message: error.message };
    }
}