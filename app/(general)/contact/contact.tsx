import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <main className="hero min-h-[calc(100vh-80px)]  py-4">
      <section className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 ">Contact Us</h1>
        <div className="max-w-md w-full ">
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
