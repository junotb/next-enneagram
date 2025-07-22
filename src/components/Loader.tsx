import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Image
        src="/loader.svg"
        alt="Loading"
        width={50}
        height={50}
        className="bg-white animate-spin"
      />
    </div>
  );
}