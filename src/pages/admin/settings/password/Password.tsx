import React from "react";

const Password = () => {
  return (
    <div>
      <section className="border-2 px-8 py-6">
        <h2 className="text-base font-semibold text-customBrown pb-4">Change Password</h2>
        <form action="" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="leading-8 text-sm text-customBrown font-normal"
            >
              Current Password
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Current Password"
              className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="leading-8 text-sm text-customBrown font-normal"
            >
              New Password
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="New Password"
              className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="leading-8 text-sm text-customBrown font-normal"
            >
              Confirm Password
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Confirm Password"
              className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button className="w-full h-[60px] bg-primary rounded-lg text-customLight text-base font-semibold">
            Confirm
          </button>
        </form>
      </section>
    </div>
  );
};

export default Password;
