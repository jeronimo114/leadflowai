import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../../theme";

export const CTASceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = Math.sin(frame / 10) * 0.02 + 1;

  const contentOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const contentScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const buttonScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const buttonGlow = interpolate(frame, [30, 45, 60], [0, 1, 0], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* Background shapes */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-40%",
          width: "100%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.secondary}30 0%, transparent 70%)`,
          transform: `scale(${pulse})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-40%",
          width: "100%",
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
            width: 100,
            height: 100,
            borderRadius: 28,
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 50px",
            backdropFilter: "blur(10px)",
          }}
        >
          <svg
            width="50"
            height="50"
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

        <h2
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            marginBottom: 30,
            lineHeight: 1.15,
          }}
        >
          Ready to stop
          <br />
          leaving money
          <br />
          on the table?
        </h2>

        <p
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.8)",
            marginBottom: 60,
            lineHeight: 1.4,
          }}
        >
          Join agencies that close
          <br />
          more deals with less effort.
        </p>

        {/* CTA Button */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "28px 56px",
            background: theme.colors.accent,
            borderRadius: 20,
            transform: `scale(${Math.max(0, buttonScale)})`,
            boxShadow: `0 20px 60px ${theme.colors.accent}${Math.round(40 + buttonGlow * 30).toString(16)},
                        0 0 ${40 + buttonGlow * 40}px ${theme.colors.accent}${Math.round(30 + buttonGlow * 40).toString(16)}`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "white",
            }}
          >
            Book Your Demo
          </span>
          <svg
            width="28"
            height="28"
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
            marginTop: 50,
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          leadflow.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};
