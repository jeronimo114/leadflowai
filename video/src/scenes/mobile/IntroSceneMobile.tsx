import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

export const IntroSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoRotation = interpolate(frame, [0, 20], [-180, 0], {
    extrapolateRight: "clamp",
  });

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

  const gradientProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${180 + gradientProgress * 45}deg,
          ${theme.colors.primary}08 0%,
          ${theme.colors.background} 50%,
          ${theme.colors.secondary}08 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Background circles */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-30%",
          width: "80%",
          height: "40%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.secondary}15 0%, transparent 70%)`,
          transform: `scale(${0.5 + gradientProgress * 0.5})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-30%",
          width: "70%",
          height: "35%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.primary}15 0%, transparent 70%)`,
          transform: `scale(${0.5 + gradientProgress * 0.5})`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: 40,
          background: theme.gradients.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          boxShadow: `0 30px 80px ${theme.colors.primary}40`,
        }}
      >
        <svg
          width="80"
          height="80"
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
          fontSize: 84,
          fontWeight: 800,
          color: theme.colors.foreground,
          marginTop: 60,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 40}px)`,
          textAlign: "center",
        }}
      >
        LeadFlow{" "}
        <span style={{ color: theme.colors.secondary }}>AI</span>
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: 36,
          color: theme.colors.muted,
          marginTop: 24,
          opacity: taglineOpacity,
          transform: `translateY(${(1 - taglineY) * 30}px)`,
          textAlign: "center",
          lineHeight: 1.4,
          padding: "0 20px",
        }}
      >
        Stop Losing Leads.
        <br />
        Start Closing Deals.
      </p>
    </AbsoluteFill>
  );
};
