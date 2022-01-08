import Fluid from "./Fluid";

export default class Water extends Fluid {
    constructor(scene) {
        super(scene);

        this.fluidData = {
            k: 0.1,
            d: 0.15,
            s: 0.1,
            color: 0x4ED1FF,
            alpha: 0.5
        }
    }
}