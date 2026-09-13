/**
 * Executive Portfolio Data for Sudhanshu Kulshreshtha
 * Head of Data • Founder & CEO @ Loggdin
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Sudhanshu Kulshreshtha",
    role: "Head of Data & Executive Leader",
    venture: "Founder & CEO, Loggdin",
    location: "Dublin, Ireland",
    email: "kul.sudhanshu@gmail.com",
    phone: "+353 871 738 826",
    linkedin: "https://linkedin.com/in/sudhanshu-kulshreshtha",
    bio: "Purpose-driven leader with 13+ years transforming ambiguous challenges into evidence-led solutions across Ireland's youth mental-health and nonprofit sector. Operating as SpunOut's one-person data function, I partner directly with the Board and Senior Leadership on strategic performance, research, and governance. In parallel, as Founder & CEO of Loggdin, I lead an independent studio delivering digital products, executive reporting, and practical AI solutions.",
    stats: [
      { value: "13+", label: "Years Experience", detail: "Leadership across data, governance & impact" },
      { value: "250k+", label: "Youth Conversations", detail: "Five-year national milestone publication" },
      { value: "3-Tier", label: "Board Model", detail: "Praised reporting architecture for Board & SLT" },
      { value: "Sole Lead", label: "Data Function", detail: "End-to-end ownership across 50k annual chats" }
    ]
  },

  executivePillars: [
    {
      title: "Youth Mental Health & Sector Authority",
      description: "Direct authority in Ireland's youth support ecosystem. Led the national analysis behind SpunOut's 250,000 Conversations report and the published Loneliness Report, translating service data into published evidence that informs national health policy and funders."
    },
    {
      title: "Board Partnership & Strategic Governance",
      description: "Proven track record partnering directly with Boards and Senior Leadership. Designed a praised 3-layer reporting architecture that eliminated reporting friction, while actively serving on the Finance, Planning, and Technology committees of the Irish Vipassana Trust."
    },
    {
      title: "Executive Agility & Digital Delivery",
      description: "Combines strategic governance with entrepreneurial speed. As Founder & CEO of Loggdin, personally sets business direction, builds digital products, and designs responsible AI and automation frameworks with high execution discipline."
    }
  ],

  initiatives: [
    {
      id: "mental-health-250k",
      category: "National Research & Impact",
      title: "250,000 Conversations: Landmark 5-Year Youth Mental Health Study",
      leadMetric: "250,000 Conversations • 7.9M Messages",
      summary: "Led the complete data and analytical workstream synthesizing 5 years of frontline service data into Ireland's benchmark publication on youth mental health trends.",
      challenge: "Consolidating 5 years of fragmented multi-source service data, volunteer metrics, and demographic trends into a privacy-compliant, rigorous evidence base under strict GDPR requirements.",
      action: "Unified lakehouse data pipelines, developed thematic text models of co-occurring mental health issues (loneliness, anxiety, distress), and modeled service availability and volunteer contributions.",
      outcome: "Delivered the evidence foundation for SpunOut's public-facing report '250,000 Conversations — A Real-Time View of Youth Mental Health in Ireland', shaping national dialogue and strategic funding.",
      metrics: [
        { value: "250k", label: "Conversations" },
        { value: "7.9M", label: "Messages" },
        { value: "5 Years", label: "Longitudinal Span" },
        { value: "National", label: "Benchmark Report" }
      ]
    },
    {
      id: "board-reporting-engine",
      category: "Executive Governance",
      title: "Three-Layer Board Reporting Architecture",
      leadMetric: "Praised by Board & Senior Leadership",
      summary: "Architected a repeatable executive reporting architecture combining strategic narrative, operational KPIs, and 3-year historical comparisons.",
      challenge: "Executive leadership and the Board faced high-friction, retroactive reporting cycles that hindered rapid strategic decision-making and generated repetitive data requests.",
      action: "Designed a 3-tier reporting architecture: Layer 1 delivers high-level quarterly executive narratives and strategic KPIs; Layer 2 monitors operational SLAs and monthly variance; Layer 3 provides governed 3-year historical drilldowns.",
      outcome: "Repeatedly praised by the Board and Senior Leadership Team, cut reporting preparation overhead, and allowed emerging strategic requests to be answered near-instantly.",
      metrics: [
        { value: "Board & SLT", label: "Executive Level" },
        { value: "3-Layer", label: "Architecture" },
        { value: "Near-Zero", label: "Reporting Back-and-Forth" },
        { value: "On-Demand", label: "Strategic Drilldowns" }
      ]
    },
    {
      id: "service-improvement-ace",
      category: "Trauma-Informed Service Improvement",
      title: "Survey Redesign & Post-Chat ACE Review (+14% Response Lift)",
      leadMetric: "Response Rate: 8.4% → 9.6% (+14.3%)",
      summary: "Conducted thematic analysis of lower-rated chats, reviewed the clinical timing of ACE questions, and executed a survey overhaul that lifted user response rates.",
      challenge: "Identifying the root cause of 1-to-3 star ratings without breaking historical longitudinal trend lines or causing distress to vulnerable young people immediately following a support chat.",
      action: "Analyzed qualitative chat feedback, isolated confusing survey wording, and initiated clinical discussions regarding whether sensitive Adverse Childhood Experiences (ACE) questions were appropriate immediately post-conversation. Restructured the questionnaire and data schemas.",
      outcome: "Lifted survey response rates from 8.4% to 9.6% in year one while creating a more trauma-informed, respectful feedback pathway for young people.",
      metrics: [
        { value: "8.4% → 9.6%", label: "Response Rate" },
        { value: "+14.3%", label: "Relative Lift" },
        { value: "ACE Review", label: "Trauma-Informed" },
        { value: "100%", label: "Historical Continuity" }
      ]
    },
    {
      id: "loggdin-studio",
      category: "Venture Leadership & Innovation",
      title: "Loggdin: Independent Digital Studio & AI Solutions",
      leadMetric: "Founded July 2026 • CRO-Registered",
      summary: "Founded an independent Dublin digital studio delivering reporting architectures, digital products, AI strategy, and automated workflows.",
      challenge: "Bridging modern technology, practical AI adoption, and high-integrity reporting into viable digital products and advisory services.",
      action: "Established Loggdin with an open-build ethos. Architected public-facing digital tools (including a driving-test route platform), automated productivity systems, and advised on responsible AI frameworks.",
      outcome: "Demonstrated proven chief executive capability—setting company direction, defining products, and personally delivering solutions from concept through production.",
      metrics: [
        { value: "July 2026", label: "Founded in Dublin" },
        { value: "CEO", label: "Executive Leadership" },
        { value: "Open-Build", label: "Operating Model" },
        { value: "Live", label: "Digital Products" }
      ]
    }
  ],

  experience: [
    {
      role: "One-Person Data Function Lead (Designation: Data Analyst)",
      company: "SpunOut — Ireland's Youth Information & Support Platform",
      period: "Dec 2022 – Present",
      location: "Dublin, Ireland",
      summary: "Organisation-wide responsibility for data, analytics, research, and governance, partnering directly with the Board and Senior Leadership.",
      keyAchievements: [
        "Developed the commended 3-layer Board reporting model covering strategic narrative, KPIs, and 3-year comparisons.",
        "Led the national data workstream for the 250,000 Conversations 5-year report and contributed to the published Loneliness Report.",
        "Delivered two major BI migrations (Periscope → Sisense → Sigma) and secured Databricks lakehouse capability.",
        "Led thematic analysis driving the trauma-informed survey redesign that increased response rates from 8.4% to 9.6%.",
        "Formulated the organisation-wide AI governance framework, GDPR compliance, and data literacy training."
      ]
    },
    {
      role: "Founder & CEO",
      company: "Loggdin",
      period: "July 2026 – Present",
      location: "Dublin, Ireland",
      summary: "Leads an independent studio delivering digital products, executive reporting, AI strategy, and automation.",
      keyAchievements: [
        "Sets strategic direction, product roadmaps, and delivery architecture for digital solutions.",
        "Engineered and launched public-facing digital platforms and automated workflow systems.",
        "Advises on responsible AI adoption and high-integrity reporting architectures."
      ]
    },
    {
      role: "Professional Experience Across Technology & Operations",
      company: "Global Organizations (Emirates Airlines, Accenture, Amdocs, HCL)",
      period: "2013 – 2021",
      location: "Dubai, UAE & India",
      summary: "Over eight years delivering data analytics, executive dashboards, team mentorship, and digital transformation.",
      keyAchievements: [
        "BI Consultant at HCL (2020–2021): Enterprise BI solutions; developed 4 IVR workflows reducing call load by 10%.",
        "Marketing Specialist at Emirates Airlines (2019–2020, Dubai): Passenger forecasting and customer sentiment NLP modeling.",
        "Senior Business Analyst at Amdocs (2017–2019): Managed and mentored analyst team on predictive cost forecasting.",
        "Business Analyst at Accenture (2016–2017): Tableau dashboards for Commercial Banking CFO group; 15% reduction in ticket volumes."
      ]
    }
  ],

  governanceAndCivic: [
    {
      title: "Irish Vipassana Trust — Committee Member",
      period: "Aug 2024 – Oct 2025",
      detail: "Appointed to support the establishment of a permanent property in Ireland, advising across Finance, Planning, and Technology committees."
    },
    {
      title: "Seven Cups — Volunteer Listener & Safety Volunteer",
      period: "~4 Years",
      detail: "Completed structured peer-support training. Delivered 2,397 support chats, 351 listener chats, and progressed to community safety oversight."
    },
    {
      title: "250,000 Conversations & Loneliness Reports",
      period: "Published Evidence",
      detail: "Authored data workstreams for SpunOut's landmark public reports on youth mental health trends, co-occurring concerns, and service demand."
    },
    {
      title: "Organisation-Wide AI Governance Framework",
      period: "Strategic Policy",
      detail: "Designed an organization-wide framework for responsible AI adoption, risk controls, and ethical implementation."
    }
  ],

  credentials: {
    education: [
      { degree: "MSc in Computing (Data Analytics)", school: "Dublin City University (DCU)", year: "2021–2022" },
      { degree: "Bachelor of Technology (B.Tech)", school: "Rajasthan Technical University", year: "2009–2013" }
    ],
    certifications: [
      "Microsoft Certified: Azure Data Fundamentals (DP-900)",
      "Microsoft Certified: Azure Fundamentals (AZ-900)"
    ]
  }
};
