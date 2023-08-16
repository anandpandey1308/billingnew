class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const createErrorResponse = (message, statusCode) => {
  return {
    success: false,
    error: {
      message,
      code: statusCode,
    },
  };
};

const createSuccessResponse = (message, data) => {
  return {
    success: true,
    message,
    data,
  };
};

export { CustomError, createErrorResponse, createSuccessResponse };
