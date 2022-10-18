const MineralType = require('./classes/mineraltype')
const evalType = require('./classes/evaltype')
const FeedType = require('./classes/feedtype')
const pso = require('./classes/pso')

module.exports = class Calculate {

    constructor() {
        //Mineral Name Constants
        this.Minerals = {
            Ca: 0,
            P: 1,
            Mg: 2,
            Cl: 3,
            K: 4,
            Na: 5,
            Su: 6,
            Co: 7,
            Cu: 8,
            Io: 9,
            Fe: 10,
            Mn: 11,
            Se: 12,
            Zn: 13,
            Mo: 14,
            VitA: 15,
            VitD: 16,
            VitE: 17
        }

        //Output Variables

        //Pregnancy Requirements
        this.Km = 0
        this.MEPreg = 0
        this.NEPreg = 0
        this.MPPreg = 0
        this.CPPreg = 0
        this.CW = 0
        this.ADGPreg = 0

        //Lactation Requirements
        this.MilkEn = 0
        this.YEn = 0
        this.NELact = 0
        this.YProtn = 0
        this.YFatn = 0
        this.MPLact = 0
        this.FCM = 0

        //Target Weights and ADG for Breeding Females
        this.Age1st = 0
        this.Age2nd = 0
        this.Age3rd = 0
        this.Age1stBred = 0
        this.Wt1st = 0
        this.Wt2nd = 0
        this.Wt3rd = 0
        this.Wt1stBred = 0
        this.ADG1st = 0
        this.ADG2nd = 0
        this.ADG3rd = 0
        this.ADG1stBred = 0
        this.ADGNonBred = 0
        this.ADG = 0


        //Reserves Requirements
        this.CS_F = Array(9).fill(0)
        this.CS5EBW = 0
        this.EBW = Array(9).fill(0)
        this.AF = Array(9).fill(0)
        this.TF = Array(9).fill(0)
        this.AP = Array(9).fill(0)
        this.TP = Array(9).fill(0)
        this.ER = Array(9).fill(0)
        this.Lose1CS = 0
        this.Gain1CS = 0
        this.NElSub = 0
        this.NElReq = 0
        this.deltaER = 0
        this.DaysToChange = 0

        //Compute Energy Values
        this.DMI_to_DMIMaint = 0

        //Energy and Protein Supply
        this.DMI_Total = 0
        this.TDN_Total = 0
        this.TDN_Act_Total = 0
        this.Discount = 0
        this.UndiscDE_Total = 0
        this.DE_Total = 0
        this.Fat_Total = 0
        this.MEng_Total = 0
        this.NEm_Total = 0
        this.NEl_Total = 0
        this.NEg_Total = 0
        this.CP_Total = 0
        this.RUP_Total = 0
        this.TotalDigestedRUP = 0
        this.DietRUPDigest = 0
        this.RDP_Total = 0
        this.NDF_Total = 0
        this.ADF_Total = 0
        this.MCP_Total = 0
        this.DietTDN = 0
        this.NEgOverMEng = 0
        this.NElOverMEng = 0
        this.NEmOverMEng = 0
        this.DietaryNFC = 0
        this.EndCP = 0
        this.MPEndo = 0
        this.MPEndoReq = 0

        //Amino Acid Supply
        this.perEAA = 0
        this.TotalEAA = 0
        this.Arg_Flow = 0
        this.His_Flow = 0
        this.Ile_Flow = 0
        this.Leu_Flow = 0
        this.Lys_Flow = 0
        this.Met_Flow = 0
        this.Phe_Flow = 0
        this.Thr_Flow = 0
        this.Val_Flow = 0
        this.Dig_Arg_Flow = 0
        this.Dig_His_Flow = 0
        this.Dig_Ile_Flow = 0
        this.Dig_Leu_Flow = 0
        this.Dig_Lys_Flow = 0
        this.Dig_Met_Flow = 0
        this.Dig_Phe_Flow = 0
        this.Dig_Thr_Flow = 0
        this.Dig_Val_Flow = 0
        this.ArgPctMP = 0
        this.HisPctMP = 0
        this.IlePctMP = 0
        this.LeuPctMP = 0
        this.LysPctMP = 0
        this.MetPctMP = 0
        this.PhePctMP = 0
        this.ThrPctMP = 0
        this.ValPctMP = 0


        //Maintenance Requirements
        this.a1 = 0
        this.CS9 = 0
        this.COMP = 0
        this.a2 = 0
        this.Pasture = 0
        this.NEmact = 0
        this.NEMaintNS = 0
        this.NEDietConc = 0
        this.FeedMaint = 0
        this.NEGrowthDietNS = 0
        this.NEFP = 0
        this.MEI = 0
        this.SA = 0
        this.HP = 0
        this.T = 0
        this.Coat = 0
        this.TI = 0
        this.EI = 0
        this.INS = 0
        this.LCT = 0
        this.MEcs = 0
        this.ColdStr = 0
        this.HeatStr = 0
        this.NEMaint = 0
        this.DMIMaint = 0
        this.DMIPreg = 0
        this.NEGrowthDiet = 0
        this.MPMaint = 0
        this.MEMaint = 0
        this.ScurfMP = 0
        this.UrineMP = 0
        this.FecalMP = 0


        //Dry Matter Intake

        this.TempFact = 0
        this.CCFact = 0
        this.SubFact = 0
        this.DivFact = 0
        this.DMILact = 0
        this.DMIDry = 0
        this.DMI_RH = 0
        this.DryMatterIntake = 0

        //Growth Requirements
        this.SBW = 0
        this.SRW_to_MSBW = 0
        this.EQSBW = 0
        this.SWG = 0
        this.WG = 0
        this.DLWReq = 0
        this.EQEBW = 0
        this.EQEBG = 0
        this.RE = 0
        this.NEGrowth = 0
        this.NPg = 0
        this.EffMP_NPg = 0
        this.MPGrowth = 0
        this.NEReserves = 0
        this.DMIAvailGrowth = 0
        this.ADGwoPreg = 0
        this.ADGwPreg = 0
        this.MEGrowth = 0
        this.MEAllowGain = 0
        this.MEAllowGainPreg = 0

        //Mineral Requirements
        this.Mineral = []
        for (let i = 1; i <= 18; i++)
            this.Mineral[i] = new MineralType()

        //Diet Evaluation

        this.EvalFactor = []
        for (let i = 1; i <= 6; i++)
            this.EvalFactor[i] = new evalType()

        this.DMIPred = 0
        this.DMIActual = 0

        this.RDPReq = 0
        this.RDPSup = 0
        this.RDPBal = 0
        this.RUPReq = 0
        this.RUPSup = 0
        this.RUPBal = 0

        this.MPBalance = 0
        this.ProteinInGain = 0
        this.MPAllowGain = 0
        this.MPAllowGainPreg = 0

        this.CondMessage = 0

        this.MPBact = 0
        this.MPFeed = 0

        this.DietCP = 0
        this.CP_RDP = 0
        this.CP_RUP = 0

        this.DietNDF = 0
        this.DietADF = 0
        this.ForageNDF = 0
        this.DietME = 0
        this.DietNEl = 0
        this.DietNEg = 0

        this.EnergyAllowableMilk = 0
        this.ProteinAllowableMilk = 0
        this.DailyMilk = 0

        this.TargetADGwoPreg = 0
        this.TargetADGPreg = 0

        this.Reserves_WG = 0

        this.MPReqReserves = 0
        this.MPProvReserves = 0

        this.RUPReqReserves = 0
        this.RUPProvReserves = 0

        this.Energy_TargetDietConc = 0
        this.MP_TargetDietConc = 0
        this.Ca_TargetDietConc = 0
        this.P_TargetDietConc = 0
        this.DCAD = 0

        //Young Calf Computation Variables
        this.CalfKm = 0
        this.CalfKg = 0

        this.MilkDMI = 0
        this.StarterDMI = 0
        this.NEmCalf = 0
        this.TempFactor = 0

        this.CalfFat = 0
        this.DietFatCalf = 0
        this.DietNEmCalf = 0
        this.DietMECalf = 0
        this.DietNEgCalf = 0
        this.DietCPCalf = 0
        this.DietDCPCalf = 0
        this.DMIForNEmCalf = 0
        this.DMIForMECalf = 0
        this.DMIForGrowth = 0
        this.MEFGCalf = 0
        this.NEFGCalf = 0
        this.EnergyADGCalf = 0
        this.ProteinReqCalf = 0
        this.BV = 0
        this.EUN = 0
        this.MFN = 0
        this.ADPmaint = 0
        this.ADPgrowth = 0
        this.CPmCalf = 0
        this.CPgCalf = 0
        this.CalfADG = 0
        this.CalfADPBal = 0
        this.CalfCPBal = 0
        this.ADPAllowGain = 0


        // new
        this.TotalBal = 0
        this.FeedList = []

        // new 2
        this.DMI = [];

        this.TDN = [];
        this.TDN_Act = [];

        this.CP = [];
        this.RUP = [];
        this.RDP = [];
        this.NDF = [];
        this.ADF = [];
        this.PsgRate = [];
    }

    tableReturn() {
        return ({
            'Feeds': this.Feed.filter(a => a) ?? [],
            'Mineral': this.Mineral ?? 0,
            'DMIPred': this.DMIPred ?? 0,
            'DMIActual': this.DMIActual ?? 0,
            'NEMaint': this.NEMaint ?? 0,
            'NEPreg': this.NEPreg ?? 0,
            'NELact': this.NELact ?? 0,
            'NEl_Total': this.NEl_Total ?? 0,
            'NEGrowth': this.NEGrowth ?? 0,
            'DietNEl': this.DietNEl ?? 0,
            'NEBalance': this.NEBalance ?? 0,
            'DietME': this.DietME ?? 0,
            'RDPReq': this.RDPReq ?? 0,
            'RDPSup': this.RDPSup ?? 0,
            'RDPBal': this.RDPBal ?? 0,
            'RUPReq': this.RUPReq ?? 0,
            'RUPSup': this.RUPSup ?? 0,
            'RUPBal': this.RUPBal ?? 0,
            'TotalDMFed': this.TotalDMFed ?? 0,
            'EvalFactor': this.EvalFactor ?? 0,
            'MPBact': this.MPBact ?? 0,
            'MPEndo': this.MPEndo ?? 0,
            'MPFeed': this.MPFeed ?? 0,
            'MPBalance': this.MPBalance ?? 0,
            'DietNDF': this.DietNDF ?? 0,
            'DietADF': this.DietADF ?? 0,
            'EnergyAllowableMilk': this.EnergyAllowableMilk ?? 0,
            'ProteinAllowableMilk': this.ProteinAllowableMilk ?? 0,
            'ForageNDF': this.ForageNDF ?? 0,
            'DietaryNFC': this.DietaryNFC ?? 0,
            'DCAD': this.DCAD ?? 0
        })
    }

    // REQUIRED

    setAnimal(animal) {
        this.AnimalType = animal.Type    // Hayvan turu (Animal Type)
        //Options : "Lactating Cow", "Dry Cow","Replacement Heifer", "Young Calf"
        this.Age = animal.Age ?? 0          // Hayvan yaşi (Age)
        this.BW = animal.BodyWeight ?? 0             // Hayvan Agirligi (Body Weigth)
        this.DaysPreg = animal.DaysPregnant ?? 0       // Hamile Günleri (Days Pregnant)
        this.CS = animal.ConditionScore ?? 0            // Durum Puanı (condition score (1 - 5))
        this.DaysInMilk = animal.DaysInMilk ?? 0     // Sütlü Günler (Days in Milk)
        this.LactNum = animal.LactationNumber ?? 0        // Emzirme Sayısı (Lactation Number)
        this.FirstCalf = animal.AgeAtFirstCalving ?? 0      // İlk Buzağılama Yaşı (Age At First Calving)
        this.CalfInt = animal.CalvingInterval ?? 0        // buzağılama aralığı (Calving Interval)
        this.DesiredADG = animal.DesiredADG ?? 0     // desired ADG (g/day)
        this.UseTargetADG = animal.DesiredADG ? true : false     // if True, indicates that program should use Target ADG, instead of Desired ADG to determine growth requirements

        this.CalfBW = animal.BodyWeight ?? 0         // Calf Body Weight (kg)
        this.CalfTemp = animal.CalfTemp ?? 0       // Calf Temperature (deg C)
        this.MW = animal.MatureWeight ?? 0                   // mature weight
        this.MWFromBreed = false   // indicates if the animal's MW should be set as a function of the breed
        this.Breed = animal.Breed ?? 0                    // Choices :  "Ayrshire", "Brown Swiss", "Guernsey", "Holstein", "Jersey"
        this.CBW = animal.CalfBirthW ?? 0                       // calf birth weight
        this.CBWFromMW = false     // to compute CBW from MW
        this.MilkProd = animal.MilkProduction ?? 0                  // milk production
        this.MilkFat = animal.MilkFat ?? 0                   // milk fat  (%)
        this.ShowMilkTrue = true  // indicates if milk protein should be shown on a true or crude basis

        this.MilkTrueProtein = animal.MilkProtein ?? 0          // milk true protein (%)
        this.Lactose = animal.Lactose ?? 0                   // milk lactose (%)
    }

    setEnvironment(ranch) {
        this.Temp = ranch.Temperature ?? 0                     // current temperature
        this.PrevTemp = ranch.PrevTemperature ?? 0                  // previous temperature
        this.WindSpeed = ranch.WindSpeed ?? 0                 // Ruzgar Hizi
        this.Grazing = ranch.Grazing       // 
        this.Distance = ranch.Distance                 // Distance between Pasture and Milking Center
        this.Topography = ranch.Topography               // "Flat", "Hilly"
        this.Trips = ranch.Trips                     // Number of one-way trips
        this.CoatCond = ranch.CoatCondition                 // Choices :  "Clean/Dry", "Some Mud", "Wet/Matted", "Covered with Snow/Mud"
        this.HeatStress = ranch.HeatStress              // "None", "Rapid/Shallow", "Open Mouth"
        this.HairDepth = ranch.HairDepth                 // depth of hair on coat
        this.NightCooling = ranch.NightCooling  // True = Night Cooling, False = None
    }

    setFeeds(feeds) {
        //this.Feed = feeds.map(feed => new FeedType({ ...feed._doc, data: feed.data.reduce((result, current) => Object.assign(result, { [current.name]: current.value }), {}) }))
        feeds.forEach(a => a.DMFed <= 0 && (a.DMFed = 5))
        this.Feed = [null, ...feeds.map(feed => new FeedType({ ...feed._doc, data: feed.data.reduce((result, current) => Object.assign(result, { [current.name]: current.value }), {}) }))]
        this.TotalDMFed = this.Feed?.filter(a => a != null).reduce((a, b) => a + parseFloat(b?.DMFed), 0)
        this.TotalRegDMFed = this.Feed?.filter(a => a != null).reduce((a, b) => a + b?.DMFed, 0)
        this.NumFeeds = this.Feed.length - 1

        if (this.TotalDMFed <= 0) throw 'Eklediğiniz yemler geçerli DMFed değerine sahip değil'
        if (this.Feed.length == 0) throw 'Yeterli yem eklememişsiniz'

        for (let i = 1; i <= this.NumFeeds; i++) {
            this.FeedList[i] = this.Feed[i].DMFed;
        }
    }

    calculateTable() {
        if (this.AnimalType == "Young Calf") {
            if (this.TotalDMFed == 0) {
                return;
            }
            this.CalfComputation();
            this.MineralComputation();

        }
        else {
            this.PregnancyComputations();
            this.LactationComputations();
            this.TargetWeightsComputations();

            if (this.NumFeeds == 0 && this.TotalDMFed == 0) {
                return;
            }
            else {
                this.EnergyAndProteinSupplyComputations();
                this.AminoAcidComputations();
                this.DryMatterIntakeComputations();
                this.MaintenanceComputations();
                this.GrowthComputations();
                this.MineralComputations();
                this.DietEvalOneComputations();
                this.ReservesComputations();
                this.DietEvalTwoComputations();
            }
        }

        // NOK
        /* 
        for (let i = 1; i <= this.NumFeeds; i++) {
            this.FeedList[i] = this.Feed[i].DMFed;
        } */
        //this.FeedBalance(this.FeedList)
        //console.log(this)
        return this.tableReturn()
        //return this
    }

    // FUNCTIONS
    ModelComputation() { // OK - NOK
        if (this.AnimalType == "Young Calf") {
            if (this.TotalDMFed == 0) {
                return;
            }
            CalfComputation();
            MineralComputation();

        }
        else {
            PregnancyComputations();
            LactationComputations();
            TargetWeightsComputations();

            if (this.NumFeeds == 0 && this.TotalDMFed == 0) {
                return;
            }
            else {
                EnergyAndProteinSupplyComputations();
                AminoAcidComputations();
                DryMatterIntakeComputations();
                MaintenanceComputations();
                GrowthComputations();
                MineralComputations();
                DietEvalOneComputations();
                ReservesComputations();
                DietEvalTwoComputations();
            }
        }

        // NOK
        for (let i = 1; i <= NumFeeds; i++) {
            FeedList[i] = this.Feed[i].DMFed;
        }
        FeedBalance(FeedList);
    }

    PregnancyComputations() { //OK
        const Km = 0.64;
        const EffMEPreg = 0.14;
        const EffMPPreg = 0.33;
        if (this.DaysPreg < 190) {
            this.CW = 0
            this.ADGPreg = 0
            this.MEPreg = 0
            this.MPPreg = 0
        }
        else {
            if (this.DaysPreg > 279) {
                this.DaysPreg = 279;
            }
            this.CW = (18 + ((this.DaysPreg - 190) * 0.665)) * (this.CBW / 45);
            this.ADGPreg = 665 * (this.CBW / 45);
            this.MEPreg = (((2 * 0.00159 * this.DaysPreg) - 0.0352) * (this.CBW / 45)) / EffMEPreg;
            this.MPPreg = (((0.69 * this.DaysPreg) - 69.2) * (this.CBW / 45)) / EffMPPreg;
        }
        this.NEPreg = this.MEPreg * Km;
        if (this.DaysPreg == 0) {
            this.MEPreg = 0;
            this.MPPreg = 0;
            this.ADGPreg = 0;
            this.CW = 0;
        }
    }

    LactationComputations() { // OK
        if (this.MilkProd == 0) {
            this.MilkEn = 0;
            this.NELact = 0;
            this.YProtn = 0;
            this.YFatn = 0;
            this.MPLact = 0;
            this.FCM = 0;

            return;
        }

        if (this.Lactose == 0) {
            this.MilkEn = (0.0929 * this.MilkFat) + (0.0547 * (this.MilkTrueProtein / 0.93)) + 0.192;
        }

        else {
            this.MilkEn = (0.0929 * this.MilkFat) + (0.0547 * (this.MilkTrueProtein / 0.93)) + (0.0395 * this.Lactose);
        }

        this.YEn = this.MilkEn * this.MilkProd;

        this.NELact = this.YEn;

        this.YProtn = this.MilkProd * (this.MilkTrueProtein / 100);

        this.YFatn = this.MilkProd * (this.MilkFat / 100);

        this.MPLact = (this.YProtn / 0.67) * 1000;

        this.FCM = (0.4 * this.MilkProd) + (15 * (this.MilkFat / 100) * this.MilkProd);
    }

    TargetWeightsComputations() { // OK
        this.SBW = 0.96 * this.BW;

        this.Age1st = this.FirstCalf;
        this.Age2nd = this.Age1st + this.CalfInt;
        this.Age3rd = this.Age2nd + this.CalfInt;
        this.Age1stBred = this.Age1st - (280 / 30.4);

        this.Wt1stBred = this.MW * 0.55;
        this.Wt1st = this.MW * 0.82;
        this.Wt2nd = this.MW * 0.92;
        this.Wt3rd = this.MW;

        if ((this.Age1stBred - this.Age) > 0) {
            this.ADG1stBred = (this.Wt1stBred - this.BW) / ((this.Age1stBred - this.Age) * 30.4);
        }

        if ((this.Age1st - this.Age) > 0) {
            this.ADG1st = (this.Wt1st - (this.BW - this.CW)) / ((this.Age1st - this.Age) * 30.4);
        }
        if (this.CalfInt > 0) {
            this.ADG2nd = (this.Wt2nd - this.Wt1st) / (this.CalfInt * 30.4);
            this.ADG3rd = (this.Wt3rd - this.Wt2nd) / (this.CalfInt * 30.4);
        }

        if (this.AnimalType == "Replacement Heifer") {
            if (this.Age < this.Age1stBred) {
                this.ADGNonBred = (this.Wt1stBred - this.BW) / ((this.Age1stBred - this.Age) * 30.4);
            }
            else {
                this.ADGNonBred = 0;
            }
        }
        else {
            this.ADGNonBred = 0;
        }

        if (this.AnimalType == "Replacement Heifer") {
            if (this.DaysPreg > 0) {
                this.ADG = this.ADG1st;
            }
            else {
                this.ADG = this.ADG1stBred;
            }
        }
        else {
            if (this.Age >= this.Age3rd) {
                this.ADG = 0;
            }
            else if ((this.Age2nd <= this.Age) && (this.Age < this.Age3rd)) {
                this.ADG = this.ADG3rd;
            }
            else if ((this.Age1st <= this.Age) && (this.Age < this.Age2nd)) {
                this.ADG = this.ADG2nd;
            }
            else if ((this.Age1stBred <= this.Age) && (this.Age < this.Age1st)) {
                this.ADG = this.ADG1st;
            }
        }

        if (this.ADG < 0) {
            this.ADG = 0
        }

    }

    //ok
    EnergyAndProteinSupplyComputations() {
        var DMFed = 0;
        var NF = 0;
        var X = 0;

        var Kp = 0;
        var BW_DMI = 0;
        var ConcSum = 0;
        var PercentConc = 0;


        if (this.NumFeeds > 0) {
            NF = this.NumFeeds;
        }
        else {
            return;
        }
        this.ComputeEnergyValues();

        if (this.BW > 0) {
            BW_DMI = (this.TotalDMFed / this.BW) * 100;
        }
        else {
            BW_DMI = 0;
        }

        ConcSum = 0;

        for (X = 1; X <= this.NumFeeds; X++) {
            if (this.Feed[X].ForageDescrp == "Concentrate") {
                ConcSum = ConcSum + this.Feed[X].DMFed;
            }
        }
        if (this.TotalDMFed > 0) {
            PercentConc = (ConcSum / this.TotalDMFed) * 100;
        }
        else {
            PercentConc = 0;
        }


        for (X = 1; X <= this.NumFeeds; X++) {
            DMFed = this.Feed[X].DMFed;
            this.DMI[X] = DMFed;
            if (this.Feed[X].Category != "Vitamin/Mineral") {
                this.TDN[X] = (this.Feed[X].TDN / 100) * (DMFed * 1000);
                this.TDN_Act[X] = (this.Feed[X].TDN_ActX / 100) * (DMFed * 1000);
            }

            else {
                this.TDN[X] = 0;
                this.TDN_Act[X] = 0;
            }


            this.CP[X] = (this.Feed[X].CP / 100) * (DMFed * 1000);

            //Passage rate equations
            if (this.Feed[X].ForageDescrp == "Concentrate") {
                Kp = 2.904 + (1.375 * BW_DMI) - (0.02 * PercentConc);
            }
            else if (this.Feed[X].ForageDescrp == "Dry") {
                Kp = 3.362 + (0.479 * BW_DMI) - (0.017 * this.Feed[X].NDF) - (0.007 * PercentConc);
            }
            else if (this.Feed[X].ForageDescrp == "Wet") {
                Kp = 3.054 + (0.614 * BW_DMI);
            }
            else {
                Kp = 0;
            }

            //Passage rate cannot be negative
            if (Kp < 0) { Kp = 0; }

            this.PsgRate[X] = Kp;
            if ((this.Feed[X].Kd + Kp) > 0) {
                this.RDP[X] = ((this.Feed[X].Kd / (this.Feed[X].Kd + Kp)) *
                    ((((this.Feed[X].PrtB / 100) * (this.Feed[X].CP / 100)) * this.Feed[X].DMFed)))
                    + (((this.Feed[X].PrtA / 100) * (this.Feed[X].CP / 100)) * this.Feed[X].DMFed)
            }
            else {
                this.RDP[X] = 0;
            }

            if ((this.RDP[X] * 1000) > this.CP[X]) {
                this.RDP[X] = this.CP[X] / 1000;
            }

            this.RUP[X] = (this.CP[X] - (this.RDP[X] * 1000)) / 1000;
            this.NDF[X] = (this.Feed[X].NDF / 100) * DMFed;
            this.ADF[X] = (this.Feed[X].ADF / 100) * DMFed;
        }

        this.DMI_Total = 0;
        this.TDN_Total = 0;
        this.TDN_Act_Total = 0;
        this.CP_Total = 0;
        this.RUP_Total = 0;
        this.TotalDigestedRUP = 0;
        this.RDP_Total = 0;
        this.NDF_Total = 0;
        this.ADF_Total = 0;

        for (X = 1; X <= this.NumFeeds; X++) {
            this.DMI_Total = this.DMI_Total + this.DMI[X];
            this.TDN_Total = this.TDN_Total + this.TDN[X];
            this.TDN_Act_Total = this.TDN_Act_Total + this.TDN_Act[X],
                this.CP_Total = this.CP_Total + this.CP[X],
                this.RUP_Total = this.RUP_Total + this.RUP[X];
            this.TotalDigestedRUP = this.TotalDigestedRUP + (this.RUP[X] * (this.Feed[X].RUPDigest / 100));
            this.RDP_Total = this.RDP_Total + this.RDP[X];
            this.NDF_Total = this.NDF_Total + this.NDF[X];
            this.ADF_Total = this.ADF_Total + this.ADF[X];
        }

        if (this.RUP_Total > 0) {
            this.DietRUPDigest = this.TotalDigestedRUP / this.RUP_Total;
        }
        else {
            this.DietRUPDigest = 0;
        }


        this.MCP_Total = 0.13 * this.TDN_Act_Total;

        if (this.MCP_Total > (0.85 * (this.RDP_Total * 1000))) {
            this.MCP_Total = (0.85 * (this.RDP_Total * 1000));
        }

        if (this.MCP_Total < 0) {
            this.MCP_Total = 0;
        }

        this.DietTDN = (this.TDN_Total / 1000) / this.TotalDMFed;

        if (this.MEng_Total > 0) {
            this.NEgOverMEng = this.NEg_Total / this.MEng_Total;
            this.NElOverMEng = this.NEl_Total / this.MEng_Total;
            this.NEmOverMEng = this.NEm_Total / this.MEng_Total;
        }
        else {
            this.NEgOverMEng = 0;
            this.NElOverMEng = 0;
            this.NEmOverMEng = 0;
        }
        this.EndCP = 11.8 * this.TotalDMFed;
        this.MPEndo = 0.4 * this.EndCP;
        this.MPEndoReq = this.MPEndo / 0.67;

    }

    //OK
    ComputeEnergyValues() {
        var tdNFC;
        var tdCP;
        var tdFat;
        var dNDF;
        var DiscountVariable;

        var C;
        var DMFed;
        var NF;
        var X;
        var SBW;

        this.MEng_Total = 0;
        this.NEl_Total = 0;
        this.NEg_Total = 0;
        this.NEm_Total = 0;

        if (this.NumFeeds > 0) {
            NF = this.NumFeeds;
        }
        else {
            return;
        }
        this.TotalRegDMFed = 0;

        for (X = 1; X <= this.NumFeeds; X++) {
            if (this.Feed[X].Category.includes("Calf Feed") == 0) {
                this.TotalRegDMFed = this.TotalRegDMFed + this.Feed[X].DMFed;
            }
        }

        if ((this.TotalRegDMFed == 0) && (this.AnimalType == "Young Calf")) return;

        SBW = 0.96 * this.BW;


        this.DietaryNFC = 0;
        if (this.NumFeeds == 0) return;

        for (let C = 1; C <= this.NumFeeds; C++) {
            if (this.Feed[C].Category.includes("Calf Feed") == 0) {
                this.Feed[C].NFCDigest = 0.98;
                tdNFC = this.Feed[C].NFCDigest * (100 - this.Feed[C].NDF - this.Feed[C].CP - this.Feed[C].Fat - this.Feed[C].Ash + this.Feed[C].NDFIP) * this.Feed[C].PAF;
                this.DietaryNFC = this.DietaryNFC + (((100 - this.Feed[C].NDF - this.Feed[C].CP - this.Feed[C].Fat - this.Feed[C].Ash + this.Feed[C].NDFIP) / 100) * this.Feed[C].DMFed);

                if (this.Feed[C].CP > 0) {
                    if (this.Feed[C].EnergyEqClass == "Forage") tdCP = Math.exp((-1.2 * (this.Feed[C].ADFIP / this.Feed[C].CP))) * this.Feed[C].CP;
                    else {
                        if (this.Feed[C].Category == "Animal Protein") tdCP = (this.Feed[C].CPDigest * this.Feed[C].CP);
                        else tdCP = (1 - (0.4 * (this.Feed[C].ADFIP / this.Feed[C].CP))) * this.Feed[C].CP;
                    }
                }
                else tdCP = 0;

                if (this.Feed[C].Fat < 1) tdFat = 0;
                else tdFat = (this.Feed[C].Fat - 1) * 2.25;

                if (this.Feed[C].NDF > this.Feed[C].NDFIP) dNDF = this.Feed[C].NDFDigest * this.Feed[C].NDF;
                else dNDF = 0;

                if (this.Feed[C].Category == "Fat") {
                    if (this.Feed[C].EnergyEqClass == "Fatty Acid") {
                        this.Feed[C].TDN = (this.Feed[C].Fat * this.Feed[C].FatDigest * 2.25);
                        this.Feed[C].DE = 0.094 * this.Feed[C].FatDigest * this.Feed[C].Fat;
                    }
                    else {
                        this.Feed[C].TDN = 10 + ((this.Feed[C].Fat - 10) * this.Feed[C].FatDigest * 2.25);
                        this.Feed[C].DE = (this.Feed[C].FatDigest * (this.Feed[C].Fat - 10) * 0.094) + 0.43;
                    }

                }
                else {
                    if (this.Feed[C].Category == "Animal Protein") {
                        this.Feed[C].TDN = (this.Feed[C].CPDigest * this.Feed[C].CP) + ((this.Feed[C].Fat - 1) * 2.25) + ((this.Feed[C].NFCDigest * (100 - this.Feed[C].CP - this.Feed[C].Ash - this.Feed[C].Fat)) - 7);
                        this.Feed[C].DE = (tdNFC * 0.042) + (tdCP * 0.056) + (0.094 * (tdFat / 2.25)) - 0.3;
                    }
                    else {

                        if (dNDF > 0) {
                            this.Feed[C].TDN = tdNFC + tdCP + tdFat + dNDF - 7;
                            this.Feed[C].DE = (tdNFC * 0.042) + (dNDF * 0.042) + (tdCP * 0.056) + (0.094 * (tdFat / 2.25)) - 0.3;
                        }
                        else {
                            if (this.Feed[C].CP > 0) {
                                this.Feed[C].TDN = ((0.98 * this.Feed[C].PAF) * (100 - this.Feed[C].CP - this.Feed[C].Fat - this.Feed[C].Ash)) + (this.Feed[C].CP * (1 - (0.4 * (this.Feed[C].ADFIP / this.Feed[C].CP)))) + ((2.25 * (this.Feed[C].Fat - 1) - 7));
                                this.Feed[C].DE = (0.98 * this.Feed[C].PAF) * (0.042 * (100 - this.Feed[C].CP - this.Feed[C].Fat - this.Feed[C].Ash)) + (this.Feed[C].CP * (0.056 * (1 - (0.4 * (this.Feed[C].ADFIP / this.Feed[C].CP))))) + (0.094 * (this.Feed[C].Fat - 1)) - 0.3;
                            }
                            else {
                                this.Feed[C].TDN = ((0.98 * this.Feed[C].PAF) * (100 - this.Feed[C].Fat - this.Feed[C].Ash)) + ((2.25 * (this.Feed[C].Fat - 1) - 7));
                                this.Feed[C].DE = (0.98 * this.Feed[C].PAF) * (0.042 * (100 - this.Feed[C].Fat - this.Feed[C].Ash)) + (0.094 * (this.Feed[C].Fat - 1)) - 0.3;
                            }
                        }
                    }

                }

                if (this.Feed[C].Category == "Vitamin/Mineral") {
                    this.Feed[C].TDN = 0;
                    this.Feed[C].DE = 0;
                }

            }
        }

        var UndiscountedME;
        var TotalTDN = 0;
        var TDNConc;

        for (X = 1; X <= this.NumFeeds; X++) {
            if (this.Feed[X].Category.includes("Calf Feed") == 0) {
                TotalTDN = TotalTDN + ((this.Feed[X].TDN / 100) * this.Feed[X].DMFed);
            }
        }
        if (this.AnimalType != "Young Calf") {
            if (this.AnimalType == "Replacement Heifer") {
                this.DMI_to_DMIMaint = TotalTDN / (0.035 * (SBW ** 0.75));

            }
            else this.DMI_to_DMIMaint = TotalTDN / (0.035 * (this.BW ** 0.75));

        }
        else this.DMI_to_DMIMaint = TotalTDN / (0.035 * (this.CalfBW ** 0.75));
        if (this.TotalRegDMFed > 0) TDNConc = (TotalTDN / this.TotalRegDMFed) * 100;
        else TDNConc = 0;

        //Compute total fat in diet
        this.Fat_Total = 0;

        for (C = 1; C <= this.NumFeeds; C++) {
            if (this.Feed[C].Category.includes("Calf Feed") == 0) {

                this.Fat_Total = this.Fat_Total + ((this.Feed[C].Fat / 100) * this.Feed[C].DMFed);
            }
        }

        var TotalFat;
        if (this.TotalRegDMFed > 0) TotalFat = (this.Fat_Total / this.TotalRegDMFed) * 100;
        else TotalFat = 0;


        var TotalDigestibleFat = 0;
        var DigestibleFat;

        for (C = 1; C <= this.NumFeeds; C++) {
            if (this.Feed[C].Category == "Fat") {
                if (this.Feed[C].EnergyEqClass == "Fat") DigestibleFat = 10 + ((this.Feed[C].Fat - 10) * this.Feed[C].FatDigest);
                else DigestibleFat = this.Feed[C].Fat * this.Feed[C].FatDigest;
            }
            else DigestibleFat = this.Feed[C].Fat - 1;

            DigestibleFat = DigestibleFat * this.Feed[C].DMFed;

            TotalDigestibleFat = TotalDigestibleFat + DigestibleFat;
        }

        if (this.TotalDMFed > 0) TotalDigestibleFat = TotalDigestibleFat / this.TotalDMFed;
        else TotalDigestibleFat = 0;

        var Adj_TDN;
        if (this.TotalRegDMFed > 0) {
            if ((this.Fat_Total / this.TotalRegDMFed) > 0.03) {
                if (TotalFat > 0) Adj_TDN = TDNConc - (((TotalFat) - 3) * (TotalDigestibleFat / TotalFat) * 2.25);
                else Adj_TDN = 0;

                TDNConc = Adj_TDN / ((100 - (TotalFat - 3)) / 100);
            }
        }


        DiscountVariable = ((0.18 * TDNConc) - 10.3) * (this.DMI_to_DMIMaint - 1);
        if (DiscountVariable < 0) DiscountVariable = 0;

        if (TDNConc < 60) this.Discount = 1;
        else if (((TDNConc > 60) && ((TDNConc - DiscountVariable) < 60))) this.Discount = 60 / TDNConc;
        else if (TDNConc > 0) this.Discount = (TDNConc - DiscountVariable) / TDNConc;
        else this.Discount = 1;


        if (this.Discount < 0) this.Discount = 1;


        for (C = 1; C <= this.NumFeeds; C++) {
            if (this.Feed[C].Category.includes("Calf Feed") == 0) this.Feed[C].TDN_ActX = this.Feed[C].TDN * this.Discount;
        }

        if (this.TotalRegDMFed > 0) this.Fat_Total = (this.Fat_Total / this.TotalRegDMFed) * 100;
        else this.Fat_Total = 0;

        for (C = 1; C <= this.NumFeeds; C++) {
            this.Feed[C].DiscDE = this.Discount * this.Feed[C].DE;
            if (this.Feed[C].Fat >= 3) {
                if (this.AnimalType != "Replacement Heifer") this.Feed[C].MEng = (1.01 * this.Feed[C].DiscDE) - 0.45 + (0.0046 * (this.Feed[C].Fat - 3));
                else this.Feed[C].MEng = 0.82 * this.Feed[C].DE;

                this.Feed[C].NEl = (0.703 * this.Feed[C].MEng) - 0.19 + ((((0.097 * this.Feed[C].MEng) + 0.19) / 97) * (this.Feed[C].Fat - 3));

            }
            else {
                if (((this.AnimalType != "Young Calf") && (this.AnimalType != "Replacement Heifer"))) this.Feed[C].MEng = (1.01 * this.Feed[C].DiscDE) - 0.45;
                else this.Feed[C].MEng = 0.82 * this.Feed[C].DE;

                this.Feed[C].NEl = (0.703 * this.Feed[C].MEng) - 0.19;

            }

            if (this.Feed[C].Category != "Fat") {
                this.Feed[C].MEforNEg = 0.82 * this.Feed[C].DE;

                this.Feed[C].NEg = ((1.42 * this.Feed[C].MEforNEg) - (0.174 * (this.Feed[C].MEforNEg ** 2)) + (0.0122 * (this.Feed[C].MEforNEg ** 3)) - 1.65);
                if (this.Feed[C].NEg < 0) this.Feed[C].NEg = 0;

                this.Feed[C].NEm = ((1.37 * this.Feed[C].MEforNEg) - (0.138 * (this.Feed[C].MEforNEg ** 2)) + (0.0105 * (this.Feed[C].MEforNEg ** 3)) - 1.12);

            }
            else {
                this.Feed[C].MEng = this.Feed[C].DiscDE;
                this.Feed[C].NEl = 0.8 * this.Feed[C].DiscDE;
                this.Feed[C].NEm = 0.8 * this.Feed[C].MEng;
                this.Feed[C].NEg = 0.55 * this.Feed[C].MEng;
            }
            if (this.Feed[C].MEng < 0) this.Feed[C].MEng = 0;
            if (this.Feed[C].NEl < 0) this.Feed[C].NEl = 0;
            if (this.Feed[C].NEm < 0) this.Feed[C].NEm = 0;
            if (this.Feed[C].NEg < 0) this.Feed[C].NEg = 0;

            this.MEng_Total = this.MEng_Total + (this.Feed[C].MEng * this.Feed[C].DMFed);
            this.NEl_Total = this.NEl_Total + (this.Feed[C].NEl * this.Feed[C].DMFed);
            this.NEg_Total = this.NEg_Total + (this.Feed[C].NEg * this.Feed[C].DMFed);
            this.NEm_Total = this.NEm_Total + (this.Feed[C].NEm * this.Feed[C].DMFed);
        }

        var TotalDEConc;
        var TotalMEConc;
        var TotalNEmConc;
        var TotalNElConc;
        var TotalNEgConc;

        if (this.TotalRegDMFed > 0) {
            TotalMEConc = this.MEng_Total / this.TotalRegDMFed;
            TotalNElConc = this.NEl_Total / this.TotalRegDMFed;
            TotalNEgConc = this.NEg_Total / this.TotalRegDMFed;
            TotalNEmConc = this.NEm_Total / this.TotalRegDMFed;
        }
        else {
            TotalMEConc = 0;
            TotalNElConc = 0;
            TotalNEgConc = 0;
            TotalNEmConc = 0;
        }

        if (this.AnimalType != "Replacement Heifer") {
            if (this.TotalRegDMFed > 0) this.NEDietConc = this.NEl_Total / this.TotalRegDMFed;
            else this.NEDietConc = 0;
        }
        else {
            if (this.TotalRegDMFed > 0) this.NEDietConc = this.NEm_Total / this.TotalRegDMFed;
            else this.NEDietConc = 0;
        }
    }

    MineralComputations() {
        let C = 0
        let d = 0

        let X = 0
        let CalfStarter = 0
        let RegFeeds = 0
        let m = 0
        let n = 0
        let o = 0

        // Calcium

        this.Mineral[1].Name = "Ca";
        this.Mineral[1].Units = "(g/d)"

        if (this.DaysInMilk > 0)
            this.Mineral[1].Fecal = 3.1 * (this.BW / 100);
        else
            this.Mineral[1].Fecal = 1.54 * (this.BW / 100);


        this.Mineral[1].Urine = 0.08 * (this.BW / 100);
        this.Mineral[1].Misc = 0;
        this.Mineral[1].Sweat = 0;

        if (this.DaysPreg > 190)
            this.Mineral[1].Fetal = 0.02456 * Math.exp((0.05581 - (0.00007 * this.DaysPreg)) * this.DaysPreg) - 0.02456 * Math.exp((0.05581 - (0.00007 * (this.DaysPreg - 1))) * (this.DaysPreg - 1))
        else
            this.Mineral[1].Fetal = 0;

        switch (this.DaysInMilk) {
            case 0:
                this.Mineral[1].Milk = 0;
                break;
            default:
                switch (this.Breed) {
                    case "Holstein":
                    case "Milking Shorthorn":
                        this.Mineral[1].Milk = 1.22 * this.MilkProd;
                        break;
                    case "Jersey":
                        this.Mineral[1].Milk = 1.45 * this.MilkProd;
                        break;
                    default:
                        this.Mineral[1].Milk = 1.37 * this.MilkProd;
                }
        }

        if ((this.BW > 0) && (this.WG > 0))
            this.Mineral[1].Growth = (9.83 * (this.MW ** 0.22) * (this.BW ** -0.22)) * (this.WG / 0.96);
        else
            this.Mineral[1].Growth = 0;

        // Phosphorus

        this.Mineral[2].Name = "P"
        this.Mineral[2].Units = "(g/d)"

        if (this.AnimalType.indexOf("Cow") >= 0)
            this.Mineral[2].Fecal = 1 * this.TotalDMFed;
        else
            this.Mineral[2].Fecal = 0.8 * this.TotalDMFed;

        this.Mineral[2].Urine = 0.002 * this.BW;
        this.Mineral[2].Misc = 0;
        this.Mineral[2].Sweat = 0;

        if (this.DaysPreg >= 190)
            this.Mineral[2].Fetal = 0.02743 * Math.exp(((0.05527 - (0.000075 * this.DaysPreg)) * this.DaysPreg)) - 0.02743 * Math.exp(((0.05527 - (0.000075 * (this.DaysPreg - 1))) * (this.DaysPreg - 1)));
        else
            this.Mineral[2].Fetal = 0;

        switch (this.DaysInMilk) {
            case 0:
                this.Mineral[2].Milk = 0;
            default:
                this.Mineral[2].Milk = 0.9 * this.MilkProd;
        }

        if ((this.BW > 0) && (this.WG > 0))
            this.Mineral[2].Growth = (1.2 + (4.635 * (this.MW ** 0.22) * (this.BW ** -0.22))) * (this.WG / 0.96);
        else
            this.Mineral[2].Growth = 0;



        // Magnesium

        this.Mineral[3].Name = "Mg";
        this.Mineral[3].Units = "(g/d)";

        this.Mineral[3].Fecal = 0.003 * this.BW;

        this.Mineral[3].Urine = 0;
        this.Mineral[3].Misc = 0;
        this.Mineral[3].Sweat = 0;

        if (this.DaysPreg > 190)
            this.Mineral[3].Fetal = 0.33;
        else
            this.Mineral[3].Fetal = 0;

        switch (this.DaysInMilk) {
            case 0:
                this.Mineral[3].Milk = 0;
                break;
            default:
                this.Mineral[3].Milk = 0.15 * this.MilkProd;
        }

        this.Mineral[3].Growth = 0.45 * (this.WG / 0.96);




        // Chlorine

        this.Mineral[4].Name = "Cl";
        this.Mineral[4].Units = "(g/d)";

        this.Mineral[4].Fecal = 2.25 * (this.BW / 100);

        this.Mineral[4].Urine = 0;
        this.Mineral[4].Misc = 0;
        this.Mineral[4].Sweat = 0;

        if (this.DaysPreg > 190)
            this.Mineral[4].Fetal = 1;
        else
            this.Mineral[4].Fetal = 0;

        this.Mineral[4].Milk = 1.15 * this.MilkProd;
        this.Mineral[4].Growth = 1 * (this.WG / 0.96);




        //Potassium

        this.Mineral[5].Name = "K";
        this.Mineral[5].Units = "(g/d)";

        if (this.AnimalType == "Lactating Cow")
            this.Mineral[5].Fecal = 6.1 * this.TotalDMFed;
        else
            this.Mineral[5].Fecal = 2.6 * this.TotalDMFed;

        this.Mineral[5].Urine = 0.038 * this.BW;                     // urine loss

        if (this.Temp < 25) {
            this.Mineral[5].Sweat = 0;
        } else if (this.Temp >= 25 && this.Temp < 30) {
            this.Mineral[5].Sweat = 0.04 * (this.BW / 100);
        } else {
            this.Mineral[5].Sweat = 0.4 * (this.BW / 100);
        }
        this.Mineral[5].Misc = 0;


        if (this.DaysPreg > 190)
            this.Mineral[5].Fetal = 1.027;
        else
            this.Mineral[5].Fetal = 0;

        this.Mineral[5].Milk = 1.5 * this.MilkProd;
        this.Mineral[5].Growth = 1.6 * (this.WG / 0.96);




        //Sodium
        this.Mineral[6].Name = "Na";
        this.Mineral[6].Units = "(g/d)";

        if (this.AnimalType == "Lactating Cow")
            this.Mineral[6].Fecal = 0.038 * this.BW;
        else
            this.Mineral[6].Fecal = 0.015 * this.BW;

        this.Mineral[6].Urine = 0;
        this.Mineral[6].Misc = 0;

        if (this.Temp < 25) {
            this.Mineral[6].Sweat = 0;
        } else if (this.Temp >= 25 && this.Temp < 30) {
            this.Mineral[6].Sweat = 0.1 * (this.BW / 100);
        } else {
            this.Mineral[6].Sweat = 0.5 * (this.BW / 100);
        }

        if (this.DaysPreg > 190)
            this.Mineral[6].Fetal = 1.39;
        else
            this.Mineral[6].Fetal = 0;

        this.Mineral[6].Milk = 0.63 * this.MilkProd;
        this.Mineral[6].Growth = 1.4 * (this.WG / 0.96);



        // Sulfur
        this.Mineral[7].Name = "S";
        this.Mineral[7].Units = "(g/d)";

        //Non-factorial approach used
        this.Mineral[7].Fecal = 0;
        this.Mineral[7].Misc = 0;
        this.Mineral[7].Urine = 0;
        this.Mineral[7].Sweat = 0;
        this.Mineral[7].Fetal = 0;
        this.Mineral[7].Milk = 0;
        this.Mineral[7].Growth = 0;




        //Cobalt
        this.Mineral[8].Name = "Co";
        this.Mineral[8].Units = "(mg/d)";

        // Factorial approach not used here
        this.Mineral[8].Fecal = 0;
        this.Mineral[8].Misc = 0;
        this.Mineral[8].Urine = 0;
        this.Mineral[8].Sweat = 0;
        this.Mineral[8].Fetal = 0;
        this.Mineral[8].Milk = 0;
        this.Mineral[8].Growth = 0;


        //Copper

        this.Mineral[9].Name = "Cu";
        this.Mineral[9].Units = "(mg/d)";

        this.Mineral[9].Fecal = 0.0071 * this.BW;
        this.Mineral[9].Urine = 0;
        this.Mineral[9].Sweat = 0;
        this.Mineral[9].Misc = 0;

        if (this.DaysPreg == 0) {
            this.Mineral[9].Fetal = 0;
        } else if (this.DaysPreg > 25 && this.DaysPreg <= 100) {
            this.Mineral[9].Fetal = 0.5;
        } else if (this.DaysPreg > 100 && this.DaysPreg <= 225) {
            this.Mineral[9].Fetal = 1.5
        } else {
            this.Mineral[9].Fetal = 2;
        }

        switch (this.DaysInMilk) {
            case 0:
                this.Mineral[9].Milk = 0;
                break;
            default:
                this.Mineral[9].Milk = 0.15 * this.MilkProd;
        }

        this.Mineral[9].Growth = 1.15 * (this.WG / 0.96)




        // Iodine

        this.Mineral[10].Name = "I";
        this.Mineral[10].Units = "(mg/d)";

        this.Mineral[10].Fecal = 0;
        this.Mineral[10].Urine = 0;
        this.Mineral[10].Sweat = 0;
        this.Mineral[10].Fetal = 0;

        if (this.DaysInMilk > 0) {
            this.Mineral[10].Milk = 1.5 * (this.BW / 100);
            this.Mineral[10].Misc = 0;
        } else {
            this.Mineral[10].Milk = 0;
            this.Mineral[10].Misc = 0.6 * (this.BW / 100);
        }

        this.Mineral[10].Growth = 0;



        // Iron

        this.Mineral[11].Name = "Fe";
        this.Mineral[11].Units = "(mg/d)";

        this.Mineral[11].Fecal = 0;
        this.Mineral[11].Urine = 0;
        this.Mineral[11].Sweat = 0;
        this.Mineral[11].Misc = 0;

        if (this.DaysPreg > 190)
            this.Mineral[11].Fetal = 18;
        else
            this.Mineral[11].Fetal = 0;

        this.Mineral[11].Milk = 1 * this.MilkProd;
        this.Mineral[11].Growth = 34 * (this.WG / 0.96);   // Requirement is on a full, not shrunk, basis


        // Manganese

        this.Mineral[12].Name = "Mn";
        this.Mineral[12].Units = "(mg/d)";

        this.Mineral[12].Fecal = 0.002 * this.BW;
        this.Mineral[12].Urine = 0;
        this.Mineral[12].Sweat = 0;
        this.Mineral[12].Misc = 0;

        if (this.DaysPreg > 190)
            this.Mineral[12].Fetal = 0.3;
        else
            this.Mineral[12].Fetal = 0;

        switch (this.DaysInMilk) {
            case 0:
                this.Mineral[12].Milk = 0;
                break;
            default:
                this.Mineral[12].Milk = 0.03 * this.MilkProd;
        }

        this.Mineral[12].Growth = 0.7 * (this.WG / 0.96);




        // Selenium

        this.Mineral[13].Name = "Se";
        this.Mineral[13].Units = "(mg/d)";

        // Factorial approach not used here
        this.Mineral[13].Fecal = 0;
        this.Mineral[13].Misc = 0;
        this.Mineral[13].Urine = 0;
        this.Mineral[13].Sweat = 0;
        this.Mineral[13].Fetal = 0;
        this.Mineral[13].Milk = 0;
        this.Mineral[13].Growth = 0;




        // Zinc

        this.Mineral[14].Name = "Zn";
        this.Mineral[14].Units = "(mg/d)";

        this.Mineral[14].Fecal = 0.033 * this.BW;
        this.Mineral[14].Urine = 0.012 * this.BW;
        this.Mineral[14].Sweat = 0;
        this.Mineral[14].Misc = 0;

        if (this.DaysPreg > 190)
            this.Mineral[14].Fetal = 12;
        else
            this.Mineral[14].Fetal = 0;

        this.Mineral[14].Milk = 4 * this.MilkProd;
        this.Mineral[14].Growth = 24 * (this.WG / 0.96);

        // Requirement is on a full, not shrunk, basis


        // Vitamin A

        this.Mineral[16].Name = "Vit A";
        this.Mineral[16].Units = "(1000 IU/kg)";

        // Factorial approach not used here
        this.Mineral[16].Fecal = 0;
        this.Mineral[16].Urine = 0;
        this.Mineral[16].Sweat = 0;
        this.Mineral[16].Misc = 0;
        this.Mineral[16].Fetal = 0;
        this.Mineral[16].Milk = 0;
        this.Mineral[16].Growth = 0;




        // Vitamin D

        this.Mineral[17].Name = "Vit D";
        this.Mineral[17].Units = "(1000 IU/kg)";

        // Factorial approach not used here
        this.Mineral[17].Fecal = 0;
        this.Mineral[17].Urine = 0;
        this.Mineral[17].Sweat = 0;
        this.Mineral[17].Misc = 0;
        this.Mineral[17].Fetal = 0;
        this.Mineral[17].Milk = 0;
        this.Mineral[17].Growth = 0;



        // Vitamin E

        this.Mineral[18].Name = "Vit E";
        this.Mineral[18].Units = "(IU/kg)";

        // Factorial approach not used here
        this.Mineral[18].Fecal = 0;
        this.Mineral[18].Urine = 0;
        this.Mineral[18].Sweat = 0;
        this.Mineral[18].Misc = 0;
        this.Mineral[18].Fetal = 0;
        this.Mineral[18].Milk = 0;
        this.Mineral[18].Growth = 0;





        // Calves don't have a factorial mineral requirements system

        if (this.AnimalType == "Young Calf")
            for (C = 1; C <= 18; C++) {
                this.Mineral[C].Fecal = 0;
                this.Mineral[C].Urine = 0;
                this.Mineral[C].Sweat = 0;
                this.Mineral[C].Misc = 0;
                this.Mineral[C].Fetal = 0;
                this.Mineral[C].Milk = 0;
                this.Mineral[C].Growth = 0;
            }
        if (this.AnimalType == "Young Calf") {
            var MilkFeeds = 0;
            CalfStarter = 0;
            RegFeeds = 0;

            for (let X = 1; X <= this.NumFeeds; X++) {
                if (this.Feed[X].Name == "Calf Starter")
                    CalfStarter = CalfStarter + this.Feed[X].DMFed;
                else if (this.Feed[X].Category.indexOf("Calf Feed") >= 0)
                    MilkFeeds = MilkFeeds + this.Feed[X].DMFed;
                else
                    RegFeeds = RegFeeds + this.Feed[X].DMFed;
            }
        }

        for (let C = 1; C <= 18; C++) {


            this.Mineral[C].Maint = this.Mineral[C].Fecal + this.Mineral[C].Urine + this.Mineral[C].Sweat + this.Mineral[C].Misc;
            if (this.AnimalType != "Young Calf") {

                if ((this.Age < (this.FirstCalf + this.CalfInt)) || (this.LactNum <= 1)) {
                    // Keep the already computed growth requirement
                } else {
                    // Set the growth requirement to zero
                    this.Mineral[C].Growth = 0;
                }

                if (C < 15)
                    this.Mineral[C].Total = (this.Mineral[C].Maint + this.Mineral[C].Fetal + this.Mineral[C].Milk + this.Mineral[C].Growth);
                else
                    switch (C) {

                        case 15:
                            if (this.AnimalType == "Replacement Heifer") {
                                if (this.DaysPreg > 259)
                                    this.Mineral[C].Total = 0.11 * this.BW;
                                else
                                    this.Mineral[C].Total = 0.08 * this.BW;
                            } else
                                this.Mineral[C].Total = 0.11 * this.BW;
                            break;
                        case 16:
                            this.Mineral[C].Total = 0.03 * this.BW;
                            break;
                        case 17:
                            if (this.Grazing == true) {
                                if (this.AnimalType == "Dry Cow")
                                    this.Mineral[C].Total = 0.5 * this.BW;
                                else
                                    this.Mineral[C].Total = 0.26 * this.BW;
                            } else {
                                if (this.AnimalType == "Dry Cow")
                                    this.Mineral[C].Total = 1.6 * this.BW;
                                else if (this.AnimalType == "Young Calf")
                                    this.Mineral[C].Total = 50 * this.TotalDMFed;
                                else
                                    this.Mineral[C].Total = 0.8 * this.BW;
                            }
                    }


                if (this.Mineral[C].Name == "Co")
                    this.Mineral[C].Total = 0.11 * this.TotalDMFed;

                if (this.Mineral[C].Name == "S")
                    this.Mineral[C].Total = 2 * this.TotalDMFed;

                if (this.Mineral[C].Name == "Se")
                    this.Mineral[C].Total = 0.3 * this.TotalDMFed;

            } else {

                if (this.StarterDMI == 0)
                    switch (this.Mineral[C].Name) {
                        case "Ca":
                            this.Mineral[C].Total = 10 * this.TotalDMFed;
                            break;
                        case "P":
                            this.Mineral[C].Total = (7.5 * this.TotalDMFed) / 0.9;
                            break;
                        case "Mg":
                            this.Mineral[C].Total = 0.7 * this.TotalDMFed;
                            break;
                        case "Na":
                            this.Mineral[C].Total = 1 * this.TotalDMFed;
                            break;
                        case "K":
                            this.Mineral[C].Total = 6.5 * this.TotalDMFed;
                            break;
                        case "Cl":
                            this.Mineral[C].Total = 2 * this.TotalDMFed;
                            break;
                        case "S":
                            this.Mineral[C].Total = 2.9 * this.TotalDMFed;
                            break;
                        case "Fe":
                            this.Mineral[C].Total = 100 * this.TotalDMFed;
                            break;
                        case "Mn":
                            this.Mineral[C].Total = 40 * this.TotalDMFed;
                            break;
                        case "Zn":
                            this.Mineral[C].Total = 40 * this.TotalDMFed;
                            break;
                        case "Cu":
                            this.Mineral[C].Total = 10 * this.TotalDMFed;
                            break;
                        case "I":
                            this.Mineral[C].Total = 0.25 * this.TotalDMFed;
                            break;
                        case "Co":
                            this.Mineral[C].Total = 0.1 * this.TotalDMFed;
                            break;
                        case "Se":
                            this.Mineral[C].Total = 0.3 * this.TotalDMFed;
                            break;
                        case "Vit A":
                            this.Mineral[C].Total = 0.11 * this.CalfBW;
                            break;
                        case "Vit D":
                            this.Mineral[C].Total = 0.6 * this.TotalDMFed;
                            break;
                        case "Vit E":
                            this.Mineral[C].Total = 50 * this.TotalDMFed;
                    }
                else
                    switch (this.Mineral[C].Name) {

                        case "Ca":
                            this.Mineral[C].Total = 7 * this.TotalDMFed;
                            break;
                        case "P":
                            this.Mineral[C].Total = (4.5 * this.TotalDMFed) / 0.78;
                            break;
                        case "Mg":
                            this.Mineral[C].Total = 1 * this.TotalDMFed;
                            break;
                        case "Na":
                            this.Mineral[C].Total = 1.5 * this.TotalDMFed;
                            break;
                        case "K":
                            this.Mineral[C].Total = 6.5 * this.TotalDMFed;
                            break;
                        case "Cl":
                            this.Mineral[C].Total = 2 * this.TotalDMFed;
                            break;
                        case "S":
                            this.Mineral[C].Total = 2 * this.TotalDMFed;
                            break;
                        case "Fe":
                            this.Mineral[C].Total = 50 * this.TotalDMFed;
                            break;
                        case "Mn":
                            this.Mineral[C].Total = 40 * this.TotalDMFed;
                            break;
                        case "Zn":
                            this.Mineral[C].Total = 40 * this.TotalDMFed;
                            break;
                        case "Cu":
                            this.Mineral[C].Total = 10 * this.TotalDMFed;
                            break;
                        case "I":
                            this.Mineral[C].Total = 0.25 * this.TotalDMFed;
                            break;
                        case "Co":
                            this.Mineral[C].Total = 0.1 * this.TotalDMFed;
                            break;
                        case "Se":
                            this.Mineral[C].Total = 0.3 * this.TotalDMFed;
                            break;
                        case "Vit A":
                            this.Mineral[C].Total = 0.11 * this.CalfBW;
                            break;
                        case "Vit D":
                            this.Mineral[C].Total = 0.6 * this.TotalDMFed;
                            break;
                        case "Vit E":
                            this.Mineral[C].Total = 50 * this.TotalDMFed;
                    }
            }



            this.Mineral[C].Supplied = 0;
            this.Mineral[C].Absorbable = 0;

            if (this.NumFeeds >= 0)


                for (let d = 1; d <= this.NumFeeds; d++)
                    switch (this.Mineral[C].Name) {
                        case "Ca":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].Ca / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].Ca / 100) * this.Feed[d].DMFed) * (this.Feed[d].CaBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Ca / 100) * this.Feed[d].DMFed);

                            break;
                        case "Mg":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].Mg / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].Mg / 100) * this.Feed[d].DMFed) * (this.Feed[d].MgBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Mg / 100) * this.Feed[d].DMFed);

                            break;
                        case "P":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].P / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].P / 100) * this.Feed[d].DMFed) * (this.Feed[d].PBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].P / 100) * this.Feed[d].DMFed);

                            break;
                        case "K":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].K / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].K / 100) * this.Feed[d].DMFed) * (this.Feed[d].KBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].K / 100) * this.Feed[d].DMFed);

                            break;
                        case "Na":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].Na / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].Na / 100) * this.Feed[d].DMFed) * (this.Feed[d].NaBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Na / 100) * this.Feed[d].DMFed);

                            break;
                        case "Cl":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].Cl / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].Cl / 100) * this.Feed[d].DMFed) * (this.Feed[d].ClBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Cl / 100) * this.Feed[d].DMFed);

                            break;
                        case "Zn":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].Zn * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Zn * this.Feed[d].DMFed) * (this.Feed[d].ZnBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].Zn * this.Feed[d].DMFed);

                            break;
                        case "Cu":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].Cu * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Cu * this.Feed[d].DMFed) * (this.Feed[d].CuBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].Cu * this.Feed[d].DMFed);

                            break;
                        case "Co":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].Co * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Co * this.Feed[d].DMFed) * (this.Feed[d].CoBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].Co * this.Feed[d].DMFed);

                            break;
                        case "Mn":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].Mn * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Mn * this.Feed[d].DMFed) * (this.Feed[d].MnBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].Mn * this.Feed[d].DMFed);

                            break;
                        case "I":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].I * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].I * this.Feed[d].DMFed) * (this.Feed[d].IBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].I * this.Feed[d].DMFed)

                            break;
                        case "Fe":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].Fe * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Fe * this.Feed[d].DMFed) * (this.Feed[d].FeBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].Fe * this.Feed[d].DMFed);

                            break;
                        case "S":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + ((this.Feed[d].s / 100) * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (((this.Feed[d].s / 100) * this.Feed[d].DMFed) * (this.Feed[d].SBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].s / 100) * this.Feed[d].DMFed);

                            break;
                        case "Se":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].Se * this.Feed[d].DMFed);

                            if (this.AnimalType != "Young Calf")
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + ((this.Feed[d].Se * this.Feed[d].DMFed) * (this.Feed[d].SeBio));
                            else
                                this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].Se * this.Feed[d].DMFed);

                            break;
                        case "Vit A":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].VitA * this.Feed[d].DMFed);
                            this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].VitA * this.Feed[d].DMFed);
                            break;
                        case "Vit D":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].VitD * this.Feed[d].DMFed);
                            this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].VitD * this.Feed[d].DMFed);
                            break;
                        case "Vit E":
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied + (this.Feed[d].VitE * this.Feed[d].DMFed);
                            this.Mineral[C].Absorbable = this.Mineral[C].Absorbable + (this.Feed[d].VitE * this.Feed[d].DMFed);

                    }




            //Ration Density Calculation
            if (this.TotalDMFed > 0)

                switch (this.Mineral[C].Name) {
                    case "Co":
                    case "Cu":
                    case "I":
                    case "Fe":
                    case "Mn":
                    case "Se":
                    case "Zn":
                        this.Mineral[C].RD = this.Mineral[C].Supplied / this.TotalDMFed;
                        break;
                    case "Vit A":
                    case "Vit D":
                    case "Vit E":
                        this.Mineral[C].RD = this.Mineral[C].Supplied / this.TotalDMFed;
                        break;
                    default:
                        this.Mineral[C].RD = this.Mineral[C].Supplied / this.TotalDMFed;
                }
            else
                this.Mineral[C].RD = 0;


            //Balance Calculation - First the .Supplied variable must be converted to
            //the same units as the .Total

            switch (this.Mineral[C].Units) {
                case "(g/d)":
                    this.Mineral[C].Supplied = this.Mineral[C].Supplied * 1000;
                    this.Mineral[C].Absorbable = this.Mineral[C].Absorbable * 1000;
                    break;
                case "(mg/d)":
                    switch (this.Mineral[C].Name) {
                        case "Co":
                        case "Cu":
                        case "I":
                        case "Fe":
                        case "Mn":
                        case "Se":
                        case "Zn":
                            // These minerals are listed as mg/kg, no need to convert them to mg units
                            break;
                        default:
                            this.Mineral[C].Supplied = this.Mineral[C].Supplied * 1000000;
                            this.Mineral[C].Absorbable = this.Mineral[C].Absorbable * 1000000;
                    }
            }

            this.Mineral[C].Balance = this.Mineral[C].Absorbable - this.Mineral[C].Total

            // Used to calculate Ration Density requirements for young calves
            if (this.AnimalType == "Young Calf")
                switch (this.Mineral[C].Name) {
                    case "Ca":
                        m = 1;
                        n = 0.7;
                        o = 0.6;
                        break;
                    case "P":
                        m = 0.7;
                        n = 0.45;
                        o = 0.4;
                        break;
                    case "Mg":
                        m = 0.07;
                        n = 0.1;
                        o = 0.1;
                        break;
                    case "Na":
                        m = 0.4;
                        n = 0.15;
                        o = 0.14;
                        break;
                    case "K":
                        m = 0.65;
                        n = 0.65;
                        o = 0.65;
                        break;
                    case "Cl":
                        m = 0.25;
                        n = 0.2;
                        o = 0.2;
                        break;
                    case "S":
                        m = 0.29;
                        n = 0.2;
                        o = 0.2;
                        break;
                    case "Fe":
                        m = 100;
                        n = 50;
                        o = 50;
                        break;
                    case "Mn":
                    case "Zn":
                        m = 40;
                        n = 40;
                        o = 40;
                        break;
                    case "Cu":
                        m = 10;
                        n = 10;
                        o = 10;
                        break;
                    case "I":
                        m = 0.5;
                        n = 0.25;
                        o = 0.25;
                        break;
                    case "Co":
                        m = 0.11;
                        n = 0.1;
                        o = 0.1;
                        break;
                    case "Se":
                        m = 0.3;
                        n = 0.3;
                        o = 0.3;
                        break;
                    case "Vit A":
                        m = 9;
                        n = 4;
                        o = 4;
                        break;
                    case "Vit D":
                        m = 0.6;
                        n = 0.6;
                        o = 0.6;
                        break;
                    case "Vit E":
                        m = 50;
                        n = 25;
                        o = 25;
                }

            if (this.TotalDMFed > 0)
                this.Mineral[C].RDReq = ((MilkFeeds * m) + (CalfStarter * n) + (RegFeeds * o)) / this.TotalDMFed;
            else
                this.Mineral[C].RDReq = 0;
        }
    }


    //GAIN EKSIK MUHTEMELEN MINERALCOMP GEREKIYOR
    ReservesComputations() {

        let EnergyBal = 0;                 // Equal to EvalFactor(3).Gain
        let X = 0;

        EnergyBal = this.EvalFactor[3].Gain;

        this.CS_F[1] = 0.726;
        this.CS_F[2] = 0.794;
        this.CS_F[3] = 0.863;
        this.CS_F[4] = 0.931;
        this.CS_F[5] = 1;
        this.CS_F[6] = 1.069;
        this.CS_F[7] = 1.137;
        this.CS_F[8] = 1.206;
        this.CS_F[9] = 1.274;


        this.CS5EBW = (this.SBW * 0.851) / this.CS_F[this.CS9];

        for (let X = 1; X <= 9; X++) {
            this.EBW[X] = this.CS_F[X] * this.CS5EBW;
            this.AF[X] = 0.037683 * X;
            this.TF[X] = this.AF[X] * this.EBW[X];
            this.AP[X] = 0.200886 - (0.0066762 * X);
            this.TP[X] = this.AP[X] * this.EBW[X];
            this.ER[X] = (9.4 * this.TF[X]) + (5.55 * this.TP[X]);
        }

        if (this.CS9 >= 3)
            this.Lose1CS = this.ER[this.CS9] - this.ER[this.CS9 - 2];
        else
            this.Lose1CS = 1000000;


        if (this.CS9 <= 7)
            this.Gain1CS = this.ER[this.CS9 + 2] - this.ER[this.CS9];
        else
            this.Gain1CS = 1000000;


        if (this.CS9 >= 3)
            this.NElSub = 0.82 * this.Lose1CS;
        else
            this.NElSub = 0.82 * (this.ER[this.CS9] - this.ER[1]);


        if (this.CS9 <= 7)
            this.NElReq = (0.644 / 0.75) * this.Gain1CS;
        else
            this.NElReq = (0.644 / 0.75) * (this.ER[9] - this.ER[this.CS9]);


        if (EnergyBal > 0)
            this.deltaER = this.NElReq;
        else
            this.deltaER = this.NElSub;


        if (this.AnimalType == "Replacement Heifer")
            this.DaysToChange = 0;
        else
            this.DaysToChange = this.deltaER / this.EnergyBal;
    }

    MW_From_Breed(Br) { // ?
        switch (Br) {
            case "Ayrshire":
                MW_From_Breed = 545;
                break;
            case "Brown Swiss":
                MW_From_Breed = 682;
                break;
            case "Guernsey":
                MW_From_Breed = 500;
                break;
            case "Holstein":
                MW_From_Breed = 682;
                break;
            case "Jersey":
                MW_From_Breed = 454;
                break;
            case "Milking Shorthorn":
                MW_From_Breed = 568;
        }
    }

    MaintenanceComputations() { // OK
        if ((this.AnimalType == "Lactating Cow") || (this.AnimalType == "Dry Cow"))
            this.a1 = 0.08;
        else
            this.a1 = 0.086;

        this.CS9 = ((this.CS - 1) * 2) + 1;

        if (this.AnimalType == "Replacement Heifer") {
            this.COMP = 0.8 + ((this.CS9 - 1) * 0.05);
            this.a2 = 0.0007 * (20 - this.PrevTemp);
        } else {
            this.COMP = 1;
            this.a2 = 0;
        }

        if (this.Grazing == false)
            this.NEmact = 0;
        else
            if (this.AnimalType == "Replacement Heifer") {
                this.NEmact = ((0.0009 * this.BW) + (0.0016 * this.BW));
                if (this.Topography == "Hilly")
                    this.NEmact = this.NEmact + (0.006 * this.BW);

            }
            else {

                // These activity equations derived by NRC committee members on
                // a full (not shrunk) body weight basis
                this.NEmact = ((((this.Distance / 1000) * this.Trips) * (0.00045 * this.BW)) + (0.0012 * this.BW));

                if (this.Topography == "Hilly")
                    this.NEmact = this.NEmact + (0.006 * this.BW);
            }

        if (this.AnimalType == "Replacement Heifer")
            this.NEMaintNS = (((this.SBW - this.CW) ** 0.75) * ((this.a1 * this.COMP) + this.a2)) + this.NEmact;
        else
            this.NEMaintNS = (((this.BW - this.CW) ** 0.75) * (this.a1 * this.COMP)) + this.NEmact;



        if (this.TotalDMFed > 0) {
            if (this.AnimalType != "Replacement Heifer")
                this.NEDietConc = this.NEl_Total / this.TotalDMFed;
            else
                this.NEDietConc = this.NEm_Total / this.TotalDMFed;
        }
        else
            this.NEDietConc = 0;


        if (this.NEDietConc > 0)
            this.FeedMaint = this.NEMaintNS / this.NEDietConc;
        else
            this.FeedMaint = 0;


        if (this.TotalDMFed > 0)
            this.NEGrowthDietNS = (this.TotalDMFed - this.FeedMaint) * (this.NEg_Total / this.TotalDMFed);
        else
            this.NEGrowthDietNS = 0;


        if (this.AnimalType == "Replacement Heifer")
            this.NEFP = this.NEGrowthDietNS;
        else {
            if (this.TotalDMFed > 0)
                this.NEFP = (this.TotalDMFed - this.FeedMaint) * (this.NEl_Total / this.TotalDMFed) * 0.65;
            else
                this.NEFP = 0;
        }

        this.MEI = this.MEng_Total;
        this.SA = 0.09 * (this.SBW ** 0.67);

        if (this.SA > 0)
            this.HP = (this.MEI - this.NEFP) / this.SA;
        else
            this.HP = 0;

        this.T = this.Age * 30.4;

        if (this.T <= 30)
            this.TI = 2.5;
        else if (this.T < 183)
            this.TI = 6.5;
        else if (this.T < 363)
            this.TI = 5.1875 + (0.3125 * this.CS9);
        else if (this.T >= 363)
            this.TI = 5.25 + (0.75 * this.CS9);

        switch (this.CoatCond) {
            case "Clean/Dry":
                this.Coat = 1;
                break;
            case "Some Mud":
                this.Coat = 0.8;
                break;
            case "Wet/Matted":
                this.Coat = 0.5;
                break;
            case "Covered with Snow/Mud":
                this.Coat = 0.2;
        }


        this.EI = ((7.36 - (0.296 * this.WindSpeed) + (2.55 * this.HairDepth)) * this.Coat) * 0.8;

        if ((this.EI < 0))
            this.EI = 0;

        this.INS = this.TI + this.EI;
        this.LCT = 39 - (this.INS * this.HP * 0.85);

        if (this.LCT > this.Temp)
            this.MEcs = this.SA * (this.LCT - this.Temp) / this.INS;
        else
            this.MEcs = 0;

        if ((this.MEng_Total > 0) && (this.TotalDMFed > 0))
            this.ColdStr = ((this.NEDietConc / (this.MEng_Total / this.TotalDMFed)) * this.MEcs);
        else
            this.ColdStr = 0;


        if ((this.HeatStress == "None") || (this.Temp < 30))
            this.HeatStr = 1;
        else if (this.HeatStress == "Rapid/Shallow")
            this.HeatStr = 1.07;
        else if (this.HeatStress == "Open Mouth")
            this.HeatStr = 1.18;


        this.NEMaint = ((this.NEMaintNS + this.ColdStr) * this.HeatStr) + this.NEmact


        if (this.NEDietConc > 0)
            this.DMIMaint = this.NEMaint / this.NEDietConc;
        else
            this.DMIMaint = 0;


        if (this.DaysPreg > 0) {
            if (((this.MEng_Total > 0) && (this.TotalDMFed > 0)))
                this.DMIPreg = this.MEPreg / (this.MEng_Total / this.TotalDMFed);
            else
                this.DMIPreg = 0;
        }

        else
            this.DMIPreg = 0;

        if (this.TotalDMFed > 0)
            this.NEGrowthDiet = (this.TotalDMFed - this.DMIMaint - this.DMIPreg) * (this.NEg_Total / this.TotalDMFed);
        else
            this.NEGrowthDiet = 0;

        // Net energy for growth available in the diet cannot be negative
        if (this.NEGrowthDiet < 0)
            this.NEGrowthDiet = 0;

        this.MPMaint = (0.3 * ((this.BW - this.CW) ** 0.6)) + (4.1 * ((this.BW - this.CW) ** 0.5)) + ((this.TotalDMFed * 1000 * 0.03) - (0.5 * ((this.MPBact / 0.8) - (this.MPBact)))) + this.MPEndoReq;

        this.ScurfMP = 0.3 * ((this.BW - this.CW) ** 0.6);
        this.UrineMP = 4.1 * ((this.BW - this.CW) ** 0.5);
        this.FecalMP = ((this.TotalDMFed * 1000 * 0.03) - (0.5 * ((this.MPBact / 0.8) - (this.MPBact))));

        // Used only for Replacement Heifers
        if (this.NEmOverMEng > 0)
            this.MEMaint = this.NEMaint / this.NEmOverMEng;
        else
            this.MEMaint = 0;

    }

    GrowthComputations() { // OK
        if (this.MW > 0)
            this.SRW_to_MSBW = 478 / (0.96 * this.MW);
        else
            this.SRW_to_MSBW = 478 / (0.96 * (MW_From_Breed(this.Breed)));

        this.EQSBW = (this.SBW - this.CW) * this.SRW_to_MSBW;
        this.SWG = 13.91 * (this.NEGrowthDiet ** 0.9116) * (this.EQSBW ** -0.6837);

        this.MEAllowGain = (this.SWG / 0.96);

        if (this.Age < this.FirstCalf)
            this.MEAllowGainPreg = this.MEAllowGain + (this.ADGPreg / 1000);
        else
            this.MEAllowGainPreg = (this.EQEBG / 0.956) + (this.ADGPreg / 1000);

        if (this.UseTargetADG = false) {
            this.WG = 0.96 * (this.DesiredADG / 1000);
            this.DLWReq = 0;
        }
        else {
            this.WG = 0.96 * this.ADG;
            this.DLWReq = 0;
        }

        this.EQEBW = 0.891 * this.EQSBW;
        this.EQEBG = 0.956 * this.WG;
        this.RE = 0.0635 * (this.EQEBW ** 0.75) * (this.EQEBG ** 1.097);

        if (this.NEg_Total > 0) {
            if (this.AnimalType != "Replacement Heifer")
                this.NEGrowth = (this.NEm_Total / this.NEg_Total) * this.RE;
            else
                this.NEGrowth = this.RE;
        }
        else
            this.NEGrowth = 0;

        if (this.WG == 0)
            this.NPg = 0;
        else
            this.NPg = this.WG * (268 - (29.4 * (this.RE / this.WG)));

        if (this.EQSBW <= 478)
            this.EffMP_NPg = (83.4 - (0.114 * this.EQSBW)) / 100;
        else
            this.EffMP_NPg = 0.28908;

        this.MPGrowth = this.NPg / this.EffMP_NPg;

        if (this.DLWReq > 0)
            this.NEReserves = this.DLWReq * 5.12;
        else
            this.NEReserves = this.DLWReq * 4.92;

        if (this.AnimalType == "Replacement Heifer")
            this.DMIAvailGrowth = this.TotalDMFed - this.DMIMaint - this.DMIPreg
        else
            this.DMIAvailGrowth = this.TotalDMFed - this.DMIMaint - this.DMIPreg - this.DMILact;


        // This value is used only for Replacement Heifers
        if (this.NEgOverMEng > 0)
            this.MEGrowth = this.NEGrowth / this.NEgOverMEng;
        else
            this.MEGrowth = 0;

    }

    DryMatterIntakeComputations() { // OK

        let WOL = 0;           // Week of Lactation = 7 * Days In Milk
        let Lag = 0;           // week of lactation correction -
        // used in Default and Roseler equations
        switch (this.CoatCond) {
            case "Clean/Dry":
                this.CCFact = 1;
                break;
            case "Some Mud":
                this.CCFact = 1;
                break;
            case "Wet/Matted":
                this.CCFact = 0.85;
                break;
            case "Covered with Snow/Mud":
                this.CCFact = 0.7;
        }

        //this.CCFact = 1

        if (this.Temp < -15)
            this.TempFact = 1.16;
        else if (this.Temp < -5)
            this.TempFact = 1.07;
        else if (this.Temp < 5)
            this.TempFact = 1.05;
        else if (this.Temp < 15)
            this.TempFact = 1.03;
        else if (this.Temp < 25)
            this.TempFact = 1;
        else if (this.Temp < 35)
            this.TempFact = 0.9;
        else if (this.Temp >= 35) {
            if (this.NightCooling == false)
                this.TempFact = 0.65;
            else
                this.TempFact = 0.9;
        }

        if (this.Age > 12)
            this.SubFact = 0.0869;
        else
            this.SubFact = 0.1128;

        // These equations really belong in the Maintenance computations section,
        // but are put here since the DivFact variable requires the NEDietConc
        if (this.TotalDMFed > 0) {
            if (this.AnimalType != "Replacement Heifer")
                this.NEDietConc = this.NEl_Total / this.TotalDMFed;
            else
                this.NEDietConc = this.NEm_Total / this.TotalDMFed;
        }
        else
            this.NEDietConc = 0;

        if (this.NEDietConc < 1)
            this.DivFact = 0.95;
        else
            this.DivFact = this.NEDietConc;


        if (this.DaysPreg < 259) {
            if (this.DivFact > 0)
                this.DMI_RH = ((this.BW ** 0.75) * (((0.2435 * this.NEDietConc) - (0.0466 * (this.NEDietConc ** 2)) - this.SubFact) / this.DivFact)) * this.TempFact * this.CCFact;
            else
                this.DMI_RH = 0;
        }
        else
            this.DMI_RH = ((1.71 - (0.69 * Math.exp(0.35 * (this.DaysPreg - 280)))) / 100) * this.BW;

        let DMIRH_Factor = 0;


        if ((this.DaysPreg > 210) && (this.DaysPreg < 259))
            DMIRH_Factor = (1 + ((210 - this.DaysPreg) * 0.0025));
        else
            DMIRH_Factor = 1;

        this.DMI_RH = this.DMI_RH * DMIRH_Factor;

        WOL = this.DaysInMilk / 7;
        Lag = 1 - (Math.exp(-1 * 0.192 * (WOL + 3.67)));
        this.DMILact = (((this.BW ** 0.75) * 0.0968) + (0.372 * this.FCM) - 0.293) * Lag;

        this.DMIDry = ((1.97 - (0.75 * (Math.exp(0.16 * (this.DaysPreg - 280))))) / 100) * this.BW;



        switch (this.AnimalType) {
            case "Lactating Cow":
                this.DryMatterIntake = this.DMILact;
                break;
            case "Dry Cow":
                this.DryMatterIntake = this.DMIDry;
                break;
            case "Replacement Heifer":
                this.DryMatterIntake = this.DMI_RH;
                break;
            case "Young Calf":
                this.DryMatterIntake = this.DMI_RH;
        }


        if (this.DryMatterIntake <= this.TotalDMFed)
            this.Pasture = 0;
        else {
            if (this.DryMatterIntake > 0)
                this.Pasture = (this.DryMatterIntake - this.TotalDMFed) / this.DryMatterIntake;
            else
                this.Pasture = 0;
        }

    }

    DietEvalTwoComputations() { // EvalFactor Total hatası

        let X = 0;
        if (this.AnimalType == "Replacement Heifer")
            this.CondMessage = "No changes in condition score for heifers.";
        else {
            if (this.EvalFactor[3].Total >= 0) {
                if (Math.abs(this.DaysToChange) <= 305)
                    this.CondMessage = "Days to gain one condition score :  " & Str(parseInt(Math.abs(this.DaysToChange)));
                else
                    this.CondMessage = "Days to gain one condition score :  > 305";
            }
            else {
                if (Math.abs(this.DaysToChange) <= 305)
                    this.CondMessage = "Days to lose one condition score :  " & Str(parseInt(Math.abs(this.DaysToChange)));
                else
                    this.CondMessage = "Days to lose one condition score :  > 305";
            }
        }


        if (this.TotalDMFed > 0) {
            this.DietNDF = (this.NDF_Total / this.TotalDMFed) * 100;
            this.DietADF = (this.ADF_Total / this.TotalDMFed) * 100;
        }
        else {
            this.DietNDF = 0;
            this.DietADF = 0;
        }

        this.ForageNDF = 0;

        for (X = 1; X <= this.NumFeeds; X++)
            if (this.Feed[X].EnergyEqClass == "Forage")
                this.ForageNDF = this.ForageNDF + ((this.Feed[X].NDF / 100) * this.Feed[X].DMFed);

        if (this.TotalDMFed > 0) {
            this.DietME = this.MEng_Total / this.TotalDMFed;
            this.DietNEl = this.NEl_Total / this.TotalDMFed;
            this.DietNEg = this.NEg_Total / this.TotalDMFed;
        }
        else {
            this.DietME = 0;
            this.DietNEl = 0;
            this.DietNEg = 0;
        }


        let kgPerMetricTon = 996.9;


        if (this.AnimalType == "Lactating Cow")
            this.DailyMilk = this.MilkProd;
        else
            this.DailyMilk = 0;


        let NEBalance = 0;
        let MEBalance = 0;
        let EnergyFactor = 0;
        let NE_per_kg = 0;


        if (this.AnimalType != "Replacement Heifer") {
            NEBalance = (this.NEl_Total - (this.NEMaint + this.NEPreg + this.NELact + this.NEGrowth));
            MEBalance = 0;
        }
        else {
            NEBalance = 0;
            MEBalance = (this.MEng_Total - (this.MEMaint + this.MEPreg + this.MEGrowth));
        }




        if (this.AnimalType == "Lactating Cow") {
            if (NEBalance < 0)
                this.Reserves_WG = NEBalance / 4.92;
            else
                this.Reserves_WG = NEBalance / 5.12;
        } else if (this.AnimalType == "Dry Cow") {
            if (NEBalance < 0)
                this.Reserves_WG = NEBalance / 4.92;
            else
                this.Reserves_WG = NEBalance / 6.4;
        }
        else
            this.Reserves_WG = 0;


        if (NEBalance > 0) {
            this.MPReqReserves = (this.Reserves_WG * this.ProteinInGain) / 0.492;
            this.MPProvReserves = 0;

            if (this.DietRUPDigest > 0)
                this.RUPReqReserves = this.MPReqReserves / this.DietRUPDigest;
            else
                this.RUPReqReserves = 0;

            this.RUPProvReserves = 0;
        }
        else {
            this.MPReqReserves = 0;
            this.MPProvReserves = (-1 * this.Reserves_WG) * this.ProteinInGain * 0.67;
            this.RUPReqReserves = 0;

            if (this.DietRUPDigest > 0)
                this.RUPProvReserves = this.MPProvReserves / this.DietRUPDigest;
            else
                this.RUPProvReserves = 0;
        }


        this.TargetADGwoPreg = this.ADG;
        this.TargetADGPreg = this.ADG + (this.ADGPreg / 1000);


        if (this.MilkProd > 0) {
            if ((this.NEl_Total - this.NEMaint - this.NEPreg) > 0) {
                if (this.NELact > 0)
                    this.EnergyAllowableMilk = this.MilkProd * ((this.NEl_Total - this.NEMaint - this.NEPreg - this.NEGrowth) / this.NELact);
                else
                    this.EnergyAllowableMilk = 0;
            }
            else
                this.EnergyAllowableMilk = 0;


            if ((((this.MPFeed * 1000) + this.MPBact + this.MPEndo) - this.MPMaint - this.MPPreg) > 0) {
                if (this.MPLact > 0)
                    this.ProteinAllowableMilk = this.MilkProd * ((((this.MPFeed * 1000) + this.MPBact + this.MPEndo) - this.MPMaint - this.MPPreg - this.MPGrowth) / this.MPLact);
                else
                    this.ProteinAllowableMilk = 0;
            }
            else
                this.ProteinAllowableMilk = 0;

        }
        else {
            this.EnergyAllowableMilk = 0;
            this.ProteinAllowableMilk = 0;
        }

        if (this.DryMatterIntake > 0) {
            if ((this.AnimalType != "Replacement Heifer") || (this.DaysPreg > 259))
                this.Energy_TargetDietConc = (this.NEMaint + this.NEPreg + this.NELact + this.NEGrowth) / this.DryMatterIntake;
            else
                this.Energy_TargetDietConc = (this.MEMaint + this.MEPreg + this.MEGrowth) / this.DryMatterIntake;

            this.MP_TargetDietConc = (this.MPMaint + this.MPPreg + this.MPLact + this.MPGrowth) / this.DryMatterIntake;
            this.Ca_TargetDietConc = this.Mineral[1].Total / this.DryMatterIntake;
            this.P_TargetDietConc = this.Mineral[2].Total / this.DryMatterIntake;
        }
        else {
            this.Energy_TargetDietConc = 0;
            this.MP_TargetDietConc = 0;
            this.Ca_TargetDietConc = 0;
            this.P_TargetDietConc = 0;
        }


        this.DCAD = (((this.Mineral[6].RD * 100) * 435) + ((this.Mineral[5].RD * 100) * 256)) - (((this.Mineral[4].RD * 100) * 282) + ((this.Mineral[7].RD * 100) * 624));

    }

    DietEvalOneComputations() { // EVAL FACTOR ISTIYOR
        let X = 0;

        // The EvalFactors are calculated here as follows :
        //
        // NE Diet, NE Required, NE Differ, MP Diet, MP Required, MP Differ
        // Mcal/d     Mcal/d      Mcal/d      g/d         g/d        g/d
        if (this.AnimalType != "Replacement Heifer") {
            this.EvalFactor[1].Name = "NE Supplied";
            this.EvalFactor[2].Name = "NE Required";
            this.EvalFactor[3].Name = "NE (Diet - Req.)";
            this.EvalFactor[4].Name = "MP Diet";
            this.EvalFactor[5].Name = "MP Required";
            this.EvalFactor[6].Name = "MP (Diet - Req.)";
        }
        else {
            this.EvalFactor[1].Name = "ME Supplied";
            this.EvalFactor[2].Name = "ME Required";
            this.EvalFactor[3].Name = "ME (Diet - Req.)";
            this.EvalFactor[4].Name = "MP Diet";
            this.EvalFactor[5].Name = "MP Required";
            this.EvalFactor[6].Name = "MP (Diet - Req.)";
        }


        for (X = 1; X <= 6; X++)
            if (X < 4)
                this.EvalFactor[X].Units = "Mcal/day";
            else
                this.EvalFactor[X].Units = "g/day";

        if (this.AnimalType != "Replacement Heifer")
            this.EvalFactor[1].Total = this.NEl_Total;
        else
            this.EvalFactor[1].Total = this.MEng_Total;

        this.EvalFactor[1].Maint = this.EvalFactor[1].Total;

        if (this.AnimalType != "Replacement Heifer")
            this.EvalFactor[2].Maint = this.NEMaint;
        else {
            if (this.NEmOverMEng > 0)
                this.EvalFactor[2].Maint = this.NEMaint / this.NEmOverMEng;
            else
                this.EvalFactor[2].Maint = 0;
        }

        this.EvalFactor[3].Maint = this.EvalFactor[1].Maint - this.EvalFactor[2].Maint;
        this.EvalFactor[1].Preg = this.EvalFactor[3].Maint;

        if (this.AnimalType != "Replacement Heifer")
            this.EvalFactor[2].Preg = this.NEPreg;
        else
            this.EvalFactor[2].Preg = this.MEPreg;

        this.EvalFactor[3].Preg = this.EvalFactor[1].Preg - this.EvalFactor[2].Preg;
        this.EvalFactor[1].Lact = this.EvalFactor[3].Preg;

        if (this.AnimalType != "Replacement Heifer")
            this.EvalFactor[2].Lact = this.NELact;
        else
            this.EvalFactor[2].Lact = 0;

        this.EvalFactor[3].Lact = this.EvalFactor[1].Lact - this.EvalFactor[2].Lact;
        this.EvalFactor[1].Gain = this.EvalFactor[3].Lact;


        if (this.AnimalType == "Replacement Heifer")
            this.EvalFactor[2].Gain = this.EvalFactor[1].Gain;
        else {
            if (this.EQEBG > 0)
                this.EvalFactor[2].Gain = this.NEGrowth;
            else
                this.EvalFactor[2].Gain = 0;
        }

        this.EvalFactor[3].Gain = this.EvalFactor[1].Gain - this.EvalFactor[2].Gain
        this.EvalFactor[1].Reserves = this.EvalFactor[3].Gain
        this.EvalFactor[2].Reserves = this.NEReserves
        this.EvalFactor[2].Total = this.EvalFactor[2].Maint + this.EvalFactor[2].Preg + this.EvalFactor[2].Lact + this.EvalFactor[2].Gain + this.EvalFactor[2].Reserves;
        this.EvalFactor[3].Total = this.EvalFactor[1].Total - this.EvalFactor[2].Total;


        this.MPBact = this.MCP_Total * 0.64;
        this.MPFeed = this.TotalDigestedRUP;


        this.EvalFactor[4].Total = this.MPBact + this.MPFeed;
        this.EvalFactor[4].Maint = this.EvalFactor[4].Total;
        this.EvalFactor[5].Maint = this.MPMaint;
        this.EvalFactor[6].Maint = this.EvalFactor[4].Maint - this.EvalFactor[5].Maint;
        this.EvalFactor[4].Preg = this.EvalFactor[6].Maint;
        this.EvalFactor[5].Preg = this.MPPreg;
        this.EvalFactor[6].Preg = this.EvalFactor[4].Preg - this.EvalFactor[5].Preg;
        this.EvalFactor[4].Lact = this.EvalFactor[6].Preg;
        this.EvalFactor[5].Lact = this.MPLact;
        this.EvalFactor[6].Lact = this.EvalFactor[4].Lact - this.EvalFactor[5].Lact;
        this.EvalFactor[4].Gain = this.EvalFactor[6].Lact;


        if (this.Age > this.FirstCalf) {
            if (this.EQEBG > 0)
                this.EvalFactor[5].Gain = this.MPGrowth;
            else
                this.EvalFactor[5].Gain = 0;
        }
        else {
            if (this.SWG > 0) {
                if (this.EffMP_NPg > 0) {
                    if (this.WG > 0)
                        this.EvalFactor[5].Gain = (((268 - (29.4 * (this.RE / this.WG))) * this.WG) / this.EffMP_NPg);
                    else
                        this.EvalFactor[5].Gain = 0;
                }
                else
                    this.EvalFactor[5].Gain = 0;
            }
            else
                this.EvalFactor[5].Gain = 0;
        }


        this.EvalFactor[6].Gain = this.EvalFactor[4].Gain - this.EvalFactor[5].Gain;
        this.EvalFactor[4].Reserves = this.EvalFactor[6].Gain;
        this.EvalFactor[5].Total = this.EvalFactor[5].Maint + this.EvalFactor[5].Preg + this.EvalFactor[5].Lact + this.EvalFactor[5].Gain;

        this.EvalFactor[6].Total = this.EvalFactor[4].Total - this.EvalFactor[5].Total;



        this.DMIPred = this.DryMatterIntake;
        this.DMIActual = this.TotalDMFed;

        if (this.TotalDMFed > 0)
            this.DietCP = this.CP_Total / (this.TotalDMFed * 1000);
        else
            this.DietCP = 0;

        if (this.CP_Total > 0) {
            this.CP_RDP = (this.RDP_Total * 1000) / this.CP_Total;
            this.CP_RUP = (this.CP_Total - (this.RDP_Total * 1000)) / this.CP_Total;
        }
        else {
            this.CP_RDP = 0;
            this.CP_RUP = 0;
        }


        this.RDPReq = 0.15294 * this.TDN_Act_Total;
        this.RDPSup = this.TotalDMFed * 1000 * this.DietCP * this.CP_RDP;

        this.RDPBal = this.RDPSup - this.RDPReq;
        this.RUPSup = this.CP_Total - this.RDPSup;


        if (this.DietRUPDigest > 0)
            this.RUPReq = (this.EvalFactor[5].Total - (this.MPBact + this.MPEndo)) / this.DietRUPDigest;
        else
            this.RUPReq = 0;

        this.RUPBal = this.RUPSup - this.RUPReq;

        this.MPBalance = (((this.MPFeed * 1000) + this.MPBact + this.MPEndo) - (this.MPMaint + this.MPPreg + this.MPLact + this.MPGrowth));

        if (this.SWG > 0)
            this.ProteinInGain = (268 - (29.4 * (this.NEGrowthDiet / this.SWG)));
        else
            this.ProteinInGain = 0;

        let MPBalwoGrowth = 0;

        MPBalwoGrowth = (((this.MPFeed * 1000) + this.MPBact + this.MPEndo) - (this.MPMaint + this.MPPreg + this.MPLact));

        if (this.ProteinInGain > 0)
            this.MPAllowGain = ((MPBalwoGrowth * this.EffMP_NPg) / this.ProteinInGain) / 0.96;
        else
            this.MPAllowGain = 0;

        this.MPAllowGainPreg = this.MPAllowGain + (this.ADGPreg / 1000);
    }

    CBW_From_MW() {
        CBW_From_MW = 0.06275 * this.MW;
    }

    CalfComputations() {
        let X = 0;

        let TotalNEm = 0;
        let TotalNEg = 0;
        let TotalME = 0;
        let TotalCP = 0;
        let TotalDCP = 0;
        let TotalMilkADP = 0;
        let TotalStarterADP = 0;
        let TotalMilkCP = 0;
        let TotalStarterCP = 0;
        let TotalADP = 0;
        let ADP_to_CP = 0;
        let MilkME = 0;
        let StarterME = 0;
        let Fat = 0;


        // Energy computations
        this.MilkDMI = 0;
        this.StarterDMI = 0;
        TotalNEm = 0;
        TotalNEg = 0;
        TotalME = 0;
        TotalCP = 0;
        TotalDCP = 0;

        TotalMilkADP = 0;
        TotalStarterADP = 0;
        TotalMilkCP = 0;
        this.TotalStarterCP = 0;
        this.DietNEmCalf = 0;
        this.DietNEgCalf = 0;
        this.DietMECalf = 0;

        MilkME = 0;
        StarterME = 0;
        Fat = 0;


        //If there are no feeds then there can be no ration, so the computations cannot be run
        if (this.NumFeeds == 0)
            return;

        // If the Calf is not fed anything, then the computations cannot be run
        // NB: Both regular and calf feeds have a .DMFed property, so this is okay as-is
        this.TotalDMFed = 0

        for (X = 1; X <= this.NumFeeds; X++)
            this.TotalDMFed = parseFloat(this.TotalDMFed) + parseFloat(this.Feed[X].DMFed);

        if (this.TotalDMFed == 0)
            return;

        this.ComputeEnergyValues();

        for (X = 1; X <= this.NumFeeds; X++) {

            if ((this.Feed[X].Category == "Calf Feed - Starter") || (this.Feed[X].Category == "Calf Feed - Milk") || (this.Feed[X].Category == "Calf Feed - Vitamin/Mineral")) {
                //The feed is a calf feed

                TotalNEm = TotalNEm + (this.Feed[X].DMFed * this.Feed[X].cNEm);
                TotalNEg = TotalNEg + (this.Feed[X].DMFed * this.Feed[X].cNEg);
                TotalME = TotalME + (this.Feed[X].DMFed * this.Feed[X].cMEng);
                TotalCP = TotalCP + (this.Feed[X].DMFed * (this.Feed[X].cCP / 100));
                TotalDCP = TotalDCP + (this.Feed[X].DMFed * (this.Feed[X].cDCP / 100));
                Fat = Fat + (this.Feed[X].DMFed * (this.Feed[X].cEE / 100));

                if (this.Feed[X].Category == "Calf Feed - Milk") {
                    this.MilkDMI = this.MilkDMI + this.Feed[X].DMFed;
                    MilkME = MilkME + (this.Feed[X].DMFed * this.Feed[X].cMEng);
                    TotalMilkADP = TotalMilkADP + (this.Feed[X].DMFed * (this.Feed[X].cDCP / 100));
                    TotalMilkCP = TotalMilkCP + (this.Feed[X].DMFed * (this.Feed[X].cCP / 100));
                }
                else {
                    this.StarterDMI = this.StarterDMI + this.Feed[X].DMFed;
                    StarterME = StarterME + (this.Feed[X].DMFed * this.Feed[X].cMEng);
                    TotalStarterADP = TotalStarterADP + (this.Feed[X].DMFed * (this.Feed[X].cDCP / 100));
                    TotalStarterCP = TotalStarterCP + (this.Feed[X].DMFed * (this.Feed[X].cCP / 100));
                }

            }
            else {
                // The feed is a regular feed.
                // All regular feeds in a calf diet are considered starter feeds
                this.StarterDMI = this.StarterDMI + this.Feed[X].DMFed;

                // Convert regular feed CP values to calf feed CP values
                this.Feed[X].cCP = this.Feed[X].CP;

                // Since regular feeds are automatically starter feeds in a calf
                // diet, the DCP must be 0.75 * CP
                this.Feed[X].cDCP = 0.75 * this.Feed[X].cCP;

                // Once CP and DCP are determined for these regular feeds,
                // Total values are computed the same way
                TotalCP = TotalCP + (this.Feed[X].DMFed * (this.Feed[X].cCP / 100));
                TotalDCP = TotalDCP + (this.Feed[X].DMFed * (this.Feed[X].cDCP / 100));
                TotalStarterADP = TotalStarterADP + (this.Feed[X].DMFed * (this.Feed[X].cDCP / 100));
                TotalStarterCP = TotalStarterCP + (this.Feed[X].DMFed * (this.Feed[X].cCP / 100));
            }

        }




        // These values are only used for output, so define them
        // on a percentage basis (eg 83% instead of 0.83)
        if (this.TotalDMFed > 0) {
            this.DietCPCalf = (TotalCP / this.TotalDMFed) * 100;
            this.DietDCPCalf = (TotalDCP / this.TotalDMFed) * 100;
        }
        else {
            this.DietCPCalf = 0;
            this.DietDCPCalf = 0;
        }

        // ME requirement for maintenance with no stress
        this.NEmCalf = 0.086 * (this.CalfBW ** 0.75);

        // These instruction are used to compute a weighted average of
        // efficiencies to convert NEm to ME and NEg to ME
        let NonMineralFeeds = 0;

        this.CalfKm = 0;
        this.CalfKg = 0;
        NonMineralFeeds = 0;
        this.NEg_Total = 0;
        this.NEm_Total = 0;



        for (X = 1; X <= this.NumFeeds; X++) {

            if ((this.Feed[X].Category == "Calf Feed - Starter") || (this.Feed[X].Category == "Calf Feed - Milk") || (this.Feed[X].Category == "Calf Feed - Vitamin/Mineral")) {
                if (this.Feed[X].cMEng != 0) {
                    this.CalfKm = CalfKm + (0.86 * (this.Feed[X].DMFed * this.Feed[X].cMEng));
                    this.CalfKg = CalfKg + (0.69 * (this.Feed[X].DMFed * this.Feed[X].cMEng));
                    NonMineralFeeds = NonMineralFeeds + (this.Feed[X].DMFed * this.Feed[X].cMEng);
                }
            }
            else {
                if (this.Feed[X].MEng != 0) {
                    this.CalfKm = this.CalfKm + (0.75 * (this.Feed[X].DMFed * this.Feed[X].MEng));
                    this.CalfKg = this.CalfKg + (0.57 * (this.Feed[X].DMFed * this.Feed[X].MEng));

                    this.Feed[X].NEm = (0.75 * (this.Feed[X].DMFed * this.Feed[X].MEng));
                    this.Feed[X].NEg = (0.57 * (this.Feed[X].DMFed * this.Feed[X].MEng));

                    NonMineralFeeds = NonMineralFeeds + (this.Feed[X].DMFed * this.Feed[X].MEng);

                    this.NEg_Total = this.NEg_Total + this.Feed[X].NEg;
                    this.NEm_Total = this.NEm_Total + this.Feed[X].NEm;
                }
            }

        }



        if (NonMineralFeeds > 0) {
            this.CalfKm = this.CalfKm / NonMineralFeeds;
            this.CalfKg = this.CalfKg / NonMineralFeeds;
        }
        else {
            this.CalfKm = 0;
            this.CalfKg = 0;
        }

        // Note that energy values for regular feeds are computed based on the total diet.
        // That is, in the ComputeEnergyValues sub-model, NEm, NEg and ME values
        // are computed for the entire ration, not on a feed-by-feed basis.
        // These total energy values are added to those computed for the calf feeds.
        TotalNEm = TotalNEm + this.NEm_Total;
        TotalNEg = TotalNEg + this.NEg_Total;
        TotalME = TotalME + this.MEng_Total;



        // Note that, to get the dietary energy concentrations, the TotalDMFed
        // value is used.  This is correct, because the total energy values
        // used in these equations are Calf + Regular feed totals
        if (this.TotalDMFed > 0) {
            this.DietNEmCalf = TotalNEm / this.TotalDMFed;
            this.DietNEgCalf = TotalNEg / this.TotalDMFed;
            this.DietMECalf = TotalME / this.TotalDMFed;
        }
        else {
            this.DietNEmCalf = 0;
            this.DietNEgCalf = 0;
            this.DietMECalf = 0;
        }


        // Factor in lower critical temperature stress
        if (this.Age > 2) {

            if (this.CalfTemp > 5)
                this.TempFactor = 0;
            else if (this.CalfTemp > 0)
                this.TempFactor = 0.13;
            else if (this.CalfTemp > -5)
                this.TempFactor = 0.27;
            else if (this.CalfTemp > -10)
                this.TempFactor = 0.4;
            else if (this.CalfTemp > -15)
                this.TempFactor = 0.54;
            else if (this.CalfTemp > -20)
                this.TempFactor = 0.68;
            else if (this.CalfTemp > -25)
                this.TempFactor = 0.81;
            else if (this.CalfTemp > -30)
                this.TempFactor = 0.94;
            else
                this.TempFactor = 1.07;
        }
        else {

            if (this.CalfTemp > 15)
                this.TempFactor = 0;
            else if (this.CalfTemp > 10)
                this.TempFactor = 0.13;
            else if (this.CalfTemp > 5)
                this.TempFactor = 0.27;
            else if (this.CalfTemp > 0)
                this.TempFactor = 0.4;
            else if (this.CalfTemp > -5)
                this.TempFactor = 0.54;
            else if (this.CalfTemp > -10)
                this.TempFactor = 0.68;
            else if (this.CalfTemp > -15)
                this.TempFactor = 0.86;
            else if (this.CalfTemp > -20)
                this.TempFactor = 0.94;
            else if (this.CalfTemp > -25)
                this.TempFactor = 1.08;
            else if (this.CalfTemp > -30)
                this.TempFactor = 1.21;
            else
                this.TempFactor = 1.34;
        }

        // Apply temperature factor to compute NEm requirement (with stress)
        this.NEmCalf = (this.NEmCalf * (1 + this.TempFactor));

        // Recalculate ME for maintenance, since the NEm has been adjusted for temperature effects
        if (this.CalfKm != 0)
            this.MEMaint = this.NEmCalf / this.CalfKm;
        else
            this.MEMaint = 0;

        if (this.DietNEmCalf != 0)
            this.DMIForNEmCalf = this.NEmCalf / this.DietNEmCalf;
        else
            this.DMIForNEmCalf = 0;

        this.DMIForGrowth = (this.TotalDMFed - this.DMIForNEmCalf);
        this.NEFGCalf = this.DMIForGrowth * this.DietNEgCalf;


        if (this.CalfKg != 0)
            this.MEFGCalf = this.NEFGCalf / this.CalfKg;
        else
            this.MEFGCalf = 0;


        if (this.NEFGCalf > 0) {

            // The energy allowable ADG equation was derived from the following equation:
            //
            // NEgReq = 0.69 * (0.84 * CalfBW **.355) * (LWG ** 1.2)
            //
            //
            // I can re-write the equation in terms of LWG as follows:
            //
            // (LWG ** 1.2) = NEgReq / (0.69 * (0.84 * CalfBW ** .355))
            // (LWG ** 1.2) = (1.45 * NEgReq) / (0.84 * CalfBW ** .355)
            //
            //
            // Now take the log of both sides of the equation to get:
            // log ((LWG ** 1.2)) = log((1.45 * NEgReq) / (0.84 * CalfBW ** .355))
            // log ((LWG ** 1.2)) = log((1.73 * NEgReq) / (CalfBW ** .355))
            //
            //
            // Since log A**x = x * (log A), the equation can now be re-written as:
            //
            // 1.2 * (log LWG) = log((1.73 * NEgReq) / (CalfBW ** .355))
            // log LWG = 0.8333 * (log((1.73 * NEgReq) / (CalfBW ** .355)))
            //
            //
            // Finally, by using the fact that exp(log(A)) = A, we can re-write the original
            // equation as follows:
            //
            // LWG = exp(0.8333 * (log((1.73 * NEgReq) / (CalfBW ** .355))))

            this.EnergyADGCalf = Math.exp((0.8333 * (Math.log((1.19 * this.NEFGCalf) / (0.69 * (this.CalfBW ** 0.355))))));
        }
        else
            this.EnergyADGCalf = -9999;

        if (this.EnergyADGCalf > 0)
            this.CalfADG = this.EnergyADGCalf;
        else
            this.CalfADG = 0;

        // There is 30 g Nitrogen/kg gain ==> (30 g N)(6.25) = 187.5 g Net Protein/kg gain
        this.ProteinReqCalf = this.CalfADG * 0.188

        // Protein Supply

        TotalADP = ((TotalMilkCP * 0.93) + (TotalStarterCP * 0.75)) * 1000



        if ((TotalMilkCP + TotalStarterCP) > 0)
            ADP_to_CP = TotalADP / ((TotalMilkCP + TotalStarterCP) * 1000);
        else
            ADP_to_CP = 1;


        // Protein maintenance requirements
        this.EUN = 0.2 * (this.CalfBW ** 0.75);
        this.MFN = (this.MilkDMI * 1.9) + (this.StarterDMI * 3.3);

        if (TotalCP > 0)
            this.BV = (0.8 * (TotalMilkCP / TotalCP)) + (0.7 * (TotalStarterCP / TotalCP));
        else
            this.BV = 1;

        if (this.BV <= 0)
            this.BV = 1;

        this.ADPmaint = 6.25 * (((1 / this.BV) * (this.EUN + this.MFN)) - this.MFN);

        if (ADP_to_CP > 0)
            this.CPmCalf = this.ADPmaint / ADP_to_CP;
        else
            this.CPmCalf = 0;

        this.ADPgrowth = (this.ProteinReqCalf * 1000) / this.BV;

        if (ADP_to_CP > 0)
            this.CPgCalf = this.ADPgrowth / ADP_to_CP;
        else
            this.CPgCalf = 0;

        this.CalfADPBal = TotalADP - this.ADPmaint - this.ADPgrowth;
        this.CalfCPBal = (TotalCP * 1000) - this.CPmCalf - this.CPgCalf;

        this.ADPAllowGain = ((TotalADP - this.ADPmaint) * this.BV) / 0.188;

        this.CalfFat = Fat + ((Fat_Total / 100) * this.TotalRegDMFed)

        if (this.TotalDMFed > 0)
            this.DietFatCalf = this.CalfFat / this.TotalDMFed;
        else
            this.DietFatCalf = 0;
    }

    AminoAcidComputations() {
        let DMFed = 0;
        let NF = 0;
        let X = 0;

        if (this.NumFeeds > 0)
            NF = this.NumFeeds;
        else
            return;

        let TArg = 0;
        let THis = 0;
        let TIle = 0;
        let TLeu = 0;
        let TLys = 0;
        let TMet = 0;
        let TPhe = 0;
        let TThr = 0;
        let TTrp = 0;
        let TVal = 0;

        let Dig_TArg = 0;
        let Dig_THis = 0;
        let Dig_TIle = 0;
        let Dig_TLeu = 0;
        let Dig_TLys = 0;
        let Dig_TMet = 0;
        let Dig_TPhe = 0;
        let Dig_TThr = 0;
        let Dig_TTrp = 0;
        let Dig_TVal = 0;


        TArg = 0;
        THis = 0;
        TIle = 0;
        TLeu = 0;
        TLys = 0;
        TMet = 0;
        TPhe = 0;
        TThr = 0;
        TTrp = 0;
        TVal = 0;

        Dig_TArg = 0;
        Dig_THis = 0;
        Dig_TIle = 0;
        Dig_TLeu = 0;
        Dig_TLys = 0;
        Dig_TMet = 0;
        Dig_TPhe = 0;
        Dig_TThr = 0;
        Dig_TTrp = 0;
        Dig_TVal = 0;


        for (X = 1; X <= NF; X++) {

            DMFed = this.Feed[X].DMFed;
            if ((DMFed > 0) && (this.Feed[X].CP > 0) && (this.CP[X] > 0)) {

                TArg = TArg + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Arg / 100) * this.TotalDMFed) * 1000);
                THis = THis + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].His / 100) * this.TotalDMFed) * 1000);
                TIle = TIle + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Ile / 100) * this.TotalDMFed) * 1000);
                TLeu = TLeu + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Leu / 100) * this.TotalDMFed) * 1000);
                TLys = TLys + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Lys / 100) * this.TotalDMFed) * 1000);
                TMet = TMet + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Met / 100) * this.TotalDMFed) * 1000);
                TPhe = TPhe + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Phe / 100) * this.TotalDMFed) * 1000);
                TThr = TThr + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Thr / 100) * this.TotalDMFed) * 1000);
                TTrp = TTrp + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Trp / 100) * this.TotalDMFed) * 1000);
                TVal = TVal + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].Val / 100) * this.TotalDMFed) * 1000);

                Dig_TArg = Dig_TArg + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Arg / 100) * this.TotalDMFed) * 1000);
                Dig_THis = Dig_THis + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].His / 100) * this.TotalDMFed) * 1000);
                Dig_TIle = Dig_TIle + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Ile / 100) * this.TotalDMFed) * 1000);
                Dig_TLeu = Dig_TLeu + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Leu / 100) * this.TotalDMFed) * 1000);
                Dig_TLys = Dig_TLys + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Lys / 100) * this.TotalDMFed) * 1000);
                Dig_TMet = Dig_TMet + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Met / 100) * this.TotalDMFed) * 1000);
                Dig_TPhe = Dig_TPhe + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Phe / 100) * this.TotalDMFed) * 1000);
                Dig_TThr = Dig_TThr + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Thr / 100) * this.TotalDMFed) * 1000);
                Dig_TTrp = Dig_TTrp + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Trp / 100) * this.TotalDMFed) * 1000);
                Dig_TVal = Dig_TVal + (((DMFed / this.TotalDMFed) * (this.Feed[X].CP / 100) * ((this.RUP[X] * 1000) / this.CP[X]) * (this.Feed[X].RUPDigest / 100) * (this.Feed[X].Val / 100) * this.TotalDMFed) * 1000);
            }

        }


        let EAATotalBeforeMP = 0;
        let x1 = 0;
        let x2 = 0;
        let TotalArg = 0;
        let TotalHis = 0;
        let TotalIle = 0;
        let TotalLeu = 0;
        let TotalLys = 0;
        let TotalMet = 0;
        let TotalPhe = 0;
        let TotalThr = 0;
        let TotalVal = 0;


        EAATotalBeforeMP = (TArg + THis + TIle + TLeu + TLys + TMet + TPhe + TThr + TTrp + TVal);

        if (((this.RUP_Total * 1000) + this.EndCP + this.MCP_Total) > 0)
            x2 = ((this.RUP_Total * 1000) / ((this.RUP_Total * 1000) + this.EndCP + this.MCP_Total)) * 100;
        else
            x2 = 0;

        if (EAATotalBeforeMP > 0)
            x1 = ((TArg / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalArg = 7.31 + (0.251 * x1);

        if (EAATotalBeforeMP > 0)
            x1 = ((THis / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalHis = 2.07 + (0.393 * x1) + (0.0122 * x2);

        if (EAATotalBeforeMP > 0)
            x1 = ((TIle / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalIle = 7.59 + (0.391 * x1) - (0.0123 * x2);


        if (EAATotalBeforeMP > 0)
            x1 = ((TLeu / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalLeu = 8.53 + (0.41 * x1) + (0.0746 * x2);


        if (EAATotalBeforeMP > 0)
            x1 = ((TLys / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalLys = 13.66 + (0.3276 * x1) - (0.07497 * x2);


        if (EAATotalBeforeMP > 0)
            x1 = ((TMet / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalMet = 2.9 + (0.391 * x1) - (0.00742 * x2);


        if (EAATotalBeforeMP > 0)
            x1 = ((TPhe / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalPhe = 7.32 + (0.244 * x1) + (0.029 * x2);


        if (EAATotalBeforeMP > 0)
            x1 = ((TThr / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalThr = 7.55 + (0.45 * x1) - (0.0212 * x2);

        if (EAATotalBeforeMP > 0)
            x1 = ((TVal / EAATotalBeforeMP) * 100);
        else
            x1 = 0;

        TotalVal = 8.68 + (0.314 * x1);
        this.TotalEAA = 30.9 + (0.863 * EAATotalBeforeMP) + (0.433 * this.MCP_Total);

        let TotalRUPArgFlow = 0;
        let TotalRUPHisFlow = 0;
        let TotalRUPIleFlow = 0;
        let TotalRUPLeuFlow = 0;
        let TotalRUPLysFlow = 0;
        let TotalRUPMetFlow = 0;
        let TotalRUPPheFlow = 0;
        let TotalRUPThrFlow = 0;
        let TotalRUPTrpFlow = 0;
        let TotalRUPValFlow = 0;


        TotalRUPArgFlow = 0.863 * TArg;
        TotalRUPHisFlow = 0.863 * THis;
        TotalRUPIleFlow = 0.863 * TIle;
        TotalRUPLeuFlow = 0.863 * TLeu;
        TotalRUPLysFlow = 0.863 * TLys;
        TotalRUPMetFlow = 0.863 * TMet;
        TotalRUPPheFlow = 0.863 * TPhe;
        TotalRUPThrFlow = 0.863 * TThr;
        TotalRUPTrpFlow = 0.863 * TTrp;
        TotalRUPValFlow = 0.863 * TVal;

        //Duodenal Flow (g/d)
        this.Arg_Flow = (TotalArg / 100) * this.TotalEAA
        this.His_Flow = (TotalHis / 100) * this.TotalEAA
        this.Ile_Flow = (TotalIle / 100) * this.TotalEAA
        this.Leu_Flow = (TotalLeu / 100) * this.TotalEAA
        this.Lys_Flow = (TotalLys / 100) * this.TotalEAA
        this.Met_Flow = (TotalMet / 100) * this.TotalEAA
        this.Phe_Flow = (TotalPhe / 100) * this.TotalEAA
        this.Thr_Flow = (TotalThr / 100) * this.TotalEAA
        this.Val_Flow = (TotalVal / 100) * this.TotalEAA

        let TotalMCPEndArgFlow = 0;
        let TotalMCPEndHisFlow = 0;
        let TotalMCPEndIleFlow = 0;
        let TotalMCPEndLeuFlow = 0;
        let TotalMCPEndLysFlow = 0;
        let TotalMCPEndMetFlow = 0;
        let TotalMCPEndPheFlow = 0;
        let TotalMCPEndThrFlow = 0;
        let TotalMCPEndValFlow = 0;

        TotalMCPEndArgFlow = this.Arg_Flow - TotalRUPArgFlow;
        TotalMCPEndHisFlow = this.His_Flow - TotalRUPHisFlow;
        TotalMCPEndIleFlow = this.Ile_Flow - TotalRUPIleFlow;
        TotalMCPEndLeuFlow = this.Leu_Flow - TotalRUPLeuFlow;
        TotalMCPEndLysFlow = this.Lys_Flow - TotalRUPLysFlow;
        TotalMCPEndMetFlow = this.Met_Flow - TotalRUPMetFlow;
        TotalMCPEndPheFlow = this.Phe_Flow - TotalRUPPheFlow;
        TotalMCPEndThrFlow = this.Thr_Flow - TotalRUPThrFlow;
        TotalMCPEndValFlow = this.Val_Flow - TotalRUPValFlow;



        let dTotalRUPArg = 0;
        let dTotalRUPHis = 0;
        let dTotalRUPIle = 0;
        let dTotalRUPLeu = 0;
        let dTotalRUPLys = 0;
        let dTotalRUPMet = 0;
        let dTotalRUPPhe = 0;
        let dTotalRUPThr = 0;
        let dTotalRUPVal = 0;

        let dTotalMCPEndArg = 0;
        let dTotalMCPEndHis = 0;
        let dTotalMCPEndIle = 0;
        let dTotalMCPEndLeu = 0;
        let dTotalMCPEndLys = 0;
        let dTotalMCPEndMet = 0;
        let dTotalMCPEndPhe = 0;
        let dTotalMCPEndThr = 0;
        let dTotalMCPEndVal = 0;

        if (TArg > 0)
            dTotalRUPArg = TotalRUPArgFlow * (Dig_TArg / TArg);
        else
            dTotalRUPArg = 0;

        if (THis > 0)
            dTotalRUPHis = TotalRUPHisFlow * (Dig_THis / THis);
        else
            dTotalRUPHis = 0;

        if (TIle > 0)
            dTotalRUPIle = TotalRUPIleFlow * (Dig_TIle / TIle);
        else
            dTotalRUPIle = 0;

        if (TLeu > 0)
            dTotalRUPLeu = TotalRUPLeuFlow * (Dig_TLeu / TLeu);
        else
            dTotalRUPLeu = 0;

        if (TLys > 0)
            dTotalRUPLys = TotalRUPLysFlow * (Dig_TLys / TLys);
        else
            dTotalRUPLys = 0;

        if (TMet > 0)
            dTotalRUPMet = TotalRUPMetFlow * (Dig_TMet / TMet);
        else
            dTotalRUPMet = 0;

        if (TPhe > 0)
            dTotalRUPPhe = TotalRUPPheFlow * (Dig_TPhe / TPhe);
        else
            dTotalRUPPhe = 0;

        if (TThr > 0)
            dTotalRUPThr = TotalRUPThrFlow * (Dig_TThr / TThr);
        else
            dTotalRUPThr = 0;

        if (TVal > 0)
            dTotalRUPVal = TotalRUPValFlow * (Dig_TVal / TVal);
        else
            dTotalRUPVal = 0;


        dTotalMCPEndArg = 0.8 * TotalMCPEndArgFlow;
        dTotalMCPEndHis = 0.8 * TotalMCPEndHisFlow;
        dTotalMCPEndIle = 0.8 * TotalMCPEndIleFlow;
        dTotalMCPEndLeu = 0.8 * TotalMCPEndLeuFlow;
        dTotalMCPEndLys = 0.8 * TotalMCPEndLysFlow;
        dTotalMCPEndMet = 0.8 * TotalMCPEndMetFlow;
        dTotalMCPEndPhe = 0.8 * TotalMCPEndPheFlow;
        dTotalMCPEndThr = 0.8 * TotalMCPEndThrFlow;
        dTotalMCPEndVal = 0.8 * TotalMCPEndValFlow;

        this.Dig_Arg_Flow = dTotalRUPArg + dTotalMCPEndArg;
        this.Dig_His_Flow = dTotalRUPHis + dTotalMCPEndHis;
        this.Dig_Ile_Flow = dTotalRUPIle + dTotalMCPEndIle;
        this.Dig_Leu_Flow = dTotalRUPLeu + dTotalMCPEndLeu;
        this.Dig_Lys_Flow = dTotalRUPLys + dTotalMCPEndLys;
        this.Dig_Met_Flow = dTotalRUPMet + dTotalMCPEndMet;
        this.Dig_Phe_Flow = dTotalRUPPhe + dTotalMCPEndPhe;
        this.Dig_Thr_Flow = dTotalRUPThr + dTotalMCPEndThr;
        this.Dig_Val_Flow = dTotalRUPVal + dTotalMCPEndVal;

        this.MPBact = 0.64 * this.MCP_Total;
        this.MPFeed = this.TotalDigestedRUP;

        if ((this.MPBact + (this.MPFeed * 1000) + this.MPEndo) > 0) {
            this.ArgPctMP = 100 * (this.Dig_Arg_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.HisPctMP = 100 * (this.Dig_His_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.IlePctMP = 100 * (this.Dig_Ile_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.LeuPctMP = 100 * (this.Dig_Leu_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.LysPctMP = 100 * (this.Dig_Lys_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.MetPctMP = 100 * (this.Dig_Met_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.PhePctMP = 100 * (this.Dig_Phe_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.ThrPctMP = 100 * (this.Dig_Thr_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
            this.ValPctMP = 100 * (this.Dig_Val_Flow / (this.MPBact + (this.MPFeed * 1000) + this.MPEndo));
        }
        else {
            this.ArgPctMP = 0;
            this.HisPctMP = 0;
            this.IlePctMP = 0;
            this.LeuPctMP = 0;
            this.LysPctMP = 0;
            this.MetPctMP = 0;
            this.PhePctMP = 0;
            this.ThrPctMP = 0;
            this.ValPctMP = 0;
        }

    }

    FeedBalance() {
        let TotalBal;
        TotalBal = ((this.DMIPred - this.DMIActual) + (this.NEl_Total - (this.NEMaint + this.NEPreg + this.NELact + this.NEGrowth)) + this.RDPBal + this.RUPBal + this.MPBalance + this.Mineral[1].Balance + this.Mineral[2].Balance + (this.Mineral[1].Balance / this.Mineral[2].Balance) + (this.RDPBal + this.RUPBal))


        this.Feed[1].Price = 0.5;
        this.Feed[2].Price = 0.2;
        this.Feed[3].Price = 0.65;
        this.Feed[4].Price = 0.23;
        this.Feed[5].Price = 0.48;

        let PriceTotal = 0;
        var TotalPrice;
        for (let i = 1; i <= this.NumFeeds; i++) {
            TotalPrice = this.FeedList[i] * this.Feed[i].Price;

            PriceTotal += TotalPrice;
        }


        return {
            balance: TotalBal,
            price: PriceTotal
        };
    }

    deneme1(tfeed) {
        this.Feed = []
        for (let i = 1; i <= 5; i++) {
            if (this.AnimalType == "Young Calf")
                this.Feed[i] = new FeedTypeCalf()
            else
                this.Feed[i] = new FeedType(tfeed)
        }
        this.TotalDMFed = 12349;
        this.NumFeeds = 5;
        this.Age = 58;
        this.BW = 680;
        this.DaysPreg = 270;
        this.CS = 5;
        this.DaysInMilk = 90;
        this.FirstCalf = 24;
        this.CalfInt = 12;
        this.MW = 680;
        this.CBW = 45;
        this.ShowMilkTrue = true;
        this.Temp = 20;
        this.Metric = true;
        this.DryMatterBasis = true;


        this.AnimalType = "Dry Cow";
        this.Breed = "Holstein";
        this.Grazing = false;
        this.HeatStress = "None";
        this.CoatCond = "Clean/Dry";

        for (let feed of this.Feed.filter(a => a))
            feed.data = []

        this.Feed[1].name = "Corn Silage, Normal";
        this.Feed[1].data.DMFed = 3.134;
        this.Feed[1].category = "Grain Crop Forage";
        this.Feed[1].IFN = "3-28-248";
        this.Feed[1].EnergyEqClass = "Forage";
        this.Feed[1].ForageDescrp = "Wet";

        this.Feed[1].data.PAF = 0.94;
        this.Feed[1].data.TDN = 68.79;
        this.Feed[1].data.DE = 2.99;
        this.Feed[1].data.DM = 35.1
        this.Feed[1].data.NDF = 45
        this.Feed[1].data.ADF = 28.1
        this.Feed[1].data.Lignin = 2.6
        this.Feed[1].data.CP = 8.8
        this.Feed[1].data.NDFIP = 1.3
        this.Feed[1].data.ADFIP = 0.8
        this.Feed[1].data.PrtA = 51.3
        this.Feed[1].data.PrtB = 30.2
        this.Feed[1].data.PrtC = 18.5
        this.Feed[1].data.Kd = 4.4
        this.Feed[1].data.RUPDigest = 70
        this.Feed[1].data.Fat = 3.2
        this.Feed[1].data.Ash = 4.3
        this.Feed[1].data.CPDigest = 1
        this.Feed[1].data.NDFDigest = 0.58
        this.Feed[1].data.FatDigest = 1
        this.Feed[1].data.Ca = 0.28
        this.Feed[1].data.P = 0.26
        this.Feed[1].data.Mg = 0.17
        this.Feed[1].data.Cl = 0.29
        this.Feed[1].data.K = 1.2
        this.Feed[1].data.Na = 0.01
        this.Feed[1].data.s = 0.14
        this.Feed[1].data.Co = 0
        this.Feed[1].data.Cu = 5.7
        this.Feed[1].data.I = 0
        this.Feed[1].data.Fe = 104
        this.Feed[1].data.Mn = 36
        this.Feed[1].data.Se = 0.04
        this.Feed[1].data.Zn = 24
        this.Feed[1].data.VitA = 0;
        this.Feed[1].data.VitD = 0
        this.Feed[1].data.VitE = 0
        this.Feed[1].data.Arg = 1.97
        this.Feed[1].data.His = 1.79
        this.Feed[1].data.Ile = 3.34
        this.Feed[1].data.Leu = 8.59
        this.Feed[1].data.Lys = 2.51
        this.Feed[1].data.Met = 1.53
        this.Feed[1].data.Phe = 3.83
        this.Feed[1].data.Thr = 3.19
        this.Feed[1].data.Trp = 0.44
        this.Feed[1].data.Val = 4.47
        this.Feed[1].data.CaBio = 0.6
        this.Feed[1].data.PBio = 0.7
        this.Feed[1].data.MgBio = 0.16
        this.Feed[1].data.ClBio = 0.9
        this.Feed[1].data.KBio = 0.9
        this.Feed[1].data.NaBio = 0.9
        this.Feed[1].data.SBio = 1
        this.Feed[1].data.CoBio = 1
        this.Feed[1].data.CuBio = 0.04
        this.Feed[1].data.IBio = 0.85
        this.Feed[1].data.FeBio = 0.1
        this.Feed[1].data.MnBio = 0.0075
        this.Feed[1].data.SeBio = 1
        this.Feed[1].data.ZnBio = 0.15




        this.Feed[2].name = "Grass Silage, C-3, mid mat."
        this.Feed[2].data.DMFed = 7.311
        this.Feed[2].category = "Grass/Legume Forage"
        this.Feed[2].IFN = "3-02-218"
        this.Feed[2].EnergyEqClass = "Forage"
        this.Feed[2].ForageDescrp = "Wet"

        this.Feed[2].data.PAF = 1
        this.Feed[2].data.TDN = 55.71
        this.Feed[2].data.DE = 2.55
        this.Feed[2].data.DM = 42
        this.Feed[2].data.NDF = 58.2
        this.Feed[2].data.ADF = 35.2
        this.Feed[2].data.Lignin = 6.8
        this.Feed[2].data.CP = 16.8
        this.Feed[2].data.NDFIP = 4.3
        this.Feed[2].data.ADFIP = 1.1
        this.Feed[2].data.PrtA = 60.4
        this.Feed[2].data.PrtB = 31
        this.Feed[2].data.PrtC = 8.6
        this.Feed[2].data.Kd = 4.8
        this.Feed[2].data.RUPDigest = 60
        this.Feed[2].data.Fat = 2.4
        this.Feed[2].data.Ash = 8.7
        this.Feed[2].data.CPDigest = 1
        this.Feed[2].data.NDFDigest = 0.45
        this.Feed[2].data.FatDigest = 1
        this.Feed[2].data.Ca = 0.6
        this.Feed[2].data.P = 0.36
        this.Feed[2].data.Mg = 0.21
        this.Feed[2].data.Cl = 0.67
        this.Feed[2].data.K = 2.78
        this.Feed[2].data.Na = 0.05
        this.Feed[2].data.s = 0.21
        this.Feed[2].data.Co = 0
        this.Feed[2].data.Cu = 9
        this.Feed[2].data.I = 0
        this.Feed[2].data.Fe = 275
        this.Feed[2].data.Mn = 79
        this.Feed[2].data.Se = 0.09
        this.Feed[2].data.Zn = 31
        this.Feed[2].data.VitA = 0
        this.Feed[2].data.VitD = 0
        this.Feed[2].data.VitE = 0
        this.Feed[2].data.Arg = 3.06
        this.Feed[2].data.His = 1.66
        this.Feed[2].data.Ile = 3.57
        this.Feed[2].data.Leu = 6.12
        this.Feed[2].data.Lys = 3.28
        this.Feed[2].data.Met = 1.21
        this.Feed[2].data.Phe = 4.37
        this.Feed[2].data.Thr = 3.34
        this.Feed[2].data.Trp = 1.07
        this.Feed[2].data.Val = 4.89
        this.Feed[2].data.CaBio = 0.3
        this.Feed[2].data.PBio = 0.64
        this.Feed[2].data.MgBio = 0.16
        this.Feed[2].data.ClBio = 0.9
        this.Feed[2].data.KBio = 0.9
        this.Feed[2].data.NaBio = 0.9
        this.Feed[2].data.SBio = 1
        this.Feed[2].data.CoBio = 1
        this.Feed[2].data.CuBio = 0.04
        this.Feed[2].data.IBio = 0.85
        this.Feed[2].data.FeBio = 0.1
        this.Feed[2].data.MnBio = 0.0075
        this.Feed[2].data.SeBio = 1
        this.Feed[2].data.ZnBio = 0.15





        this.Feed[3].name = "Wheat Straw"
        this.Feed[3].data.DMFed = 1.469
        this.Feed[3].category = "Grain Crop Forage"
        this.Feed[3].IFN = "1-05-175"
        this.Feed[3].EnergyEqClass = "Forage"
        this.Feed[3].ForageDescrp = "Dry"
        this.Feed[3].data.PAF = 1
        this.Feed[3].data.TDN = 47.52
        this.Feed[3].data.DE = 2.04
        this.Feed[3].data.DM = 92.7
        this.Feed[3].data.NDF = 73
        this.Feed[3].data.ADF = 49.4
        this.Feed[3].data.Lignin = 8.8
        this.Feed[3].data.CP = 4.8
        this.Feed[3].data.NDFIP = 2.1
        this.Feed[3].data.ADFIP = 1.4
        this.Feed[3].data.PrtA = 9.3
        this.Feed[3].data.PrtB = 51.4
        this.Feed[3].data.PrtC = 39.3
        this.Feed[3].data.Kd = 1.4
        this.Feed[3].data.RUPDigest = 65
        this.Feed[3].data.Fat = 1.6
        this.Feed[3].data.Ash = 7.6
        this.Feed[3].data.CPDigest = 1
        this.Feed[3].data.NDFDigest = 0.48
        this.Feed[3].data.FatDigest = 1
        this.Feed[3].data.Ca = 0.31
        this.Feed[3].data.P = 0.1
        this.Feed[3].data.Mg = 0.14
        this.Feed[3].data.Cl = 0.6
        this.Feed[3].data.K = 1.55
        this.Feed[3].data.Na = 0.12
        this.Feed[3].data.s = 0.11
        this.Feed[3].data.Co = 0
        this.Feed[3].data.Cu = 6
        this.Feed[3].data.I = 0
        this.Feed[3].data.Fe = 172
        this.Feed[3].data.Mn = 67
        this.Feed[3].data.Se = 0
        this.Feed[3].data.Zn = 16
        this.Feed[3].data.VitA = 0
        this.Feed[3].data.VitD = 0
        this.Feed[3].data.VitE = 0
        this.Feed[3].data.Arg = 1.08
        this.Feed[3].data.His = 1.64
        this.Feed[3].data.Ile = 1.78
        this.Feed[3].data.Leu = 3.25
        this.Feed[3].data.Lys = 3.25
        this.Feed[3].data.Met = 1.19
        this.Feed[3].data.Phe = 2.08
        this.Feed[3].data.Thr = 3.25
        this.Feed[3].data.Trp = 1.42
        this.Feed[3].data.Val = 2.67
        this.Feed[3].data.CaBio = 0.3
        this.Feed[3].data.PBio = 0.64
        this.Feed[3].data.MgBio = 0.16
        this.Feed[3].data.ClBio = 0.9
        this.Feed[3].data.KBio = 0.9
        this.Feed[3].data.NaBio = 0.9
        this.Feed[3].data.SBio = 1
        this.Feed[3].data.CoBio = 1
        this.Feed[3].data.CuBio = 0.04
        this.Feed[3].data.IBio = 0.085
        this.Feed[3].data.FeBio = 0.1
        this.Feed[3].data.MnBio = 0.0075
        this.Feed[3].data.SeBio = 1
        this.Feed[3].data.ZnBio = 0.15


        this.Feed[4].name = "Salt";
        this.Feed[4].data.DMFed = 0.02;
        this.Feed[4].category = "Vitamin/Mineral";
        this.Feed[4].IFN = "6-04-152"
        this.Feed[4].EnergyEqClass = "Vitamin/Mineral";
        this.Feed[4].ForageDescrp = "Concentrate";
        this.Feed[4].data.PAF = 1;
        this.Feed[4].data.TDN = 0;
        this.Feed[4].data.DE = 0
        this.Feed[4].data.DM = 100
        this.Feed[4].data.NDF = 0
        this.Feed[4].data.ADF = 0
        this.Feed[4].data.Lignin = 0
        this.Feed[4].data.CP = 0
        this.Feed[4].data.NDFIP = 0
        this.Feed[4].data.ADFIP = 0
        this.Feed[4].data.PrtA = 0
        this.Feed[4].data.PrtB = 0
        this.Feed[4].data.PrtC = 0
        this.Feed[4].data.Kd = 0
        this.Feed[4].data.RUPDigest = 0
        this.Feed[4].data.Fat = 0
        this.Feed[4].data.Ash = 100
        this.Feed[4].data.CPDigest = 1
        this.Feed[4].data.NDFDigest = 0
        this.Feed[4].data.FatDigest = 1
        this.Feed[4].data.Ca = 0
        this.Feed[4].data.P = 0
        this.Feed[4].data.Mg = 0
        this.Feed[4].data.Cl = 60.66
        this.Feed[4].data.K = 0
        this.Feed[4].data.Na = 39.34
        this.Feed[4].data.s = 0
        this.Feed[4].data.Co = 0
        this.Feed[4].data.Cu = 0
        this.Feed[4].data.I = 0
        this.Feed[4].data.Fe = 0
        this.Feed[4].data.Mn = 0
        this.Feed[4].data.Se = 0
        this.Feed[4].data.Zn = 0
        this.Feed[4].data.VitA = 0
        this.Feed[4].data.VitD = 0
        this.Feed[4].data.VitE = 0
        this.Feed[4].data.Arg = 0
        this.Feed[4].data.His = 0
        this.Feed[4].data.Ile = 0
        this.Feed[4].data.Leu = 0
        this.Feed[4].data.Lys = 0
        this.Feed[4].data.Met = 0
        this.Feed[4].data.Phe = 0
        this.Feed[4].data.Thr = 0
        this.Feed[4].data.Trp = 0
        this.Feed[4].data.Val = 0
        this.Feed[4].data.CaBio = 0.6
        this.Feed[4].data.PBio = 0.7
        this.Feed[4].data.MgBio = 0.16
        this.Feed[4].data.ClBio = 0.9
        this.Feed[4].data.KBio = 0.9
        this.Feed[4].data.NaBio = 0.9
        this.Feed[4].data.SBio = 1
        this.Feed[4].data.CoBio = 1
        this.Feed[4].data.CuBio = 0.04
        this.Feed[4].data.IBio = 0.85
        this.Feed[4].data.FeBio = 0.1
        this.Feed[4].data.MnBio = 0.0075
        this.Feed[4].data.SeBio = 1
        this.Feed[4].data.ZnBio = 0.15



        this.Feed[5].name = "Vitamin premix 1"
        this.Feed[5].data.DMFed = 0.433
        this.Feed[5].category = "Vitamin/Mineral";
        this.Feed[5].IFN = "None";
        this.Feed[5].EnergyEqClass = "Vitamin/Mineral";
        this.Feed[5].ForageDescrp = "Concentrate"
        this.Feed[5].data.PAF = 1
        this.Feed[5].data.TDN = 0
        this.Feed[5].data.DE = 0
        this.Feed[5].data.DM = 100
        this.Feed[5].data.NDF = 0
        this.Feed[5].data.ADF = 0
        this.Feed[5].data.Lignin = 0
        this.Feed[5].data.CP = 0
        this.Feed[5].data.NDFIP = 0
        this.Feed[5].data.ADFIP = 0
        this.Feed[5].data.PrtA = 0
        this.Feed[5].data.PrtB = 0
        this.Feed[5].data.PrtC = 0
        this.Feed[5].data.Kd = 0
        this.Feed[5].data.RUPDigest = 100
        this.Feed[5].data.Fat = 0
        this.Feed[5].data.Ash = 0
        this.Feed[5].data.CPDigest = 1
        this.Feed[5].data.NDFDigest = 0
        this.Feed[5].data.FatDigest = 1
        this.Feed[5].data.Ca = 0
        this.Feed[5].data.P = 0
        this.Feed[5].data.Mg = 0
        this.Feed[5].data.Cl = 0
        this.Feed[5].data.K = 0
        this.Feed[5].data.Na = 0
        this.Feed[5].data.s = 0
        this.Feed[5].data.Co = 0
        this.Feed[5].data.Cu = 0
        this.Feed[5].data.I = 0
        this.Feed[5].data.Fe = 0
        this.Feed[5].data.Mn = 0
        this.Feed[5].data.Se = 0
        this.Feed[5].data.Zn = 0
        this.Feed[5].data.VitA = 2500
        this.Feed[5].data.VitD = 400
        this.Feed[5].data.VitE = 1000
        this.Feed[5].data.Arg = 0
        this.Feed[5].data.His = 0
        this.Feed[5].data.Ile = 0
        this.Feed[5].data.Leu = 0
        this.Feed[5].data.Lys = 0
        this.Feed[5].data.Met = 0
        this.Feed[5].data.Phe = 0
        this.Feed[5].data.Thr = 0
        this.Feed[5].data.Trp = 0
        this.Feed[5].data.Val = 0
        this.Feed[5].data.CaBio = 0.6
        this.Feed[5].data.PBio = 0.7
        this.Feed[5].data.MgBio = 0.16
        this.Feed[5].data.ClBio = 0.9
        this.Feed[5].data.KBio = 0.9
        this.Feed[5].data.NaBio = 0.9
        this.Feed[5].data.SBio = 1
        this.Feed[5].data.CoBio = 1
        this.Feed[5].data.CuBio = 0.04
        this.Feed[5].data.IBio = 0.85
        this.Feed[5].data.FeBio = 0.1
        this.Feed[5].data.MnBio = 0.0075
        this.Feed[5].data.SeBio = 1
        this.Feed[5].data.ZnBio = 0.15
    }

    returnFeeds() {
        for (let feed of this.Feed.filter(a => a)) {
            const temp = feed.data
            feed.data = []
            for (let key in temp)
                feed.data.push({ name: key, value: temp[key] })
        }
        return this.Feed
    }

    balance(x) {
        if (!x || x.length == 0) return
        //console.log(x)
        for (let i = 1; i <= this.NumFeeds; i++) {
            const _temp = (x[i - 1] * this.DMIPred) / 100
        }
        this.calculateTable()

        let TotalBal = (Math.abs(this.NEl_Total - (this.NEMaint + this.NEPreg + this.NELact + this.NEGrowth)) + Math.abs(this.RDPBal) + Math.abs(this.RUPBal) +
            Math.abs(this.MPBalance) + Math.abs(this.Mineral[1].Balance) + Math.abs(this.Mineral[2].Balance) + Math.abs(this.Mineral[3].Balance) + Math.abs(this.Mineral[4].Balance) + Math.abs(this.Mineral[5].Balance) +
            Math.abs(this.Mineral[6].Balance) + Math.abs(this.Mineral[7].Balance) + Math.abs((this.Mineral[1].Balance / this.Mineral[2].Balance)))


        return TotalBal
    }

    optimize() {
        // create the optimizer
        this.sayac = 0;
        this.calculateTable()
        var optimizer = new pso.Optimizer(this.Feed.filter(a => a), this.AnimalType == "Lactating Cow" ? 40 : this.AnimalType == "Dry Cow" ? 70 : this.AnimalType == "Replacement Heifer" ? 80 : 20);

        // set the objective function
        optimizer.setObjectiveFunction(x => this.balance(x));

        // set an initial population of X particles spread across the search space *[-10, 10] x [-10, 10]*

        const _a = this.FeedList.filter(a => a).map(a => ({ start: 0, end: 20 }))
        optimizer.init(20, _a)


        // run the optimizer X iterations
        for (var i = 0; i < 100; i++) {
            optimizer.step();
        }

        console.log(optimizer.getBestFitness())
        console.log(optimizer.getBestPosition())

        this.Feed.filter(a => a).forEach((a, index) => a.DMFed = ((optimizer.getBestPosition()[index] * this.DMIPred) / 100).toFixed(4))
        this.Feed.filter(a => a).forEach((a, index) => a.DMC = ((a.DMFed * 100) / a.DM).toFixed(4))
        this.Feed.filter(a => a).forEach((a, index) => a.Price = (a.DM * a.Price).toFixed(4))

        this.calculateTable()
        return {
            bestFitness: optimizer.getBestFitness(),
            bestPosition: optimizer.getBestPosition().map(a => a.toFixed(4)),
            dmCalculated: optimizer.getBestPosition().map(a => (a * this.DMIPred) / 100).reduce((a, b) => a += b, 0),
            table: this.tableReturn()
        }

    }
}