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
            productObjects.forEach((element, index) => {
                const uniqueId = `gallery-${index}`;
                products += `<li id="${uniqueId}"
                        data-product-id="${element.id}"
                        class="w-80 hover:shadow-md hover:shadow-gray-400 rounded-lg flex flex-col cursor-pointer p-2 transform transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-300">

                        <!-- image -->
                        <div class="w-full h-44">
                            <img class="w-full h-full object-cover rounded-md shadow-md hover:shadow-lg" src="${element.thumbnail}" alt="Product Image">
                        </div>

                        <!-- description -->
                        <div class="p-4 space-y-2 text-center">
                            <h2 class="line-clamp-2 text-xl font-semibold text-gray-800">${element.title}</h2>

                            <!-- rating -->
                            <div class="flex gap-2 items-center justify-center">
                                <div class="bg-green-700 text-white pl-2 flex py-0.5 rounded-sm text-sm relative w-16"><svg class=" h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path>
                              </svg>${element.rating}</div>

                                <!-- price -->
                                <div class="flex space-x-2 items-center">
                                    <span class="font-semibold text-lg">&#8377;${element.price}</span>
                                </div>
                            </div>

                            <!-- add to cart button with hover effect -->
                            <button type="button" name="cartButton"
                                class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none"
                                data-id="${element.id}">Add To Cart</button>
                        </div>
                    </li>`;
            });
            productsContainer.innerHTML = products;
        },

        //bind event listeners
        bind: function () {
            //add to cart button
            const addToCart = document.getElementsByName("cartButton");
            for (let products = 0; products < addToCart.length; products++) {
                addToCart[products].addEventListener("click", this.eventFunctions.productToCart);
            }

            //cart icon
            const cartIcon = document.getElementById("js-cartButton");
            cartIcon.addEventListener("click", this.eventFunctions.showCart);

            //search products
            const searchInput = document.getElementById("js-search");
            searchInput.addEventListener("input", this.eventFunctions.searchProduct);

            //transaction summary
            const transactionSummary = document.getElementById('js-summary')
            transactionSummary.addEventListener("click", products.eventFunctions.summary)

            const galleryItems = document.querySelectorAll("#js-products li");
            galleryItems.forEach((item) => {
                const uniqueId = item.id;
                const gallery = new Viewer(document.getElementById(uniqueId), {
                    toolbar: {
                        zoomIn: 1,
                        zoomOut: 1,
                        rotateLeft: 1,
                        rotateRight: 1,
                        flipHorizontal: 1,
                        flipVertical: 1,
                    },
                });
            });
        },

        //events functions
        eventFunctions: {
            //add to cart function
            productToCart: function (event) {
                const productId = event.target.dataset.id;
                const cartData = products.methods.getCartProducts();
                const existingItemIndex = cartData.findIndex((item) => item.id == productId);
                if (existingItemIndex !== -1) {
                    const increamentCount = cartData[existingItemIndex].count += 1;
                    products.methods.setCartStorage(cartData)
                }

                window.location.href = `cartPage.html?id=${productId}`;
            },

            //cart icon function
            showCart: function (event) {
                window.location.href = `cartPage.html`;
            },

            //transaction summary
            summary: function () {
                window.location.href = `transactionSummary.html`
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
                const existingData = localStorage.setItem("products", JSON.stringify(data));
                return existingData;
            },

            //save data to cart storage
            setCartStorage: function (cartData) {
                localStorage.setItem('cartProducts', JSON.stringify(cartData));
            },

            //get data from local storage
            getFromStorage: function () {
                const getData = JSON.parse(localStorage.getItem("products")) || [];
                return getData;
            },

            //get from cart storage 
            getCartProducts: function () {
                const getData = JSON.parse(localStorage.getItem("cartProducts")) || [];
                return getData;
            },

            // debounce function
            debounce: function (func, delay) {
                let debounceTimer;
                return function (...args) {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => { func.apply(this, args) }, delay);
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