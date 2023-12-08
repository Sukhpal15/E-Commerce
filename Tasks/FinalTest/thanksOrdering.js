(function () {
    const details = {
        //render data
        render: function () {
            const data = this.methods.getformData();
            const container = document.getElementById('js-shoppingDetails')
            let details = ``
            data.forEach((element) => {
                details += `  <div class="px-2">
                <h2 class="font-semibold">Shipping Details</h2>
                <address>
                    <p>${element.firstName} ${element.lastName}</p>
                    <p>${element.address}</p>
                    <p>${element.state}</p>
                </address>
            </div>
            <div class="px-2">
                <h2 class="font-semibold">Payment Details</h2>
                <div class="flex">
                    <address>
                        <div class="px-1">
                            <p>Razorpay</p>
                            <p>${element.paymentId}</p>
                        </div>
                    </address>
                </div>
            </div>`
                container.innerHTML = details
            })
        },

        //helping functions
        methods: {
            //get form storage
            getformData: function () {
                const emptyArray = []
                const data = JSON.parse(localStorage.getItem('userData'))
                emptyArray.push(data)
                console.log(emptyArray)
                return emptyArray;
            },

            //location change
            relocate: function () {
                window.location.href = "productsPage.html"
            }
        },

        bind: function () {
            const continueButton = document.getElementById("js-continue")
            continueButton.addEventListener("click", details.methods.relocate)
        },

        //init
        init: function () {
            details.render()
            details.bind()
        }
    }
    details.init();

})()