class Form {
    constructor(){
        this.input = createInput("").attribute("placeholder", "Usuario")
        this.playbutton = createButton("jugar")
        this.titleimg = createImg("./assets/title.png", "titulo_del_juego")
        this.greeting = createElement("h2")
    }

    setElementsPosition(){
        this.input.position(width / 2 - 110, height / 2 - 80)
        this.playbutton.position(width / 2 - 45, height / 2 - 20)
        this.titleimg.position(120, 140)
        this.greeting.position(width / 2 - 300, height / 2 - 100)
    }
    setElementStyle(){
        this.input.class("nombre")
        this.playbutton.class("play")
        this.titleimg.class("gametitle")
        this.greeting.class("greeting")
    }

    hide(){
        this.greeting.hide();
        this.input.hide();
        this.playbutton.hide();
    }

    handlemousepressed(){
        this.playbutton.mousePressed(()=>{
            this.input.hide();
            this.playbutton.hide();
            var message = `Hola, ${this.input.value()}
            </br>Espera a que se una otro jugador...`;
            this.greeting.html(message);
            playerCount = Number(playerCount) || 0
            playerCount += 1;
            player.name = this.input.value();
            player.index = playerCount;
            player.addPlayer();
            player.updateCount(playerCount);
            player.getDistance();
            console.log(playerCount)
        })
    }

    display(){
        this.setElementsPosition();
        this.setElementStyle();
        this.handlemousepressed();
    }
}