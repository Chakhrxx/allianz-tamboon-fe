import { useForm } from "react-hook-form";
import TextField from "@/components/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AllianzLogo from "@/assets/svgs/Allianz-Ayudhya-Logo.svg";
import BgMainImage from "@/assets/svgs/Tambbon-Login-bg.svg";
import UsernameIcon from "@/assets/svgs/username-icon.svg";
import PasswordIcon from "@/assets/svgs/password-icon.svg";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import { authService } from "@/services/auth";
import { useNavigate } from "react-router";
import LoginCoverPage from "./components/LoginCoverPage";
import { isAxiosError } from "axios";
import TermsModal from "./components/TermsModal";
import { useProfile } from "@/hooks/useProfile";

const validationSchema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().min(6).required(),
});

function LoginPage() {
  const navigate = useNavigate();
  const { refetch: refetchProfile } = useProfile({ enabled: false });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showLoginCoverPage, setShowLoginCoverPage] = useState(true);
  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const shouldSubmitBtnDisabled = useMemo(
    () => !isValid || isSubmitting,
    [isSubmitting, isValid]
  );
  const onSubmit = handleSubmit(async (data) => {
    const loginData = await signIn(data.username, data.password);

    if (!loginData!.profile.activatedDate) {
      setShowTermsModal(true);
      return;
    }

    navigate("/");
  });

  const handleTermsAccepted = async () => {
    await authService.activate();
    setShowTermsModal(false);
    navigate("/");
  };

  const signIn = async (username: string, password: string) => {
    try {
      const { accessToken } = await authService.login(username, password);
      localStorage.setItem("token", accessToken);
      const { data } = await refetchProfile();
      return data;
    } catch (error) {
      reset(undefined, { keepValues: true });

      if (!isAxiosError(error)) {
        console.error(error);
        return;
      }

      if (error.response?.status === 401) {
        setError("username", { message: "Invalid username or password" });
        setError("password", { message: "Invalid username or password" });
      }
    }
  };

  return showLoginCoverPage ? (
    <LoginCoverPage onClose={() => setShowLoginCoverPage(false)} />
  ) : (
    <>
      <div className="relative flex flex-col h-full">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full"
          src={BgMainImage}
          alt="Main background"
        />
        <img
          className="relative max-w-[300px] mx-auto z-10 pt-28  pb-8"
          src={AllianzLogo}
          alt="Allianz Ayudhya Logo"
        />

        <form className="relative space-y-3 z-20  p-20" onSubmit={onSubmit}>
          <div className=" relative text-white pb-10">
            <div className=" text-3xl">Welcome! </div>
            <div className=" text-xl font-thin">Sign in to continue</div>
          </div>
          <div className="space-y-1">
            <label className="text-white">Username</label>
            <div className="relative">
              <TextField
                {...register("username")}
                className="w-full bg-[#4A4DE7] bg-opacity-40 placeholder-white placeholder-opacity-50 px-11"
                placeholder="Hello@allianz.co.th"
                error={errors.username?.message}
              />
              <span className="absolute top-0 left-0 px-1 flex">
                <img
                  src={UsernameIcon}
                  alt="Username Icon"
                  className="fill-current text-white w-10 h-10 opacity-90"
                />
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-white">Password</label>
            <div className="relative">
              <TextField
                {...register("password")}
                className="w-full bg-[#4A4DE7] bg-opacity-40 placeholder-white placeholder-opacity-50 px-11 placeholder-center item-center"
                type="password"
                placeholder="********"
                error={errors.password?.message}
              />
              <span className="absolute top-0 left-0 px-1 flex">
                <img
                  src={PasswordIcon}
                  alt="Password Icon"
                  className="fill-current text-white w-10 h-10 opacity-90"
                />
              </span>
            </div>
          </div>
          <small className="block text-center text-red-500 font-medium mt-2">
            {errors.root?.message}
          </small>
          <Button
            className="relative w-full !mt-12 rounded-full"
            disabled={shouldSubmitBtnDisabled}
            variant="violet"
          >
            LOGIN
          </Button>
        </form>
      </div>
      <TermsModal
        isOpen={showTermsModal}
        onAccept={handleTermsAccepted}
        onClose={() => setShowTermsModal(false)}
      />
    </>
  );
}

export default LoginPage;
