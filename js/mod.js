let modInfo = {
	name: "The DodecaDragons Tree",
	author: "nobody",
	pointsName: "gold",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.2",
	name: "Fire Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.3 (May 30, 2026)</h3><br>
		- Added fire upgrades (real).<br>
		- Dragon can now become an adult.<br><br>
	<h3>v0.0.2 (May 30, 2026)</h3><br>
		- Fire now multiplies miner production.<br>
		- Added fire upgrades (currently didn't exist).<br>
		- Fire production now disabled before Dragon unlock.<br>
		- Added notify for available upgrades.<br><br>
	<h3>v0.0.1 (May 29, 2026)</h3><br>
		- Created game.<br>
		- Added a dragon.<br>
		- Added fire (does nothing for now).`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.g.miners.gte(1)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = player.g.miners
	gain = gain.mul(layers.d.fireEffect())
	gain = gain.mul(layers.f.buyables[3].effect())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	unlocks: 0
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.d.stage >= 1
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return player.g.miners.gte(1)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = player.g.miners
	gain = gain.mul(layers.d.fireEffect())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	unlocks: 0
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.unlocks >= 2
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
