import React, { useState } from 'react';
import { 
  Activity, Apple, Zap, Shield, Heart, 
  Droplet, Dna, ArrowRight, ActivitySquare, 
  Syringe, Activity as VitalIcon, UserCheck, 
  AlertCircle, CheckCircle2 
} from 'lucide-react';

// --- MOCK DATA: 80-Year-Old Patient Profile ---
const patientProfile = {
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
      projected: 80,
      markers: [
        { type: "functional", label: "MNA Score: 10 (At Risk)" },
        { type: "blood", label: "Vit B12: 310 pg/mL (Sub-optimal)" },
        { type: "blood", label: "Albumin: 3.6 g/dL (Borderline)" }
      ],
      recommendations: [
        "Increase protein intake to 1.2g/kg to prevent sarcopenia, distributing evenly across meals.",
        "Begin sublingual B12 (1000mcg) to bypass age-related GI absorption decline.",
        "Hydration protocol: 6-8 glasses daily; thirst cues are naturally blunted at 80."
      ]
    },
    {
      id: "metabolic",
      name: "Metabolic Health",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      current: 68,
      projected: 82,
      markers: [
        { type: "blood", label: "HbA1c: 6.1% (Pre-diabetic)" },
        { type: "blood", label: "Fasting Glucose: 108 mg/dL" },
        { type: "genetic", label: "SEC16B: CC (Obesity/Lipid risk)" }
      ],
      recommendations: [
        "Avoid high-fat bolus meals to reduce ER stress (due to SEC16B CC genotype).",
        "Engage in 15-min walks post-meals to manage postprandial glucose without hypoglycemia risk.",
        "Focus on complex, high-fiber carbs to stabilize HbA1c safely."
      ]
    },
    {
      id: "immune",
      name: "Immune / Inflammation",
      icon: <Shield className="w-5 h-5 text-indigo-500" />,
      current: 55,
      projected: 75,
      markers: [
        { type: "blood", label: "hs-CRP: 3.8 mg/L (Elevated)" },
        { type: "blood", label: "Vit D (25-OH): 22 ng/mL (Low)" },
        { type: "blood", label: "Omega-3 Index: 4.1% (Low)" }
      ],
      recommendations: [
        "Initiate Vitamin D3 2000 IU + K2 daily to reach optimal 40-50 ng/mL range and support bone density.",
        "Add 2g EPA/DHA Omega-3 daily to aggressively lower hs-CRP and systemic inflammation.",
        "Monitor for joint pain improvement as systemic inflammation decreases."
      ]
    },
    {
      id: "heart",
      name: "Heart Health",
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      current: 58,
      projected: 74,
      markers: [
        { type: "functional", label: "BP: 138/85 mmHg" },
        { type: "blood", label: "ApoB: 110 mg/dL (High)" },
        { type: "blood", label: "Homocysteine: 16 µmol/L (High)" }
      ],
      recommendations: [
        "Implement Mediterranean dietary pattern focusing on olive oil and lean proteins to target ApoB.",
        "Methylated B-complex to safely lower Homocysteine and protect endothelial lining.",
        "Maintain light, daily aerobic activity (e.g., water aerobics or brisk walking) to support endothelial function."
      ]
    },
    {
      id: "liver",
      name: "Liver Health",
      icon: <ActivitySquare className="w-5 h-5 text-orange-500" />,
      current: 82,
      projected: 88,
      markers: [
        { type: "functional", label: "Medication Review: Polypharmacy (5+ meds)" },
        { type: "blood", label: "ALT/AST: Normal" },
        { type: "blood", label: "Alk Phos: 115 U/L (Slightly high)" }
      ],
      recommendations: [
        "Coordinate with primary care for a comprehensive medication review to reduce liver metabolic burden.",
        "Maintain current low-alcohol/no-alcohol protocol.",
        "Increase dietary choline (eggs, broccoli) to support liver fat clearance."
      ]
    },
    {
      id: "kidney",
      name: "Kidney Health",
      icon: <Droplet className="w-5 h-5 text-cyan-500" />,
      current: 65,
      projected: 72,
      markers: [
        { type: "blood", label: "eGFR: 58 (Age-expected decline)" },
        { type: "blood", label: "Cystatin C: 1.15 mg/L" },
        { type: "blood", label: "Urine ACR: Normal" }
      ],
      recommendations: [
        "Strictly avoid over-the-counter NSAIDs (ibuprofen, naproxen) to protect remaining eGFR.",
        "Maintain steady, moderate hydration. Avoid massive fluid boluses which stress aging kidneys.",
        "Monitor BP closely, as hypertension accelerates age-related kidney decline."
      ]
    },
    {
      id: "mitochondrial",
      name: "Mitochondrial Health",
      icon: <Dna className="w-5 h-5 text-purple-500" />,
      current: 50,
      projected: 68,
      markers: [
        { type: "genetic", label: "BDNF: CT (Lower exercise motivation)" },
        { type: "genetic", label: "ADORA2A: CT (Caffeine sensitive)" },
        { type: "blood", label: "RBC Mag: 4.0 mg/dL (Low)" },
        { type: "blood", label: "DHEA-S: Low-normal" }
      ],
      recommendations: [
        "Extrinsic motivation: Join a senior group exercise class to offset BDNF-related motivation drop.",
        "Cease caffeine intake by 1 PM due to ADORA2A genotype to ensure restorative deep sleep.",
        "Supplement with Magnesium Glycinate 200mg at night for cellular energy and sleep support."
      ]
    }
  ]
};

