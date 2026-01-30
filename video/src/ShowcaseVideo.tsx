import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { CTAScene } from "./scenes/CTAScene";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const ShowcaseVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: theme.colors.background,
      }}
    >
      {/* Scene 1: Intro/Logo (0-3s) */}
      <Sequence from={0} durationInFrames={3 * fps} premountFor={fps}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Problem Statement (3-7s) */}
      <Sequence from={3 * fps} durationInFrames={4 * fps} premountFor={fps}>
        <ProblemScene />
      </Sequence>

      {/* Scene 3: Solution Overview (7-10s) */}
      <Sequence from={7 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <SolutionScene />
      </Sequence>

      {/* Scene 4: Features (10-13s) */}
      <Sequence from={10 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 5: CTA (13-15s) */}
      <Sequence from={13 * fps} durationInFrames={2 * fps} premountFor={fps}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
