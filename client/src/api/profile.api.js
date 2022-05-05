export async function postLogin(user, pass) {
    try {
      const authResponse = await fetch('http://localhost:5000/auth', {
        method: 'POST',
        body: JSON.stringify({
            username: user,
            password: pass,
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const authBody = await authResponse.json();

      if (!authResponse.ok) {
        throw Error('Error in authorization: ' + authBody.message);
      }

      const profileResponse = await fetch('http://localhost:5000/api/profile', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': 'Bearer ' + authBody.access_token, 
        }), 
      });

      const profileBody = await profileResponse.json();

      if (!profileResponse.ok) {
        throw Error('Error when fetching profile: ' + profileBody.message);
      }

      return profileBody;
    } catch (err) {
        throw err;
    }
}

export async function postUser(userBody) {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          ...userBody
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw Error('Error when creating user: ' + responseBody.message);
      }

      return response.ok;
    } catch (err) {
      throw err;
    }
}
  
