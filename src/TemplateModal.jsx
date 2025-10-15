import { useState } from 'react';
import familyPlanningIcon from './assets/family-planning 1.png';
import syringeIcon from './assets/syringe 1.png';
import rmnhIcon from './assets/rmnh 1.png';

// Radio button component
function RadioButton({ checked }) {
  if (checked) {
    return (
      <div className="relative shrink-0 size-[20px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9" stroke="#0b6bcb" strokeWidth="2" fill="none"/>
          <circle cx="10" cy="10" r="5" fill="#0b6bcb"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" stroke="#97c3f0" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  );
}

// Template option component
function TemplateOption({ icon, title, description, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-[4px] shrink-0 w-full cursor-pointer transition-all ${
        selected
          ? 'bg-[#f0f4f8] border-2 border-[#0b6bcb]'
          : 'bg-[#f0f4f8] border-2 border-[#97c3f0] hover:border-[#0b6bcb] hover:bg-[#dde7ee]'
      }`}
    >
      <div className="box-border content-stretch flex gap-[8px] items-start overflow-clip p-[16px] relative rounded-[inherit] w-full">
        <div className="relative shrink-0 size-[48px]">
          <img alt={title} className="block max-w-none size-full" src={icon} />
        </div>
        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px not-italic relative shrink-0">
          <p className="font-['Inter'] font-semibold leading-[1.55] relative shrink-0 text-[#171a1c] text-[20px] text-nowrap whitespace-pre">
            {title}
          </p>
          <p className="font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#555e68] text-[16px] w-[min-content]">
            {description}
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
          <RadioButton checked={selected} />
        </div>
      </div>
    </div>
  );
}

export default function TemplateModal({ isOpen, onClose, onLoadTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState('family-planning');

  const handleLoadTemplate = () => {
    onLoadTemplate(selectedTemplate);
  };

  if (!isOpen) return null;

  const templates = [
    {
      id: 'family-planning',
      icon: familyPlanningIcon,
      title: 'Family planning',
      description: 'Includes data on mCP use, religion, smartphone and internet access and 4 other data points.'
    },
    {
      id: 'immunisation',
      icon: syringeIcon,
      title: 'Immunisation',
      description: 'Includes data on zero-dose children, DPT, MMR, Polio, perceived barriers to accessing health care and 11 other data points.'
    },
    {
      id: 'maternal-health',
      icon: rmnhIcon,
      title: 'Maternal health',
      description: 'Includes data on ANC visits, household economics, and 8 other data points.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      <div className="bg-white border border-[#97c3f0] border-solid box-border content-stretch flex flex-col items-start relative rounded-[16px] w-[672px] max-h-[90vh]">
        {/* Main Content */}
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-full">
          {/* Title and Description */}
          <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.5] not-italic relative shrink-0 w-full">
            <p className="font-['Inter'] font-semibold relative shrink-0 text-[#171a1c] text-[24px] text-nowrap whitespace-pre">
              Select a template to start with
            </p>
            <p className="font-['Inter'] font-normal min-w-full relative shrink-0 text-[#555e68] text-[16px] w-[min-content]">
              Templates show data with direct relationships between segments and the risk factors for the health outcome or behaviour you've selected.
            </p>
          </div>

          {/* Template Options */}
          {templates.map((template) => (
            <TemplateOption
              key={template.id}
              icon={template.icon}
              title={template.title}
              description={template.description}
              selected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
            />
          ))}

          {/* Load Template Button */}
          <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full">
            <button
              onClick={handleLoadTemplate}
              className="bg-[#0b6bcb] box-border content-stretch flex gap-[8px] items-center justify-center min-h-[40px] px-[16px] py-[4px] relative rounded-[6px] shrink-0 hover:bg-[#0a5fb0] transition-colors cursor-pointer"
            >
              <p className="font-['Inter'] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
                Load template
              </p>
              <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="absolute bg-white border border-[#97c3f0] border-solid box-border content-stretch flex gap-[8px] items-center right-[-24px] rounded-[1000px] top-[-24px]">
          <button
            onClick={onClose}
            className="box-border content-stretch cursor-pointer flex items-center justify-center min-h-[48px] min-w-[48px] overflow-clip p-0 relative rounded-[1000px] shrink-0 hover:bg-[#f0f4f8] transition-colors"
          >
            <svg className="w-[20px] h-[20px]" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="#171a1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
