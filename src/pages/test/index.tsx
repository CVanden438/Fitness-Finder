import { type NextPage } from "next";
import { signOut, useSession, signIn } from "next-auth/react";

const Test: React.FC = () => {
  const { data: sessionData } = useSession();
  //   if (!sessionData) {
  //     return <p>No user!</p>;
  //   }
  return (
    <>
      <p>CRUD Test</p>
    </>
  );
};

export default Test;
