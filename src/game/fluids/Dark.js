import Fluid from "./Fluid";

export default class Dark extends Fluid {
    constructor(config) {
        super(config);
        this.created();
    }
    created() {
        this.fluidData = {
            k: 0.4,
            d: 0.45,
            s: 0.3,
            color: 0x63dd17,
            alpha: 1
        }
        super.created();
    }
}