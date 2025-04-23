
var ProductNameInput = document.getElementById("productName");
var ProductPriceInput = document.getElementById("productPrice");
var ProductDescInput = document.getElementById("productDesc");
var ProductCategoryInput = document.getElementById("productCategory");
var ProductImageInput = document.getElementById("productImage");
var productContainer = [];
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

if (localStorage.getItem("products") != null) {
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}
// This function is called when the add button is clicked
// function addProduct() {
//     var product = {
//         name: ProductNameInput.value,
//         price: ProductPriceInput.value,
//         category: ProductCategoryInput.value,
//         desc: ProductDescInput.value,
//         image: ProductImageInput.files[0]
//     }

//     productContainer.push(product);
//     localStorage.setItem("products", JSON.stringify(productContainer));
//     clearForm()
//     displayProducts();
// }

// This another function is called when the add button is clicked
function addProduct() {
    var file = ProductImageInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var product = {
            name: ProductNameInput.value,
            price: ProductPriceInput.value,
            category: ProductCategoryInput.value,
            desc: ProductDescInput.value,
            image: event.target.result 
        };

        productContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productContainer));
        clearForm();
        displayProducts();
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        // If no image selected, you can handle it here (optional)
        alert("Please select an image.");
    }
}



function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productDesc.value = "";
    productCategory.value = "";
    productImage.value = "";
}

function displayProducts() {
    var cartone = ``;
    for (var i = 0; i < productContainer.length; i++) {

        cartone += `
            <div class="product-card">
                <img src="${(productContainer[i].image)}" class="img-fluid">
                <h3> ${productContainer[i].name}</h3>
                <p>Price : $${productContainer[i].price}</p>
                <p>Category : ${productContainer[i].category}</p>
                <p>Description : ${productContainer[i].desc}</p>
               <button onclick="deleteProduct(${i});" class="btn btn-outline-danger  w-25 my-2"> Delete <i class="fa-solid fa-trash"></i> </button>
               <button onclick="updateProduct(${i})" class="btn btn-outline-warning w-25 my-2">  Edit </button>
            </div> `;
    }

    document.getElementById("productList").innerHTML = cartone;
}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts();
}

function searchProduct() {
    var box = ``;
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {
            box += `   <div class="product-card">
            <img src="${(productContainer[i].image)}" class="img-fluid" >
            <h3>  ${productContainer[i].name}</h3>
            <p>Price : $${productContainer[i].price}</p>
            <p>Category : ${productContainer[i].category}</p>
            <p>Description : ${productContainer[i].desc}</p>
           <button onclick="deleteProduct(${i});" class="btn btn-outline-danger  w-25 my-2"> Delete <i class="fa-solid fa-trash"></i> </button>
           <button onclick="updateProduct(${i})" class="btn btn-outline-warning w-25 my-2"> Edit   </i> </button>
        </div> `;
        }
    }
    document.getElementById("productList").innerHTML = box;
    // if no product found
    if (box == "") {
        document.getElementById("productList").innerHTML = `<h2 class="text-center text-danger"> No Product Found </h2>`
    }
}


// function to update the product
var updatedIndex;
function updateProduct(x) {
    // show the update button and hide the add button
    updatedIndex = x;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    ProductNameInput.value = productContainer[x].name;
    ProductPriceInput.value = productContainer[x].price;
    ProductDescInput.value = productContainer[x].desc;
    ProductCategoryInput.value = productContainer[x].category;
    ProductImageInput.value = productContainer[x].image;
}


function updateProductData() {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    productContainer[updatedIndex].name = ProductNameInput.value;
    productContainer[updatedIndex].price = ProductPriceInput.value;
    productContainer[updatedIndex].desc = ProductDescInput.value;
    productContainer[updatedIndex].category = ProductCategoryInput.value;
    productContainer[updatedIndex].image = ProductImageInput.value;

    displayProducts();
    localStorage.setItem("products", JSON.stringify(productContainer));
    clearForm();

}

function validateProductName() {
    var regex =/^([A-Za-z]+|\d+)(\s([A-Za-z]+|\d+))*$/;
    if (regex.test(ProductNameInput.value) == true) {
        ProductNameInput.classList.add("is-valid");
        ProductNameInput.classList.remove("is-invalid");
        return true;
    } else {
        ProductNameInput.classList.add("is-invalid");
        ProductNameInput.classList.remove("is-valid");
        return false;
    }
}
function validateProductPrice() {
    var regex = /^[1-9][0-9]{0,}$/;
    if (regex.test(ProductPriceInput.value) == true) {
        ProductPriceInput.classList.add("is-valid");
        ProductPriceInput.classList.remove("is-invalid");
        return true;
    } else {
        ProductPriceInput.classList.add("is-invalid");
        ProductPriceInput.classList.remove("is-valid");
        return false;
    }
}

function validateProductCategory() {
    var regex = /^[A-Z][a-z]{2,10}$/;
    if (regex.test(ProductCategoryInput.value) == true) {
        ProductCategoryInput.classList.add("is-valid");
        ProductCategoryInput.classList.remove("is-invalid");
        return true;
    } else {
        ProductCategoryInput.classList.add("is-invalid");
        ProductCategoryInput.classList.remove("is-valid");
        return false;
    }
}


function validateProductDesc() {
    var regex = /^[A-Za-z\s]*$/;
    if (regex.test(ProductDescInput.value) == true) {
        ProductDescInput.classList.add("is-valid");
        ProductDescInput.classList.remove("is-invalid");
        return true;
    } else {
        ProductDescInput.classList.add("is-invalid");
        ProductDescInput.classList.remove("is-valid");
        return false;
    }
}
