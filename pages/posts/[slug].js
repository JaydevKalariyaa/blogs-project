import React, { useEffect, useState } from "react";
import PostContent from "../../components/posts/post-Detail/post-content";
import getBlog from "../api/blogs/[slug]";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Spinner from "../../components/ui/spinner";

export default function SinglePostPage(props) {
  if (!props) {
    return <Spinner />;
  }
  return (
    <div>
      <PostContent post={props.post} />
    </div>
  );
}
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
  const { slug } = context.params;
  const post = await getBlog(slug);
  return {
    props: {
      post: JSON.parse(post),
    },
  };
}
