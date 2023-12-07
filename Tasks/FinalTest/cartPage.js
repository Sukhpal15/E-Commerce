(function () {
    "use strict"
    const cart = {
        //fetch data
        fetchProduct: async function () {
            const urlParam = this.methods.productId()
            try {
                const response = await fetch(`https://dummyjson.com/products/${urlParam}`);
                if (response.ok) {
                    const data = await response.json();
                    this.methods.saveToLocalStorage(data)
                    window.location.href = "cartPage.html"
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        },

        //renderData 
        render: function () {
            const localData = this.methods.getData()
            const ul = document.getElementById('js-ul')
            localData.forEach((element) => {
                const li = document.createElement('li')
                li.setAttribute('data-id', element.id)
                li.innerHTML = `<div class="flex items-center border-b pb-4">
                                             <img src="${element.thumbnail}" alt="Item 1" class="w-16 h-16 object-cover rounded">
                                            <div class="ml-4 flex-1">
                                            <h2 class="text-lg font-semibold"">${element.title}</h2>
                                            <p class="text-gray-600">${element.description}</p>
                                        </div>
                                        <div class="flex items-center gap-5">
                                            <span class="mr-2">$${element.price}</span>
                                            <div class="flex items-center bg-gray-100 px-1">
                                               <button type="button" class="plus-button"> <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                                </svg></button>
                                            <input type="text" disabled value="${element.count}" class="w-12 p-2 rounded text-center">
                                            <button type="button" class="minus-button"> <svg class="w-4 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path>
                                            </svg></button>
                                            </div>
                                            <button type="button" class="delete-buttons">
                                                <svg class="w-8 h-8" fill="red" xmlns="http://www.w3.org/2000/svg" id="mdi-delete" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>
                                                </button>
                                        </div>
                                    </div>`

                ul.append(li);
            });
        },

        //render cart seperately
        renderTotal: function () {
            const localData = this.methods.getData()
            let total = 0;
            localData.forEach((element) => {
                total += element.count * element.price;
            });
            const dl = document.getElementById('js-dl')
            dl.innerHTML = ` <div class="flex justify-between items-center">
                                <dt class="text-gray-600">Subtotal:</dt>
                                <dd class="font-semibold" id="js-subTotal">$${total}</dd>
                            </div>
                            <div class="flex justify-between items-center mt-2">
                                <dt class="text-gray-600">Shipping:</dt>
                                <dd class="font-semibold">$5.00</dd>
                            </div>
                            <div class="flex justify-between items-center mt-2">
                                <dt class="text-gray-600">Total:</dt>
                                <dd class="font-semibold">$${total + 5}</dd>
                            </div>`

        },

        //event functions
        eventFunctions: {
            //increase the product quantity
            increaseProductQuantity: function (event) {
                const inputElement = event.target.closest('div').querySelector('input');
                const currentValue = parseInt(inputElement.value);
                const newValue = currentValue + 1;

                const itemId = event.target.closest('li').dataset.id;
                const storedData = JSON.parse(localStorage.getItem('cartProducts')) || [];
                const itemStock = storedData.find(item => item.id == itemId).stock;

                if (newValue > itemStock) {
                    console.log(`Only ${itemStock} items are there in stock`);
                    return;
                }
                inputElement.value = newValue;

                const existingItemIndex = storedData.findIndex(item => item.id == itemId);
                if (existingItemIndex !== -1) {
                    storedData[existingItemIndex].count = newValue;
                    localStorage.setItem('cartProducts', JSON.stringify(storedData));
                }
                cart.renderTotal()
            },


            //decrease the product quantity
            decreaseProductQuantity: function (event) {
                const inputElement = event.target.closest('div').querySelector('input');
                const currentValue = parseInt(inputElement.value);
                let newValue = parseInt(inputElement.value) - 1;
                inputElement.value = newValue;

                if (newValue == 0) {
                    newValue = 0;
                    cart.eventFunctions.removeProduct(event);
                }

                const itemId = event.target.closest('li').dataset.id;
                const storedData = JSON.parse(localStorage.getItem('cartProducts')) || [];

                const existingItemIndex = storedData.findIndex(item => item.id == itemId);
                if (existingItemIndex !== -1) {
                    storedData[existingItemIndex].count = newValue;
                    localStorage.setItem('cartProducts', JSON.stringify(storedData));
                }
                cart.renderTotal()
            },

            //delete product
            removeProduct: function (event) {
                const li = event.target.closest('li')
                const index = Array.from(li.parentElement.children).indexOf(li);
                const storedData = JSON.parse(localStorage.getItem('cartProducts')) || [];
                const updatedData = storedData.filter((item, idx) => idx !== index);
                localStorage.setItem('cartProducts', JSON.stringify(updatedData));
                li.remove();
                cart.renderTotal()
            }
        },

        //bind event listeners
        bind: function () {
            //minus button event
            const minusButtons = document.getElementsByClassName('minus-button')
            for (let i = 0; i < minusButtons.length; i++) {
                minusButtons[i].addEventListener('click', cart.eventFunctions.decreaseProductQuantity)
            }

            //plus button event
            const plusButtons = document.getElementsByClassName('plus-button')
            for (let i = 0; i < minusButtons.length; i++) {
                plusButtons[i].addEventListener('click', cart.eventFunctions.increaseProductQuantity)
            }

            //delete button
            const deleteButton = document.getElementsByClassName('delete-buttons');
            for (let i = 0; i < deleteButton.length; i++) {
                deleteButton[i].addEventListener('click', cart.eventFunctions.removeProduct);
            }

        },

        //small helping functions
        methods: {
            //get id
            productId: function () {
                const keysValues = window.location.search;
                const urlParams = new URLSearchParams(keysValues)
                const param = urlParams.get('id')
                return param
            },

            //add cart data to local storage 
            saveToLocalStorage: function (data) {
                const storedData = JSON.parse(localStorage.getItem('cartProducts')) || [];
                const existingItemIndex = storedData.findIndex(item => item.id === data.id);
                if (existingItemIndex === -1) {
                    data.count = 1;
                    storedData.push(data);
                }
                localStorage.setItem('cartProducts', JSON.stringify(storedData));
            },

            //get added data
            getData: function () {
                const getStoredData = JSON.parse(localStorage.getItem('cartProducts')) || []
                return getStoredData;
            },

            //checkout
            checkout: function () {
                const checkoutButton = document.getElementById('js-checkoutButton')
                checkoutButton.addEventListener("click", function () {
                    window.location.href = "addressForm.html"
                })
            }
        },

        //init
        init: function () {
            this.fetchProduct()
            this.render()
            this.bind()
            this.renderTotal()
            this.methods.checkout()
        }
    }
    cart.init()
})()