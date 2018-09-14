import * as React from 'react';
import { CompanyCategory, CompanySubCategory } from "./Models";

interface TableProps {
    category: CompanyCategory;
}

export class CategoryRow extends React.Component<TableProps> {
    render() {
        const subCategoriesRows: any[] = [];
        if (this.props.category) {
            console.log("category = ", this.props.category);

            this.props.category.subCategories.forEach((subCategory: CompanySubCategory, index: number) => {
                console.log("subcategory id = ", subCategory.subCategoryId);

                subCategoriesRows.push(<div key={index}>{subCategory.subCategoryId}</div>);
            });
        }

        return (
            <div>
                {subCategoriesRows}
            </div>
        )
    }
}