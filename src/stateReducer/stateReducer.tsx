import { Action, State } from '../types/types';

export const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'change-search-term': {
      return { ...state, searchTerm: action.searchTerm };
    }
    case 'change-items-per-page': {
      return { ...state, itemsPerPage: action.itemsPerPage };
    }
    case 'fetch-request': {
      return { ...state, isLoading: true };
    }
    case 'fetch-success': {
      return { ...state, data: action.payload, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
