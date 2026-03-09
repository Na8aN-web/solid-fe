
const ContactUs = () => {
  return (
    <div>
      <section className="relative bg-black py-[60px] px-5 lg:px-14 w-full">
        <div className="space-y-6">
          <button className="bg-customGold w-full lg:w-[265px] h-[65px] lg:h-[70px] rounded-[10px] text-base font-semibold text-black">
            Contact Us - Solid Spare Parts
          </button>
          <h1 className="text-[32px] lg:text-[40px] text-white font-semibold">
            Driving Reliability: Your Trusted Partner for Quality{" "}
            <span className="text-customGold">Spare Parts</span>
          </h1>
        </div>
      </section>
      <div className="p-5 sm:p-10 lg:p-14">
        <section className="py-8 flex flex-col gap-6 items-center justify-between lg:flex-row lg:pb-14">
          <div className="bg-[#F1F1F1] flex gap-4 py-4 px-5 items-start border rounded-[40px] w-full lg:max-w-[405px] h-[125px]">
            <img src="/addressadd.svg" alt="" className="w-[24px]" />
            <div className="space-y-3">
              <p className="text-primary text-base font-normal">Address</p>
              <p className="text-xl text-primary font-semibold">
                2972 Westheimer Rd. Santa Ana, Illinois 85486
              </p>
            </div>
          </div>
          <div className="bg-[#FFF6D9] flex gap-4 py-4 px-5 items-start border rounded-[40px] w-full lg:max-w-[405px] h-[125px]">
            <img src="/phoneadd.svg" alt="" className="w-[24px]" />
            <div className="space-y-1">
              <p className="text-primary text-base font-normal">Phone</p>
              <p className="text-xl text-primary font-semibold">08012300000</p>
              <p className="text-xl text-primary font-semibold">070123456789</p>
            </div>
          </div>
          <div className="bg-[#FFE7D9] flex gap-4 py-4 px-5 items-start border rounded-[40px] w-full lg:max-w-[405px] h-[125px]">
            <img src="/emailadd.svg" alt="" className="w-[24px]" />
            <div className="space-y-1">
              <p className="text-primary text-base font-normal">Email</p>
              <p className="text-xl text-primary font-semibold">
                tanya.hill@example.com
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8 py-8 lg:flex-row">
          <img src="/contactImg.svg" alt="" className="flex-1" />
          <div className="flex-1">
            <form
              action=""
              className="border p-4 sm:px-6 sm:py-12 rounded-[40px]"
            >
              <h2 className="text-xl text-customBrown font-bold pb-2">
                Get In Touch
              </h2>
              <p className="text-sm text-customBrown font-normal">
                Your email address will not be published. Required fields are
                marked*
              </p>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="leading-8 text-sm text-customBrown font-normal"
                  >
                    First Name*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="First Name"
                    className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="leading-8 text-sm text-customBrown font-normal"
                  >
                    Last Name*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="leading-8 text-sm text-customBrown font-normal"
                  >
                    Email Address*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email address"
                    className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="leading-8 text-sm text-customBrown font-normal"
                  >
                    Comment*
                  </label>
                  <textarea
                    name=""
                    id=""
                    rows={4}
                    placeholder="Write your comment"
                    className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <input type="checkbox" name="" id="" className="w-5 h-5" />
                  <p className="text-sm text-primary font-normal">
                    I accept all{" "}
                    <span className="font-semibold">terms & conditions</span>
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-primary rounded-lg p-4 w-full text-base text-white"
                >
                  Submit Now
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
