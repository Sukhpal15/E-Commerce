(function () {
    const summary = {
        //render data
        render: function () {
            let tr = ``
            const data = this.methods.getUserData()
            const tbody = document.getElementById('js-tbody')
            data.forEach((element) => {
                tr += `<tr class="bg-white border-b  hover:bg-gray-50 ">
                    <td scope="row" class="flex items-center px-6 py-4 text-gray-900">
                        <div>
                            <div class="text-base font-semibold">${element.firstName} ${element.lastName}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        ${element.orderId}
                    </td>
                    <td class="px-6 py-4">
                        ${element.paymentId}
                    </td>
                    <td class="px-6 py-4">
                        ${element.phoneNumber}
                    </td>
                    <td class="px-6 py-4">
                        500
                    </td>
                    </tr>`
                    tbody.innerHTML = tr;
            })

        },

        //small functions
        methods: {
            //get data from user data
            getUserData: function () {
                const emptyArray = []
                const data = JSON.parse(localStorage.getItem('userData'))
                emptyArray.push(data)
                console.log(emptyArray)
                return emptyArray;
            }
        }
    }
    summary.render()
})()