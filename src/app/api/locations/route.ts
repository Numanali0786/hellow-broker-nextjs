const locs = [
    'Jamia, New Delhi','Batla House, New Delhi'
]
export async function GET(){
    return Response.json(locs)
}