import { useCallback, useState } from "react";

const tutorialPageText = [
  [
    "./images/tutorialImg1",
    "Laff Tracker 108-S : OPERATION MANUAL",
    `Congratulations on you or your employer's purchase of a brand new Laff Tracker unit, model number 108-S. Welcome to the brave new world of Digital Audience Augmentation (DAA)! You will have hours of fun adding real human responses to video clips of all sorts!`,
  ],
  [
    "./images/tutorialImg2",
    "First Steps",
    `Initialize your unit using the convenient start button. Your Laff Tracker 108-S will begin showing you a series of images. Think about what kind of mood the images put you in, and how you might respond as a real viewer. You will have 20 Seconds to form your opinion.`,
  ],
  [
    "./images/tutorialImg3",
    "Selecting Audience Sounds",
    `Using our patented Dial-A-Sound system, enter the code corresponding to the most appropriate sound effect for the images. Each Dial-A-Sound code uses all four buttons exactly once. Be sure you make a selection before the timer runs out!`,
  ],
  [
    "./images/tutorialImg4",
    "Playback and Review",
    `The machine will then play each video clip, with your audience responses mixed into the audio. Review the results to see if you chose the correct sounds. These are defined by your employer and/or regional Digital Audience Augmentation Board (DAAB).`,
  ],
];

interface Props {
  goToNextScene: () => void;
}

export function TutorialStep({ goToNextScene }: Props) {
  const [curStepIdx, setCurStepIdx] = useState(0);

  const goToNextStep = useCallback(() => {
    if (curStepIdx + 1 === tutorialPageText.length) {
      goToNextScene();
    } else {
      setCurStepIdx((i) => i + 1);
    }
  }, [goToNextScene, curStepIdx]);

  return (
    <div className="flex flex-col items-center gap-4">
      <img src="src/assets/images/logos/laff_tracker_logo.png"></img>
      <section>
        <h1>{tutorialPageText[curStepIdx][1]}</h1>
        <div>{tutorialPageText[curStepIdx][2]}</div>
        <img src={tutorialPageText[curStepIdx][0]} />
      </section>
      <button
        onClick={goToNextStep}
        className="bg-black hover:bg-white text-white hover:text-black font-handwritten font-bold text-3xl py-4 px-24 rounded-full"
      >
        Next
      </button>
    </div>
  );
}
