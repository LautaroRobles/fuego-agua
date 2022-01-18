import Fluid from "./Fluid";

export default class Dark extends Fluid {
    constructor(config) {
        super(config);
        this.created();
    }
    created() {
        this.fluidData = {
            k: 0.05,
            d: 0.15,
            s: 0.5,
            color: 0x63dd17,
            alpha: 1
        }
        super.created();
    }
}