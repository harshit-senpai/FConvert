import Dropzone from "@/components/Dropzone";
import Navbar from "@/components/Navbar";
import DotPattern from "@/components/magicui/dot-pattern";
import ShimmerButton from "@/components/magicui/shimmer-button.tsx";

export default function Home() {
  return (
    <main>
      <Navbar />
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

            <Dropzone />
          </div>
        </div>
      </div>
    </main>
  );
}
