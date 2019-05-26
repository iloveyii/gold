<?php
define('DEBUG', 0);

class Gold
{
    private $levels = [
        1 => [7, 12, 5, 3, 11, 6, 10, 2, 9],
        2 => [7, 1, 5, 9, 2, 5, 4, 8, 5, 6, 9],
        3 => [7, 3, 8, 5, 10, 10, 3, 8, 1, 3, 9, 3, 7, 12, 10, 7, 8, 10, 1, 7, 5, 8],
        4 => [10, 3, 7, 9, 2, 12, 6, 2, 6, 7, 9, 10, 12, 8, 4, 10, 1, 11, 8, 7, 3, 6],
    ];
    private $daysPrices = [];

    public function __construct($intLevel)
    {
        $this->daysPrices = $this->levels[$intLevel];
    }

    public function findBestPurchaseAndSale()
    {
        $maxProfit = 0;
        $bestSale = [];

        foreach ($this->daysPrices as $index => $buyPrice) {
            $sales = $this->findBestSalePrice($buyPrice, $index);
            if ($sales['maxProfit'] > $maxProfit) {
                $maxProfit = $sales['maxProfit'];
                $bestSale = $sales;
            }
        }


        echo "Best purchase day is {$bestSale['bestPurchaseIndex']} ( {$bestSale['buyPrice']} ) and best sale day is {$bestSale['bestSaleIndex']} ( {$bestSale['bestSalePrice']} ) with maximum possible profit of {$bestSale['maxProfit']}.";
        echo PHP_EOL;
    }

    private function findBestSalePrice($buyPrice, $afterIndex)
    {
        $maxProfit = 0;
        $bestSalePrice = $buyPrice;
        $bestPurchaseIndex = $afterIndex;
        $bestSaleIndex = $afterIndex;

        for ($i = $afterIndex; $i < count($this->daysPrices); $i++) {
            $salePrice = $this->daysPrices[$i];
            $profit = $salePrice - $buyPrice;
            if ($profit > $maxProfit) {
                $maxProfit = $profit;
                $bestSalePrice = $salePrice;
                $bestPurchaseIndex = $afterIndex;
                $bestSaleIndex = $i;
            }
        }

        if (DEBUG) {
            echo "Best sale price for buyprice {$buyPrice} is {$bestSalePrice} with maxprofit {$maxProfit}. " . PHP_EOL;
        }

        return [
            'buyPrice'=>$buyPrice,
            'bestSalePrice' => $bestSalePrice,
            'maxProfit' =>$maxProfit,
            'bestPurchaseIndex' => $bestPurchaseIndex,
            'bestSaleIndex' =>$bestSaleIndex
        ];
    }

}

$gold = new Gold(4);
$gold->findBestPurchaseAndSale();

