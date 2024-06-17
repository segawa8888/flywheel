class Controls{
  constructor(){
    this.init();
  }

  init(){
    artwork.on("SHOW_SKIP", () => {
      this.gui = new lil.GUI();
      this.gui.add(this, "DO_SKIP");

      artwork.once("HIDE_SKIP", () => {
        this.gui.destroy();
      });
    });

    artwork.on("ENABLE_SCROLL_KV", () => {
      this.gui = new lil.GUI();
      this.gui.add(this, "SPREAD_GLOBE");
    });
  }

  playOpening(){
    artwork.emit("PLAY_OPENING");
    this.gui.destroy();
  }

  DO_SKIP(){
    artwork.emit("DO_SKIP");
  }

  SPREAD_GLOBE(){
    artwork.emit("SPREAD_GLOBE");
    this.gui.destroy();
    this.gui = new lil.GUI();
    this.gui.add(this, "SHOW_GLOBE");
    this.gui.add(this, "DISAPPEAR");
  }

  SHOW_GLOBE(){
    artwork.emit("SHOW_GLOBE");
    this.gui.destroy();
    this.gui = new lil.GUI();
    this.gui.add(this, "SPREAD_GLOBE");
  }

  DISAPPEAR(){
    artwork.emit("DISAPPEAR");
    this.gui.destroy();
    this.gui = new lil.GUI();
    this.gui.add(this, "SPREAD_GLOBE")
    this.gui.add(this, "SHOW_GLOBE");
  }

  showSingleGlobe(){

  }
}