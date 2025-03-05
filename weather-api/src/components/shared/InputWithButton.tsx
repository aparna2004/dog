import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InputWithButtonProps = {
  btnText: string;
  placeholderText: string;
  onSubmit: () => void;
  onChange: (value: string) => void;
};

export const InputWithButton = ({
  btnText,
  placeholderText,
  onSubmit,
  onChange,
}: InputWithButtonProps) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholderText}
        onChange={(e) => onChange(e.target.value)}
        className="bg-purple-950 text-orange-300 border border-purple-800 placeholder-gray-500 focus:ring-purple-640"
      />
      <Button
        type="button"
        onClick={onSubmit}
        className="bg-purple-700 hover:bg-purple-600 text-orange-300 border border-purple-800"
      >
        {btnText}
      </Button>
    </div>
  );
};
