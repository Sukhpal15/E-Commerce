(function () {
    require("dotenv").config()
    const games = {
        fetchData: async function () {
            const url = 'https://gamerpower.p.rapidapi.com/api/filter?platform=epic-games-store.steam.android&type=game.loot';
            const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': process.env.XRapidAPIKey,
                    // 'X-RapidAPI-Host': process.env.XRapidAPIHost
                }
            };
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                return result;
            } catch (error) {
                console.error(error);
            }
        },
        // render
        render: async function () {
            const gamesData = await this.fetchData();
            const ul = document.getElementById('js-ul')
            let gamesProducts = ``;
            gamesData.forEach((element) => {
                console.log(element)
                gamesProducts += `<li
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
                        <div class="bg-green-700 text-white pl-2 py-0.5 rounded-sm text-sm relative w-12 ">${element.status}
                    </div>

                    <!-- price -->
                    <div class="flex space-x-2 items-center"><span class="font-semibold">&#8377;${element.platforms}</span>
                    </div>
                </div>
                </li>`;
            });
            ul.innerHTML = gamesProducts
        },
        init: async function () {
           await games.render()
        }
    }
    games.init()
})()