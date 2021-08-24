import NPCSheet5e from "../../systems/dnd5e/module/actor/sheets/npc.js"

export class ActorSheet5eArcadiaMount extends NPCSheet5e {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['dnd5e', 'sheet', 'actor', 'npc', 'mount'],
            width: 720,
            height: 680
        })
    }

    get template() {
        if (!game.user.isGM && this.actor.limited) {
            return "systems/dnd5e/templates/actors/limited-sheet.html"
        }

        return 'modules/arcadia-mount-sheet-5e/template/arcadia-mount-sheet.html'
    }
}

Actors.registerSheet("dnd5e", ActorSheet5eArcadiaMount, {
    types: ['npc'],
    label: 'MPWB5E.SheetClassArcadiaMount',
    makeDefault: false
})
