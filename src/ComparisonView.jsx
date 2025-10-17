import Logo from './Logo';

export default function ComparisonView({ onSelectData, onReset }) {
  return (
    <div className="min-h-screen bg-[#fdf8f5] flex flex-col">
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
              <div className="border border-[#185ea5] border-solid relative rounded-full shrink-0 size-[20px]" />
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

      {/* Secondary Navigation */}
      <div className="px-10 py-4 shadow-[0px_1px_2px_0px_rgba(21,21,21,0.08)]">
        <div className="flex gap-4 mb-4">
          <div className="box-border px-3 py-2">
            <p className="font-['Inter'] font-semibold text-[16px] text-[#0b6bcb] cursor-pointer">Overview</p>
          </div>
          <div className="box-border px-3 py-2">
            <p className="font-['Inter'] font-semibold text-[16px] text-[#0b6bcb] cursor-pointer">Segments</p>
          </div>
          <div className="bg-[#e3effb] px-3 py-2 rounded-[6px]">
            <p className="font-['Inter'] font-semibold text-[16px] text-[#0b6bcb]">Comparison tool</p>
          </div>
          <div className="box-border px-3 py-2">
            <p className="font-['Inter'] font-semibold text-[16px] text-[#0b6bcb] cursor-pointer">Prevalence map</p>
          </div>
          <div className="box-border px-3 py-2">
            <p className="font-['Inter'] font-semibold text-[16px] text-[#0b6bcb] cursor-pointer">Typing tools</p>
          </div>
          <div className="box-border px-3 py-2">
            <p className="font-['Inter'] font-semibold text-[16px] text-[#0b6bcb] cursor-pointer">Additional resources</p>
          </div>
        </div>

        {/* Page Title and Actions */}
        <div className="flex items-center justify-between">
          <h1 className="font-['Inter'] font-semibold text-[24px] text-[#171a1c]">
            Comparison tool
          </h1>
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="border border-[#97c3f0] bg-white box-border flex items-center justify-center px-4 py-2 rounded-[6px] hover:bg-[#f0f4f8] transition-colors"
            >
              <p className="font-['Inter'] font-semibold text-[14px] text-[#0b6bcb]">
                Reset prototype
              </p>
            </button>
            <button
              onClick={onSelectData}
              className="bg-[#0b6bcb] box-border flex items-center justify-center px-4 py-2 rounded-[6px] hover:bg-[#0a5fb0] transition-colors"
            >
              <p className="font-['Inter'] font-semibold text-[14px] text-white">
                Select data to compare
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-10 py-6 overflow-auto">

        {/* Filters */}
        <div className="mb-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                Segments shown
              </p>
              <div className="flex border border-[#97c3f0] rounded-[6px] overflow-hidden">
                <button className="bg-[#c7dff7] px-4 py-2 font-['Inter'] font-semibold text-[14px] text-[#0857a7]">
                  All
                </button>
                <div className="w-px bg-[#97c3f0]" />
                <button className="bg-white px-4 py-2 font-['Inter'] font-semibold text-[14px] text-[#0b6bcb] hover:bg-[#f0f4f8]">
                  Urban
                </button>
                <div className="w-px bg-[#97c3f0]" />
                <button className="bg-white px-4 py-2 font-['Inter'] font-semibold text-[14px] text-[#0b6bcb] hover:bg-[#f0f4f8]">
                  Rural
                </button>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                    Show standard error
                  </p>
                  <div className="w-4 h-4 border border-[#97c3f0] rounded-full flex items-center justify-center text-[#555e68] text-[10px]">
                    i
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-6 bg-[#cdd7e1] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
                  </div>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                    Off
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                    Highlight statistical differences
                  </p>
                  <div className="w-4 h-4 border border-[#97c3f0] rounded-full flex items-center justify-center text-[#555e68] text-[10px]">
                    i
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-6 bg-[#cdd7e1] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
                  </div>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                    Off
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-[#97c3f0] rounded-[8px] overflow-hidden shadow-sm">
          <div className="flex">
            {/* Segments Column */}
            <div className="w-[187px] border-r border-[#97c3f0]">
              <div className="bg-[#dde7ee] h-[48px] flex items-center px-4">
                <div className="flex items-center justify-between w-full">
                  <p className="font-['Inter'] font-semibold text-[16px] text-[#171a1c]">Segments</p>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">Size</p>
                </div>
              </div>
              <div className="mt-12">
                {[
                  { name: 'Urban-4', size: '9%' },
                  { name: 'Rural-4', size: '19%' },
                  { name: 'Urban-3', size: '9%' },
                  { name: 'Rural-3.2', size: '14%' },
                  { name: 'Rural-3.1', size: '15%' },
                  { name: 'Rural-2', size: '14%' },
                  { name: 'Urban-2', size: '10%' },
                  { name: 'Urban-1', size: '10%' },
                ].map((segment) => (
                  <div key={segment.name} className="h-[40px] flex items-center justify-between px-4 hover:bg-[#f0f4f8]">
                    <p className="font-['Inter'] font-normal text-[14px] text-[#0b6bcb] cursor-pointer hover:underline">
                      {segment.name}
                    </p>
                    <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                      {segment.size}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Placeholder */}
            <div className="flex-1 flex items-center justify-center">
              <p className="font-['Inter'] font-semibold text-[24px] text-red-600">
                data appears here
              </p>
            </div>
          </div>

        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button className="w-8 h-8 flex items-center justify-center text-[#0b6bcb] hover:bg-[#f0f4f8] rounded">
            ‹
          </button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((page) => (
              <div
                key={page}
                className={`w-2 h-2 rounded-full ${
                  page === 1 ? 'bg-[#0b6bcb]' : 'bg-[#cdd7e1]'
                }`}
              />
            ))}
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-[#0b6bcb] hover:bg-[#f0f4f8] rounded">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
