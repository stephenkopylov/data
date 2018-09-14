import { FetchManager } from "./FetchManager";
import { Category, CompanyCategory, CompanyData, CompanySubCategory, SubCategories } from "./Models";

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
    ];

    public static loadAllData(): Promise<any> {
        return new Promise((resolve, reject) => {
            const categories: CompanyCategory[] = [];

            this.loadDataByCategory(2013, Category.RealEstate, 38).then((category: CompanyCategory) => {
                categories.push(category);

                resolve(categories);
            });
        });
    }


    public static loadDataByCategory(year: number, category: Category, numberOfCompanies: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const subCategorieCodes: number[] = SubCategories[category];

            const subCategories: CompanySubCategory[] = [];

            subCategorieCodes.forEach((subCategoryCode: number) => {
                this.loadDataBySubCategory(year, subCategoryCode).then((result: CompanyData[]) => {

                    const subCategory: CompanySubCategory = new CompanySubCategory(subCategoryCode, result);

                    subCategories.push(subCategory);

                    if (subCategories.length == subCategorieCodes.length) {
                        const category: CompanyCategory = new CompanyCategory(1, subCategories);

                        resolve(category);
                    }
                });
            });
        });
    }

    public static loadDataBySubCategory(year: number, subCategory: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestData: RequestData = new RequestData(year, subCategory, 38);

            this.loadData(requestData).then((result: CompanyData[]) => {
                resolve(result);
            })
        });
    }

    private static loadData(requestData: RequestData): Promise<any> {
        return new Promise((resolve, reject) => {
            FetchManager.testFetchNew(requestData.year, requestData.subCategory).then((result: any) => {
                const resultRaw: [] = result['results'];

                const resultParsed: CompanyData[] = [];

                resultRaw.forEach((companyDataRaw: {}) => {
                    const companyData: CompanyData = CompanyData.createWithJson(companyDataRaw, requestData.year, true);

                    if (companyData) {
                        resultParsed.push(companyData);
                    }
                });

                resolve(resultParsed);
            });
        });
    }
}

export class RequestData {
    public year: number;
    public subCategory: number;
    public numberOfCompanies: number;

    constructor(year: number, subCategory: number, numberOfCompanies: number) {
        this.year = year;
        this.subCategory = subCategory;
        this.numberOfCompanies = numberOfCompanies;
    }
}