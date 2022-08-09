import { IGame} from 'app-shared-types';
import React from 'react';
import './App.scss';
import {createApiClient} from './AppApi';

export type AppState = {
	search: string;
	game: IGame,
	numberOfsteps: number,
	stopEnabled: boolean
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
			amountOfLife: 0,
			board: []
		},
		numberOfsteps : 0,
		stopEnabled : false
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
			{
				board[row][col] = state.populated;
				game.amountOfLife++;
			}

			else
			{
				board[row][col] = state.unpopulated;
				game.amountOfLife--;
			}
			return {game};
		});

		console.log(row, col);
	}

	 onclickNext = async () => {
		const game = await api.getNextStep(this.state.game);
		
		this.setState({game, numberOfsteps : this.state.numberOfsteps + 1});
	}

	onclickReset = () => {
		
	}

	onclickStart = async () => {
		while(this.state.game.amountOfLife !== 0 && !this.state.stopEnabled)
		{
			await this.onclickNext();
			await this.timeoutWithPromise(1000);
		}
	}

	timeoutWithPromise = async (time: number) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		})
	}

	onclickStop = () => {
		this.setState({stopEnabled : true})
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
				<h3>number of lifes : {this.state.game.amountOfLife}</h3>
				<h3>number of steps : {this.state.numberOfsteps}</h3>
			</div>
			<div>
				<button className='board-func next' onClick={this.onclickNext}>Next</button>
				<button className='board-func reset' disabled={!this.state.stopEnabled} onClick={this.onclickReset}>Reset</button>
				<button className='board-func start' onClick={this.onclickStart}>Start</button>
				<button className='board-func stop' onClick={this.onclickStop}>Stop</button>
			</div>
			{game ? this.renderGame(game) : <h2>Loading..</h2>}
		</main>)
	}
}

export default App;