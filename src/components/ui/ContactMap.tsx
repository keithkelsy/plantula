"use client";

import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/map";

// Coordinates for Medellín, Colombia
const MEDELLIN: [number, number] = [-75.5812, 6.2518];

// Custom leaf-pin marker that matches Plántula's visual identity
function LeafPin() {
  return (
    <div className="relative flex flex-col items-center cursor-pointer group/pin">
      {/* Circle */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover/pin:-translate-y-1">
        {/* Mini botanical SVG */}
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="14" y1="25" x2="14" y2="11" stroke="#2C3E2D" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M14 18 C14 18 7 16 6 9 C10 9 14 13 14 18Z"   stroke="#2C3E2D" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
          <path d="M14 14 C14 14 21 12 22 5 C18 5 14 9 14 14Z"  stroke="#2C3E2D" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      {/* Stem */}
      <div className="h-3 w-px bg-cream/70" />
      {/* Dot */}
      <div className="h-1.5 w-1.5 rounded-full bg-cream/60" />
    </div>
  );
}

interface ContactMapProps {
  tooltip: string;
}

export default function ContactMap({ tooltip }: ContactMapProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Map
        center={MEDELLIN}
        zoom={13}
        theme="dark"
        interactive={true}
        scrollZoom={false}
        className="h-full w-full"
      >
        <MapMarker longitude={MEDELLIN[0]} latitude={MEDELLIN[1]}>
          <MarkerContent>
            <LeafPin />
          </MarkerContent>
          <MarkerTooltip>
            <div className="rounded-none border border-green-sage/30 bg-green-dark px-4 py-2">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-green-light">
                {tooltip}
              </p>
            </div>
          </MarkerTooltip>
        </MapMarker>
      </Map>
    </div>
  );
}
