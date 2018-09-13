import { FetchManager } from "./FetchManager";
import { CompanyData } from "./Models";

export class DataManager {
    private companiesData: RequestData[] = [
        // new RequestData(2012, 'Basic Materials', 38),
        // new RequestData(2008, 'Basic Materials', 38),
        // new RequestData(2001, 'Consumer Cyclicals', 38),
        // new RequestData(2009, 'Consumer Non-Cyclicals', 77),
        // new RequestData(2006, 'Energy', 38),
        // new RequestData(1999, 'Energy', 38),
        // new RequestData(2013, 'Healthcare', 38),
        // new RequestData(2014, 'Healthcare', 38),
        // new RequestData(2012, 'Healthcare', 38),
        // new RequestData(2010, 'Healthcare', 38),
        // new RequestData(2009, 'Healthcare', 38),
        // new RequestData(1996, 'Healthcare', 38),
        // new RequestData(2011, 'Healthcare', 38),
        // new RequestData(2010, 'Technology', 77),
        // new RequestData(2011, 'Technology', 77),
        // new RequestData(1997, 'Technology', 77),
        // new RequestData(1996, 'Technology', 38),
        // new RequestData(2005, 'Technology', 38),
        // new RequestData(2000, 'Technology', 38),
        // new RequestData(1998, 'Technology', 38),
        // new RequestData(1999, 'Technology', 38),
        // new RequestData(2007, 'Technology', 38),
    ]

    public static loadAllData() {
        this.loadData(new RequestData(2015, 101003, 38))
    }

    private static loadData(requestData: RequestData) {
        FetchManager.testFetchNew(requestData.year, requestData.category).then((result: any) => {
            const resultRaw: [] = result['results'];
            resultRaw.forEach((companyDataRaw: {}) => {
                const companyData: CompanyData = CompanyData.createWithJson(companyDataRaw);

                console.log('companyData = ', companyData);
            })
        });
    }
}

export class RequestData {
    public year: number;
    public category: number;
    public numberOfCompanies: number;

    constructor(year: number, category: number, numberOfCompanies: number) {
        this.year = year;
        this.category = category;
        this.numberOfCompanies = numberOfCompanies;
    }
}