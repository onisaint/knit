import { FC, useState } from "react";
import { AppContainer } from "../../components/AppContainer";
import { Logo } from "../../components/Logo";
import { LoginView } from "./login";
import { SignupView } from "./signup";

export const RegisterView: FC = () => {
  const [showSignupFlow, setShowSignupFlow] = useState(false);

  const toggleFlow = () => setShowSignupFlow(!showSignupFlow);

  return (
    <AppContainer>
      <div className="p-8 mt-16 border-2 flex items-start">
        <div className="w-1/2 pr-10">
          <Logo size="big" />
          <p className="text-2xl font-sans text-gray-600">
            Task management to the point
          </p>
        </div>
        <div className="w-1/2 border-l-2 pl-4">
          {showSignupFlow ? (
            <SignupView toggleLogin={toggleFlow} />
          ) : (
            <LoginView toggleSignUp={toggleFlow} />
          )}
        </div>
      </div>
    </AppContainer>
  );
};
