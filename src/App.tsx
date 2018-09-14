import * as React from 'react';
import './App.css';

import { DataManager } from "./DataManager";
import { CompanyCategory } from "./Models";
import { Table } from "./Table";
import * as XLSX from 'xlsx';

interface AppProps {
}

interface AppState {
    categories: CompanyCategory[];
    sheet: any;
    jsonData: any;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        categories: [],
        sheet: null,
        jsonData: null,
    };

    public componentDidMount() {
        var savedJson = JSON.parse(localStorage.getItem('data'));

        if (savedJson) {
            this.setJson(savedJson);
        }
    }

    public render() {

        let html: any = null;

        if (this.state.sheet) {
            const parsedHtml = XLSX.utils.sheet_to_html(this.state.sheet);

            html = parsedHtml;
        }

        return (
            <div className="App">
                <div style={{width: 'max-content'}}>
                    <Table categories={this.state.categories}/>
                </div>
                <button
                    onClick={() => {
                        DataManager.loadAllData().then((categories: CompanyCategory[]) => {
                            const catsArray: any[] = CompanyCategory.categoriesToJson(categories);

                            localStorage.setItem('data', JSON.stringify(catsArray));

                            this.setJson(catsArray);
                        });
                    }}>
                    Load data
                </button>
                <div dangerouslySetInnerHTML={{__html: html}}/>
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

    private setJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        if (!sheet['!merges']) sheet['!merges'] = [];
        sheet['!merges'].push({s: {r: 0, c: 1}, e: {r: 0, c: 2}});
        sheet['!merges'].push({s: {r: 0, c: 3}, e: {r: 0, c: 4}});
        sheet['!merges'].push({s: {r: 0, c: 5}, e: {r: 0, c: 6}});
        sheet['!merges'].push({s: {r: 0, c: 7}, e: {r: 0, c: 8}});
        sheet['!merges'].push({s: {r: 0, c: 9}, e: {r: 0, c: 10}});
        sheet['!merges'].push({s: {r: 0, c: 11}, e: {r: 0, c: 12}});
        sheet['!merges'].push({s: {r: 0, c: 13}, e: {r: 0, c: 14}});
        sheet['!merges'].push({s: {r: 0, c: 15}, e: {r: 0, c: 16}});
        sheet['!merges'].push({s: {r: 0, c: 17}, e: {r: 0, c: 18}});
        sheet['!merges'].push({s: {r: 0, c: 19}, e: {r: 0, c: 20}});
        sheet['!merges'].push({s: {r: 0, c: 21}, e: {r: 0, c: 22}});

        this.setState({
            sheet: sheet,
            jsonData: jsonData
        });
    }
}

export default App;
