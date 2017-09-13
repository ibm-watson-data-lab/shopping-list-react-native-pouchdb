import { SET_ACTIVE_LIST, LOAD_ACTIVE_ITEMS, LOAD_LISTS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_CHECKED } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case SET_ACTIVE_LIST:
				state = {list: action.payload, items: [], counter: 1};
				break;
			case LOAD_ACTIVE_ITEMS:
				if (state && state.list) {
					state = {list: state.list, items: action.payload, counter: state.counter+1};
					break;
				}
				break;
			case ADD_ITEM:
				if (state && state.list && state.list._id == action.payload.list) {
					let newItems = Array.from(state.items);
					newItems.push(action.payload);
					state = {list: state.list, items: newItems, counter: state.counter+1};
					break;
				}
				break;
			case UPDATE_ITEM_CHECKED:
				if (state && state.list && state.list._id == action.payload.list) {
					let index = -1;
					for (let i=state.items.length-1; i>=0; i--) {
						if (state.items[i]._id == action.payload._id) {
							index = i;
							break;
						}
					}
					let newItems = Array.from(state.items);
					if (index != -1) {
						newItems.splice(index, 1, action.payload);
					}
					state = {list: state.list, items: newItems, counter: state.counter+1};
				}
				break;
			case DELETE_ITEM:
				if (state && state.list && state.list._id == action.payload.list) {
					let index = -1;
					for (let i=state.items.length-1; i>=0; i--) {
						if (state.items[i]._id == action.payload._id) {
							index = i;
							break;
						}
					}
					if (index != -1) {
						state.items.splice(index, 1);
						let newItems = Array.from(state.items);
						state = {list: state.list, items: newItems, counter: state.counter+1};
					}
					break;
				}
				break;
			case LOAD_LISTS:
				if (state && state.list) {
					for (let listMeta of action.payload) {
						if (listMeta.list._id == state.list._id) {
							state = {list: listMeta.list, items: listMeta.items, counter: state.counter+1};
							break;
						}
					}
				}
				break;
		}
	}
	return state;
}