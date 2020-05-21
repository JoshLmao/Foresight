import { createStore } from "redux";
import { DOTAHeroes } from "../data/dota2/json/npc_heroes.json";

function parseName(modelString) {
    var dashSplit = modelString.split('.')[0].split('/');
    return dashSplit[dashSplit.length - 1];
}

function getHeroAbilities(heroInfo) {
    return [
        heroInfo.Ability1, heroInfo.Ability2, heroInfo.Ability3, heroInfo.Ability4, heroInfo.Ability5, heroInfo.Ability6, heroInfo.Ability7,
    ];
}

const initialState = {
    selectedHero: DOTAHeroes.npc_dota_hero_zuus,
    selectedHeroName: parseName(DOTAHeroes.npc_dota_hero_zuus.Model),
    selectedHeroAbilities: getHeroAbilities(DOTAHeroes.npc_dota_hero_zuus),
};

function reducer(state = initialState, action) {
    console.log(action.value);
    switch(action.type)
    {
        case "SELECTEDHERO":
            return {
                selectedHero: action.value,
                selectedHeroName: parseName(action.value.Model),
                selectedHeroAbilities: getHeroAbilities(action.value),
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;