import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/userProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar />
      <UserProfile />
      <Footer />
    </div>
  );
};

export default UserProfilePage;
