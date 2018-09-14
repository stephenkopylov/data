import * as React from 'react';
import { CompanyCategory } from "./Models";
import { CategoryRow } from "./CategoryRow";

interface TableProps {
    categories: CompanyCategory[];
}

export class Table extends React.Component<TableProps> {
    render() {
        const categoriesRows: any[] = [];
        if (this.props.categories) {
            this.props.categories.forEach((category: CompanyCategory, index: number) => {
                categoriesRows.push(
                    <CategoryRow key={index} category={category}>
                        {category.subCategories.length}
                    </CategoryRow>
                );
            });
        }

        return (
            <div>
                {categoriesRows}
            </div>
        )
    }
}