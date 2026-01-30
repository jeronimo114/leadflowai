import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const comparisonData = [
  { others: "Months to set up", us: "Live in days" },
  { others: "You manage everything", us: "We manage it for you" },
  { others: "Figure it out yourself", us: "Dedicated support" },
  { others: "Complex dashboards", us: "Simple, actionable reports" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Row animations
  const getRowAnimation = (index: number) => {
    const delay = 20 + index * 10;
    const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const x = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
    });
    return { opacity, x };
  };

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 60,
          opacity: headerOpacity,
          transform: `scale(${headerScale})`,
        }}
      >
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
          }}
        >
          Done-For-You, Not DIY Software
        </h2>
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Other tools sell software. We deliver results.
        </p>
      </div>

      {/* Comparison table */}
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 16,
            opacity: headerOpacity,
          }}
        >
          <div
            style={{
              padding: "16px 32px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Other Tools
            </span>
          </div>
          <div
            style={{
              padding: "16px 32px",
              background: theme.colors.secondary,
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "white",
              }}
            >
              LeadFlow AI
            </span>
          </div>
        </div>

        {/* Table rows */}
        {comparisonData.map((row, index) => {
          const { opacity, x } = getRowAnimation(index);
          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 12,
                opacity,
                transform: `translateX(${(1 - x) * 50}px)`,
              }}
            >
              {/* Others column */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "20px 32px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  ✕
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {row.others}
                </span>
              </div>

              {/* Us column */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "20px 32px",
                  background: `${theme.colors.secondary}30`,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: theme.colors.secondaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  {row.us}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
