export enum Indicator {
    IndicatorNameOfCompany,
    IndicatorRevenues,
    IndicatorSellingGeneralAndAdministrative,
    IndicatorIncomeFromContinuingOperations,
    IndicatorReceivablesNet,
    IndicatorTotalCurrentAssets,
    IndicatorPropertyPlantAndEquipmentNet,
    IndicatorTotalAssets,
    IndicatorTotalCurrentLiabilities,
    IndicatorTotalDebt,
    IndicatorDepreciationAmortisation,
    IndicatorOperatingCashFlow,
    IndicatorGrossMargin,
    IndicatorDebtToAssetRation,
}

export const IndicatorCode: {} = {
    IndicatorNameOfCompany: '0-1',
    IndicatorRevenues: '1-1',
    IndicatorSellingGeneralAndAdministrative: '1-12',
    IndicatorIncomeFromContinuingOperations: '1-49',
    IndicatorReceivablesNet: '2-5',
    IndicatorTotalCurrentAssets: '2-21',
    IndicatorPropertyPlantAndEquipmentNet: '2-22',
    IndicatorTotalAssets: '2-41',
    IndicatorTotalCurrentLiabilities: '2-57',
    IndicatorTotalDebt: '4-6',
    IndicatorDepreciationAmortisation: '3-2',
    IndicatorOperatingCashFlow: '3-13',
    IndicatorGrossMargin: '4-0',
    IndicatorDebtToAssetRation: '4-5',
};


export class CompanyData {
    private name: string = '';
    private currentYearData: CompanyDataByYear = null;
    private nextYearData: CompanyDataByYear = null;

    public static createWithJson(data: any): CompanyData {
        const companyData: CompanyData = new CompanyData();

        const currentYear: CompanyDataByYear = new CompanyDataByYear();
        const nextYear: CompanyDataByYear = new CompanyDataByYear();

        const valuesRaw: [] = data['values'];

        const addedKeys: string[] = [];

        valuesRaw.forEach((data) => {
            const key: string = data['indicatorId'];
            const value: any = data['value'];

            let currentContainer: CompanyDataByYear = currentYear;

            if (addedKeys.indexOf(key) != -1) {
                currentContainer = nextYear;
            }

            const enumKey: Indicator = Indicator[getKeyByValue(IndicatorCode, key)] as any;

            switch (enumKey) {
                case Indicator.IndicatorNameOfCompany: {
                    companyData.name = value;

                    break;
                }

                case Indicator.IndicatorRevenues: {
                    currentContainer.revenues = value;

                    break;
                }

                case Indicator.IndicatorSellingGeneralAndAdministrative: {
                    currentContainer.sellingGeneralAndAdministrative = value;

                    break;
                }

                case Indicator.IndicatorIncomeFromContinuingOperations: {
                    currentContainer.incomeFromContinuingOperations = value;

                    break;
                }

                case Indicator.IndicatorReceivablesNet: {
                    currentContainer.receivablesNet = value;

                    break;
                }

                case Indicator.IndicatorTotalCurrentAssets: {
                    currentContainer.totalCurrentAssets = value;

                    break;
                }

                case Indicator.IndicatorPropertyPlantAndEquipmentNet: {
                    currentContainer.propertyPlantAndEquipmentNet = value;

                    break;
                }

                case Indicator.IndicatorTotalAssets: {
                    currentContainer.totalAssets = value;

                    break;
                }

                case Indicator.IndicatorTotalCurrentLiabilities: {
                    currentContainer.totalCurrentLiabilities = value;

                    break;
                }

                case Indicator.IndicatorTotalDebt: {
                    currentContainer.totalDebt = value;

                    break;
                }

                case Indicator.IndicatorDepreciationAmortisation: {
                    currentContainer.depreciationAmortisation = value;

                    break;
                }

                case Indicator.IndicatorOperatingCashFlow: {
                    currentContainer.operatingCashFlow = value;

                    break;
                }

                case Indicator.IndicatorGrossMargin: {
                    currentContainer.grossMargin = value;

                    break;
                }

                case Indicator.IndicatorDebtToAssetRation: {
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
}


function getKeyByValue(object: any, value: any): any {
    return Object.keys(object).find(key => object[key] === value);
}