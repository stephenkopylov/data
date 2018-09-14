import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { FetchManager } from "./FetchManager";
import { DataManager } from "./DataManager";
import { CompanyCategory } from "./Models";

class App extends React.Component {
    public componentDidMount() {
        // DataManager.loadAllData();
        // FetchManager.testFetch();
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <button
                    onClick={() => {
                        DataManager.loadAllData().then((categories: CompanyCategory[]) => {
                            console.log('cats loaded = ', categories);
                        });
                    }}>
                    Load data
                </button>
            </div>
        );
    }
}

export default App;
