(function () {
    "use strict"
    const products = {
        //url for fetch
        baseUrl: "https://dummyjson.com/products",

        //fetch url data
        fetchData: async function () {
            try {
                const response = await fetch(this.baseUrl);
                if (response.ok) {
                    const data = await response.json();
                    const getData = this.methods.getFromStorage().products;
                    if (!getData) {
                        this.methods.saveToLocalStorage(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },

        //search
        search: async function (searchValue) {
            const searchURL = `${this.baseUrl}/search?q=${searchValue}`;
            try {
                const responseSearch = await fetch(searchURL);
                if (responseSearch.ok) {
                    const data = await responseSearch.json();
                    return data.products;
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
        },

        //render
        render: function (productObjects) {
            const productsContainer = document.getElementById("js-products");
            let products = ``;
            productObjects.forEach((element) => {
                products += `<li
                data-product-id="${element.id}"
                class=" w-80 hover:shadow-md hover:shadow-gray-400 rounded-lg flex justify-center items-center flex-col cursor-pointer pt-4" >
                 <!-- image -->
                <div class=" w-44">
                    <img class="h-24 object-cover" src=${element.thumbnail}
                        alt="Product Image">
                </div>

                <!--description -->
                <div class="p-4 space-y-2">
                    <h2 class="line-clamp-2">${element.title}</h2>
                    <!-- rating -->
                    <div class="flex gap-2">
                        <div class="bg-green-700 text-white pl-2 py-0.5 rounded-sm text-sm relative w-12 ">${element.rating}
                    </div>

                    <!-- price -->
                    <div class="flex space-x-2 items-center"><span class="font-semibold">&#8377;${element.price}</span>
                    </div>
                    </div>
                    <button type="button" name="cartButton" class="bg-blue-500 text-white px-4 py-2" data-id=${element.id}>Add To Cart</button>
                </li>`;
            });
            productsContainer.innerHTML = products;
        },

        //bind event listeners
        bind: function () {
            //add to cart button
            const addToCart = document.getElementsByName("cartButton");
            for (let products = 0; products < addToCart.length; products++) {
                addToCart[products].addEventListener( "click",this.eventFunctions.productToCart);
            }

            //cart icon
            const cartIcon = document.getElementById("js-cartButton");
            cartIcon.addEventListener("click", this.eventFunctions.showCart);

            //search products
            const searchInput = document.getElementById("js-search");
            searchInput.addEventListener("input", this.eventFunctions.searchProduct);
        },

        //events functions
        eventFunctions: {
            //add to cart function
            productToCart: function (event) {
                const productId = event.target.dataset.id;
                window.location.href = `cartPage.html?id=${productId}`;
            },

            //cart icon function
            showCart: function (event) {
                window.location.href = `cartPage.html`;
            },

            //search functions
            searchProduct: async function () {
                const searchInput = document.getElementById("js-search");
                const searchData = await products.search(searchInput.value);

                const renderSearchResults = async function () {
                    if (searchData !== null) {
                        products.render(searchData);
                    }
                };

                const debouncedRender = products.methods.debounce(
                    renderSearchResults,
                    1000
                );
                debouncedRender();
            },
        },

        //small helping functions
        methods: {
            //save to local storage
            saveToLocalStorage: function (data) {
                const existingData = localStorage.setItem("products",JSON.stringify(data));
                return existingData;
            },

            //get data from local storage
            getFromStorage: function () {
                const getData = JSON.parse(localStorage.getItem("products")) || [];
                return getData;
            },

            //get from cart storage 
            getCartProducts: function (){
                const getData = JSON.parse(localStorage.getItem("cartProducts")) || [];
                return getData;
            },

            // debounce function
            debounce: function (func, delay) {
                let debounceTimer;
                return function (...args) {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => { func.apply(this, args)}, delay);
                };
            },
        },

        //init all functions
        init: function () {
            this.fetchData();
            this.render(this.methods.getFromStorage().products);
            this.bind();
        },
    }
    products.init()
})()