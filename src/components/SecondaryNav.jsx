import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import VulnerabilityNumberTag from './VulnerabilityNumberTag';
import SegmentTooltip from './SegmentTooltip';
import { getSegmentMetadata } from '../lib/segmentMetadata';

export default function SecondaryNav({ activePage, showSegmentCards = true, activeSegment }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef([]);

  // Get hover color based on vulnerability level
  const getHoverColor = (vulLevel) => {
    switch (vulLevel) {
      case '4': return '#F6E8E9';
      case '3': return '#F1E6F4';
      case '2': return '#E5F0F8';
      case '1': return '#DAEEE3';
      default: return '#D9F0FF';
    }
  };

  // Get border color for active state based on vulnerability level
  const getBorderColor = (vulLevel) => {
    switch (vulLevel) {
      case '4': return '#fe4656'; // Most vulnerable
      case '3': return '#c254fa'; // More vulnerable
      case '2': return '#04a1e6'; // Less vulnerable
      case '1': return '#00be48'; // Least vulnerable
      default: return '#04a1e6';
    }
  };

  // Line 1: Main navigation tabs
  const line1NavItems = [
    { label: 'Senegal overview', href: '/senegal-overview', icon: '/Assets/Icons/senegal.svg', hasIcon: true, page: 'senegal-overview' },
    { label: 'Compare segments', href: '/', page: 'compare-segments' },
    { label: 'Prevalence map', href: '#', page: 'prevalence-map' },
    { label: 'Typing tools', href: '#', page: 'typing-tools' },
    { label: 'Additional resources', href: '#', page: 'additional-resources' },
  ];

  // Line 2: Segment cards with vulnerability levels
  const segmentCards = [
    { segmentType: 'Rural', vulLevel: '4', subLevel: 'None', population: '9%', bgColor: '#f2a0ac' },
    { segmentType: 'Rural', vulLevel: '3', subLevel: '1', population: '9%', bgColor: '#b5a4ea' },
    { segmentType: 'Rural', vulLevel: '3', subLevel: '2', population: '9%', bgColor: '#b5a4ea' },
    { segmentType: 'Rural', vulLevel: '2', subLevel: 'None', population: '9%', bgColor: '#76b5e5' },
    { segmentType: 'Urban', vulLevel: '4', subLevel: 'None', population: '9%', bgColor: '#f2a0ac' },
    { segmentType: 'Urban', vulLevel: '3', subLevel: 'None', population: '9%', bgColor: '#b5a4ea' },
    { segmentType: 'Urban', vulLevel: '2', subLevel: 'None', population: '12%', bgColor: '#76b5e5' },
    { segmentType: 'Urban', vulLevel: '1', subLevel: 'None', population: '25%', bgColor: '#71d6db' },
  ];


  return (
    <nav
      className="bg-white border-b border-transparent sticky top-0 z-50"
      style={{
        boxShadow: '0px 1px 2px 0px rgba(21,21,21,0.08)'
      }}
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Line 1: Main Navigation Tabs */}
        <div className="flex items-start justify-center gap-4 px-7 py-3">
          {line1NavItems.map((item) => {
            const NavComponent = item.href.startsWith('#') ? 'a' : Link;
            const linkProps = item.href.startsWith('#') ? { href: item.href } : { to: item.href };

            return (
              <NavComponent
                key={item.label}
                {...linkProps}
                className={`
                  flex items-center justify-center gap-1.5
                  px-3 py-3 h-10
                  rounded-[var(--radius-sm)]
                  font-semibold text-base leading-4
                  transition-colors
                  ${
                    item.page === activePage
                      ? 'bg-[var(--primary-plain-hoverbg)] text-[var(--primary-plain-color)]'
                      : hoveredItem === item.label
                      ? 'bg-[var(--primary-plain-hoverbg)] text-[var(--primary-plain-color)]'
                      : 'text-[var(--primary-plain-color)]'
                  }
                `}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.hasIcon && (
                  <div className="w-5 h-5 rounded-full border border-[var(--primary-600)] overflow-hidden flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span>{item.label}</span>
              </NavComponent>
            );
          })}
        </div>

        {/* Line 2: Segment Cards - Conditionally shown */}
        {showSegmentCards && (
          <div className="flex items-center justify-center gap-4 px-7 pb-4">
            {segmentCards.map((segment, index) => {
              const metadata = getSegmentMetadata(segment.segmentType, segment.vulLevel, segment.subLevel);
              const hoverColor = getHoverColor(segment.vulLevel);
              const borderColor = getBorderColor(segment.vulLevel);
              const isHovered = hoveredCard === index;

              // Create segment ID for URL (e.g., "rural-4", "urban-3.1")
              const segmentId = `${segment.segmentType.toLowerCase()}-${segment.vulLevel}${segment.subLevel !== 'None' ? `.${segment.subLevel}` : ''}`;
              const isActive = activeSegment === segmentId;

              return (
            <Link
              key={`${segment.segmentType}-${segment.vulLevel}-${index}`}
              to={`/segment/${segmentId}`}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="rounded-[var(--radius-sm)] transition-all cursor-pointer"
              style={{
                backgroundColor: isActive ? 'white' : (isHovered ? hoverColor : 'white'),
                borderWidth: isActive ? '3px' : '1px',
                borderStyle: 'solid',
                borderColor: isActive ? borderColor : (isHovered ? hoverColor : 'var(--primary-outlined-border)'),
                paddingLeft: isActive ? '16px' : '18px',
                paddingRight: isActive ? '16px' : '18px',
                paddingTop: isActive ? '8px' : '10px',
                paddingBottom: isActive ? '8px' : '10px',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                setHoveredCard(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.bottom
                });
              }}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-1">
                <p className="font-semibold text-base leading-6 text-black whitespace-nowrap">
                  {segment.segmentType}
                </p>
                <VulnerabilityNumberTag
                  vulLevel={segment.vulLevel}
                  subLevel={segment.subLevel}
                  className="h-6"
                  style={{ backgroundColor: segment.bgColor }}
                />
              </div>
            </Link>
            );
            })}

            {/* Tooltips */}
            {segmentCards.map((segment, index) => {
              const metadata = getSegmentMetadata(segment.segmentType, segment.vulLevel, segment.subLevel);
              return metadata ? (
                <SegmentTooltip
                  key={`tooltip-${segment.segmentType}-${segment.vulLevel}-${index}`}
                  segment={metadata}
                  isVisible={hoveredCard === index}
                  position={tooltipPosition}
                />
              ) : null;
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
