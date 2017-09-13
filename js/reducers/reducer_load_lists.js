import { LOAD_LISTS } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case LOAD_LISTS:
				state = action.payload;
				break;
		}
	}
	return state;
}