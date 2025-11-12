// Icons will be loaded from public folder

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

export default function EmptyState({ onOpenModal, onOpenTemplateModal, onTopicCardClick }) {

  return (
    <div className="bg-[#FCFCF6] content-stretch flex flex-col isolate items-start relative size-full min-h-screen">

      {/* Page Title and Actions */}
      <div className="px-10 pt-10 pb-4 bg-[#FCFCF6] w-full">
        <div className="flex items-center justify-between">
          <h1 className="font-['Inter'] font-semibold text-[24px] text-[#171a1c]">
            Compare segments
          </h1>
          <div className="flex gap-2">
            {/* Export button - no background, no border */}
            <button className="box-border flex items-center justify-center gap-[6px] px-[16px] py-[6px] min-h-[32px] rounded-[6px] hover:bg-[#e3effb] transition-colors">
              <p className="font-['Inter'] font-semibold text-[14px] text-[#0b6bcb]">
                Export
              </p>
              <img src="/Assets/Icons/Share view.svg" alt="" width="16" height="16" />
            </button>

            {/* Change template button - border only, no background */}
            <button
              onClick={onOpenTemplateModal}
              className="border border-[#97c3f0] box-border flex items-center justify-center gap-[6px] px-[16px] py-[6px] min-h-[32px] rounded-[6px] hover:bg-[#e3effb] transition-colors"
            >
              <p className="font-['Inter'] font-semibold text-[14px] text-[#0b6bcb]">
                Change template
              </p>
            </button>

            {/* Add / remove data button */}
            <button
              onClick={onOpenModal}
              className="bg-[#0b6bcb] box-border flex items-center justify-center gap-[6px] px-[16px] py-[6px] min-h-[32px] rounded-[6px] hover:bg-[#185ea5] transition-colors"
            >
              <img src="/Assets/Icons/_Button_/AddFilled.svg" alt="" width="16" height="16" />
              <p className="font-['Inter'] font-semibold text-[14px] text-white">
                Add / remove data
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Empty State with Topic Cards */}
      <div className="box-border flex flex-col items-start pb-[40px] pt-0 px-[40px] relative w-full z-[1]" style={{ minHeight: 'calc(100vh - 56px - 88px - 64px - 40px)' }}>
        <div className="bg-white border border-[#97c3f0] border-solid box-border flex flex-col gap-[40px] items-center p-[40px] relative rounded-[6px] w-full h-full">

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
                <TopicCard icon="/Assets/Icons/Breastfeeding.svg" title="Breastfeeding" onClick={onTopicCardClick} />
                <TopicCard icon="/Assets/Icons/Child Health.svg" title="Child health" onClick={onTopicCardClick} />
                <TopicCard icon="/Assets/Icons/family-planning 1.svg" title="Family planning" onClick={onTopicCardClick} />
                <TopicCard icon="/Assets/Icons/More.svg" title="View 3 more" onClick={onTopicCardClick} />
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
