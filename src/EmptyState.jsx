import Logo from './Logo';

const imgBackground = "http://localhost:3845/assets/dad49abaf748c2f75ced1fce762c9657e2207e8d.svg";
const imgRectangle = "http://localhost:3845/assets/fb2c471b593c1ec871510dc8ba7797ce750439ff.svg";
const imgLines = "http://localhost:3845/assets/30ea34eed075295b4fab5ac36e248b3f222e1390.svg";

export default function EmptyState({ onOpenModal }) {

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
        <div className="basis-0 bg-white border border-[#97c3f0] border-solid box-border content-stretch flex flex-col gap-[16px] grow items-center justify-center min-h-px min-w-px p-[8px] relative rounded-[6px] shrink-0 w-full">
          {/* Illustration */}
          <div className="h-[116px] relative shrink-0 w-[216px]" data-name="Health outcome or behaviour" data-node-id="10375:30088">
            <div className="absolute bottom-[6.03%] left-0 right-0 top-[33.62%]" data-name="Background" data-node-id="10375:30089">
              <img alt="" className="block max-w-none size-full" src={imgBackground} />
            </div>
            <div className="absolute flex h-[116px] items-center justify-center left-[64px] top-0 w-[116px]">
              <div className="flex-none rotate-90">
                <div className="relative size-[116px]" data-node-id="10375:30092">
                  <div className="absolute content-stretch flex gap-[8px] items-end left-[14px] top-[30px]" data-node-id="10375:30093">
                    <div className="bg-white border-2 border-[#0b6bcb] border-solid h-[60px] rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[24px]" data-node-id="10375:30094" />
                    <div className="bg-white border-2 border-[#0b6bcb] border-solid h-[86px] rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[24px]" data-node-id="10375:30095" />
                    <div className="bg-white border-2 border-[#0b6bcb] border-solid h-[35px] rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[24px]" data-node-id="10375:30096" />
                  </div>
                  <div className="absolute h-0 left-0 top-[115px] w-[116px]" data-name="Rectangle" data-node-id="10375:30097">
                    <div className="absolute inset-[-1.25px_-1.08%]">
                      <img alt="" className="block max-w-none size-full" src={imgRectangle} />
                    </div>
                  </div>
                  <div className="absolute bottom-[85.56%] left-[calc(50%+0.05px)] top-0 translate-x-[-50%] w-[84.1px]" data-name="lines" data-node-id="10375:30098">
                    <div className="absolute inset-[-7.46%_-1.49%]">
                      <img alt="" className="block max-w-none size-full" src={imgLines} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="content-stretch flex flex-col gap-[8px] items-center text-center max-w-[607px]">
            <p className="font-['Inter'] font-bold leading-[1.33] text-[#171a1c] text-[30px] w-full">
              Uncover health insights across segments
            </p>
            <p className="font-['Inter'] font-normal leading-[1.55] text-[#555e68] text-[20px] w-full">
              Compare outcomes, behaviours, and vulnerability factors to gain deeper understanding of your population data
            </p>
          </div>

          {/* CTA Button - UPDATED WITH ONCLICK */}
          <button
            onClick={onOpenModal}
            className="bg-[#0b6bcb] box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center min-h-[40px] px-[16px] py-[4px] relative rounded-[6px] shrink-0 hover:bg-[#0a5fb0] transition-colors"
          >
            <p className="font-['Inter'] font-semibold leading-[14px] text-[14px] text-white whitespace-pre">
              Select data to compare
            </p>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Help Menu */}
          <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="bg-[#cdd7e1] h-px shrink-0 w-[64px]" />
              <p className="font-['Inter'] font-normal leading-[1.5] text-[#555e68] text-[16px] text-center text-nowrap whitespace-pre">or</p>
              <div className="bg-[#cdd7e1] h-px shrink-0 w-[64px]" />
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer hover:underline">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="#0b6bcb">
                  <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 10a1 1 0 110-2 1 1 0 010 2zm1-3.5v.5a1 1 0 11-2 0v-1a1 1 0 011-1 1.5 1.5 0 10-1.5-1.5 1 1 0 11-2 0A3.5 3.5 0 118 8a1 1 0 00-1 1z"/>
                </svg>
                <p className="font-['Inter'] font-semibold leading-[14px] text-[#0b6bcb] text-[14px] text-nowrap whitespace-pre">Learn about this page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
