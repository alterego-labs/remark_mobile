import { List } from 'immutable';

import { LOAD_REMARKS, ADD_REMARK, CLEAN_REMARKS } from '../actions/Remarks';

const initialState = List([]);

const Remarks = (remarks = initialState, action) => {
  switch (action.type) {
    case LOAD_REMARKS:
      return remarks.concat(List(action.remarks));
    case ADD_REMARK:
      return remarks.unshift(action.remark);
    case CLEAN_REMARKS:
      return initialState;
    default:
      return remarks;
  }
}

export default Remarks;
