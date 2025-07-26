import { prisma } from "@/lib/prisma";

// const locs = [
//     'Jamia, New Delhi','Batla House, New Delhi'
// ]
export async function GET() {
  const locs = await prisma.property.findMany({
    include:{
        state:true,
        city:true
    }
  });
//   console.log('locs',locs)
  const res:string[]=[]
 locs.forEach((el)=>{
    res.push(el.location)
    res.push(el.state.name)
    res.push(el.city.name)
  })
//   console.log("pppppppppppppppppp",res)
  return Response.json(Array.from(new Set(res)));
}
