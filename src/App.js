import React, { Component } from 'react';
import TodoList from './TodoList.js'
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			items: [],
			currentItem: { text: '', key: '' },
		}
	}

	handleInput = e => {
		const itemText = e.target.value;
		const currentItem = { text: itemText, key: Date.now() }
		this.setState({
			currentItem,
		});
	}

	addItem = e => {
		e.preventDefault()
		console.log('Hello add item');
	}

	render() {
		return (
			<div className="App">
				<TodoList
					addItem={this.addItem}
					inputElement={this.inputElement}
					handleInput={this.handleInput}
					currentItem={this.state.currentItem}
				/>
			</div>
		)
	}
}

export default App;
