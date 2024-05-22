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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center "
      >
        <p className="text-[#6F5F5F] font-normal my-2">
          Please fill in your new name
        </p>
        <TextField
          {...register("name")}
          className="w-full bg-white border border-[#6F5F5F] !text-[#6F5F5F]"
          error={errors.name?.message}
        />
        <Button
          className=" !py-2 text-primary mt-6 !normal-case rounded-full"
          disabled={shouldButtonDisabled}
        >
          Update
        </Button>
      </form>
    </>
  );
}

export default ChangeNameForm;
