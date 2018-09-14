import * as React from 'react';
import { CompanyCategory, CompanyData, CompanySubCategory } from "./Models";

interface CompanyRowProps {
    company: CompanyData;
}

export class CompanyRow extends React.Component<CompanyRowProps> {
    render() {
        return (
            <div>
                {this.props.company.name}
            </div>
        )
    }
}