import React from "react";

const EmailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
};

const PassIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
};

const EyeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

const Test = () => {
  return (
    <section className="grid h-screen justify-center bg-black text-white">
      <div className="mt-10 flex w-[500px] flex-col gap-2 bg-gray-800 p-4">
        <h2 className="text-3xl font-bold">Sign in</h2>
        <form className="flex flex-col gap-2">
          <fieldset>
            <label htmlFor="email">Email</label>
            <div className="relative">
              <div className="absolute top-1/2 left-1 -translate-y-1/2">
                <EmailIcon />
              </div>
              <input
                type="text"
                id="email"
                className="w-full rounded-sm border border-gray-300/50 bg-transparent pb-1 pt-1 pr-1 pl-8"
              />
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute top-1/2 left-1 -translate-y-1/2">
                <PassIcon />
              </div>
              <div className="absolute top-1/2 right-1 -translate-y-1/2">
                <EyeIcon />
              </div>
              <input
                type="text"
                id="password"
                className="w-full rounded-sm border border-gray-300/50 bg-transparent pb-1 pt-1 pr-8 pl-8"
              />
            </div>
          </fieldset>
          <a href="#" className="underline">
            I forgot my password
          </a>
          <button className="rounded-full bg-white p-1 text-black">
            Sign In
          </button>
          <p className="text-center">- OR -</p>
        </form>
        <div className="relative">
          <img
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt="google icon"
            height={25}
            width={25}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
          <button className="w-full rounded-full border border-white/50 p-1">
            Sign In With Google
          </button>
        </div>
        <div className="relative">
          <img
            src="https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png"
            alt="google icon"
            height={25}
            width={25}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
          <button className="w-full rounded-full border border-white/50 p-1">
            Sign In With Discord
          </button>
        </div>
        <div className="">
          <p className="mr-1 inline w-fit">No Account?</p>
          <a href="#" className="w-fit underline">
            Create One
          </a>
        </div>
      </div>
    </section>
  );
};

export default Test;
