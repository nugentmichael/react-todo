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
		console.log('Hello input');
	}

	addItem = () => {
		console.log('Hello add item');
	}

	render() {
		return (
			<div className="App">
		    	<TodoList addItem={this.addItem} />
			</div>
		)
	}
}

export default App;
