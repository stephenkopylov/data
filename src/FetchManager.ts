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

            const quarterIndicators: string[] = [
                "2-5",//Income from Continuing Operations
                "2-21",//Total Current Assets
                "2-22",//Property, Plant and Equipment, net
                "2-41",//Total Assets
                "2-57",//Total Current Liabilities
                "4-6",//Total Debt
            ];

            const yearsIndicators: string [] = [
                "1-1",//Revenues
                "1-12",//Selling, General and Administrative
                "1-49",//Income from Continuing Operations
                "3-2",//Depreciation & Amortisation
                "3-13",//Operating Cash Flow
                "4-0",//Gross margin
                "4-5",//Debt to asset ration = leverage
            ];

            let search: any[] = [];

            search.push({
                "indicatorId": "0-1"
            });

            search.push({
                "indicatorId": "0-6"
            });

            search.push({
                "indicatorId": "0-73",
                "condition": {"operator": "eq", "value": category}
            });

            quarterIndicators.forEach((indicatorId: string) => {
                search.push({
                    "indicatorId": indicatorId,
                    "meta": periodQuarter
                })
            });

            yearsIndicators.forEach((indicatorId: string) => {
                search.push({
                    "indicatorId": indicatorId,
                    "meta": periodYear
                })
            });

            axios.post(
                'https://simfin.com/api/v1/finder?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO',
                JSON.stringify({
                    "resultsPerPage": 300,
                    "search": search
                })
            ).then((response: any) => {
                resolve(response.data);
            }).catch(() => {
                reject();
            });
        });
    }
}