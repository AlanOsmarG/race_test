class Game {
    constructor(){
        this.resetText = createElement("h2")
        this.resetButtom = createButton("")
        this.tableTitle = createElement("h2")
        this.ladder1 = createElement("h2")
        this.ladder2 = createElement("h2")
    }

    getState(){
        var game_state_ref = database.ref("gamestate");
        game_state_ref.on("value", function(data){
            gamestate = data.val()
        })
    }

    update(state){
        database.ref("/").update({
            gamestate : state
        })
    }

    start(){
        player = new Player();
        playerCount = player.getCount();
        form = new Form();
        form.display();
        car1 = createSprite(width / 2 - 50, height - 100)
        car1.addImage("car1", car1img)
        car1.scale = 0.07
        car2 = createSprite(width / 2 + 100, height - 100)
        car2.addImage("car2", car2img)
        car2.scale = 0.07
        cars = [car1, car2]
        fuels = new Group()
        coins = new Group()
        this.addSprites(fuels, 40, fuelimg, 0.02)
        this.addSprites(coins, 60, coinimg, 0.07)
    }

    addSprites(spriteGroup, spritesNum, spriteImg, scale){
        for(var i = 0; i < spritesNum; i++){
            var x 
            var y
            x = random(width / 2 +150, width / 2 - 150) 
            y = random(-height * 4.5, height - 400)
            var sprite = createSprite(x, y)
            sprite.addImage("sprite", spriteImg)
            sprite.scale = scale
            spriteGroup.add(sprite)
        }
    }

    handleElements(){
        form.hide()
        form.titleimg.position(40, 50)
        form.titleimg.class("titlegame")

        this.resetText.html("reiniciar")
        this.resetText.class("resetTitle")
        this.resetText.position(width / 2 + 200, 40)

        this.resetButtom.class("resetButtom")
        this.resetButtom.position(width / 2 + 230, 100)

        this.tableTitle.html("tabla de calificacion")
        this.tableTitle.class("tabletitle")
        this.tableTitle.position(width / 3 - 60, 40)

        this.ladder1.class("score")
        this.ladder1.position(width / 3 - 50, 80)

        this.ladder2.class("score")
        this.ladder2.position(width / 3 - 50, 120)

    }

    play(){
        const finishLine = height * 6 - 100
        this.handleElements()
        this.resetButton()
        
        Player.getplayersinfo()
        player.getFinish()
        if(allPlayers !== undefined){
            image(track, 0, -height * 5, width, height * 6)
            this.showLife()
            this.showBoard()
        var index = 0
        for(var plr in allPlayers){
            index = index + 1
            var x = allPlayers[plr].positionx
            var y = height - allPlayers[plr].positiony
            cars[index - 1].position.x = x
            cars[index - 1].position.y = y
            if(index === player.index){
                this.fuelTouch(index)
                this.coinTouch(index)
                camera.position.x = width / 2
                camera.position.y = cars[index-1].position.y
            }
        }

        if(keyIsDown(UP_ARROW)){

            player.positiony += 10
            player.update()

        }
        this.playersControls()
        if(player.positiony > finishLine){
            gamestate = 2
            player.rank = player.rank + 1
            Player.updateFinish(player.rank)
            player.update()
            this.showRank()
        }
        drawSprites()}
        
    }

    fuelTouch(index){
        cars[index-1].overlap(fuels, function(collector, collected){
            player.fuel = 180
            collected.remove()
        })
    }

    coinTouch(index){
        cars[index-1].overlap(coins, function(collector, collected){
            player.score  += 25
            collected.remove()
            player.update()
        })
    }

    resetButton(){
        this.resetButtom.mousePressed(()=>{
            database.ref("/").set({
                playerCount: 0,
                gamestate: 0,
                players: {}
            })
            window.location.reload()
        })
    }

    showBoard(){
        var ladder1, ladder2;
        var players = Object.values(allPlayers)
        if((players[0].rank === 0 && players[1].rank === 0) || (players[0].rank === 1)){
            ladder1 = 
            players[0].rank + 
            "&emsp;" + 
            players[0].name +
            "&emsp;" +
            players[0].score;

            ladder2 = 
            players[1].rank + 
            "&emsp;" + 
            players[1].name +
            "&emsp;" +
            players[1].score;
        }

        if(players[1].rank === 1 ){
            ladder1 = 
            players[1].rank + 
            "&emsp;" + 
            players[1].name +
            "&emsp;" +
            players[1].score;

            ladder2 = 
            players[0].rank + 
            "&emsp;" + 
            players[0].name +
            "&emsp;" +
            players[0].score;
        }

        this.ladder1.html(ladder1)
        this.ladder2.html(ladder2)
    }

    playersControls(){
        if(keyIsDown(UP_ARROW)){
            player.positiony = player.positiony + 10;
            player.update()
        }

        if(keyIsDown(LEFT_ARROW)){
            player.positionx = player.positionx - 7;
            player.update()
        }

        if(keyIsDown(RIGHT_ARROW)){
            player.positionx = player.positionx + 7;
            player.update()
        }
    }

    showRank(){
        swal({
           title: `¡Impresionante!${"\n"}Rank${"\n"}${player.rank}`,
            text: "cruzaste la linea de meta con exito!!",
            imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100 x 100",
            confirmButtonText: "cerrar"
        })
        
    }

    showLife(){
        push()
        image(lifeimg, width / 2 - 130, height - player.positiony - 550, 20, 20)
        fill("white")
        rect(width / 2 - 100, height - player.positiony - 550, 185, 20)
        fill("red")
        rect(width / 2 - 100, height - player.positiony - 550, 100, 20)
        noStroke()
        pop()
    }
}