module.exports = class FeedType {

    /* constructor(DMFed, name, Price, ReadOnly, category, IFN, TDN, EnergyEqClass, ForageDescrp, PAF, DE, DM, NDF, ADF, Lignin, CP, NDFIP, ADFIP, PrtA, PrtB,
        PrtC, Kd, RUPDigest, Fat, Ash, Ca, CaBio, P, PBio, Mg, MgBio, Cl, ClBio, K, KBio, Na, NaBio, S, sBio, Co, CoBio, Cu, CuBio, I, IBio, Fe, FeBio, Mn,
        MnBio, Se, SeBio, Zn, ZnBio, Met, Lys, Arg, His, Ile, Leu, Cys, Phe, Thr, Trp, Val, VitA, VitD, VitE, NFCDigest, CPDigest, FatDigest, TDN_ActX, DiscDE, MEforNEg,
        MEng, NEl, NEg, NEm)
         */
    constructor(feed) {

        this.DMFed = feed.DMFed ?? 0;
        this.Name = feed.Name;
        this.Price = feed.Price;
        this.Category = feed.Category;
        this.IFN = feed.IFN
        this.EnergyEqClass = feed.EnergyEqClass
        this.ForageDescrp = feed.ForageDescrp
        this.ReadOnly = feed.ReadOnly ?? true;
        this.TDN = feed.data.TDN ?? 0
        this.PAF = feed.data.PAF ?? 0
        this.DE = feed.data.DE ?? 0
        this.DM = feed.data.DM ?? 0
        this.NDF = feed.data.NDF ?? 0
        this.ADF = feed.data.ADF ?? 0
        this.Lignin = feed.data.Lignin ?? 0
        this.CP = feed.data.CP ?? 0
        this.NDFIP = feed.data.NDFIP ?? 0
        this.ADFIP = feed.data.ADFIP ?? 0
        this.PrtA = feed.data.PrtA ?? 0
        this.PrtB = feed.data.PrtB ?? 0
        this.PrtC = feed.data.PrtC ?? 0
        this.Kd = feed.data.Kd ?? 0
        this.RUPDigest = feed.data.RUPDigest ?? 0
        this.Fat = feed.data.Fat ?? 0
        this.Ash = feed.data.Ash ?? 0
        this.Ca = feed.data.Ca ?? 0
        this.CaBio = feed.data.CaBio ?? 0
        this.P = feed.data.P ?? 0
        this.PBio = feed.data.PBio ?? 0
        this.Mg = feed.data.Mg ?? 0
        this.MgBio = feed.data.MgBio ?? 0
        this.Cl = feed.data.Cl ?? 0
        this.ClBio = feed.data.ClBio ?? 0
        this.K = feed.data.K ?? 0
        this.KBio = feed.data.KBio ?? 0
        this.Na = feed.data.Na ?? 0
        this.NaBio = feed.data.NaBio ?? 0
        this.s = feed.data.S ?? 0
        this.SBio = feed.data.SBio ?? 0
        this.Co = feed.data.Co ?? 0
        this.CoBio = feed.data.CoBio
        this.Cu = feed.data.Cu ?? 0
        this.CuBio = feed.data.CuBio ?? 0
        this.I = feed.data.I ?? 0
        this.IBio = feed.data.IBio ?? 0
        this.Fe = feed.data.Fe ?? 0
        this.FeBio = feed.data.FeBio ?? 0
        this.Mn = feed.data.Mn ?? 0
        this.MnBio = feed.data.MnBio ?? 0
        this.Se = feed.data.Se ?? 0
        this.SeBio = feed.data.SeBio ?? 0
        this.Zn = feed.data.Zn ?? 0
        this.ZnBio = feed.data.ZnBio ?? 0
        this.Met = feed.data.Met ?? 0
        this.Lys = feed.data.Lys ?? 0
        this.Arg = feed.data.Arg ?? 0
        this.His = feed.data.His ?? 0
        this.Ile = feed.data.Ile ?? 0
        this.Leu = feed.data.Leu ?? 0
        this.Cys = feed.data.Cys ?? 0
        this.Phe = feed.data.Phe ?? 0
        this.Thr = feed.data.Thr ?? 0
        this.Trp = feed.data.Trp ?? 0
        this.Val = feed.data.Val ?? 0
        this.VitA = feed.data.VitA ?? 0
        this.VitD = feed.data.VitD ?? 0
        this.VitE = feed.data.VitE ?? 0
        this.NFCDigest = feed.data.NFCDigest ?? 0
        this.CPDigest = feed.data.CPDigest ?? 0
        this.FatDigest = feed.data.FatDigest ?? 0


        this.TDN_ActX = feed.data.TDN_ActX ?? 0
        this.DiscDE = feed.data.DiscDE ?? 0
        this.MEforNEg = feed.data.MEforNEg ?? 0
        this.MEng = feed.data.MEng ?? 0
        this.NEl = feed.data.NEl ?? 0
        this.NEg = feed.data.NEg ?? 0
        this.NEm = feed.data.NEm ?? 0
    }
}

/*
    "name": "Corn Silage",
    "category": "62d9b501e9bb59cb4cdb8dbe",
    "IFN": "3-28-248",
    "EnergyEqClass": "Forage",
    "ForageDescrp": "Wet",
    "data":{
        "DMFed": 3134,
        "TDN": 6878851,
        "PAF": 94,
        "DE": 2992485,
        "DM": 351,
        "NDF": 45,
        "ADF": 281,
        "Lignin": 26,
        "CP": 88,
        "NDFIP": 13,
        "ADFIP": 8, 
        "PrtA": 513, 
        "PrtB": 302,
        "PrtC": 183, 
        "Kd": 44, 
        "RUPDigest": 70,
        "Fat": 32, 
        "Ash": 43,
        "Ca": 28, 
        "CaBio": 6, 
        "P": 26, 
        "PBio": 7, 
        "Mg": 17,
        "MgBio": 16,
        "Cl": 29,
        "ClBio": 9, 
        "K": 12, 
        "KBio": 9, 
        "Na": 1,
        "NaBio": 9,
        "S": 14, 
        "SBio": 1,
        "Co": 0.65, 
        "CoBio": 1, 
        "Cu": 57,
        "CuBio": 4, 
        "I": 0, 
        "IBio": 85, 
        "Fe": 104, 
        "FeBio": 1,
        "Mn": 36,
        "MnBio": 75,
        "Se": 4, 
        "SeBio": 1, 
        "Zn": 24, 
        "ZnBio": 15, 
        "Met": 153, 
        "Lys": 251, 
        "Arg": 194, 
        "His": 179, 
        "Ile": 334, 
        "Leu": 859, 
        "Cys": 0,
        "Phe": 383, 
        "Thr": 319, 
        "Trp": 44, 
        "Val": 447, 
        "VitA": 0, 
        "VitD": 0,
        "VitE": 0,
        "NFCDigest",
        "CPDigest": 1,
        "NDFDigest": 58,
        "FatDigest": 1,
        "TDN_ActX", 
        "DiscDE", 
        "MEforNEg",
        "MEng", 
        "NEl",
        "NEg",
        "NEm"
    },
*/