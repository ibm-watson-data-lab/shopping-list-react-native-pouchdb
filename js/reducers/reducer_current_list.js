import { SET_CURRENT_LIST, LOAD_LISTS } from '../actions/index'

export default function(state = null, action) {
	if (action) {
		switch(action.type) {
			case SET_CURRENT_LIST:
				state = action.payload;
				break;
			case LOAD_LISTS:
				if (state) {
					for (let list of action.payload) {
						if (list._id == state._id) {
							console.log('LIST HERE!');
							console.log(list);
							state = list;
							break;
						}
					}
				}
				break;
		}
	}
	return state;
}