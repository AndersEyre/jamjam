
let accessToken;

const redirectURI = 'http://Jammyjam.surge.sh/';
const clientId = 'c4941186f85e48c8b87713e6e8f5d8e5';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectURI}`;


const spotify = {

    search(term){
        const accessToken = spotify.getAccessToken();
        console.log(term)
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,{
            headers: { Authorization : `Bearer ${accessToken}`}
        }).then(response => {
            console.log(response)
            return response.json();
        }).then(jsonReponse => {
            console.log(jsonReponse)
            if(!jsonReponse.tracks){
                console.log('notracks')
                return [];
            } 
            return jsonReponse.tracks.items.map(track => {
                
               return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }
                
        
            }

            )
        })
    },

    /*
      search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      });
  },
  */

 getAccessToken() {
     let expiresIn;
     
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = spotifyUrl;
    }
  },

    

    savePlaylist(name,trackUris){
        if(!name || !trackUris){
            return;
        }
        
        const accessToken = spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch("https://api.spotify.com/v1/me",{headers: headers}
        ).then(
        response => response.json()
        ).then(jsonReponse => {
        userId = jsonReponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
        }).then(response => response.json()
        ).then(jsonReponse => {
            const playlistId = jsonReponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackUris})
            })
        })
        })
    
    }


};



export default spotify;