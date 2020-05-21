import React, { Component } from 'react';
import {
    Row, 
    Col
} from "react-bootstrap";

import Item from "./Item";
import Neutral from "../Neutral";

class ItemsBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            backpack: props.backpack,
            neutral: props.neutral,
            iconScale: 0.7,
        };
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
                                return (
                                    <Item
                                        key={value.slot}
                                        slot={value.slot}
                                        item={value.item} />
                                )
                            })
                        }
                        {/* Neutral Item */}
                        <div className="ml-3">
                            <Neutral neutralItem={this.state.neutral} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ItemsBar;