import { useNavigate } from "react-router-dom";
import { DISTRICTS, getSeverity } from "@/data/districts";

const DISTRICT_PATHS: Record<string, string> = {
  "bjn-25": "M 480,140 L 530,135 L 545,155 L 535,175 L 490,178 L 478,162 Z",
  "bjn-01": "M 530,135 L 590,128 L 605,148 L 600,170 L 545,175 L 535,155 Z",
  "bjn-13": "M 590,128 L 650,122 L 668,142 L 660,165 L 605,168 L 600,148 Z",
  "bjn-06": "M 430,145 L 480,140 L 490,178 L 478,195 L 435,192 L 422,172 Z",
  "bjn-14": "M 370,138 L 430,133 L 430,145 L 422,172 L 375,170 L 362,152 Z",
  "bjn-28": "M 650,122 L 710,118 L 725,140 L 718,162 L 668,162 L 660,142 Z",
  "bjn-07": "M 710,118 L 768,112 L 782,135 L 775,158 L 725,160 L 718,140 Z",
  "bjn-26": "M 310,142 L 370,138 L 375,170 L 362,188 L 315,185 L 302,165 Z",
  "bjn-27": "M 248,148 L 310,142 L 310,165 L 302,185 L 252,182 L 238,165 Z",
  "bjn-16": "M 620,170 L 680,165 L 695,188 L 688,210 L 628,208 L 615,190 Z",
  "bjn-08": "M 560,175 L 620,170 L 628,208 L 618,228 L 568,225 L 555,205 Z",
  "bjn-23": "M 500,178 L 560,175 L 568,225 L 558,245 L 508,242 L 495,218 Z",
  "bjn-24": "M 440,182 L 500,178 L 508,242 L 498,260 L 448,258 L 435,238 Z",
  "bjn-05": "M 380,175 L 440,182 L 448,258 L 438,278 L 388,275 L 375,252 Z",
  "bjn-02": "M 680,165 L 740,160 L 755,185 L 748,208 L 695,208 L 688,188 Z",
  "bjn-09": "M 740,160 L 795,155 L 800,180 L 795,205 L 752,208 L 742,185 Z",
  "bjn-17": "M 320,190 L 380,185 L 388,275 L 378,295 L 328,292 L 315,268 Z",
  "bjn-04": "M 260,195 L 320,190 L 328,292 L 318,312 L 268,308 L 255,282 Z",
  "bjn-03": "M 200,200 L 260,195 L 268,308 L 258,328 L 208,322 L 195,295 Z",
  "bjn-12": "M 140,205 L 200,200 L 208,322 L 198,342 L 148,335 L 135,310 Z",
  "bjn-11": "M 80,210 L 140,205 L 148,335 L 138,355 L 88,348 L 75,322 Z",
  "bjn-15": "M 380,275 L 440,270 L 448,358 L 438,378 L 388,372 L 375,348 Z",
  "bjn-10": "M 440,270 L 500,265 L 510,358 L 500,378 L 450,375 L 438,352 Z",
  "bjn-21": "M 500,265 L 558,260 L 568,348 L 558,368 L 508,365 L 498,342 Z",
  "bjn-18": "M 260,308 L 320,302 L 328,392 L 318,412 L 268,408 L 255,382 Z",
  "bjn-19": "M 200,322 L 260,308 L 268,408 L 258,428 L 208,422 L 195,395 Z",
  "bjn-20": "M 140,335 L 200,322 L 208,422 L 198,442 L 148,435 L 135,408 Z",
  "bjn-22": "M 80,348 L 140,335 L 148,435 L 138,455 L 88,448 L 75,422 Z",
};

const LABEL_POSITIONS: Record<string, [number, number]> = {
  "bjn-01": [567, 155], "bjn-02": [716, 185], "bjn-03": [230, 262],
  "bjn-04": [290, 252], "bjn-05": [410, 227], "bjn-06": [454, 168],
  "bjn-07": [746, 135], "bjn-08": [590, 200], "bjn-09": [769, 183],
  "bjn-10": [475, 322], "bjn-11": [110, 282], "bjn-12": [170, 270],
  "bjn-13": [628, 145], "bjn-14": [396, 155], "bjn-15": [410, 325],
  "bjn-16": [652, 190], "bjn-17": [350, 240], "bjn-18": [290, 360],
  "bjn-19": [230, 375], "bjn-20": [170, 388], "bjn-21": [530, 315],
  "bjn-22": [110, 400], "bjn-23": [530, 210], "bjn-24": [470, 218],
  "bjn-25": [506, 158], "bjn-26": [336, 162], "bjn-27": [275, 165],
  "bjn-28": [685, 140],
};

