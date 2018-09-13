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
        axios({
            method: 'post',
            url: 'https://simfin.com/api/v1/finder?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO',
            data: {
                "search": [
                    {
                        "indicatorId": "1-1",
                        "meta": [
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
                        ],
                        "condition": {
                            "operator": "bt",
                            "value": 1000000
                        }
                    }
                ]
            }
        }).then(function (response) {
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