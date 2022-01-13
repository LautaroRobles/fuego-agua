import Phaser from 'phaser'
import TestScene from "./scenes/TestScene";
import PreLoadScene from "./scenes/PreLoadScene";

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.WEBGL,
    width: 1024,
    height: 1024,
    backgroundColor: '#efefef',
    parent: containerId,
    physics: {
      default: 'matter',
      matter: {
        enableSleeping: false,
        gravity: {
          y: 2
        },
        debug: {
          showBody: false,
          showStaticBody: false
        }
      }
    },
    scene: [PreLoadScene, TestScene]
  })
}

export default launch
export { launch }
