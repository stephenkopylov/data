import * as React from 'react';
import './App.css';

import { DataManager } from "./DataManager";
import { CompanyCategory } from "./Models";
import { Table } from "./Table";
import * as XLSX from 'xlsx';

const data1 = {
    cols: [{name: "A", key: 0}, {name: "B", key: 1}, {name: "C", key: 2}],
    data: [
        ["id", "name", "value"],
        [1, "sheetjs", 7262],
        [2, "js-xlsx", 6969]
    ]
}

interface AppProps {
}

interface AppState {
    categories: CompanyCategory[];
    htmlData: any;
    sheet: any;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        categories: [],
        htmlData: null,
        sheet: null
    };

    public componentDidMount() {
    }

    public render() {
        return (
            <div className="App">
                <div style={{width: 'max-content'}}>
                    <Table categories={this.state.categories}/>
                </div>
                <button
                    onClick={() => {
                        DataManager.loadAllData().then((categories: CompanyCategory[]) => {
                            console.log('loaded categories = ', categories);

                            const catsArray: any[] = CompanyCategory.categoriesToJson(categories);

                            const sheet = XLSX.utils.json_to_sheet(
                                catsArray,
                                {skipHeader: true}
                            );

                            const html = XLSX.utils.sheet_to_html(sheet);

                            this.setState({htmlData: html, sheet: sheet});

                            // this.setState({categories: categories});
                        });
                    }}>
                    Load data
                </button>
                <div dangerouslySetInnerHTML={{__html: this.state.htmlData}}/>
                <button
                    onClick={() => {
                        if (this.state.sheet) {
                            const wb = XLSX.utils.book_new();

                            XLSX.utils.book_append_sheet(wb, this.state.sheet, "test");

                            XLSX.writeFile(wb, 'out.xlsb');
                        }
                    }}>
                    Download table
                </button>
            </div>
        );
    }
}

export default App;
