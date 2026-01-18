/**
 * IICRC Knowledge Base for AI Damage Analysis
 *
 * Subject Matter Expert knowledge based on IICRC standards for:
 * - S500: Professional Water Damage Restoration
 * - S520: Professional Mold Remediation
 * - S700: Professional Fire and Smoke Damage Restoration
 *
 * This file provides the AI analysis engine with expert knowledge
 * to properly classify damage, recommend procedures, and suggest
 * appropriate Xactimate line items.
 *
 * @version 1.0.0
 * @lastUpdated 2026-01-18
 */

const IICRC_KNOWLEDGE = {

  // ============================================
  // WATER DAMAGE CLASSIFICATION (S500)
  // ============================================
  waterDamage: {
    categories: {
      1: {
        name: "Category 1 - Clean Water",
        description: "Water from a sanitary source with no substantial health risk",
        examples: [
          "Broken supply lines",
          "Sink/tub overflow (no contaminants)",
          "Appliance supply line failure",
          "Melting ice or snow",
          "Rainwater",
          "Toilet tank water (not bowl)"
        ],
        indicators: [
          "Clear water",
          "No visible contamination",
          "Clean source identifiable",
          "Recent occurrence (under 24-48 hours)"
        ],
        degradation: "Becomes Category 2 after 24-48 hours contact with building materials",
        ppeRequired: "Basic - gloves recommended",
        xactimateModifier: null
      },
      2: {
        name: "Category 2 - Gray Water",
        description: "Water with significant contamination, potential health risk",
        examples: [
          "Dishwasher discharge",
          "Washing machine overflow",
          "Toilet overflow with urine only (no feces)",
          "Hydrostatic pressure seepage",
          "Aquarium water",
          "Category 1 water that has remained untreated"
        ],
        indicators: [
          "Slight discoloration",
          "Mild odor present",
          "Source includes organic matter",
          "Soapy residue visible"
        ],
        degradation: "Becomes Category 3 if untreated or prolonged exposure",
        ppeRequired: "Enhanced - respirator, gloves, coveralls",
        xactimateModifier: "G"
      },
      3: {
        name: "Category 3 - Black Water",
        description: "Grossly unsanitary water with pathogenic agents",
        examples: [
          "Sewage backup",
          "Rising flood water",
          "Ground surface water intrusion",
          "Standing water supporting microbial growth",
          "Wind-driven rain through roof",
          "Toilet overflow with feces"
        ],
        indicators: [
          "Dark or murky water",
          "Strong foul odor",
          "Visible sewage or debris",
          "Visible mold growth on surfaces",
          "Extended standing time"
        ],
        degradation: "Already at worst category",
        ppeRequired: "Full PPE - full-face respirator, Tyvek suit, rubber boots, double gloves",
        xactimateModifier: "S"
      }
    },

    classes: {
      1: {
        name: "Class 1 - Slow Evaporation",
        description: "Least amount of water affecting limited area",
        characteristics: [
          "Less than 5% of floor surface affected",
          "Minimal or no wet carpet/cushion",
          "Little porous material absorption",
          "Small confined losses"
        ],
        equipmentNeeds: {
          airChangesPerHour: "2-4 ACH",
          airMovers: "1 per 50-70 SF affected",
          dehumidifiers: "Cubic feet ÷ 100 = AHAM pints needed"
        },
        typicalDryingTime: "1-3 days"
      },
      2: {
        name: "Class 2 - Fast Evaporation",
        description: "Large area with significant moisture",
        characteristics: [
          "5-40% of floor surface affected",
          "Water has wicked up walls 12-24 inches",
          "Entire room with wet carpet/cushion",
          "Structural materials retain water"
        ],
        equipmentNeeds: {
          airChangesPerHour: "4-6 ACH",
          airMovers: "1 per 50-70 SF wet floor, 1 per 100-150 SF wall >2ft",
          dehumidifiers: "Cubic feet ÷ 50 = AHAM pints needed (LGR)"
        },
        typicalDryingTime: "3-5 days"
      },
      3: {
        name: "Class 3 - Fastest Evaporation",
        description: "Greatest amount of moisture",
        characteristics: [
          "Water from overhead (ceiling/roof leak)",
          "Walls, ceilings, insulation saturated",
          "Most surfaces affected",
          "Subfloor may be saturated"
        ],
        equipmentNeeds: {
          airChangesPerHour: "6-10+ ACH",
          airMovers: "1 per 40 SF minimum",
          dehumidifiers: "Cubic feet ÷ 40 = AHAM pints needed (LGR)"
        },
        typicalDryingTime: "5-10 days"
      },
      4: {
        name: "Class 4 - Specialty Drying",
        description: "Bound water in dense materials",
        characteristics: [
          "Hardwood floors with water underneath",
          "Plaster walls",
          "Concrete slab saturation",
          "Stone or brick",
          "Materials with low porosity"
        ],
        equipmentNeeds: {
          airChangesPerHour: "Variable",
          specialEquipment: ["Desiccant dehumidifiers", "Floor drying systems", "Wall cavity drying"],
          note: "Standard drying ineffective - specialty methods required"
        },
        typicalDryingTime: "7-14+ days"
      }
    },

    dryingStandards: {
      woodFraming: "12-15% moisture content (MC)",
      drywall: "Less than 1% MC or equal to unaffected material",
      concrete: "Below 4.5% MC or MVER below 3 lbs/1000 SF/24 hr",
      woodFlooring: "6-9% MC depending on species",
      dryStandard: "Within 4 percentage points of unaffected similar materials"
    },

    floodCuts: {
      definition: "Removing bottom portion of drywall above water line",
      standardHeight: "12-24 inches above highest water intrusion",
      whenRequired: [
        "Always for Category 2 and 3 water",
        "When insulation is wet",
        "When wall cavities need drying",
        "To allow antimicrobial application"
      ],
      xactimateCode: "WTRDRYWLF (2 ft) or WTRDRYWI (4 inch option)"
    },

    antimicrobial: {
      whenRequired: {
        cat1: "Generally not required",
        cat2: "May be required based on contamination",
        cat3: "Required - control bacterial growth during drying"
      },
      keyPrinciple: "Physical removal is PRIMARY - antimicrobials supplement, not replace",
      xactimateCodes: ["WTRGRM", "WTRGRMB", "WTRGRMBIO"]
    },

    commonLineItems: [
      { code: "WTREXT", when: "Any carpet water extraction" },
      { code: "WTREXTH", when: "Hard surface extraction (tile, wood, vinyl)" },
      { code: "WTRDRY", when: "Every job - air movers for drying" },
      { code: "WTRDHM", when: "Every job - dehumidifiers for moisture removal" },
      { code: "WTRDRYWLF", when: "Water has wicked into walls" },
      { code: "WTRINS", when: "Wet insulation in walls or ceiling" },
      { code: "WTRFCC", when: "Carpet must be removed (Cat 3 or non-salvageable)" },
      { code: "WTRPAD", when: "Carpet pad removal (usually required)" },
      { code: "WTRGRM", when: "Cat 2/3 water or mold prevention" },
      { code: "WTREQ", when: "Every job - equipment setup/monitoring labor" },
      { code: "WTRBLK", when: "Furniture on wet carpet" },
      { code: "WTRCNTLF", when: "Cat 3 or mold - containment required" }
    ]
  },

  // ============================================
  // MOLD DAMAGE CLASSIFICATION (S520)
  // ============================================
  moldDamage: {
    conditions: {
      1: {
        name: "Condition 1 - Normal Fungal Ecology",
        description: "Indoor environment comparable to outdoor baseline",
        indicators: [
          "No visible mold growth",
          "Air quality similar to outdoor",
          "No musty odors",
          "This is the remediation goal"
        ],
        action: "No remediation needed"
      },
      2: {
        name: "Condition 2 - Settled Spores",
        description: "Settled spores, fragments, or particulates identified",
        indicators: [
          "No visible mold growth",
          "Testing shows elevated spore counts",
          "Surfaces have settled contamination",
          "May have musty odor"
        ],
        action: "Cleaning required even without visible growth"
      },
      3: {
        name: "Condition 3 - Active Growth",
        description: "Visible mold growth present",
        indicators: [
          "Visible mold colonies on surfaces",
          "Often accompanied by moisture problem",
          "Strong musty odor common",
          "May see discoloration patterns"
        ],
        action: "Full remediation required"
      }
    },

    remediationLevels: {
      level1: {
        size: "10 square feet or less",
        ppe: "N95 respirator, gloves",
        containment: "Minimal - work area isolation",
        personnel: "Building maintenance staff"
      },
      level2: {
        size: "10-30 square feet",
        ppe: "N95 respirator, gloves, coveralls",
        containment: "Limited - plastic sheeting",
        personnel: "Trained maintenance staff"
      },
      level3: {
        size: "30-100 square feet",
        ppe: "Full PPE required",
        containment: "Full containment with negative air",
        personnel: "Professional remediation recommended"
      },
      level4: {
        size: "100+ square feet",
        ppe: "Full PPE with supplied air if needed",
        containment: "Full containment, decontamination chamber",
        personnel: "Professional remediation required"
      },
      level5: {
        description: "HVAC system contamination",
        special: "Ductwork, air handlers, AC units",
        personnel: "HVAC cleaning specialist + remediator"
      }
    },

    visualIndicators: [
      "Black/green/white fuzzy growth",
      "Dark staining patterns on surfaces",
      "Water damage stains (rings, streaks)",
      "Peeling paint or wallpaper",
      "Warped or buckling materials",
      "Discoloration on grout lines",
      "Musty or earthy odor"
    ],

    corePrinciple: "Source removal is PRIMARY - antimicrobials never replace physical removal",

    containment: {
      materials: "6-mil polyethylene sheeting",
      negativeAir: "4 ACH minimum",
      hepaRuntime: "Minimum 48 hours after work complete",
      decontamination: "Required for levels 3+"
    },

    commonLineItems: [
      { code: "HMRDIS", when: "Fogging treatment after remediation" },
      { code: "HMREQD", when: "Equipment decontamination" },
      { code: "HMRASBTS", when: "Air or surface sampling" },
      { code: "HMRCNT", when: "Containment setup" },
      { code: "WTRCNTLF", when: "Poly containment walls" },
      { code: "HEPAFSH", when: "HEPA vacuum floor framing" },
      { code: "HEPAWSH", when: "HEPA vacuum wall framing" },
      { code: "HMRABR", when: "Wood framing cleaning (wire brush/sand)" },
      { code: "WTRGRM", when: "Antimicrobial application" },
      { code: "WTRNAFAN", when: "Air scrubber for containment" }
    ]
  },

  // ============================================
  // FIRE & SMOKE DAMAGE CLASSIFICATION (S700)
  // ============================================
  fireDamage: {
    sootTypes: {
      dry: {
        name: "Dry Soot",
        characteristics: ["Powdery", "Fine particles", "Dry texture"],
        source: "High-temperature fires - paper, wood",
        cleaning: "HEPA vacuum first, then dry-chem sponge",
        caution: "Falls into cracks easily - careful not to spread"
      },
      wet: {
        name: "Wet/Oily Soot",
        characteristics: ["Sticky", "Dense", "Smears easily"],
        source: "Low-temperature fires - plastics, rubber, synthetic materials",
        cleaning: "Degreasers, specialized detergents, wet sponging",
        caution: "Do NOT wipe without proper cleaners - will spread"
      },
      protein: {
        name: "Protein Soot",
        characteristics: ["Nearly invisible", "Highly odorous", "Thin film"],
        source: "Kitchen fires - grease, burnt food",
        cleaning: "Enzyme cleaners, ozone/hydroxyl for odor",
        caution: "Detected by smell more than sight"
      },
      synthetic: {
        name: "Synthetic Soot",
        characteristics: ["Black", "Sticky", "Smudged"],
        source: "Plastics, electronics, fabrics",
        cleaning: "Alkaline solutions, dry-chem sponge after HEPA",
        caution: "Very adhesive - sticks to everything"
      }
    },

    cleaningRule: "Always DRY clean FIRST (HEPA vacuum, chem sponge), THEN wet methods",

    deodorization: {
      thermalFogging: {
        method: "Vaporize deodorizing solution",
        principle: "Recreates smoke penetration pattern",
        note: "Fog penetrates where smoke did"
      },
      ozone: {
        method: "Oxidizes odor molecules",
        caution: "Area must be evacuated",
        runtime: "3-6 hours typical"
      },
      hydroxyl: {
        method: "Safe oxidation without evacuation",
        advantage: "Can run in occupied spaces",
        note: "No masking agents used"
      }
    },

    visualIndicators: [
      "Black soot deposits on surfaces",
      "Smoke webbing (cobweb-like soot strands)",
      "Yellowing or discoloration",
      "Melted plastics or materials",
      "Charring or burn marks",
      "Smoke odor present",
      "Soot in HVAC vents"
    ],

    hazards: [
      "Particulate inhalation",
      "Chemical exposure from burned plastics",
      "Structural compromise from fire",
      "Asbestos release in older buildings"
    ],

    commonLineItems: [
      { code: "CLNSOOT", when: "Dry soot cleaning" },
      { code: "CLNSOOTW", when: "Wet soot cleaning" },
      { code: "CLNSMOKE", when: "Light smoke residue" },
      { code: "CLNSMOKEH", when: "Heavy smoke damage" },
      { code: "CLNOZONE", when: "Odor treatment - unoccupied" },
      { code: "CLNFOG", when: "Thermal fogging" },
      { code: "CLNHYDROX", when: "Hydroxyl treatment" },
      { code: "WTRNAFAN", when: "Air scrubber" },
      { code: "HEPAFSH", when: "HEPA vacuum floor framing" },
      { code: "HEPAWSH", when: "HEPA vacuum wall framing" }
    ]
  },

  // ============================================
  // DAMAGE DETECTION QUESTIONS
  // Flow for AI to ask clarifying questions
  // ============================================
  questionFlows: {
    water: [
      {
        question: "What is the water source?",
        options: [
          { label: "Clean supply line / sink overflow", category: 1 },
          { label: "Dishwasher / washing machine", category: 2 },
          { label: "Toilet overflow (no feces)", category: 2 },
          { label: "Toilet overflow with feces / sewage", category: 3 },
          { label: "Flood water / ground water", category: 3 },
          { label: "Unknown / standing for days", category: 3 }
        ]
      },
      {
        question: "How long has the water been present?",
        options: [
          { label: "Less than 24 hours", modifier: "none" },
          { label: "24-48 hours", modifier: "may_upgrade_category" },
          { label: "More than 48 hours", modifier: "upgrade_category" },
          { label: "Unknown / several days", modifier: "assume_cat3" }
        ]
      },
      {
        question: "What materials are affected?",
        options: [
          { label: "Carpet only", class: 1 },
          { label: "Carpet and pad, walls under 2 ft", class: 2 },
          { label: "Walls over 2 ft, ceiling, insulation", class: 3 },
          { label: "Hardwood floors, concrete, plaster", class: 4 }
        ]
      },
      {
        question: "Approximately what percentage of the room is affected?",
        options: [
          { label: "Less than 5%", class: 1 },
          { label: "5-40%", class: 2 },
          { label: "More than 40%", class: 3 }
        ]
      },
      {
        question: "Is there any visible mold growth?",
        options: [
          { label: "No", mold: false },
          { label: "Yes - small spots", mold: "minor" },
          { label: "Yes - significant growth", mold: "major" }
        ]
      }
    ],

    fire: [
      {
        question: "What was the fire source?",
        options: [
          { label: "Kitchen fire / cooking", sootType: "protein" },
          { label: "Paper / wood fire", sootType: "dry" },
          { label: "Plastic / synthetic materials", sootType: "synthetic" },
          { label: "Electrical fire", sootType: "wet" },
          { label: "Unknown / mixed", sootType: "mixed" }
        ]
      },
      {
        question: "What is the extent of smoke damage?",
        options: [
          { label: "Contained to one room", extent: "minor" },
          { label: "Multiple rooms affected", extent: "moderate" },
          { label: "Entire structure affected", extent: "major" }
        ]
      },
      {
        question: "Is there visible soot on surfaces?",
        options: [
          { label: "No visible soot, just odor", soot: "odor_only" },
          { label: "Light soot film", soot: "light" },
          { label: "Heavy soot deposits", soot: "heavy" },
          { label: "Thick black coating", soot: "severe" }
        ]
      },
      {
        question: "Is the HVAC system affected?",
        options: [
          { label: "No - was off during fire", hvac: false },
          { label: "Possibly - was running", hvac: "possible" },
          { label: "Yes - soot visible in vents", hvac: true }
        ]
      }
    ],

    mold: [
      {
        question: "What is the size of visible mold growth?",
        options: [
          { label: "Less than 10 square feet", level: 1 },
          { label: "10-30 square feet", level: 2 },
          { label: "30-100 square feet", level: 3 },
          { label: "More than 100 square feet", level: 4 }
        ]
      },
      {
        question: "Where is the mold located?",
        options: [
          { label: "Surface of materials only", depth: "surface" },
          { label: "Has penetrated into materials", depth: "deep" },
          { label: "In wall cavities / behind surfaces", depth: "hidden" },
          { label: "In HVAC system", depth: "hvac", level: 5 }
        ]
      },
      {
        question: "Is there an active moisture source?",
        options: [
          { label: "No - moisture issue resolved", moisture: "resolved" },
          { label: "Yes - still wet", moisture: "active" },
          { label: "Unknown", moisture: "unknown" }
        ]
      },
      {
        question: "Are occupants experiencing health symptoms?",
        options: [
          { label: "No symptoms reported", health: "none" },
          { label: "Mild symptoms (sneezing, irritation)", health: "mild" },
          { label: "Significant symptoms", health: "significant" }
        ]
      }
    ]
  },

  // ============================================
  // ROOM TYPES & TYPICAL SCOPE
  // ============================================
  roomTypes: {
    bathroom: {
      typicalMaterials: ["Tile", "Drywall", "Vanity cabinet", "Toilet", "Tub/shower"],
      waterDamageScope: ["Floor extraction", "Vanity removal if wet", "Toilet reset", "Wall drying"],
      commonCodes: ["WTREXTH", "WTRDRYWLF", "WTRCABLWD", "WTRTUBD"]
    },
    kitchen: {
      typicalMaterials: ["Cabinets", "Flooring", "Drywall", "Appliances"],
      waterDamageScope: ["Floor extraction", "Cabinet removal/detach", "Appliance disconnect"],
      commonCodes: ["WTREXT", "WTRCABLOW", "WTRCABLWD", "WTRFCV"]
    },
    bedroom: {
      typicalMaterials: ["Carpet", "Drywall", "Closet"],
      waterDamageScope: ["Carpet extraction", "Pad removal", "Flood cuts", "Contents move"],
      commonCodes: ["WTREXT", "WTRPAD", "WTRDRYWLF", "CONMOV"]
    },
    livingRoom: {
      typicalMaterials: ["Carpet/hardwood", "Drywall", "Large furniture"],
      waterDamageScope: ["Floor extraction", "Flood cuts", "Furniture protection"],
      commonCodes: ["WTREXT", "WTRDRYWLF", "WTRBLK", "CONMOVH"]
    },
    basement: {
      typicalMaterials: ["Concrete", "Drywall", "Insulation"],
      waterDamageScope: ["Full extraction", "Drywall removal", "Insulation removal", "Dehumidification"],
      commonCodes: ["WTREXTH", "WTRDRYW", "WTRINS", "WTRDHMD"],
      notes: "Often Category 3 from groundwater - full containment may be needed"
    },
    attic: {
      typicalMaterials: ["Insulation", "Framing", "Roof sheathing"],
      waterDamageScope: ["Insulation removal", "Structural drying", "Roof repair coordination"],
      commonCodes: ["WTRINS", "WTRINSC", "WTRWALL"]
    },
    crawlspace: {
      typicalMaterials: ["Vapor barrier", "Insulation", "Floor joists"],
      waterDamageScope: ["Vapor barrier removal", "Insulation removal", "Floor drying from below"],
      commonCodes: ["WTRINSC", "WTRWFI", "HMRDIS"],
      notes: "Confined space - additional labor for access"
    }
  },

  // ============================================
  // EQUIPMENT CALCULATION FORMULAS
  // ============================================
  calculations: {
    dehumidifiers: {
      formula: "Cubic Feet ÷ Class Factor = Required AHAM Pints",
      classFactors: {
        lgr: { class1: 100, class2: 50, class3: 40, class4: 40 },
        conventional: { class1: 100, class2: 40, class3: 30 },
        desiccant: { class1: 60, class2: 30, class3: 20, class4: 30 }
      },
      example: "Room 20×15×9 = 2700 CF. Class 2 with LGR: 2700÷50 = 54 pints. If dehu is 110 PPD, need 1 unit."
    },
    airMovers: {
      wetFloor: "1 air mover per 50-70 SF of wet floor",
      walls: "1 per 100-150 SF if wall wicking >2 ft high",
      wallLinear: "1 per 14 LF if wall wicking <2 ft high",
      placementAngle: "5-45 degrees along affected surfaces"
    },
    negativeAir: {
      formula: "(Room Volume × ACH) ÷ 60 = Required CFM",
      recommendedACH: {
        moldRemediation: 4,
        cat3Water: 4,
        smokeCleanup: 4,
        asbestos: 6
      },
      example: "Room 20×15×9 = 2700 CF. At 4 ACH: (2700×4)÷60 = 180 CFM needed"
    }
  }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IICRC_KNOWLEDGE };
}
