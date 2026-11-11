// Search Products
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = document.getElementById("categoryFilter").value;

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        const category = product.dataset.category;

        const matchesSearch = name.includes(searchValue);
        const matchesCategory =
            categoryValue === "All" || category === categoryValue;

        product.style.display =
            matchesSearch && matchesCategory ? "block" : "none";
    });
}

searchBtn.addEventListener("click", filterProducts);

searchInput.addEventListener("input", filterProducts);

// Category Filter
document.getElementById("categoryFilter")
    .addEventListener("change", filterProducts);


// Buy Now Function
document.querySelectorAll(".buy-btn").forEach(button => {

    button.addEventListener("click", function() {

        const name = this.dataset.name;
        const price = this.dataset.price;

        alert(
            "Product: " + name +
            "\nPrice: ₹" + price +
            "\n\nThank you for choosing ReUse Market!"
        );

    });

});


// Sell Product Function
const sellForm = document.getElementById("sellForm");

sellForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const description = document.getElementById("productDescription").value.trim();
    const seller = document.getElementById("sellerName").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    if (
        name === "" ||
        price <= 0 ||
        description === "" ||
        seller === ""
    ) {
        alert("Please enter valid product details!");
        return;
    }

    // Create Product Card
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.category = category;

    // Product Image
    const image = document.createElement("img");

    image.src = imageUrl || 
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600";

    image.alt = name;

    image.onerror = function() {
        this.src = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600";
    };

    // Product Information
    const info = document.createElement("div");
    info.className = "product-info";

    const title = document.createElement("h3");
    title.textContent = name;

    const productPrice = document.createElement("h4");
    productPrice.textContent = "₹" + price;

    const productCategory = document.createElement("p");
    productCategory.textContent = "Category: " + category;

    const productDescription = document.createElement("p");
    productDescription.textContent = description;

    const sellerName = document.createElement("p");
    sellerName.textContent = "Seller: " + seller;

    const buyButton = document.createElement("button");
    buyButton.className = "buy-btn";
    buyButton.textContent = "Buy Now";

    buyButton.dataset.name = name;
    buyButton.dataset.price = price;

    buyButton.addEventListener("click", function() {
        alert(
            "Product: " + name +
            "\nPrice: ₹" + price +
            "\n\nThank you for choosing ReUse Market!"
        );
    });

    // Add Elements
    info.append(
        title,
        productPrice,
        productCategory,
        productDescription,
        sellerName,
        buyButton
    );

    card.append(image, info);

    // Add New Product
    document.getElementById("productContainer").appendChild(card);

    // Reset Form
    sellForm.reset();

    // Reset Filters and Search
    searchInput.value = "";
    document.getElementById("categoryFilter").value = "All";

    filterProducts();

    // Show Success Message
    alert("Your product has been posted successfully!");

    // Go to Products
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

});