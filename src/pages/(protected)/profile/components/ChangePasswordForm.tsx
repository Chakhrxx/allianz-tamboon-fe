import TextField from "@/components/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useMemo } from "react";

type FormValues = {
  newPassword: string;
  confirmNewPassword: string;
};

type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

const validationSchema = yup.object().shape({
  newPassword: yup.string().min(6).required(),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required(),
});

export default function ChangePasswordForm({ onSubmit }: Props) {
  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const shouldButtonDisabled = useMemo(() => {
    return !isValid || isSubmitting;
  }, [isSubmitting, isValid]);

  return (
    <form
      className="flex flex-col items-center  "
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-[#6F5F5F] font-normal my-2">
        กรุณากรอกรหัสผ่านใหม่ของคุณ
      </p>
      <TextField
        {...register("newPassword")}
        error={errors.newPassword?.message}
        className="w-full bg-white border border-[#6F5F5F] !text-[#6F5F5F]"
        type="password"
      />
      <p className="text-[#6F5F5F] font-normal my-2">
        กรุณายืนยันรหัสผ่านของคุณ
      </p>
      <TextField
        {...register("confirmNewPassword")}
        error={errors.confirmNewPassword?.message}
        className="w-full bg-white border border-[#6F5F5F] !text-[#6F5F5F]"
        type="password"
      />
      <Button
        className=" !py-2 text-primary mt-6 !normal-case rounded-full"
        disabled={shouldButtonDisabled}
      >
        Update
      </Button>
    </form>
  );
}
