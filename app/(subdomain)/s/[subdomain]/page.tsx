import { getBlogbyId } from "@/app/(root)/org/[slug]/action";
import { Card } from "@/components/ui/card";
import { clerkClient } from "@clerk/nextjs/server";

interface IParams {
    subdomain: string;
}

export default async function Page({ params }: { params: Promise<IParams> }) {
  const {subdomain} = await params;
  const client = await clerkClient();
  const org =await client.organizations.getOrganization( {slug:subdomain});
  const orgId =  org.id;
  const getBlog = await getBlogbyId(orgId);
  return (
    <div className="p-10">
      <h1>Subdomain: {subdomain}</h1>
      
        {getBlog.map((blog) => (
        <Card key={blog.id} className="mt-2 gap-2">
          <div key={blog.id}>
            <h3 className="text-2xl font-bold ">{blog.title}</h3>
            <p>{blog.body}</p>
          </div>
          </Card>
        ))}
    </div>
  );
}