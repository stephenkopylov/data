import axios from 'axios';

export class FetchManager {

    public static testFetch() {
        axios({
            method: 'post',
            url: 'https://simfin.com/api/v1/companies/id/111052/ratios?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO'
        }).then(function (response) {
            console.log('data = ', response.data);
        });

    }

    public static testFetchNew(year: number, category: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let periodYear: any = [
                {
                    "id": 6,
                    "value": "fy",
                    "operator": "eq"
                },
                {
                    "id": 7,
                    "value": year,
                    "operator": "eq"
                }
            ];


            let periodQuarter: any = [
                {
                    "id": 6,
                    "value": "q1",
                    "operator": "eq"
                },
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
                            "indicatorId": "0-1"
                        },
                        {
                            "indicatorId": "0-6"
                        },
                        {
                            "indicatorId": "0-73",
                            "condition": {"operator": "eq", "value": category}
                        },
                        {
                            "indicatorId": "1-1",//Revenues
                            "meta": periodYear
                        },
                        {
                            "indicatorId": "1-12",//Selling, General and Administrative
                            "meta": periodYear
                        },
                        {
                            "indicatorId": "1-49",//Income from Continuing Operations
                            "meta": periodYear
                        },
                        {
                            "indicatorId": "2-5",//Receivables, net
                            "meta": periodQuarter
                        },
                        {
                            "indicatorId": "2-21",//Total Current Assets
                            "meta": periodQuarter
                        },
                        {
                            "indicatorId": "2-22",//Property, Plant and Equipment, net
                            "meta": periodQuarter
                        },
                        {
                            "indicatorId": "2-41",//Total Assets
                            "meta": periodQuarter
                        },
                        {
                            "indicatorId": "2-57",//Total Current Liabilities
                            "meta": periodQuarter
                        },
                        {
                            "indicatorId": "4-6",//Total Debt
                            "meta": periodQuarter
                        },
                        {
                            "indicatorId": "3-2",//Depreciation & Amortisation
                            "meta": periodYear
                        },
                        {
                            "indicatorId": "3-13",//Operating Cash Flow
                            "meta": periodYear
                        },
                        {
                            "indicatorId": "4-0",//Gross margin
                            "meta": periodYear
                        },
                        {
                            "indicatorId": "4-5",//Debt to asset ration = leverage
                            "meta": periodYear
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