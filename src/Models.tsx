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
    MarketCapitalization,
    CurrentRatio,
    ReturnOnAssets,
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
    '4-5': Indicator.DebtToAssetRatio,
    '4-11': Indicator.MarketCapitalization,
    '4-3': Indicator.CurrentRatio,
    '4-9': Indicator.ReturnOnAssets,
};

export class CompanyData {
    public name: string = '';
    public currentYearData: CompanyDataByYear;
    public nextYearData: CompanyDataByYear;
    public marketCap: number;
    public sMarketCap: string;

    public DSR: number = 0;
    public GMI: number = 0;
    public AQI: number = 0;
    public SGI: number = 0;
    public DEPI: number = 0;
    public SGAI: number = 0;
    public Accruals: number = 0;
    public LEVI: number = 0;

    public calculateVars(): boolean {
        let calculated: boolean = true;

        //DSR
        this.DSR = (this.nextYearData.receivablesNet / this.nextYearData.revenues) / (this.currentYearData.receivablesNet / this.currentYearData.revenues);

        //GMI
        this.GMI = this.currentYearData.grossMargin / this.nextYearData.grossMargin;

        //AQI
        const AQI1 = (1 - (this.nextYearData.propertyPlantAndEquipmentNet + this.nextYearData.totalCurrentAssets) / this.nextYearData.totalAssets);
        const AQI2 = (1 - (this.currentYearData.propertyPlantAndEquipmentNet + this.currentYearData.totalCurrentAssets) / this.currentYearData.totalAssets);
        this.AQI = AQI1 / AQI2;

        //SGI
        this.SGI = this.nextYearData.revenues / this.currentYearData.revenues;

        //DEPI
        const currentYearDeprecationRate = this.currentYearData.depreciationAmortisation / (this.currentYearData.depreciationAmortisation + this.currentYearData.propertyPlantAndEquipmentNet);
        const nextYearDeprecationRate = this.nextYearData.depreciationAmortisation / (this.nextYearData.depreciationAmortisation + this.nextYearData.propertyPlantAndEquipmentNet);
        this.DEPI = currentYearDeprecationRate / nextYearDeprecationRate;

        //SGAI
        this.SGAI = (this.nextYearData.sellingGeneralAndAdministrative / this.nextYearData.revenues) / (this.currentYearData.sellingGeneralAndAdministrative / this.currentYearData.revenues);

        //Acrruals
        this.Accruals = (this.nextYearData.incomeFromContinuingOperations - this.nextYearData.operatingCashFlow) / this.nextYearData.totalAssets;

        //LEVI
        this.LEVI = (this.nextYearData.totalDebt / this.nextYearData.totalAssets) / (this.currentYearData.totalDebt / this.currentYearData.totalAssets);


        if (!isFinite(this.AQI) || isNaN(this.AQI) || this.AQI == 0) {
            this.AQI = 1;
        }

        if (!isFinite(this.DEPI) || isNaN(this.DEPI) || this.DEPI == 0) {
            this.DEPI = 1;
        }

        if (!isFinite(this.SGAI) || isNaN(this.SGAI) || this.SGAI == 0) {
            this.SGAI = 1;
        }

        if (!isFinite(this.SGI) || isNaN(this.SGI)) {
            calculated = false;
        }

        if (!isFinite(this.DSR) || isNaN(this.DSR)) {
            calculated = false;
        }

        if (!isFinite(this.GMI) || isNaN(this.GMI)) {
            calculated = false;
        }

        if (!isFinite(this.Accruals) || isNaN(this.Accruals)) {
            calculated = false;
        }

        if (!isFinite(this.LEVI) || isNaN(this.LEVI)) {
            calculated = false;
        }

        return calculated;
    }

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

            let stringValue = '';

            if (enumKey != Indicator.NameOfCompany && value != null) {
                stringValue = this.nFormatter(Number(value));
            }

