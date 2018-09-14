import * as React from 'react';
import { CompanyCategory } from "./Models";

interface TableProps {
    categories: CompanyCategory[];
}

export class Table extends React.Component<TableProps> {
    render() {
        const categoriesRows: any[] = [];
        if (this.props.categories) {
            console.log('categories = ' + this.props.categories);

            this.props.categories.forEach((category: CompanyCategory) => {
                categoriesRows.push(<div>{category.subCategories.length}</div>);
            });
        }

        return (
            <div>
                {categoriesRows}
            </div>
        )
    }
}