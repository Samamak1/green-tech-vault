// Comprehensive e-waste items data based on research
export const ewasteItemsData = {
  // Computers
  "desktop-computer": {
    name: "Desktop Computer",
    category: "Computers",
    description: "Desktop computers are complex electronic devices containing valuable materials including precious metals, rare earth elements, and hazardous substances. A typical desktop contains steel, aluminum, copper, gold, silver, and various plastics. Proper recycling can recover up to 95% of these materials while preventing toxic substances like lead, mercury, and cadmium from entering the environment.",
    conditions: [
      "Complete desktop towers (CPU units)",
      "All brands and models accepted",
      "Working or non-working condition",
      "Units with minor physical damage",
      "Business and consumer desktop computers"
    ],
    notes: [
      "Remove all personal data before disposal",
      "No CRT monitors included (processed separately)",
      "Remove batteries from internal components if accessible"
    ],
    process: [
      "Data Destruction – Secure wiping of all storage devices",
      "Disassembly – Manual removal of components like motherboards, power supplies, and drives",
      "Material Separation – Steel cases, aluminum heat sinks, and copper wiring are sorted",
      "Precious Metal Recovery – Gold, silver, and platinum extracted from circuit boards",
      "Plastic Processing – Various plastics separated and prepared for recycling"
    ],
    impact: [
      "Recover $91 billion worth of materials from global e-waste annually",
      "Prevent 58,000 kg of mercury from entering ecosystems",
      "Reduce CO2 emissions by 93 billion kg through material recovery",
      "Conserve rare earth elements critical for new technology production"
    ]
  },

  "laptop": {
    name: "Laptop",
    category: "Computers",
    description: "Laptops contain concentrated amounts of valuable materials in a compact form factor. They include lithium-ion batteries, LCD screens, motherboards with precious metals, and various rare earth elements. Due to their portable design, laptops require specialized recycling processes to safely handle integrated batteries and recover valuable components.",
    conditions: [
      "All laptop brands and models",
      "Working or non-working condition",
      "Laptops with cracked screens accepted",
      "Units with missing keys or damaged cases",
      "Gaming laptops and workstations included"
    ],
    notes: [
      "Remove all personal data and perform secure data wiping",
      "Batteries will be removed and recycled separately",
      "Remove any external accessories before drop-off"
    ],
    process: [
      "Secure Data Destruction – Multiple-pass data wiping or physical drive destruction",
      "Battery Removal – Lithium-ion batteries safely extracted and processed separately",
      "Component Disassembly – LCD screens, motherboards, and memory modules separated",
      "Precious Metal Extraction – Gold, silver, and palladium recovered from circuit boards",
      "Material Recovery – Aluminum chassis, copper wiring, and rare earth magnets processed"
    ],
    impact: [
      "Prevent lithium-ion battery fires in landfills",
      "Recover critical materials like lithium, cobalt, and rare earth elements",
      "Reduce demand for new mining of precious metals",
      "Keep toxic substances like lead and mercury from contaminating soil and water"
    ]
  },

  "servers": {
    name: "Servers",
    category: "Computers",
    description: "Servers contain high concentrations of valuable materials and are built for durability and performance. They typically include multiple processors, substantial amounts of memory, specialized cooling systems, and enterprise-grade components. Server recycling requires careful handling due to the high value of recoverable materials and potential data security concerns.",
    conditions: [
      "Rack-mount and tower servers",
      "All server manufacturers accepted",
      "Enterprise and small business servers",
      "Blade servers and modular systems",
      "Servers missing components or damaged"
    ],
    notes: [
      "Critical: Secure data destruction is mandatory",
      "Remove all hard drives if data destruction is not required",
      "Include power cables and basic components"
    ],
    process: [
      "Security Assessment – Evaluation of data storage devices",
      "Certified Data Destruction – DOD-compliant data wiping or physical destruction",
      "Component Harvesting – High-value processors, memory, and components separated",
      "Precious Metal Recovery – Extensive gold, silver, and palladium extraction",
      "Material Separation – Steel chassis, aluminum components, and copper infrastructure"
    ],
    impact: [
      "Maximize recovery of high-value precious metals",
      "Prevent sensitive business data from data breaches",
      "Reduce demand for mining rare earth elements",
      "Support secure enterprise equipment lifecycle management"
    ]
  },

  "tablets": {
    name: "Tablets",
    category: "Computers",
    description: "Tablets combine the complexity of computers with the portability of mobile devices. They contain LCD screens, lithium batteries, circuit boards with precious metals, and various sensors. Tablet recycling requires specialized processes to handle the integrated batteries and recover the valuable materials in their compact design.",
    conditions: [
      "All tablet brands (iPad, Android, Windows tablets)",
      "Working or non-working condition",
      "Tablets with cracked screens or damaged cases",
      "E-readers and similar devices",
      "Business and consumer tablets"
    ],
    notes: [
      "Remove all personal data before disposal",
      "Include charging cables if available",
      "Remove protective cases and screen protectors"
    ],
    process: [
      "Data Destruction – Secure wiping of internal storage",
      "Battery Extraction – Safe removal of lithium-ion batteries",
      "Screen Separation – LCD/OLED displays processed for glass and component recovery",
      "Circuit Board Processing – Recovery of precious metals from main boards",
      "Component Recycling – Cameras, speakers, and sensors separated for material recovery"
    ],
    impact: [
      "Prevent toxic lithium battery waste in landfills",
      "Recover rare earth elements used in touchscreens",
      "Reduce demand for new lithium mining",
      "Support circular economy for portable electronics"
    ]
  },

  "monitors": {
    name: "Monitors",
    category: "Computers",
    description: "Computer monitors contain valuable materials and potentially hazardous substances depending on their type. LCD monitors contain precious metals, plastics, and backlighting materials, while older CRT monitors contain lead glass that requires special handling. Modern monitors use advanced materials including rare earth elements in their display panels.",
    conditions: [
      "LCD, LED, and OLED monitors",
      "CRT monitors (with special handling)",
      "All screen sizes accepted",
      "Gaming and professional monitors",
      "Monitors with minor damage or dead pixels"
    ],
    notes: [
      "CRT monitors require special lead-safe processing",
      "Remove monitor stands and cables if easily detachable",
      "LCD monitors with cracked screens are acceptable"
    ],
    process: [
      "Type Classification – Separate handling for CRT vs. LCD technologies",
      "Hazardous Material Removal – Lead glass and mercury bulbs safely extracted",
      "Component Disassembly – Plastic casings, metal frames, and electronic components separated",
      "Material Recovery – Precious metals from circuit boards, aluminum from frames",
      "Glass Processing – LCD glass recycled, CRT glass processed for lead recovery"
    ],
    impact: [
      "Prevent lead contamination from CRT monitors",
      "Recover precious metals from display electronics",
      "Recycle specialized plastics used in monitor casings",
      "Reduce demand for new rare earth elements in display manufacturing"
    ]
  },

  // Mobile Devices
  "smartphones": {
    name: "Smartphones",
    category: "Mobile Devices",
    description: "Smartphones are among the most resource-intensive electronics to manufacture, containing over 60 different elements including precious metals, rare earth elements, and hazardous materials. Despite their small size, they have a disproportionately high environmental impact and value for recycling due to their complex components and manufacturing processes.",
    conditions: [
      "All smartphone brands and models",
      "Working or non-working devices",
      "Phones with cracked screens or water damage",
      "Business and personal smartphones",
      "Devices missing batteries or back covers"
    ],
    notes: [
      "Remove all personal data and perform factory reset",
      "Remove SIM cards and memory cards",
      "Include charging cables and accessories if available"
    ],
    process: [
      "Secure Data Destruction – Multiple overwrite data wiping processes",
      "Battery Removal – Lithium-ion batteries safely extracted and processed",
      "Component Separation – Screens, cameras, speakers, and circuit boards disassembled",
      "Precious Metal Recovery – Gold, silver, platinum, and palladium extraction",
      "Rare Earth Processing – Recovery of critical elements like neodymium and dysprosium"
    ],
    impact: [
      "Recover $7-10 worth of precious metals per device",
      "Prevent toxic substances from entering water supplies",
      "Reduce demand for conflict minerals mining",
      "Support sustainable mobile device lifecycles"
    ]
  },

  "cell-phones": {
    name: "Cell Phones",
    category: "Mobile Devices",
    description: "Traditional cell phones and feature phones contain valuable materials in a simpler package than smartphones. They still include precious metals in their circuit boards, batteries that require special handling, and various plastics and metals. Older cell phones often contain different materials than modern devices, requiring specialized processing.",
    conditions: [
      "Basic cell phones and feature phones",
      "All carriers and manufacturers",
      "Working or non-working condition",
      "Phones with physical damage",
      "Vintage and retro mobile phones"
    ],
    notes: [
      "Remove batteries if easily accessible",
      "Clear any stored contacts or messages",
      "Include chargers if available"
    ],
    process: [
      "Battery Extraction – Safe removal of various battery types",
      "Circuit Board Recovery – Precious metal extraction from main boards",
      "Plastic Separation – Different plastic types sorted for recycling",
      "Metal Recovery – Steel, aluminum, and copper components processed",
      "Antenna Processing – Recovery of metals from antenna systems"
    ],
    impact: [
      "Extend material recovery to older technology generations",
      "Prevent battery waste accumulation",
      "Support comprehensive mobile device recycling programs",
      "Recover materials from legacy communication devices"
    ]
  },

  "ipads": {
    name: "iPads",
    category: "Mobile Devices",
    description: "iPads and similar tablets contain sophisticated materials including aluminum chassis, lithium batteries, LCD displays with advanced backlighting, and complex circuit boards. Apple's use of premium materials means iPads have particularly high recovery value, while their integrated design requires specialized disassembly techniques.",
    conditions: [
      "All iPad generations and models",
      "iPad Mini, Air, and Pro variants",
      "Working or non-working condition",
      "Devices with screen damage",
      "iPads with battery issues"
    ],
    notes: [
      "Disable Find My iPad before disposal",
      "Remove all personal data and sign out of accounts",
      "Include charging cables and accessories"
    ],
    process: [
      "Account Verification – Ensure device is properly signed out",
      "Secure Data Destruction – Advanced data wiping protocols",
      "Precision Disassembly – Careful separation of integrated components",
      "Aluminum Recovery – High-grade aluminum chassis recycling",
      "Component Harvesting – Recovery of cameras, sensors, and specialized chips"
    ],
    impact: [
      "Maximize value recovery from premium materials",
      "Support Apple's environmental goals through proper recycling",
      "Prevent waste of high-quality aluminum and other materials",
      "Contribute to circular economy in premium electronics"
    ]
  },

  "smart-watches": {
    name: "Smart Watches",
    category: "Mobile Devices",
    description: "Smart watches pack complex technology into extremely small form factors, including sensors, processors, batteries, and displays. They contain precious metals, rare earth elements for sensors and vibration motors, and specialized materials for water resistance and durability.",
    conditions: [
      "All smart watch brands (Apple Watch, Samsung, Fitbit, etc.)",
      "Fitness trackers and activity monitors",
      "Working or non-working condition",
      "Watches with damaged screens or bands",
      "Devices with battery issues"
    ],
    notes: [
      "Remove personal health and fitness data",
      "Unpair from smartphones before disposal",
      "Include charging cables and bands if available"
    ],
    process: [
      "Data Clearing – Removal of personal health and activity data",
      "Miniature Disassembly – Specialized tools for small component separation",
      "Sensor Recovery – Precious metals from heart rate and motion sensors",
      "Battery Processing – Safe handling of compact lithium batteries",
      "Material Sorting – Separation of metals, plastics, and specialized materials"
    ],
    impact: [
      "Recover rare earth elements from compact sensors",
      "Prevent accumulation of small electronic waste",
      "Support sustainable wearable technology lifecycle",
      "Maximize material recovery from miniaturized components"
    ]
  },

  // Office Equipment
  "printers": {
    name: "Printers",
    category: "Office Equipment",
    description: "Printers contain a complex mix of materials including steel frames, plastic casings, electronic components, and often hazardous substances like toner and inks. Different printer types (inkjet, laser, multifunction) require different recycling approaches due to their varying components and potential contamination issues.",
    conditions: [
      "Inkjet, laser, and dot matrix printers",
      "Multifunction printers and copiers",
      "All brands and sizes",
      "Working or non-working condition",
      "Printers with paper jams or mechanical issues"
    ],
    notes: [
      "Remove all ink cartridges and toner before disposal",
      "Clear any paper from paper trays",
      "Include power cables if easily accessible"
    ],
    process: [
      "Consumable Removal – Separate processing of ink cartridges and toner",
      "Disassembly – Separation of plastic casings, metal frames, and electronic components",
      "Motor Recovery – Extraction of motors and mechanical components",
      "Electronic Processing – Circuit boards processed for precious metal recovery",
      "Material Separation – Steel, aluminum, and various plastics sorted for recycling"
    ],
    impact: [
      "Prevent toner and ink contamination of landfills",
      "Recover substantial amounts of steel and aluminum",
      "Support office equipment circular economy",
      "Reduce demand for new printer manufacturing materials"
    ]
  },

  "scanners": {
    name: "Scanners",
    category: "Office Equipment",
    description: "Scanners contain precision optical components, motors, electronic circuits, and various metals and plastics. Some older scanners may contain mercury in their bulbs, requiring special handling. Modern scanners use LED lighting and contain valuable electronic components that can be recovered.",
    conditions: [
      "Flatbed and sheet-fed scanners",
      "All-in-one scanner units",
      "Photo scanners and document scanners",
      "Working or non-working condition",
      "Scanners with damaged glass or mechanical issues"
    ],
    notes: [
      "Handle carefully due to glass components",
      "Some older units may contain mercury bulbs",
      "Remove any documents from the scanner bed"
    ],
    process: [
      "Hazard Assessment – Check for mercury-containing bulbs in older models",
      "Optical Component Recovery – Separation of lenses and mirrors",
      "Electronic Processing – Circuit boards and sensors processed for materials",
      "Motor Recovery – Stepper motors and mechanical components extracted",
      "Material Separation – Glass, metals, and plastics sorted appropriately"
    ],
    impact: [
      "Prevent mercury contamination from older scanner bulbs",
      "Recover precision metals from optical components",
      "Support sustainable office equipment management",
      "Reduce electronic waste in business environments"
    ]
  },

  "fax-machines": {
    name: "Fax Machines",
    category: "Office Equipment",
    description: "Fax machines contain electronic components, motors, and various materials typical of office equipment. While becoming less common, they still enter the waste stream from offices upgrading their communication systems. They contain circuit boards, power supplies, and mechanical components that can be recycled.",
    conditions: [
      "Standalone fax machines",
      "Thermal and inkjet fax machines",
      "All brands and models",
      "Working or non-working condition",
      "Units with paper feed or printing issues"
    ],
    notes: [
      "Remove any paper from input and output trays",
      "Clear any stored fax numbers or messages",
      "Include power cables if available"
    ],
    process: [
      "Electronic Component Recovery – Circuit boards processed for precious metals",
      "Motor Extraction – Recovery of paper feed and printing motors",
      "Plastic Processing – Various plastic components separated for recycling",
      "Metal Recovery – Steel frames and aluminum components processed",
      "Wire Recovery – Copper wiring and cables extracted"
    ],
    impact: [
      "Prevent obsolete communication equipment from becoming waste",
      "Recover materials from legacy office technology",
      "Support transition to modern communication systems",
      "Contribute to comprehensive office equipment recycling"
    ]
  },

  "copiers": {
    name: "Copiers",
    category: "Office Equipment",
    description: "Commercial copiers are large, complex machines containing substantial amounts of recoverable materials including steel frames, aluminum components, and sophisticated electronic systems. They often contain toner, which requires careful handling, and valuable components like large motors and precision optical systems.",
    conditions: [
      "Desktop and floor-standing copiers",
      "Digital and analog copying machines",
      "All commercial and consumer models",
      "Working or non-working condition",
      "Units with mechanical or electronic failures"
    ],
    notes: [
      "Professional removal may be required for large units",
      "Remove all toner cartridges before pickup",
      "Clear any stored documents or settings"
    ],
    process: [
      "Toner Removal – Safe extraction and processing of all toner materials",
      "Large Component Disassembly – Separation of major mechanical and electronic systems",
      "Metal Recovery – Substantial steel frame and aluminum component processing",
      "Electronic Processing – Complex circuit boards and control systems processed",
      "Optical Component Recovery – Mirrors, lenses, and scanning systems extracted"
    ],
    impact: [
      "Recover substantial amounts of steel and aluminum",
      "Prevent toner contamination of waste streams",
      "Support sustainable office equipment lifecycle management",
      "Maximize material recovery from complex office machinery"
    ]
  },

  "shredders": {
    name: "Shredders",
    category: "Office Equipment",
    description: "Paper shredders contain powerful motors, steel cutting mechanisms, and electronic controls. They are built with durable materials designed for continuous operation, making them valuable for material recovery. The motors and steel components have particularly high recycling value.",
    conditions: [
      "Personal and commercial paper shredders",
      "Strip-cut and cross-cut shredders",
      "All sizes and capacities",
      "Working or non-working condition",
      "Units with jammed or damaged cutting mechanisms"
    ],
    notes: [
      "Clear any paper jams before disposal",
      "Remove waste bags or containers",
      "Include power cables if attached"
    ],
    process: [
      "Motor Recovery – High-value electric motors extracted and processed",
      "Steel Processing – Cutting blades and frames processed for steel recovery",
      "Electronic Component Recovery – Control circuits and switches processed",
      "Plastic Processing – Housing and component plastics separated",
      "Wire Recovery – Copper wiring and power cables extracted"
    ],
    impact: [
      "Recover high-value electric motors for remanufacturing",
      "Process durable steel components for new steel production",
      "Support secure document destruction equipment lifecycle",
      "Prevent unnecessary waste of robust office equipment"
    ]
  },

  // Add more categories and items...
  "keyboards": {
    name: "Keyboards",
    category: "Peripherals",
    description: "Computer keyboards are one of the most commonly used peripheral devices. They come in various forms—wired, wireless, mechanical, and membrane. While small in size, they contain a mix of plastics, metals, and electronic components that can be hazardous if not properly recycled.",
    conditions: [
      "Wired or wireless keyboards",
      "Mechanical, membrane, or ergonomic models",
      "Keyboards with minor cosmetic damage (scratches, missing keycaps)",
      "No batteries leaking or excessive corrosion"
    ],
    notes: [
      "Remove batteries before drop-off (especially AA/AAA batteries).",
      "No wet or moldy items."
    ],
    process: [
      "Manual Disassembly – Plastic casing, rubber, and electronic parts are separated.",
      "Material Sorting – Metals like copper and aluminum are extracted.",
      "Shredding – Remaining parts are shredded and sorted by material type.",
      "Reuse & Repurposing – Usable components are recovered for refurbishing or raw material supply."
    ],
    impact: [
      "Prevent plastic waste from entering landfills",
      "Recover precious metals like gold, copper, and silver",
      "Reduce the demand for virgin materials used in new electronics",
      "Lower greenhouse gas emissions associated with raw material extraction"
    ]
  }

  // Note: This is a partial implementation. In a full implementation, 
  // you would continue adding all the remaining items from the accepted items list
};

// Function to get item data by slug
export const getItemDataBySlug = (slug) => {
  return ewasteItemsData[slug] || null;
};

// Function to get all item slugs
export const getAllItemSlugs = () => {
  return Object.keys(ewasteItemsData);
}; 