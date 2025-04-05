import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfile, fetchUser } from "../../features/quote/quoteSlice";
import Loading from "../Loading";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileQuotes from "./ProfileQuotes";
import FollowButton from "./FollowButton";

const ProfileLayout = ({ isSelf }) => {
  const { user } = useSelector(state => state.auth);
  const { profile, singleUser, quotes, isLoading } = useSelector(state => state.quote);
  const { userId } = useParams();
  const dispatch = useDispatch();
  
  const userData = isSelf ? profile : singleUser;
  const userQuotes = quotes.filter(quote => quote.author._id === userData?._id);

  useEffect(() => {
    if (user) dispatch(fetchProfile(user.token));
    if (!isSelf && userId) dispatch(fetchUser(userId));
  }, [user, userId, isSelf]);

  if (isLoading || !userData) return <Loading />;

  return (
    <div className="max-w-3xl shadow-2xl mx-auto p-6 border-2 border-pink-500 rounded-xl bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-300/90 to-red-200/90 text-gray-900 dark:text-gray-100">
      <ProfileHeader user={userData} />
      {!isSelf && <FollowButton userId={userId} />}
      <ProfileStats userQuotes={userQuotes} />
      <ProfileQuotes userQuotes={userQuotes} username={userData?.username} />
    </div>
  );
};

export default ProfileLayout;
