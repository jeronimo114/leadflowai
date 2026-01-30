import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

const comparisonData = [
  { others: "Months to set up", us: "Live in days" },
  { others: "You manage everything", us: "We manage it" },
  { others: "Figure it out yourself", us: "Dedicated support" },
  { others: "Complex dashboards", us: "Simple reports" },
];

export const FeaturesSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const getRowAnimation = (index: number) => {
    const delay = 20 + index * 8;
    const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const y = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
    });
    return { opacity, y };
  };

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
        paddingTop: 120,
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
            marginBottom: 20,
            lineHeight: 1.1,
          }}
        >
          Done-For-You,
          <br />
          Not DIY Software
        </h2>
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          We deliver results, not software.
        </p>
      </div>

      {/* Comparison */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {comparisonData.map((row, index) => {
          const { opacity, y } = getRowAnimation(index);
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity,
                transform: `translateY(${(1 - y) * 30}px)`,
              }}
            >
              {/* Others */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 24px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </div>
                <span
                  style={{
                    fontSize: 22,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "line-through",
                  }}
                >
                  {row.others}
                </span>
              </div>

              {/* Us */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 24px",
                  background: `${theme.colors.secondary}30`,
                  borderRadius: 16,
                  marginLeft: 20,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: theme.colors.secondaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontSize: 22,
                    color: "white",
                    fontWeight: 600,
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
