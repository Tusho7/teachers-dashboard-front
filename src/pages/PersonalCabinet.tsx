const PersonalCabinet = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        პირადი კაბინეტი
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src="path_to_profile_picture"
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">User Name</h2>
            <p className="text-gray-600">user@example.com</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Notifications</h3>
          <ul className="list-disc ml-4">
            <li>No new notifications</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
          <ul className="list-disc ml-4">
            <li>No upcoming events</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
          <ul className="list-disc ml-4">
            <li>No recent activity</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;
