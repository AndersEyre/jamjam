import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import '../TrackList/TrackList.css';

export class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }


    handleNameChange(e){
        this.props.onNameChange(e.target.value)
    }

    render(){
        return(
            <div className="Playlist">
              <input defaultValue={"Type Playlist Name"} onChange={this.handleNameChange}/>
              <TrackList onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} tracks={this.props.playlistTracks}/>
              <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;