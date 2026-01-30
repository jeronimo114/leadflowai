import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { theme } from "../theme";

const problems = [
  {
    icon: "⏰",
    title: "Slow Response",
    description: "Leads sit in your inbox for hours",
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

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerY = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Stat number animation
  const statProgress = interpolate(frame, [20, 50], [0, 78], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Card animations
  const getCardAnimation = (index: number) => {
    const delay = 30 + index * 15;
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const scale = spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 100 },
    });
    const y = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
    });
    return { opacity, scale: Math.max(0, scale), y };
  };

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.card,
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
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 24px",
          background: "#fef2f2",
          borderRadius: 50,
          marginBottom: 24,
          opacity: headerOpacity,
          transform: `translateY(${(1 - headerY) * 30}px)`,
        }}
      >
        <span style={{ fontSize: 20 }}>⚠️</span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#ef4444",
          }}
        >
          The $100K Problem
        </span>
      </div>

      {/* Main stat */}
      <h2
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: theme.colors.foreground,
          textAlign: "center",
          marginBottom: 60,
          opacity: headerOpacity,
          transform: `translateY(${(1 - headerY) * 20}px)`,
        }}
      >
        <span style={{ fontSize: 72, color: theme.colors.accent }}>
          {Math.round(statProgress)}%
        </span>{" "}
        of buyers choose the vendor
        <br />
        that responds first
      </h2>

      {/* Problem cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {problems.map((problem, index) => {
          const { opacity, scale, y } = getCardAnimation(index);
          return (
            <div
              key={problem.title}
              style={{
                width: 320,
                padding: 32,
                background: theme.colors.background,
                borderRadius: 20,
                boxShadow: `0 10px 40px ${theme.colors.primary}10`,
                border: `1px solid ${theme.colors.border}`,
                textAlign: "center",
                opacity,
                transform: `scale(${scale}) translateY(${(1 - y) * 40}px)`,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: problem.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: 36,
                }}
              >
                {problem.icon}
              </div>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: theme.colors.foreground,
                  marginBottom: 8,
                }}
              >
                {problem.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: theme.colors.muted,
                }}
              >
                {problem.description}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
