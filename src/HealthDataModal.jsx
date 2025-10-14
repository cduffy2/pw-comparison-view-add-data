import { useState } from 'react';

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

// Health outcomes and behaviours data
const HEALTH_DATA = [
  { id: 'h1', label: 'Less than 4 ANC visits', type: 'health' },
  { id: 'h2', label: 'No PNC for newborn', type: 'health' },
  { id: 'h3', label: 'Never breastfed', type: 'health' },
  { id: 'h4', label: 'Pregnancy ended in stillbirth', type: 'health' },
  { id: 'h5', label: 'Death of a child before 1 yr', type: 'health' },
  { id: 'h6', label: 'Death of a child before 5 yrs', type: 'health' },
  { id: 'h7', label: 'No current modern FP use', type: 'health' },
  { id: 'h8', label: 'Latest birth delivered at home', type: 'health' },
  { id: 'h9', label: 'Not fully immunized with DPT', type: 'health' },
  { id: 'h10', label: 'Not immunized with MMR', type: 'health' },
  { id: 'h11', label: 'Not immunized with polio', type: 'health' },
  { id: 'h12', label: 'Zero-dose child', type: 'health' },
  { id: 'h13', label: 'Overweight child', type: 'health' },
  { id: 'h14', label: 'Stunted child', type: 'health' },
  { id: 'h15', label: 'Underweight child', type: 'health' },
  { id: 'h16', label: 'Wasted child', type: 'health' },
  { id: 'h17', label: 'No. of children who have died', type: 'health' },
  { id: 'h18', label: 'No. of children who have died (3 category)', type: 'health' },
  { id: 'h19', label: 'Death of a child', type: 'health' },
  { id: 'h20', label: 'No PNC for mother', type: 'health' },
];

