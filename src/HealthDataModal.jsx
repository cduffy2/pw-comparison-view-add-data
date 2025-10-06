import { useState } from 'react';
import InfoOutlinedSvg from './assets/InfoOutlined.svg';

// Inline SVG icons as components
const SearchIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#12467b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#0b6bcb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <img src={InfoOutlinedSvg} alt="Info" className="size-full" />
);

const ArrowRightIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="white">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#12467b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckboxCheckedIcon = () => (
  <svg className="size-full" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="4" fill="#0b6bcb"/>
    <path d="M5 10L8.5 13.5L15 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClearSearchIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#12467b"/>
    <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HEALTH_AREAS = ['Show all', 'Family planning', 'Child health', 'Immunisation', 'Nutrition', 'Maternal health'];

const VULNERABILITY_DOMAINS = ['Show all', 'Socioeconomic', 'Demographics', 'Health access', 'Household', 'Education', 'Relationship'];

const HEALTH_DATA = [
  { id: 1, label: 'Less than 4 ANC visits', area: 'Maternal health' },
  { id: 2, label: 'No PNC for newborn', area: 'Child health' },
  { id: 3, label: 'Never breastfed', area: 'Maternal health' },
  { id: 4, label: 'Pregnancy ended in stillbirth', area: 'Maternal health' },
  { id: 5, label: 'Death of a child before 1 yr', area: 'Child health' },
  { id: 6, label: 'Death of a child before 5 yrs', area: 'Child health' },
  { id: 7, label: 'No current modern FP use', area: 'Family planning' },
  { id: 8, label: 'Latest birth delivered at home', area: 'Maternal health' },
  { id: 9, label: 'Not fully immunized with DPT', area: 'Immunisation' },
  { id: 10, label: 'Not immunized with MMR', area: 'Immunisation' },
  { id: 11, label: 'Not immunized with polio', area: 'Immunisation' },
  { id: 12, label: 'Zero-dose child', area: 'Immunisation' },
  { id: 13, label: 'Overweight child', area: 'Nutrition' },
  { id: 14, label: 'Stunted child', area: 'Nutrition' },
  { id: 15, label: 'Underweight child', area: 'Nutrition' },
  { id: 16, label: 'Wasted child', area: 'Nutrition' },
  { id: 17, label: 'No. of children who have died', area: 'Child health' },
  { id: 18, label: 'No. of children who have died (3 category)', area: 'Child health' },
  { id: 19, label: 'Death of a child', area: 'Child health' },
  { id: 20, label: 'No PNC for mother', area: 'Maternal health' },
];

// Correlation mapping: vulnerability factor ID -> health outcome IDs it correlates with
const CORRELATIONS = {
  101: { healthOutcomes: [1, 8, 2, 5, 6, 17, 18, 19], strength: 'Very strong', value: 0.9 }, // Educational attainment -> Multiple maternal and child health outcomes
  102: { healthOutcomes: [9, 10, 11, 12], strength: 'Strong', value: 0.8 }, // HH electricity -> Immunisation outcomes
  103: { healthOutcomes: [7, 3, 4], strength: 'Very strong', value: 0.85 }, // Currently employed -> FP and maternal health
  104: { healthOutcomes: [1, 2, 20], strength: 'Strong', value: 0.75 }, // At least primary education -> ANC and PNC
  105: { healthOutcomes: [7, 3, 4], strength: 'Moderate', value: 0.65 }, // Marital status -> FP and maternal outcomes
  106: { healthOutcomes: [9, 12, 10, 11], strength: 'Moderate', value: 0.6 }, // Religion -> Immunisation
  107: { healthOutcomes: [1, 8, 20, 2], strength: 'Very strong', value: 0.9 }, // Access problem: distance to HF -> Maternal and child health access
  108: { healthOutcomes: [13, 14, 15, 16], strength: 'Strong', value: 0.7 }, // Any media exposure -> Nutrition outcomes
  109: { healthOutcomes: [4, 3], strength: 'Moderate', value: 0.55 }, // Female circumcision -> Maternal health
  110: { healthOutcomes: [7, 1, 3], strength: 'Strong', value: 0.75 }, // Bank account (woman) -> FP and maternal health
  111: { healthOutcomes: [13, 14, 16, 15], strength: 'Strong', value: 0.8 }, // HH clean cooking fuel -> Nutrition
  112: { healthOutcomes: [1, 8, 20, 2], strength: 'Strong', value: 0.7 }, // HH motor transport -> Access to health services
};

// Suggested factors (subset)
const SUGGESTED_FACTORS = [
  { id: 101, label: 'Educational attainment', domain: 'Education', type: 'suggested' },
  { id: 102, label: 'HH electricity', domain: 'Household', type: 'suggested' },
  { id: 103, label: 'Currently employed', domain: 'Socioeconomic', type: 'suggested' },
  { id: 104, label: 'At least primary education', domain: 'Education', type: 'suggested' },
  { id: 105, label: 'Marital status', domain: 'Demographics', type: 'suggested' },
  { id: 106, label: 'Religion', domain: 'Demographics', type: 'suggested' },
  { id: 107, label: 'Access problem: distance to HF', domain: 'Health access', type: 'suggested' },
];

