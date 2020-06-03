import { DOTAHeroes } from "../data/dota2/json/npc_heroes.json";

import {
    SELECTED_HERO,
    SELECTED_ITEM,
    SELECTED_BACKPACK_ITEM,
    SELECTED_NEUTRAL,
    SELECTED_TALENT,
    UNSELECTED_TALENT,
    NEW_HERO_LEVEL,
} from "../constants/actionTypes";

import {
    parseNameFromModel,
} from "../utils";

import {
    getAllHeroAbilities,
    getHeroTalents,
} from "../utility/dataHelperHero";

function getNewItemArray(itemArray, newItem) {
    /// Remove old slot insert new and sort by Slot
    var newArray = itemArray.filter((val) => {
        if (val.slot !== newItem.slot) {
            return val;
        }
    })
    newArray.push({ slot: newItem.slot, item: newItem.item });
    newArray.sort((a, b) => (a.slot > b.slot) ? 1 : -1);
    return newArray;
}

function getNewTalentArray(talentArray, newTalent) {
    var newArray = talentArray.map((value => { return value }));
    newArray.push(newTalent);
    return newArray;
}

function removeTalent (talentArray, unselectedTalent) {
    /// Filter to get all but the unselectedTalent
    var array = talentArray.filter((talent) => {
        if (talent && talent !== unselectedTalent) {
            return talent;
        }
    });
    return array;
}

const initialState = {
    /// Current selected hero by the user
    selectedHero: DOTAHeroes.npc_dota_hero_zuus,
    /// display name of the selectedHero
    selectedHeroName: parseNameFromModel(DOTAHeroes.npc_dota_hero_zuus.Model),
    /// Array of abilities of the selectedHero
    heroAbilities: getAllHeroAbilities(DOTAHeroes.npc_dota_hero_zuus),
    /// Array of talents of the selectedHero
    heroTalents: getHeroTalents(DOTAHeroes.npc_dota_hero_zuus),
    /// Array of talents selected by the user
    selectedTalents: [ ],
    /// Current level of the hero set by the user
    heroLevel: 1,

    /// Current items that have been selected
    items: [
        { slot: 0, item: "abyssal_blade" },
        { slot: 1, item: "" },
        { slot: 2, item: "" },
        { slot: 3, item: "" },
        { slot: 4, item: "" },
        { slot: 5, item: "" },
    ],
    /// Current backpack selected by user
    backpack: [
        { slot: 0, item: "" },
        { slot: 1, item: "" },
        { slot: 2, item: "" },
    ],
    /// Current neutral item selected by user
    neutralItem: { item: "orb_of_destruction" },
};

function reducer(state = initialState, action) {
    switch(action.type)
    {
        case SELECTED_HERO:
            return {
                ...state,
                selectedHero: action.value,
                selectedHeroName: parseNameFromModel(action.value.Model),
                heroAbilities: getAllHeroAbilities(action.value),
                heroTalents: getHeroTalents(action.value),
                
                // reset selected talents when new hero selected
                selectedTalents: [ ],
            };
        case SELECTED_ITEM:
            return {
                ...state,
                items: getNewItemArray(state.items, action.value),
            };
        case SELECTED_BACKPACK_ITEM:
            return {
                ...state,
                backpack: getNewItemArray(state.backpack, action.value),
            }
        case SELECTED_NEUTRAL:
            return {
                ...state,
                neutralItem: action.value,
            };
        case SELECTED_TALENT:
            return {
                ...state,
               selectedTalents: getNewTalentArray(state.selectedTalents, action.value),
            }
            case UNSELECTED_TALENT:
                return {
                    ...state,
                    selectedTalents: removeTalent(state.selectedTalents, action.value),
                }
        case NEW_HERO_LEVEL:
            return {
                ...state,
                heroLevel: action.value,
            };
        default:
            return state;
    }
}

export default reducer;