// --- COMPONENTS ---

const ProgressBar = ({ current, projected }) => {
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600">
        <span>Current: {current}</span>
        <span className="text-blue-600">3-6 Mo Goal: {projected}</span>
      </div>
      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden relative flex">
        {/* Current Score Bar */}
        <div 
          className="h-full bg-slate-400 z-10 rounded-l-full" 
          style={{ width: `${current}%` }}
        ></div>
        {/* Projected Improvement Bar */}
        <div 
          className="h-full bg-blue-500 absolute left-0 top-0 opacity-40 rounded-l-full" 
          style={{ width: `${projected}%` }}
        ></div>
      </div>
    </div>
  );
};

const MarkerBadge = ({ type, label }) => {
  const getColors = () => {
    switch (type) {
      case 'functional': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'blood': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'genetic': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'functional': return <UserCheck className="w-3 h-3 mr-1" />;
      case 'blood': return <Syringe className="w-3 h-3 mr-1" />;
      case 'genetic': return <Dna className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getColors()} mr-2 mb-2`}>
      {getIcon()}
      {label}
    </span>
  );
};

// --- VIEWS ---

const DashboardView = () => (
  <div className="space-y-6">
    {/* Top Summary Card */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Overall Vitality Composite</h2>
        <p className="text-sm text-slate-600 mb-4">
          Updated {patientProfile.lastUpdated} • Incorporates functional assessments, 50+ blood biomarkers, and wellness SNPs.
        </p>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-slate-700">{patientProfile.overallScore}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">Current</div>
          </div>
          <ArrowRight className="w-6 h-6 text-slate-300" />
          <div className="text-center">
            <div className="text-4xl font-extrabold text-blue-600">{patientProfile.projectedScore}</div>
            <div className="text-xs text-blue-500 uppercase tracking-wider font-semibold mt-1">3-6 Mo Target</div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full bg-slate-50 rounded-lg p-4 border border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-2">Protocol Impact Summary (80 Y/O)</h3>
        <ul className="text-sm text-slate-600 space-y-2">
          <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0"/> Reversing age-related nutrient malabsorption.</li>
          <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0"/> Lowering systemic inflammation to protect joint & cognitive health.</li>
          <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0"/> Genetic-aligned exercise and sleep hygiene interventions.</li>
        </ul>
      </div>
    </div>

    {/* Domains Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patientProfile.domains.map(domain => (
        <div key={domain.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-50 rounded-lg">{domain.icon}</div>
              <h3 className="font-bold text-slate-800">{domain.name}</h3>
            </div>
            <div className="text-lg font-bold text-slate-700">{domain.current}</div>
          </div>
          
          <ProgressBar current={domain.current} projected={domain.projected} />
          
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Drivers</h4>
            <div className="flex flex-wrap">
              {domain.markers.map((marker, i) => (
                <MarkerBadge key={i} type={marker.type} label={marker.label} />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Action Plan (80s)</h4>
            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
              {domain.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComparisonView = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="bg-slate-50 border-b border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800">Insight Comparison: 80-Year-Old Patient</h2>
      <p className="text-sm text-slate-600 mt-1">
        Demonstrating the gap between standard functional/vital testing and comprehensive blood biomarker analysis.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
      {/* Functional Only */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4 text-emerald-600">
          <UserCheck className="w-6 h-6" />
          <h3 className="text-lg font-bold">Standard Functional Tests Only</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-1">What we observe:</h4>
            <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
              <li>BMI: 27 (Slightly Overweight)</li>
              <li>MNA (Mini Nutritional Assessment): At Risk</li>
              <li>Blood Pressure: 138/85 (Borderline High)</li>
              <li>Reported mild fatigue and joint stiffness.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h4 className="font-semibold text-emerald-800 mb-1">Resulting Recommendations:</h4>
            <ul className="text-sm text-emerald-700 list-disc pl-4 space-y-1">
              <li>"Try to lose a little weight."</li>
              <li>"Eat a balanced diet, perhaps drink a nutritional shake."</li>
              <li>"Watch your salt intake to manage blood pressure."</li>
              <li>"Take an over-the-counter pain reliever for stiffness."</li>
            </ul>
          </div>
          <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm border border-red-100 flex gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p><strong>The Blindspot:</strong> Treats symptoms generically. Misses cellular deficiencies, silent inflammation, and underlying cardiovascular risks.</p>
          </div>
        </div>
      </div>

      {/* Comprehensive Biomarkers */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4 text-blue-600">
          <Syringe className="w-6 h-6" />
          <h3 className="text-lg font-bold">Comprehensive Blood Biomarkers</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-1">What we uncover internally:</h4>
            <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
              <li>ApoB is 110 mg/dL (High actual cardiovascular risk, not just BP).</li>
              <li>hs-CRP is 3.8 mg/L (Systemic inflammation causing the stiffness).</li>
              <li>Vit B12 is 310 pg/mL (Poor GI absorption causing fatigue).</li>
              <li>Omega-3 Index is 4.1% (Lacking inflammatory resolution).</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-1">Targeted, Precision Interventions:</h4>
            <ul className="text-sm text-blue-700 list-disc pl-4 space-y-1">
              <li>Instead of "lose weight", target ApoB with specific Mediterranean macros (olive oil, lean protein).</li>
              <li>Bypass poor 80-year-old GI absorption with <strong>sublingual</strong> B12 to resolve cellular fatigue.</li>
              <li>Use 2g EPA/DHA Omega-3 to actively lower hs-CRP instead of masking joint pain with NSAIDs (which damage aging kidneys).</li>
            </ul>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-sm border border-emerald-100 flex gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p><strong>The Advantage:</strong> Moves from reactive symptom management to proactive, cellular-level course correction, drastically improving healthy lifespan.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <VitalIcon className="w-8 h-8 text-blue-600" />
              Vitality Protocol Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Personalized precision health mapping for active aging.</p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-slate-200 p-1 rounded-lg w-full md:w-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === 'dashboard' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Composite Scorecard
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeTab === 'comparison' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Test Comparison Analysis
            </button>
          </div>
        </header>

        {/* Content Area */}
        {activeTab === 'dashboard' ? <DashboardView /> : <ComparisonView />}

      </div>
    </div>
  );
}