// Differentiating factors (larger subset)
const DIFFERENTIATING_FACTORS = [
  ...SUGGESTED_FACTORS,
  { id: 108, label: 'Any media exposure', domain: 'Socioeconomic', type: 'differentiating' },
  { id: 109, label: 'Female circumcision', domain: 'Demographics', type: 'differentiating' },
  { id: 110, label: 'Bank account (woman)', domain: 'Socioeconomic', type: 'differentiating' },
  { id: 111, label: 'HH clean cooking fuel', domain: 'Household', type: 'differentiating' },
  { id: 112, label: 'HH motor transport', domain: 'Household', type: 'differentiating' },
  { id: 113, label: 'Media exposure: internet', domain: 'Socioeconomic', type: 'differentiating' },
  { id: 114, label: 'Access problem: travel alone', domain: 'Health access', type: 'differentiating' },
  { id: 115, label: 'Not living w/ partner', domain: 'Relationship', type: 'differentiating' },
  { id: 116, label: 'Age at first birth (3 category)', domain: 'Demographics', type: 'differentiating' },
  { id: 117, label: 'Decision maker: family planning', domain: 'Relationship', type: 'differentiating' },
  { id: 118, label: 'Decision maker: HH purchases', domain: 'Relationship', type: 'differentiating' },
  { id: 119, label: 'Preferred next birth interval', domain: 'Demographics', type: 'differentiating' },
];

// All factors (complete list)
const ALL_FACTORS = [
  ...DIFFERENTIATING_FACTORS,
  { id: 120, label: 'HW visit in last yr', domain: 'Health access', type: 'all' },
  { id: 121, label: 'Mobile phone used for finances', domain: 'Socioeconomic', type: 'all' },
  { id: 122, label: 'Age at first sex (4 category)', domain: 'Demographics', type: 'all' },
  { id: 123, label: 'Decision maker: own income', domain: 'Relationship', type: 'all' },
  { id: 124, label: 'Partner opposition to FP use', domain: 'Relationship', type: 'all' },
  { id: 125, label: 'Sex of the head of HH', domain: 'Demographics', type: 'all' },
  { id: 126, label: 'HH received money', domain: 'Socioeconomic', type: 'all' },
  { id: 127, label: 'HH slum residence (UN definition)', domain: 'Household', type: 'all' },
  { id: 128, label: 'HH water source interrupted', domain: 'Household', type: 'all' },
  { id: 129, label: 'Joint decision making index', domain: 'Relationship', type: 'all' },
  { id: 130, label: 'HH in malaria zone', domain: 'Household', type: 'all' },
  { id: 131, label: 'No. <5 yrs in HH (4 category)', domain: 'Demographics', type: 'all' },
  { id: 132, label: 'Total lifetime sex partners', domain: 'Demographics', type: 'all' },
  { id: 133, label: 'Wife rank', domain: 'Relationship', type: 'all' },
  { id: 134, label: 'Employment continuity', domain: 'Socioeconomic', type: 'all' },
  { id: 135, label: 'Education level (partner)', domain: 'Education', type: 'all' },
  { id: 136, label: 'Employment status', domain: 'Socioeconomic', type: 'all' },
  { id: 137, label: 'IPV justification', domain: 'Relationship', type: 'all' },
  { id: 138, label: 'Age at first cohabitation (3 category)', domain: 'Demographics', type: 'all' },
  { id: 139, label: 'Age at first birth', domain: 'Demographics', type: 'all' },
  { id: 140, label: 'Age at first cohabitation', domain: 'Demographics', type: 'all' },
  { id: 141, label: 'Age at first sex', domain: 'Demographics', type: 'all' },
  { id: 142, label: 'HH member w/ disability', domain: 'Demographics', type: 'all' },
  { id: 143, label: 'Earnings relative to partner', domain: 'Socioeconomic', type: 'all' },
  { id: 144, label: 'Educational attainment (binary)', domain: 'Education', type: 'all' },
  { id: 145, label: 'Fertility preference', domain: 'Demographics', type: 'all' },
  { id: 146, label: 'Media exposure: news/journal', domain: 'Socioeconomic', type: 'all' },
  { id: 147, label: 'Media exposure: radio', domain: 'Socioeconomic', type: 'all' },
  { id: 148, label: 'HH received other state support', domain: 'Socioeconomic', type: 'all' },
  { id: 149, label: 'HH car', domain: 'Household', type: 'all' },
  { id: 150, label: 'HH internet', domain: 'Household', type: 'all' },
  { id: 151, label: 'HH motorcycle or scooter', domain: 'Household', type: 'all' },
  { id: 152, label: 'Age at first birth (5 category)', domain: 'Demographics', type: 'all' },
  { id: 153, label: 'HH rudimentary or natural floor', domain: 'Household', type: 'all' },
  { id: 154, label: 'Any birth registered/declared', domain: 'Demographics', type: 'all' },
  { id: 155, label: 'HH water not treated', domain: 'Household', type: 'all' },
  { id: 156, label: 'HH radio', domain: 'Household', type: 'all' },
  { id: 157, label: 'Decision maker: woman\'s health', domain: 'Relationship', type: 'all' },
  { id: 158, label: 'HH refrigerator', domain: 'Household', type: 'all' },
  { id: 159, label: 'HH sanitation (3 category)', domain: 'Household', type: 'all' },
  { id: 160, label: 'HH shares toilet', domain: 'Household', type: 'all' },
  { id: 161, label: 'HH stove', domain: 'Household', type: 'all' },
  { id: 162, label: 'HH television', domain: 'Household', type: 'all' },
  { id: 163, label: 'Polygamy status', domain: 'Relationship', type: 'all' },
  { id: 164, label: 'Media exposure: TV', domain: 'Socioeconomic', type: 'all' },
  { id: 165, label: 'Phone ownership (woman)', domain: 'Socioeconomic', type: 'all' },
  { id: 166, label: 'HH highest education', domain: 'Education', type: 'all' },
  { id: 167, label: 'HH owns animals', domain: 'Household', type: 'all' },
  { id: 168, label: 'Bank account (household)', domain: 'Socioeconomic', type: 'all' },
  { id: 169, label: 'HH bicycle', domain: 'Household', type: 'all' },
  { id: 170, label: 'Home ownership', domain: 'Household', type: 'all' },
  { id: 171, label: 'Land ownership', domain: 'Household', type: 'all' },
  { id: 172, label: 'HH cooks food inside', domain: 'Household', type: 'all' },
  { id: 173, label: 'HH unimproved toilet', domain: 'Household', type: 'all' },
  { id: 174, label: 'Married or living w/ partner', domain: 'Relationship', type: 'all' },
  { id: 175, label: 'No. of living children', domain: 'Demographics', type: 'all' },
  { id: 176, label: 'No. of living children (4 category)', domain: 'Demographics', type: 'all' },
  { id: 177, label: 'No. of pregnancies', domain: 'Demographics', type: 'all' },
  { id: 178, label: 'Occupation', domain: 'Socioeconomic', type: 'all' },
  { id: 179, label: 'Employment status (partner)', domain: 'Socioeconomic', type: 'all' },
  { id: 180, label: 'HH has toilet facility', domain: 'Household', type: 'all' },
];

