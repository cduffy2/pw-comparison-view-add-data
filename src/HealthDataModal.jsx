import { useState, useRef, useEffect } from 'react';

// SVG Icons
const SearchIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#12467b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg className="size-full" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="#9FA6AD" strokeWidth="1.5"/>
    <path d="M10 10V14M10 6V7" stroke="#9FA6AD" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowForwardIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="size-full" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="#12467b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="size-full" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="#0b6bcb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseSmallIcon = () => (
  <svg className="size-full" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5L15 15" stroke="#12467b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Health outcomes and behaviours data
const HEALTH_DATA = [
  { id: 'h1', label: 'Less than 4 ANC visits', type: 'health', category: 'maternal-health' },
  { id: 'h2', label: 'No PNC for newborn', type: 'health', category: 'child-health' },
  { id: 'h3', label: 'Never breastfed', type: 'health', category: 'child-health' },
  { id: 'h4', label: 'Pregnancy ended in stillbirth', type: 'health', category: 'maternal-health' },
  { id: 'h5', label: 'Death of a child before 1 yr', type: 'health', category: 'child-health' },
  { id: 'h6', label: 'Death of a child before 5 yrs', type: 'health', category: 'child-health' },
  { id: 'h7', label: 'No current modern FP use', type: 'health', category: 'family-planning' },
  { id: 'h8', label: 'Latest birth delivered at home', type: 'health', category: 'maternal-health' },
  { id: 'h9', label: 'Not fully immunized with DPT', type: 'health', category: 'immunisation' },
  { id: 'h10', label: 'Not immunized with MMR', type: 'health', category: 'immunisation' },
  { id: 'h11', label: 'Not immunized with polio', type: 'health', category: 'immunisation' },
  { id: 'h12', label: 'Zero-dose child', type: 'health', category: 'immunisation' },
  { id: 'h13', label: 'Overweight child', type: 'health', category: 'nutrition' },
  { id: 'h14', label: 'Stunted child', type: 'health', category: 'nutrition' },
  { id: 'h15', label: 'Underweight child', type: 'health', category: 'nutrition' },
  { id: 'h16', label: 'Wasted child', type: 'health', category: 'nutrition' },
  { id: 'h17', label: 'No. of children who have died', type: 'health', category: 'child-health' },
  { id: 'h18', label: 'No. of children who have died (3 category)', type: 'health', category: 'child-health' },
  { id: 'h19', label: 'Death of a child', type: 'health', category: 'child-health' },
  { id: 'h20', label: 'No PNC for mother', type: 'health', category: 'maternal-health' },
];

