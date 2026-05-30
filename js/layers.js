addLayer("g", {
    name: "gold",
    symbol: "G",
    position: 0,
    tooltip() {return formatWhole(player.g.miners) + " Miners"},
    startData() { return {
        unlocked: true,
        miners: new Decimal(0),
    }},
    color: "#fd0",
    row: 0,
    layerShown() {return true},
    shouldNotify() {
        return layers.g.buyables[11].canAfford() ||
            (layers.g.clickables.unlock1.canClick() && layers.g.clickables.unlock1.unlocked())
    },
    goldPerClick() {
        return new Decimal(1)
    },
    buyables: {
        11: {
            title() {return formatWhole(player.g.miners) + " Miners"},
            display() {return "Hire a gold miner.<br>Cost: " + format(layers.g.buyables[11].cost(player.g.miners)) + " gold."},
            cost(x) {return new Decimal(1.1).pow(x).mul(20)},
            canAfford() {return player.points.gte(layers.g.buyables[11].cost(player.g.miners))},
            buy() {
                player.points = player.points.sub(layers.g.buyables[11].cost(player.g.miners))
                player.g.miners = player.g.miners.add(1)
            }
        }
    },
    clickables: {
        minegold: {
            display() {return "Mine gold +" + format(layers.g.goldPerClick())},
            canClick() {return true},
            onClick() {player.points = player.points.add(layers.g.goldPerClick())}
        },
        buymaxminers: {
            display: "Buy Max Miners",
            canClick() {return player.points.gte(layers.g.buyables[11].cost(player.g.miners))},
            onClick() {
                let target = player.points.div(20).log(1.1).floor()
                player.points = player.points.sub(layers.g.buyables[11].cost(target))
                player.g.miners = target.add(1)
            }
        },
        unlock1: {
            display() {return "Get a young dragon<br>Cost: " + format(200) + " gold"},
            unlocked() {return player.unlocks <= 0},
            canClick() {return player.points.gte(200)},
            onClick() {
                player.points = player.points.sub(200)
                player.unlocks++
                player.d.stage = 0
                player.d.unlocked = true
            }
        }
    },
    tabFormat: [
        ["display-text", function () {return "You have " + format(player.points) + " gold (+" + format(getPointGen()) + "/s)"}],
        "blank",
        ["clickable", "minegold"],
        ["row", [["buyable", 11], ["clickable", "buymaxminers"]]],
        "blank",
        ["clickable", "unlock1"],
    ]
})

addLayer("d", {
    name: "dragon",
    symbol: "D",
    position: 1,
    row: 0,
    color: "#f43",
    tooltip: "Dragon",
    startData() {return {
        unlocked: false,
        stage: 0,
        fire: new Decimal(0)
    }},
    layerShown() {return player.unlocks >= 1},
    shouldNotify() {
        return (layers.d.clickables.unlock2.canClick() && layers.d.clickables.unlock2.unlocked())
    },
    getFireGain() {
        let gain = new Decimal(1)
        return gain
    },
    fireEffect() {
        return player.d.fire.div(10).add(1).log10().mul(2).add(1)
    },
    update(diff) {
        if (player.d.unlocked) player.d.fire = player.d.fire.add(layers.d.getFireGain().mul(diff))
    },
    clickables: {
        unlock2: {
            display() {return "Unlock fire upgrades<br>Cost: " + format(5000) + " gold"},
            unlocked() {return player.unlocks <= 1},
            canClick() {return player.points.gte(5000)},
            onClick() {
                player.points = player.points.sub(5000)
                player.unlocks++
                player.f.unlocked = true
            }
        }
    },
    tabFormat: [
        ["display-text", function() {
            let dragonName = "Young Dragon"
            if (player.d.stage == 0) dragonName = "Young Dragon"
            
            return "You have a <b>" + dragonName + "</b>"
        }],
        "blank",
        ["display-text", function() {
            if (player.d.stage === 0) {
                return `<img src="img/dragon1.png" style="width: 150px; height: 150px; margin-bottom: 10px;"><br>` +
                       `<i>"Your wild young dragon produces fire for you. It enjoys playing around on your gold stash."</i>`
            }
            return ""
        }],
        "blank",
        ["display-text", function() {
            return "Your fire is multiplying miner production by " + format(layers.d.fireEffect()) + "."
        }],
        "blank",
        ["clickable", "unlock2"]
    ]
})

addLayer("f", {
    name: "fire upgrades",
    symbol: "F",
    position: 2,
    row: 0,
    color: "#f80",
    tooltip: "Fire Upgrades",
    startData() { return {
        unlocked: false,
    }},
    layerShown() { return player.unlocks >= 2 },
    tabFormat: [
        ["display-text", function() {
            return "You have <span style='color: #f80; font-weight: bold;'>" + format(player.d.fire) + "</span> fire (+" + format(layers.d.getFireGain()) + "/s)";
        }],
    ]
});


addLayer("r", {
    name: "resources",
    symbol: "R",
    position: 0,
    tooltip: "Resources",
    row: "side",
    tabFormat: [
        ["display-text", function() {return format(player.points) + " gold"}],
        ["display-text", function() {return player.g.miners.gt(0) ? format(player.g.miners) + " miners" : ""}],
        ["display-text", function() {return player.unlocks >= 1 ? format(player.d.fire) + " fire" : ""}],
    ]
})
