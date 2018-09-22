import * as React from 'react';
import './App.css';

import { DataManager } from "./DataManager";
import { CompanyCategory } from "./Models";
import { Table } from "./Table";
import * as XLSX from 'xlsx';

var FileSaver = require('file-saver');

var resultsData = require('src/results.json');

interface AppProps {
}

interface AppState {
    categories: CompanyCategory[];
    sheetRaw: any;
    sheetCalculated: any;
    sheetMedian: any;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        categories: [],
        sheetRaw: null,
        sheetCalculated: null,
        sheetMedian: null
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

        var savedMedianJson = JSON.parse(localStorage.getItem('medianData'));
        if (savedMedianJson) {
            this.setMedianJson(savedMedianJson);
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

        let htmlMedial: any = null;
        if (this.state.sheetMedian) {
            htmlMedial = XLSX.utils.sheet_to_html(this.state.sheetMedian);
        }


        return (
            <div className="App">
                <div style={{width: 'max-content'}}>
                    <Table categories={this.state.categories}/>
                </div>
                <button
                    onClick={() => {
                        DataManager.loadAllData().then((categories: CompanyCategory[]) => {
                            const categoriesContainer: CategoriesContainer = new CategoriesContainer();
                            categoriesContainer.categories = categories;

                            const resultString: string = JSON.stringify(categoriesContainer);

                            var blob = new Blob([resultString], {type: "text/plain;charset=utf-8"});
                            FileSaver.saveAs(blob, "results.txt");
                        });
                    }}>
                    Load data
                </button>

                <button
                    onClick={() => {
                        let categoriesContainer: CategoriesContainer = resultsData as CategoriesContainer;

                        if (categoriesContainer) {
                            const filteredCategories: CompanyCategory[] = CompanyCategory.filterCategories(categoriesContainer.categories);

                            const catsArray: any[] = CompanyCategory.categoriesToJson(filteredCategories);
                            localStorage.setItem('rawData', JSON.stringify(catsArray));

                            const catsArrayCalculated: any[] = CompanyCategory.categoriesCalculatedToJson(filteredCategories);
                            localStorage.setItem('calculatedData', JSON.stringify(catsArrayCalculated));

                            const catsArrayMedian: any[] = CompanyCategory.categoriesMedianToJson(filteredCategories);
                            localStorage.setItem('medianData', JSON.stringify(catsArrayMedian));

                            this.setRawJson(catsArray);
                            this.setCalculatedJson(catsArrayCalculated);
                            this.setMedianJson(catsArrayMedian);
                        }
                    }}>
                    Generate tables
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
                    <button
                        onClick={() => {
                            if (this.state.sheetMedian) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetMedian, "median");

                                XLSX.writeFile(wb, 'median.xlsb');
                            }
                        }}>
                        Download median table
                    </button>
                </div>
                <div dangerouslySetInnerHTML={{__html: htmlRaw}}/>
                <div dangerouslySetInnerHTML={{__html: htmlCalculated}}/>
                <div dangerouslySetInnerHTML={{__html: htmlMedial}}/>
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
        sheet['!merges'].push({s: {r: 0, c: 23}, e: {r: 0, c: 24}});
        sheet['!merges'].push({s: {r: 0, c: 25}, e: {r: 0, c: 26}});
        sheet['!merges'].push({s: {r: 0, c: 28}, e: {r: 0, c: 29}});
        sheet['!merges'].push({s: {r: 0, c: 30}, e: {r: 0, c: 31}});

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

    private setMedianJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        this.setState({
            sheetMedian: sheet,
        });
    }
}

export class CategoriesContainer {
    public categories: CompanyCategory[] = [];
};

export default App;
