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

        return companyData;
    }
}