export default function HealthDataModal({ onClose }) {
  // Step navigation
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - Health outcomes
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedHealthArea, setSelectedHealthArea] = useState('Show all');

  // Step 2 - Vulnerability factors
  const [vulnerabilitySearchTerm, setVulnerabilitySearchTerm] = useState('');
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState([]);
  const [domainFilterOpen, setDomainFilterOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('Show all');
  const [factorView, setFactorView] = useState('Suggested'); // 'Suggested', 'Differentiating', 'All factors'
  const [hoveredTooltip, setHoveredTooltip] = useState(null); // null, 'suggested', 'differentiating', 'all'

  // Step 1 functions
  const toggleItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const removeItem = (id) => {
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  // Step 2 functions
  const toggleVulnerability = (id) => {
    setSelectedVulnerabilities(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const removeVulnerability = (id) => {
    setSelectedVulnerabilities(prev => prev.filter(itemId => itemId !== id));
  };

  const clearAllVulnerabilities = () => {
    setSelectedVulnerabilities([]);
  };

  // Get vulnerability data based on selected view
  const getVulnerabilityData = () => {
    let baseData;
    switch (factorView) {
      case 'Suggested':
        baseData = SUGGESTED_FACTORS;
        // Filter to only show factors that have correlations with selected health outcomes
        if (selectedItems.length > 0) {
          const filtered = baseData.filter(factor => {
            const correlation = CORRELATIONS[factor.id];
            if (!correlation) return false;
            return selectedItems.some(id => correlation.healthOutcomes.includes(id));
          });
          // If no correlations found, return at least the first suggested factor
          return filtered.length > 0 ? filtered : [baseData[0]];
        }
        return baseData;
      case 'Differentiating':
        return DIFFERENTIATING_FACTORS;
      case 'All factors':
        return ALL_FACTORS;
      default:
        return SUGGESTED_FACTORS;
    }
  };

  // Get current search term (unified for both steps)
  const currentSearchTerm = currentStep === 1 ? searchTerm : vulnerabilitySearchTerm;

  // Filtered data for Step 1
  const filteredData = HEALTH_DATA.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(currentSearchTerm.toLowerCase());
    const matchesArea = selectedHealthArea === 'Show all' || item.area === selectedHealthArea;
    return matchesSearch && matchesArea;
  });

  const selectedData = HEALTH_DATA.filter(item => selectedItems.includes(item.id)).reverse();

  // Filtered data for Step 2
  const vulnerabilityData = getVulnerabilityData();
  const filteredVulnerabilities = vulnerabilityData.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(currentSearchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'Show all' || item.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const selectedVulnerabilitiesData = vulnerabilityData.filter(item =>
    selectedVulnerabilities.includes(item.id)
  ).reverse();

  // Check if there's a search term to show combined results
  const hasSearch = currentSearchTerm.length > 0;

  // Get correlation info for a vulnerability factor based on selected health outcomes
  const getCorrelationInfo = (factorId) => {
    const correlation = CORRELATIONS[factorId];
    if (!correlation || selectedItems.length === 0) return null;

    // Find which selected health outcomes this factor correlates with
    const correlatedOutcomes = selectedItems.filter(id =>
      correlation.healthOutcomes.includes(id)
    );

    if (correlatedOutcomes.length === 0) return null;

    // Get the first correlated outcome to display
    const outcomeId = correlatedOutcomes[0];
    const outcome = HEALTH_DATA.find(item => item.id === outcomeId);

    return {
      strength: correlation.strength,
      value: correlation.value,
      outcomeName: outcome?.label || ''
    };
  };

  return (
    <>
      {/* Overlay with blur */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 12, 36, 0.85)' }}
        onClick={() => onClose(false)}
      />

      {/* Modal with slide-up animation */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-8">
        <div
          className="pointer-events-auto w-full max-w-[1260px] bg-white rounded-[16px] shadow-2xl animate-slide-up max-h-[90vh] overflow-visible relative"
        >
          <div className="bg-white border border-[#97c3f0] border-solid box-border content-stretch flex flex-col items-start relative rounded-[16px] w-full h-[750px]">
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative rounded-[16px] shrink-0 w-full">
        <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative rounded-[16px] shrink-0 w-full">
          {/* Left Panel */}
          <div className="basis-0 bg-[#f0f4f8] box-border content-stretch flex flex-col gap-[40px] grow h-full items-start min-h-px min-w-px overflow-clip pl-[24px] pr-0 py-[24px] relative rounded-bl-[16px] rounded-tl-[16px] shrink-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-['Inter'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#171a1c] text-[24px] w-full">
                Uncover health insights across segments
              </p>
            </div>

            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              {/* Step 1 */}
              <div className={`${currentStep === 1 ? 'bg-white border-[#0b6bcb]' : 'border-[#97c3f0]'} border-[0px_0px_0px_4px] border-solid box-border content-stretch flex gap-[16px] items-start p-[16px] relative shrink-0 w-full`}>
                <div className={`${currentStep === 1 ? 'bg-[#0b6bcb]' : 'bg-white border-2 border-[#97c3f0] border-solid box-border'} content-stretch flex flex-col gap-[8px] items-center justify-center relative rounded-[10000px] shrink-0 size-[32px]`}>
                  <p className={`aspect-[32/32] font-['Inter'] font-semibold leading-[1.66] not-italic relative shrink-0 text-[18px] text-center ${currentStep === 1 ? 'text-white' : 'text-[#555e68]'} w-full`}>1</p>
                </div>
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                  <div className="content-stretch flex flex-col items-start not-italic relative shrink-0">
                    <p className="font-['Inter'] font-semibold leading-[1.66] relative shrink-0 text-[#171a1c] text-[18px] text-nowrap whitespace-pre">
                      Select health outcomes and behaviours
                    </p>
                    <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[#555e68] text-[16px] w-[457px]">
                      Measurable health statuses or action that can be observed, tracked, or reported
                    </p>
                  </div>

                  {/* Selected chips */}
                  {selectedData.length > 0 && (
                    <div className={`content-stretch flex gap-[8px] items-start relative shrink-0 ${selectedData.length > 2 ? 'border border-[#cdd7e1] border-solid rounded-[4px]' : ''}`}>
                      <div className={`content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 ${selectedData.length > 2 ? 'max-h-[104px] overflow-y-auto p-[8px]' : ''} w-[522px]`}>
                        {selectedData.map(item => (
                          <div key={item.id} className="bg-[#e3effb] box-border content-stretch flex gap-[6px] items-center min-h-[24px] px-[8px] py-0 relative rounded-[24px] shrink-0">
                            <p className="font-['Inter'] font-medium leading-[1.5] not-italic relative shrink-0 text-[#12467b] text-[14px] text-nowrap whitespace-pre">
                              {item.label}
                            </p>
                            <button onClick={() => removeItem(item.id)} className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0">
                              <div className="overflow-clip relative shrink-0 size-[20px]">
                                <div className="absolute inset-[20.833%]">
                                  <CloseIcon />
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className={`${currentStep === 2 ? 'bg-white border-[#0b6bcb]' : 'border-[#97c3f0]'} border-[0px_0px_0px_4px] border-solid box-border content-stretch flex gap-[16px] items-start p-[16px] relative shrink-0 w-full`}>
                <div className={`${currentStep === 2 ? 'bg-[#0b6bcb]' : 'bg-white border-2 border-[#97c3f0] border-solid box-border'} content-stretch flex flex-col gap-[8px] items-center justify-center relative rounded-[10000px] shrink-0 size-[32px]`}>
                  <p className={`aspect-[32/32] font-['Inter'] font-semibold leading-[1.66] not-italic relative shrink-0 text-[18px] text-center ${currentStep === 2 ? 'text-white' : 'text-[#555e68]'} w-full`}>2</p>
                </div>
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
                  <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 w-full">
                    <p className={`font-['Inter'] font-semibold leading-[1.66] relative shrink-0 text-[18px] text-nowrap whitespace-pre ${currentStep === 2 ? 'text-[#171a1c]' : 'text-[#555e68]'}`}>
                      Select vulnerability factors
                    </p>
                    <p className={`font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[16px] ${currentStep === 2 ? 'text-[#171a1c]' : 'text-[#555e68]'}`} style={{ width: "min-content" }}>
                      Risks of poor health outcomes due to social, cultural, behavioural, economic, and environmental factors
                    </p>
                  </div>
                  {/* Selected vulnerability chips */}
                  {selectedVulnerabilitiesData.length > 0 && (
                    <div className={`content-stretch flex gap-[8px] items-start relative shrink-0 ${selectedVulnerabilitiesData.length > 2 ? 'border border-[#cdd7e1] border-solid rounded-[4px]' : ''}`}>
                      <div className={`content-start flex flex-wrap gap-[8px] items-start overflow-clip relative shrink-0 ${selectedVulnerabilitiesData.length > 2 ? 'max-h-[104px] overflow-y-auto p-[8px]' : ''} w-[522px]`}>
                        {selectedVulnerabilitiesData.map(item => (
                          <div key={item.id} className="bg-[#dfe7fd] box-border content-stretch flex gap-[6px] items-center min-h-[24px] px-[8px] py-0 relative rounded-[24px] shrink-0">
                            <p className="font-['Inter'] font-medium leading-[1.5] not-italic relative shrink-0 text-[#12467b] text-[14px] text-nowrap whitespace-pre">
                              {item.label}
                            </p>
                            <button onClick={() => removeVulnerability(item.id)} className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0">
                              <div className="overflow-clip relative shrink-0 size-[20px]">
                                <div className="absolute inset-[20.833%]">
                                  <CloseIcon />
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="basis-0 content-stretch flex flex-col grow h-full items-start min-h-px min-w-px overflow-clip relative rounded-br-[16px] rounded-tr-[16px] shrink-0">
            <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px pb-0 pt-[24px] px-[24px] relative shrink-0 w-full">
              {/* Search and Filter */}
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[320px]">
                  <div className={`box-border content-stretch flex gap-[8px] items-start overflow-clip px-[12px] py-[8px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08)] shrink-0 w-full ${currentSearchTerm ? 'bg-[#e3effb] border-2 border-[#0b6bcb] border-solid' : 'bg-[#e3effb]'}`}>
                    <input
                      type="text"
                      value={currentSearchTerm}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (currentStep === 1) {
                          setSearchTerm(value);
                        } else {
                          setVulnerabilitySearchTerm(value);
                        }
                      }}
                      placeholder="Search data to compare"
                      className="basis-0 font-['Inter'] font-normal grow leading-[1.5] min-h-px min-w-px not-italic bg-transparent outline-none text-[#12467b] text-[16px] placeholder:opacity-[0.64]"
                    />
                    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                      {currentSearchTerm ? (
                        <button onClick={() => {
                          setSearchTerm('');
                          setVulnerabilitySearchTerm('');
                        }} className="overflow-clip relative shrink-0 size-[24px]">
                          <div className="absolute inset-[8.333%]">
                            <ClearSearchIcon />
                          </div>
                        </button>
                      ) : (
                        <div className="overflow-clip relative shrink-0 size-[24px]">
                          <div className="absolute inset-[13.563%]">
                            <SearchIcon />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <button
                    onClick={() => currentStep === 1 ? setFilterMenuOpen(!filterMenuOpen) : setDomainFilterOpen(!domainFilterOpen)}
                    className="box-border content-stretch flex gap-[6px] items-center justify-center min-h-[32px] px-[12px] py-[2px] relative rounded-[6px] shrink-0"
                  >
                    <p className="font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[#0b6bcb] text-[14px] text-nowrap whitespace-pre">
                      {currentStep === 1
                        ? (selectedHealthArea === 'Show all' ? 'Health area' : selectedHealthArea)
                        : (selectedDomain === 'Show all' ? 'Domain' : selectedDomain)
                      }
                    </p>
                    <div className="relative shrink-0 size-[20px]">
                      <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4">
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Health Area Filter Menu */}
              {filterMenuOpen && currentStep === 1 && (
                <div className="absolute bg-[#fbfcfe] box-border content-stretch flex flex-col items-start left-[386px] px-0 py-[6px] rounded-[8px] shadow-[0px_2px_8px_-2px_rgba(21,21,21,0.08),0px_6px_12px_-2px_rgba(21,21,21,0.08)] top-[60px] z-10">
                  {HEALTH_AREAS.map(area => (
                    <button
                      key={area}
                      onClick={() => {
                        setSelectedHealthArea(area);
                        setFilterMenuOpen(false);
                      }}
                      className="box-border content-stretch flex gap-[14px] items-center min-h-[36px] px-[12px] py-[4px] relative shrink-0 w-[220px] hover:bg-[#f0f4f8]"
                    >
                      <p className="basis-0 font-['Inter'] font-normal grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#32383e] text-[16px]">
                        {area}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* Domain Filter Menu */}
              {domainFilterOpen && currentStep === 2 && (
                <div className="absolute bg-[#fbfcfe] box-border content-stretch flex flex-col items-start left-[386px] px-0 py-[6px] rounded-[8px] shadow-[0px_2px_8px_-2px_rgba(21,21,21,0.08),0px_6px_12px_-2px_rgba(21,21,21,0.08)] top-[60px] z-10">
                  {VULNERABILITY_DOMAINS.map(domain => (
                    <button
                      key={domain}
                      onClick={() => {
                        setSelectedDomain(domain);
                        setDomainFilterOpen(false);
                      }}
                      className="box-border content-stretch flex gap-[14px] items-center min-h-[36px] px-[12px] py-[4px] relative shrink-0 w-[220px] hover:bg-[#f0f4f8]"
                    >
                      <p className="basis-0 font-['Inter'] font-normal grow leading-[1.5] min-h-px min-w-px not-italic relative shrink-0 text-[#32383e] text-[16px]">
                        {domain}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* View Switcher for Step 2 */}
              {currentStep === 2 && (
                <div className="border border-[#97c3f0] border-solid relative rounded-[6px] shrink-0 w-full">
                  <div className="content-stretch flex items-start relative w-full">
                    <button
                      onClick={() => setFactorView('Suggested')}
                      onMouseEnter={() => setHoveredTooltip('suggested')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className={`basis-0 ${factorView === 'Suggested' ? 'bg-[#c7dff7]' : ''} box-border content-stretch flex gap-[6px] grow items-center justify-center min-h-[32px] min-w-px px-[12px] py-[2px] relative shrink-0 hover:bg-[#c7dff7] transition-colors`}
                    >
                      <p className={`font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${factorView === 'Suggested' ? 'text-[#0857a7]' : 'text-[#0b6bcb]'}`}>
                        Suggested
                      </p>
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute inset-[8.333%]">
                          <InfoIcon />
                        </div>
                      </div>
                      {hoveredTooltip === 'suggested' && (
                        <div className="absolute bg-[#171a1c] text-white text-[14px] font-['Inter'] font-normal leading-[1.5] px-[12px] py-[8px] rounded-[6px] shadow-lg z-50 top-[calc(100%+8px)] left-0 w-[320px] text-left">
                          Factors are suggested because they show strong statistical correlation with your selected health outcome or behaviours from step #1.
                        </div>
                      )}
                    </button>
                    <div className="bg-[#97c3f0] self-stretch shrink-0 w-px" />
                    <button
                      onClick={() => setFactorView('Differentiating')}
                      onMouseEnter={() => setHoveredTooltip('differentiating')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className={`basis-0 ${factorView === 'Differentiating' ? 'bg-[#c7dff7]' : ''} box-border content-stretch flex gap-[6px] grow items-center justify-center min-h-[32px] min-w-px px-[12px] py-[2px] relative shrink-0 hover:bg-[#c7dff7] transition-colors`}
                    >
                      <p className={`font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${factorView === 'Differentiating' ? 'text-[#0857a7]' : 'text-[#0b6bcb]'}`}>
                        Differentiating
                      </p>
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute inset-[8.333%]">
                          <InfoIcon />
                        </div>
                      </div>
                      {hoveredTooltip === 'differentiating' && (
                        <div className="absolute bg-[#171a1c] text-white text-[14px] font-['Inter'] font-normal leading-[1.5] px-[12px] py-[8px] rounded-[6px] shadow-lg z-50 top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[320px] text-left">
                          Differentiating factors are important because they are associated with multiple outcomes and because they determine the segments. Note:<br />
                          1. There are many vulnerability factors that are predictive of health outcomes that don't get to be differentiating variables.<br />
                          2. Differentiating factors are not causal to health outcomes.<br />
                          3. Differentiating factors are also selected on the additional criteria that they show to biggest levels of variability in the data.
                        </div>
                      )}
                    </button>
                    <div className="bg-[#97c3f0] self-stretch shrink-0 w-px" />
                    <button
                      onClick={() => setFactorView('All factors')}
                      onMouseEnter={() => setHoveredTooltip('all')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className={`basis-0 ${factorView === 'All factors' ? 'bg-[#c7dff7]' : ''} box-border content-stretch flex gap-[6px] grow items-center justify-center min-h-[32px] min-w-px px-[12px] py-[2px] relative shrink-0 hover:bg-[#c7dff7] transition-colors`}
                    >
                      <p className={`font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${factorView === 'All factors' ? 'text-[#0857a7]' : 'text-[#0b6bcb]'}`}>
                        All factors
                      </p>
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute inset-[8.333%]">
                          <InfoIcon />
                        </div>
                      </div>
                      {hoveredTooltip === 'all' && (
                        <div className="absolute bg-[#171a1c] text-white text-[14px] font-['Inter'] font-normal leading-[1.5] px-[12px] py-[8px] rounded-[6px] shadow-lg z-50 top-[calc(100%+8px)] right-0 w-[280px] text-left">
                          All vulnerability factors included in the segmentation
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* List Container */}
              <div className="basis-0 border border-[#97c3f0] border-solid grow min-h-px min-w-px relative rounded-[6px] shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start overflow-clip relative size-full">
                  <div className="bg-[#dde7ee] border-[#97c3f0] border-[0px_0px_1px] border-solid box-border content-stretch flex h-[32px] items-center justify-between pb-0 pt-px px-[16px] relative shrink-0 w-full">
                    <p className="font-['Inter'] font-semibold leading-[1.42] not-italic relative shrink-0 text-[#555e68] text-[14px] text-nowrap whitespace-pre">
                      {hasSearch
                        ? `Search results (${filteredData.length + filteredVulnerabilities.length})`
                        : currentStep === 1
                          ? `Health outcomes and behaviours (${filteredData.length})`
                          : `Vulnerability factors (${filteredVulnerabilities.length})`
                      }
                    </p>
                    {((selectedItems.length > 0) || (selectedVulnerabilities.length > 0)) && (
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                        <button
                          onClick={() => {
                            clearAll();
                            clearAllVulnerabilities();
                          }}
                          className="box-border content-stretch flex gap-[6px] h-[24px] items-center justify-center min-h-[24px] px-[8px] py-[6px] relative rounded-[6px] shrink-0"
                        >
                          <p className="font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[#0b6bcb] text-[14px] text-nowrap whitespace-pre">
                            Clear all
                          </p>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0 w-full overflow-hidden">
                    {/* Combined Search Results */}
                    {hasSearch && (
                      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 overflow-y-auto h-full">
                        {/* Health outcomes section */}
                        {filteredData.length > 0 && (
                          <>
                            <div className="bg-[#dde7ee] border-[#97c3f0] border-[0px_0px_1px] border-solid box-border content-stretch flex h-[28px] items-center px-[16px] relative shrink-0 w-full sticky top-0 z-10">
                              <p className="font-['Inter'] font-semibold leading-[1.42] not-italic relative shrink-0 text-[#555e68] text-[12px] text-nowrap whitespace-pre">
                                Health outcomes and behaviours ({filteredData.length})
                              </p>
                            </div>
                            {filteredData.map((item, index) => (
                              <button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full border-[#97c3f0] border-[0px_0px_1px] border-solid hover:bg-[#dde7ee] ${index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'}`}
                              >
                                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                                      <div className={`relative shrink-0 size-[20px] ${selectedItems.includes(item.id) ? '' : 'bg-[#fbfcfe] border border-[#97c3f0] border-solid rounded-[4px]'}`}>
                                        {selectedItems.includes(item.id) && (
                                          <CheckboxCheckedIcon />
                                        )}
                                      </div>
                                    </div>
                                    <p className="font-['Inter'] font-normal leading-[1.42] not-italic relative shrink-0 text-[#171a1c] text-[14px] text-nowrap whitespace-pre">
                                      <span dangerouslySetInnerHTML={{
                                        __html: item.label.replace(
                                          new RegExp(`(${currentSearchTerm})`, 'gi'),
                                          '<span class="font-bold">$1</span>'
                                        )
                                      }} />
                                    </p>
                                  </div>
                                  <div className="content-stretch flex items-start relative shrink-0">
                                    <div className="overflow-clip relative shrink-0 size-[20px]">
                                      <div className="absolute inset-[8.333%]">
                                        <InfoIcon />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </>
                        )}

                        {/* Vulnerability factors section */}
                        {filteredVulnerabilities.length > 0 && (
                          <>
                            <div className="bg-[#dde7ee] border-[#97c3f0] border-[0px_0px_1px] border-solid box-border content-stretch flex h-[28px] items-center px-[16px] relative shrink-0 w-full sticky top-0 z-10">
                              <p className="font-['Inter'] font-semibold leading-[1.42] not-italic relative shrink-0 text-[#555e68] text-[12px] text-nowrap whitespace-pre">
                                Vulnerability factors ({filteredVulnerabilities.length})
                              </p>
                            </div>
                            {filteredVulnerabilities.map((item, index) => {
                              const correlationInfo = getCorrelationInfo(item.id);
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => toggleVulnerability(item.id)}
                                  className={`box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full border-[#97c3f0] border-[0px_0px_1px] border-solid hover:bg-[#dde7ee] ${index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'}`}
                                >
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                                        <div className={`relative shrink-0 size-[20px] ${selectedVulnerabilities.includes(item.id) ? '' : 'bg-[#fbfcfe] border border-[#97c3f0] border-solid rounded-[4px]'}`}>
                                          {selectedVulnerabilities.includes(item.id) && (
                                            <CheckboxCheckedIcon />
                                          )}
                                        </div>
                                      </div>
                                      <p className="font-['Inter'] font-normal leading-[1.42] not-italic relative shrink-0 text-[#171a1c] text-[14px] text-nowrap whitespace-pre">
                                        <span dangerouslySetInnerHTML={{
                                          __html: item.label.replace(
                                            new RegExp(`(${currentSearchTerm})`, 'gi'),
                                            '<span class="font-bold">$1</span>'
                                          )
                                        }} />
                                      </p>
                                    </div>
                                    <div className="content-stretch flex items-start relative shrink-0">
                                      <div className="overflow-clip relative shrink-0 size-[20px]">
                                        <div className="absolute inset-[8.333%]">
                                          <InfoIcon />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Correlation badge */}
                                  {correlationInfo && (
                                    <div className="bg-[#f0f4f8] border border-[#97c3f0] border-solid box-border content-baseline flex flex-wrap gap-[8px] items-baseline p-[8px] relative rounded-[4px] shrink-0 w-full">
                                      <div className="basis-0 content-center flex flex-wrap gap-[4px] grow items-center min-h-px min-w-px not-italic relative shrink-0">
                                        <p className="font-['Inter'] font-semibold leading-[1.66] relative shrink-0 text-[#555e68] text-[12px] text-nowrap whitespace-pre">
                                          Based on:
                                        </p>
                                        <p className="font-['Inter'] font-semibold leading-[1.66] relative shrink-0 text-[12px] text-[rgba(10,71,10,0.6)] text-nowrap whitespace-pre">
                                          {correlationInfo.strength} ({correlationInfo.value})
                                        </p>
                                        <p className="font-['Inter'] font-normal leading-[1.42] relative shrink-0 text-[#555e68] text-[14px]">
                                          statistical correlation with:
                                        </p>
                                        <p className="font-['Inter'] font-normal leading-[1.42] relative shrink-0 text-[#171a1c] text-[14px]">
                                          {correlationInfo.outcomeName}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </>
                        )}

                        {/* Empty state when no search results */}
                        {filteredData.length === 0 && filteredVulnerabilities.length === 0 && (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <p className="font-['Inter'] font-semibold leading-[1.5] text-[#171a1c] text-[18px]">No factors to display</p>
                            <p className="font-['Inter'] font-normal leading-[1.5] text-[#555e68] text-[16px] mt-[8px]">Clear all filters or try another search term</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 1 List (no search) */}
                    {!hasSearch && currentStep === 1 && (
                      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 overflow-y-auto h-full">
                        {filteredData.length > 0 ? filteredData.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full border-[#97c3f0] border-[0px_0px_1px] border-solid hover:bg-[#dde7ee] ${index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'}`}
                          >
                            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                                  <div className={`relative shrink-0 size-[20px] ${selectedItems.includes(item.id) ? '' : 'bg-[#fbfcfe] border border-[#97c3f0] border-solid rounded-[4px]'}`}>
                                    {selectedItems.includes(item.id) && (
                                      <CheckboxCheckedIcon />
                                    )}
                                  </div>
                                </div>
                                <p className="font-['Inter'] font-normal leading-[1.42] not-italic relative shrink-0 text-[#171a1c] text-[14px] text-nowrap whitespace-pre">
                                  {searchTerm ? (
                                    <span dangerouslySetInnerHTML={{
                                      __html: item.label.replace(
                                        new RegExp(`(${searchTerm})`, 'gi'),
                                        '<span class="font-bold">$1</span>'
                                      )
                                    }} />
                                  ) : item.label}
                                </p>
                              </div>
                              <div className="content-stretch flex items-start relative shrink-0">
                                <div className="overflow-clip relative shrink-0 size-[20px]">
                                  <div className="absolute inset-[8.333%]">
                                    <InfoIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                        )) : (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <p className="font-['Inter'] font-semibold leading-[1.5] text-[#171a1c] text-[18px]">No factors to display</p>
                            <p className="font-['Inter'] font-normal leading-[1.5] text-[#555e68] text-[16px] mt-[8px]">Clear all filters or try another search term</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 2 List (no search) */}
                    {!hasSearch && currentStep === 2 && (
                      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 overflow-y-auto h-full">
                        {filteredVulnerabilities.length > 0 ? filteredVulnerabilities.map((item, index) => {
                          const correlationInfo = getCorrelationInfo(item.id);
                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleVulnerability(item.id)}
                              className={`box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full border-[#97c3f0] border-[0px_0px_1px] border-solid hover:bg-[#dde7ee] ${index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'}`}
                            >
                              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                  <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                                    <div className={`relative shrink-0 size-[20px] ${selectedVulnerabilities.includes(item.id) ? '' : 'bg-[#fbfcfe] border border-[#97c3f0] border-solid rounded-[4px]'}`}>
                                      {selectedVulnerabilities.includes(item.id) && (
                                        <CheckboxCheckedIcon />
                                      )}
                                    </div>
                                  </div>
                                  <p className="font-['Inter'] font-normal leading-[1.42] not-italic relative shrink-0 text-[#171a1c] text-[14px] text-nowrap whitespace-pre">
                                    {currentSearchTerm ? (
                                      <span dangerouslySetInnerHTML={{
                                        __html: item.label.replace(
                                          new RegExp(`(${currentSearchTerm})`, 'gi'),
                                          '<span class="font-bold">$1</span>'
                                        )
                                      }} />
                                    ) : item.label}
                                  </p>
                                </div>
                                <div className="content-stretch flex items-start relative shrink-0">
                                  <div className="overflow-clip relative shrink-0 size-[20px]">
                                    <div className="absolute inset-[8.333%]">
                                      <InfoIcon />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Correlation badge */}
                              {correlationInfo && (
                                <div className="bg-[#f0f4f8] border border-[#97c3f0] border-solid box-border content-baseline flex flex-wrap gap-[8px] items-baseline p-[8px] relative rounded-[4px] shrink-0 w-full">
                                  <div className="basis-0 content-center flex flex-wrap gap-[4px] grow items-center min-h-px min-w-px not-italic relative shrink-0">
                                    <p className="font-['Inter'] font-semibold leading-[1.66] relative shrink-0 text-[#555e68] text-[12px] text-nowrap whitespace-pre">
                                      Based on:
                                    </p>
                                    <p className="font-['Inter'] font-semibold leading-[1.66] relative shrink-0 text-[12px] text-[rgba(10,71,10,0.6)] text-nowrap whitespace-pre">
                                      {correlationInfo.strength} ({correlationInfo.value})
                                    </p>
                                    <p className="font-['Inter'] font-normal leading-[1.42] relative shrink-0 text-[#555e68] text-[14px]">
                                      statistical correlation with:
                                    </p>
                                    <p className="font-['Inter'] font-normal leading-[1.42] relative shrink-0 text-[#171a1c] text-[14px]">
                                      {correlationInfo.outcomeName}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        }) : (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <p className="font-['Inter'] font-semibold leading-[1.5] text-[#171a1c] text-[18px]">No factors to display</p>
                            <p className="font-['Inter'] font-normal leading-[1.5] text-[#555e68] text-[16px] mt-[8px]">Clear all filters or try another search term</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="box-border content-stretch flex items-start justify-between px-[24px] py-[16px] relative shrink-0 w-full">
              {currentStep === 2 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="border border-[#97c3f0] border-solid box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center min-h-[40px] px-[16px] py-[4px] relative rounded-[6px] shrink-0 hover:bg-[#f0f4f8] transition-colors"
                >
                  <div className="size-[24px]" style={{ transform: 'rotate(180deg)' }}>
                    <ArrowRightIcon />
                  </div>
                  <p className="font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[#0b6bcb] text-[14px] text-nowrap whitespace-pre">
                    Back
                  </p>
                </button>
              )}
              {currentStep === 1 ? (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#0b6bcb] box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center min-h-[40px] ml-auto px-[16px] py-[4px] relative rounded-[6px] shrink-0 hover:bg-[#0a5fb0] transition-colors"
                >
                  <p className="font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
                    Select vulnerability factors
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]">
                    <div className="absolute inset-[16.667%]">
                      <ArrowRightIcon />
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => onClose(true)}
                  className="bg-[#0b6bcb] box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center min-h-[40px] px-[16px] py-[4px] relative rounded-[6px] shrink-0 hover:bg-[#0a5fb0] transition-colors"
                >
                  <p className="font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
                    Compare
                  </p>
                  <div className="overflow-clip relative shrink-0 size-[24px]">
                    <div className="absolute inset-[16.667%]">
                      <ArrowRightIcon />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => onClose(false)}
        className="absolute bg-white border border-[#97c3f0] border-solid box-border content-stretch flex gap-[8px] items-center right-[-24px] rounded-[1000px] top-[-24px] hover:bg-[#f0f4f8] transition-colors z-10"
      >
        <div className="box-border content-stretch cursor-pointer flex items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-0 relative rounded-[1000px] shrink-0">
          <div className="content-stretch flex items-start relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[20px]">
              <div className="absolute inset-[20.833%]">
                <CloseIcon />
              </div>
            </div>
          </div>
        </div>
      </button>
          </div>
        </div>
      </div>
    </>
  );
}
