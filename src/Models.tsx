import { bool, number } from "prop-types";

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

const yearsWithWeight: number[] = [
    2018,
    2017, 2017,
    2016, 2016, 2016,
    2015, 2015, 2015, 2015,
    2014, 2014, 2014, 2014, 2014,
    2013, 2013, 2013, 2013, 2013, 2013,
    2012, 2012, 2012, 2012, 2012, 2012, 2012,
    2011, 2011, 2011, 2011, 2011, 2011, 2011, 2011,
    2010, 2010, 2010, 2010, 2010, 2010, 2010, 2010, 2010,
    2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009,
    2008, 2008, 2008, 2008, 2008, 2008, 2008, 2008, 2008, 2008, 2008,
];

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
    public companyCategory: CompanyCategory = null;
    public simId: number = 0;
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

        const simId: number = data['simId'];

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
        companyData.simId = simId;

        const calculated: boolean = companyData.calculateVars();

        if (nullExists || allValuesIsEmpty || !calculated) {
            return null;
        }

        return companyData;
    }


    public static filterCompaniesByYear(companies: CompanyData[]): CompanyData[] {

        const uniqueCompanies: { [id: number]: { [id: number]: CompanyData } } = {};

        companies.forEach((company: CompanyData) => {
            const companyById: { [id: number]: CompanyData } = uniqueCompanies[company.simId];

            if (companyById != null) {
                const companyByYear: CompanyData = companyById[company.companyCategory.year];

                if (!companyByYear) {
                    companyById[company.companyCategory.year] = company;
                }
            } else {
                const companyByYear: { [id: number]: CompanyData } = {}

                companyByYear[company.companyCategory.year] = company;

                uniqueCompanies[company.simId] = companyByYear;
            }
        });

        const superUniqueCompanies: CompanyData[] = [];

        Object.keys(uniqueCompanies).forEach(function (key, index) {
            const companyByYear: { [id: number]: CompanyData } = uniqueCompanies[key];

            const companyYears: number[] = Object.keys(companyByYear).map((strKey: string) => {
                return Number(strKey);
            });

            companyYears.sort();
            companyYears.reverse();

            const weightedCompanyYears: number[] = [];

            companyYears.forEach((year: number, index: number) => {
                for (let i: number = 0; i < index + 1; i++) {
                    weightedCompanyYears.push(year);
                }
            });

            let year: number = weightedCompanyYears[Math.floor(Math.random() * weightedCompanyYears.length)];

            const data: { [id: number]: CompanyData } = {};

            const companyData: CompanyData = uniqueCompanies[key][year];

            data[companyData.companyCategory.year] = companyData;

            superUniqueCompanies.push(companyData);
        });


        return superUniqueCompanies;
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

type FooMap = { [key in Category]: number[] }
type BarMap = { [key in Category]: number }

export const SubCategories: FooMap = {
    [Category.Industrials]: [100001, 100002, 100003, 100004, 100005, 100006, 100007, 100008, 100009, 100010, 100011, 100012, 100013],
    [Category.Technology]: [101001, 101002, 101003, 101004, 101005],
    [Category.ConsumerDefensive]: [102001, 102002, 102003, 102004, 102005, 102006],
    [Category.ConsumerCyclical]: [103001, 103002, 103003, 103004, 103005, 103011, 103013, 103015, 103018, 103020, 103026],
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
    public year: number = 0;
    public maxCompanies: number = 0;
    public category: Category = 0;
    public categoryName: string = '';
    public subCategories: CompanySubCategory[] = [];
    public companies: CompanyData[] = [];
    public filteredCompanies: CompanyData[] = [];

    constructor(category: Category, subCategories: CompanySubCategory[], companies: CompanyData[]) {
        this.category = category;
        this.categoryName = CategoryNames[category];
        this.subCategories = subCategories;
        this.companies = companies;
    }

    public static filterCategories(categories: CompanyCategory[]): CompanyCategory[] {
        let companies: CompanyData[] = [];

        const categoriesById: { [id: number]: CompanyCategory } = {};

        const filterRules: {} = {
            [Category.BasicMaterials]: 20,
            [Category.ConsumerCyclical]: 10,
            [Category.ConsumerDefensive]: 20,
            [Category.Energy]: 20,
            [Category.Healthcare]: 28,
            [Category.Industrials]: 30,
            [Category.Technology]: 43,
        };

        categories.forEach((category: CompanyCategory) => {
            const numberOfCompanies = filterRules[category.category];

            if (numberOfCompanies > 0) {
                category.maxCompanies = numberOfCompanies;
                category.companies.forEach((company: CompanyData) => {
                    company.companyCategory = category;
                });
                category.filteredCompanies = [];

                companies = companies.concat(category.companies);

                categoriesById[category.category] = category;
            }
        });

        const uniqueCompanies: CompanyData[] = CompanyData.filterCompaniesByYear(companies);

        uniqueCompanies.forEach((companyData: CompanyData) => {
            const category: CompanyCategory = categoriesById[companyData.companyCategory.category];
            if (category && category.filteredCompanies.length <= category.maxCompanies) {
                category.filteredCompanies.push(companyData);
            }
        });

        let filteredCategories: CompanyCategory[] = [];

        Object.keys(categoriesById).forEach((key: any) => {
            const category: CompanyCategory = categoriesById[key];

            category.filteredCompanies = category.filteredCompanies.sort((a: CompanyData, b: CompanyData) => {
                if (a.marketCap > b.marketCap) {
                    return -1;
                } else if (a.marketCap < b.marketCap) {
                    return 1;
                }

                return 0;
            });

            filteredCategories.push(category);
        });

        filteredCategories.sort((a: CompanyCategory, b: CompanyCategory) => {
            if (a.filteredCompanies.length < b.filteredCompanies.length) {
                return 1;
            }

            return 0;
        });

        console.log(filteredCategories);

        return filteredCategories;
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

            catJson.push(['']);

            catJson.push([`${category.categoryName}`,
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                "",
                'first year', 'last year',
                'first year', 'last year',
            ]);

            category.filteredCompanies.forEach((company: CompanyData) => {
                const companyArray: any[] = [];

                companyArray.push(`${company.name} (${company.currentYearData.year} - ${company.nextYearData.year})`);

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
            if (category.filteredCompanies.length > 0) {
                category.filteredCompanies.forEach((company: CompanyData) => {
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
            if (category.filteredCompanies.length > 0) {
                companies = companies.concat(category.filteredCompanies);
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
            assets.push(companyData.currentYearData.totalAssets);
            assets.push(companyData.nextYearData.totalAssets);

            sales.push(companyData.currentYearData.revenues);
            sales.push(companyData.nextYearData.revenues);

            marketCap.push(companyData.marketCap);

            wCapToTotalAssel.push((companyData.currentYearData.totalCurrentAssets - companyData.currentYearData.totalCurrentLiabilities) / companyData.currentYearData.totalAssets);
            wCapToTotalAssel.push((companyData.nextYearData.totalCurrentAssets - companyData.nextYearData.totalCurrentLiabilities) / companyData.nextYearData.totalAssets);

            currentRatio.push(companyData.currentYearData.currentRatio);
            currentRatio.push(companyData.nextYearData.currentRatio);

            totalDebtToTotalAssets.push(companyData.currentYearData.debtToAssetRatio);
            totalDebtToTotalAssets.push(companyData.nextYearData.debtToAssetRatio);

            returnOnAssets.push(companyData.currentYearData.returnOnAssets);
            returnOnAssets.push(companyData.nextYearData.returnOnAssets);

            salesGrowth.push((companyData.nextYearData.revenues - companyData.currentYearData.revenues) / companyData.currentYearData.revenues);
        });

        console.log('sales:', JSON.stringify(sales));

        console.log('Average sales = ', this.average(sales));

        return [
            ['', 'Mean', 'Median'],
            ['Size', '', ''],
            ['Assets', this.nFormatter(this.average(assets)), this.nFormatter(this.median(assets))],
            ['Sales', this.nFormatter(this.average(sales)), this.nFormatter(this.median(sales))],
            ['Market Value', this.nFormatter(this.average(marketCap)), this.nFormatter(this.median(marketCap))],
            ['', '', ''],
            ['Leverage/liquidity', '', ''],
            ['Working capital to total assets', (this.average(wCapToTotalAssel)).toString(), (this.median(wCapToTotalAssel)).toString()],
            ['Current ratio', (this.average(currentRatio)).toString(), (this.median(currentRatio)).toString()],
            ['Total debt to total assets', (this.average(totalDebtToTotalAssets)).toString(), (this.median(totalDebtToTotalAssets)).toString()],
            ['', '', ''],
            ['Profitability/Growth', '', ''],
            ['Return on assets', (this.average(returnOnAssets)).toString(), (this.median(returnOnAssets)).toString()],
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

        let half = Math.floor(values.length / 2);

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

            console.log('sum = ', sum, "number of companies = ", values.length);

            avg = sum / values.length;
        }

        return avg;
    }
}

export class CompanySubCategory {
    public year: number = 0;
    public subCategoryId: number = 0;
    public companies: CompanyData[];

    constructor(subCategoryId: number, companies: CompanyData[]) {
        this.subCategoryId = subCategoryId;
        this.companies = companies;
    }
}