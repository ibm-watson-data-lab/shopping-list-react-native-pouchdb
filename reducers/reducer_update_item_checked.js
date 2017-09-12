import { UPDATE_ITEM_CHECKED } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case UPDATE_ITEM_CHECKED:
				state = action.payload;
				break;
		}
	}
	return state;
}