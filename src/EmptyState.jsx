import Logo from './Logo';
import templateImage from './assets/Template.png';
import scratchImage from './assets/Scratch.png';

export default function EmptyState({ onOpenModal, onOpenTemplateModal }) {

  return (
    <div className="bg-[#fdf8f5] content-stretch flex flex-col isolate items-start relative size-full" data-name="Empty" data-node-id="10714:36892">
      {/* Top Navigation */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="Top nav" data-node-id="10714:36893">
        {/* Primary Navigation */}
        <div className="bg-white border-[#97c3f0] border-[0px_0px_1px] border-solid h-[56px] relative shrink-0 w-full">
          <div className="box-border content-stretch flex items-center justify-between pl-[38px] pr-[27px] py-[8px] relative size-full">
            {/* Logo */}
            <Logo />

            {/* Nav Items */}
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
              <div className="box-border content-stretch flex gap-[6px] items-center justify-center min-h-[40px] p-[12px] relative rounded-[6px] shrink-0">
                <p className="font-['Inter'] font-semibold leading-[16px] not-italic text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">
                  Welcome
                </p>
              </div>
              <div className="box-border content-stretch flex gap-[6px] items-center justify-center min-h-[40px] p-[12px] relative rounded-[6px] shrink-0">
                <p className="font-['Inter'] font-semibold leading-[16px] not-italic text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">
                  Segmentations
                </p>
              </div>
              <div className="box-border content-stretch flex gap-[6px] items-center justify-center min-h-[40px] p-[12px] relative rounded-[6px] shrink-0">
                <p className="font-['Inter'] font-semibold leading-[16px] not-italic text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">
                  News
                </p>
              </div>
              <div className="box-border content-stretch flex gap-[6px] items-center justify-center min-h-[40px] p-[12px] relative rounded-[6px] shrink-0">
                <p className="font-['Inter'] font-semibold leading-[16px] not-italic text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">
                  Contact
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white box-border content-stretch flex items-center justify-between overflow-clip px-[26px] py-[4px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08)] shrink-0 sticky top-0 w-full">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
            <div className="box-border content-stretch flex gap-[6px] items-center justify-center min-h-[32px] px-[12px] py-[2px] relative rounded-[6px] shrink-0">
              <div className="border border-[#185ea5] border-solid relative rounded-full shrink-0 size-[20px]">
                {/* Flag icon */}
              </div>
              <p className="font-['Inter'] font-semibold leading-[14px] not-italic text-[#0b6bcb] text-[14px] text-nowrap whitespace-pre">
                Bihar, India
              </p>
            </div>
            <div className="content-stretch flex gap-[16px] items-center">
              <p className="font-['Inter'] font-semibold leading-[1.66] text-[#636b74] text-[18px]">/</p>
              <p className="font-['Inter'] font-normal leading-[1.42] text-[#555e68] text-[14px]">Comparison tool</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
            <p className="font-['Inter'] font-normal leading-[1.42] text-[#555e68] text-[14px] text-nowrap whitespace-pre">Version:</p>
            <div className="box-border content-stretch flex gap-[6px] h-[24px] items-center justify-center min-h-[24px] px-[2px] py-[4px] relative rounded-[6px] shrink-0">
              <p className="font-['Inter'] font-semibold leading-[14px] text-[#0b6bcb] text-[14px] text-nowrap whitespace-pre">
                Pathways 1.0, 2022
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[40px] py-[16px] shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08)] shrink-0 sticky top-0 w-full z-[2]">
        {/* Secondary Navigation */}
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="box-border content-stretch flex gap-[6px] items-center justify-center p-[12px] relative rounded-[6px] shrink-0">
            <p className="font-['Inter'] font-semibold leading-[16px] text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">Overview</p>
          </div>
          <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center justify-center p-[12px] relative rounded-[6px] shrink-0">
            <p className="font-['Inter'] font-semibold leading-[16px] text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">Segments</p>
            {/* Dropdown icon */}
          </div>
          <div className="bg-[#e3effb] box-border content-stretch flex gap-[6px] h-[40px] items-center justify-center min-h-[32px] p-[12px] relative rounded-[6px] shrink-0">
            <p className="font-['Inter'] font-semibold leading-[16px] text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">Comparison tool</p>
          </div>
          <div className="box-border content-stretch flex gap-[6px] h-[40px] items-center justify-center p-[12px] relative rounded-[6px] shrink-0">
            <p className="font-['Inter'] font-semibold leading-[16px] text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">Prevalence map</p>
          </div>
          <div className="box-border content-stretch flex gap-[6px] items-center justify-center p-[12px] relative rounded-[6px] shrink-0">
            <p className="font-['Inter'] font-semibold leading-[16px] text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">Typing tools</p>
          </div>
          <div className="box-border content-stretch flex gap-[6px] items-center justify-center p-[12px] relative rounded-[6px] shrink-0">
            <p className="font-['Inter'] font-semibold leading-[16px] text-[#0b6bcb] text-[16px] text-nowrap whitespace-pre">Additional resources</p>
          </div>
        </div>

        {/* Page Title */}
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
          <p className="font-['Inter'] font-semibold leading-[1.5] text-[#171a1c] text-[24px] text-nowrap whitespace-pre">Comparison tool</p>
          <div className="overflow-clip relative shrink-0 size-[24px]">
            {/* Question icon */}
          </div>
        </div>
      </div>

      {/* Main Content - Empty State */}
      <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip pb-[40px] pt-0 px-[40px] relative shrink-0 w-full z-[1]">
        <div className="basis-0 bg-white border border-[#97c3f0] border-solid box-border content-stretch flex flex-col gap-[16px] grow items-center justify-center min-h-px min-w-px p-[40px] relative rounded-[6px] shrink-0 w-full">

          {/* Two Card Layout */}
          <div className="flex gap-[24px] items-start">
            {/* Left Card - Start with a template */}
            <div
              onClick={onOpenTemplateModal}
              className="bg-[#f0f4f8] border border-[#97c3f0] rounded-[8px] p-[40px] w-[340px] h-[315px] flex flex-col gap-[24px] cursor-pointer hover:border-[#0b6bcb] transition-colors"
            >
              <img src={templateImage} alt="Template illustration" className="h-[116px] w-auto object-contain" />
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Inter'] font-semibold text-[20px] leading-[1.5] text-[#171a1c]">
                  Start with a template
                </p>
                <p className="font-['Inter'] font-normal text-[18px] leading-[1.55] text-[#555e68]">
                  Curated views of data points across a wide range of topics
                </p>
              </div>
            </div>

            {/* Right Card - Build from scratch */}
            <div
              onClick={onOpenModal}
              className="bg-[#f0f4f8] border border-[#97c3f0] rounded-[8px] p-[40px] w-[340px] h-[315px] flex flex-col gap-[24px] cursor-pointer hover:border-[#0b6bcb] transition-colors"
            >
              <img src={scratchImage} alt="Build from scratch illustration" className="h-[96px] w-auto object-contain" />
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Inter'] font-semibold text-[20px] leading-[1.5] text-[#171a1c]">
                  Build from scratch
                </p>
                <p className="font-['Inter'] font-normal text-[18px] leading-[1.55] text-[#555e68]">
                  Select data points to compare yourself
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
