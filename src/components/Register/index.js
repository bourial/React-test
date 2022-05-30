import RegisterEmail from "./RegisterEmail";
import { useState } from "react";
import RegisterConfirm from "./RegisterConfirm";
import RegisterPassword from "./RegisterPassword";

export default function Login() {
  const [step, setStep] = useState(1);

  const toStep2 = () => setStep(2);
  const toStep1 = () => setStep(1);
  const toStep3 = () => setStep(3);

  return (
    <div>
      {step === 1 && <RegisterEmail toStep2={toStep2} />}
      {step === 2 && <RegisterConfirm toStep1={toStep1} toStep3={toStep3} />}
      {step === 3 && <RegisterPassword toStep2={toStep2} />}
    </div>
  );
}
