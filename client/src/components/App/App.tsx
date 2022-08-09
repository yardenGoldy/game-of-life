import { IGame} from 'app-shared-types';
import React from 'react';
import './App.scss';
import {createApiClient} from './AppApi';

export type AppState = {
	search: string;
	game: IGame
}

export enum state
{
    unpopulated = 0,
    populated = 1
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		game: {
			board: []
		}
	}

	searchDebounce: any = null;

	async componentDidMount() {
		this.setState({
			game: await api.getGame()
		});
	}

	onSearch = async (val: string, newPage?: number) => {
		
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
			});
		}, 300);
	}
	onClickCell = (row:number, col:number) =>{
		this.setState(prevState => {
			let game = Object.assign({}, prevState.game);
			const board = game.board;
			if(board[row][col] === state.unpopulated)
				board[row][col] = state.populated;
			else
			{
				board[row][col] = state.unpopulated;
			}
			return {game};
		});

		console.log(row, col);
	}

	 onclickNext = async () => {
		const game = await api.getNextStep(this.state.game);
		this.setState({game});
	}

	onclickReset = () => {

	}

	onclickStart = () => {

	}

	onclickStop = () => {

	}

	renderGame = (game: IGame) => {
		const board = game.board;
		let count = 0;
		return (<div className='board'>
			{
				board.map((rowValue, rowIndex) => (
					<div key={rowIndex} className='rows'>
						{rowValue.map((colValue, colIndex) => (
							<button className={'cell-button ' + (colValue === state.unpopulated ? "unpopulated" : "populated")} key={count++} onClick={this.onClickCell.bind(this, rowIndex, colIndex)}></button>
						))}
					</div>
				))
			}
		</div>);
	}

	render() {	
		const {game} = this.state;
		return (<main>
			<h1>Game Of Life</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
			</header>
			<div>
				<button className='next' onClick={this.onclickNext}>Next</button>
				<button className='reset' onClick={this.onclickReset}>Reset</button>
				<button className='start' onClick={this.onclickStart}>Start</button>
				<button className='stop' onClick={this.onclickStop}>Stop</button>
			</div>
			{game ? this.renderGame(game) : <h2>Loading..</h2>}
		</main>)
	}
}

export default App;