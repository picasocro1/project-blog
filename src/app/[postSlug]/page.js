import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";

import { BLOG_TITLE } from "@/constants";

import CodeSnippet from "@/components/CodeSnippet";

export async function generateMetadata({ params }) {
  const {
    frontmatter: { title, abstract: description },
  } = await loadBlogPost(params.postSlug);

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description,
  };
}

async function BlogPost({ params }) {
  const {
    content,
    frontmatter: { title, publishedOn },
  } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ pre: CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;
