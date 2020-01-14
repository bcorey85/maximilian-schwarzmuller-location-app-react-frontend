import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
	switch (action.type) {
		//Check action type, if INPUT_CHANGE
		case 'INPUT_CHANGE':
			//Set initial state to formIsValid ===true
			let formIsValid = true;
			//Loop through each input in state, inputId = 'title' or 'description'
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue;
				}

				//If inputId in state iteration === action.inputId
				if (inputId === action.inputId) {
					//set formIsValid globally for form based on individual action.isValid
					formIsValid = formIsValid && action.isValid;
				} else {
					//Else set global state validity previous state validity
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				//Return previous state
				...state,
				//Override previous state with new info
				inputs: {
					//Copy previous inputs
					...state.inputs,
					//Override action input with supplied values
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid
					}
				},
				//Set global state validity based on passed checks
				isValid: formIsValid
			};
		case 'SET_DATA':
			return {
				inputs: action.inputs,
				formIsValid: action.formIsValid
			};
		default: {
			return state;
		}
	}
};

export const useForm = (initialInputs, initialFormValidity) => {
	const [ formState, dispatch ] = useReducer(formReducer, {
		inputs: initialInputs,
		isValid: initialFormValidity
	});

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGE',
			value: value,
			isValid: isValid,
			inputId: id
		});
	}, []);

	const setFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: 'SET_DATA',
			inputs: inputData,
			formIsValid: formValidity
		});
	}, []);

	return [ formState, inputHandler, setFormData ];
};
