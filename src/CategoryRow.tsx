import * as React from 'react';
import { CompanyCategory, CompanySubCategory } from "./Models";
import { SubcategoryRow } from "./SubcategoryRow";

interface CategoryRowProps {
    category: CompanyCategory;
}

export class CategoryRow extends React.Component<CategoryRowProps> {
    render() {
        const subCategoriesRows: any[] = [];
        if (this.props.category) {
            this.props.category.subCategories.forEach((subCategory: CompanySubCategory, index: number) => {
                subCategoriesRows.push(
                    <SubcategoryRow key={index} subCategory={subCategory}>

                    </SubcategoryRow>
                );
            });
        }

        return (
            <div>
                {subCategoriesRows}
            </div>
        )
    }
}