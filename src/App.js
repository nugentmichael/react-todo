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
			this.setState({
				items: list
			}, () => {
					let dragElement = null;
					
					function dragStart(e) {
						this.style.opacity = '0.4';
						dragElement = this;

						e.dataTransfer.effectAllowed = 'move';
						e.dataTransfer.setData('text/html', this.innerHTML);
					}
					
					function dragOver(e) {
						if (e.preventDefault) {
							e.preventDefault();
						}

						e.dataTransfer.dropEffect = 'move';

						return false;
					}

					function dragEnter(e) {
						this.classList.add('over');
					}

					function dragLeave(e) {
						this.classList.remove('over');
					}

					function handleDrop(e) {
						if (e.stopPropagation) {
							e.stopPropagation();
						}

						if (dragElement !== this) {
							dragElement.innerHTML = this.innerHTML;
							this.innerHTML = e.dataTransfer.getData('text/html');
						}

						return false;
					}

					function dragEnd(e) {
						[].forEach.call(listItems, function(listItem) {
							listItem.classList.remove('over');
						});

						this.style.opacity = '1';
					}
				
					const listItems = document.querySelectorAll('.theList li');
					
					[].forEach.call(listItems, function(listItem) {
						listItem.addEventListener('dragstart', dragStart, false);
						listItem.addEventListener('dragenter', dragEnter, false);
						listItem.addEventListener('dragover', dragOver, false);
						listItem.addEventListener('dragleave', dragLeave, false);
						listItem.addEventListener('drop', handleDrop, false);
						listItem.addEventListener('dragend', dragEnd, false);
					});
			});
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