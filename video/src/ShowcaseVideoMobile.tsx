import {
  AbsoluteFill,
  useVideoConfig,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { theme } from "./theme";
import { IntroSceneMobile } from "./scenes/mobile/IntroSceneMobile";
import { ProblemSceneMobile } from "./scenes/mobile/ProblemSceneMobile";
import { SolutionSceneMobile } from "./scenes/mobile/SolutionSceneMobile";
import { FeaturesSceneMobile } from "./scenes/mobile/FeaturesSceneMobile";
import { CTASceneMobile } from "./scenes/mobile/CTASceneMobile";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const ShowcaseVideoMobile: React.FC = () => {
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
        <IntroSceneMobile />
      </Sequence>

      {/* Scene 2: Problem Statement (3-7s) */}
      <Sequence from={3 * fps} durationInFrames={4 * fps} premountFor={fps}>
        <ProblemSceneMobile />
      </Sequence>

      {/* Scene 3: Solution Overview (7-10s) */}
      <Sequence from={7 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <SolutionSceneMobile />
      </Sequence>

      {/* Scene 4: Features (10-13s) */}
      <Sequence from={10 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <FeaturesSceneMobile />
      </Sequence>

      {/* Scene 5: CTA (13-15s) */}
      <Sequence from={13 * fps} durationInFrames={2 * fps} premountFor={fps}>
        <CTASceneMobile />
      </Sequence>
    </AbsoluteFill>
  );
};
