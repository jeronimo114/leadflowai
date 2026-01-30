import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

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

export const SolutionScene: React.FC = () => {
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

  // Step animations
  const getStepAnimation = (index: number) => {
    const delay = 15 + index * 12;
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const scale = spring({
      frame: frame - delay,
      fps,
      config: { damping: 15, stiffness: 100 },
    });
    const x = spring({
      frame: frame - delay,
      fps,
      config: { damping: 200 },
    });
    return { opacity, scale: Math.max(0, scale), x };
  };

  // Connection line animation
  const lineProgress = interpolate(frame, [20, 70], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.background,
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
          marginBottom: 80,
          opacity: headerOpacity,
          transform: `translateY(${(1 - headerY) * 30}px)`,
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: theme.colors.secondary,
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          How It Works
        </p>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: theme.colors.foreground,
          }}
        >
          Your 24/7 Sales Machine
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          position: "relative",
        }}
      >
        {/* Connection line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 80,
            right: 80,
            height: 4,
            background: theme.colors.border,
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: `${lineProgress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.secondary})`,
              borderRadius: 2,
            }}
          />
        </div>

        {steps.map((step, index) => {
          const { opacity, scale, x } = getStepAnimation(index);
          return (
            <div
              key={step.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 220,
                opacity,
                transform: `scale(${scale}) translateX(${(1 - x) * 50}px)`,
                zIndex: 1,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: theme.colors.primary,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {index + 1}
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  background: theme.colors.background,
                  boxShadow: `0 10px 40px ${step.color}30`,
                  border: `3px solid ${step.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                  marginBottom: 20,
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.colors.foreground,
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: theme.colors.muted,
                  textAlign: "center",
                }}
              >
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
