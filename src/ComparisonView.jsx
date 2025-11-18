export default function ComparisonView({ onSelectData, onReset }) {
  return (
    <div className="min-h-screen bg-[#FCFCF6] flex flex-col">

      {/* Page Title and Actions */}
      <div className="px-10 pt-10 pb-4 bg-[#FCFCF6] w-full">
        <div className="flex items-center justify-between">
          <h1 className="font-['Inter'] font-semibold text-[24px] text-[#171a1c]">
            Compare segments
          </h1>
          <div className="flex gap-2">
            {/* Share this view button */}
            <button className="border border-[#97c3f0] bg-white box-border flex items-center justify-center gap-[6px] px-[16px] py-[6px] min-h-[32px] rounded-[6px] hover:bg-[#e3effb] transition-colors">
              <p className="font-['Inter'] font-semibold text-[14px] text-[#0b6bcb]">
                Share this view
              </p>
              <img src="/Assets/Icons/Share view.svg" alt="" width="16" height="16" />
            </button>

            {/* Change template button */}
            <button className="border border-[#97c3f0] bg-white box-border flex items-center justify-center gap-[6px] px-[16px] py-[6px] min-h-[32px] rounded-[6px] hover:bg-[#e3effb] transition-colors">
              <p className="font-['Inter'] font-semibold text-[14px] text-[#0b6bcb]">
                Change template
              </p>
            </button>

            {/* Add / remove data button */}
            <button
              onClick={onSelectData}
              className="bg-[#0b6bcb] box-border flex items-center justify-center gap-[6px] px-[16px] py-[6px] min-h-[32px] rounded-[6px] hover:bg-[#185ea5] transition-colors"
            >
              <p className="font-['Inter'] font-semibold text-[14px] text-white">
                Add / remove data
              </p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3333 8.66667H8.66667V13.3333H7.33333V8.66667H2.66667V7.33333H7.33333V2.66667H8.66667V7.33333H13.3333V8.66667Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-10 py-6 overflow-auto">

        {/* Filters */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
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

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                    Show standard error
                  </p>
                  <div className="w-4 h-4 border border-[#97c3f0] rounded-full flex items-center justify-center text-[#555e68] text-[10px]">
                    i
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-6 bg-[#cdd7e1] rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
                  </div>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#555e68]">
                    Off
                  </p>
                </div>
              </div>

              {/* Download button */}
              <button className="flex items-center gap-[6px] hover:opacity-80 transition-opacity">
                <p className="font-['Inter'] font-semibold text-[14px] text-[#0b6bcb]">
                  Download
                </p>
                <img src="/Assets/Icons/Download.svg" alt="" width="16" height="16" />
              </button>
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

      {/* Reset prototype button - bottom right */}
      <button
        onClick={onReset}
        className="fixed bottom-6 right-6 bg-[#32383e] box-border flex items-center justify-center px-[16px] py-[8px] rounded-[6px] hover:bg-[#171a1c] transition-colors shadow-lg"
      >
        <p className="font-['Inter'] font-semibold text-[14px] text-white">
          Reset prototype
        </p>
      </button>
    </div>
  );
}
