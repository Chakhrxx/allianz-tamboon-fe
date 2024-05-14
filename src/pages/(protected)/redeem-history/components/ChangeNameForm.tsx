import TextField from "@/components/TextField";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/Button";
import { useMemo } from "react";

type FormValues = {
  name: string;
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Display name must be at most 20 characters")
    .trim()
    .required(),
});

// SubmitHandler by validation schema type
type Props = {
  onSubmit: SubmitHandler<FormValues>;
};

function ChangeNameForm({ onSubmit }: Props) {
  const {
    formState: { errors, isSubmitting, isValid },
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Change Name Form */}
      <label className="text-white">แก้ไขชื่อของคุณ</label>
      <TextField
        {...register("name")}
        className="w-full"
        error={errors.name?.message}
      />
      <Button
        className="w-full !py-2 text-primary mt-6"
        variant="warning"
        disabled={shouldButtonDisabled}
      >
        Submit
      </Button>
    </form>
  );
}

export default ChangeNameForm;
