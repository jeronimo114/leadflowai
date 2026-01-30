import { Composition, Folder } from "remotion";
import { ShowcaseVideo } from "./ShowcaseVideo";
import { ShowcaseVideoMobile } from "./ShowcaseVideoMobile";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="LeadFlow">
        <Composition
          id="ShowcaseVideo"
          component={ShowcaseVideo}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ShowcaseVideoMobile"
          component={ShowcaseVideoMobile}
          durationInFrames={450}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
