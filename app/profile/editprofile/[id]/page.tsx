import React from "react";
import EditUserProfile from "@/components/shared/EditUserProfile";
import { getUserById } from "@/lib/actions/user.action";

const page = async (params: any) => {
  const userId = params.params.id;
  const userDetails = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 ">Edit Profile</h1>
      <div className="mt-9">
        <EditUserProfile
          clerkId={userDetails.clerkId}
          user={JSON.stringify(userDetails)}
        />
      </div>
    </div>
  );
};

export default page;
