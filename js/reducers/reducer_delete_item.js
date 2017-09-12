import { DELETE_ITEM } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case DELETE_ITEM:
				state = action.payload;
				break;
		}
	}
	return state;
}