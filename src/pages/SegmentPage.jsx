import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SecondaryNav from '../components/SecondaryNav';
import { segmentMetadata } from '../lib/segmentMetadata';

export default function SegmentPage() {
  const { id } = useParams();

  // Convert URL id to metadata key (e.g., "rural-4" -> "Rural-4")
  const metadataKey = id.split('-').map((part, index) =>
    index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
  ).join('-');

  const segment = segmentMetadata[metadataKey];

  if (!segment) {
    return <div>Segment not found</div>;
  }

  return (
    <>
      <Navbar />
      <SecondaryNav showSegmentCards={true} activeSegment={id} />

      <main className="flex-1" style={{ minHeight: '1200px' }}>
        <div className="max-w-[1360px] mx-auto px-7 py-8">
          {/* Segment Header */}
          <div className="flex items-center gap-6 mb-8">
            {/* Illustration */}
            <div className="flex-shrink-0">
              <img
                src={`/Assets/illustrations/${segment.segmentId}.png`}
                alt={segment.displayName}
                style={{
                  width: '106px',
                  height: '106px',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Segment name and tags */}
            <div>
              <h1 className="text-2xl font-semibold mb-3">{segment.displayName}</h1>
              <div className="flex flex-wrap gap-2">
                {segment.characteristics.map((characteristic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs"
                    style={{
                      backgroundColor: '#e5e5dc',
                      color: '#383633',
                      border: 'none',
                      borderRadius: '24px',
                      fontWeight: 600
                    }}
                  >
                    {characteristic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content placeholder */}
          <p className="text-lg">Segment profile goes here</p>
        </div>
      </main>
    </>
  );
}
