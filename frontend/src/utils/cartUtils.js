



// cartUtils.js
export const getCart = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) throw new Error("User not authenticated!");

    const res = await fetch("/api/cart", {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch cart");

    return res.json();
};

export const addToCart = async (productId, quantity = 1) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) throw new Error("User not authenticated!");

    const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) throw new Error("Failed to add/update cart");

    return res.json();
};

export const removeFromCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) throw new Error("User not authenticated!");

    const res = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to remove from cart");

    return res.json();
};