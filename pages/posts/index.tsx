import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import  React from 'react';

export interface PostsProps {
  posts:any[],
}

export default function PostsPage ({posts}: PostsProps) {
  return (
    <div>
      <h1>List post</h1>
      <ul>
        {
          posts.map(post=>(
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
                
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostsProps> = async(context:GetStaticPropsContext) =>{
  //server side
  //build time
  console.log('Static Props')
  const repons = await fetch('https:js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await repons.json()
  console.log(data)
  return{
    props:{
      posts:data.data
    }
  }
}