const SEVERITY_COLORS: Record<string, { fill: string; stroke: string }> = {
  high: { fill: "hsl(0 72% 54% / 0.55)", stroke: "hsl(0 72% 40%)" },
  medium: { fill: "hsl(34 90% 50% / 0.55)", stroke: "hsl(34 90% 38%)" },
  low: { fill: "hsl(142 60% 42% / 0.45)", stroke: "hsl(142 60% 30%)" },
};

const HOVER_COLORS: Record<string, string> = {
  high: "hsl(0 72% 54% / 0.85)",
  medium: "hsl(34 90% 50% / 0.85)",
  low: "hsl(142 60% 42% / 0.75)",
};

type Props = {
  hoveredId?: string;
  onHover?: (id: string | null) => void;
};

export default function BojonegoroMap({ hoveredId, onHover }: Props) {
  const navigate = useNavigate();

  const getSeverityFromDistrict = (id: string) => {
    const d = DISTRICTS.find(x => x.id === id);
    if (!d) return "medium";
    const avg = (d.scores.personal + d.scores.social + d.scores.spatial + d.scores.structural) / 4;
    return getSeverity(avg);
  };

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 820 500" className="w-full h-full" style={{ fontFamily: "inherit" }}>
        <rect width="820" height="500" fill="hsl(210 20% 96%)" rx="8" />
        <path d="M 30,155 Q 150,140 280,150 Q 400,160 530,148 Q 620,140 720,145 Q 780,148 820,152" fill="none" stroke="hsl(200 72% 60% / 0.5)" strokeWidth="6" strokeLinecap="round" />
        <text x="50" y="145" fontSize="8" fill="hsl(200 72% 40%)" fontStyle="italic">Bengawan Solo</text>

        {DISTRICTS.map((district) => {
          const path = DISTRICT_PATHS[district.id];
          if (!path) return null;
          const sev = getSeverityFromDistrict(district.id);
          const colors = SEVERITY_COLORS[sev];
          const isHovered = hoveredId === district.id;
          return (
            <g key={district.id}>
              <path
                d={path}
                fill={isHovered ? HOVER_COLORS[sev] : colors.fill}
                stroke={colors.stroke}
                strokeWidth={isHovered ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-150"
                onClick={() => navigate(`/district/${district.id}`)}
                onMouseEnter={() => onHover?.(district.id)}
                onMouseLeave={() => onHover?.(null)}
              />
            </g>
          );
        })}

        {DISTRICTS.map((district) => {
          const pos = LABEL_POSITIONS[district.id];
          if (!pos) return null;
          const isHovered = hoveredId === district.id;
          const shortName = district.name.length <= 8 ? district.name : district.name.slice(0, 7) + "…";
          return (
            <text key={district.id} x={pos[0]} y={pos[1]} textAnchor="middle" fontSize={isHovered ? "8.5" : "7.5"} fontWeight={isHovered ? "700" : "500"} fill={isHovered ? "hsl(215 48% 10%)" : "hsl(215 35% 20%)"} className="pointer-events-none select-none" style={{ transition: "all 0.15s" }}>
              {shortName}
            </text>
          );
        })}

        <g transform="translate(20, 360)">
          <rect width="140" height="90" rx="6" fill="white" fillOpacity="0.88" stroke="hsl(210 20% 87%)" strokeWidth="1" />
          <text x="10" y="18" fontSize="8" fontWeight="700" fill="hsl(215 35% 20%)" letterSpacing="0.5">TINGKAT KEMISKINAN</text>
          <rect x="10" y="26" width="14" height="14" rx="3" fill="hsl(0 72% 54% / 0.55)" stroke="hsl(0 72% 40%)" strokeWidth="1" />
          <text x="30" y="37" fontSize="8" fill="hsl(215 35% 25%)">Tinggi (skor ≥ 70)</text>
          <rect x="10" y="46" width="14" height="14" rx="3" fill="hsl(34 90% 50% / 0.55)" stroke="hsl(34 90% 38%)" strokeWidth="1" />
          <text x="30" y="57" fontSize="8" fill="hsl(215 35% 25%)">Sedang (skor 45–69)</text>
          <rect x="10" y="66" width="14" height="14" rx="3" fill="hsl(142 60% 42% / 0.45)" stroke="hsl(142 60% 30%)" strokeWidth="1" />
          <text x="30" y="77" fontSize="8" fill="hsl(215 35% 25%)">Rendah (skor &lt; 45)</text>
        </g>

        <g transform="translate(760, 30)">
          <circle cx="20" cy="20" r="16" fill="white" fillOpacity="0.8" stroke="hsl(210 20% 87%)" strokeWidth="1" />
          <text x="20" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="hsl(215 35% 20%)">U</text>
          <line x1="20" y1="17" x2="20" y2="28" stroke="hsl(215 35% 20%)" strokeWidth="1.5" />
          <polygon points="20,8 17,17 23,17" fill="hsl(0 72% 54%)" />
        </g>
      </svg>
    </div>
  );
}
