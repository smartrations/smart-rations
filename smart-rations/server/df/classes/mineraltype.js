module.exports = class MineralType {
    constructor(Name, Units, Fecal, Urine, Sweat, Misc, Maint, Fetal, Milk, Growth, Total, Supplied, Absorbable, Balance, RD, RDReq) {
        this.Name = Name;
        this.Units = Units;
        this.Fecal = Fecal;
        this.Urine = Urine;
        this.Sweat = Sweat;
        this.Misc = Misc;
        this.Maint = Maint;
        this.Fetal = Fetal;
        this.Milk = Milk;
        this.Growth = Growth;
        this.Total = Total;
        this.Supplied = Supplied;
        this.Absorbable = Absorbable;
        this.Balance = Balance;
        this.RD = RD;
        this.RDReq = RDReq;
    }
}
