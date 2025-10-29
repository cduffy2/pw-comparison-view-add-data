import Logo from './Logo';
import InfoOutlined from './assets/InfoOutlined.svg';
import lactationIcon from './assets/lactation 1.png';
import boyIcon from './assets/boy-0105y 1.png';
import mobileIcon from './assets/mobile 1.png';
import familyPlanningIcon from './assets/family-planning 1.png';
import syringeIcon from './assets/syringe 1.png';
import rmnhIcon from './assets/rmnh 1.png';
import mentalHealthIcon from './assets/mental-health 1.png';
import moreIcon from './assets/More.png';

// Topic Card Component with hover state
function TopicCard({ icon, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#f0f4f8] border border-[#97c3f0] border-solid box-border content-stretch flex flex-col gap-[8px] h-[112px] items-center p-[16px] relative rounded-[4px] shrink-0 w-[160px] cursor-pointer transition-colors hover:bg-[#dde7ee] hover:border-[#026acc]"
    >
      <div className="relative shrink-0 size-[48px]">
        <img alt={title} className="block max-w-none size-full" src={icon} />
      </div>
      <p className="font-['Inter'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[16px] text-[#0b6bcb] text-center text-nowrap whitespace-pre">
        {title}
      </p>
    </div>
  );
}

export default function EmptyState({ onOpenModal, onTopicCardClick }) {

  return (
    <div className="bg-[#fdf8f5] content-stretch flex flex-col isolate items-start relative size-full min-h-screen">
      {/* Top Navigation */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
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
            <img src={InfoOutlined} alt="Info" className="size-full" />
          </div>
        </div>
      </div>

      {/* Main Content - Empty State with Topic Cards */}
      <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip pb-[40px] pt-0 px-[40px] relative shrink-0 w-full z-[1]">
        <div className="basis-0 bg-white border border-[#97c3f0] border-solid box-border content-stretch flex flex-col gap-[40px] grow items-center min-h-px min-w-px p-[40px] relative rounded-[6px] shrink-0 w-full">

          {/* Main Title */}
          <p className="font-['Inter'] font-bold leading-[1.33] min-w-full not-italic relative shrink-0 text-[30px] text-[#171a1c] text-center w-[min-content]">
            Uncover health insights across segments
          </p>

          <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0">
            {/* Explore by topic section */}
            <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0">
              <p className="font-['Inter'] font-semibold leading-[1.55] not-italic relative shrink-0 text-[20px] text-[#171a1c] text-center text-nowrap whitespace-pre">
                Explore by topic
              </p>

              {/* Topic Cards Grid */}
              <div className="content-start flex flex-wrap gap-[16px] items-start relative shrink-0 w-[688px]">
                <TopicCard icon={lactationIcon} title="Breastfeeding" onClick={onTopicCardClick} />
                <TopicCard icon={boyIcon} title="Child health" onClick={onTopicCardClick} />
                <TopicCard icon={mobileIcon} title="Digital access" onClick={onTopicCardClick} />
                <TopicCard icon={familyPlanningIcon} title="Family planning" onClick={onTopicCardClick} />
                <TopicCard icon={syringeIcon} title="Immunisation" onClick={onTopicCardClick} />
                <TopicCard icon={rmnhIcon} title="Maternal health" onClick={onTopicCardClick} />
                <TopicCard icon={mentalHealthIcon} title="Mental health" onClick={onTopicCardClick} />
                <TopicCard icon={moreIcon} title="View more" onClick={onTopicCardClick} />
              </div>
            </div>

            {/* Divider with "or" */}
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
              <div className="bg-[#555e68] h-px shrink-0 w-[120px]" />
              <p className="font-['Inter'] font-semibold leading-[1.55] not-italic relative shrink-0 text-[20px] text-[#555e68] text-center text-nowrap whitespace-pre">
                or
              </p>
              <div className="bg-[#555e68] h-px shrink-0 w-[120px]" />
            </div>

            {/* Select data points individually button */}
            <button
              onClick={onOpenModal}
              className="border border-[#97c3f0] border-solid box-border content-stretch flex gap-[12px] items-center justify-center min-h-[48px] px-[24px] py-[6px] relative rounded-[6px] shrink-0 hover:bg-[#f0f4f8] transition-colors"
            >
              <p className="font-['Inter'] font-semibold leading-[16px] not-italic relative shrink-0 text-[16px] text-[#0b6bcb] text-nowrap whitespace-pre">
                Select data points individually
              </p>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
