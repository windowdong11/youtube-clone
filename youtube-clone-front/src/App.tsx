import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading || user === undefined) return <div>Loading ...</div>;

  if(!isAuthenticated) return <div>Auth required</div>
  
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
};

const Public = () => {
  const [result, setResult] = useState<string>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/public`, {
          method: 'GET',
        });
        setResult((await response.json()).message);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  console.log(result)

  if(!result) return <div>Public : Loading...</div>;

  return <div>Public : {result}</div>
}

const Private = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(`Bearer ${token}`);
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/private`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
        });
        setPosts((await response.json()).message);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>{posts}</div>
  );
};

const App = () => {
  const { isLoading, error, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>();
  useEffect(() => {
    async function sat() {
      setAccessToken(await getAccessTokenSilently());
    }
    sat()
  }, [isAuthenticated])

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <div>
      <Public/>
      Public
      <LoginButton/>
      </div>
  }

  return (
    <div>
      <Public/>
      Private, Authenticated JWT : {accessToken}
      <Profile/>
      <Private/>
      <LogoutButton/>
    </div>
  );
};

export default App;
