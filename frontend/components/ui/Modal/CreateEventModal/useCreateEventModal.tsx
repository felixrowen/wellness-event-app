import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { EVENT_CATEGORY, ICreateEventDTO } from "@/types";

const createEventSchema: Yup.ObjectSchema<ICreateEventDTO> = Yup.object({
  title: Yup.string().required("Event title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.number().required("Category is required"),
  assignedVendorId: Yup.string().required("Please select a vendor"),
  proposedDates: Yup.array().of(Yup.string().required()).optional(),
  location: Yup.string().optional(),
}) as Yup.ObjectSchema<ICreateEventDTO>;

interface UseCreateEventModalProps {
  onSubmit: (eventData: ICreateEventDTO) => void;
}

export function useCreateEventModal({ onSubmit }: UseCreateEventModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ICreateEventDTO>({
    resolver: yupResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: EVENT_CATEGORY.HEALTH_SCREENING,
      proposedDates: [],
      location: "",
      assignedVendorId: "",
    },
  });

  const proposedDates = watch("proposedDates") || [];

  const handleAddProposedDate = () => {
    if ((proposedDates?.length || 0) < 3) {
      setValue("proposedDates", [...proposedDates, ""]);
    }
  };

  const handleRemoveProposedDate = (index: number) => {
    const newDates = proposedDates?.filter((_, i) => i !== index) || [];

    setValue("proposedDates", newDates);
  };

  const handleProposedDateChange = (index: number, value: string) => {
    const newDates = [...proposedDates];

    newDates[index] = value;
    setValue("proposedDates", newDates);
  };

  const onSubmitForm = (data: ICreateEventDTO) => {
    const validDates =
      data.proposedDates?.filter((date) => date && date.trim() !== "") || [];

    const payload = {
      ...data,
      proposedDates: validDates.length > 0 ? validDates : undefined,
    };

    onSubmit(payload);
    reset();
  };

  return {
    control,
    handleSubmit,
    reset,
    errors,
    proposedDates,
    handleAddProposedDate,
    handleRemoveProposedDate,
    handleProposedDateChange,
    onSubmitForm,
  };
}
