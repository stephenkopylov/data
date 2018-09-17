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

    public static testFetchNew(year: number, subCategory: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const quarterIndicators: string[] = [
                "2-5", //Income from Continuing Operations
                "2-21", //Total Current Assets
                "2-22", //Property, Plant and Equipment, net
                "2-41", //Total Assets
                "2-57", //Total Current Liabilities
                "4-6", //Total Debt
                "4-5", //Debt to asset ratio = leverage
                "4-3", //Current ratio
            ];

            const yearsIndicators: string [] = [
                "1-1", //Revenues
                "1-12", //Selling, General and Administrative
                "1-49", //Income from Continuing Operations
                "3-2", //Depreciation & Amortisation
                "3-13", //Operating Cash Flow
                "4-0", //Gross margin
                "4-9", //Return on assets
            ];


            let search: any[] = [];

            search.push({
                "indicatorId": "0-1"
            });

            search.push({
                "indicatorId": "0-6"
            });

            search.push({
                "indicatorId": "4-11"
            });

            search.push({
                "indicatorId": "0-73",
                "condition": {"operator": "eq", "value": subCategory}
            });

            quarterIndicators.forEach((indicatorId: string) => {
                search.push({
                    "indicatorId": indicatorId,
                    "meta": this.getPeriodQuarter(year)
                });

                search.push({
                    "indicatorId": indicatorId,
                    "meta": this.getPeriodQuarter(year + 1)
                });
            });

            yearsIndicators.forEach((indicatorId: string) => {
                search.push({
                    "indicatorId": indicatorId,
                    "meta": this.getPeriodYear(year)
                });

                search.push({
                    "indicatorId": indicatorId,
                    "meta": this.getPeriodYear(year + 1)
                });
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

    public static getPeriodYear(year: number) {
        return [
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
    }

    public static getPeriodQuarter(year: number) {
        return [
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
    }
}