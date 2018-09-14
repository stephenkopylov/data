export enum Indicator {
    NameOfCompany,
    Revenues,
    SellingGeneralAndAdministrative,
    IncomeFromContinuingOperations,
    ReceivablesNet,
    TotalCurrentAssets,
    PropertyPlantAndEquipmentNet,
    TotalAssets,
    TotalCurrentLiabilities,
    TotalDebt,
    DepreciationAmortisation,
    OperatingCashFlow,
    GrossMargin,
    DebtToAssetRatio,
}

export const IndicatorCode: {} = {
    '0-1': Indicator.NameOfCompany,
    '1-1': Indicator.Revenues,
    '1-12': Indicator.SellingGeneralAndAdministrative,
    '1-49': Indicator.IncomeFromContinuingOperations,
    '2-5': Indicator.ReceivablesNet,
    '2-21': Indicator.TotalCurrentAssets,
    '2-22': Indicator.PropertyPlantAndEquipmentNet,
    '2-41': Indicator.TotalAssets,
    '2-57': Indicator.TotalCurrentLiabilities,
    '4-6': Indicator.TotalDebt,
    '3-2': Indicator.DepreciationAmortisation,
    '3-13': Indicator.OperatingCashFlow,
    '4-0': Indicator.GrossMargin,
    '4-5': Indicator.DebtToAssetRatio
};

export class CompanyData {
    public name: string = '';
    public currentYearData: CompanyDataByYear;
    public nextYearData: CompanyDataByYear;

    public static createWithJson(data: any, year: number, skipNulls: boolean): CompanyData {
        const companyData: CompanyData = new CompanyData();

        const currentYear: CompanyDataByYear = new CompanyDataByYear(year);
        const nextYear: CompanyDataByYear = new CompanyDataByYear(year + 1);

        const valuesRaw: [] = data['values'];

        const addedKeys: string[] = [];

        let allValuesIsEmpty: boolean = true;
        let nullExists: boolean = false;

        valuesRaw.forEach((data) => {
            const key: string = data['indicatorId'];
            const value: any = data['value'];

            if (value === null) {
                nullExists = true;
            }

            if (value != 0 && allValuesIsEmpty) {
                allValuesIsEmpty = false;
            }

            let currentContainer: CompanyDataByYear = currentYear;

            if (addedKeys.indexOf(key) != -1) {
                currentContainer = nextYear;
            }

            const enumKey: Indicator = IndicatorCode[key];

            switch (enumKey) {
                case Indicator.NameOfCompany: {
                    companyData.name = value;

                    break;
                }

                case Indicator.Revenues: {
                    currentContainer.revenues = value;

                    break;
                }

                case Indicator.SellingGeneralAndAdministrative: {
                    currentContainer.sellingGeneralAndAdministrative = value;

                    break;
                }

                case Indicator.IncomeFromContinuingOperations: {
                    currentContainer.incomeFromContinuingOperations = value;

                    break;
                }

                case Indicator.ReceivablesNet: {
                    currentContainer.receivablesNet = value;

                    break;
                }

                case Indicator.TotalCurrentAssets: {
                    currentContainer.totalCurrentAssets = value;

                    break;
                }

                case Indicator.PropertyPlantAndEquipmentNet: {
                    currentContainer.propertyPlantAndEquipmentNet = value;

                    break;
                }

                case Indicator.TotalAssets: {
                    currentContainer.totalAssets = value;

                    break;
                }

                case Indicator.TotalCurrentLiabilities: {
                    currentContainer.totalCurrentLiabilities = value;

                    break;
                }

                case Indicator.TotalDebt: {
                    currentContainer.totalDebt = value;

                    break;
                }

                case Indicator.DepreciationAmortisation: {
                    currentContainer.depreciationAmortisation = value;

                    break;
                }

                case Indicator.OperatingCashFlow: {
                    currentContainer.operatingCashFlow = value;

                    break;
                }

                case Indicator.GrossMargin: {
                    currentContainer.grossMargin = value;

                    break;
                }

                case Indicator.DebtToAssetRatio: {
                    currentContainer.debtToAssetRatio = value;

                    break;
                }
            }

            addedKeys.push(key);
        });

        companyData.currentYearData = currentYear;
        companyData.nextYearData = nextYear;

        if (nullExists || allValuesIsEmpty) {
            return null;
        }

        return companyData;
    }
}

export class CompanyDataByYear {
    public year: number = 0;
    public revenues: Number = 0;
    public sellingGeneralAndAdministrative: Number = 0;
    public incomeFromContinuingOperations: Number = 0;
    public receivablesNet: Number = 0;
    public totalCurrentAssets: Number = 0;
    public propertyPlantAndEquipmentNet: Number = 0;
    public totalAssets: Number = 0;
    public totalCurrentLiabilities: Number = 0;
    public totalDebt: Number = 0;
    public depreciationAmortisation: Number = 0;
    public operatingCashFlow: Number = 0;
    public grossMargin: Number = 0;
    public debtToAssetRatio: Number = 0;

    constructor(year: number) {
        this.year = year;
    }
}

export enum Category {
    Industrials,
    Technology,
    ConsumerDefensive,
    ConsumerCyclical,
    FinancialServices,
    Utilities,
    Healthcare,
    Energy,
    BusinessServices,
    RealEstate,
    BasicMaterials,
    Other,
    CommunicationServices
}


