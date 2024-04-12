import React from "react";
import PostContent from "../../components/posts/post-Detail/post-content";
import getBlog from "../api/blogs/[slug]";

export default function SinglePostPage(props) {
  if (!props) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <PostContent post={props.post} />
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const post = await getBlog(slug);

  return {
    props: {
      post: JSON.parse(post),
    },
  };
}
