import { FetchManager } from "./FetchManager";
import { Category, CompanyCategory, CompanyData, CompanySubCategory, SubCategories } from "./Models";


export class DataManager {
    public static loadedSubCategories: CompanySubCategory[] = [];

    public static loadedCategories: CompanyCategory[] = [];

    public static endCallback: (loadedCategories: CompanyCategory[]) => void = null;

    public static subCategoriesLoaded: () => void = null;

    public static currentCategory: CategoryRequestData = null;

    public static companies: CompanyData[] = [];

    public static year: number;

    public static category: Category;

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

        this.currentCategory = categoryRequestData;

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
            this.loadDataByCategory(categoryRequestData.year, categoryRequestData.category)
                .then((category: CompanyCategory) => {
                    resolve(category);
                }).catch(() => {
                reject();
            });
        });
    }

    public static loadDataByCategory(year: number, category: Category): Promise<any> {
        return new Promise((resolve, reject) => {
            const categoryType: Category = category;

            this.loadedSubCategories = [];

            this.companies = [];

            this.year = year;

            this.category = categoryType;

            this.subCategoriesLoaded = () => {
                const category: CompanyCategory = new CompanyCategory(categoryType, this.loadedSubCategories, this.companies);

                resolve(category);
            };

            this.loadNextSubcateogory();

            // subCategorieCodes.forEach((subCategoryCode: number) => {
            //     this.loadDataBySubCategory(year, subCategoryCode).then((result: CompanyData[]) => {
            //
            //         const subCategory: CompanySubCategory = new CompanySubCategory(subCategoryCode, result);
            //
            //         subCategories.push(subCategory);
            //
            //         companies = companies.concat(result);
            //
            //         if (subCategories.length == subCategorieCodes.length) {
            //             const category: CompanyCategory = new CompanyCategory(categoryType, subCategories, companies);
            //
            //             resolve(category);
            //         }
            //     }).catch(() => {
            //         reject();
            //     });
            // });
        });
    }

    public static loadNextSubcateogory() {
        const subCategorieCodes: number[] = SubCategories[this.currentCategory.category];

        const subCategoryCode: number = subCategorieCodes[this.loadedSubCategories.length];

        this.loadDataBySubCategory(this.year, subCategoryCode).then((result: CompanyData[]) => {

            const subCategory: CompanySubCategory = new CompanySubCategory(subCategoryCode, result);

            this.loadedSubCategories.push(subCategory);

            this.companies = this.companies.concat(result);

            if (subCategorieCodes.length == this.loadedSubCategories.length) {
                if (this.subCategoriesLoaded) {
                    this.subCategoriesLoaded();
                }
            } else {
                this.loadNextSubcateogory();
            }
        }).catch(() => {
            this.loadNextSubcateogory();
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
    new CategoryRequestData(2015, Category.BasicMaterials, 38),
    new CategoryRequestData(2010, Category.BasicMaterials, 38),
    new CategoryRequestData(2009, Category.BasicMaterials, 38),

    new CategoryRequestData(2008, Category.ConsumerCyclical, 38),

    new CategoryRequestData(2009, Category.ConsumerDefensive, 77),

    new CategoryRequestData(2010, Category.Energy, 38),
    new CategoryRequestData(2013, Category.Energy, 38),

    new CategoryRequestData(2013, Category.Healthcare, 38),
    new CategoryRequestData(2014, Category.Healthcare, 38),
    new CategoryRequestData(2012, Category.Healthcare, 38),
    new CategoryRequestData(2010, Category.Healthcare, 38),
    new CategoryRequestData(2009, Category.Healthcare, 38),
    new CategoryRequestData(2008, Category.Healthcare, 38),
    new CategoryRequestData(2011, Category.Healthcare, 38),

    new CategoryRequestData(2010, Category.Technology, 77),
    new CategoryRequestData(2011, Category.Technology, 77),
    new CategoryRequestData(2009, Category.Technology, 77),
    new CategoryRequestData(2013, Category.Technology, 38),
    new CategoryRequestData(2015, Category.Technology, 38),
    new CategoryRequestData(2008, Category.Technology, 38),
    new CategoryRequestData(2017, Category.Technology, 38),
    new CategoryRequestData(2016, Category.Technology, 38),
    new CategoryRequestData(2018, Category.Technology, 38),
];