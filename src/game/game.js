import Phaser from 'phaser'
import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'
import TestScene from "./scenes/TestScene";
import PreLoadScene from "./scenes/PreLoadScene";

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    parent: containerId,
    physics: {
      default: 'matter',
      matter: {
        enableSleeping: false,
        gravity: {
          y: 1
        },
        debug: {
          showBody: true,
          showStaticBody: true
        }
      }
    },
    scene: [PreLoadScene, TestScene]
  })
}

export default launch
export { launch }
