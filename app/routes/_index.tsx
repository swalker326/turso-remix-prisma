import { json, type V2_MetaFunction } from "@remix-run/node";
import { createClient } from "@libsql/client";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export async function loader() {
  const client = createClient({
    url: "libsql://918577d0f12e38-secure-beach-head-swalker326.turso.io",
    authToken: process.env.TURSO_API_KEY
  });
  const users = await client.execute("select * from example_users");
  return json(users);
}

export default function Index() {
  const { rows } = useLoaderData();
  // console.log("users", users.rows);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix with Turso, the edge</h1>
      {rows.map((user: any) => {
        return (
          <div key={user.uid}>
            <h2>user: {user.email}</h2>
          </div>
        );
      })}
    </div>
  );
}
