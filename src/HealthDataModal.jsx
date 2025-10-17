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

const SuggestedInfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M9.1665 5.83268H10.8332V7.49935H9.1665V5.83268ZM9.1665 9.16602H10.8332V14.166H9.1665V9.16602ZM9.99984 1.66602C5.39984 1.66602 1.6665 5.39935 1.6665 9.99935C1.6665 14.5993 5.39984 18.3327 9.99984 18.3327C14.5998 18.3327 18.3332 14.5993 18.3332 9.99935C18.3332 5.39935 14.5998 1.66602 9.99984 1.66602ZM9.99984 16.666C6.32484 16.666 3.33317 13.6743 3.33317 9.99935C3.33317 6.32435 6.32484 3.33268 9.99984 3.33268C13.6748 3.33268 16.6665 6.32435 16.6665 9.99935C16.6665 13.6743 13.6748 16.666 9.99984 16.666Z" fill="#2D7A00"/>
  </svg>
);

// MUI Chip component based on design system
const Chip = ({ label, icon, onMouseEnter, onMouseLeave, showTooltip, tooltipContent }) => (
  <div
    className="inline-flex items-center gap-[4px] px-[8px] py-[4px] rounded-[16px] bg-[#e8f5e1] relative"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {icon && <span className="flex items-center">{icon}</span>}
    <span className="font-['Inter'] font-medium text-[12px] leading-[1.66] text-[#2d7a00]">
      {label}
    </span>

    {/* Tooltip */}
    {showTooltip && tooltipContent && (
      <div className="absolute left-0 top-full mt-[4px] z-[10000] bg-[#636b74] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08),0px_2px_4px_0px_rgba(21,21,21,0.08)] px-[12px] py-[8px] w-[361px] pointer-events-none">
        {tooltipContent}
        {/* Arrow */}
        <div className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] rotate-180">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0L18 9L9 18L0 9L9 0Z" fill="#636b74"/>
          </svg>
        </div>
      </div>
    )}
  </div>
);

// Domain Title Bar component - scrolls normally
const DomainTitleBar = ({ label, domainId }) => {
  return (
    <div
      className="bg-[#dde7ee] px-[16px] py-[8px] font-['Inter'] font-semibold text-[12px] leading-[1.33] text-[#636b74] uppercase tracking-[0.5px]"
      data-domain-id={domainId}
    >
      {label}
    </div>
  );
};

