import './App.css';
import SearchForm from './components/SearchPage';
import React, {useContext} from 'react';
import ResultsPage from './components/ResultsPage';
import Grid from '@material-ui/core/Grid';
import DetailPage from './components/DetailPage';
import { StoreContext } from './store';
import { Navbar } from './components/navbar';

function App() {
    let page;
    const {state} = useContext(StoreContext);
    if (state.page === 'SEARCH') {
        page = <SearchForm/>
    } else if (state.page === 'RESULTS') {
        page = <ResultsPage/>
    } else if (state.page === 'DETAIL') {
        page = <DetailPage/>
    }

    return (
        <div className={"App"}>
            <Navbar/>
            <Grid className={"main-container"} container justify={"center"} alignItems={"center"}>
                {page}
            </Grid>
        </div>
    );
}

export default App;
