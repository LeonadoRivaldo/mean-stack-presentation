class ErrorHandler extends Error {
    constructor(statusCode = 500, message = "Internal error, contact support.", type = "error") {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.type = type;
    }
  }

  const handleResponseError = (err, res) => {
    console.log(err);
    const { statusCode, message, type, errors } = err;
    res.status(statusCode||500).json({
      status: type,
      statusCode,
      message,
      errors
    });
  };


  module.exports = {
    ErrorHandler,
    handleResponseError
  }