export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img
        src="/loader.svg"
        alt="Loading"
        width={50}
        height={50}
        className="bg-white animate-spin"
      />
    </div>
  );
}