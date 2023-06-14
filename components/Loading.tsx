export default function Loading() {
  return (
    <div className="my-loader fixed inset-0 z-50 w-screen h-screen bg-black-secondary bg-opacity-10 backdrop-filter backdrop-blur-sm">
      <div className="flex h-full items-center justify-center">
        <div className="relative w-28 h-28 border-red-500 mx-auto my-0">
          <div className="absolute mt-[-2.7em] ml-[-2.7em] w-[5.4em] h-[5.4em] text-[15px] left-2/4 top-2/4">
            <div className="absolute bottom-[-0.1em] h-[1em] w-[1em] bg-transparent translate-x-0 translate-y-[-1em] -rotate-45 animate-[2.5s_cubic-bezier(0.79,0,0.47,0.97)_0s_infinite_normal_none_running_dl5pip] rounded-[15%] border-[0.25em] border-solid border-white left-0" />
            <div className="absolute w-[7.1em] h-[7.1em] rotate-45 border-l-[0.25em] border-l-white border-solid left-[1.7em] top-[1.7em]" />
          </div>
        </div>
      </div>
    </div>
  );
}
