import Phaser from 'phaser'
import TestScene from "./scenes/TestScene";
import PreLoadScene from "./scenes/PreLoadScene";

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 1280,
    backgroundColor: '#efefef',
    parent: containerId,
    physics: {
      default: 'matter',
      matter: {
        enableSleeping: false,
        gravity: {
          y: 1
        },
        /*
        debug: {
          showBody: true,
          showStaticBody: true
        }
         */
      }
    },
    scene: [PreLoadScene, TestScene]
  })
}

export default launch
export { launch }
