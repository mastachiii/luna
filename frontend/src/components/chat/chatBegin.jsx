import defaultProfile from "../../assets/userUnknown.svg";

// Shows start of conversation with someone
export default function ChatBegin({ friendData }) {
    return (
        <div className="flex flex-col gap-1 ml-6 mt-5 mb-6">
            <img src={friendData.profilePicture || defaultProfile} alt="" className="size-30 rounded-full" />
            <p className="text-2xl font-bold">{friendData.displayName}</p>
            <p className="text-lg">{friendData.username}</p>
            <p className="mt-4 text-sm text-zinc-700 font-light">This is the beginning of your conversation with {friendData.displayName}</p>
        </div>
    );
}
