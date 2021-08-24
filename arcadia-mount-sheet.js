import NPCSheet5e from "../../systems/dnd5e/module/actor/sheets/npc.js"

export class ActorSheet5eArcadiaMount extends NPCSheet5e {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['dnd5e', 'sheet', 'actor', 'npc', 'mount'],
            width: 600,
            height: 680
        })
    }

    get template() {
        if (!game.user.isGM && this.actor.limited) {
            return "systems/dnd5e/templates/actors/limited-sheet.html"
        }

        return 'modules/arcadia-mount-sheet-5e/template/arcadia-mount-sheet.html'
    }

    async _updateObject(event, formData) {
        // Set Max Temp HP
        const multiplierKey = 'data.attributes.hp.tempmultiplier'
        const multiplier = parseFloat(formData[multiplierKey])

        const riderLevelKey = 'data.attributes.hp.riderlevel'
        const riderLevel = parseFloat(formData[riderLevelKey])

        const profKey = 'data.attributes.prof'
        formData[profKey] = Math.floor((riderLevel + 7) / 4)

        const maxTempHPKey = 'data.attributes.hp.tempmax'
        const newMaxTempHP = riderLevel * multiplier

        if (newMaxTempHP) {
            formData[maxTempHPKey] = newMaxTempHP
        }

        // Parent ActorSheet update steps
        return super._updateObject(event, formData)
    }
}

Hooks.once('init', function () {
    window.CONFIG.DND5E.armorClasses = mergeObject(window.CONFIG.DND5E.armorClasses, {
        mount: {
            label: "MPWB5E.ArmorClassMount",
            formula: "@attributes.ac.flat + @attributes.prof"
        }
    })

    const original = window.CONFIG.Actor.documentClass.prototype._prepareNPCData

    window.CONFIG.Actor.documentClass.prototype._prepareNPCData = function mountSheetWrapper (actorData) {
        original.call(this, actorData)

        const sheetClass = this._getSheetClass()

        if (sheetClass && sheetClass.name === 'ActorSheet5eArcadiaMount') {
            actorData.data.attributes.prof = Math.floor((Math.max(1, actorData.data.attributes.hp.riderlevel) + 7) / 4)
        }
    }
})

Actors.registerSheet("dnd5e", ActorSheet5eArcadiaMount, {
    types: ['npc'],
    label: 'MPWB5E.SheetClassArcadiaMount',
    makeDefault: false
})
