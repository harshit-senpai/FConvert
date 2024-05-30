import Navbar from "@/components/Navbar";
import DotPattern from "@/components/magicui/dot-pattern";
import ShimmerButton from "@/components/magicui/shimmer-button.tsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <DotPattern />
      <div className="relative px-4 mx-auto container">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center flex justify-center mb-8 sm:mb-14">
            <ShimmerButton className="pointer-events-none">
              <span className="inline-block font-semibold rounded-full text-gray-600">
                Convert Files Easily ✨
              </span>
            </ShimmerButton>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-semibold xs:text-6xl md:text-6xl text-gray-800 mb-8 ">
              Fast and Secure File Conversion
            </h1>
            <p className="md:text-md text-gray-600 font-semibold mb-8 sm:mb-10">
              An Online Tool for Fast and Secure File conversion. Transform
              images, Videos and audios effortlessly
            </p>

            <div className="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Audio, Video and Image
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
