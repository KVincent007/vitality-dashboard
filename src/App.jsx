import React, { useState, useEffect } from 'react';
import { 
  Activity, Apple, Zap, Shield, Heart, 
  Droplet, Dna, ArrowRight, ActivitySquare, 
  Syringe, Activity as VitalIcon, UserCheck, 
  AlertCircle, CheckCircle2, TrendingUp,
  TrendingDown, Minus
} from 'lucide-react';

function useForceReflow() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const bump = () => setTick((t) => t + 1);

    // Force a few re-renders after load
    const t1 = setTimeout(bump, 50);
    const t2 = setTimeout(bump, 250);
    const t3 = setTimeout(bump, 800);

    // Also re-render on resize
    window.addEventListener("resize", bump);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", bump);
    };
  }, []);
}

// --- MOCK DATA CONFIGURED FOR TIER 0 AND TIER 2 COMPARISON ---
// Represents an 80-Year-Old Patient Profile based strictly on requested domains
const tierConfigs = {
  tier0: {
    title: "Tier 0 Recommendation Card",
    description: "Based strictly on functional screening, vital signs, and standard risk assessments.",
    age: 80,
    lastUpdated: "Q1 2026",
    overallScore: 58,
    projectedScore: 68,
    domains: [
      {
        id: "nutrition",
        name: "Nutrition",
        icon: <Apple className="w-5 h-5 text-emerald-500" />,
        current: 55,
        projected: 70,
        markers: [
          { type: "functional", name: "MNA-SF", value: "10/14", status: "warning", trend: "down" },
          { type: "functional", name: "MUAC", value: "21.5 cm", status: "warning", trend: "down" }
        ],
        interventions: [
          "Initiate Oral Nutritional Supplements (ONS)",
          "General dietary counseling & education",
          "Home-delivered high-protein meals"
        ]
      },
      {
        id: "immune",
        name: "Immune/Inflammation",
        icon: <Shield className="w-5 h-5 text-purple-500" />,
        current: 60,
        projected: 65,
        markers: [
          { type: "functional", name: "Body Temperature", value: "98.6°F", status: "normal", trend: "stable" },
          { type: "functional", name: "Infection Screen", value: "Negative", status: "normal", trend: "stable" }
        ],
        interventions: [
          "Maintain up-to-date vaccinations",
          "Consistent daily sleep schedule",
          "General infection prevention protocols"
        ]
      },
      {
        id: "heart",
        name: "Heart",
        icon: <Heart className="w-5 h-5 text-red-500" />,
        current: 58,
        projected: 66,
        markers: [
          { type: "functional", name: "Blood Pressure", value: "135/85", status: "warning", trend: "stable" },
          { type: "functional", name: "Resting HR", value: "78 bpm", status: "normal", trend: "up" }
        ],
        interventions: [
          "Moderate dietary sodium restriction",
          "20-30 min daily light walking",
          "Routine clinical blood pressure monitoring"
        ]
      },
      {
        id: "liver",
        name: "Liver",
        icon: <ActivitySquare className="w-5 h-5 text-amber-500" />,
        current: 55,
        projected: 68,
        markers: [
          { type: "functional", name: "Medication Count", value: "6 (Polypharmacy)", status: "warning", trend: "up" },
          { type: "functional", name: "Alcohol Intake", value: "0 units/wk", status: "normal", trend: "stable" }
        ],
        interventions: [
          "Clinical medication review for hepatotoxicity",
          "Minimize unnecessary over-the-counter meds",
          "Maintain current alcohol abstinence"
        ]
      },
      {
        id: "kidney",
        name: "Kidney",
        icon: <Droplet className="w-5 h-5 text-blue-500" />,
        current: 62,
        projected: 70,
        markers: [
          { type: "functional", name: "Fluid Intake (MNA)", value: "Suboptimal", status: "warning", trend: "down" },
          { type: "functional", name: "NSAID Use", value: "Frequent", status: "warning", trend: "up" }
        ],
        interventions: [
          "Scheduled daily fluid intake program",
          "Reduce reliance on NSAIDs for pain management",
          "Monitor urine color for hydration status"
        ]
      },
      {
        id: "mitochondrial",
        name: "Mitochondrial",
        icon: <Zap className="w-5 h-5 text-yellow-500" />,
        current: 58,
        projected: 69,
        markers: [
          { type: "functional", name: "Reported Fatigue", value: "Moderate", status: "warning", trend: "up" },
          { type: "functional", name: "Mobility (MNA)", value: "Slowed", status: "warning", trend: "down" }
        ],
        interventions: [
          "Energy conservation techniques",
          "Light, consistent daily movement",
          "Avoid large, heavy meals that induce lethargy"
        ]
      }
    ],
    topActions: [
      {
        action: "Initiate daily Oral Nutritional Supplements (ONS)",
        reason: "Improves MNA-SF scores and corrects broad malnutrition risks in older adults."
      },
      {
        action: "Perform comprehensive clinical medication review",
        reason: "Directly reduces the polypharmacy burden on liver and kidney clearance pathways."
      },
      {
        action: "Implement scheduled daily fluid intake",
        reason: "Addresses suboptimal hydration, supporting baseline kidney filtration and vascular volume."
      }
    ]
  },
  tier2: {
    title: "Tier 2 Recommendation Card",
    description: "Integrates multi-omic data (blood biomarkers, genetics) with functional baseline.",
    age: 80,
    lastUpdated: "Q1 2026",
    overallScore: 64,
    projectedScore: 78,
    domains: [
      {
        id: "nutrition",
        name: "Nutrition",
        icon: <Apple className="w-5 h-5 text-emerald-500" />,
        current: 62,
        projected: 82,
        markers: [
          { type: "functional", name: "MNA-SF", value: "10/14", status: "warning", trend: "down" },
          { type: "blood", name: "Omega-3 Index", value: "3.2%", status: "critical", trend: "down" },
          { type: "blood", name: "Vitamin B12", value: "350 pg/mL", status: "warning", trend: "stable" }
        ],
        interventions: [
          "High-dose Omega-3 supplementation",
          "Increase intake of B12-fortified foods",
          "Targeted protein distribution across meals"
        ]
      },
      {
        id: "immune",
        name: "Immune/Inflammation",
        icon: <Shield className="w-5 h-5 text-purple-500" />,
        current: 55,
        projected: 75,
        markers: [
          { type: "blood", name: "hs-CRP", value: "3.1 mg/L", status: "critical", trend: "up" },
          { type: "blood", name: "NLR (CBC)", value: "2.8", status: "warning", trend: "up" },
          { type: "blood", name: "Ferritin", value: "245 ng/mL", status: "warning", trend: "up" }
        ],
        interventions: [
          "Mediterranean-style eating pattern",
          "Tea/coffee with meals (inhibits iron absorption)",
          "Address potential sleep apnea"
        ]
      },
      {
        id: "heart",
        name: "Heart",
        icon: <Heart className="w-5 h-5 text-red-500" />,
        current: 65,
        projected: 76,
        markers: [
          { type: "functional", name: "Blood Pressure", value: "135/85", status: "warning", trend: "stable" },
          { type: "blood", name: "ApoB", value: "110 mg/dL", status: "warning", trend: "stable" },
          { type: "genetic", name: "APOE rs429358", value: "E3/E3", status: "info", trend: "stable" }
        ],
        interventions: [
          "Increase soluble fiber (oats, legumes)",
          "Strict Mediterranean diet adherence",
          "Maintain light daily cardiovascular activity"
        ]
      },
      {
        id: "liver",
        name: "Liver",
        icon: <ActivitySquare className="w-5 h-5 text-amber-500" />,
        current: 68,
        projected: 79,
        markers: [
          { type: "functional", name: "Medication Count", value: "6", status: "warning", trend: "stable" },
          { type: "blood", name: "Total Bilirubin", value: "1.4 mg/dL", status: "warning", trend: "stable" },
          { type: "blood", name: "ALT", value: "35 U/L", status: "warning", trend: "up" }
        ],
        interventions: [
          "Targeted antioxidant support via colorful vegetables",
          "Routine medication review for hepatic clearance",
          "Moderate daily coffee consumption (if tolerated)"
        ]
      },
      {
        id: "kidney",
        name: "Kidney",
        icon: <Droplet className="w-5 h-5 text-blue-500" />,
        current: 60,
        projected: 74,
        markers: [
          { type: "functional", name: "NSAID Use", value: "Frequent", status: "warning", trend: "up" },
          { type: "blood", name: "Cystatin C", value: "1.12 mg/L", status: "warning", trend: "up" },
          { type: "blood", name: "Urine ACR", value: "25 mg/g", status: "normal", trend: "stable" }
        ],
        interventions: [
          "Strict blood pressure control (Diet + Meds)",
          "Avoid nephrotoxic drugs/minimize NSAIDs",
          "Ensure consistent, adequate hydration"
        ]
      },
      {
        id: "mitochondrial",
        name: "Mitochondrial",
        icon: <Zap className="w-5 h-5 text-yellow-500" />,
        current: 62,
        projected: 80,
        markers: [
          { type: "blood", name: "HbA1c", value: "5.9%", status: "warning", trend: "up" },
          { type: "blood", name: "Fasting Glucose", value: "105 mg/dL", status: "warning", trend: "stable" },
          { type: "genetic", name: "PPARG rs1801282", value: "G Allele", status: "info", trend: "stable" }
        ],
        interventions: [
          "Shift fat quality to MUFA (Olive oil, nuts)",
          "10-minute post-meal walks",
          "Limit saturated fat <10% of calories"
        ]
      }
    ],
    topActions: [
      {
        action: "Shift dietary fat to MUFA (Olive Oil, Nuts)",
        reason: "PPARG G-allele indicates sensitivity to saturated fat; shifting to MUFA explicitly targets elevated HbA1c to support mitochondrial/metabolic health."
      },
      {
        action: "Add High-Dose Omega-3 Supplement",
        reason: "Directly addresses the critically low Omega-3 Index while supporting the targeted reduction of systemic hs-CRP in the Immune/Inflammation domain."
      },
      {
        action: "Replace NSAIDs and optimize hydration",
        reason: "Protects vulnerable kidney function (indicated by rising Cystatin C) and reduces overall systemic stress."
      }
    ]
  }
};

