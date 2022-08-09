import { IGame} from 'app-shared-types';
import React from 'react';
import './App.scss';
import {createApiClient} from './AppApi';

export type AppState = {
	game?: IGame,
	numberOfsteps: number,
	stopEnabled: boolean
}

// todo: remove it and use the enum from the shared 
export enum state
{
    unpopulated = 0,
    populated = 1
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		numberOfsteps : 0,
		stopEnabled : false
	}

	isFirstCall: boolean = true; 
	initialGameState?: IGame = undefined;

	async componentDidMount() {
		this.setState({
			game: await api.getGame()
		});
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
		if(this.isFirstCall){
			this.isFirstCall = false;
			this.initialGameState = Object.assign({}, this.state.game);
		}

		const game = await api.getNextStep(this.state.game!);
		
		this.setState({game, numberOfsteps : this.state.numberOfsteps + 1}, () => {
			if(this.state.game?.amountOfLife === 0)
			{
				this.gameOver();
			}
		});
	}

	gameOver = () => {
		alert("Game Over ------> The amount of life is ZERO");
	}

	onclickReset = () => {
		const resetGame = Object.assign({}, this.initialGameState);
		this.setState({
			game: resetGame, 
			numberOfsteps: 0
		});
	}

	onclickStart = async () => {
		this.setState({stopEnabled : false}, async () => {
			while(this.state.game?.amountOfLife !== 0 && !this.state.stopEnabled)
			{
				await this.onclickNext();
				await this.timeoutWithPromise(1000);
			}
		});
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
		const {game, numberOfsteps, stopEnabled} = this.state;
		return (<main>
			<h1>Game Of Life</h1>
			<div>
				<h3>number of lifes : {game?.amountOfLife}</h3>
				<h3>number of steps : {numberOfsteps}</h3>
			</div>
			<div>
				<button className='board-func next' disabled={game?.amountOfLife === 0} onClick={this.onclickNext}>Next</button>
				<button className='board-func reset' disabled={!stopEnabled} onClick={this.onclickReset}>Reset</button>
				<button className='board-func start' disabled={game?.amountOfLife === 0} onClick={this.onclickStart}>Start</button>
				<button className='board-func stop' disabled={game?.amountOfLife === 0} onClick={this.onclickStop}>Stop</button>
			</div>
			{game ? this.renderGame(game) : <h2>Loading..</h2>}
		</main>)
	}

	private timeoutWithPromise = async (time: number) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		})
	}
}

export default App;