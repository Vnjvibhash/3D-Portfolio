import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("From submitted:", formData);
      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        {
          from_name: formData.name,
          to_name: "Ali",
          from_email: formData.email,
          to_email: "AliSanatiDev@gmail.com",
          message: formData.message,
        },
        "pn-Bw_mS1_QQdofuV"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };
  return (
    <section
      className="relative flex items-center justify-center c-space section-spacing"
      id="contact"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={'#ffffff'}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center w-full max-w-xl md:max-w-2xl p-6 sm:p-8 md:p-10 mx-auto border border-white/10 rounded-2xl bg-primary/90 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-start w-full gap-3 mb-8">
          <h2 className="text-heading">Let&apos;s Talk</h2>
          <p className="font-normal text-neutral-400 text-sm md:text-base">
            Whether you&apos;re looking to build a powerful new website, enhance
            your existing platform, or bring a unique idea to life, I&apos;m
            ready to turn your vision into reality.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 mb-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="field-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="field-input field-input-focus"
                placeholder="John Doe"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field-input field-input-focus"
                placeholder="JohnDoe@email.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <label htmlFor="message" className="field-label">
                Message
              </label>
              <span className="text-xs text-neutral-500">
                {formData.message.length}/500
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows="5"
              maxLength={500}
              className="field-input field-input-focus resize-none"
              placeholder="Share your project goals, ideas, or questions..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold text-center rounded-xl cursor-pointer bg-gradient-to-r from-royal via-lavender to-royal bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-lavender/25 hover:shadow-lavender/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed text-white shimmer-btn"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Sending your message...
              </>
            ) : (
              <>
                Send Message
                <img src="assets/arrow-right.svg" className="size-4 invert" alt="send" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
