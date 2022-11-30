// 4XX status code related to client side error
// 5XX status code related to server side error

import { ERROR_STATUS_ARRAY } from 'src/constants/ErrorData';

function findErrorMessage(status) {
	return ERROR_STATUS_ARRAY.find(v => v.statusCode == status) || { error: 'There must be an error' };
}

function makeResponse(statusCode, succMessage, data) {
	let msgArray = new Array();
	msgArray.push(succMessage);
	return {
		statusCode,
		message: msgArray,
		data
	}
}

/**
		* Success Reposnse.
 		* @param {number} statusCode - Success response status
		* @param {string} succMessage - Success response message
		* @param {any} data - Success response custom data
	*/
let successResponse = (statusCode, succMessage, data) => {
	return makeResponse(statusCode, succMessage, data)
}



/**
		* Success Reposnse.
		* @param {number} statusCode - Error response status
		* @param {string} errorMessage - Error response message
		* @param {any} data - Error response custom data
	*/
function errorResponse(statusCode, errorMessage?, data?) {
	if (errorMessage !=null && data != null) {
		return makeResponse(statusCode, errorMessage, data)		
	} else {
		return findErrorMessage(statusCode);
	}
}

export {
	errorResponse,
	successResponse
};
