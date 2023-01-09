import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import * as React from "react";
import { date } from "zod";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";

enum difficulty {
  beginner = "beginner",
  intermediate = "intermediate",
  advanced = "advanced",
}

const initialValues = {
  capacity: 0,
  price: 0,
  category: "General Fitness",
  difficulty: "beginner" as difficulty,
  time: "",
  duration: 0,
  date: "",
  title: "",
  description: "",
};

export const useCreateClass = () => {
  const addClass = trpc.class.addClass.useMutation({});
  const [input, setInput] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({
    capacity: "",
    price: "",
    time: "",
    duration: "",
    date: "",
    title: "",
    description: "",
  });
  const [submit, setSubmit] = React.useState(false);
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (["capacity", "price", "duration"].includes(event.target.name)) {
      setInput({
        ...input,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setInput({ ...input, [event.target.name]: event.target.value });
    }
  };
  const validateInput = () => {
    let isValid = true;
    if (input.capacity <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        capacity: "Capacity must be a positive number",
      }));
      isValid = false;
    }
    if (input.price < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price must be a positive number",
      }));
      isValid = false;
    }
    if (!input.time) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        time: "Time is required",
      }));
      isValid = false;
    }
    if (input.duration <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        duration: "Duration must be a positive number",
      }));
      isValid = false;
    }
    if (!input.date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Date is required",
      }));
      isValid = false;
    }
    if (!input.title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required",
      }));
      isValid = false;
    }
    if (!input.description) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Title is required",
      }));
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Reset error messages
    setErrors({
      capacity: "",
      price: "",
      time: "",
      duration: "",
      date: "",
      title: "",
      description: "",
    });
    const valid = validateInput();
    if (!valid) {
      return;
    } else {
      //SUBMIT HERE
      addClass.mutateAsync(input);
      setInput(initialValues);
      setSubmit(true);
      setTimeout(() => {
        setSubmit(false);
      }, 3000);
    }
  };
  return {
    setInput,
    input,
    errors,
    setErrors,
    handleSubmit,
    handleChange,
    submit,
  };
};

const FitnessClassForm: NextPage = () => {
  const { input, errors, setInput, handleSubmit, handleChange, submit } =
    useCreateClass();
  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md pt-6 pb-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-lg font-bold">
            Title:
          </label>
          <input
            type="string"
            id="capacity"
            value={input.title}
            name="title"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p data-testId="error" className="mt-2 text-xs italic text-red-500">
              {errors.title}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-lg font-bold">
            Description:
          </label>
          <input
            type="string"
            id="capacity"
            value={input.description}
            name="description"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="capacity" className="mb-2 block text-lg font-bold">
            Capacity:
          </label>
          <input
            type="number"
            id="capacity"
            value={input.capacity}
            name="capacity"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.capacity ? "border-red-500" : ""
            }`}
          />
          {errors.capacity && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.capacity}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-lg font-bold">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={input.price}
            name="price"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="mt-2 text-xs italic text-red-500">{errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-lg font-bold">
            Category:
          </label>
          <select
            id="category"
            value={input.category}
            name="category"
            onChange={(event) => handleChange(event)}
            className={`w-full cursor-pointer appearance-none rounded border py-2 px-3 `}
          >
            <option value="General Fitness">General Fitness</option>
            <option value="Yoga">Yoga</option>
            <option value="Weights">Weights</option>
            <option value="Dance">Dance</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-lg font-bold">
            Difficulty:
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-lg font-bold ${
                input.difficulty === "beginner"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() =>
                setInput({ ...input, difficulty: difficulty.beginner })
              }
            >
              Beginner
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-lg font-bold ${
                input.difficulty === "intermediate"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() =>
                setInput({ ...input, difficulty: difficulty.intermediate })
              }
            >
              Intermediate
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-lg font-bold ${
                input.difficulty === "advanced"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() =>
                setInput({ ...input, difficulty: difficulty.advanced })
              }
            >
              Advanced
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-lg font-bold">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={input.date}
            name="date"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.date ? "border-red-500" : ""
            }`}
          />
          {errors.date && (
            <p className="mt-2 text-xs italic text-red-500">{errors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="mb-2 block text-lg font-bold">
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={input.time}
            name="time"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.time ? "border-red-500" : ""
            }`}
          />
          {errors.time && (
            <p className="mt-2 text-xs italic text-red-500">{errors.time}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="mb-2 block text-lg font-bold">
            Duration (minutes):
          </label>
          <input
            type="number"
            id="duration"
            value={input.duration}
            name="duration"
            onChange={(event) => handleChange(event)}
            className={`w-full rounded border py-2 px-3 ${
              errors.duration ? "border-red-500" : ""
            }`}
          />
          {errors.duration && (
            <p
              className="mt-2 text-xs italic text-red-500"
              data-testid="duration-error"
            >
              {errors.duration}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="focus:shadow-outline-blue rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none active:bg-blue-800 disabled:bg-blue-200"
            disabled={submit}
          >
            Create Fitness Class
          </button>
        </div>
        {submit && (
          <div className="m-auto mt-4 w-3/4 rounded-lg bg-green-600 text-center text-white">
            Class Created!
          </div>
        )}
      </form>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);
  if (!session || session.user?.role !== "INSTRUCTOR") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default FitnessClassForm;
