import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

const steps = [
  {
    icon: "⚡",
    title: "Instant Response",
    description: "AI replies in seconds, 24/7",
    color: theme.colors.accent,
  },
  {
    icon: "🧠",
    title: "Smart Qualification",
    description: "Asks the right questions",
    color: theme.colors.secondary,
  },
  {
    icon: "📧",
    title: "Auto Nurturing",
    description: "Keeps leads engaged",
    color: "#3b82f6",
  },
  {
    icon: "🤝",
    title: "Sales Handoff",
    description: "Delivers qualified leads",
    color: "#22c55e",
  },
];

export const SolutionSceneMobile: React.FC = () => {
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

  const getStepAnimation = (index: number) => {
    const delay = 15 + index * 10;
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const scale = spring({
      frame: frame - delay,
      fps,
      config: { damping: 15, stiffness: 100 },
    });
    return { opacity, scale: Math.max(0, scale) };
  };

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.background,
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
          transform: `translateY(${(1 - headerY) * 30}px)`,
        }}
      >
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: theme.colors.secondary,
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          How It Works
        </p>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: theme.colors.foreground,
            lineHeight: 1.1,
          }}
        >
          Your 24/7
          <br />
          Sales Machine
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
        }}
      >
        {steps.map((step, index) => {
          const { opacity, scale } = getStepAnimation(index);
          return (
            <div
              key={step.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: 28,
                background: theme.colors.card,
                borderRadius: 24,
                boxShadow: `0 10px 40px ${step.color}15`,
                border: `2px solid ${step.color}30`,
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: -12,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: theme.colors.primary,
                    color: "white",
                    fontSize: 16,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {index + 1}
                </div>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: theme.colors.background,
                    border: `3px solid ${step.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40,
                  }}
                >
                  {step.icon}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: theme.colors.foreground,
                    marginBottom: 4,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 20,
                    color: theme.colors.muted,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
