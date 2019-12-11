import React from 'react';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import './ControlledPopup.css';

class ControlledPopup extends React.Component {
    constructor(props) {
      super(props);
      this.state = { open: false,
      players: 1,
      playingTime: 'medium',
      value: 3,
      filtered: false,};
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handlePlayerChange = this.handlePlayerChange.bind(this);
      this.handlePlayingTimeChange = this.handlePlayingTimeChange.bind(this);
      this.clearFilters = this.clearFilters.bind(this);
    }
    openModal() {
      this.setState({ open: true });
    }
    closeModal() {
      this.setState({ open: false, filtered: true});
      this.props.applyFilterResults({'players': this.state.players, 'playingTime': this.state.playingTime})
    }

    clearFilters()
    {
        this.setState({filtered: false})
        this.props.clearFilters()
    }

    handlePlayerChange(event, _value)
    {
        console.log(_value);
        this.setState({value: _value, players: _value});
    }

    handlePlayingTimeChange(event)
    {
        this.setState({playingTime: event.target.value});
    }
    render() {

        const filtered = this.state.filtered;
        const fetched = this.props.fetched;

        let filter_button;
        let clear_button;
        let filter_text;

        if (filtered)
        {
            clear_button = (<Button className="normal-button" variant="contained" color="secondary" onClick={this.clearFilters}>Clear Filter</Button>)
            filter_text =(<h3 className="normal-text">Max. players: {this.state.players} Max. playing time: {this.state.playingTime}</h3>)
        }   else
        {
            clear_button = (<Button disabled className="normal-button" variant="contained" color="secondary" onClick={this.clearFilters}>Clear Filter</Button>)
            filter_text =(<h3 className="normal-text">No filters</h3>)
        }

        if (fetched)
        {
            filter_button = (<Button className="normal-button" variant="contained" color="primary" onClick={this.openModal}>Filter</Button>)
        }   else
        {
            filter_button = (<Button disabled className="normal-button" variant="contained" color="primary" onClick={this.openModal}>Filter</Button>)
        }

        return (
            <div>
            {filter_button}
            {clear_button}
            {filter_text}
            <Popup open={this.state.open}>
                <div className="modal">
                <div className="header">
                    <h2>Filter collection</h2>
                </div>
                <div className="body">
                    <div className="player-number">
                    <Typography id="players-slider" gutterBottom>
                        Number of Players
                    </Typography>
                    <Slider value={this.state.value} defaultValue={this.state.players} valueLabelDisplay='auto' onChange={(event, value) => this.handlePlayerChange(event, value)} step={1} marks={true} min={1} max={12}/>
                    </div>
                    <div className="playing-time">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Maximum Playing Time</FormLabel>
                                <RadioGroup defaultValue={this.state.playingTime} value={this.state.playingTime} onChange={this.handlePlayingTimeChange} aria-label="Maximum playing time" name="playingTime-radios">
                                    <FormControlLabel value="short" control={<Radio />} label="Short (60 minutes or less)"/>
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium (60-120 minutes)"/>
                                    <FormControlLabel value="long" control={<Radio />} label="Long (120+ minutes)"/>
                        </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                    <Button variant="contained" color="primary" onClick={this.closeModal}>Done</Button>
                </div>
            </Popup>
            </div>
        );
    }
}
  
export default ControlledPopup;