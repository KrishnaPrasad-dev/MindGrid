// Profile.jsx
import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen mt-32 flex border border-1 mx-2 rounded-xl  mb-12 items-center justify-center p-4 font-sans">
      <div className="max-w-sm w-full  border-gray-200 rounded-lg shadow-sm">
        {/* Profile Header */}
        <div className="text-center  pt-2 pb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Profile Image</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Krishna Prasad</h1>
          <p className="text-white text-3xl font-medium">Full Stack Web Developer</p>
        </div>

        {/* Content Section */}
        <div className="">
          <p className="text-gray-200 text-sm  mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus. Etiam congue ex enim.
          </p>

         
            
        </div>
      </div>
    </div>
  );
};

export default Profile;