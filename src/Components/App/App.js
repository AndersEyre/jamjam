import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import spotify from '../../util/spotify';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      
      playlistName: 'New Playlist',
      playlistTracks: [],
      searchResults:[], 
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    spotify.search(term).then(searchResults => {
      console.log(searchResults)
      this.setState({searchResults: searchResults})
    });
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
    
    
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
      tracks.push(track);
      this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let i = track.id;
    
    tracks = tracks.filter(currentTrack => currentTrack.id !== i);

    this.setState({playlistTracks: tracks}); 
    }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
            onRemove={this.removeTrack}
            playlistName={this.state.playlistName}
            isRemoval={true}
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName} 
            onSave={this.savePlaylist}  
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;

