import Head from "next/head";
import { Fragment } from "react";

import AllPosts from "../../components/posts/all-posts";
import { getBlogs } from "../api/getBlogs";
import { getSession } from "next-auth/react";

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export default AllPostsPage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const allPosts = await getBlogs();

  return {
    props: {
      posts: JSON.parse(allPosts),
    },
  };
}
