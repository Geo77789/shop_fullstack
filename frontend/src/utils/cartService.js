export const getCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("/api/cart", {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });

    return res.json();
};