import { FETCH_USER } from '../actions/types';

// default state is null - we don't know the status initially
export default function(state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      // if user is not logged in, payload is empty string
      // we change the empty string to 'false'
      return action.payload || false; // if payload is '', return false
    // return state;
    default:
      return state;
  }
}
