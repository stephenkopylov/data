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
    DebtToAssetRation,
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
    '4-5': Indicator.DebtToAssetRation
};

export class CompanyData {
    private name: string = '';
    private currentYearData: CompanyDataByYear;
    private nextYearData: CompanyDataByYear;

    public static createWithJson(data: any, year: number): CompanyData {
        const companyData: CompanyData = new CompanyData();

        const currentYear: CompanyDataByYear = new CompanyDataByYear(year);
        const nextYear: CompanyDataByYear = new CompanyDataByYear(year + 1);

        const valuesRaw: [] = data['values'];

        const addedKeys: string[] = [];

        valuesRaw.forEach((data) => {
            const key: string = data['indicatorId'];
            const value: any = data['value'];

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

                case Indicator.DebtToAssetRation: {
                    currentContainer.debtToAssetRation = value;

                    break;
                }
            }

            addedKeys.push(key);
        });

        companyData.currentYearData = currentYear;
        companyData.nextYearData = nextYear;

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
    public debtToAssetRation: Number = 0;

    constructor(year: number) {
        this.year = year;
    }
}


function getKeyByValue(object: any, value: any): any {
    return Object.keys(object).find(key => object[key] === value);
}