//import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import Markdown from "react-markdown";
PrismLight.registerLanguage("js", js);
PrismLight.registerLanguage("css", css);

function PostContent(props) {
  const { post } = props;
  if (!post) {
    return <h1>loading...</h1>;
  }
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    img(props) {
      return (
        <Image
          width="600"
          height="300"
          src={`/images/posts/${post.slug}/${props.src}`}
          alt={props.alt}
          className={classes.image}
        />
      );
    },
    // paragraph(paragraph) {
    //   const { node } = paragraph;

    //   if (node.children[0].type === "img") {
    //     const image = node.children[0];

    //     return (
    //       <div className={classes.image}>
    //         <Image
    //           src={`/images/posts/${post.slug}/${image.url}`}
    //           alt={image.alt}
    //           width={600}
    //           height={300}
    //         />
    //       </div>
    //     );
    //   }

    //   return <p>{paragraph.children}</p>;
    // },

    code(code) {
      const { className, children, ...rest } = code;
      console.log(code);
      return (
        <PrismLight
          style={atomDark}
          className={className}
          children={children}
          {...rest}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <Markdown components={customRenderers}>{post.content}</Markdown>

      {/* <ReactMarkdown renderers={customRenderers}>{post.content}</ReactMarkdown> */}
    </article>
  );
}

export default PostContent;
