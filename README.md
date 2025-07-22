type PropertyWithMedia = Prisma.PropertyGetPayload<{
  include: {
    media: true;
  };
}>;
type pp = Property & {
  media:Media[]
}

///////////////////////////

import useSWR from "swr";
  // const { isLoaded, user } = useUser();
  // const shouldFetch = user && isLoaded;
  
  // axios fetcher
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  // const {
  //   data: lists,
  //   error,
  //   isLoading,
  // } = useSWR<pp[]>(
  //   shouldFetch ? `/api/properties/filtered?type=${type}` : null,
  //   fetcher
  // );