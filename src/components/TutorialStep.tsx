import { useCallback, useState } from "react";

import logo from "../assets/images/logos/laff_tracker_logo.png";
import tutorial1 from "../assets/images/tutorial/blueprintdrawing_page1.png";
import tutorial2 from "../assets/images/tutorial/blueprintdrawing_page2.png";
import tutorial3 from "../assets/images/tutorial/blueprintdrawing_page3.png";
import tutorial4 from "../assets/images/tutorial/blueprintdrawing_page4.png";

const tutorialPageText = [
  {
    title: "Laff Tracker 108-S : OPERATION MANUAL",
    text: `Congratulations on you or your employer's purchase of a brand new Laff Tracker unit, model number 108-S. Welcome to the brave new world of Digital Audience Augmentation (DAA)! You will have hours of fun adding real human responses to video clips of all sorts!`,
    imgSrc: tutorial1,
  },
  {
    title: "First Steps",
    text: `Initialize your unit using the convenient start button. Your Laff Tracker 108-S will begin showing you a series of images. Think about what kind of mood the images put you in, and how you might respond as a real viewer. You will have 20 Seconds to form your opinion.`,
    imgSrc: tutorial2,
  },
  {
    title: "Selecting Audience Sounds",
    text: `Using our patented Dial-A-Sound system, enter the code corresponding to the most appropriate sound effect for the images. Each Dial-A-Sound code uses all four buttons exactly once. Be sure you make a selection before the timer runs out!`,
    imgSrc: tutorial3,
  },
  {
    title: "Playback and Review",
    text: `The machine will then play each video clip, with your audience responses mixed into the audio. Review the results to see if you chose the correct sounds. These are defined by your employer and/or regional Digital Audience Augmentation Board (DAAB).`,
    imgSrc: tutorial4,
  },
];

interface Props {
  goToNextScene: () => void;
}

export function TutorialStep({ goToNextScene }: Props) {
  const [curStepIdx, setCurStepIdx] = useState(0);

  const isFirstStep = curStepIdx === 0;
  const isFinalStep = curStepIdx + 1 === tutorialPageText.length;

  const handleNextStep = useCallback(() => {
    if (isFinalStep) {
      goToNextScene();
    } else {
      setCurStepIdx((prev) => prev + 1);
    }
  }, [isFinalStep, goToNextScene]);

  const handlePrevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurStepIdx((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const currentStep = tutorialPageText[curStepIdx];

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={logo} className="h-32"></img>
      <section className="flex flex-col items-start blueprint-background border-white rounded-xl border-4 chalk-border p-8">
        <h1 className="text-5xl font-chalk">{currentStep.title}</h1>
        <div className="flex items-center gap-8 h-72">
          <div className="text-4xl font-handwritten-sm text-left">
            {currentStep.text}
          </div>
          <img src={currentStep.imgSrc} className="h-64 w-auto" />
        </div>
      </section>
      <div className="flex">
        <button
          onClick={handlePrevStep}
          disabled={isFirstStep}
          className="bg-black hover:bg-white text-white hover:text-black font-handwritten font-bold text-3xl py-4 px-24 rounded-full disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNextStep}
          className="bg-black hover:bg-white text-white hover:text-black font-handwritten font-bold text-3xl py-4 px-24 rounded-full"
        >
          {isFinalStep ? "Start" : "Next"}
        </button>
      </div>
    </div>
  );
}
