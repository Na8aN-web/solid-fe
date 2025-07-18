import FormInput from "./FormInput";

const AddNewUser = () => {
  return (
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
      <h2
        className="text-[24px] font-semibold text-customBrown pb-4"
      >
        Add a user for a new role
      </h2>
      <form action="" className="space-y-2">
        <div className="flex justify-between w-full gap-4">
          <FormInput
            id="first-name"
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            required
          />
          <FormInput
            id="last-name"
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            required
          />
        </div>

        <FormInput
          id="email"
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />

        <div className="w-full">
          <label
            htmlFor="role"
            className="leading-8 text-sm text-customBrown font-normal"
          >
            Select a Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>
              Please Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="wholesaler">Wholesaler</option>
          </select>
        </div>

        <FormInput
          id="password"
          label="Create Password for User"
          name="password"
          type="password"
          placeholder="Enter password"
          required
        />

        <div className="flex items-center gap-2 pt-2 pb-6">
          <input
            id="send-notification"
            name="sendNotification"
            type="checkbox"
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="send-notification"
            className="text-sm text-customBrown font-normal"
          >
            Send a notification to the user for this new role
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary w-[162px] h-[58px] rounded-[16px] font-bold text-base text-customLight"
          >
            Add New User
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddNewUser;
