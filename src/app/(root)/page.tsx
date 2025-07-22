import HomeSearch from "@/components/HomeSearch";
import Popular from "@/components/popular/Popular";
// import NewLaunch from "@/components/newlaunch/NewLaunch";
import TypeAnimation from "@/components/TypeAnimation";
import { Suspense } from "react";

const popularSections = [
  {
    type: "popular",
    title: "Popular",
  },
];
// const newlaunchSections = [
//   {
//     type: "boosted",
//     title: "New Launch",
//   },
// ];

const App = () => {
  // seed state and city api
  // useEffect(()=>{
  //   const dbSeed = async()=>{
  //     await axios.post('/api/seed')
  //   }

  //   dbSeed()
  // },[])

  return (
    <main className="bg-[url('https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg')] bg-cover bg-center h-screen bg-no-repeat absolute top-0 w-full">
      <div className="z-1 bg-[rgba(0,0,0,.5)] flex justify-center items-center h-full">
        <div className="homecenter text-center flex flex-col gap-6">
          <Suspense fallback={<p>Loading...</p>}>
            <TypeAnimation />
          </Suspense>
          <p className="text-white">We Have the best Properties For You.</p>
          <Suspense fallback={<p>Loading...</p>}>
            <HomeSearch />
          </Suspense>
        </div>
      </div>

      <div className="max-w-[75vw] mx-auto grid grid-cols-3 gap-10">
        {/* recommnded and handpicked */}
        <div className="col-span-2">
          {/* <div className="">
            {newlaunchSections.map((item, i) => (
              <NewLaunch key={i} title={item.title} type={item.type} />
            ))}
          </div> */}
          <div className="">
            {popularSections.map((item, i) => (
              <Popular key={i} title={item.title} type={item.type} />
            ))}
          </div>
          <div className="">
            {popularSections.map((item, i) => (
              <Popular key={i} title={item.title} type={item.type} />
            ))}
          </div>
        </div>
        <div className="mt-4">Right side</div>
      </div>
    </main>
  );
};

export default App;
