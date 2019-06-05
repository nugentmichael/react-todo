import React, {Component} from 'react';
import TodoList from './TodoList.js';
import TodoItems from './TodoItems.js';
import './App.css';

export default class App extends Component {
    inputElement = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentItem: {
                text: '',
                key: ''
            }
        }
    }

    componentDidMount() {
        this.retrieveItems();
    }

    deleteItem = key => {
        const filteredItems = this
            .state
            .items
            .filter(item => {
                return item.key !== key;
            });

        this.setState({
            items: filteredItems
        }, () => {
            localStorage.setItem('allItems', JSON.stringify(this.state.items));
        });
    }

    handleInput = e => {
        const itemText = e.target.value;
        const currentItem = {
            text: itemText,
            key: Date.now()
        }
        this.setState({currentItem});
    }

    addItem = e => {
        e.preventDefault();
        const newItem = this.state.currentItem;

        if (newItem.text !== '') {
            const items = [
                ...this.state.items,
                newItem
            ];

            this.setState({
                items: items,
                currentItem: {
                    text: '',
                    key: ''
                }
            }, () => {
                localStorage.setItem('allItems', JSON.stringify(this.state.items));
            });
        }
    }

    retrieveItems = () => {
        if (localStorage.getItem('allItems') !== null) {
            const list = JSON.parse(localStorage.getItem('allItems'));
            this.setState({items: list});
        }
    }

    render() {
        return (
            <div className="App">
                <TodoList
                    addItem={this.addItem}
                    inputElement={this.inputElement}
                    handleInput={this.handleInput}
                    currentItem={this.state.currentItem}/>
                <TodoItems entries={this.state.items} deleteItem={this.deleteItem}/>
            </div>
        )
    }
}