// Vulnerability factors data
const VULNERABILITY_DATA = [
  { id: 'v1', label: 'Any media exposure', type: 'vulnerability' },
  { id: 'v2', label: 'Female circumcision', type: 'vulnerability' },
  { id: 'v3', label: 'Bank account (woman)', type: 'vulnerability' },
  { id: 'v4', label: 'HH clean cooking fuel', type: 'vulnerability' },
  { id: 'v5', label: 'HH electricity', type: 'vulnerability' },
  { id: 'v6', label: 'HH motor transport', type: 'vulnerability' },
  { id: 'v7', label: 'HH member of savings club', type: 'vulnerability' },
  { id: 'v8', label: 'HW visit in last yr', type: 'vulnerability' },
  { id: 'v9', label: 'Media exposure: internet', type: 'vulnerability' },
  { id: 'v10', label: 'Access problem: travel alone', type: 'vulnerability' },
  { id: 'v11', label: 'Mobile phone used for finances', type: 'vulnerability' },
  { id: 'v12', label: 'Not living w/ partner', type: 'vulnerability' },
  { id: 'v13', label: 'Currently employed', type: 'vulnerability' },
  { id: 'v14', label: 'Age at first birth (3 category)', type: 'vulnerability' },
  { id: 'v15', label: 'Age at first sex (4 category)', type: 'vulnerability' },
  { id: 'v16', label: 'Decision maker: family planning', type: 'vulnerability' },
  { id: 'v17', label: 'Decision maker: HH purchases', type: 'vulnerability' },
  { id: 'v18', label: 'Decision maker: own income', type: 'vulnerability' },
  { id: 'v19', label: 'Educational attainment', type: 'vulnerability' },
  { id: 'v20', label: 'Preferred next birth interval', type: 'vulnerability' },
  { id: 'v21', label: 'Partner opposition to FP use', type: 'vulnerability' },
  { id: 'v22', label: 'Sex of the head of HH', type: 'vulnerability' },
  { id: 'v23', label: 'HH received money', type: 'vulnerability' },
  { id: 'v24', label: 'HH slum residence (UN definition)', type: 'vulnerability' },
  { id: 'v25', label: 'HH water source interrupted', type: 'vulnerability' },
  { id: 'v26', label: 'Joint decision making index', type: 'vulnerability' },
  { id: 'v27', label: 'HH in malaria zone', type: 'vulnerability' },
  { id: 'v28', label: 'Marital status', type: 'vulnerability' },
  { id: 'v29', label: 'No. <5 yrs in HH (4 category)', type: 'vulnerability' },
  { id: 'v30', label: 'Total lifetime sex partners', type: 'vulnerability' },
  { id: 'v31', label: 'Wife rank', type: 'vulnerability' },
  { id: 'v32', label: 'Employment continuity', type: 'vulnerability' },
  { id: 'v33', label: 'Education level (partner)', type: 'vulnerability' },
  { id: 'v34', label: 'Employment status', type: 'vulnerability' },
  { id: 'v35', label: 'IPV justification', type: 'vulnerability' },
  { id: 'v36', label: 'Religion', type: 'vulnerability' },
  { id: 'v37', label: 'Age at first cohabitation (3 category)', type: 'vulnerability' },
  { id: 'v38', label: 'Age at first birth', type: 'vulnerability' },
  { id: 'v39', label: 'Age at first cohabitation', type: 'vulnerability' },
  { id: 'v40', label: 'Age at first sex', type: 'vulnerability' },
  { id: 'v41', label: 'Child given beans/peas/lentils', type: 'vulnerability' },
  { id: 'v42', label: 'Child given fortified food', type: 'vulnerability' },
  { id: 'v43', label: 'Child given meat', type: 'vulnerability' },
  { id: 'v44', label: 'Child given solid/soft food', type: 'vulnerability' },
  { id: 'v45', label: 'Child given sweet snacks', type: 'vulnerability' },
  { id: 'v46', label: 'Decision maker: family visits', type: 'vulnerability' },
  { id: 'v47', label: 'Child treated for diarrhea', type: 'vulnerability' },
  { id: 'v48', label: 'HH member w/ disability', type: 'vulnerability' },
  { id: 'v49', label: 'Earnings relative to partner', type: 'vulnerability' },
  { id: 'v50', label: 'At least primary education', type: 'vulnerability' },
  { id: 'v51', label: 'Educational attainment (binary)', type: 'vulnerability' },
  { id: 'v52', label: 'Fertility preference', type: 'vulnerability' },
  { id: 'v53', label: 'Media exposure: news/journal', type: 'vulnerability' },
  { id: 'v54', label: 'Media exposure: radio', type: 'vulnerability' },
  { id: 'v55', label: 'Female circumcision: genital nicked', type: 'vulnerability' },
  { id: 'v56', label: 'Female circumcision: genital sewn', type: 'vulnerability' },
  { id: 'v57', label: 'Female circumcision: flesh removed', type: 'vulnerability' },
  { id: 'v58', label: 'HH received other state support', type: 'vulnerability' },
  { id: 'v59', label: 'HH car', type: 'vulnerability' },
  { id: 'v60', label: 'HH animal-drawn cart', type: 'vulnerability' },
  { id: 'v61', label: 'HH internet', type: 'vulnerability' },
  { id: 'v62', label: 'HH child to woman ratio', type: 'vulnerability' },
  { id: 'v63', label: 'HH motorcycle or scooter', type: 'vulnerability' },
  { id: 'v64', label: 'Age at first birth (5 category)', type: 'vulnerability' },
  { id: 'v65', label: 'At least primary education', type: 'vulnerability' },
  { id: 'v66', label: 'HH rudimentary or natural floor', type: 'vulnerability' },
  { id: 'v67', label: 'Any birth registered/declared', type: 'vulnerability' },
  { id: 'v68', label: 'HH water not treated', type: 'vulnerability' },
  { id: 'v69', label: 'HH radio', type: 'vulnerability' },
  { id: 'v70', label: 'Condom use during last sex', type: 'vulnerability' },
  { id: 'v71', label: 'Decision maker: woman\'s health', type: 'vulnerability' },
  { id: 'v72', label: 'HH refrigerator', type: 'vulnerability' },
  { id: 'v73', label: 'HH sanitation (3 category)', type: 'vulnerability' },
  { id: 'v74', label: 'Provider for woman\'s PNC', type: 'vulnerability' },
  { id: 'v75', label: 'HH member sends money', type: 'vulnerability' },
  { id: 'v76', label: 'HH shares toilet', type: 'vulnerability' },
  { id: 'v77', label: 'HH stove', type: 'vulnerability' },
  { id: 'v78', label: 'HH television', type: 'vulnerability' },
  { id: 'v79', label: 'HH VCR/DVD/CD player', type: 'vulnerability' },
  { id: 'v80', label: 'Polygamy status', type: 'vulnerability' },
  { id: 'v81', label: 'Where HH cooks food (6 category)', type: 'vulnerability' },
  { id: 'v82', label: 'Media exposure: TV', type: 'vulnerability' },
  { id: 'v83', label: 'Phone ownership (woman)', type: 'vulnerability' },
  { id: 'v84', label: 'HH highest education', type: 'vulnerability' },
  { id: 'v85', label: 'HH owns animals', type: 'vulnerability' },
  { id: 'v86', label: 'Bank account (household)', type: 'vulnerability' },
  { id: 'v87', label: 'HH bicycle', type: 'vulnerability' },
  { id: 'v88', label: 'Fecundity status', type: 'vulnerability' },
  { id: 'v89', label: 'Family security grants', type: 'vulnerability' },
  { id: 'v90', label: 'HH computer', type: 'vulnerability' },
  { id: 'v91', label: 'Home ownership', type: 'vulnerability' },
  { id: 'v92', label: 'Land ownership', type: 'vulnerability' },
  { id: 'v93', label: 'HH cooks food inside', type: 'vulnerability' },
  { id: 'v94', label: 'HH unimproved toilet', type: 'vulnerability' },
  { id: 'v95', label: 'Child <15yrs lives away', type: 'vulnerability' },
  { id: 'v96', label: 'Age at first birth (partner)', type: 'vulnerability' },
  { id: 'v97', label: 'HH house ownership', type: 'vulnerability' },
  { id: 'v98', label: 'Decides partner income (partner)', type: 'vulnerability' },
  { id: 'v99', label: 'Decides HH purchases (partner)', type: 'vulnerability' },
  { id: 'v100', label: 'Partner no. of wives/partners', type: 'vulnerability' },
  { id: 'v101', label: 'HH agricultural land ownership', type: 'vulnerability' },
  { id: 'v102', label: 'HH member w/o insurance', type: 'vulnerability' },
  { id: 'v103', label: 'Married or living w/ partner', type: 'vulnerability' },
  { id: 'v104', label: 'HH unimproved or shared facility', type: 'vulnerability' },
  { id: 'v105', label: 'HH member receives money', type: 'vulnerability' },
  { id: 'v106', label: 'HH member sends money (binary)', type: 'vulnerability' },
  { id: 'v107', label: 'Where HH cooks food (3 category)', type: 'vulnerability' },
  { id: 'v108', label: 'HH highest education: 7+', type: 'vulnerability' },
  { id: 'v109', label: 'Child <3yr given micronutrient', type: 'vulnerability' },
  { id: 'v110', label: 'HW talked about FP', type: 'vulnerability' },
  { id: 'v111', label: 'Religion: Islam', type: 'vulnerability' },
  { id: 'v112', label: 'Heard of FGM', type: 'vulnerability' },
  { id: 'v113', label: 'Partner FP information', type: 'vulnerability' },
  { id: 'v114', label: 'Access problem: treatment cost', type: 'vulnerability' },
  { id: 'v115', label: 'Access problem: distance to HF', type: 'vulnerability' },
  { id: 'v116', label: 'Access problem: permission', type: 'vulnerability' },
  { id: 'v117', label: 'No. over 15+ yrs', type: 'vulnerability' },
  { id: 'v118', label: 'No. of living children', type: 'vulnerability' },
  { id: 'v119', label: 'No. of living children (4 category)', type: 'vulnerability' },
  { id: 'v120', label: 'No. of pregnancies', type: 'vulnerability' },
  { id: 'v121', label: 'Child <2yr given solid/soft food', type: 'vulnerability' },
  { id: 'v122', label: 'No. <15 yrs', type: 'vulnerability' },
  { id: 'v123', label: 'No. <5 yrs', type: 'vulnerability' },
  { id: 'v124', label: 'Occupation', type: 'vulnerability' },
  { id: 'v125', label: 'Employment status (partner)', type: 'vulnerability' },
  { id: 'v126', label: 'HH has toilet facility', type: 'vulnerability' },
  { id: 'v127', label: 'No. over 15+ yrs (4 category)', type: 'vulnerability' },
  { id: 'v128', label: 'No. of pregnancies (2 category)', type: 'vulnerability' },
  { id: 'v129', label: 'No. <15 yrs (4 category)', type: 'vulnerability' },
  { id: 'v130', label: 'Employer type', type: 'vulnerability' },
  { id: 'v131', label: 'Occupation (7 category)', type: 'vulnerability' },
  { id: 'v132', label: 'Occupation (partner)', type: 'vulnerability' },
  { id: 'v133', label: 'Literacy program language', type: 'vulnerability' },
  { id: 'v134', label: 'Partner age (4 category)', type: 'vulnerability' },
  { id: 'v135', label: 'At least primary education (partner) (4 category)', type: 'vulnerability' },
  { id: 'v136', label: 'Partner\'s desire for children', type: 'vulnerability' },
  { id: 'v137', label: 'HH unimproved water source', type: 'vulnerability' },
  { id: 'v138', label: 'At least secondary education (partner)', type: 'vulnerability' },
  { id: 'v139', label: 'Occupation (partner) (7 category)', type: 'vulnerability' },
  { id: 'v140', label: 'Polygamous relationship', type: 'vulnerability' },
  { id: 'v141', label: 'More than one union', type: 'vulnerability' },
  { id: 'v142', label: 'Decision-making index', type: 'vulnerability' },
  { id: 'v143', label: 'Duration of current union', type: 'vulnerability' },
];

