import React, { useState } from 'react';
import { 
  Activity, Apple, Zap, Shield, Heart, 
  Droplet, Dna, ArrowRight, ActivitySquare, 
  Syringe, Activity as VitalIcon, UserCheck, 
  AlertCircle, CheckCircle2 
} from 'lucide-react';

// --- DATA MODEL ---
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
        { type: "blood", label: "Vit B12: 310 pg/mL (Low)" },
        { type: "blood", label: "Albumin: 3.6 g/dL" }
      ],
      recommendations: [
        "1.2g/kg protein to prevent sarcopenia.",
        "Sublingual B12 (1000mcg) daily.",
        "Scheduled hydration: 6-8 glasses."
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
        { type: "genetic", label: "SEC16B: CC (Lipid Risk)" }
      ],
      recommendations: [
        "Avoid high-fat bolus (SEC16B risk).",
        "15-min post-meal walks.",
        "Focus on complex, high-fiber carbs."
      ]
    },
    {
      id: "immune",
      name: "Immune / Inflammation",
      icon: <Shield className="w-5 h-5 text-indigo-500" />,
      current: 55,
      projected: 75,
      markers: [
        { type: "blood", label: "hs-CRP: 3.8 mg/L (High)" },
        { type: "blood", label: "Vit D: 22 ng/mL (Low)" }
      ],
      recommendations: [
        "Vit D3 2000 IU + K2 daily.",
        "2g EPA/DHA Omega-3 daily.",
        "Anti-inflammatory diet (Turmeric/Ginger)."
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
        { type: "blood", label: "ApoB: 110 mg/dL (High)" }
      ],
      recommendations: [
        "Mediterranean pattern (Olive oil focus).",
        "Methylated B-complex for Homocysteine.",
        "Daily light aerobic activity."
      ]
    },
    {
      id: "kidney",
      name: "Kidney Health",
      icon: <Droplet className="w-5 h-5 text-cyan-500" />,
      current: 65,
      projected: 72,
      markers: [
        { type: "blood", label: "eGFR: 58 (Stage 3a)" },
        { type: "blood", label: "Cystatin C: 1.15 mg/L" }
      ],
      recommendations: [
        "Strictly avoid NSAIDs (Ibuprofen).",
        "Moderate, steady fluid intake.",
        "Monitor BP to protect filtration."
      ]
    },
    {
      id: "mitochondrial",
      name: "Mitochondrial Health",
      icon: <Dna className="w-5 h-5 text-purple-500" />,
      current: 50,
      projected: 68,
      markers: [
        { type: "genetic", label: "BDNF: CT (Low Motivation)" },
        { type: "blood", label: "RBC Mag: 4.0 mg/dL" }
      ],
      recommendations: [
        "Group exercise for extrinsic motivation.",
        "No caffeine after 1PM (ADORA2A risk).",
        "Magnesium Glycinate 200mg (Night)."
      ]
    }
  ]
};

// --- COMPONENTS ---

const ProgressBar = ({ current, projected }) => (
  <div className="w-full mt-2">
    <div className="flex justify-between text-[10px] font-bold mb-1 text-slate-500 uppercase">
      <span>Now: {current}</span>
      <span className="text-blue-600">Goal: {projected}</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
      <div className="h-full bg-slate-400 absolute left-0 top-0 z-10" style={{ width: `${current}%` }}></div>
      <div className="h-full bg-blue-500 absolute left-0 top-0 opacity-30" style={{ width: `${projected}%` }}></div>
    </div>
  </div>
);

const MarkerBadge = ({ type, label }) => {
  const styles = {
    functional: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blood: 'bg-rose-50 text-rose-700 border-rose-100',
    genetic: 'bg-purple-50 text-purple-700 border-purple-100'
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-medium mr-1 mb-1 ${styles[type]}`}>
      {label}
    </span>
  );
};

export default function App() {
  const [view, setView] = useState('summary');

  return (
    <div className="bg-white min-h-screen p-6 text-slate-900 overflow-visible">
      {/* Container for Screenshot */}
      <div className="max-w-5xl mx-auto border border-slate-200 rounded-2xl shadow-2xl overflow-hidden bg-white">
        
        {/* Dashboard Header */}
        <div className="bg-slate-900 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-400 uppercase tracking-widest text-xs font-bold">
                <VitalIcon className="w-4 h-4" />
                Confidential Health Report
              </div>
              <h1 className="text-3xl font-black">Overall Vitality Scorecard</h1>
              <p className="text-slate-400 mt-1 font-medium">Patient Age: 80 | Assessment: {patientProfile.lastUpdated}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center min-w-[100px]">
                <div className="text-3xl font-black text-white">{patientProfile.overallScore}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Current</div>
              </div>
              <div className="bg-blue-600 rounded-xl p-4 text-center min-w-[100px]">
                <div className="text-3xl font-black text-white">{patientProfile.projectedScore}</div>
                <div className="text-[10px] text-blue-100 font-bold uppercase tracking-tighter">3-6 Mo Target</div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher (Won't show in screenshot if you crop carefully) */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2">
          <button 
            onClick={() => setView('summary')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'summary' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            SCORECARD SUMMARY
          </button>
          <button 
            onClick={() => setView('compare')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'compare' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            BIOMARKER GAP ANALYSIS
          </button>
        </div>

        {/* Main Content */}
        <div className="p-8 bg-slate-50">
          {view === 'summary' ? (
            <div className="grid grid-cols-3 gap-6">
              {patientProfile.domains.map(domain => (
                <div key={domain.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-slate-50 rounded-lg">{domain.icon}</div>
                    <h3 className="font-bold text-sm text-slate-800">{domain.name}</h3>
                  </div>
                  
                  <ProgressBar current={domain.current} projected={domain.projected} />
                  
                  <div className="mt-4 mb-3 flex flex-wrap">
                    {domain.markers.map((m, i) => (
                      <MarkerBadge key={i} type={m.type} label={m.label} />
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="font-bold text-[9px] text-slate-400 uppercase mb-1">Top Recommendation</div>
                    {domain.recommendations[0]}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600 mb-4">
                  <UserCheck className="w-5 h-5" />
                  <h3 className="font-bold">Standard Tests Only</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 italic">Gleaning insights only from BMI, Vitals, and MNA assessment.</p>
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                    <strong>Blindspot:</strong> Patient reports fatigue. Standard tests suggest "age-related decline" and "general multivitamin."
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-xs text-red-800">
                    <strong>Risk:</strong> Undetected systemic inflammation (hs-CRP) and nutrient malabsorption (B12) remain unaddressed.
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-blue-200 ring-4 ring-blue-50">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Syringe className="w-5 h-5" />
                  <h3 className="font-bold">Full Biomarker Panel</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 italic">Insights from ApoB, hs-CRP, Cystatin C, and Genetic Wellness SNPs.</p>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800">
                    <strong>Insight:</strong> B12 is 310 pg/mL. 80-year-old GI tract has low intrinsic factor.
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-xs text-emerald-800">
                    <strong>Precision Action:</strong> Targeted sublingual B12 to bypass GI tract, resolving fatigue and supporting cognitive function.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium">Vitality Composite Algorithm v4.2 • Precision Aging Protocol • Generated for Clinical Review</p>
        </div>
      </div>
    </div>
  );
}