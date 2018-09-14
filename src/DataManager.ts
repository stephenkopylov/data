import { FetchManager } from "./FetchManager";
import { Category, CompanyCategory, CompanyData, CompanySubCategory, SubCategories } from "./Models";


export class DataManager {
    public static loadedCategories: CompanyCategory[] = [];

    public static endCallback: (loadedCategories: CompanyCategory[]) => void = null;

    public static loadAllData(): Promise<any> {
        return new Promise((resolve, reject) => {

            this.loadedCategories = [];

            this.endCallback = () => {
                resolve(this.loadedCategories);
            };

            this.loadNext();
        });
    }

    private static loadNext() {

        const categoryRequestData: CategoryRequestData = companiesData[this.loadedCategories.length];

        this.loadRequestData(categoryRequestData)
            .then((category: CompanyCategory) => {
                this.loadedCategories.push(category);

                this.checkLoaded();
            })
            .catch(() => {
                console.log('loadRequestDataFailed');
                this.loadedCategories.push(new CompanyCategory(categoryRequestData.category, [], []));

                this.checkLoaded();
            });
    }

    private static checkLoaded() {
        if (this.loadedCategories.length == companiesData.length) {
            if (this.endCallback) {
                this.endCallback(this.loadedCategories);
            }
        } else {
            this.loadNext();
        }
    }

    public static loadRequestData(categoryRequestData: CategoryRequestData): Promise<any> {
        return new Promise((resolve, reject) => {
            this.loadDataByCategory(categoryRequestData.year, categoryRequestData.category, categoryRequestData.numberOfCompanies)
                .then((category: CompanyCategory) => {
                    resolve(category);
                }).catch(() => {
                reject();
            });
        });
    }

    public static loadDataByCategory(year: number, category: Category, numberOfCompanies: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const subCategorieCodes: number[] = SubCategories[category];

            const subCategories: CompanySubCategory[] = [];

            let companies: CompanyData[] = [];

            const categoryType: Category = category;

            subCategorieCodes.forEach((subCategoryCode: number) => {
                this.loadDataBySubCategory(year, subCategoryCode).then((result: CompanyData[]) => {

                    const subCategory: CompanySubCategory = new CompanySubCategory(subCategoryCode, result);

                    subCategories.push(subCategory);

                    companies = companies.concat(result);

                    if (subCategories.length == subCategorieCodes.length) {
                        const category: CompanyCategory = new CompanyCategory(categoryType, subCategories, companies);

                        resolve(category);
                    }
                }).catch(() => {
                    reject();
                });
            });
        });
    }

    public static loadDataBySubCategory(year: number, subCategory: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestData: RequestData = new RequestData(year, subCategory);

            this.loadData(requestData).then((result: CompanyData[]) => {
                resolve(result);
            }).catch(() => {
                reject();
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
            }).catch(() => {
                reject();
            });
        });
    }
}

export class CategoryRequestData {
    public year: number;
    public category: Category;
    public numberOfCompanies: number;

    constructor(year: number, category: Category, numberOfCompanies: number) {
        this.year = year;
        this.category = category;
        this.numberOfCompanies = numberOfCompanies;
    }
}

export class RequestData {
    public year: number;
    public subCategory: number;

    constructor(year: number, subCategory: number) {
        this.year = year;
        this.subCategory = subCategory;
    }
}


const companiesData: CategoryRequestData[] = [
    new CategoryRequestData(2012, Category.BasicMaterials, 38),
    new CategoryRequestData(2008, Category.BasicMaterials, 38),

    new CategoryRequestData(2001, Category.ConsumerCyclical, 38),
    
    new CategoryRequestData(2009, Category.ConsumerDefensive, 77),

    new CategoryRequestData(2006, Category.Energy, 38),
    new CategoryRequestData(1999, Category.Energy, 38),

    new CategoryRequestData(2013, Category.Healthcare, 38),
    new CategoryRequestData(2014, Category.Healthcare, 38),
    new CategoryRequestData(2012, Category.Healthcare, 38),
    new CategoryRequestData(2010, Category.Healthcare, 38),
    new CategoryRequestData(2009, Category.Healthcare, 38),
    new CategoryRequestData(1996, Category.Healthcare, 38),
    new CategoryRequestData(2011, Category.Healthcare, 38),

    new CategoryRequestData(2010, Category.Technology, 77),
    new CategoryRequestData(2011, Category.Technology, 77),
    new CategoryRequestData(1997, Category.Technology, 77),
    new CategoryRequestData(1996, Category.Technology, 38),
    new CategoryRequestData(2005, Category.Technology, 38),
    new CategoryRequestData(2000, Category.Technology, 38),
    new CategoryRequestData(1998, Category.Technology, 38),
    new CategoryRequestData(1999, Category.Technology, 38),
    new CategoryRequestData(2007, Category.Technology, 38),
];