import React, { Component } from 'react';
import {
    Tabs,
    Tab,
    Button,
    Form,
    ListGroup
} from "react-bootstrap";
import { DOTAAbilities } from "../../data/dota2/json/items.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import {
    itemNameToElement
} from "../../utils";

import "./ItemSelector.css";
import "../../css/dota_items.css";

function getItemsByQuality(itemsArray, matchArray) {
    return itemsArray.filter((itemInfo) => {
        var quality = itemInfo.item.ItemQuality;
        if (quality) { //(quality === "consumable" || quality === "component" || quality === "secret_shop")) {
            for(var i = 0; i < matchArray.length; i++) {
                if (quality === matchArray[i]) {
                    return itemInfo;
                }
            }
        }
    });
}

function filterItemName (name) {
    var item = name.split('_');
    item.shift();
    item = item.join('_');
    return item;
}

function getItemIcon(item, width, height, scale) {
    // Remove 'item_' prefix, split by _, remove "item" and join again
    item = filterItemName(item);

    // Width and height of each item in item_stylesheet
    if (item) {
        return <span className={ 'sprite sprite-' + item + '_png '} alt={item} data-item={item} style={{ transform: `scale(${scale}, ${scale})`, transformOrigin: "top left" }} />
    } else {
        return <span style={{ backgroundColor: "#212121", width: width, height: height, transform: `scale(${scale}, ${scale})`, display: "block", transformOrigin: "top left" }} />
    }
}

function ItemFromInfo(props) {
    return (
            <div 
                key={props.keyName} 
                title={props.item.name} 
                onClick={props.onClick}
                className="m-1" 
                style={{ width: `calc(88px * ${props.scale})`, height: `calc(64px * ${props.scale})` }}>
                { 
                    getItemIcon(props.item.name, "88px", "64px", props.scale) 
                }
            </div>
    );
}

function TabHeading(props) {
    return (
        <h6 className="px-3 mb-0">{props.text}</h6>
    );
}

class ItemSelector extends Component {
    constructor(props) {
        super(props);

        var selectableItems = Object.keys(DOTAAbilities).filter((value) => {
            var key = value.toLowerCase();
            var ability = DOTAAbilities[value];
            if (key !== "version" && !key.includes("recipe") && !ability.ItemIsNeutralDrop && !ability.IsObsolete) {
                return true;
            }
            return false;
        });
        // Convert keys to item data
        selectableItems = selectableItems.map((key) => {
            return {
                item:  DOTAAbilities[key],
                name: key,
            };
        })
        selectableItems.sort();

        var basicItems = getItemsByQuality(selectableItems, ["consumable", "component", "secret_shop"]);
        var upgradesItems = getItemsByQuality(selectableItems, ["common", "rare", "epic", "artifact"]);

        this.state = {
            allItems: selectableItems,
            queryItems: null,

            onSelectedItem: props.onSelectedItem,

            basicItems: basicItems,
            upgradesItems: upgradesItems,
        };

        this.onSearchChanged = this.onSearchChanged.bind(this);
        this.onSearchItemSelected = this.onSearchItemSelected.bind(this);
        this.onShopItemSelected = this.onShopItemSelected.bind(this);
        this.onRemoveItemSelected = this.onRemoveItemSelected.bind(this);
    }

    onSearchChanged(e) {
        var query = e.target.value;
        var filteredItems = null;
        if (query) {
            filteredItems = this.state.allItems.filter((item) => {
                return item.name.indexOf(query.toLowerCase()) !== -1; 
            });
        }

        this.setState({
            queryItems: filteredItems,
        });
    }

    onSearchItemSelected(e) {
        var val = e.target.dataset?.item;
        this.state.onSelectedItem(val);
    }

    onShopItemSelected (e) {
        var item = e.target.dataset?.item;
        this.state.onSelectedItem(item);
    }

    onRemoveItemSelected(e) {
        var item = null;
        this.state.onSelectedItem(item);
    }

    render() {
        var scale = 0.5;
        var searchIconScale = 0.45;
        return (
            <div className="item-card">
                <div className="item-card header d-flex">
                    <div>
                        <Form.Control type="text" placeholder="Search..." onChange={this.onSearchChanged}/>
                    </div>
                    <div className="ml-auto">
                        <Button variant="outline-danger" onClick={this.onRemoveItemSelected}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                    </div>
                </div>
                <div className="item-card content">
                    <div className="">
                        {
                            this.state.queryItems && 
                            <div>
                                <h6>SEARCH RESULTS</h6>
                                <ListGroup>
                                    {
                                        // Query search term
                                        this.state.queryItems.map((item) => {
                                            var itemNameDisplay = filterItemName(item.name);
                                            return (
                                                <ListGroup.Item 
                                                    key={item.name} 
                                                    data-item={itemNameDisplay} 
                                                    className="py-1 px-3"
                                                    onClick={this.onSearchItemSelected} 
                                                    action>
                                                    <div className="d-flex" data-item={itemNameDisplay}>
                                                        <ItemFromInfo 
                                                            item={item}
                                                            onClick={this.onSearchItemSelected} 
                                                            scale={searchIconScale}/>

                                                        <h6 className="mx-1 my-auto" data-item={itemNameDisplay}>
                                                            { itemNameDisplay }
                                                        </h6>
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        })
                                    }   
                                </ListGroup>
                            </div>
                        }
                    </div>
                    {/* Regular view */}
                    {
                        !this.state.queryItems && 
                            <div>
                                <Tabs defaultActiveKey="basic" transition={false} id="shop-tabs">
                                    <Tab eventKey="basic" title={<TabHeading text="BASIC" />}>
                                        <div className="d-flex flex-wrap">
                                            {
                                                this.state.basicItems && this.state.basicItems.map((item) => {
                                                    return (
                                                        <ItemFromInfo 
                                                            key={item.item.ID}
                                                            item={item}
                                                            onClick={this.onShopItemSelected} 
                                                            scale={scale} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </Tab>
                                    <Tab eventKey="upgrades" title={<TabHeading text="UPGRADES" />}>
                                        <div className="d-flex flex-wrap">
                                            {
                                                this.state.upgradesItems && this.state.upgradesItems.map((item) => {
                                                    return (
                                                        <ItemFromInfo 
                                                            key={item.item.ID}
                                                            item={item}
                                                            onClick={this.onShopItemSelected} 
                                                            scale={scale} />
                                                    );
                                                })
                                            }
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default ItemSelector;