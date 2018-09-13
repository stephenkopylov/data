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

            const enumKey: Indicator = Indicator[getKeyByValue(IndicatorCode, key)] as any;

            switch (enumKey) {
                case Indicator.IndicatorNameOfCompany: {
                    companyData.name = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorRevenues: {
                    companyData.revenues = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorSellingGeneralAndAdministrative: {
                    companyData.sellingGeneralAndAdministrative = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorIncomeFromContinuingOperations: {
                    companyData.incomeFromContinuingOperations = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorReceivablesNet: {
                    companyData.receivablesNet = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorTotalCurrentAssets: {
                    companyData.totalCurrentAssets = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorPropertyPlantAndEquipmentNet: {
                    companyData.propertyPlantAndEquipmentNet = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorTotalAssets: {
                    companyData.totalAssets = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorTotalCurrentLiabilities: {
                    companyData.totalCurrentLiabilities = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorTotalDebt: {
                    companyData.totalDebt = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorDepreciationAmortisation: {
                    companyData.depreciationAmortisation = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorOperatingCashFlow: {
                    companyData.operatingCashFlow = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorGrossMargin: {
                    companyData.grossMargin = value;

                    addedKeys.push(key);

                    break;
                }

                case Indicator.IndicatorDebtToAssetRation: {
                    companyData.debtToAssetRation = value;

                    addedKeys.push(key);

                    break;
                }
            }
        });

        return companyData;
    }
}


export class CompanyDataByYear {
    private revenues: Number = 0;
    private sellingGeneralAndAdministrative: Number = 0;
    private incomeFromContinuingOperations: Number = 0;
    private receivablesNet: Number = 0;
    private totalCurrentAssets: Number = 0;
    private propertyPlantAndEquipmentNet: Number = 0;
    private totalAssets: Number = 0;
    private totalCurrentLiabilities: Number = 0;
    private totalDebt: Number = 0;
    private depreciationAmortisation: Number = 0;
    private operatingCashFlow: Number = 0;
    private grossMargin: Number = 0;
    private debtToAssetRation: Number = 0;
}


function getKeyByValue(object: any, value: any): any {
    return Object.keys(object).find(key => object[key] === value);
}