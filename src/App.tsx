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
    sheetRaw: any;
    sheetCalculated: any;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        categories: [],
        sheetRaw: null,
        sheetCalculated: null,
    };

    public componentDidMount() {
        var savedRawJson = JSON.parse(localStorage.getItem('rawData'));
        if (savedRawJson) {
            this.setRawJson(savedRawJson);
        }

        var savedCalculatedJson = JSON.parse(localStorage.getItem('calculatedData'));
        if (savedCalculatedJson) {
            this.setCalculatedJson(savedCalculatedJson);
        }
    }

    public render() {
        let htmlRaw: any = null;
        if (this.state.sheetRaw) {
            htmlRaw = XLSX.utils.sheet_to_html(this.state.sheetRaw);
        }

        let htmlCalculated: any = null;
        if (this.state.sheetCalculated) {
            htmlCalculated = XLSX.utils.sheet_to_html(this.state.sheetCalculated);
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
                            localStorage.setItem('rawData', JSON.stringify(catsArray));

                            const catsArrayCalculated: any[] = CompanyCategory.categoriesCalculatedToJson(categories);
                            localStorage.setItem('calculatedData', JSON.stringify(catsArrayCalculated));

                            this.setRawJson(catsArray);
                            this.setCalculatedJson(catsArrayCalculated);
                        });
                    }}>
                    Load data
                </button>
                <div>
                    <button
                        onClick={() => {
                            if (this.state.sheetRaw) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetRaw, "raw");

                                XLSX.writeFile(wb, 'raw.xlsb');
                            }
                        }}>
                        Download raw table
                    </button>
                    <button
                        onClick={() => {
                            if (this.state.sheetCalculated) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetCalculated, "calculated");

                                XLSX.writeFile(wb, 'calculated.xlsb');
                            }
                        }}>
                        Download calculated table
                    </button>
                </div>
                <div dangerouslySetInnerHTML={{__html: htmlRaw}}/>
                <div dangerouslySetInnerHTML={{__html: htmlCalculated}}/>
            </div>
        );
    }

    private setRawJson(jsonData: any) {
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
            sheetRaw: sheet,
        });
    }

    private setCalculatedJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        this.setState({
            sheetCalculated: sheet,
        });
    }
}

export default App;
