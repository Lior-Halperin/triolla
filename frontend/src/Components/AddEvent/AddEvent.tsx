import { IEventModel } from "../../Models/eventModel";
import {
  StyledButton,
  StyledErrorMessage,
  StyledForm,
  StyledInput,
  StyledWrapper,
} from "./AddEvent.Styled";
import { useForm } from "react-hook-form";
import eventsService from "../../Services/EventsService";

function AddEventView(): JSX.Element {

  // const { register, handleSubmit, StyledFormState } = useStyledFormAction<IEventModel>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEventModel>();


  async function onSubmit(event: IEventModel) {
    try {
      await eventsService.addEvent(event);
      console.log(event);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title:</label>
        <StyledInput
          id="title"
          {...register("title", { required: "title is required" })}
        />
        {errors.title && (
          <StyledErrorMessage>{errors.title.message}</StyledErrorMessage>
        )}

        <label htmlFor="description">Description:</label>
        <StyledInput
          id="description"
          {...register("description", {
            required: "date description is required",
          })}
        />
        {errors.description && (
          <StyledErrorMessage>{errors.description.message}</StyledErrorMessage>
        )}

        <label htmlFor="dateAndTime">DateAndTime:</label>
        <StyledInput
          id="dateAndTime"
          {...register("dateAndTime", { required: "dateAndTime is required" })}
        />
        {errors.dateAndTime && (
          <StyledErrorMessage>{errors.dateAndTime.message}</StyledErrorMessage>
        )}

        <label htmlFor="location">Location:</label>
        <StyledInput
          id="location"
          {...register("location", { required: "location is required" })}
        />
        {errors.location && (
          <StyledErrorMessage>{errors.location.message}</StyledErrorMessage>
        )}

        <StyledButton type="submit">Add Event</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
}

export default AddEventView;