// Health outcomes and behaviours data
const HEALTH_DATA = [
  { id: 'h1', label: 'Less than 4 ANC visits', type: 'health', category: 'maternal-health', definition: 'Indicates whether the participant received fewer than four antenatal care visits during pregnancy. This is below the WHO recommended minimum for adequate prenatal care.' },
  { id: 'h2', label: 'No PNC for newborn', type: 'health', category: 'child-health', definition: 'Identifies newborns who did not receive postnatal care check-ups after birth. Early postnatal visits are critical for detecting and treating complications.' },
  { id: 'h3', label: 'Never breastfed', type: 'health', category: 'child-health', definition: 'Indicates whether a child was never breastfed after birth. Breastfeeding provides essential nutrients and antibodies for infant development.' },
  { id: 'h4', label: 'Pregnancy ended in stillbirth', type: 'health', category: 'maternal-health', definition: 'Records pregnancies that resulted in stillbirth, defined as fetal death at 28 weeks or later. This indicator reflects maternal and prenatal care quality.' },
  { id: 'h5', label: 'Death of a child before 1 yr', type: 'health', category: 'child-health', definition: 'Tracks infant mortality, measuring deaths occurring in the first year of life. This is a key indicator of child health and healthcare access.' },
  { id: 'h6', label: 'Death of a child before 5 yrs', type: 'health', category: 'child-health', definition: 'Measures under-five mortality rate, tracking child deaths before the age of five. This reflects overall child health and development conditions.' },
  { id: 'h7', label: 'No current modern FP use', type: 'health', category: 'family-planning', definition: 'Indicates women not currently using modern contraceptive methods. This includes pills, IUDs, injectables, implants, and barrier methods.' },
  { id: 'h8', label: 'Latest birth delivered at home', type: 'health', category: 'maternal-health', definition: 'Identifies births that occurred at home rather than in a healthcare facility. Facility births provide access to skilled attendants and emergency care.' },
  { id: 'h9', label: 'Not fully immunized with DPT', type: 'health', category: 'immunisation', definition: 'Indicates children who did not receive the full course of diphtheria, pertussis, and tetanus vaccinations. Full immunization requires three doses.' },
  { id: 'h10', label: 'Not immunized with MMR', type: 'health', category: 'immunisation', definition: 'Identifies children who did not receive measles, mumps, and rubella vaccination. This vaccine protects against three serious infectious diseases.' },
  { id: 'h11', label: 'Not immunized with polio', type: 'health', category: 'immunisation', definition: 'Tracks children who did not receive polio vaccination. Polio immunization is critical for preventing this potentially paralyzing disease.' },
  { id: 'h12', label: 'Zero-dose child', type: 'health', category: 'immunisation', definition: 'Identifies children who have not received any routine vaccinations. These children are at highest risk and indicate gaps in healthcare access.' },
  { id: 'h13', label: 'Overweight child', type: 'health', category: 'nutrition', definition: 'Measures children with weight-for-height above two standard deviations from the median. This indicates excessive weight gain and nutritional imbalance.' },
  { id: 'h14', label: 'Stunted child', type: 'health', category: 'nutrition', definition: 'Identifies children with low height-for-age, indicating chronic malnutrition. Stunting reflects long-term insufficient nutrition and repeated infections.' },
  { id: 'h15', label: 'Underweight child', type: 'health', category: 'nutrition', definition: 'Measures children with low weight-for-age compared to reference standards. This indicates acute or chronic malnutrition affecting growth.' },
  { id: 'h16', label: 'Wasted child', type: 'health', category: 'nutrition', definition: 'Identifies children with low weight-for-height, indicating acute malnutrition. Wasting reflects recent rapid weight loss or failure to gain weight.' },
  { id: 'h17', label: 'No. of children who have died', type: 'health', category: 'child-health', definition: 'Counts the total number of children who have died in the household. This measure reflects child mortality experience at the household level.' },
  { id: 'h18', label: 'No. of children who have died (3 category)', type: 'health', category: 'child-health', definition: 'Categorizes households by number of child deaths into three groups: none, one, or two or more. This provides a grouped measure of child mortality.' },
  { id: 'h19', label: 'Death of a child', type: 'health', category: 'child-health', definition: 'Binary indicator of whether any child death has occurred in the household. This identifies families who have experienced child mortality.' },
  { id: 'h20', label: 'No PNC for mother', type: 'health', category: 'maternal-health', definition: 'Indicates mothers who did not receive postnatal care after delivery. Maternal PNC is essential for detecting and treating postpartum complications.' },
];

