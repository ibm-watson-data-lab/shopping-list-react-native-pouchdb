import { ADD_LIST } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case ADD_LIST:
				state = action.payload;
				break;
		}
	}
	return state;
}