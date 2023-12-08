// validations.js
(function () {
    "use strict"
    window.validate = {
        // alphabet validations
        alphabets: function (fieldName, errorId, formData) {
            const value = formData.get(fieldName);
            const para = document.getElementById(errorId);

            if (value.trim() === "") {
                para.innerText = "Field cannot be empty";
                return false;
            }
            else if (!value.toLowerCase().trim().match(/^[A-Za-z]+$/)) {
                para.innerText = "Name must be an Alphabet";
                return false;
            } else {
                para.innerText = "";
                return true;
            }
        },

        //number
        phoneNumber: function (fieldName, errorId, formData) {
            const value = formData.get(fieldName);
            const para = document.getElementById(errorId);

            if (value.trim() === "") {
                para.innerText = "Field cannot be empty";
                return false;
            }

            else if (!value.trim().match(/^[0-9]+$/) || value.trim().length !== 10) {
                para.innerText = "Enter 10-digit number";
                return false;
            }

            else {
                para.innerText = "";
                return true;
            }
        },

        //pincode
        zipcode: function (fieldName, errorId, formData) {
            const value = formData.get(fieldName);
            const para = document.getElementById(errorId);

            if (value.trim() === "") {
                para.innerText = "Field cannot be empty";
                return false;
            }
            else if (!value.trim().match(/^[0-9]+$/) || value.trim().length !== 6) {
                para.innerText = "Invalid Zipcode";
                return false;
            } else {
                para.innerText = "";
                return true;
            }
        },

        address: function (fieldName, errorId, formData) {
            const value = formData.get(fieldName);
            const para = document.getElementById(errorId);

            if (value.trim() === "") {
                para.innerText = "Field cannot be empty";
                return false;
            }

            else if (value.trim().length < 5 || value.trim().length > 100) {
                para.innerText = "Enter a valid address";
                return false;
            } else {
                para.innerText = "";
                return true;
            }
        }
    };
})();