// Vulnerability factors data
const VULNERABILITY_DATA = [
  { id: 'v1', label: 'Any media exposure', type: 'vulnerability', category: 'suggested' },
  { id: 'v2', label: 'Female circumcision', type: 'vulnerability', category: 'woman-past' },
  { id: 'v3', label: 'Bank account (woman)', type: 'vulnerability', category: 'household-economics' },
  { id: 'v4', label: 'HH clean cooking fuel', type: 'vulnerability', category: 'household-economics' },
  { id: 'v5', label: 'HH electricity', type: 'vulnerability', category: 'household-economics' },
  { id: 'v6', label: 'HH motor transport', type: 'vulnerability', category: 'household-economics' },
  { id: 'v7', label: 'HH member of savings club', type: 'vulnerability', category: 'social-support' },
  { id: 'v8', label: 'HW visit in last yr', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v9', label: 'Media exposure: internet', type: 'vulnerability', category: 'suggested' },
  { id: 'v10', label: 'Access problem: travel alone', type: 'vulnerability', category: 'woman-past' },
  { id: 'v11', label: 'Mobile phone used for finances', type: 'vulnerability', category: 'household-economics' },
  { id: 'v12', label: 'Not living w/ partner', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v13', label: 'Currently employed', type: 'vulnerability', category: 'woman-past' },
  { id: 'v14', label: 'Age at first birth (3 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v15', label: 'Age at first sex (4 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v16', label: 'Decision maker: family planning', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v17', label: 'Decision maker: HH purchases', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v18', label: 'Decision maker: own income', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v19', label: 'Educational attainment', type: 'vulnerability', category: 'suggested' },
  { id: 'v20', label: 'Preferred next birth interval', type: 'vulnerability', category: 'woman-past' },
  { id: 'v21', label: 'Partner opposition to FP use', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v22', label: 'Sex of the head of HH', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v23', label: 'HH received money', type: 'vulnerability', category: 'social-support' },
  { id: 'v24', label: 'HH slum residence (UN definition)', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v25', label: 'HH water source interrupted', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v26', label: 'Joint decision making index', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v27', label: 'HH in malaria zone', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v28', label: 'Marital status', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v29', label: 'No. <5 yrs in HH (4 category)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v30', label: 'Total lifetime sex partners', type: 'vulnerability', category: 'woman-past' },
  { id: 'v31', label: 'Wife rank', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v32', label: 'Employment continuity', type: 'vulnerability', category: 'woman-past' },
  { id: 'v33', label: 'Education level (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v34', label: 'Employment status', type: 'vulnerability', category: 'woman-past' },
  { id: 'v35', label: 'IPV justification', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v36', label: 'Religion', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v37', label: 'Age at first cohabitation (3 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v38', label: 'Age at first birth', type: 'vulnerability', category: 'woman-past' },
  { id: 'v39', label: 'Age at first cohabitation', type: 'vulnerability', category: 'woman-past' },
  { id: 'v40', label: 'Age at first sex', type: 'vulnerability', category: 'woman-past' },
  { id: 'v41', label: 'Child given beans/peas/lentils', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v42', label: 'Child given fortified food', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v43', label: 'Child given meat', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v44', label: 'Child given solid/soft food', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v45', label: 'Child given sweet snacks', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v46', label: 'Decision maker: family visits', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v47', label: 'Child treated for diarrhea', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v48', label: 'HH member w/ disability', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v49', label: 'Earnings relative to partner', type: 'vulnerability', category: 'household-economics' },
  { id: 'v50', label: 'At least primary education', type: 'vulnerability', category: 'suggested' },
  { id: 'v51', label: 'Educational attainment (binary)', type: 'vulnerability', category: 'suggested' },
  { id: 'v52', label: 'Fertility preference', type: 'vulnerability', category: 'woman-past' },
  { id: 'v53', label: 'Media exposure: news/journal', type: 'vulnerability', category: 'suggested' },
  { id: 'v54', label: 'Media exposure: radio', type: 'vulnerability', category: 'suggested' },
  { id: 'v55', label: 'Female circumcision: genital nicked', type: 'vulnerability', category: 'woman-past' },
  { id: 'v56', label: 'Female circumcision: genital sewn', type: 'vulnerability', category: 'woman-past' },
  { id: 'v57', label: 'Female circumcision: flesh removed', type: 'vulnerability', category: 'woman-past' },
  { id: 'v58', label: 'HH received other state support', type: 'vulnerability', category: 'social-support' },
  { id: 'v59', label: 'HH car', type: 'vulnerability', category: 'household-economics' },
  { id: 'v60', label: 'HH animal-drawn cart', type: 'vulnerability', category: 'household-economics' },
  { id: 'v61', label: 'HH internet', type: 'vulnerability', category: 'household-economics' },
  { id: 'v62', label: 'HH child to woman ratio', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v63', label: 'HH motorcycle or scooter', type: 'vulnerability', category: 'household-economics' },
  { id: 'v64', label: 'Age at first birth (5 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v65', label: 'At least primary education', type: 'vulnerability', category: 'suggested' },
  { id: 'v66', label: 'HH rudimentary or natural floor', type: 'vulnerability', category: 'household-economics' },
  { id: 'v67', label: 'Any birth registered/declared', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v68', label: 'HH water not treated', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v69', label: 'HH radio', type: 'vulnerability', category: 'household-economics' },
  { id: 'v70', label: 'Condom use during last sex', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v71', label: 'Decision maker: woman\'s health', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v72', label: 'HH refrigerator', type: 'vulnerability', category: 'household-economics' },
  { id: 'v73', label: 'HH sanitation (3 category)', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v74', label: 'Provider for woman\'s PNC', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v75', label: 'HH member sends money', type: 'vulnerability', category: 'social-support' },
  { id: 'v76', label: 'HH shares toilet', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v77', label: 'HH stove', type: 'vulnerability', category: 'household-economics' },
  { id: 'v78', label: 'HH television', type: 'vulnerability', category: 'household-economics' },
  { id: 'v79', label: 'HH VCR/DVD/CD player', type: 'vulnerability', category: 'household-economics' },
  { id: 'v80', label: 'Polygamy status', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v81', label: 'Where HH cooks food (6 category)', type: 'vulnerability', category: 'household-economics' },
  { id: 'v82', label: 'Media exposure: TV', type: 'vulnerability', category: 'suggested' },
  { id: 'v83', label: 'Phone ownership (woman)', type: 'vulnerability', category: 'household-economics' },
  { id: 'v84', label: 'HH highest education', type: 'vulnerability', category: 'suggested' },
  { id: 'v85', label: 'HH owns animals', type: 'vulnerability', category: 'household-economics' },
  { id: 'v86', label: 'Bank account (household)', type: 'vulnerability', category: 'household-economics' },
  { id: 'v87', label: 'HH bicycle', type: 'vulnerability', category: 'household-economics' },
  { id: 'v88', label: 'Fecundity status', type: 'vulnerability', category: 'woman-past' },
  { id: 'v89', label: 'Family security grants', type: 'vulnerability', category: 'social-support' },
  { id: 'v90', label: 'HH computer', type: 'vulnerability', category: 'household-economics' },
  { id: 'v91', label: 'Home ownership', type: 'vulnerability', category: 'household-economics' },
  { id: 'v92', label: 'Land ownership', type: 'vulnerability', category: 'household-economics' },
  { id: 'v93', label: 'HH cooks food inside', type: 'vulnerability', category: 'household-economics' },
  { id: 'v94', label: 'HH unimproved toilet', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v95', label: 'Child <15yrs lives away', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v96', label: 'Age at first birth (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v97', label: 'HH house ownership', type: 'vulnerability', category: 'household-economics' },
  { id: 'v98', label: 'Decides partner income (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v99', label: 'Decides HH purchases (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v100', label: 'Partner no. of wives/partners', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v101', label: 'HH agricultural land ownership', type: 'vulnerability', category: 'household-economics' },
  { id: 'v102', label: 'HH member w/o insurance', type: 'vulnerability', category: 'social-support' },
  { id: 'v103', label: 'Married or living w/ partner', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v104', label: 'HH unimproved or shared facility', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v105', label: 'HH member receives money', type: 'vulnerability', category: 'social-support' },
  { id: 'v106', label: 'HH member sends money (binary)', type: 'vulnerability', category: 'social-support' },
  { id: 'v107', label: 'Where HH cooks food (3 category)', type: 'vulnerability', category: 'household-economics' },
  { id: 'v108', label: 'HH highest education: 7+', type: 'vulnerability', category: 'suggested' },
  { id: 'v109', label: 'Child <3yr given micronutrient', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v110', label: 'HW talked about FP', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v111', label: 'Religion: Islam', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v112', label: 'Heard of FGM', type: 'vulnerability', category: 'woman-past' },
  { id: 'v113', label: 'Partner FP information', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v114', label: 'Access problem: treatment cost', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v115', label: 'Access problem: distance to HF', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v116', label: 'Access problem: permission', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v117', label: 'No. over 15+ yrs', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v118', label: 'No. of living children', type: 'vulnerability', category: 'woman-past' },
  { id: 'v119', label: 'No. of living children (4 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v120', label: 'No. of pregnancies', type: 'vulnerability', category: 'woman-past' },
  { id: 'v121', label: 'Child <2yr given solid/soft food', type: 'vulnerability', category: 'health-mental-models' },
  { id: 'v122', label: 'No. <15 yrs', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v123', label: 'No. <5 yrs', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v124', label: 'Occupation', type: 'vulnerability', category: 'woman-past' },
  { id: 'v125', label: 'Employment status (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v126', label: 'HH has toilet facility', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v127', label: 'No. over 15+ yrs (4 category)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v128', label: 'No. of pregnancies (2 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v129', label: 'No. <15 yrs (4 category)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v130', label: 'Employer type', type: 'vulnerability', category: 'woman-past' },
  { id: 'v131', label: 'Occupation (7 category)', type: 'vulnerability', category: 'woman-past' },
  { id: 'v132', label: 'Occupation (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v133', label: 'Literacy program language', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v134', label: 'Partner age (4 category)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v135', label: 'At least primary education (partner) (4 category)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v136', label: 'Partner\'s desire for children', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v137', label: 'HH unimproved water source', type: 'vulnerability', category: 'larger-environment' },
  { id: 'v138', label: 'At least secondary education (partner)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v139', label: 'Occupation (partner) (7 category)', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v140', label: 'Polygamous relationship', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v141', label: 'More than one union', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v142', label: 'Decision-making index', type: 'vulnerability', category: 'household-relationship' },
  { id: 'v143', label: 'Duration of current union', type: 'vulnerability', category: 'household-relationship' },
];

// Combined data
const ALL_DATA = [...HEALTH_DATA, ...VULNERABILITY_DATA];

// Filter categories
const HEALTH_CATEGORIES = [
  { id: 'family-planning', label: 'Family planning' },
  { id: 'child-health', label: 'Child health' },
  { id: 'immunisation', label: 'Immunisation' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'maternal-health', label: 'Maternal health' },
];

const VULNERABILITY_CATEGORIES = [
  { id: 'suggested', label: 'Suggested' },
  { id: 'woman-past', label: 'Woman and her past experiences' },
  { id: 'household-relationship', label: 'Household relationship' },
  { id: 'social-support', label: 'Social support' },
  { id: 'household-economics', label: 'Household economics' },
  { id: 'health-mental-models', label: 'Health mental models' },
  { id: 'larger-environment', label: 'Larger environment' },
];

// FilterMenu Component
function FilterMenu({ isOpen, onClose, activeTab, tempFilters, setTempFilters, onApply, onClearAll, filterButtonRef }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // Don't close if clicking the filter button or the menu itself
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, filterButtonRef]);

  if (!isOpen) return null;

  const toggleFilter = (filterId) => {
    setTempFilters(prev =>
      prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]
    );
  };

  const showBothSections = activeTab === 'all';
  const categories = activeTab === 'health' ? HEALTH_CATEGORIES : VULNERABILITY_CATEGORIES;

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-[4px] w-[500px] bg-[#fbfcfe] border border-[#97c3f0] rounded-[8px] shadow-[0px_2px_8px_-2px_rgba(21,21,21,0.08),0px_6px_12px_-2px_rgba(21,21,21,0.08)] flex flex-col"
      style={{ zIndex: 10000 }}
    >
      {/* Two column layout or single column */}
      <div className="flex pb-[12px]">
        {showBothSections ? (
          <>
            {/* Health area column */}
            <div className="flex-1 flex flex-col">
              <div className="bg-[#cdd7e1] px-[12px] py-[6px]">
                <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#32383e]">
                  Health area
                </span>
              </div>
              {HEALTH_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleFilter(category.id)}
                  className="px-[12px] py-[4px] min-h-[36px] flex items-center gap-[14px] hover:bg-[#e3effb] transition-colors"
                >
                  <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center shrink-0 ${
                    tempFilters.includes(category.id)
                      ? 'bg-[#0b6bcb] border-[#0b6bcb]'
                      : 'bg-[#fbfcfe] border-[#97c3f0]'
                  }`}>
                    {tempFilters.includes(category.id) && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-['Inter'] text-[16px] leading-[1.5] text-[#32383e]">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Vulnerability domains column */}
            <div className="flex-1 flex flex-col border-l border-[#97c3f0]">
              <div className="bg-[#cdd7e1] px-[12px] py-[6px]">
                <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#32383e]">
                  Vulnerability domains
                </span>
              </div>
              {VULNERABILITY_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleFilter(category.id)}
                  className="px-[12px] py-[4px] min-h-[36px] flex items-center gap-[14px] hover:bg-[#e3effb] transition-colors"
                >
                  <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center shrink-0 ${
                    tempFilters.includes(category.id)
                      ? 'bg-[#0b6bcb] border-[#0b6bcb]'
                      : 'bg-[#fbfcfe] border-[#97c3f0]'
                  }`}>
                    {tempFilters.includes(category.id) && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-['Inter'] text-[16px] leading-[1.5] text-[#32383e]">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Single column for health or vulnerability tab */
          <div className="flex-1 flex flex-col">
            <div className="bg-[#cdd7e1] px-[12px] py-[6px]">
              <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#32383e]">
                {activeTab === 'health' ? 'Health area' : 'Vulnerability domains'}
              </span>
            </div>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleFilter(category.id)}
                className="px-[12px] py-[4px] min-h-[36px] flex items-center gap-[14px] hover:bg-[#e3effb] transition-colors"
              >
                <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center shrink-0 ${
                  tempFilters.includes(category.id)
                    ? 'bg-[#0b6bcb] border-[#0b6bcb]'
                    : 'bg-[#fbfcfe] border-[#97c3f0]'
                }`}>
                  {tempFilters.includes(category.id) && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-['Inter'] text-[16px] leading-[1.5] text-[#32383e]">
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer with buttons */}
      <div className="border-t border-[#97c3f0] px-[16px] py-[12px] flex items-center justify-end gap-[8px]">
        <button
          onClick={onClearAll}
          className="border border-[#97c3f0] px-[12px] py-[2px] min-h-[32px] rounded-[6px] hover:bg-[#e3effb] transition-colors"
        >
          <span className="font-['Inter'] font-semibold text-[14px] leading-[14px] text-[#0b6bcb]">
            Clear all
          </span>
        </button>
        <button
          onClick={onApply}
          className="bg-[#0b6bcb] px-[12px] py-[2px] min-h-[32px] rounded-[6px] hover:bg-[#0a5fb0] transition-colors"
        >
          <span className="font-['Inter'] font-semibold text-[14px] leading-[14px] text-white">
            Apply
          </span>
        </button>
      </div>
    </div>
  );
}

export default function HealthDataModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'health', 'vulnerability'
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [tempFilters, setTempFilters] = useState([]);
  const filterButtonRef = useRef(null);

  const toggleItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  const handleFilterButtonClick = () => {
    if (isFilterMenuOpen) {
      setIsFilterMenuOpen(false);
    } else {
      setTempFilters(appliedFilters);
      setIsFilterMenuOpen(true);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setIsFilterMenuOpen(false);
  };

  const handleCloseFilterMenu = () => {
    setIsFilterMenuOpen(false);
  };

  const handleClearAllFilters = () => {
    setTempFilters([]);
    setAppliedFilters([]);
    setIsFilterMenuOpen(false);
  };

  // Get filter button text
  const getFilterButtonText = () => {
    if (appliedFilters.length === 0) {
      return 'Show all';
    } else if (appliedFilters.length === 1) {
      const allCategories = [...HEALTH_CATEGORIES, ...VULNERABILITY_CATEGORIES];
      const filter = allCategories.find(cat => cat.id === appliedFilters[0]);
      return filter ? filter.label : 'Show all';
    } else {
      return `${appliedFilters.length} selected`;
    }
  };

  // Helper function to highlight search term in text
  const highlightSearchTerm = (text) => {
    if (!searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return <span key={index} className="font-semibold">{part}</span>;
      }
      return part;
    });
  };

  // Filter data based on active tab, search term, and category filters
  const getFilteredData = () => {
    let dataToFilter;
    if (activeTab === 'health') {
      dataToFilter = HEALTH_DATA;
    } else if (activeTab === 'vulnerability') {
      dataToFilter = VULNERABILITY_DATA;
    } else {
      dataToFilter = ALL_DATA;
    }

    // Apply search filter
    let filtered = dataToFilter.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply category filters
    if (appliedFilters.length > 0) {
      filtered = filtered.filter(item =>
        item.category && appliedFilters.includes(item.category)
      );
    }

    return filtered;
  };

  const filteredData = getFilteredData();
  const filteredHealthData = filteredData.filter(item => item.type === 'health');
  const filteredVulnerabilityData = filteredData.filter(item => item.type === 'vulnerability');

  const selectedData = ALL_DATA.filter(item => selectedItems.includes(item.id));

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 12, 36, 0.85)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-8">
        <div className="pointer-events-auto w-full max-w-[1260px] h-[750px] bg-white rounded-[16px] border border-[#97c3f0] shadow-2xl relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-[-24px] top-[-24px] bg-white border border-[#97c3f0] rounded-full w-[48px] h-[48px] flex items-center justify-center hover:bg-[#f0f4f8] transition-colors z-10"
          >
            <div className="w-[20px] h-[20px]">
              <CloseIcon />
            </div>
          </button>

          {/* Two Column Layout */}
          <div className="flex h-full rounded-[16px] overflow-hidden">

            {/* Left Column - Data Selection */}
            <div className="w-[860px] flex flex-col gap-[16px] px-[24px] pt-[24px] pb-[72px]">

              {/* Title + Search */}
              <div className="flex items-start justify-between w-full">
                <h2 className="font-['Inter'] font-semibold text-[24px] leading-[1.5] text-[#171a1c]">
                  Select data to compare
                </h2>

                <div className="w-[320px] bg-[#e3effb] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08)] px-[12px] py-[8px] flex items-center gap-[8px]">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for anything"
                    className="flex-1 bg-transparent outline-none font-['Inter'] text-[16px] leading-[1.5] text-[#12467b] placeholder:opacity-[0.64]"
                  />
                  <div className="w-[24px] h-[24px] flex items-center justify-center">
                    <div className="w-[17.5px] h-[17.5px]">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Buttons */}
              <div className="border border-[#97c3f0] rounded-[6px] overflow-hidden flex">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 px-[16px] py-[4px] min-h-[40px] flex items-center justify-center ${
                    activeTab === 'all' ? 'bg-[#c7dff7]' : 'hover:bg-[#e3effb]'
                  }`}
                >
                  <span className={`font-['Inter'] font-semibold text-[14px] leading-[14px] ${
                    activeTab === 'all' ? 'text-[#0857a7]' : 'text-[#0b6bcb]'
                  }`}>
                    All data
                  </span>
                </button>
                <div className="w-px bg-[#97c3f0]" />
                <button
                  onClick={() => setActiveTab('health')}
                  className={`flex-1 px-[16px] py-[4px] min-h-[40px] flex items-center justify-center ${
                    activeTab === 'health' ? 'bg-[#c7dff7]' : 'hover:bg-[#e3effb]'
                  }`}
                >
                  <span className={`font-['Inter'] font-semibold text-[14px] leading-[14px] ${
                    activeTab === 'health' ? 'text-[#0857a7]' : 'text-[#0b6bcb]'
                  }`}>
                    Health outcomes and behaviours
                  </span>
                </button>
                <div className="w-px bg-[#97c3f0]" />
                <button
                  onClick={() => setActiveTab('vulnerability')}
                  className={`flex-1 px-[16px] py-[4px] min-h-[40px] flex items-center justify-center ${
                    activeTab === 'vulnerability' ? 'bg-[#c7dff7]' : 'hover:bg-[#e3effb]'
                  }`}
                >
                  <span className={`font-['Inter'] font-semibold text-[14px] leading-[14px] ${
                    activeTab === 'vulnerability' ? 'text-[#0857a7]' : 'text-[#0b6bcb]'
                  }`}>
                    Vulnerability factors
                  </span>
                </button>
              </div>

              {/* Container */}
              <div className="flex-1 border border-[#97c3f0] rounded-[6px] flex flex-col min-h-0">

                {/* Header with Filter */}
                <div className="bg-[#dde7ee] border-b border-[#97c3f0] h-[32px] px-[16px] flex items-center justify-between relative" style={{ zIndex: 100 }}>
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#555e68]">
                    {activeTab === 'all' && `All data (${ALL_DATA.length})`}
                    {activeTab === 'health' && `Health outcomes and behaviours (${HEALTH_DATA.length})`}
                    {activeTab === 'vulnerability' && `Vulnerability factors (${VULNERABILITY_DATA.length})`}
                  </span>
                  <div className="flex items-center gap-[4px] relative">
                    <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#555e68]">
                      Filter:
                    </span>
                    <button
                      ref={filterButtonRef}
                      onClick={handleFilterButtonClick}
                      className="px-[8px] py-[6px] h-[24px] flex items-center gap-[4px] justify-center rounded-[6px] hover:bg-[#c7dff7]"
                    >
                      <span className="font-['Inter'] font-semibold text-[14px] leading-[14px] text-[#0b6bcb]">
                        {getFilterButtonText()}
                      </span>
                      <div className="w-[16px] h-[16px]">
                        <ChevronDownIcon />
                      </div>
                    </button>

                    {/* FilterMenu */}
                    <FilterMenu
                      isOpen={isFilterMenuOpen}
                      onClose={handleCloseFilterMenu}
                      activeTab={activeTab}
                      tempFilters={tempFilters}
                      setTempFilters={setTempFilters}
                      onApply={handleApplyFilters}
                      onClearAll={handleClearAllFilters}
                      filterButtonRef={filterButtonRef}
                    />
                  </div>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto flex">
                  <div className="flex-1">
                    {/* Show both sections when 'all' tab is active */}
                    {activeTab === 'all' && (
                      <div>
                        {/* Health outcomes section */}
                        {filteredHealthData.length > 0 && (
                          <div>
                            <div className="bg-[#f0f4f8] border-b border-[#97c3f0] h-[32px] px-[16px] flex items-center sticky top-0 z-10">
                              <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#555e68]">
                                Health outcomes and behaviours ({filteredHealthData.length})
                              </span>
                            </div>
                            {filteredHealthData.map((item, index) => (
                              <button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`w-full p-[16px] border-b border-[#97c3f0] flex items-center justify-between hover:bg-[#dde7ee] transition-colors ${
                                  index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'
                                }`}
                              >
                                <div className="flex items-center gap-[8px]">
                                  <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center ${
                                    selectedItems.includes(item.id)
                                      ? 'bg-[#0b6bcb] border-[#0b6bcb]'
                                      : 'bg-[#fbfcfe] border-[#97c3f0]'
                                  }`}>
                                    {selectedItems.includes(item.id) && (
                                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                        <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    )}
                                  </div>
                                  <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#171a1c]">
                                    {highlightSearchTerm(item.label)}
                                  </span>
                                </div>
                                <div className="w-[20px] h-[20px] flex-shrink-0">
                                  <InfoIcon />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Vulnerability factors section */}
                        {filteredVulnerabilityData.length > 0 && (
                          <div>
                            <div className="bg-[#f0f4f8] border-b border-[#97c3f0] h-[32px] px-[16px] flex items-center sticky top-0 z-10">
                              <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#555e68]">
                                Vulnerability factors ({filteredVulnerabilityData.length})
                              </span>
                            </div>
                            {filteredVulnerabilityData.map((item, index) => (
                              <button
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`w-full p-[16px] border-b border-[#97c3f0] flex items-center justify-between hover:bg-[#dde7ee] transition-colors ${
                                  index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'
                                }`}
                              >
                                <div className="flex items-center gap-[8px]">
                                  <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center ${
                                    selectedItems.includes(item.id)
                                      ? 'bg-[#0b6bcb] border-[#0b6bcb]'
                                      : 'bg-[#fbfcfe] border-[#97c3f0]'
                                  }`}>
                                    {selectedItems.includes(item.id) && (
                                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                        <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    )}
                                  </div>
                                  <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#171a1c]">
                                    {highlightSearchTerm(item.label)}
                                  </span>
                                </div>
                                <div className="w-[20px] h-[20px] flex-shrink-0">
                                  <InfoIcon />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Show only filtered data for specific tabs */}
                    {activeTab !== 'all' && (
                      <div>
                        {filteredData.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`w-full p-[16px] border-b border-[#97c3f0] flex items-center justify-between hover:bg-[#dde7ee] transition-colors ${
                              index % 2 === 0 ? 'bg-[#fbfcfe]' : 'bg-[#f0f4f8]'
                            }`}
                          >
                            <div className="flex items-center gap-[8px]">
                              <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center ${
                                selectedItems.includes(item.id)
                                  ? 'bg-[#0b6bcb] border-[#0b6bcb]'
                                  : 'bg-[#fbfcfe] border-[#97c3f0]'
                              }`}>
                                {selectedItems.includes(item.id) && (
                                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#171a1c]">
                                {highlightSearchTerm(item.label)}
                              </span>
                            </div>
                            <div className="w-[20px] h-[20px] flex-shrink-0">
                              <InfoIcon />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Scrollbar */}
                  <div className="w-[12px] bg-[#fbfcfe] border-l border-[#97c3f0] relative flex-shrink-0">
                    <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[6px] h-[60px] bg-[#9fa6ad] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Selected Data */}
            <div className="flex-1 bg-[#f0f4f8] border-l border-[#97c3f0] flex flex-col px-[24px] py-[16px] justify-between">

              {/* Selected Items Section */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-['Inter'] font-semibold text-[18px] leading-[1.66] text-[#171a1c]">
                    Selected data {selectedItems.length > 0 && `(${selectedItems.length})`}
                  </h3>
                  {selectedItems.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="px-[8px] py-[6px] h-[24px] flex items-center justify-center rounded-[6px] hover:bg-[#dde7ee]"
                    >
                      <span className="font-['Inter'] font-semibold text-[14px] leading-[14px] text-[#0b6bcb]">
                        Clear all
                      </span>
                    </button>
                  )}
                </div>

                {/* Selected Items Display */}
                <div className="bg-white border border-[#97c3f0] rounded-[4px] h-[548px]">
                  {selectedData.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#555e68]">
                        No data selected
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full px-[12px] py-[16px] overflow-y-auto flex flex-col gap-[8px]">
                      {selectedData.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#e3effb] rounded-[24px] px-[8px] min-h-[24px] flex items-center gap-[6px] w-fit"
                        >
                          <span className="font-['Inter'] font-medium text-[14px] leading-[1.5] text-[#12467b]">
                            {item.label}
                          </span>
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="rounded-[6px] hover:bg-[#c7dff7] transition-colors flex items-center justify-center"
                          >
                            <div className="w-[20px] h-[20px]">
                              <CloseSmallIcon />
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Compare Button */}
              <button
                onClick={onClose}
                className="bg-[#0b6bcb] rounded-[6px] px-[16px] py-[4px] min-h-[40px] flex items-center justify-center gap-[8px] hover:bg-[#0a5fb0] transition-colors"
              >
                <span className="font-['Inter'] font-semibold text-[14px] leading-[14px] text-white">
                  Compare
                </span>
                <div className="w-[24px] h-[24px]">
                  <div className="w-[16px] h-[16px] mx-auto my-[4px]">
                    <ArrowForwardIcon />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
