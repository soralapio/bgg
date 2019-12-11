import React from 'react';
import Boardgame from '../Boardgame/Boardgame.js';
import './BoardgameList.css'
import TextField from '@material-ui/core/TextField';
import ControlledPopup from '../ControlledPopup/ControlledPopup.js';



class BoardgameList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.fetched_JSON = [];
        this.handleChange = this.handleChange.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.processData = this.processData.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.state = {
            value: '',
            json_fetched: false,
            filtered: false,
            entered_name: "",
            filter_maxplayers: null,
            filter_playingtime: null,
            url: "https://soris.fi/api/collection/$USERID/"
        }

    }

    applyFilters(filters)
    {
        console.log("Applying filters");
        console.log(filters)
        this.setState({filter_maxplayers: filters.players, filter_playingtime: filters.playingTime, filtered: true})
    }

    clearFilters()
    {
        this.setState({filter_maxplayers: null, filter_playingtime: null, filtered: false});
    }

    processData(data)
    {
        console.log("Data received");
        this.fetched_JSON = data;

        /** Currently not filtering according to mechanic tags, so this is unnecessary complexity.
        let list_of_mechanics = [];
        this.fetched_JSON.forEach(function(value){
            if(list_of_mechanics.indexOf(value) ===-1) list_of_mechanics.push(value);
        });
         */

        this.setState({json_fetched: true});

    }

    submitChange(event)
    {
        event.preventDefault();
        console.log("Received name: " + this.state.value)
        this.setState({entered_name: this.state.value, json_fetched: false});
        const replacedURL = this.state.url.replace("$USERID", this.state.value);
        console.log("Fetching from " + replacedURL)
        fetch(replacedURL)
        .then(response => response.json())
        .then(data => this.processData(data))
    }

    handleChange(event)
    {
        this.setState({value: event.target.value});
    }

    render()
    {

        let content = ""

        if (this.state.filter_maxplayers === null || this.state.filter_playingtime === null) // No filters applied
        {
            if (this.state.json_fetched === false) // No JSON fetched yet either
            {
                content = (<h2 className="normalText">Nothing to display yet.</h2>) // Display a user prompt
            }
            
            else
            {
                content = (this.fetched_JSON.map(bg => <Boardgame key={bg.id + bg.name} gameInfoAsJSON={bg}/>)) // Display the unfiltered collection.
            }

        }

        else
        {
            console.log("filters: " + this.state.filter_maxplayers + ", " + this.state.filter_playingtime)
            const filtered_JSON = this.fetched_JSON.filter(
            item => item.minplayers <= this.state.filter_maxplayers && this.state.filter_maxplayers <= item.maxplayers
        ).filter(
            item => 
            (this.state.filter_playingtime === "short" && item.playingtime <= 60) ||
            (this.state.filter_playingtime === "medium" && item.playingtime <= 120) ||
            (this.state.filter_playingtime === "long")
        );
            console.log("Results: " + filtered_JSON.length)
            content = (filtered_JSON.map(bg => <Boardgame key={bg.id + bg.name} gameInfoAsJSON={bg}/>)) // Display the filtered collection.

        }
        

        return(
            <div className="empty-container">
                <div className="header">
                <form onSubmit={this.submitChange}>
                    <TextField id="username" variant="filled" label="User Name" helperText="BoardgameGeek User Name" onChange= {this.handleChange}/>
                </form> 
                    <h2 className="normalText">Displaying {this.state.entered_name}'s collection</h2>

                <ControlledPopup fetched={this.state.json_fetched} applyFilterResults={this.applyFilters} clearFilters={this.clearFilters}/>
                </div>

                <div className="boardgamelist">
                    {content}
                </div>
            </div>
            )
    }
}

export default BoardgameList;