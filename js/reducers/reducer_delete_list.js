import { DELETE_LIST } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case DELETE_LIST:
				state = action.payload;
				break;
		}
	}
	return state;
}