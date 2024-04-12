import { Fragment } from "react";
import Head from "next/head";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getBlogs } from "./api/getBlogs";
function HomePage(props) {
  const featuredBlogs = props.blogs.filter((blog) => blog.featured);
  return (
    <Fragment>
      <Head>
        <title>Jaydev' Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredBlogs} />
    </Fragment>
  );
}

export async function getStaticProps() {
  let blogs = await getBlogs();

  return {
    props: {
      blogs: JSON.parse(blogs),
    },
  };
}

export default HomePage;
