export enum Indicator {
    IndicatorRevenues,
    IndicatorCostOfGoodsSold,
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
}

export const IndicatorCode: {} = {
    IndicatorRevenues: '1-1',
    IndicatorCostOfGoodsSold: '1-2',
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
};


export class CompanyData {
    private revenues: Number = 0;
    private costOfGoodsSold: Number = 0;
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

    public static createWithJson(data: any): CompanyData {
        const companyData: CompanyData = new CompanyData();

        const valuesRaw: [] = data['values'];

        valuesRaw.forEach((data) => {
            const key: string = data['indicatorId'];
            const value: any = data['value'];

            const enumKey: Indicator = Indicator[getKeyByValue(IndicatorCode, key)] as any;

            switch (enumKey) {
                case Indicator.IndicatorRevenues: {
                    companyData.revenues = value;
                    break;
                }

                case Indicator.IndicatorCostOfGoodsSold: {
                    companyData.costOfGoodsSold = value;
                    break;
                }

                case Indicator.IndicatorSellingGeneralAndAdministrative: {
                    companyData.sellingGeneralAndAdministrative = value;
                    break;
                }

                case Indicator.IndicatorIncomeFromContinuingOperations: {
                    companyData.incomeFromContinuingOperations = value;
                    break;
                }

                case Indicator.IndicatorReceivablesNet: {
                    companyData.receivablesNet = value;
                    break;
                }

                case Indicator.IndicatorTotalCurrentAssets: {
                    companyData.totalCurrentAssets = value;
                    break;
                }

                case Indicator.IndicatorPropertyPlantAndEquipmentNet: {
                    companyData.propertyPlantAndEquipmentNet = value;
                    break;
                }

                case Indicator.IndicatorTotalAssets: {
                    companyData.totalAssets = value;
                    break;
                }

                case Indicator.IndicatorTotalCurrentLiabilities: {
                    companyData.totalCurrentLiabilities = value;
                    break;
                }

                case Indicator.IndicatorTotalDebt: {
                    companyData.totalDebt = value;
                    break;
                }

                case Indicator.IndicatorDepreciationAmortisation: {
                    companyData.depreciationAmortisation = value;
                    break;
                }

                case Indicator.IndicatorOperatingCashFlow: {
                    companyData.operatingCashFlow = value;
                    break;
                }
            }
        });

        return companyData;
    }
}

function getKeyByValue(object: any, value: any): any {
    return Object.keys(object).find(key => object[key] === value);
}