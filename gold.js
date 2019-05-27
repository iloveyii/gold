// Started the test at 10:00 am
const levels = [
    [7, 12, 5, 3, 11, 6, 10, 2, 9],
    [7, 1, 5, 9, 2, 5, 4, 8, 5, 6, 9],
    [7, 3, 8, 5, 10, 10, 3, 8, 1, 3, 9, 3, 7, 12, 10, 7, 8, 10, 1, 7, 5, 8],
    [10, 3, 7, 9, 2, 12, 6, 2, 6, 7, 9, 10, 12, 8, 4, 10, 1, 11, 8, 7, 3, 6],
];



class Gold {
    constructor(daysPrices) {
        console.log('Data set : ');
        console.log(daysPrices);

        this.findBestSale(daysPrices);
        console.log('');
    }

    findBestSale(daysPrices) {
        const end = daysPrices.length;

        const bestSale = {
            buyIndex : null,
            saleIndex: null,
            profit: 0
        };

        daysPrices.forEach((element, i) => {
            const start = i;
            const bestSaleIndex = this.findMaxPrice(daysPrices, start, end);

            let currentProfit = daysPrices[bestSaleIndex] - daysPrices[i];
            if(currentProfit > bestSale.profit) {
                bestSale.profit = currentProfit;
                bestSale.buyIndex = i;
                bestSale.saleIndex = bestSaleIndex;
            }

        });

        console.log('Max profit indexes: ' , bestSale);
        console.log('Max profit prices: ' , 'Buy for: ' + daysPrices[bestSale.buyIndex] + ', Sell for: ' + daysPrices[bestSale.saleIndex] + ', with profit :' + bestSale.profit);

    }

    findMaxPrice(daysPrices, start, end) {
        const futureDays = daysPrices.slice(start, end);
        const max = Math.max(...futureDays);
        const maxIndex = futureDays.findIndex( price => max === price);
        const maxIndexIndaysPrices = start + maxIndex;

        return maxIndexIndaysPrices;
    }
}

for(let c = 0; c < levels.length; c++) {
    const daysPrices = levels[c];
    new Gold(daysPrices);
}

