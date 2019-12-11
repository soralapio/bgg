import React from "react";
import Tag from "../Tag/Tag.js";
import "./Boardgame.css";

class Boardgame extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Mechanics: " + this.props.gameInfoAsJSON.mechanics)
    this.state = {
      id: this.props.gameInfoAsJSON.id,
      name: this.props.gameInfoAsJSON.name,
      description: this.props.gameInfoAsJSON.description,
      yearpublished: this.props.gameInfoAsJSON.yearpublished,
      suggestedplayers: this.props.gameInfoAsJSON.suggested_players,
      minplayers: this.props.gameInfoAsJSON.minplayers,
      maxplayers: this.props.gameInfoAsJSON.maxplayers,
      image: this.props.gameInfoAsJSON.image,
      thumbnail: this.props.gameInfoAsJSON.thumbnail,
      playingtime: this.props.gameInfoAsJSON.playingtime,
      mechanics: this.props.gameInfoAsJSON.mechanics.toString().split(",")
    };

  }

  render() {
    return (
      <div className="boardgame">
        <div className="header-container">
          <div className="image">
            <img className="thumbnail" alt={this.state.name + " cover"} src={this.state.thumbnail}></img>
          </div>
          <div className="title-bar">
            <div className="title-text">
              <h2>
                {this.state.name} ({this.state.yearpublished})
              </h2>
            </div>
          </div>
        </div>

        <div className="information-container">
          <div className="information-text">
            <h3>
              Min. players: {this.state.minplayers} Max. players: {this.state.maxplayers} Best with: {this.state.suggestedplayers}
            </h3>
            <h3>Playing time: {this.state.playingtime} min.</h3>
          </div>
          <div className="tags">
            {this.state.mechanics.map(mech => (
              <Tag key={mech} mechanic={mech}  />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Boardgame;
