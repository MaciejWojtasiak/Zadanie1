async function getItems() {
    const response = await fetch('./offers.json');
    const data = await response.json();
    displayItems(data);
    highlightOffer();
}
getItems();

function displayItems(data) {
    const { offers } = data;
    const itemsArray = getFourItems(offers);
    const itemsDiv = document.querySelector('.items');

    itemsDiv.innerHTML = itemsArray.map(offer => {
        const { name, price, currency, imgURL } = offer;
        const fixedPrice = formatPrice(price, currency);

        return ` <div class="item">
                    <div class="item_img">
                        <img src="${imgURL}" alt="${name}">
                    </div>
                    <div class="item_description">
                        <strong class="price">${fixedPrice}</strong>
                    </div>
                    </div>`;
    }).join('');
}

function formatPrice(price, currency) {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: `${currency}`,
    });

    return formatter.format(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getFourItems(offers) {
    const offersArray = [];
    const offersAmount = offers.length;

    while (offersArray.length < 4) {
        let randomNumber = Math.floor(Math.random() * offersAmount);

        if (offersArray.indexOf(offers[randomNumber]) !== -1) {
            continue;
        } else {
            offersArray.push(offers[randomNumber]);
        }
    };
    return offersArray;
}


function highlightOffer() {
    const items = document.querySelectorAll('.item');
    let index = 0;
    setInterval(() => {
        if (index === items.length) {
            index = 0;
        }
        items[index].classList.add('active');
        setTimeout(() => {
            items[index].classList.remove('active');
            index++;
        }, 1900);
    }, 2000);

}
