class BidPalError extends Error {
}

class NotFoundError extends BidPalError {
}

class PermissionError extends BidPalError {
}

class AuthorizationError extends BidPalError {
}

export {
  BidPalError,
  NotFoundError,
  PermissionError,
  AuthorizationError,
};
