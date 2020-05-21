import React, { Component } from 'react';
import {
    Row, 
    Col
} from "react-bootstrap";

import Item from "./Item";

class Items extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            backpack: props.backpack,
            neutral: props.neutral,
        };

        this.getItemIcon = this.getItemIcon.bind(this);
    }

    getItemIcon(item, width, height, scale) {
        // Width and height of each item in item_stylesheet
        if (item.item === "none") {
            return <span style={{ backgroundColor: "#212121", width: width, height: height, transform: `scale(${scale}, ${scale})`, display: "block", transformOrigin: "top left" }} />
        } else {
            return <span className={ 'sprite sprite-' + item.item + '_png '} alt={item.item} style={{ transform: `scale(${scale}, ${scale})`, transformOrigin: "top left" }} />
        }
    }

    render() {
        var itemsColWidth = 6;
        var backpackColWidth = 6;
        return (
            <div>
                <Row>
                    <Col md={itemsColWidth}>
                        <h6>ITEMS</h6>
                    </Col>
                    <Col md={backpackColWidth}>
                        <h6>BACKPACK</h6>
                    </Col>
                </Row>
                <Row>
                    <Col md={itemsColWidth} className="d-flex">
                        {
                            this.state.items && this.state.items.map((value) => {
                                return (
                                    <Item 
                                        key={value.slot}
                                        slot={value.slot}
                                        item={value.item} />
                                )
                            })
                        }
                    </Col>
                    <Col md={backpackColWidth} className="d-flex">
                            {
                                this.state.backpack && this.state.backpack.map((value) => {
                                    var scale = 0.7;
                                    var width = "88px";
                                    var height = "64px";
                                    return (
                                        <Item
                                            key={value.slot}
                                            slot={value.slot}
                                            item={value.item} />
                                    )
                                })
                            }
                            {/* Neutral Item */}
                            <div className="ml-3" style={{ width: `calc(88px * ${0.7})`, height: `calc(64px * ${0.7})`}}>
                                { this.getItemIcon(this.state.neutral, "88px", "64px", 0.7) }
                            </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Items;