


export const getCart = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) throw new Error("User not authenticated!");

    const res = await fetch("/api/cart", {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch cart");
    }

    return res.json();
};

export const addToCart = async (productId, quantity) => {
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

    if (!res.ok) {
        throw new Error("Failed to add to cart");
    }

    return res.json();
};