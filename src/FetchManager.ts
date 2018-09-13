export class FetchManager {
    public static testFetch() {
        fetch('https://simfin.com/api/v1/info/find-id/ticker/AAPL?api-key=uwAPKLPaWmwjxnYA8nwmsC7tm6zQsswO', {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }, // this line is important, if this content-type is not set it wont work
        }).then((response) => {
            response.json().then((data: any) => {
                console.log('data = ', data);
            })
        }).catch((error: any) => {
            console.log('error = ', error);
        })
    }
}