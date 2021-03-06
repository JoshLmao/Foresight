import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import {  faSearch } from "@fortawesome/free-solid-svg-icons";
import { getLocalizedString } from '../../utility/data-helpers/language';
import { getAllPlayableHeroes } from '../../utility/dataHelperHero';

import "./HeroSelector.css";
import { itemAliasIncludes } from '../../utility/dataHelperItems';

class HeroSelector extends Component {
    constructor(props) {
        super(props);

        let selectableHeroes = getAllPlayableHeroes();
        this.state = {
            filteredHeroes: selectableHeroes,
            allHeroes: selectableHeroes,

            onSelectedHero: props.onSelectedHero,
            dotaStrings: props.dotaStrings,
        };

        this.onSearchChanged = this.onSearchChanged.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                onSelectedHero: this.props.onSelectedHero,
                dotaStrings: this.props.dotaStrings,
            });
        }
    }

    onSearchChanged(e) {
        let searchTerm = e.target.value;
        let filteredHeroes = this.state.allHeroes;
        if (searchTerm) {
            filteredHeroes = this.state.allHeroes.filter((hero) => {
                /// Match against localized string
                let localizedHeroName = getLocalizedString(this.state.dotaStrings, hero.name)?.toLowerCase();
                if (localizedHeroName && localizedHeroName.indexOf(searchTerm.toLowerCase()) !== -1) {
                    return true;
                }

                // Alias if localized string hasnt got a match, only works in english
                let aliasMatch = itemAliasIncludes(hero.heroInfo.NameAliases, searchTerm);
                if (aliasMatch) {
                    return true;
                }

                return false;
            });
        }

        this.setState({
            filteredHeroes: filteredHeroes,
        });
    }

    render() {
        let iconScale = 0.5;
        return (
            <div className="hero-card">
                <div className="hero-card header d-flex p-2">
                    <div className="d-flex">
                        <h5 className="my-auto ml-2">{ getLocalizedString(this.state.dotaStrings, "DOTA_Hero_Selection_Intro_Header") }</h5>
                        <div className="ml-auto p-1">
                            <Form.Control 
                                className="foresight-input-control"
                                type="text"
                                placeholder="Search..." 
                                onChange={this.onSearchChanged} />
                        </div>
                        <FontAwesomeIcon 
                            className="my-auto mx-2"
                            icon={faSearch} />
                    </div>
                </div>
                <div className="hero-card content p-2">
                    <div className="d-flex flex-wrap">
                        {
                            this.state.filteredHeroes && this.state.filteredHeroes.map((value) => {
                                let localizedName = getLocalizedString(this.state.dotaStrings, value.name)
                                return (
                                    <div
                                        key={value.name}  
                                        title={localizedName}
                                        onClick={this.state.onSelectedHero}
                                        className="m-1"
                                        style={{ 
                                            height: `calc(72px * ${iconScale})`, 
                                            width: `calc(128px * ${iconScale})` 
                                        }}>
                                        <span 
                                            className={`hero-icon-big hero-icon-big-${value.name}_png`} 
                                            style={{ transformOrigin: "top left", transform: `scale(${iconScale}, ${iconScale})` }}
                                            data-heroname={value.displayName}
                                            data-hero={value.name} 
                                            title={localizedName}/>
                                    </div>
                                )
                            })
                        }
                        {
                            this.state.filteredHeroes && this.state.filteredHeroes.length <= 0 &&
                                <h6 className="p-1">
                                    { getLocalizedString(this.state.dotaStrings, "DOTA_Shop_Search_No_Results") }
                                </h6>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default HeroSelector;