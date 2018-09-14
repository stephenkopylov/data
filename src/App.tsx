import * as React from 'react';
import './App.css';

import { DataManager } from "./DataManager";
import { CompanyCategory } from "./Models";
import { Table } from "./Table";

interface AppProps {
}

interface AppState {
    categories: CompanyCategory[];
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        categories: []
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
                            this.setState({categories: categories});
                        });
                    }}>
                    Load data
                </button>
            </div>
        );
    }
}

export default App;
