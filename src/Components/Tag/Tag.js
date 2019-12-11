import React from 'react';
import './Tag.css'

class Tag extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            value: this.props.mechanic,
            selected: false
        }
    }

    render()
    {
        if (this.state.selected === true)
        return(
            <h4 className="selected">{this.state.value}</h4>
        )
        else 
        return(
            <h4 className="notSelected">{this.state.value}</h4>
        )
    }
}

export default Tag;