export default function App() {
  useForceReflow();
  const [activeTab, setActiveTab] = useState('tier2'); // 'tier0', 'tier2', or 'comparison'

  const currentProfile = tierConfigs[activeTab] || tierConfigs.tier2;

  const renderTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-3 h-3" />;
      case 'down': return <TrendingDown className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getTypeStyles = (type) => {
    switch(type) {
      case 'blood': return 'bg-red-50 text-red-700 border-red-100';
      case 'genetic': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="py-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <VitalIcon className="w-8 h-8 text-blue-600" />
              Vitality Protocol Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Personalized precision health mapping for active aging.</p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-slate-200 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('tier0')}
              className={`flex-1 md:flex-none whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === 'tier0' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Tier 0 Recommendation Card
            </button>
            <button
              onClick={() => setActiveTab('tier2')}
              className={`flex-1 md:flex-none whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === 'tier2' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Tier 2 Recommendation Card
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex-1 md:flex-none whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === 'comparison' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Test Comparison Analysis
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main>
          {(activeTab === 'tier0' || activeTab === 'tier2') && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              {/* Score Header */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{currentProfile.title}</h2>
                  <p className="text-slate-500 text-sm mb-4">{currentProfile.description}</p>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Patient Age</div>
                      <div className="text-2xl font-bold text-slate-800">{currentProfile.age} yrs</div>
                    </div>
                    <div className="h-10 w-px bg-slate-200"></div>
                    <div>
                      <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Last Updated</div>
                      <div className="text-xl font-bold text-slate-800">{currentProfile.lastUpdated}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 text-white flex flex-col justify-center items-center text-center">
                  <div className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">Vitality Score</div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-extrabold">{currentProfile.overallScore}</span>
                    <span className="text-xl text-blue-200">/ 100</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-300 text-sm font-medium mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Projected: {currentProfile.projectedScore}</span>
                  </div>
                </div>
              </div>

              {/* Domains list */}
              <div className="space-y-6">
                {currentProfile.domains.map(domain => (
                  <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 gap-4">
                       <div className="flex items-center gap-3">
                         <div className="bg-white p-2 rounded-lg shadow-sm">
                           {domain.icon}
                         </div>
                         <h3 className="text-lg font-bold text-slate-800">{domain.name}</h3>
                       </div>
                       <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                          <div className="text-sm text-slate-500">Current: <span className="font-bold text-slate-800 text-base">{domain.current}</span></div>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                          <div className="text-sm text-slate-500">Target: <span className="font-bold text-emerald-600 text-base">{domain.projected}</span></div>
                       </div>
                    </div>
                    
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
                       {/* Markers */}
                       <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <ActivitySquare className="w-4 h-4"/> Evaluated Markers
                          </h4>
                          <div className="space-y-3">
                             {domain.markers.map((marker, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${getTypeStyles(marker.type)}`}>
                                      {marker.type}
                                    </span>
                                    <span className="font-semibold text-slate-700 text-sm">{marker.name}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className={`font-bold text-sm ${
                                      marker.status === 'critical' ? 'text-red-600' :
                                      marker.status === 'warning' ? 'text-amber-600' :
                                      marker.status === 'info' ? 'text-purple-600' : 'text-slate-700'
                                    }`}>
                                      {marker.value}
                                    </span>
                                    <span className="text-slate-400 bg-white p-1 rounded-md shadow-sm border border-slate-100">
                                      {renderTrendIcon(marker.trend)}
                                    </span>
                                  </div>
                                </div>
                             ))}
                          </div>
                       </div>
                       
                       {/* Interventions */}
                       <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Syringe className="w-4 h-4"/> Suggested Interventions
                          </h4>
                          <ul className="space-y-3">
                             {domain.interventions.map((inv, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-slate-700 font-medium leading-relaxed">{inv}</span>
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-bold text-slate-900">Top 3 Actions for Impact</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentProfile.topActions.map((action, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 leading-tight mb-2">{action.action}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{action.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Tier 0 vs Tier 2 Analysis</h2>
                 <p className="text-slate-600">Comparing the value of isolated functional metrics versus an integrated multi-omic approach within the 6 Core Health Domains.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Tier 0 Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-slate-500"/>
                    Tier 0: Functional Baseline
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-md border border-slate-100">
                    Recommendations derived from standard clinical questionnaires, vital signs, and medication reviews focus on generalized risk mitigation.
                  </p>
                  <ul className="space-y-4 text-sm text-slate-700 flex-grow">
                    <li className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" /> 
                      <div>
                        <strong className="block text-slate-900 mb-1">General Malnutrition Risk</strong>
                        Broadly recommends Oral Nutritional Supplements (ONS) based solely on low MNA-SF and MUAC scores.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" /> 
                      <div>
                        <strong className="block text-slate-900 mb-1">Systemic Vulnerability</strong>
                        Identifies polypharmacy and poor hydration via basic clinical history, prioritizing standard medication reviews and generic fluid advice.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Tier 2 Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full border-t-4 border-t-purple-500">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Dna className="w-5 h-5 text-purple-600"/>
                    Tier 2: Multi-Omic Precision
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 bg-purple-50 p-3 rounded-md border border-purple-100 text-purple-900">
                    Additional insights from SNPs and biomarkers enable highly targeted interventions across the Liver, Kidney, Immune, and Mitochondrial domains.
                  </p>
                  <ul className="space-y-4 text-sm text-slate-700 flex-grow">
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" /> 
                      <div>
                        <strong className="block text-slate-900 mb-1">Mitochondrial & Metabolic Specificity</strong>
                        Recommends MUFA-rich foods specifically due to the combination of the PPARG SNP and elevated HbA1c, avoiding generic "low fat" advice.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" /> 
                      <div>
                        <strong className="block text-slate-900 mb-1">Immune/Inflammation Targeting</strong>
                        Adds high-dose Omega-3 and restricts iron absorption precisely to address poor Omega-3 indices and high ferritin/hs-CRP.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                   <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                     <ArrowRight className="w-5 h-5" /> Where Biomarker Data Changes Prioritization
                   </h3>
                   <p className="text-sm text-blue-800 leading-relaxed">
                     Without biomarkers, Tier 0 defaults heavily to adding calories and protein (ONS) to address functional malnutrition risk. However, Tier 2 reveals underlying roadblocks in the Kidney (rising Cystatin C) and Mitochondrial (high HbA1c, PPARG) domains. This effectively shifts the primary clinical intervention from simply <em>increasing intake</em> to <em>optimizing dietary composition</em> (shifting to MUFA) and targeting specific systemic inflammation first.
                   </p>
                </div>
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                   <h3 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
                     <Heart className="w-5 h-5" /> Where Both Tiers Converge
                   </h3>
                   <p className="text-sm text-emerald-800 leading-relaxed">
                     Both tiers fundamentally agree on the necessity of supporting baseline cardiovascular health through light, consistent physical activity (like daily walking). Additionally, foundational interventions like routine clinical medication reviews remain a high priority across both assessment levels to reduce the metabolic load on both Liver and Kidney clearance pathways.
                   </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}