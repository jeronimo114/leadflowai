import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoRotation = interpolate(frame, [0, 20], [-180, 0], {
    extrapolateRight: "clamp",
  });

  // Text animations
  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const taglineOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = spring({
    frame: frame - 35,
    fps,
    config: { damping: 200 },
  });

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + gradientProgress * 45}deg,
          ${theme.colors.primary}08 0%,
          ${theme.colors.background} 50%,
          ${theme.colors.secondary}08 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated background circles */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-20%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.secondary}15 0%, transparent 70%)`,
          transform: `scale(${0.5 + gradientProgress * 0.5})`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-20%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.primary}15 0%, transparent 70%)`,
          transform: `scale(${0.5 + gradientProgress * 0.5})`,
          opacity: 0.5,
        }}
      />

      {/* Logo */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 24,
          background: theme.gradients.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          boxShadow: `0 20px 60px ${theme.colors.primary}40`,
        }}
      >
        {/* Lightning bolt icon */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: theme.colors.foreground,
          marginTop: 40,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        LeadFlow{" "}
        <span style={{ color: theme.colors.secondary }}>AI</span>
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: 28,
          color: theme.colors.muted,
          marginTop: 16,
          opacity: taglineOpacity,
          transform: `translateY(${(1 - taglineY) * 20}px)`,
        }}
      >
        Stop Losing Leads. Start Closing Deals.
      </p>
    </AbsoluteFill>
  );
};
