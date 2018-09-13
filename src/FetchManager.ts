import axios from 'axios';

export class FetchManager {
    public static testFetch() {
        axios({
            method: 'post',
            url: 'https://simfin.com/api/v1/info/find-id/ticker/AAPL?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO'
        }).then(function (response) {
            console.log('data = ', response.data);
        });

    }

    public static testFetchNew(year: number, category: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let period: any = [
                {
                    "id": 7,
                    "value": year,
                    "operator": "eq"
                }
            ];

            axios.post(
                'https://simfin.com/api/v1/finder?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO',
                JSON.stringify({
                    "resultsPerPage": 300,
                    "search": [
                        {
                            "indicatorId": "0-6"
                        },
                        {
                            "indicatorId": "0-73",
                            "condition": {"operator": "eq", "value": category}
                        },
                        {
                            "indicatorId": "1-1",//Revenues
                            "meta": period
                        },
                        {
                            "indicatorId": "1-2",//Cost of Goods Sold
                            "meta": period
                        },
                        {
                            "indicatorId": "1-12",//Selling, General and Administrative
                            "meta": period
                        },
                        {
                            "indicatorId": "1-49",//Income from Continuing Operations
                            "meta": period
                        },
                        {
                            "indicatorId": "2-5",//Receivables, net
                            "meta": period
                        },
                        {
                            "indicatorId": "2-21",//Total Current Assets
                            "meta": period
                        },
                        {
                            "indicatorId": "2-22",//Property, Plant and Equipment, net
                            "meta": period
                        },
                        {
                            "indicatorId": "2-41",//Total Assets
                            "meta": period
                        },
                        {
                            "indicatorId": "2-57",//Total Current Liabilities
                            "meta": period
                        },
                        {
                            "indicatorId": "4-6",//Total Debt
                            "meta": period
                        },

                        {
                            "indicatorId": "3-2",//Depreciation & Amortisation
                            "meta": period
                        },
                        {
                            "indicatorId": "3-13",//Operating Cash Flow
                            "meta": period
                        }
                    ]
                })
            ).then((response: any) => {
                resolve(response.data);
            }).catch(() => {
                reject();
            });
        });
    }
}