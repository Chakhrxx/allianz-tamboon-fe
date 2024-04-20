import FixxingIcon from "@/assets/svgs/fixxing.svg?react";
function HomePage() {
  return (
    <div className="relative z-10 text-center space-y-5 pb-10 mt-5">
      <div className="font-bold text-3xl pb-5">
        {"Thank you for joining activities."}
      </div>
      <FixxingIcon className=" mx-auto" />
      <div className="font-bold text-xl pt-5">
        {"Now, we're closing to prepare something awesome!"}
      </div>
      <div className=" text-md">
        {
          "However, don't worry, you can still enjoy Sport Experiences. Just tap into your profile menu and scan the QR Code like you always do and have fun!"
        }
      </div>
    </div>
  );
}

export default HomePage;
