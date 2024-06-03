import Link from "next/link";
export default async function ListJob() {
  return (
    <>
      <div className="overflow-x-auto"></div>
      <div className="flex justiny-between items-center">
        <h1 className="font-bold py-10 text-2xl">NextJS CRUD</h1>
      </div>
      <div className="text-right">
        <Link className="btn btn-primary" href="/jobs/add">
            Add Job
        </Link>
      </div>
    </>
  );
}
