class Stats {
    constructor(clientPositionUpdateFrequency) {
        this.NrOfClientsConnected = 0;
        this.ClientPositionUpdateFrequency = clientPositionUpdateFrequency;
    }

    update(nrOfClientsConnected) {
        this.NrOfClientsConnected = nrOfClientsConnected;
    }

    draw(context) {
        context.drawText("Nr of clients connected: " + this.NrOfClientsConnected, 10, 20);
        context.drawText("Client position update frequency: " + this.ClientPositionUpdateFrequency, 10, 35);
    }
}