export const CategoryNames = {
    [Category.Industrials]: 'Industrials',
    [Category.Technology]: 'Technology',
    [Category.ConsumerDefensive]: 'Consumer Defensive',
    [Category.ConsumerCyclical]: 'Consumer Cyclical',
    [Category.FinancialServices]: 'Financial Services',
    [Category.Utilities]: 'Utilities',
    [Category.Healthcare]: 'Healthcare',
    [Category.Energy]: 'Energy',
    [Category.BusinessServices]: 'Business Services',
    [Category.RealEstate]: 'Real Estate',
    [Category.BasicMaterials]: 'Basic Materials',
    [Category.Other]: 'Other',
    [Category.CommunicationServices]: 'Communication Services'
};

type FooMap = { [key in Category]: number[] }

export const SubCategories: FooMap = {
    [Category.Industrials]: [100001, 100002, 100003, 100004, 100005, 100006, 100007, 100008, 100009, 100010, 100011, 100012, 100013],
    [Category.Technology]: [101001, 101002, 101003, 101004, 101005],
    [Category.ConsumerDefensive]: [102001, 102002, 102003, 102004, 102005, 102006],
    [Category.ConsumerCyclical]: [103001, 103002, 103003, 103004, 103005, 103011, 103013, 103015, 103018, 103020, 103026],
    [Category.FinancialServices]: [104001, 104002, 104003, 104004, 104005, 104006, 104007, 104013],
    [Category.Utilities]: [105001, 105002],
    [Category.Healthcare]: [106001, 106002, 106003, 106004, 106005, 106006, 106011, 106014],
    [Category.Energy]: [107001, 107002, 107003, 107004, 107005, 107006],
    [Category.BusinessServices]: [108001, 108002],
    [Category.RealEstate]: [109001, 109002],
    [Category.BasicMaterials]: [110001, 110002, 110003, 110004, 110005, 110006, 110007],
    [Category.Other]: [111001],
    [Category.CommunicationServices]: [112001],
};

export class CompanyCategory {
    public category: Category = 0;
    public categoryName: string = '';
    public subCategories: CompanySubCategory[] = [];
    public companies: CompanyData[] = [];

    constructor(category: Category, subCategories: CompanySubCategory[], companies: CompanyData[]) {
        this.category = category;
        this.categoryName = CategoryNames[category];
        this.subCategories = subCategories;
        this.companies = companies;
    }

    public static categoriesToJson(categories: CompanyCategory[]): any[] {
        const catJson: any[] = [[
            '',

            'Revenues', '',
            'Selling general and administrative', '',
            'Income from continuing operations', '',
            'Receivables Net', '',
            'Total Current Assets', '',
            'Property Plant And Equipment Net', '',
            'Total Assets', '',
            'Total Current Liabilities', '',
            'Total Debt', '',
            'Depreciation Amortisation', '',
            'Operating Cash Flow', '',
            'Gross Margin', '',
            'Debt To Asset Ratio', '',
        ]];

        categories.forEach((category: CompanyCategory) => {
            if (category.companies.length > 0 && category.subCategories.length > 0 && category.subCategories[0].companies.length > 0) {
                catJson.push(['']);

                const currentYear = category.subCategories[0].companies[0].currentYearData.year;
                const nextYear = category.subCategories[0].companies[0].nextYearData.year;

                catJson.push([`${category.categoryName}(${currentYear}-${nextYear})`,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                    currentYear, nextYear,
                ]);

                category.companies.forEach((company: CompanyData) => {
                    const companyArray: any[] = [];

                    companyArray.push(company.name);

                    companyArray.push(company.currentYearData.revenues);
                    companyArray.push(company.nextYearData.revenues);

                    companyArray.push(company.currentYearData.sellingGeneralAndAdministrative);
                    companyArray.push(company.nextYearData.sellingGeneralAndAdministrative);

                    companyArray.push(company.currentYearData.incomeFromContinuingOperations);
                    companyArray.push(company.nextYearData.incomeFromContinuingOperations);


                    companyArray.push(company.currentYearData.receivablesNet);
                    companyArray.push(company.nextYearData.receivablesNet);

                    companyArray.push(company.currentYearData.totalCurrentAssets);
                    companyArray.push(company.nextYearData.totalCurrentAssets);

                    companyArray.push(company.currentYearData.propertyPlantAndEquipmentNet);
                    companyArray.push(company.nextYearData.propertyPlantAndEquipmentNet);

                    companyArray.push(company.currentYearData.totalAssets);
                    companyArray.push(company.nextYearData.totalAssets);

                    companyArray.push(company.currentYearData.totalCurrentLiabilities);
                    companyArray.push(company.nextYearData.totalCurrentLiabilities);

                    companyArray.push(company.currentYearData.totalDebt);
                    companyArray.push(company.nextYearData.totalDebt);

                    companyArray.push(company.currentYearData.depreciationAmortisation);
                    companyArray.push(company.nextYearData.depreciationAmortisation);

                    companyArray.push(company.currentYearData.operatingCashFlow);
                    companyArray.push(company.nextYearData.operatingCashFlow);

                    companyArray.push(company.currentYearData.grossMargin);
                    companyArray.push(company.nextYearData.grossMargin);

                    companyArray.push(company.currentYearData.debtToAssetRatio);
                    companyArray.push(company.nextYearData.debtToAssetRatio);

                    catJson.push(companyArray);
                });
            }
        });

        return catJson;
    }
}

export class CompanySubCategory {
    public subCategoryId: number = 0;
    public companies: CompanyData[];

    constructor(subCategoryId: number, companies: CompanyData[]) {
        this.subCategoryId = subCategoryId;
        this.companies = companies;
    }
}