const formatResponse = (success, message, data = null, errorCode = null) => {
    const response = { success, message };

    if (data !== null && data !== undefined && Object.keys(data).length !== 0) {
        response.data = data;
    }

    if (!success && errorCode) {
        response.errorCode = errorCode;
    }

    return response;
};

module.exports = formatResponse;
