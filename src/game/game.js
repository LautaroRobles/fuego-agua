import Phaser from 'phaser'
import Preload from "./scenes/Preload";
import MainMenu from "./scenes/MainMenu";
import Test from "./scenes/Test";

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.WEBGL,
    width: 1200,
    height: 900,
    backgroundColor: '#000',
    parent: containerId,
    pixelArt: false,
    physics: {
      default: 'matter',
      matter: {
        enableSleeping: false,
        gravity: {
          y: 2
        },
        /*
        debug: {
          showBody: true,
          showStaticBody: true
        }
        */
      }
    },
    scene: [Preload, MainMenu, Test]
  })
}

export default launch
export { launch }
