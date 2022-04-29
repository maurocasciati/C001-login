export async function postLogin(user, pass) {
    try {
      const authResponse = await fetch('https://0.0.0.0:4000/auth', {
        method: 'POST',
        body: JSON.stringify({
            username: user,
            password: pass,
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!authResponse.ok) {
        return _handleError(authResponse.status);
      }

      const authBody = await authResponse.json();

      const profileResponse = await fetch('https://0.0.0.0:4000/api/profile', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': 'Bearer ' + authBody.access_token, 
        }), 
      });

      if (!profileResponse.ok) {
        return _handleError(authResponse.status);
      }

      return await profileResponse.json();
    } catch (err) {
      _throwSpecificError(err);
    }
}

export async function postUser(userBody) {
    try {
      const response = await fetch('https://0.0.0.0:4000/api/users', {
        method: 'POST',
        body: JSON.stringify({
            ...userBody
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        return _handleError(response.status);
      }

      return await response.json();
    } catch (err) {
      _throwSpecificError(err);
    }
}
  
function _handleError(status) {
  if (status === 404) {
    throw new NotFoundError();
  }

  if (status === 500) {
    throw new ServerError();
  }
}

function _throwSpecificError(err) {
  if (err instanceof ServerError || err instanceof NotFoundError) {
    throw err;
  }
  throw new NetworkError();
}

export class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("The resource you requested was not found.");
  }
}

export class ServerError extends Error {
  constructor() {
    super("There was a server error.");
  }
}