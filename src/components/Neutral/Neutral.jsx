import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import NeutralItemSelector from "./NeutralItemSelector";
import ItemInfoTooltip from '../ItemsBar/ItemInfoTooltip';

import { itemNameToElement } from "../../utils";

class Neutral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            neutralItem: props.neutralItem,
            onNewNeutralSelected: props.onNewNeutralSelected,
            abilityStrings: props.abilityStrings,
            iconScale: 0.7,
        };
    }

    componentDidUpdate (prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                neutralItem: this.props.neutralItem,
                abilityStrings: this.props.abilityStrings,
                onNewNeutralSelected: this.props.onNewNeutralSelected,
            });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.neutralItem && this.state.neutralItem.item &&
                        <Popup
                            trigger={isOpen => (
                                <div
                                    className="ml-2 mt-1" 
                                    style={{ position:"absolute", zIndex: 1 }}>
                                    <FontAwesomeIcon icon={faInfo} />
                                </div>
                            )}
                            open={this.state.hoverOpen}
                            position="right center"
                            on="hover"
                            contentStyle={{ width: "350px", overflowY: "auto", padding: 0, border: 0 }}>
                                <ItemInfoTooltip
                                    itemName={this.state.neutralItem.item}
                                    abilityStrings={this.state.abilityStrings}
                                    />
                        </Popup>
                }
                <Popup
                    trigger={isOpen => {
                        return itemNameToElement(this.state.neutralItem, this.state.iconScale)
                    }}
                    position="right center"
                    contentStyle={{ width: "325px", overflowY: "auto" }}>
                    <NeutralItemSelector onNeutralSelected={this.state.onNewNeutralSelected} />
                </Popup>
            </div>
        );
    }
}

export default Neutral;