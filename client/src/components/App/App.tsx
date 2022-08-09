import React from 'react';
import './App.scss';
import {createApiClient} from './AppApi';

export type AppState = {
	search: string;
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: ''
	}

	searchDebounce: any = null;

	async componentDidMount() {
	}

	onSearch = async (val: string, newPage?: number) => {
		
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
			});
		}, 300);
	}

	render() {	
		return (<main>
			<h1>Game Of Life</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
			</header>
		</main>)
	}
}

export default App;