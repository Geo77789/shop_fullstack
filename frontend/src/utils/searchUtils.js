
// Filter products based on search query
// items -> original list of products
// query -> search query
// field -> field to search in (name, description, category, brand, price, discount, rating)


export const filterItems = (items, query, field = "name") => {
    if (!query) return items;

    const lowerCaseQuery = query.toLowerCase();

    return items.filter((item) =>
        item[field].toLowerCase().includes(lowerCaseQuery)
    );
};