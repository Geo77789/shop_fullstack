import { deleteProductAdmin, getSummary, createProductAdmin } from "../../utils/adminUtils";
import { getProducts } from "../../utils/productUtils";
import { getAuthHeaders } from "../../utils/adminUtils";


export const loadDashboardData = async (setProducts, setSummary, setLoading, setError) => {
    try {
        setLoading(true);
        // execute both of them
        const [productsData, summaryData] = await Promise.all([
            getProducts(),
            getSummary(),
        ]);
        setProducts(productsData);
        setSummary(summaryData);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}


export const handleDelete = async (id, products, setProducts, fetchSummary) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteProductAdmin(id);
            setProducts(products.filter((p) => p._id !== id));
            await fetchSummary(); // refresh the summary
            alert("Product deleted successfully");
        } catch (err) {
            alert(err.message);
        }
    }
};


export const handleCreate = async (fetchProducts, fetchSummary) => {
    try {
        // send a dummy object for testing
        await createProductAdmin({
            name: "Test Product",
            description: "This is a test product",
            price: 0,
            countInStock: 0,
            image: "/image/sample.jpg",
            brand: "Sample Brand",
            category: "Sample Category",
        });
        await fetchProducts();
        await fetchSummary();
        alert("Product created successfully");
    } catch (err) {
        alert(err.message);
    }
}


export const handleUpdate = async (id, updatedData, fetchProducts, fetchSummary, setEditingProduct) => {
    try {
        const res = await fetch(`/api/admin/products/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(), // function which get the token
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) throw new Error("Failed to update product");

        await fetchProducts();
        await fetchSummary();
        setEditingProduct(null);  // Closing editing module
        alert("Product updated successfully");
    } catch (err) {
        alert(err.message);
    }

} 