// Vulnerability factors data
const VULNERABILITY_DATA = [
  { id: 'v1', label: 'Any media exposure', type: 'vulnerability', category: 'suggested', domain: 'human-natural-systems', definition: 'Indicates whether the participant has regular access to any form of media including radio, television, newspapers, or internet. Media exposure influences health knowledge and behavior.' },
  { id: 'v3', label: 'Bank account (woman)', type: 'vulnerability', category: 'household-economics', domain: 'household-economics', definition: 'Indicates whether the woman has her own bank account. Financial inclusion empowers women and provides economic independence.' },
  { id: 'v4', label: 'HH clean cooking fuel', type: 'vulnerability', category: 'household-economics', domain: 'household-economics', definition: 'Identifies households using clean cooking fuels like electricity or gas rather than biomass. Clean fuel reduces indoor air pollution and respiratory health risks.' },
  { id: 'v5', label: 'HH electricity', type: 'vulnerability', category: 'household-economics', domain: 'household-economics', definition: 'Indicates whether the household has access to electricity. Electricity access enables better lighting, refrigeration, and information access.' },
  { id: 'v6', label: 'HH motor transport', type: 'vulnerability', category: 'household-economics', domain: 'household-economics', definition: 'Records ownership of motorized transportation including cars, motorcycles, or scooters. Vehicle ownership indicates economic status and mobility.' },
  { id: 'v7', label: 'HH member of savings club', type: 'vulnerability', category: 'social-support', domain: 'social-support', definition: 'Indicates participation in savings groups or microfinance organizations. These groups provide financial support and social networks.' },
  { id: 'v8', label: 'HW visit in last yr', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models', definition: 'Records whether a health worker visited the household in the past year. Home visits by health workers improve health education and care access.' },
  { id: 'v9', label: 'Media exposure: internet', type: 'vulnerability', category: 'suggested', domain: 'human-natural-systems', definition: 'Categorizes frequency of internet use by the participant on a weekly basis: everyday, at least once a week, less than once a week, or never. Internet access provides health information and social connections.' },
  { id: 'v10', label: 'Access problem: travel alone', type: 'vulnerability', category: 'woman-past', domain: 'woman-past', definition: 'Identifies women who face barriers traveling to healthcare facilities without accompaniment. This reflects mobility restrictions and autonomy limitations.' },
  { id: 'v11', label: 'Mobile phone used for finances', type: 'vulnerability', category: 'household-economics', domain: 'household-economics', definition: 'Indicates whether a mobile phone is used for financial transactions like mobile money or banking. Mobile financial services increase economic access and independence.' },
  { id: 'v12', label: 'Not living w/ partner', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship', definition: 'Identifies women not currently living with a spouse or partner. Living arrangements affect household decision-making and resource access.' },
  { id: 'v13', label: 'Currently employed', type: 'vulnerability', category: 'woman-past', domain: 'woman-past', definition: 'Indicates whether the woman is currently engaged in paid employment. Employment provides economic independence and decision-making power.' },
  { id: 'v14', label: 'Age at first birth (3 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past', definition: 'Categorizes age at first childbirth into three groups: under 18, 18-24, or 25+. Early childbirth is associated with health and socioeconomic risks.' },
  { id: 'v15', label: 'Age at first sex (4 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past', definition: 'Categorizes age at sexual debut into four groups. Early sexual initiation is linked to reproductive health outcomes and education completion.' },
  { id: 'v16', label: 'Decision maker: family planning', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship', definition: 'Identifies who makes decisions about contraceptive use: woman alone, jointly with partner, partner alone, or others. Decision-making power affects reproductive autonomy.' },
  { id: 'v17', label: 'Decision maker: HH purchases', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship', definition: 'Identifies who makes decisions about major household purchases. Control over household spending reflects economic power within relationships.' },
  { id: 'v18', label: 'Decision maker: own income', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship', definition: 'Identifies who decides how the woman\'s earnings are spent. Control over personal income indicates economic autonomy and empowerment.' },
  { id: 'v19', label: 'Educational attainment', type: 'vulnerability', category: 'suggested', domain: 'woman-past', definition: 'Measures the highest level of education completed: none, primary, secondary, or higher. Education strongly influences health knowledge and economic opportunities.' },
  { id: 'v20', label: 'Preferred next birth interval', type: 'vulnerability', category: 'woman-past', domain: 'woman-past', definition: 'Records the woman\'s desired waiting time before next pregnancy. Birth spacing preferences affect maternal and child health outcomes.' },
  { id: 'v21', label: 'Partner opposition to FP use', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v22', label: 'Sex of the head of HH', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v23', label: 'HH received money', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v24', label: 'HH slum residence (UN definition)', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v25', label: 'HH water source interrupted', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v26', label: 'Joint decision making index', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v27', label: 'HH in malaria zone', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v28', label: 'Marital status', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship', definition: 'Categorizes if the participant is married, widowed, in a relationship, divorced/separated or never married. Marital status affects household resources and decision-making patterns.' },
  { id: 'v29', label: 'No. <5 yrs in HH (4 category)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v30', label: 'Total lifetime sex partners', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v31', label: 'Wife rank', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v32', label: 'Employment continuity', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v33', label: 'Education level (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v34', label: 'Employment status', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v35', label: 'IPV justification', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v36', label: 'Religion', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems', definition: 'Identifies the religion that the participant belongs to. Religious affiliation influences health beliefs, practices, and care-seeking behaviors.' },
  { id: 'v37', label: 'Age at first cohabitation (3 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v38', label: 'Age at first birth', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v39', label: 'Age at first cohabitation', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v40', label: 'Age at first sex', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v41', label: 'Child given beans/peas/lentils', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v42', label: 'Child given fortified food', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v43', label: 'Child given meat', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v44', label: 'Child given solid/soft food', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v45', label: 'Child given sweet snacks', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v46', label: 'Decision maker: family visits', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v47', label: 'Child treated for diarrhea', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v48', label: 'HH member w/ disability', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v49', label: 'Earnings relative to partner', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v50', label: 'At least primary education', type: 'vulnerability', category: 'suggested', domain: 'woman-past', definition: 'Binary indicator of whether the woman completed primary education or higher. Primary education is a critical threshold for health literacy and economic opportunities.' },
  { id: 'v51', label: 'Educational attainment (binary)', type: 'vulnerability', category: 'suggested', domain: 'woman-past', definition: 'Simplified education measure categorizing participants as having formal education or no formal education. This captures the fundamental education divide.' },
  { id: 'v52', label: 'Fertility preference', type: 'vulnerability', category: 'woman-past', domain: 'woman-past', definition: 'Records whether the woman wants more children, wants no more, or is undecided. Fertility preferences guide family planning needs and service targeting.' },
  { id: 'v53', label: 'Media exposure: news/journal', type: 'vulnerability', category: 'suggested', domain: 'human-natural-systems', definition: 'Categorizes frequency of reading newspapers or journals on a weekly basis: everyday, at least once a week, less than once a week, or never. Print media access indicates literacy and information access.' },
  { id: 'v54', label: 'Media exposure: radio', type: 'vulnerability', category: 'suggested', domain: 'human-natural-systems', definition: 'Categorizes the frequency of the participant listening to the radio on a weekly basis: everyday, at least once a week, less than once a week, or never. Radio is a primary health information source in many communities.' },
  { id: 'v58', label: 'HH received other state support', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v59', label: 'HH car', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v60', label: 'HH animal-drawn cart', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v61', label: 'HH internet', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v62', label: 'HH child to woman ratio', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v63', label: 'HH motorcycle or scooter', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v64', label: 'Age at first birth (5 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v65', label: 'At least primary education', type: 'vulnerability', category: 'suggested', domain: 'woman-past' },
  { id: 'v66', label: 'HH rudimentary or natural floor', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v67', label: 'Any birth registered/declared', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v68', label: 'HH water not treated', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v69', label: 'HH radio', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v70', label: 'Condom use during last sex', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v71', label: 'Decision maker: woman\'s health', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v72', label: 'HH refrigerator', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v73', label: 'HH sanitation (3 category)', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v74', label: 'Provider for woman\'s PNC', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v75', label: 'HH member sends money', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v76', label: 'HH shares toilet', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v77', label: 'HH stove', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v78', label: 'HH television', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v79', label: 'HH VCR/DVD/CD player', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v80', label: 'Polygamy status', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v81', label: 'Where HH cooks food (6 category)', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v82', label: 'Media exposure: TV', type: 'vulnerability', category: 'suggested', domain: 'human-natural-systems', definition: 'Categorizes the frequency of watching television on a weekly basis: everyday, at least once a week, less than once a week, or never. Television provides visual health education and behavior change messaging.' },
  { id: 'v83', label: 'Phone ownership (woman)', type: 'vulnerability', category: 'household-economics', domain: 'household-economics', definition: 'Indicates whether the woman owns her own mobile phone. Phone ownership enables communication, information access, and economic independence.' },
  { id: 'v84', label: 'HH highest education', type: 'vulnerability', category: 'suggested', domain: 'household-relationship', definition: 'Records the highest level of education achieved by any household member. Household education level influences health knowledge and resource management.' },
  { id: 'v85', label: 'HH owns animals', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v86', label: 'Bank account (household)', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v87', label: 'HH bicycle', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v88', label: 'Fecundity status', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v89', label: 'Family security grants', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v90', label: 'HH computer', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v91', label: 'Home ownership', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v92', label: 'Land ownership', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v93', label: 'HH cooks food inside', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v94', label: 'HH unimproved toilet', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v95', label: 'Child <15yrs lives away', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v96', label: 'Age at first birth (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v97', label: 'HH house ownership', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v98', label: 'Decides partner income (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v99', label: 'Decides HH purchases (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v100', label: 'Partner no. of wives/partners', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v101', label: 'HH agricultural land ownership', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v102', label: 'HH member w/o insurance', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v103', label: 'Married or living w/ partner', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v104', label: 'HH unimproved or shared facility', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v105', label: 'HH member receives money', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v106', label: 'HH member sends money (binary)', type: 'vulnerability', category: 'social-support', domain: 'social-support' },
  { id: 'v107', label: 'Where HH cooks food (3 category)', type: 'vulnerability', category: 'household-economics', domain: 'household-economics' },
  { id: 'v108', label: 'HH highest education: 7+', type: 'vulnerability', category: 'suggested', domain: 'household-relationship', definition: 'Indicates whether the highest education in the household is 7 or more years of schooling. This threshold represents completion of primary education and affects household health practices.' },
  { id: 'v109', label: 'Child <3yr given micronutrient', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v110', label: 'HW talked about FP', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v111', label: 'Religion: Islam', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v112', label: 'Heard of FGM', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v113', label: 'Partner FP information', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v114', label: 'Access problem: treatment cost', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v115', label: 'Access problem: distance to HF', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v116', label: 'Access problem: permission', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v117', label: 'No. over 15+ yrs', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v118', label: 'No. of living children', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v119', label: 'No. of living children (4 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v120', label: 'No. of pregnancies', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v121', label: 'Child <2yr given solid/soft food', type: 'vulnerability', category: 'health-mental-models', domain: 'health-mental-models' },
  { id: 'v122', label: 'No. <15 yrs', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v123', label: 'No. <5 yrs', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v124', label: 'Occupation', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v125', label: 'Employment status (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v126', label: 'HH has toilet facility', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v127', label: 'No. over 15+ yrs (4 category)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v128', label: 'No. of pregnancies (2 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v129', label: 'No. <15 yrs (4 category)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v130', label: 'Employer type', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v131', label: 'Occupation (7 category)', type: 'vulnerability', category: 'woman-past', domain: 'woman-past' },
  { id: 'v132', label: 'Occupation (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v133', label: 'Literacy program language', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v134', label: 'Partner age (4 category)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v135', label: 'At least primary education (partner) (4 category)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v136', label: 'Partner\'s desire for children', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v137', label: 'HH unimproved water source', type: 'vulnerability', category: 'human-natural-systems', domain: 'human-natural-systems' },
  { id: 'v138', label: 'At least secondary education (partner)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v139', label: 'Occupation (partner) (7 category)', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v140', label: 'Polygamous relationship', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v141', label: 'More than one union', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v142', label: 'Decision-making index', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
  { id: 'v143', label: 'Duration of current union', type: 'vulnerability', category: 'household-relationship', domain: 'household-relationship' },
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
  { id: 'health-mental-models', label: 'Health mental models' },
  { id: 'household-relationship', label: 'Household relationships' },
  { id: 'household-economics', label: 'Household economics and living conditions' },
  { id: 'social-support', label: 'Social support' },
  { id: 'human-natural-systems', label: 'Human and natural systems' },
];

// Domain structure for vulnerability factors (in display order)
const VULNERABILITY_DOMAINS = [
  { id: 'woman-past', label: 'Woman and her past experiences' },
  { id: 'health-mental-models', label: 'Health mental models' },
  { id: 'household-relationship', label: 'Household relationships' },
  { id: 'household-economics', label: 'Household economics and living conditions' },
  { id: 'social-support', label: 'Social support' },
  { id: 'human-natural-systems', label: 'Human and natural systems' },
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
  const [hoveredSuggested, setHoveredSuggested] = useState(null);
  const [hoveredInfoIcon, setHoveredInfoIcon] = useState(null);
  const [currentStickyDomain, setCurrentStickyDomain] = useState(null);
  const filterButtonRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

  // Initialize currentStickyDomain to the first domain that has data
  useEffect(() => {
    if ((activeTab === 'all' || activeTab === 'vulnerability') && filteredVulnerabilityData.length > 0 && !currentStickyDomain) {
      const firstDomainWithData = VULNERABILITY_DOMAINS.find(domain =>
        filteredVulnerabilityData.some(item => item.domain === domain.id)
      );
      if (firstDomainWithData) {
        setCurrentStickyDomain(firstDomainWithData.id);
      }
    }
  }, [activeTab, filteredVulnerabilityData.length, currentStickyDomain]);

  // Scroll listener to detect which domain is currently visible
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || (activeTab !== 'all' && activeTab !== 'vulnerability')) return;

    const handleScroll = () => {
      // Find all domain bars
      const domainBars = scrollContainer.querySelectorAll('[data-domain-id]');
      const scrollTop = scrollContainer.scrollTop;
      const containerTop = scrollContainer.getBoundingClientRect().top;

      // For 'all' tab: sticky header is 32px from top of container (inside scroll area)
      // For 'vulnerability' tab: title is outside scroll area, so check against top of container
      const stickyHeaderPosition = activeTab === 'all' ? containerTop + 32 : containerTop;

      // Find which domain bar is closest to the sticky header position
      let closestDomain = null;
      let closestDistance = Infinity;

      domainBars.forEach((bar) => {
        const rect = bar.getBoundingClientRect();
        const distance = Math.abs(rect.top - stickyHeaderPosition);

        // Only consider bars that are at or above the sticky position
        if (rect.top <= stickyHeaderPosition && distance < closestDistance) {
          closestDistance = distance;
          closestDomain = bar.getAttribute('data-domain-id');
        }
      });

      if (closestDomain && closestDomain !== currentStickyDomain) {
        setCurrentStickyDomain(closestDomain);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    // Also run on mount
    handleScroll();

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [activeTab, currentStickyDomain, scrollContainerRef]);

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
                    {activeTab === 'vulnerability' && (
                      <>
                        Vulnerability factors ({VULNERABILITY_DATA.length})
                        {currentStickyDomain && (() => {
                          const domain = VULNERABILITY_DOMAINS.find(d => d.id === currentStickyDomain);
                          const domainCount = filteredData.filter(item => item.type === 'vulnerability' && item.domain === currentStickyDomain).length;
                          return (
                            <>
                              <span className="mx-[8px]">·</span>
                              <span className="font-normal">{domain?.label} ({domainCount})</span>
                            </>
                          );
                        })()}
                      </>
                    )}
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
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto flex">
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
                                <div
                                  className="w-[20px] h-[20px] flex-shrink-0 relative"
                                  onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    setHoveredInfoIcon(item.id);
                                  }}
                                  onMouseLeave={(e) => {
                                    e.stopPropagation();
                                    setHoveredInfoIcon(null);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <InfoIcon />
                                  {hoveredInfoIcon === item.id && item.definition && (
                                    <div className="absolute right-0 top-full mt-[4px] z-[10000] bg-[#636b74] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08),0px_2px_4px_0px_rgba(21,21,21,0.08)] px-[12px] py-[8px] w-[320px] pointer-events-none">
                                      <p className="font-['Inter'] text-[14px] leading-[1.42] text-[#cdd7e1]">
                                        {item.definition}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Vulnerability factors section grouped by domain */}
                        {filteredVulnerabilityData.length > 0 && (
                          <div>
                            <div className="bg-[#f0f4f8] border-b border-[#97c3f0] h-[32px] px-[16px] flex items-center sticky top-0 z-[110]">
                              <span className="font-['Inter'] font-semibold text-[14px] leading-[1.42] text-[#555e68]">
                                Vulnerability factors ({filteredVulnerabilityData.length})
                                {currentStickyDomain && (() => {
                                  const domain = VULNERABILITY_DOMAINS.find(d => d.id === currentStickyDomain);
                                  const domainCount = filteredVulnerabilityData.filter(item => item.domain === currentStickyDomain).length;
                                  return (
                                    <>
                                      <span className="mx-[8px]">·</span>
                                      <span className="font-normal">{domain?.label} ({domainCount})</span>
                                    </>
                                  );
                                })()}
                              </span>
                            </div>
                            {VULNERABILITY_DOMAINS.map((domain) => {
                              const domainFactors = filteredVulnerabilityData.filter(item => item.domain === domain.id);
                              if (domainFactors.length === 0) return null;

                              return (
                                <div key={domain.id}>
                                  <DomainTitleBar
                                    label={domain.label}
                                    domainId={domain.id}
                                  />
                                  {domainFactors.map((item, index) => (
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
                                  <div className="flex items-center gap-[8px]">
                                    <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#171a1c]">
                                      {highlightSearchTerm(item.label)}
                                    </span>
                                    {item.category === 'suggested' && (
                                      <Chip
                                        label="Suggested"
                                        icon={<SuggestedInfoIcon />}
                                        onMouseEnter={() => setHoveredSuggested(item.id)}
                                        onMouseLeave={() => setHoveredSuggested(null)}
                                        showTooltip={hoveredSuggested === item.id}
                                        tooltipContent={
                                          <div className="flex gap-[8px] items-baseline">
                                            <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#cdd7e1] whitespace-nowrap">
                                              Based on:
                                            </span>
                                            <div className="flex flex-wrap gap-[4px] items-center text-[14px] leading-[1.42]">
                                              <span className="font-['Inter'] font-semibold text-white">
                                                Very strong (0.9)
                                              </span>
                                              <span className="font-['Inter'] text-[#cdd7e1]">
                                                statistical correlation with:
                                              </span>
                                              <span className="font-['Inter'] font-semibold text-white">
                                                Less than 4 ANC visits
                                              </span>
                                            </div>
                                          </div>
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="w-[20px] h-[20px] flex-shrink-0 relative"
                                  onMouseEnter={(e) => {
                                    e.stopPropagation();
                                    setHoveredInfoIcon(item.id);
                                  }}
                                  onMouseLeave={(e) => {
                                    e.stopPropagation();
                                    setHoveredInfoIcon(null);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <InfoIcon />
                                  {hoveredInfoIcon === item.id && item.definition && (
                                    <div className="absolute right-0 top-full mt-[4px] z-[10000] bg-[#636b74] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08),0px_2px_4px_0px_rgba(21,21,21,0.08)] px-[12px] py-[8px] w-[320px] pointer-events-none">
                                      <p className="font-['Inter'] text-[14px] leading-[1.42] text-[#cdd7e1]">
                                        {item.definition}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </button>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Show only filtered data for specific tabs */}
                    {activeTab !== 'all' && activeTab === 'vulnerability' && (
                      <div>
                        {VULNERABILITY_DOMAINS.map((domain) => {
                          const domainFactors = filteredData.filter(item => item.type === 'vulnerability' && item.domain === domain.id);
                          if (domainFactors.length === 0) return null;

                          return (
                            <div key={domain.id}>
                              <DomainTitleBar
                                label={domain.label}
                                domainId={domain.id}
                              />
                              {domainFactors.map((item, index) => (
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
                                    <div className="flex items-center gap-[8px]">
                                      <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#171a1c]">
                                        {highlightSearchTerm(item.label)}
                                      </span>
                                      {item.category === 'suggested' && (
                                        <Chip
                                          label="Suggested"
                                          icon={<SuggestedInfoIcon />}
                                          onMouseEnter={() => setHoveredSuggested(item.id)}
                                          onMouseLeave={() => setHoveredSuggested(null)}
                                          showTooltip={hoveredSuggested === item.id}
                                          tooltipContent={
                                            <div className="flex gap-[8px] items-baseline">
                                              <span className="font-['Inter'] text-[14px] leading-[1.42] text-[#cdd7e1] whitespace-nowrap">
                                                Based on:
                                              </span>
                                              <div className="flex flex-wrap gap-[4px] items-center text-[14px] leading-[1.42]">
                                                <span className="font-['Inter'] font-semibold text-white">
                                                  Very strong (0.9)
                                                </span>
                                                <span className="font-['Inter'] text-[#cdd7e1]">
                                                  statistical correlation with:
                                                </span>
                                                <span className="font-['Inter'] font-semibold text-white">
                                                  Less than 4 ANC visits
                                                </span>
                                              </div>
                                            </div>
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className="w-[20px] h-[20px] flex-shrink-0 relative"
                                    onMouseEnter={(e) => {
                                      e.stopPropagation();
                                      setHoveredInfoIcon(item.id);
                                    }}
                                    onMouseLeave={(e) => {
                                      e.stopPropagation();
                                      setHoveredInfoIcon(null);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <InfoIcon />
                                    {hoveredInfoIcon === item.id && item.definition && (
                                      <div className="absolute right-0 top-full mt-[4px] z-[10000] bg-[#636b74] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08),0px_2px_4px_0px_rgba(21,21,21,0.08)] px-[12px] py-[8px] w-[320px] pointer-events-none">
                                        <p className="font-['Inter'] text-[14px] leading-[1.42] text-[#cdd7e1]">
                                          {item.definition}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Health tab - no domains needed */}
                    {activeTab !== 'all' && activeTab === 'health' && (
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
                            <div
                              className="w-[20px] h-[20px] flex-shrink-0 relative"
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                setHoveredInfoIcon(item.id);
                              }}
                              onMouseLeave={(e) => {
                                e.stopPropagation();
                                setHoveredInfoIcon(null);
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <InfoIcon />
                              {hoveredInfoIcon === item.id && item.definition && (
                                <div className="absolute right-0 top-full mt-[4px] z-[10000] bg-[#636b74] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08),0px_2px_4px_0px_rgba(21,21,21,0.08)] px-[12px] py-[8px] w-[320px] pointer-events-none">
                                  <p className="font-['Inter'] text-[14px] leading-[1.42] text-[#cdd7e1]">
                                    {item.definition}
                                  </p>
                                </div>
                              )}
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