            switch (enumKey) {
                case Indicator.NameOfCompany: {
                    companyData.name = value;

                    break;
                }

                case Indicator.Revenues: {
                    currentContainer.revenues = value;
                    currentContainer.sRevenues = stringValue;

                    break;
                }

                case Indicator.SellingGeneralAndAdministrative: {
                    currentContainer.sellingGeneralAndAdministrative = value;
                    currentContainer.sSellingGeneralAndAdministrative = stringValue;

                    break;
                }

                case Indicator.IncomeFromContinuingOperations: {
                    currentContainer.incomeFromContinuingOperations = value;
                    currentContainer.sIncomeFromContinuingOperations = stringValue;

                    break;
                }

                case Indicator.ReceivablesNet: {
                    currentContainer.receivablesNet = value;
                    currentContainer.sReceivablesNet = stringValue;

                    break;
                }

                case Indicator.TotalCurrentAssets: {
                    currentContainer.totalCurrentAssets = value;
                    currentContainer.sTotalCurrentAssets = stringValue;

                    break;
                }

                case Indicator.PropertyPlantAndEquipmentNet: {
                    currentContainer.propertyPlantAndEquipmentNet = value;
                    currentContainer.sPropertyPlantAndEquipmentNet = stringValue;

                    break;
                }

                case Indicator.TotalAssets: {
                    currentContainer.totalAssets = value;
                    currentContainer.sTotalAssets = stringValue;

                    break;
                }

                case Indicator.TotalCurrentLiabilities: {
                    currentContainer.totalCurrentLiabilities = value;
                    currentContainer.sTotalCurrentLiabilities = stringValue;

                    break;
                }

                case Indicator.TotalDebt: {
                    currentContainer.totalDebt = value;
                    currentContainer.sTotalDebt = stringValue;

                    break;
                }

                case Indicator.DepreciationAmortisation: {
                    currentContainer.depreciationAmortisation = value;
                    currentContainer.sDepreciationAmortisation = stringValue;

                    break;
                }

                case Indicator.OperatingCashFlow: {
                    currentContainer.operatingCashFlow = value;
                    currentContainer.sOperatingCashFlow = stringValue;

                    break;
                }

                case Indicator.GrossMargin: {
                    currentContainer.grossMargin = value;
                    currentContainer.sGrossMargin = stringValue;

                    break;
                }

                case Indicator.DebtToAssetRatio: {
                    currentContainer.debtToAssetRatio = value;
                    currentContainer.sDebtToAssetRatio = stringValue;

                    break;
                }

                case Indicator.CurrentRatio: {
                    currentContainer.currentRatio = value;
                    currentContainer.sCurrentRatio = stringValue;

                    break;
                }

                case Indicator.ReturnOnAssets: {
                    currentContainer.returnOnAssets = value;
                    currentContainer.sReturnOnAssets = stringValue;

                    break;
                }


                case Indicator.MarketCapitalization: {
                    companyData.marketCap = value;
                    companyData.sMarketCap = stringValue;
                    break;
                }
            }

            addedKeys.push(key);
        });

        companyData.currentYearData = currentYear;
        companyData.nextYearData = nextYear;

        const calculated: boolean = companyData.calculateVars();

        if (nullExists || allValuesIsEmpty || !calculated) {
            return null;
        }

        return companyData;
    }

    private static nFormatter(num: number): string {
        if (Math.abs(num) >= 1000) {
            let numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0});

            return numberFormatter.format(num / 1000000);
        }

        return num.toString();
    }
}

export class CompanyDataByYear {
    public year: number = 0;
    public revenues: number = 0;
    public sellingGeneralAndAdministrative: number = 0;
    public incomeFromContinuingOperations: number = 0;
    public receivablesNet: number = 0;
    public totalCurrentAssets: number = 0;
    public propertyPlantAndEquipmentNet: number = 0;
    public totalAssets: number = 0;
    public totalCurrentLiabilities: number = 0;
    public totalDebt: number = 0;
    public depreciationAmortisation: number = 0;
    public operatingCashFlow: number = 0;
    public grossMargin: number = 0;
    public debtToAssetRatio: number = 0;
    public currentRatio: number = 0;
    public returnOnAssets: number = 0;


    public sRevenues: string = '';
    public sSellingGeneralAndAdministrative: string = '';
    public sIncomeFromContinuingOperations: string = '';
    public sReceivablesNet: string = '';
    public sTotalCurrentAssets: string = '';
    public sPropertyPlantAndEquipmentNet: string = '';
    public sTotalAssets: string = '';
    public sTotalCurrentLiabilities: string = '';
    public sTotalDebt: string = '';
    public sDepreciationAmortisation: string = '';
    public sOperatingCashFlow: string = '';
    public sGrossMargin: string = '';
    public sDebtToAssetRatio: string = '';
    public sCurrentRatio: string = '';
    public sReturnOnAssets: string = '';

    constructor(year: number) {
        this.year = year;
    }
}

