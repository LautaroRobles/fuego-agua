import Fluid from "./Fluid";

export default class Water extends Fluid {
    constructor(config) {
        super(config);
        this.created();
    }
    created() {
        this.fluidData = {
            k: 0.05,
            d: 0.15,
            s: 0.05,
            color: 0x4ED1FF,
            alpha: 0.5
        }
        super.created();
    }
}