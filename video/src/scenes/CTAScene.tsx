import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background pulse
  const pulse = Math.sin(frame / 10) * 0.02 + 1;

  // Content animations
  const contentOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const contentScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Button animation
  const buttonScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const buttonGlow = interpolate(frame, [30, 45, 60], [0, 1, 0], {
    extrapolateLeft: "clamp",
  });

  // Logo animation
  const logoRotation = interpolate(frame, [0, 60], [0, 360], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        overflow: "hidden",
      }}
    >
      {/* Animated background shapes */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-20%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.secondary}30 0%, transparent 70%)`,
          transform: `scale(${pulse})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-20%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}20 0%, transparent 70%)`,
          transform: `scale(${pulse})`,
        }}
      />

      {/* Content */}
      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 40px",
            backdropFilter: "blur(10px)",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `rotate(${logoRotation * 0.1}deg)`,
            }}
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>

        <h2
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            marginBottom: 24,
            lineHeight: 1.1,
          }}
        >
          Ready to stop leaving
          <br />
          money on the table?
        </h2>

        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
            marginBottom: 48,
          }}
        >
          Join agencies that close more deals with less effort.
        </p>

        {/* CTA Button */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "20px 48px",
            background: theme.colors.accent,
            borderRadius: 16,
            transform: `scale(${Math.max(0, buttonScale)})`,
            boxShadow: `0 20px 60px ${theme.colors.accent}${Math.round(40 + buttonGlow * 30).toString(16)},
                        0 0 ${40 + buttonGlow * 40}px ${theme.colors.accent}${Math.round(30 + buttonGlow * 40).toString(16)}`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "white",
            }}
          >
            Book Your Demo
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        {/* Website URL */}
        <p
          style={{
            marginTop: 32,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          leadflow.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};