export enum Category {
    Industrials,
    Technology,
    ConsumerDefensive,
    ConsumerCyclical,
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
    [Category.Utilities]: 'Utilities',
    [Category.Healthcare]: 'Healthcare',
    [Category.Energy]: 'Energy',
    [Category.BusinessServices]: 'Business Services',
    [Category.RealEstate]: 'Real Estate',
    [Category.BasicMaterials]: 'Basic Materials',
    [Category.Other]: 'Other',
    [Category.CommunicationServices]: 'Communication Services'
};

type FooMap = { [key in Category]: number[][] }

export const SubCategories: FooMap = {
    [Category.Industrials]: [[100001, 100002], [100003, 100004], [100005, 100006], [100007, 100008], [100009, 100010], [100011, 100012], [100013]],
    [Category.Technology]: [[101001, 101002], [101003, 101004], [101005]],
    [Category.ConsumerDefensive]: [[102001, 102002], [102003, 102004], [102005, 102006]],
    [Category.ConsumerCyclical]: [[103001, 103002], [103003, 103004], [103005, 103011], [103013, 103015], [103018, 103020], [103026]],
    [Category.Utilities]: [[105001, 105002]],
    [Category.Healthcare]: [[106001, 106002], [106003, 106004], [106005, 106006], [106011, 106014]],
    [Category.Energy]: [[107001, 107002], [107003, 107004], [107005, 107006]],
    [Category.BusinessServices]: [[108001, 108002]],
    [Category.RealEstate]: [[109001, 109002]],
    [Category.BasicMaterials]: [[110001]],
    [Category.Other]: [[111001]],
    [Category.CommunicationServices]: [[112001]],
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
            'Market capitalization',
            'Current ratio', '',
            'Return on assets', '',
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
                    "",
                    currentYear, nextYear,
                    currentYear, nextYear,
                ]);

                category.companies.forEach((company: CompanyData) => {
                    const companyArray: any[] = [];

                    companyArray.push(company.name);

                    companyArray.push(company.currentYearData.sRevenues);
                    companyArray.push(company.nextYearData.sRevenues);

                    companyArray.push(company.currentYearData.sSellingGeneralAndAdministrative);
                    companyArray.push(company.nextYearData.sSellingGeneralAndAdministrative);

                    companyArray.push(company.currentYearData.sIncomeFromContinuingOperations);
                    companyArray.push(company.nextYearData.sIncomeFromContinuingOperations);


                    companyArray.push(company.currentYearData.sReceivablesNet);
                    companyArray.push(company.nextYearData.sReceivablesNet);

                    companyArray.push(company.currentYearData.sTotalCurrentAssets);
                    companyArray.push(company.nextYearData.sTotalCurrentAssets);

                    companyArray.push(company.currentYearData.sPropertyPlantAndEquipmentNet);
                    companyArray.push(company.nextYearData.sPropertyPlantAndEquipmentNet);

                    companyArray.push(company.currentYearData.sTotalAssets);
                    companyArray.push(company.nextYearData.sTotalAssets);

                    companyArray.push(company.currentYearData.sTotalCurrentLiabilities);
                    companyArray.push(company.nextYearData.sTotalCurrentLiabilities);

                    companyArray.push(company.currentYearData.sTotalDebt);
                    companyArray.push(company.nextYearData.sTotalDebt);

                    companyArray.push(company.currentYearData.sDepreciationAmortisation);
                    companyArray.push(company.nextYearData.sDepreciationAmortisation);

                    companyArray.push(company.currentYearData.sOperatingCashFlow);
                    companyArray.push(company.nextYearData.sOperatingCashFlow);

                    companyArray.push(company.currentYearData.sGrossMargin);
                    companyArray.push(company.nextYearData.sGrossMargin);

                    companyArray.push(company.currentYearData.sDebtToAssetRatio);
                    companyArray.push(company.nextYearData.sDebtToAssetRatio);

                    companyArray.push(company.sMarketCap);

                    companyArray.push(company.currentYearData.sCurrentRatio);
                    companyArray.push(company.nextYearData.sCurrentRatio);

                    companyArray.push(company.currentYearData.sReturnOnAssets);
                    companyArray.push(company.nextYearData.sReturnOnAssets);

                    catJson.push(companyArray);
                });
            }
        });

        return catJson;
    }

    public static categoriesCalculatedToJson(categories: CompanyCategory[]): any[] {

        const names: any[] = ['Company name:',];

        const DSR: any[] = ['DSR:'];
        const GMI: any[] = ['GMI:'];
        const AQI: any[] = ['AQI:'];
        const SGI: any[] = ['SGI:'];
        const DEPI: any[] = ['DEPI:'];
        const SGAI: any[] = ['SGAI:'];
        const Accruals: any[] = ['Accruals:'];
        const LEVI: any[] = ['LEVI:'];

        categories.forEach((category: CompanyCategory) => {
            if (category.companies.length > 0 && category.subCategories.length > 0 && category.subCategories[0].companies.length > 0) {
                category.companies.forEach((company: CompanyData) => {
                    names.push(company.name);

                    DSR.push(company.DSR);
                    GMI.push(company.GMI);
                    AQI.push(company.AQI);
                    SGI.push(company.SGI);
                    DEPI.push(company.DEPI);
                    SGAI.push(company.SGAI);
                    Accruals.push(company.Accruals);
                    LEVI.push(company.LEVI);
                });
            }
        });

        return [names, DSR, GMI, AQI, SGI, DEPI, SGAI, Accruals, LEVI];
    }

    public static categoriesMedianToJson(categories: CompanyCategory[]): any[] {
        let companies: CompanyData[] = [];

        categories.forEach((category: CompanyCategory) => {
            if (category.companies.length > 0 && category.subCategories.length > 0 && category.subCategories[0].companies.length > 0) {
                companies = companies.concat(category.companies);
            }
        });

        const assets: number[] = [];
        const sales: number[] = [];
        const marketCap: number[] = [];

        const wCapToTotalAssel: number[] = [];
        const currentRatio: number[] = [];
        const totalDebtToTotalAssets: number[] = [];

        const returnOnAssets: number[] = [];
        const salesGrowth: number[] = [];

        companies.forEach((companyData: CompanyData) => {
            assets.push(companyData.nextYearData.totalAssets);
            sales.push(companyData.nextYearData.revenues);
            marketCap.push(companyData.marketCap);

            wCapToTotalAssel.push((companyData.nextYearData.totalCurrentAssets - companyData.nextYearData.totalCurrentLiabilities) / companyData.nextYearData.totalAssets);
            currentRatio.push(companyData.nextYearData.currentRatio);
            totalDebtToTotalAssets.push(companyData.nextYearData.debtToAssetRatio);

            returnOnAssets.push(companyData.nextYearData.returnOnAssets);
            salesGrowth.push((companyData.nextYearData.revenues - companyData.currentYearData.revenues) / companyData.currentYearData.revenues);
        });

        console.log(marketCap);

        return [
            ['', 'Mean', 'Median'],
            ['Size', '', ''],
            ['Assets', this.nFormatter(this.average(assets)), this.nFormatter(this.median(assets))],
            ['Sales', this.nFormatter(this.average(sales)), this.nFormatter(this.median(sales))],
            ['Market Value', this.nFormatter(this.average(marketCap)), this.nFormatter(this.median(marketCap))],
            ['', '', ''],
            ['Leverage/liquidity', '', ''],
            ['Working capital to total assets', this.average(wCapToTotalAssel).toString(), this.median(wCapToTotalAssel).toString()],
            ['Current ratio', this.average(currentRatio).toString(), this.median(currentRatio).toString()],
            ['Total debt to total assets', this.average(totalDebtToTotalAssets).toString(), this.median(totalDebtToTotalAssets).toString()],
            ['', '', ''],
            ['Profitability/Growth', '', ''],
            ['Return on assets', this.average(returnOnAssets).toString(), this.median(returnOnAssets).toString()],
            ['Sales Growth', this.average(salesGrowth).toString(), this.median(salesGrowth).toString()],
        ];
    }

    private static nFormatter(num: number): string {
        if (Math.abs(num) >= 1000) {
            let numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0});

            return numberFormatter.format(num / 1000000);
        }

        return num.toString();
    }

    public static median(values: number[]) {
        values.sort(function (a, b) {
            return a - b;
        });

        if (values.length === 0) return 0;

        var half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];
        else
            return (values[half - 1] + values[half]) / 2.0;
    }

    public static average(values: number[]) {
        let sum = 0;
        let avg = 0;

        if (values.length) {
            sum = values.reduce(function (a, b) {
                return a + b;
            });
            avg = sum / values.length;
        }

        return avg;
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