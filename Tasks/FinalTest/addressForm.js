(function () {
    const paymentForm = {
        options: {
            key: "rzp_test_3dDnGBvzftmxAc",
            amount: 500,
            currency: "INR",
            "order_id": "order_N9rPuETvHL3RzS",
            name: "Acme Corp",
            description: "A Wild Sheep Chase is the third novel by Japanese author Haruki Murakami",
            image: "https://static.vecteezy.com/system/resources/previews/011/883/287/non_2x/modern-letter-c-colorful-logo-with-watter-drop-good-for-technology-logo-company-logo-dummy-logo-bussiness-logo-free-vector.jpg",
            "handler": function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature)
                if (response.razorpay_payment_id) {
                    //only store data on payment success
                    const formData = new FormData(document.querySelector('form'));
                    const userData = {
                        firstName: formData.get('first_name'),
                        lastName: formData.get('last_name'),
                        phoneNumber: formData.get('number'),
                        zipcode: formData.get('zipcode'),
                        city: formData.get('city'),
                        state: formData.get('state'),
                        address: formData.get('address'),
                        paymentId : response.razorpay_payment_id,
                        orderId : response.razorpay_order_id,
                    };

                    localStorage.setItem('userData', JSON.stringify(userData));
                    window.location.href = "thanksOrdering.html"
                } else {
                    // Payment failed
                    console.error('Payment failed!');
                }
            },
            prefill: {
                name: "Sukhpal Singh",
                email: "sukhpal@gmail.com"
            },
            theme: {
                color: "#F37254"
            }
        },

        razorpay: null,

        razorpayHandleError: function () {
            this.rzp = new Razorpay(this.options);
            this.rzp.on('payment.success', function (response) {
                console.log('Payment success:', response.json());
            });

            this.rzp.on('payment.error', function (error) {
                console.error('Payment error:', error);
            });
        },

        //add form validations
        validateForm: function () {
            const formData = new FormData(document.querySelector('form'));
            const firstNameValid = validate.alphabets('first_name', 'js-fName_para', formData);
            const lastNameValid = validate.alphabets('last_name', 'js-lName_para', formData);
            const phoneNumber = validate.phoneNumber('number', 'js-number_para', formData);
            const zipcode = validate.zipcode('zipcode', 'js-zipcode_para', formData);
            const cityValid = validate.alphabets('city', 'js-city_para', formData);
            const stateValid = validate.alphabets('state', 'js-state_para', formData);
            const addressValid = validate.address('address', 'js-address_para', formData);

            return firstNameValid && lastNameValid && phoneNumber && zipcode && cityValid && stateValid && addressValid
        },

        bindFormSubmission: function () {
            const form = document.querySelector('form');
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (paymentForm.validateForm()) {
                    console.log('Form is valid!');
                } else {
                    console.log('Form validation failed!');
                }
            });
        },

        // methods
        methods: {
            createButton: function (btnConfig) {
                const btn = document.createElement('button');
                btn.className = btnConfig.className;
                btn.innerHTML = btnConfig.text;
                btn.id = btnConfig.id;
                return btn;
            },

            razorpayButton: function () {
                const btnConfig = {
                    text: 'Pay with Razorpay',
                    className: 'bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600',
                    id: 'js-razorpayButton'
                };

                const btn = this.createButton(btnConfig);
                const container = document.getElementById('razorpay-container');
                container.appendChild(btn);
            },
        },

        bind: function () {
            const btn = document.getElementById('js-razorpayButton')
            btn.addEventListener('click', function () {
                if (paymentForm.validateForm()) {
                    paymentForm.rzp.open();
                } else {
                    console.log('Form validation failed! Razorpay not opened.');
                }
            });
        },

        init: function () {
            this.razorpayHandleError();
            this.methods.razorpayButton();
            this.bind()
        }
    };
    paymentForm.init()
})();