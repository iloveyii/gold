/**
 * These are the prices of 4 data sets (of days)
 * @type {number[][]}
 */
const levels = [
    [7, 12, 5, 3, 11, 6, 10, 2, 9],
    [7, 1, 5, 9, 2, 5, 4, 8, 5, 6, 9],
    [7, 3, 8, 5, 10, 10, 3, 8, 1, 3, 9, 3, 7, 12, 10, 7, 8, 10, 1, 7, 5, 8],
    [10, 3, 7, 9, 2, 12, 6, 2, 6, 7, 9, 10, 12, 8, 4, 10, 1, 11, 8, 7, 3, 6],
];


/**
 * This class takes an array of prices for several days
 * It finds you the best purchase price and best sale price ( days )
 */
class Gold {
    constructor(daysPrices) {
        console.log('Data set : ');
        console.log(daysPrices);

        this.findBestSale(daysPrices);
        console.log('');
    }

    /**
     * Find the best sale
     * Let best sale is first day - find its profit
     * Comparing it with the next days profit
     * @param daysPrices
     */
    findBestSale(daysPrices) {
        const end = daysPrices.length;

        const bestSale = {
            buyIndex : null,
            buyPrice: null,
            saleIndex: null,
            salePrice: null,
            profit: 0
        };

        daysPrices.forEach((element, currentDay) => {
            const start = currentDay; // current day
            const bestSaleIndexForCurrentDay = this.findMaxPriceInFutureDays(daysPrices, start, end);

            let currentProfit = daysPrices[bestSaleIndexForCurrentDay] - daysPrices[currentDay];
            if(currentProfit > bestSale.profit) {
                bestSale.profit = currentProfit;
                bestSale.buyIndex = currentDay;
                bestSale.buyPrice = daysPrices[currentDay];
                bestSale.saleIndex = bestSaleIndexForCurrentDay;
                bestSale.salePrice = daysPrices[bestSaleIndexForCurrentDay];
            }
        });

        console.log('Max profit indexes: ');
        console.dir(bestSale);

        console.log('Max profit prices: ' , 'Buy for: ' + daysPrices[bestSale.buyIndex] + ', Sell for: ' + daysPrices[bestSale.saleIndex] + ', with profit :' + bestSale.profit);
    }

    /**
     * Find max price in the future days
     * The current day is start
     * end is the total number of days in the array daysPrices
     *
     * @param daysPrices
     * @param start
     * @param end
     * @returns {*}
     */
    findMaxPriceInFutureDays(daysPrices, start, end) {
        const futureDays = daysPrices.slice(start, end);
        const max = Math.max(...futureDays);
        const maxIndex = futureDays.findIndex( price => max === price);
        const maxIndexInDaysPrices = start + maxIndex;

        return maxIndexInDaysPrices;
    }
}

for(let c = 0; c < levels.length; c++) {
    const daysPrices = levels[c];
    new Gold(daysPrices);
}
// Run as
// watch -n 5 node index.js
