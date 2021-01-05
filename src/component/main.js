import React, { Component } from "react";
import Spotify from "spotify-web-api-node";

const spotifyWebApi = new Spotify();
export default class Main extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      values: [],
      loggedIn: params.access_token ? true : false,
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  componentDidMount() {
    spotifyWebApi.getArtistAlbums("22bE4uQ6baNwSHPVcDxLCe").then((response) => {
      this.setState({ values: response.body.items });
    });
  }

  render() {

    return (
      <div>
        <a href="https://spotifyapiuse.herokuapp.com/">
          <button> Login With Spotify </button>
        </a>
        <h1 style = {{color:"white" , marginLeft:100, top:150 , position:"absolute" , fontSize:50}}>Album</h1>
        <p style = {{color:"white" , marginLeft:100, top:220 , position:"absolute" , fontSize:30}} >Rollling Stones</p>
        <div className = "Album">
          {this.state.values.map((album) => {
            return (
              <div className = "songs">
                
                <img className = "img"  src={album.images[1].url} />
                <p className = "name">{album.name}</p>
                <p className = "year">Release Date : {album.release_date}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