// Combined data
const ALL_DATA = [...HEALTH_DATA, ...VULNERABILITY_DATA];

export default function HealthDataModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'health', 'vulnerability'

  const toggleItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedItems([]);
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

  // Filter data based on active tab and search term
  const getFilteredData = () => {
    let dataToFilter;
    if (activeTab === 'health') {
      dataToFilter = HEALTH_DATA;
    } else if (activeTab === 'vulnerability') {
      dataToFilter = VULNERABILITY_DATA;
    } else {
      dataToFilter = ALL_DATA;
    }

    return dataToFilter.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            <div className="w-[860px] flex flex-col gap-[16px] px-[24px] pt-[24px] pb-[72px] overflow-hidden">

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
              <div className="flex-1 border border-[#97c3f0] rounded-[6px] flex flex-col overflow-hidden min-h-0">

                {/* Header with Filter */}
                <div className="bg-[#dde7ee] border-b border-[#97c3f0] h-[32px] px-[16px] flex items-center justify-between">
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#555e68]">
                    {activeTab === 'all' && `All data (${ALL_DATA.length})`}
                    {activeTab === 'health' && `Health outcomes and behaviours (${HEALTH_DATA.length})`}
                    {activeTab === 'vulnerability' && `Vulnerability factors (${VULNERABILITY_DATA.length})`}
                  </span>
                  <div className="flex items-center gap-[4px]">
                    <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#555e68]">
                      Filter:
                    </span>
                    <button className="px-[8px] py-[6px] h-[24px] flex items-center justify-center rounded-[6px] hover:bg-[#c7dff7]">
                      <span className="font-['Inter'] font-semibold text-[14px] leading-[14px] text-[#0b6bcb]">
                        All categories
                      </span>
                    </button>
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
                    Selected data
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
                <div className="bg-white border border-[#97c3f0] rounded-[4px] h-[548px] flex items-center justify-center">
                  {selectedData.length === 0 ? (
                    <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#555e68]">
                      No data selected
                    </span>
                  ) : (
                    <div className="w-full h-full p-[16px] overflow-y-auto">
                      {/* TODO: Add selected items display */}
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
