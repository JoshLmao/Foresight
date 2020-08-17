export const EDamageType = {
    MAGICAL: "DAMAGE_TYPE_MAGICAL",
    PURE: "DAMAGE_TYPE_PURE",
    PHYSICAL: "DAMAGE_TYPE_PHYSICAL",
};

/// All Ability Behaviour types
export const EAbilityBehaviour = {
    UNIT_TARGET: "DOTA_ABILITY_BEHAVIOR_UNIT_TARGET",
    POINT: "DOTA_ABILITY_BEHAVIOR_POINT",
    AOE: "DOTA_ABILITY_BEHAVIOR_AOE",
    HIDDEN: "DOTA_ABILITY_BEHAVIOR_HIDDEN",
    PASSIVE: "DOTA_ABILITY_BEHAVIOR_PASSIVE",
    NO_TARGET: "DOTA_ABILITY_BEHAVIOR_NO_TARGET",
    IMMEDIATE: "DOTA_ABILITY_BEHAVIOR_IMMEDIATE",
    IGNORE_CHANNEL: "DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL",
    SHOW_IN_GUIDES: "DOTA_ABILITY_BEHAVIOR_SHOW_IN_GUIDES",
    AURA: "DOTA_ABILITY_BEHAVIOR_AURA",
}

/// Enum of all spell immune types, if the ability pierces spell immunity
export const ESpellImmunityType = {
    YES: "SPELL_IMMUNITY_ENEMIES_YES",
    NO: "SPELL_IMMUNITY_ENEMIES_NO",
}