import Fluid from "./Fluid";

export default class Lava extends Fluid {
    constructor(scene) {
        super(scene);

        this.fluidData = {
            k: 0.01,
            d: 0.2,
            s: 0.05,
            color: 0xb8361c,
            alpha: 0.9
        }
    }
}