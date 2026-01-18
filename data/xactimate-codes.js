/**
 * Xactimate Line Items Database
 *
 * Comprehensive database of Xactimate codes for restoration estimating.
 * Organized by category with descriptions, modifiers, and typical use cases.
 *
 * Data compiled from:
 * - Xactware official documentation
 * - IICRC S500/S520/S700 standards
 * - Industry training resources
 *
 * Note: Prices are region-specific and update monthly. This database
 * provides codes and descriptions only. Actual pricing requires
 * Xactimate software with current price lists.
 *
 * @version 1.0.0
 * @lastUpdated 2026-01-18
 */

const XACTIMATE_DATABASE = {
  _meta: {
    version: "1.0.0",
    lastUpdated: "2026-01-18",
    totalCategories: 94,
    source: "Xactware/Verisk official documentation + IICRC standards",
    note: "Prices are region-specific. Codes are current as of compilation date."
  },

  // ============================================
  // CATEGORY CODES - Master list of all 94 categories
  // ============================================
  categories: {
    ACC: { name: "Accessories - Mobile home", type: "residential" },
    ACT: { name: "Acoustical treatments", type: "both" },
    APP: { name: "Appliances", type: "both" },
    APM: { name: "Appliances: Major without install", type: "both" },
    APS: { name: "Appliances: Small Cleaning", type: "contents" },
    ARC: { name: "Art restoration, conservation", type: "specialty" },
    AWN: { name: "Awnings & patio covers", type: "exterior" },
    CAB: { name: "Cabinetry", type: "both" },
    CAP: { name: "Clean appliances (contents)", type: "contents" },
    CEL: { name: "Clean electric items (contents)", type: "contents" },
    CGN: { name: "Clean - General Items (contents)", type: "contents" },
    CHF: { name: "Clean - Hard furniture (contents)", type: "contents" },
    CLM: { name: "Clean - Lamps or vases (contents)", type: "contents" },
    CLN: { name: "Cleaning", type: "restoration" },
    CNC: { name: "Concrete & asphalt", type: "exterior" },
    CON: { name: "Content manipulation", type: "restoration" },
    CPS: { name: "Packing, handling, storage (contents)", type: "contents" },
    CUP: { name: "Clean - Upholstery & soft (contents)", type: "contents" },
    CWH: { name: "Cleaning/Wall hangings (contents)", type: "contents" },
    CSF: { name: "Cleaning - Specialty", type: "restoration" },
    DMO: { name: "General demolition", type: "restoration" },
    DOR: { name: "Doors", type: "both" },
    DRY: { name: "Drywall", type: "both" },
    ELE: { name: "Electrical", type: "both" },
    ELS: { name: "Electrical - special systems", type: "both" },
    EQA: { name: "Misc. equipment - agricultural", type: "commercial" },
    EQC: { name: "Misc. equipment - commercial", type: "commercial" },
    EQU: { name: "Heavy equipment", type: "commercial" },
    EXC: { name: "Excavation", type: "exterior" },
    FCC: { name: "Floor covering - carpet", type: "both" },
    FCR: { name: "Floor covering - resilient", type: "both" },
    FCS: { name: "Floor covering - stone", type: "both" },
    FCT: { name: "Floor covering - ceramic tile", type: "both" },
    FCV: { name: "Floor covering - vinyl", type: "both" },
    FCW: { name: "Floor covering - wood", type: "both" },
    FEE: { name: "Permits and fees", type: "general" },
    FEN: { name: "Fencing", type: "exterior" },
    FNC: { name: "Finish carpentry/trim work", type: "both" },
    FNH: { name: "Finish hardware", type: "both" },
    FPL: { name: "Fireplaces", type: "both" },
    FPS: { name: "Fire protection systems", type: "both" },
    FRM: { name: "Framing & rough carpentry", type: "both" },
    FRP: { name: "Fire proofing", type: "commercial" },
    GLS: { name: "Glass, glazing, & store fronts", type: "both" },
    HMR: { name: "Hazardous material remediation", type: "restoration" },
    HVC: { name: "Heat, vent, & air conditioning", type: "both" },
    INM: { name: "Insulation - mechanical", type: "both" },
    INS: { name: "Insulation", type: "both" },
    LAB: { name: "Labor only", type: "general" },
    LIT: { name: "Light fixtures", type: "both" },
    LND: { name: "Landscaping", type: "exterior" },
    MAS: { name: "Masonry", type: "exterior" },
    MBL: { name: "Marble - cultured or natural", type: "both" },
    MPR: { name: "Moisture protection", type: "both" },
    MSD: { name: "Mirrors & shower doors", type: "both" },
    MSK: { name: "Mobile homes, skirting, & setup", type: "residential" },
    MTL: { name: "Metal structures & components", type: "commercial" },
    OBS: { name: "Obsolete items", type: "general" },
    ORI: { name: "Ornamental iron", type: "both" },
    PLA: { name: "Interior lath & plaster", type: "both" },
    PLM: { name: "Plumbing", type: "both" },
    PNL: { name: "Paneling & wood wall finishes", type: "both" },
    PNT: { name: "Painting", type: "both" },
    POL: { name: "Swimming pools & spas", type: "exterior" },
    PRM: { name: "Property repair & maintenance", type: "general" },
    PTG: { name: "Painting - low or no VOC", type: "both" },
    RFG: { name: "Roofing", type: "exterior" },
    SCF: { name: "Scaffolding", type: "general" },
    SDG: { name: "Siding", type: "exterior" },
    SFG: { name: "Soffit, fascia, & gutter", type: "exterior" },
    SPE: { name: "Specialty items", type: "general" },
    SPR: { name: "Sprinklers", type: "exterior" },
    STJ: { name: "Steel joist components", type: "commercial" },
    STL: { name: "Steel components", type: "commercial" },
    STR: { name: "Stairs", type: "both" },
    STU: { name: "Stucco & exterior plaster", type: "exterior" },
    TBA: { name: "Toilet & bath accessories", type: "both" },
    TCR: { name: "Trauma/crime scene remediation", type: "restoration" },
    TIL: { name: "Tile", type: "both" },
    TMB: { name: "Timber framing", type: "both" },
    TMP: { name: "Temporary repairs", type: "restoration" },
    USR: { name: "User defined items", type: "general" },
    VTC: { name: "Valuation tool cost", type: "general" },
    WDA: { name: "Windows - aluminum", type: "both" },
    WDP: { name: "Windows - sliding patio doors", type: "both" },
    WDR: { name: "Windows reglazing & repair", type: "both" },
    WDS: { name: "Windows - skylights", type: "both" },
    WDT: { name: "Windows treatment", type: "both" },
    WDV: { name: "Windows - vinyl", type: "both" },
    WDW: { name: "Windows - wood", type: "both" },
    WPR: { name: "Wallpaper", type: "both" },
    WTR: { name: "Water extraction & remediation", type: "restoration" },
    XST: { name: "Exterior structures", type: "exterior" }
  },

  // ============================================
  // WTR - WATER EXTRACTION & REMEDIATION
  // Primary category for water damage restoration
  // ============================================
  WTR: {
    _info: {
      name: "Water Extraction & Remediation",
      description: "Line items for water damage mitigation and restoration",
      commonModifiers: {
        A: "After hours",
        H: "Hard surface",
        G: "Category 2 (gray water)",
        S: "Category 3 (black water/sewage)",
        C: "Confined space",
        L: "Laminate",
        "+": "Axial (for air movers)"
      }
    },

    // Extraction codes
    extraction: {
      WTREXT: {
        description: "Water extraction with carpet wand",
        unit: "SF",
        notes: "Base extraction code for carpet"
      },
      WTREXTH: {
        description: "Water extraction - hard surfaces",
        unit: "SF",
        notes: "For tile, wood, vinyl floors"
      },
      WTREXTA: {
        description: "Water extraction - after hours",
        unit: "SF",
        notes: "Add 'A' suffix for after-hours premium"
      },
      WTREXTG: {
        description: "Water extraction - Category 2",
        unit: "SF",
        notes: "Gray water extraction with additional PPE/protocols"
      },
      WTREXTS: {
        description: "Water extraction - Category 3",
        unit: "SF",
        notes: "Sewage/black water - requires full PPE, containment"
      }
    },

    // Drying equipment
    equipment: {
      WTRDRY: {
        description: "Air mover rental (per 24 hr period)",
        unit: "EA/Day",
        notes: "Radial or centrifugal air mover"
      },
      "WTRDRY+": {
        description: "Air mover rental - axial type",
        unit: "EA/Day",
        notes: "Axial fan air mover option"
      },
      WTRDHM: {
        description: "Dehumidifier rental (per 24 hr period)",
        unit: "EA/Day",
        notes: "Calculated by cubic footage and class"
      },
      WTRDHML: {
        description: "Large dehumidifier - LGR type",
        unit: "EA/Day",
        notes: "Low Grain Refrigerant dehumidifier"
      },
      WTRDHMD: {
        description: "Desiccant dehumidifier",
        unit: "EA/Day",
        notes: "For Class 4 or low-temp drying"
      },
      WTRNAFAN: {
        description: "Air filtration device / HEPA scrubber",
        unit: "EA/Day",
        notes: "Air scrubber with HEPA filtration"
      },
      WTRWALLD: {
        description: "Direct-It-In Air Mover Adapter",
        unit: "EA/Day",
        notes: "Includes air mover - for wall cavity drying"
      },
      WTRWFI: {
        description: "Floor drying package",
        unit: "EA/Day",
        notes: "Specialty floor drying system"
      },
      WTRWFDAD: {
        description: "Floor drying - additional area",
        unit: "SF",
        notes: "Add for areas over 400 SF"
      },
      WTRWALL: {
        description: "Wall/ceiling drying package (Injectidry)",
        unit: "EA/Day",
        notes: "In-wall drying system"
      }
    },

    // Equipment labor
    labor: {
      WTREQ: {
        description: "Equipment setup, monitoring, and removal",
        unit: "HR",
        notes: "Labor for equipment management"
      },
      WTREQD: {
        description: "Equipment cleaning/decontamination",
        unit: "EA",
        notes: "After Cat 2/3 jobs - clean air movers, dehus, etc."
      },
      WTRMON: {
        description: "Daily monitoring labor",
        unit: "HR",
        notes: "Typical 1.5 hours per day"
      },
      WTRSETUP: {
        description: "Equipment setup labor",
        unit: "HR",
        notes: "Initial placement and configuration"
      }
    },

    // Drywall removal
    drywall: {
      WTRDRYW: {
        description: "Drywall removal and bagging",
        unit: "SF",
        notes: "Standard drywall removal"
      },
      WTRDRYWA: {
        description: "Drywall removal - after hours",
        unit: "SF",
        notes: "After-hours premium"
      },
      WTRDRYWI: {
        description: "Drywall flood cut - 4 inch option",
        unit: "LF",
        notes: "Minimal flood cut at baseboard"
      },
      WTRDRYWLF: {
        description: "Drywall flood cut - lineal foot (2 ft)",
        unit: "LF",
        notes: "Standard 2-foot flood cut"
      },
      WTRDRYW4: {
        description: "Drywall flood cut - 4 foot",
        unit: "LF",
        notes: "Extended flood cut height"
      },
      WTRDRYS: {
        description: "Drywall removal - Category 3",
        unit: "SF",
        notes: "Contaminated drywall removal with disposal"
      }
    },

    // Insulation removal
    insulation: {
      WTRINS: {
        description: "Insulation removal and bagging",
        unit: "SF",
        notes: "Standard batt insulation removal"
      },
      WTRINSC: {
        description: "Insulation removal - confined space",
        unit: "SF",
        notes: "Crawlspace or attic access"
      },
      WTRINSS: {
        description: "Insulation removal - Category 3",
        unit: "SF",
        notes: "Contaminated insulation disposal"
      }
    },

    // Flooring removal
    flooring: {
      WTRFCC: {
        description: "Carpet removal",
        unit: "SF",
        notes: "Remove and dispose carpet"
      },
      WTRFCCS: {
        description: "Carpet removal - Category 3",
        unit: "SF",
        notes: "Contaminated carpet with bagging"
      },
      WTRFCT: {
        description: "Tile flooring removal",
        unit: "SF",
        notes: "Ceramic or porcelain tile"
      },
      WTRFCV: {
        description: "Vinyl flooring removal",
        unit: "SF",
        notes: "Sheet vinyl or LVP"
      },
      WTRFCW: {
        description: "Wood flooring removal",
        unit: "SF",
        notes: "Hardwood or laminate"
      },
      WTRFCWL: {
        description: "Laminate flooring removal",
        unit: "SF",
        notes: "Laminate wood flooring"
      },
      WTRPAD: {
        description: "Carpet pad removal",
        unit: "SF",
        notes: "Remove and dispose padding"
      }
    },

    // Trim and baseboard
    trim: {
      WTRTRI: {
        description: "Trim removal",
        unit: "LF",
        notes: "General trim removal"
      },
      WTRBASE: {
        description: "Baseboard removal",
        unit: "LF",
        notes: "Remove baseboard for drying"
      },
      WTRTRIM: {
        description: "Trim removal with bagging",
        unit: "LF",
        notes: "Remove and dispose"
      }
    },

    // Antimicrobial treatment
    treatment: {
      WTRGRM: {
        description: "Antimicrobial application",
        unit: "SF",
        notes: "Standard antimicrobial spray"
      },
      WTRGRMA: {
        description: "Antimicrobial - after hours",
        unit: "SF",
        notes: "After-hours application"
      },
      WTRGRMBIO: {
        description: "Antimicrobial - spore-based product",
        unit: "SF",
        notes: "Sporicidin or similar"
      },
      WTRGRMB: {
        description: "Antimicrobial - botanical product",
        unit: "SF",
        notes: "Benefect or similar botanical"
      },
      WTRGRMS: {
        description: "Antimicrobial - Category 3",
        unit: "SF",
        notes: "Heavy-duty disinfection"
      }
    },

    // HEPA vacuuming
    hepa: {
      WTRHEPAW: {
        description: "HEPA vacuum walls",
        unit: "SF",
        notes: "HEPA vacuum wall surfaces"
      },
      HEPAFSH: {
        description: "HEPA vacuum exposed framing - floors with sheathing",
        unit: "SF",
        notes: "Newer code - nearly 2x rate of WTRHEPAW"
      },
      HEPAWSH: {
        description: "HEPA vacuum exposed framing - walls with sheathing",
        unit: "SF",
        notes: "Newer code - for wall cavities"
      },
      WTRHEPAVAS: {
        description: "Detailed HEPA vacuuming",
        unit: "SF",
        notes: "Thorough detailed vacuum"
      }
    },

    // Containment
    containment: {
      WTRCNTLF: {
        description: "Containment wall installation labor",
        unit: "LF",
        notes: "Install 6-mil poly containment"
      },
      WTRCNT: {
        description: "Containment materials",
        unit: "EA",
        notes: "Poly sheeting, tape, zipper doors"
      },
      WTRNEG: {
        description: "Negative air machine",
        unit: "EA/Day",
        notes: "Create negative pressure"
      }
    },

    // Miscellaneous
    misc: {
      WTRBLK: {
        description: "Block and pad under furniture",
        unit: "RM",
        notes: "Protect furniture from wet carpet"
      },
      WTRMOV: {
        description: "Move furniture - light",
        unit: "RM",
        notes: "Move small items for drying"
      },
      WTRMOVH: {
        description: "Move furniture - heavy",
        unit: "RM",
        notes: "Move large/heavy items"
      },
      WTRTUBD: {
        description: "Detach tub/shower",
        unit: "EA",
        notes: "Detach for wall cavity access"
      },
      WTRCABLOW: {
        description: "Cabinet tear-out",
        unit: "LF",
        notes: "Remove and dispose cabinet"
      },
      WTRCABLWD: {
        description: "Cabinet detach for reset",
        unit: "LF",
        notes: "Detach to reinstall later"
      }
    }
  },

  // ============================================
  // HMR - HAZARDOUS MATERIAL REMEDIATION
  // Mold, asbestos, lead, biohazard
  // ============================================
  HMR: {
    _info: {
      name: "Hazardous Material Remediation",
      description: "Mold remediation, biohazard cleanup, hazardous materials",
      relatedStandards: ["IICRC S520", "IICRC S540"]
    },

    mold: {
      HMRDIS: {
        description: "Disinfecting via fog",
        unit: "SF",
        notes: "Fogging treatment for building"
      },
      HMREQD: {
        description: "Equipment cleaning after mold job",
        unit: "EA",
        notes: "Decontaminate equipment"
      },
      HMRASBTS: {
        description: "Sample collection and lab testing",
        unit: "EA",
        notes: "Per sample - send to lab"
      },
      HMRCNT: {
        description: "Mold containment setup",
        unit: "LF",
        notes: "Critical barrier installation"
      },
      HMRHEPAW: {
        description: "HEPA vacuum mold-affected surfaces",
        unit: "SF",
        notes: "Before and after remediation"
      },
      HMRABR: {
        description: "Abrasive cleaning - wood framing",
        unit: "SF",
        notes: "Wire brush, sanding, media blasting"
      }
    },

    biohazard: {
      HBAGG: {
        description: "Plastic glove bags for hazmat",
        unit: "EA",
        notes: "For wrapping pipes with hazardous material"
      },
      "HBAGG>": {
        description: "Plastic glove bags - large",
        unit: "EA",
        notes: "Larger size glove bags"
      }
    },

    blasting: {
      HMRDRYICE: {
        description: "Dry ice blasting - exposed framing",
        unit: "SF",
        notes: "Media blasting for contamination removal"
      },
      HMRSODA: {
        description: "Soda blasting - exposed framing",
        unit: "SF",
        notes: "Gentler media blasting option"
      }
    }
  },

  // ============================================
  // TCR - TRAUMA/CRIME SCENE REMEDIATION
  // ============================================
  TCR: {
    _info: {
      name: "Trauma/Crime Scene Remediation",
      description: "Biohazard cleanup per IICRC S540 standard",
      relatedStandards: ["IICRC S540", "OSHA 29 CFR 1910.1030"]
    },

    cleanup: {
      TCREQD: {
        description: "Equipment decontamination after trauma scene",
        unit: "EA",
        notes: "Clean all equipment used"
      },
      TCRCLEAN: {
        description: "Biohazard cleaning",
        unit: "SF",
        notes: "Blood/OPIM cleanup"
      },
      TCRDISP: {
        description: "Biohazard waste disposal",
        unit: "EA",
        notes: "Proper disposal per regulations"
      }
    }
  },

  // ============================================
  // CLN - CLEANING
  // General cleaning and fire/smoke cleanup
  // ============================================
  CLN: {
    _info: {
      name: "Cleaning",
      description: "General cleaning, fire/smoke cleanup, final clean",
      note: "CLN items typically not eligible for O&P"
    },

    general: {
      CLNFINALR: {
        description: "Final cleaning - residential",
        unit: "SF",
        notes: "Post-construction cleanup"
      },
      CLNFINALC: {
        description: "Final cleaning - commercial",
        unit: "SF",
        notes: "Commercial final clean"
      },
      CLNCONC: {
        description: "Clean concrete",
        unit: "SF",
        notes: "Concrete surface cleaning"
      }
    },

    smoke: {
      CLNSOOT: {
        description: "Soot cleaning - dry method",
        unit: "SF",
        notes: "HEPA vacuum and chem sponge"
      },
      CLNSOOTW: {
        description: "Soot cleaning - wet method",
        unit: "SF",
        notes: "Degreasers and wet cleaning"
      },
      CLNSMOKE: {
        description: "Smoke residue cleaning",
        unit: "SF",
        notes: "Light smoke cleaning"
      },
      CLNSMOKEH: {
        description: "Smoke residue cleaning - heavy",
        unit: "SF",
        notes: "Heavy smoke damage"
      }
    },

    deodorization: {
      CLNOZONE: {
        description: "Ozone treatment",
        unit: "HR",
        notes: "Area must be evacuated"
      },
      CLNFOG: {
        description: "Thermal fogging",
        unit: "CF",
        notes: "Deodorizing fog treatment"
      },
      CLNHYDROX: {
        description: "Hydroxyl treatment",
        unit: "EA/Day",
        notes: "Safe for occupied spaces"
      }
    }
  },

  // ============================================
  // DMO - DEMOLITION
  // ============================================
  DMO: {
    _info: {
      name: "General Demolition",
      description: "Demolition and removal of materials"
    },

    removal: {
      DMOWASTE: {
        description: "Haul debris",
        unit: "CY",
        notes: "Cubic yards of debris removal"
      },
      DMODUMP: {
        description: "Dump fees",
        unit: "EA",
        notes: "Landfill/disposal fees"
      }
    }
  },

  // ============================================
  // CON - CONTENT MANIPULATION
  // ============================================
  CON: {
    _info: {
      name: "Content Manipulation",
      description: "Moving, protecting, storing contents"
    },

    manipulation: {
      CONMOV: {
        description: "Content manipulation - move within room",
        unit: "RM",
        notes: "Move items for work access"
      },
      CONMOVH: {
        description: "Content manipulation - heavy items",
        unit: "RM",
        notes: "Large/heavy furniture"
      },
      CONPACK: {
        description: "Pack-out contents",
        unit: "HR",
        notes: "Box and remove from structure"
      },
      CONPACKB: {
        description: "Pack-back contents",
        unit: "HR",
        notes: "Return items after restoration"
      },
      CONSTOR: {
        description: "Content storage",
        unit: "DAY",
        notes: "Off-site storage fees"
      }
    }
  },

  // ============================================
  // DRY - DRYWALL
  // ============================================
  DRY: {
    _info: {
      name: "Drywall",
      description: "Drywall installation and finishing"
    },

    installation: {
      "DRY 1/2": {
        description: "1/2 inch drywall - ready for paint",
        unit: "SF",
        notes: "Includes texture"
      },
      "DRY 1/2-": {
        description: "1/2 inch drywall - ready for texture",
        unit: "SF",
        notes: "No texture included"
      },
      "DRY 5/8": {
        description: "5/8 inch drywall - ready for paint",
        unit: "SF",
        notes: "Fire-rated, includes texture"
      },
      "DRY 5/8-": {
        description: "5/8 inch drywall - ready for texture",
        unit: "SF",
        notes: "Fire-rated, no texture"
      },
      "DRY 1/2+++": {
        description: "Smooth wall finish",
        unit: "SF",
        notes: "Level 5 smooth finish"
      }
    },

    patches: {
      DRYPATCH: {
        description: "Drywall patch",
        unit: "EA",
        notes: "Up to 4 SF, includes texture"
      },
      DRYLF: {
        description: "Drywall repair - up to 2 feet",
        unit: "LF",
        notes: "Linear foot repair"
      },
      "DRYLF<": {
        description: "Drywall repair - up to 4 inches",
        unit: "LF",
        notes: "Small linear repair"
      },
      "DRYLF>": {
        description: "Drywall repair - up to 4 feet",
        unit: "LF",
        notes: "Large linear repair"
      }
    },

    texture: {
      "DRYTEX-": {
        description: "Machine texture (orange peel)",
        unit: "SF",
        notes: "Spray texture"
      },
      DRYTEX: {
        description: "Light hand texture",
        unit: "SF",
        notes: "Manual light texture"
      },
      "DRYTEX+": {
        description: "Heavy hand texture",
        unit: "SF",
        notes: "Manual heavy texture"
      },
      "DRYTEX++": {
        description: "Smooth/skim coat",
        unit: "SF",
        notes: "Level 5 skim coat"
      },
      DRYTEXMK: {
        description: "Machine knockdown texture",
        unit: "SF",
        notes: "Spray and knock down"
      },
      DRYAC: {
        description: "Acoustic ceiling texture",
        unit: "SF",
        notes: "Popcorn ceiling - includes paint"
      }
    },

    misc: {
      DRYWALLF: {
        description: "Fill holes from wall cavity drying",
        unit: "EA",
        notes: "Patch Injectidry holes"
      },
      DRYRND: {
        description: "Bullnose corner bead",
        unit: "LF",
        notes: "Rounded corner installation"
      },
      DRYARCADD: {
        description: "Arched opening additional charge",
        unit: "EA",
        notes: "Extra for arched openings"
      },
      DRYADD: {
        description: "High ceiling charge (11-14 ft)",
        unit: "SF",
        notes: "Additional labor for height"
      }
    }
  },

  // ============================================
  // PNT - PAINTING
  // ============================================
  PNT: {
    _info: {
      name: "Painting",
      description: "Interior and exterior painting"
    },

    walls: {
      "PNTS": {
        description: "Seal coat (1 coat)",
        unit: "SF",
        notes: "Primer/sealer"
      },
      PNTS2: {
        description: "Seal two coats",
        unit: "SF",
        notes: "Double primer"
      },
      "PNTS/P": {
        description: "Seal and paint (2 coats total)",
        unit: "SF",
        notes: "1 seal + 1 paint"
      },
      PNTSP: {
        description: "Seal and paint - one coat each",
        unit: "SF",
        notes: "Standard repaint"
      },
      PNTSP2: {
        description: "Seal 1, paint 2",
        unit: "SF",
        notes: "Premium finish"
      },
      PNTP: {
        description: "Paint (1 coat)",
        unit: "SF",
        notes: "Single coat paint"
      },
      "PNTP+": {
        description: "Paint - 2 colors (1 coat)",
        unit: "SF",
        notes: "Accent wall"
      },
      PNTP2: {
        description: "Paint (2 coats)",
        unit: "SF",
        notes: "Double coat"
      }
    },

    trim: {
      PNTB: {
        description: "Paint baseboard",
        unit: "LF",
        notes: "Baseboard painting"
      },
      PNTC: {
        description: "Paint casing",
        unit: "LF",
        notes: "Door/window casing"
      },
      PNTOP1: {
        description: "Paint door/window opening (1 coat)",
        unit: "EA",
        notes: "Opening surround"
      },
      PNTDORT1: {
        description: "Paint door trim/casing",
        unit: "EA",
        notes: "Per opening"
      }
    },

    specialty: {
      PNTACT: {
        description: "Paint acoustic ceiling tile",
        unit: "SF",
        notes: "Ceiling tile painting"
      },
      PNTWPR: {
        description: "Paint over wallpaper",
        unit: "SF",
        notes: "Prime and paint wallpaper"
      },
      PNTUL: {
        description: "Sealer and labor only",
        unit: "SF",
        notes: "Block stain sealer"
      },
      PNTWGRID: {
        description: "Paint wood window grid",
        unit: "LF",
        notes: "Window muntins"
      }
    }
  },

  // ============================================
  // FRM - FRAMING
  // ============================================
  FRM: {
    _info: {
      name: "Framing & Rough Carpentry",
      description: "Structural framing and rough carpentry"
    },

    walls: {
      FRM4LF: {
        description: "2x4 stud wall - 8 ft high",
        unit: "LF",
        notes: "Standard interior wall"
      },
      FRM4SF: {
        description: "2x4 stud wall - any height",
        unit: "SF",
        notes: "By square footage"
      },
      FRM6LF: {
        description: "2x6 stud wall - 8 ft high",
        unit: "LF",
        notes: "Exterior/bearing wall"
      },
      FRM6SF: {
        description: "2x6 stud wall - any height",
        unit: "SF",
        notes: "By square footage"
      }
    },

    sheathing: {
      "FRMSH3/4TG": {
        description: "Sheathing - 3/4 inch tongue & groove",
        unit: "SF",
        notes: "Subfloor sheathing"
      },
      FRMSHPLY: {
        description: "Plywood sheathing",
        unit: "SF",
        notes: "Wall or roof sheathing"
      },
      FRMSHOSB: {
        description: "OSB sheathing",
        unit: "SF",
        notes: "Oriented strand board"
      }
    }
  },

  // ============================================
  // RFG - ROOFING
  // ============================================
  RFG: {
    _info: {
      name: "Roofing",
      description: "Roof repair and replacement"
    },

    shingles: {
      RFG220: {
        description: "3-tab 20 year shingle with felt",
        unit: "SQ",
        notes: "Per roofing square (100 SF)"
      },
      RFG220S: {
        description: "3-tab 20 year shingle - no felt",
        unit: "SQ",
        notes: "Shingles only"
      },
      RFG240: {
        description: "3-tab 25 year shingle with felt",
        unit: "SQ",
        notes: "Better warranty"
      },
      RFGARCH: {
        description: "Architectural/dimensional shingle",
        unit: "SQ",
        notes: "Premium shingle"
      }
    },

    accessories: {
      RFG265: {
        description: "Flashing",
        unit: "LF",
        notes: "Step or counter flashing"
      },
      RFG295: {
        description: "Drip edge",
        unit: "LF",
        notes: "Edge metal"
      },
      RFG300: {
        description: "Ridge cap",
        unit: "LF",
        notes: "Ridge shingles"
      },
      RFG230: {
        description: "Starter strip",
        unit: "LF",
        notes: "Starter course"
      },
      RFG242: {
        description: "Ice and water shield",
        unit: "SF",
        notes: "Self-adhering membrane"
      },
      RFG245: {
        description: "Roof vent",
        unit: "EA",
        notes: "Attic ventilation"
      }
    },

    emergency: {
      RFGTARP: {
        description: "Emergency tarp",
        unit: "SF",
        notes: "Temporary roof cover"
      },
      RFGBOARD: {
        description: "Board-up",
        unit: "SF",
        notes: "Temporary protection"
      }
    }
  },

  // ============================================
  // INS - INSULATION
  // ============================================
  INS: {
    _info: {
      name: "Insulation",
      description: "Thermal and acoustic insulation"
    },

    types: {
      INSBT4: {
        description: "Wall insulation - R-13 batt",
        unit: "SF",
        notes: "2x4 wall cavity"
      },
      INSBT6: {
        description: "Wall insulation - R-19 batt",
        unit: "SF",
        notes: "2x6 wall cavity"
      },
      INSBT10: {
        description: "Attic insulation - R-30 batt",
        unit: "SF",
        notes: "Ceiling/attic"
      },
      INSBTF4: {
        description: "Floor insulation - R-13 batt",
        unit: "SF",
        notes: "Raised foundation floor"
      },
      INSBLOWN: {
        description: "Blown-in insulation",
        unit: "SF",
        notes: "Loose fill attic insulation"
      }
    }
  },

  // ============================================
  // PLM - PLUMBING
  // ============================================
  PLM: {
    _info: {
      name: "Plumbing",
      description: "Plumbing fixtures and repairs"
    },

    fixtures: {
      PLMRGHFIX: {
        description: "Rough-in plumbing per fixture",
        unit: "EA",
        notes: "Supply and drain rough-in"
      },
      PLMFAU: {
        description: "Sink faucet - kitchen",
        unit: "EA",
        notes: "Kitchen faucet install"
      },
      PLMFAUL: {
        description: "Sink faucet - lavatory",
        unit: "EA",
        notes: "Bathroom faucet install"
      },
      PLMTOI: {
        description: "Toilet",
        unit: "EA",
        notes: "Remove and replace toilet"
      },
      PLMVAN: {
        description: "Vanity top with sink",
        unit: "EA",
        notes: "Cultured marble top"
      }
    }
  },

  // ============================================
  // ELE - ELECTRICAL
  // ============================================
  ELE: {
    _info: {
      name: "Electrical",
      description: "Electrical systems and fixtures"
    },

    outlets: {
      ELE110: {
        description: "110V outlet",
        unit: "EA",
        notes: "Standard duplex outlet"
      },
      ELE220: {
        description: "220V outlet",
        unit: "EA",
        notes: "Appliance outlet"
      },
      ELESW: {
        description: "Light switch",
        unit: "EA",
        notes: "Single pole switch"
      },
      ELESW3: {
        description: "3-way switch",
        unit: "EA",
        notes: "Three-way switching"
      },
      ELEGFI: {
        description: "GFI outlet",
        unit: "EA",
        notes: "Ground fault interrupter"
      }
    },

    fixtures: {
      LITFL: {
        description: "Fluorescent light fixture",
        unit: "EA",
        notes: "Standard fluorescent"
      },
      LITCAN: {
        description: "Recessed can light",
        unit: "EA",
        notes: "Recessed downlight"
      }
    }
  },

  // ============================================
  // APP - APPLIANCES
  // ============================================
  APP: {
    _info: {
      name: "Appliances",
      description: "Major appliance replacement"
    },

    kitchen: {
      APPRG: {
        description: "Range - electric",
        unit: "EA",
        notes: "Electric range/stove"
      },
      APPRGGAS: {
        description: "Range - gas",
        unit: "EA",
        notes: "Gas range/stove"
      },
      APPDW: {
        description: "Dishwasher",
        unit: "EA",
        notes: "Built-in dishwasher"
      },
      APPREF: {
        description: "Refrigerator",
        unit: "EA",
        notes: "Standard refrigerator"
      },
      APPMW: {
        description: "Microwave - over range",
        unit: "EA",
        notes: "Built-in microwave"
      }
    },

    laundry: {
      APPWASH: {
        description: "Washing machine",
        unit: "EA",
        notes: "Clothes washer"
      },
      APPDRY: {
        description: "Dryer - electric",
        unit: "EA",
        notes: "Electric clothes dryer"
      },
      APPDRYGAS: {
        description: "Dryer - gas",
        unit: "EA",
        notes: "Gas clothes dryer"
      }
    },

    hvac: {
      APPWH: {
        description: "Water heater - gas",
        unit: "EA",
        notes: "Gas water heater"
      },
      APPWHE: {
        description: "Water heater - electric",
        unit: "EA",
        notes: "Electric water heater"
      }
    }
  },

  // ============================================
  // FEE - PERMITS AND FEES
  // ============================================
  FEE: {
    _info: {
      name: "Permits and Fees",
      description: "Permits, fees, and miscellaneous charges"
    },

    permits: {
      FEEBLDG: {
        description: "Building permit",
        unit: "EA",
        notes: "General building permit"
      },
      FEEELEC: {
        description: "Electrical permit",
        unit: "EA",
        notes: "Electrical work permit"
      },
      FEEPLMB: {
        description: "Plumbing permit",
        unit: "EA",
        notes: "Plumbing work permit"
      },
      FEEMECH: {
        description: "Mechanical permit",
        unit: "EA",
        notes: "HVAC permit"
      }
    },

    services: {
      FEESERV: {
        description: "Service call / minimum charge",
        unit: "EA",
        notes: "Minimum service charge"
      }
    }
  },

  // ============================================
  // TMP - TEMPORARY REPAIRS
  // ============================================
  TMP: {
    _info: {
      name: "Temporary Repairs",
      description: "Emergency and temporary repairs"
    },

    emergency: {
      TMPBOARD: {
        description: "Board-up",
        unit: "SF",
        notes: "Temporary plywood cover"
      },
      TMPTARP: {
        description: "Tarp installation",
        unit: "SF",
        notes: "Emergency tarp"
      },
      TMPFENCE: {
        description: "Temporary fencing",
        unit: "LF",
        notes: "Security fencing"
      }
    }
  },

  // ============================================
  // MISC UTILITY CODES
  // ============================================
  misc: {
    MISC: {
      description: "Miscellaneous item",
      unit: "EA",
      notes: "Use with any category for unique items (e.g., PNT MISC)"
    },
    BF: {
      description: "Convert to board feet",
      unit: "BF",
      notes: "Lumber measurement conversion"
    },
    CFB: {
      description: "Cubic feet variable B",
      unit: "CF",
      notes: "Volume calculation"
    },
    RUP: {
      description: "Round up",
      unit: "EA",
      notes: "Round quantity up"
    }
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Search for codes by keyword in description
 * @param {string} keyword - Search term
 * @returns {Array} Matching codes with category and details
 */
function searchCodes(keyword) {
  const results = [];
  const searchTerm = keyword.toLowerCase();

  for (const [category, data] of Object.entries(XACTIMATE_DATABASE)) {
    if (category.startsWith('_') || category === 'categories' || category === 'misc') continue;

    for (const [subcategory, codes] of Object.entries(data)) {
      if (subcategory.startsWith('_')) continue;

      for (const [code, details] of Object.entries(codes)) {
        if (details.description && details.description.toLowerCase().includes(searchTerm)) {
          results.push({
            category,
            subcategory,
            code,
            ...details
          });
        }
      }
    }
  }

  return results;
}

/**
 * Get all codes for a specific category
 * @param {string} category - Category code (e.g., 'WTR', 'HMR')
 * @returns {Object} All codes in that category
 */
function getCategoryCodesData(category) {
  return XACTIMATE_DATABASE[category] || null;
}

/**
 * Get category name from code
 * @param {string} code - Category code
 * @returns {string} Category name
 */
function getCategoryName(code) {
  const cat = XACTIMATE_DATABASE.categories[code];
  return cat ? cat.name : 'Unknown';
}

/**
 * Get common water damage codes for quick reference
 * @returns {Array} Common WTR codes
 */
function getCommonWaterCodes() {
  return [
    { code: 'WTREXT', description: 'Water extraction - carpet', unit: 'SF' },
    { code: 'WTREXTH', description: 'Water extraction - hard surface', unit: 'SF' },
    { code: 'WTRDRY', description: 'Air mover (per day)', unit: 'EA' },
    { code: 'WTRDHM', description: 'Dehumidifier (per day)', unit: 'EA' },
    { code: 'WTRDRYWLF', description: 'Drywall flood cut (2 ft)', unit: 'LF' },
    { code: 'WTRINS', description: 'Insulation removal', unit: 'SF' },
    { code: 'WTRFCC', description: 'Carpet removal', unit: 'SF' },
    { code: 'WTRPAD', description: 'Carpet pad removal', unit: 'SF' },
    { code: 'WTRGRM', description: 'Antimicrobial treatment', unit: 'SF' },
    { code: 'WTREQ', description: 'Equipment setup/monitoring', unit: 'HR' },
    { code: 'WTRBLK', description: 'Block/pad under furniture', unit: 'RM' },
    { code: 'WTRCNTLF', description: 'Containment installation', unit: 'LF' }
  ];
}

/**
 * Get common fire/smoke codes for quick reference
 * @returns {Array} Common fire restoration codes
 */
function getCommonFireCodes() {
  return [
    { code: 'CLNSOOT', description: 'Soot cleaning - dry method', unit: 'SF' },
    { code: 'CLNSOOTW', description: 'Soot cleaning - wet method', unit: 'SF' },
    { code: 'CLNSMOKE', description: 'Smoke residue cleaning', unit: 'SF' },
    { code: 'CLNOZONE', description: 'Ozone treatment', unit: 'HR' },
    { code: 'CLNFOG', description: 'Thermal fogging', unit: 'CF' },
    { code: 'CLNHYDROX', description: 'Hydroxyl treatment', unit: 'EA/Day' },
    { code: 'WTRNAFAN', description: 'Air scrubber', unit: 'EA/Day' },
    { code: 'HEPAFSH', description: 'HEPA vacuum framing - floor', unit: 'SF' },
    { code: 'HEPAWSH', description: 'HEPA vacuum framing - wall', unit: 'SF' }
  ];
}

/**
 * Get common mold codes for quick reference
 * @returns {Array} Common mold remediation codes
 */
function getCommonMoldCodes() {
  return [
    { code: 'HMRDIS', description: 'Disinfecting via fog', unit: 'SF' },
    { code: 'HMREQD', description: 'Equipment decontamination', unit: 'EA' },
    { code: 'HMRASBTS', description: 'Sample/lab testing', unit: 'EA' },
    { code: 'HMRCNT', description: 'Containment setup', unit: 'LF' },
    { code: 'HMRHEPAW', description: 'HEPA vacuum surfaces', unit: 'SF' },
    { code: 'HMRABR', description: 'Abrasive cleaning - framing', unit: 'SF' },
    { code: 'WTRGRM', description: 'Antimicrobial treatment', unit: 'SF' },
    { code: 'WTRNAFAN', description: 'Air scrubber', unit: 'EA/Day' },
    { code: 'WTRCNTLF', description: 'Containment installation', unit: 'LF' }
  ];
}

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    XACTIMATE_DATABASE,
    searchCodes,
    getCategoryCodesData,
    getCategoryName,
    getCommonWaterCodes,
    getCommonFireCodes,
    getCommonMoldCodes
  };
}
