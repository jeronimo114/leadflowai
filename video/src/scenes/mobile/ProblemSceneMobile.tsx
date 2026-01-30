import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { theme } from "../../theme";

const problems = [
  {
    icon: "⏰",
    title: "Slow Response",
    description: "Leads wait hours in your inbox",
    color: "#ef4444",
    bgColor: "#fef2f2",
  },
  {
    icon: "📉",
    title: "Weak Follow-up",
    description: "Teams give up after 1-2 attempts",
    color: "#f97316",
    bgColor: "#fff7ed",
  },
  {
    icon: "💸",
    title: "Lost Revenue",
    description: "Hot prospects go cold",
    color: "#eab308",
    bgColor: "#fefce8",
  },
];

export const ProblemSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerY = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const statProgress = interpolate(frame, [20, 50], [0, 78], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const getCardAnimation = (index: number) => {
    const delay = 35 + index * 12;
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const scale = spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 100 },
    });
    return { opacity, scale: Math.max(0, scale) };
  };

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.card,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 28px",
          background: "#fef2f2",
          borderRadius: 50,
          marginBottom: 40,
          opacity: headerOpacity,
          transform: `translateY(${(1 - headerY) * 30}px)`,
        }}
      >
        <span style={{ fontSize: 28 }}>⚠️</span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#ef4444",
          }}
        >
          The $100K Problem
        </span>
      </div>

      {/* Main stat */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 80,
          opacity: headerOpacity,
          transform: `translateY(${(1 - headerY) * 20}px)`,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: theme.colors.accent,
            lineHeight: 1,
          }}
        >
          {Math.round(statProgress)}%
        </div>
        <p
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: theme.colors.foreground,
            marginTop: 20,
            lineHeight: 1.3,
          }}
        >
          of buyers choose the
          <br />
          vendor that responds first
        </p>
      </div>

      {/* Problem cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
        }}
      >
        {problems.map((problem, index) => {
          const { opacity, scale } = getCardAnimation(index);
          return (
            <div
              key={problem.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: 28,
                background: theme.colors.background,
                borderRadius: 24,
                boxShadow: `0 10px 40px ${theme.colors.primary}10`,
                border: `1px solid ${theme.colors.border}`,
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: problem.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  flexShrink: 0,
                }}
              >
                {problem.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: theme.colors.foreground,
                    marginBottom: 4,
                  }}
                >
                  {problem.title}
                </h3>
                <p
                  style={{
                    fontSize: 22,
                    color: theme.colors.muted,
                  }}
                >
                  {problem.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
