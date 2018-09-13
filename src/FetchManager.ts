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

    public static testFetchNew() {

        let period: any = [
            {
                "id": 6,
                "value": "q1",
                "operator": "eq"
            },
            {
                "id": 7,
                "value": 2015,
                "operator": "eq"
            }
        ];

        axios.post(
            'https://simfin.com/api/v1/finder?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO',
            JSON.stringify({
                "resultsPerPage": 300,
                "search": [
                    // {
                    //     "indicatorId": "0-73",
                    //     "meta": [
                    //         {
                    //             "value": "Diversified Holdings",
                    //             "operator": "eq"
                    //         }
                    //     ],
                    //     "condition": {
                    //         "value": "Diversified Holdings",
                    //         "operator": "eq"
                    //     }
                    // },
                    {
                        "indicatorId": "0-73"
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
        ).then(function (response) {
            response.data
        });

        // var myHeaders = new Headers();
        //
        // myHeaders.append('Content-Type', 'application/json');
        //
        // fetch('https://simfin.com/api/v1/finder?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO', {
        //     method: 'POST',
        //     headers: myHeaders, // this line is important, if this content-type is not set it wont work
        //     body: {"search": []}
        // }).then((response) => {
        //     response.json().then((data: any) => {
        //         console.log('data = ', data);
        //     })
        // }).catch((error: any) => {
        //     console.log('error = ', error);
        // })
    }
}