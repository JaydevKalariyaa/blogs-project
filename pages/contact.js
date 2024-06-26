import ContactForm from "../components/contact/contact-form";

import { getSession } from "next-auth/react";

export default function ContactPage() {
  return (
    <>
      <ContactForm />
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
