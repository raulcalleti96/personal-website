function Contact() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-[#121212] rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-white">Contact Me</h1>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 p-3 bg-gray-800 text-gray-300 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 bg-gray-800 text-gray-300 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="w-full mb-4 p-3 bg-gray-800 text-gray-300 rounded border border-gray-600 focus:outline-none focus:ring focus:ring-teal-400"
          ></textarea>
          <button className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-black font-semibold py-3 rounded hover:from-green-500 hover:to-blue-500 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;