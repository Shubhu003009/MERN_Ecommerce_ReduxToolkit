import { useSelector } from "react-redux";
import { selectUserInfo } from "../userSlice";

const UserProfile = () => {
  const user = useSelector(selectUserInfo);

  let handleEdit = () => {};
  let handleRemove = (e, index) => {};

  return (
    <div className=" mx-auto mt-16 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h3 className="text-3xl my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
        Name: {user.fullName ? user.fullName : "new user"}
      </h3>
      <h3 className="text-lg my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
        Email address: {user.email}
      </h3>

      <div className="border-t border-gray-200 px-2 py-6 sm:px-6">
        <p className="mt-0.5 text-xl  font-semibold mb-5">My Addresses:</p>

        {user.addresses.map((address, i) => (
          <div key={i} className="mb-8">
            <h3 className="text-xl pb-1">Address: {i + 1} </h3>
            <div className="flex  px-2 my-2 justify-between gap-x-6 py-3 border-solid border-2 border-gray-300 rounded-md">
              <div className="min-w-0 flex-auto">
                <p className="text-sm  font-semibold leading-6 text-gray-900">
                  FullName: {address.fullName}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>Phone:</strong> {address.phone}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>address:</strong> {address.street}
                </p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>email:</strong> {address.email}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>city:</strong> {address.city}{" "}
                  <strong>pincode:</strong> {address.pincode}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>state:</strong> {address.state}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {address.pinCode}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => handleEdit(e, i)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => handleRemove(e, i)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
