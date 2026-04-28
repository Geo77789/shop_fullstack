

export const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
    };
};




export const deleteProductAdmin = async (id) => {
    const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
};


export const createProductAdmin = async (productData) => {
    const res = await fetch(`/api/admin/products`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
}


export const getSummary = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const res = await fetch("/api/admin/products/summary", {

        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    });
    if (!res.ok) throw new Error("Failed to fetch summary");
    return res.json();
}
