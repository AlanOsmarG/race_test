class Player {
    constructor(){
        this.name = null;
        this.positionx = 0;
        this.positiony = 0;
        this.index = null;
        this.rank = 0;
        this.score = 0;
        this.life = 185
    }

    getCount(){
        var player_count_ref = database.ref("playerCount")
        player_count_ref.on("value", data => {
            playerCount = data.val()
        })
    }

    updateCount(count){
        database.ref("/").update({
            playerCount: count
        })
    }

    addPlayer(){
        var playerIndex = "players/player" + this.index;
        if(this.index === 1){
            this.positionx = width / 2 - 100

        } else {
            this.positionx = width / 2 + 100
        }
        database.ref(playerIndex).set({
            name: this.name,
            positionx: this.positionx,
            positiony: this.positiony,
            rank: this.rank,
            score: this.score
        })
    }

    getDistance(){
        var playerdistanceref = database.ref("players/player" + this.index)
        playerdistanceref.on("value", data => {
            var data = data.val()
            this.positionx = data.positionx
            this.positiony = data.positiony
        })
    }

    update(){
        var playerIndex = "players/player" +this.index
        database.ref(playerIndex).update({
            positionx: this.positionx,
            positiony: this.positiony,
            name: this.name,
            rank: this.rank,
            score: this.score
        })

    }

    static getplayersinfo(){
        var playerinforef = database.ref("players")
        playerinforef.on("value", data => {
            allPlayers = data.val()
        })
    }

    getFinish(){
        database.ref("finish").on("value", (data) => {
            this.rank = data.val()
        })
    }

    static updateFinish(rank){
        database.ref("/").update({
            finish: rank
        })
    }
}