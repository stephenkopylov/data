import * as React from 'react';
import { CompanyCategory, CompanyData, CompanySubCategory } from "./Models";
import { CompanyRow } from "./CompanyRow";

interface SubcategoryProps {
    subCategory: CompanySubCategory;
}

export class SubcategoryRow extends React.Component<SubcategoryProps> {
    render() {
        const companyRows: any[] = [];
        if (this.props.subCategory) {
            this.props.subCategory.companies.forEach((companyData: CompanyData, index: number) => {
                companyRows.push(<CompanyRow key={index} company={companyData}/>);
            });
        }

        return (
            <div>
                {companyRows}
            </div>
        )
    }
}